import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";

// Circles under gravity inside a capsule, drawn on a canvas.
// A small position-based solver; the loop sleeps once everything settles or scrolls away.

export interface CirclePhysicsOptions {
  /** Downward acceleration, in circle diameters per second². */
  gravity: number;
  /** Wall restitution, 0 (dead) to 1 (fully elastic). */
  bounce: number;
  /** How fast circles stop rolling along the bottom. */
  friction: number;
  /** Most solver steps per second; each frame is split into equal steps up to this rate. */
  substeps: number;
  /** Collision passes per step. */
  iterations: number;
  /** Vertical gap between rows in the entrance drop, in diameters. */
  dropSpread: number;
  /** Maximum squash and stretch at full speed, 0 to disable. */
  stretch: number;
  /** Size of the selected circle relative to the others. */
  selectedScale: number;
  /** Size of the filler circles relative to the color ones. */
  fillerScale: number;
  /** Spring stiffness of the select / deselect size change. */
  springStiffness: number;
  /** Spring damping; lower values bounce more. */
  springDamping: number;
}

export const defaultCirclePhysics: CirclePhysicsOptions = {
  gravity: 30,
  bounce: 0.45,
  friction: 3,
  substeps: 120,
  iterations: 3,
  dropSpread: 1.4,
  stretch: 0.12,
  selectedScale: 2,
  fillerScale: 0.2,
  springStiffness: 260,
  springDamping: 11,
};

interface Body {
  color: string;
  /** A text-colored circle with no theme color: it can be moved around but not selected. */
  filler: boolean;
  /** Out of the color window: shrinks away without colliding, then is removed. */
  leaving: boolean;
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  /** False while still falling in from above the capsule. */
  entered: boolean;
  radius: number;
  radiusVelocity: number;
  hover: number;
}

interface Drag {
  body: Body;
  pointerId: number;
  offsetX: number;
  offsetY: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  lastX: number;
  lastY: number;
  lastT: number;
  velX: number;
  velY: number;
  moved: boolean;
}

interface CirclePhysicsParams {
  colors: string[];
  selected: string;
  enabled: boolean;
  onSelect: (color: string) => void;
  /** How many filler circles share the capsule with the colors. */
  fillers?: number;
  options?: Partial<CirclePhysicsOptions>;
}

const SHORT_SIDE = 3.5;
const DRAG_THRESHOLD = 5;
const MAX_FLING = 40; // in diameters per second; higher can tunnel through neighbours
const SLEEP_SPEED = 0.05; // in diameters per second, so it means the same on any screen
const SLEEP_FRAMES = 20;
// Safety net: circles that stay this slow for this long are frozen, so a stack that keeps fizzing still sleeps.
const NAP_SPEED = 0.5; // in diameters per second
const NAP_TIME = 1.5; // in seconds
const DOUBLE_TAP = 300;
const HOVER_GROWTH = 0;
const MAX_FRAME = 1 / 30;

/** Reused result of capsuleContact, so the solver allocates nothing per step. */
const contact = { cx: 0, cy: 0, dx: 0, dy: 0, distance: 0 };

/**
 * The capsule is a segment along the long side, inflated by half the short side.
 * Writes the nearest point on that segment and the offset from it into `contact`.
 * With `chute`, the segment also runs up past the top, so circles dropping in
 * fall between straight walls and meet the curve without a jump.
 */
const capsuleContact = (x: number, y: number, width: number, height: number, capsule: number, chute: boolean) => {
  if (width < height) {
    contact.cx = capsule;
    contact.cy = Math.min(chute ? y : Math.max(y, capsule), height - capsule);
  } else {
    contact.cx = Math.min(Math.max(x, capsule), width - capsule);
    contact.cy = chute ? Math.min(y, capsule) : capsule;
  }
  contact.dx = x - contact.cx;
  contact.dy = y - contact.cy;
  contact.distance = Math.sqrt(contact.dx * contact.dx + contact.dy * contact.dy);
};

export const useCirclePhysics = ({ colors, selected, enabled, onSelect, fillers = 0, options }: CirclePhysicsParams) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);

  const config = useRef(defaultCirclePhysics);
  config.current = { ...defaultCirclePhysics, ...options };
  const latest = useRef({ colors, selected, enabled, onSelect, fillers });
  latest.current = { colors, selected, enabled, onSelect, fillers };

  const bodies = useRef<Body[]>([]);
  const size = useRef({ width: 0, height: 0, cell: 0, columns: 0, dpr: 1 });
  const ink = useRef("rgba(0, 0, 0, .1)");
  const fillerColor = useRef("#191919");
  const drag = useRef<Drag | null>(null);
  const hovered = useRef<Body | null>(null);
  const dropped = useRef(false);
  const visible = useRef(false);
  const frame = useRef<number | null>(null);
  const lastTime = useRef(0);
  const stillFrames = useRef(0);
  const calmTime = useRef(0);
  /** Time not yet simulated, carried to the next frame so every step is the same length. */
  const leftover = useRef(0);
  /** How far drawing sits between the previous step and the current one, 0 to 1. */
  const blend = useRef(1);
  const lastEmptyTap = useRef(0);

  const targetRadius = useCallback((b: Body) => {
    if (b.leaving) return 0;
    const r = size.current.cell / 2;
    if (b.filler) return r * config.current.fillerScale;
    const { selected, enabled } = latest.current;
    if (b.color !== selected) return r;
    // Without motion there is no room to grow, so the selected circle shrinks instead.
    if (!enabled) return r * 0.8;
    const { width, height } = size.current;
    return Math.min(r * config.current.selectedScale, Math.min(width, height) / 2);
  }, []);

  /**
   * "drop": rows stacked above the capsule, falling in together; nothing overlaps at the start.
   * "pile": rows stacked from the bottom; settle() then rolls them into the curve.
   * Fillers (empty color) are shuffled in among the colors so they don't all land on top.
   */
  const createBodies = useCallback(
    (colors: string[], mode: "pile" | "drop", fillers = 0) => {
      const { width, height, cell, columns } = size.current;
      const r = cell / 2;
      const spread = Math.max(config.current.dropSpread, 1.05);
      const items = colors.concat(Array.from({ length: fillers }, () => ""));
      if (fillers > 0) {
        for (let i = items.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [items[i], items[j]] = [items[j], items[i]];
        }
      }
      return items.map((color, i) => {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const jitter = mode === "drop" ? (Math.random() - 0.5) * cell * 0.3 : 0;
        const x = Math.min(Math.max((col + 0.5) * cell + jitter, r), width - r);
        const y =
          mode === "drop"
            ? -r - row * cell * spread - Math.random() * cell * (spread - 1)
            : height - (row + 0.5) * cell;
        const body: Body = {
          color,
          filler: color === "",
          leaving: false,
          x,
          y,
          px: x,
          py: y,
          vx: 0,
          vy: 0,
          entered: mode === "pile",
          radius: 0,
          radiusVelocity: 0,
          hover: 0,
        };
        body.radius = targetRadius(body);
        return body;
      });
    },
    [targetRadius]
  );

  const draw = useCallback(() => {
    const ctx = context.current;
    if (!ctx) return;
    const { width, height, cell, dpr } = size.current;
    const stretch = config.current.stretch;
    const fastest = cell * 40;
    const list = bodies.current;
    const held = drag.current ? drag.current.body : null;
    const t = blend.current;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const paint = (b: Body) => {
      const radius = Math.max(0, b.radius * (1 + b.hover * HOVER_GROWTH));
      // Steps don't line up with frames, so draw between the last two step positions.
      const x = b.px + (b.x - b.px) * t;
      const y = b.py + (b.y - b.py) * t;
      if (y + radius * 1.2 < 0) return;
      const s = stretch * Math.min(1, Math.sqrt(b.vx * b.vx + b.vy * b.vy) / fastest);

      ctx.beginPath();
      if (s < 0.005) {
        ctx.arc(x, y, radius, 0, Math.PI * 2);
      } else {
        // Squash and stretch along the direction of travel.
        const angle = Math.atan2(b.vy, b.vx);
        ctx.ellipse(x, y, radius * (1 + s), radius * (1 - s), angle, 0, Math.PI * 2);
      }
      ctx.fillStyle = b.filler ? fillerColor.current : b.color;
      ctx.fill();

      if (b.hover > 0) {
        ctx.globalAlpha = b.hover * 0.6;
        ctx.fillStyle = ink.current;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    for (let i = 0; i < list.length; i++) if (list[i] !== held) paint(list[i]);
    // The held circle draws on top.
    if (held) paint(held);
  }, []);

  const step = useCallback((dt: number) => {
    const { width, height, cell } = size.current;
    const { gravity: g, bounce, friction, iterations } = config.current;
    const gravity = g * cell;
    const capsule = Math.min(width, height) / 2;
    const list = bodies.current;
    const count = list.length;
    const held = drag.current;
    const heldBody = held ? held.body : null;

    for (let i = 0; i < count; i++) {
      const b = list[i];
      b.px = b.x;
      b.py = b.y;
      if (b === heldBody) {
        if (held!.moved) {
          b.x = held!.targetX;
          b.y = held!.targetY;
        }
        continue;
      }
      b.vy += gravity * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
    }

    for (let iter = 0; iter < iterations; iter++) {
      for (let i = 0; i < count; i++) {
        const a = list[i];
        if (a.leaving) continue;
        // Heavier (bigger) circles move less; the held one doesn't move at all.
        const wa = a === heldBody ? 0 : 1 / (a.radius * a.radius);
        for (let j = i + 1; j < count; j++) {
          const b = list[j];
          if (b.leaving) continue;
          const min = a.radius + b.radius;
          let dx = b.x - a.x;
          const dy = b.y - a.y;
          if (dx > min || dx < -min || dy > min || dy < -min) continue;
          let d2 = dx * dx + dy * dy;
          if (d2 >= min * min) continue;
          if (d2 === 0) {
            dx = 0.01;
            d2 = 0.0001;
          }
          const wb = b === heldBody ? 0 : 1 / (b.radius * b.radius);
          if (wa + wb === 0) continue;
          const d = Math.sqrt(d2);
          const push = (min - d) / (wa + wb) / d;
          a.x -= dx * push * wa;
          a.y -= dy * push * wa;
          b.x += dx * push * wb;
          b.y += dy * push * wb;
        }
      }

      for (let i = 0; i < count; i++) {
        const b = list[i];
        if (!b.entered && b.y >= capsule) b.entered = true;
        const limit = Math.max(capsule - b.radius, 0);
        capsuleContact(b.x, b.y, width, height, capsule, !b.entered);
        if (contact.distance > limit && contact.distance > 0) {
          b.x = contact.cx + (contact.dx / contact.distance) * limit;
          b.y = contact.cy + (contact.dy / contact.distance) * limit;
        }
      }
    }

    for (let i = 0; i < count; i++) {
      const b = list[i];
      if (b === heldBody) {
        b.vx = 0;
        b.vy = 0;
        continue;
      }
      const preVx = b.vx;
      const preVy = b.vy;
      b.vx = (b.x - b.px) / dt;
      b.vy = (b.y - b.py) / dt;

      // The wall bounces; the solver above is fully inelastic on its own.
      capsuleContact(b.x, b.y, width, height, capsule, !b.entered);
      if (contact.distance === 0 || contact.distance < capsule - b.radius - 0.5) continue;
      const nx = contact.dx / contact.distance;
      const ny = contact.dy / contact.distance;
      const into = preVx * nx + preVy * ny;
      if (into <= 0) continue;
      const along = b.vx * nx + b.vy * ny;
      // Rolling along the lower curve slows down; side and top contacts stay slippery.
      const grip = Math.max(0, 1 - friction * dt * Math.max(ny, 0));
      const out = into > gravity * dt * 4 ? -into * bounce : 0;
      b.vx = (b.vx - along * nx) * grip + nx * out;
      b.vy = (b.vy - along * ny) * grip + ny * out;
    }
  }, []);

  /**
   * Advances the simulation by `elapsed` seconds in fixed-length steps, carrying the remainder over.
   * A step length that changed from frame to frame fed energy into resting stacks, so they never settled
   * at refresh rates where a frame lands right on a whole number of steps (60 / 120 Hz).
   */
  const advance = useCallback(
    (elapsed: number) => {
      if (elapsed <= 0) return;
      const dt = 1 / config.current.substeps;
      leftover.current += elapsed;
      while (leftover.current >= dt) {
        step(dt);
        leftover.current -= dt;
      }
      blend.current = leftover.current / dt;
    },
    [step]
  );

  const tick = useCallback(
    (now: number) => {
      frame.current = null;
      const elapsed = Math.min(Math.max(0, now - lastTime.current) / 1000, MAX_FRAME);
      lastTime.current = now;

      const napping = calmTime.current >= NAP_TIME;
      if (latest.current.enabled && !napping) advance(elapsed);

      const sleepSpeed = SLEEP_SPEED * size.current.cell;
      const napSpeed = NAP_SPEED * size.current.cell;
      let calm = !drag.current;
      let settled = !drag.current;
      const ease = Math.min(1, elapsed * 18);
      const { springStiffness, springDamping } = config.current;
      const list = bodies.current;
      let gone = false;
      for (let i = 0; i < list.length; i++) {
        const b = list[i];
        const radius = targetRadius(b);
        const hover = hovered.current === b ? 1 : 0;
        if (b.radius !== radius || b.radiusVelocity !== 0) {
          // Springy size change, so select and deselect overshoot a little.
          b.radiusVelocity += ((radius - b.radius) * springStiffness - b.radiusVelocity * springDamping) * elapsed;
          b.radius += b.radiusVelocity * elapsed;
          if (b.leaving && b.radius <= 0) {
            gone = true;
          } else if (Math.abs(radius - b.radius) < 0.1 && Math.abs(b.radiusVelocity) < 1) {
            b.radius = radius;
            b.radiusVelocity = 0;
          } else {
            settled = false;
          }
        }
        if (b.hover !== hover) {
          b.hover += (hover - b.hover) * ease;
          if (Math.abs(hover - b.hover) < 0.01) b.hover = hover;
          else settled = false;
        }
        if (napping) {
          b.vx = 0;
          b.vy = 0;
          b.px = b.x;
          b.py = b.y;
        }
        if (!b.entered || Math.abs(b.vx) > napSpeed || Math.abs(b.vy) > napSpeed) calm = false;
        if (!b.entered || Math.abs(b.vx) > sleepSpeed || Math.abs(b.vy) > sleepSpeed) settled = false;
      }
      if (gone) bodies.current = list.filter((b) => !(b.leaving && b.radius <= 0));
      calmTime.current = calm ? calmTime.current + elapsed : 0;

      draw();

      stillFrames.current = settled ? stillFrames.current + 1 : 0;
      if (stillFrames.current < SLEEP_FRAMES && visible.current) frame.current = requestAnimationFrame(tick);
    },
    [advance, draw, targetRadius]
  );

  /** Theme colors can change while the loop sleeps, so they're read again on every wake. */
  const readTokens = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const style = getComputedStyle(canvas);
    ink.current = style.getPropertyValue("--ink-color").trim() || ink.current;
    fillerColor.current = style.getPropertyValue("--text-color").trim() || fillerColor.current;
  }, []);

  const wake = useCallback(() => {
    stillFrames.current = 0;
    calmTime.current = 0;
    if (frame.current !== null || !visible.current) return;
    readTokens();
    lastTime.current = performance.now();
    frame.current = requestAnimationFrame(tick);
  }, [tick, readTokens]);

  /** Runs the solver off-screen until the circles rest, for layouts shown without motion. */
  const settle = useCallback(() => {
    advance(1);
    advance(1);
    bodies.current.forEach((b) => {
      b.vx = 0;
      b.vy = 0;
      b.px = b.x;
      b.py = b.y;
    });
  }, [advance]);

  /** Fresh bodies: dropping in with motion, already at rest without it. */
  const spawn = useCallback(() => {
    const { colors, fillers, enabled } = latest.current;
    if (enabled) {
      bodies.current = createBodies(colors, "drop", fillers);
    } else {
      bodies.current = createBodies(colors, "pile", fillers);
      settle();
    }
  }, [createBodies, settle]);

  /**
   * The color window moved: circles that stay keep their place, the ones that left shrink away,
   * and the new ones drop in from the top.
   */
  const sync = useCallback(() => {
    if (!latest.current.enabled) {
      spawn();
      return;
    }
    const next = latest.current.colors;
    const present = new Set<string>();
    bodies.current.forEach((b) => {
      if (b.filler) return;
      if (!next.includes(b.color)) b.leaving = true;
      else if (!b.leaving) present.add(b.color);
    });
    const incoming = next.filter((color) => !present.has(color));
    // A color that was shrinking away and came back gets a fresh body.
    bodies.current = bodies.current.concat(createBodies(incoming, "drop"));
    if (drag.current && drag.current.body.leaving) drag.current = null;
    if (hovered.current && hovered.current.leaving) hovered.current = null;
  }, [createBodies, spawn]);

  const drop = useCallback(() => {
    drag.current = null;
    dropped.current = true;
    spawn();
    wake();
  }, [spawn, wake]);

  // Size the canvas before paint; keep bodies in place proportionally on resize.
  useLayoutEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    context.current = canvas.getContext("2d");

    const layout = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const prev = size.current;
      if (!width || !height) return;
      const resized = width !== prev.width || height !== prev.height || dpr !== prev.dpr;

      if (resized) {
        const cell = Math.min(width, height) / SHORT_SIDE;
        size.current = { width, height, cell, columns: Math.round(width / cell), dpr };
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        readTokens();
      }

      if (resized && prev.width) {
        bodies.current.forEach((b) => {
          b.x *= width / prev.width;
          b.y *= height / prev.height;
          b.px = b.x;
          b.py = b.y;
        });
        if (!latest.current.enabled) settle();
      }
      draw();
      wake();
    };

    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(container);
    return () => observer.disconnect();
  }, [draw, settle, wake, readTokens]);

  // The color window moved (or its size changed).
  const colorsKey = colors.join();
  useEffect(() => {
    if (!dropped.current) return;
    sync();
    wake();
  }, [colorsKey, sync, wake]);

  // Runs only while on screen; the entrance drop starts the first time the capsule is 30% in view.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (!entry.isIntersecting) return;
        if (!dropped.current && entry.intersectionRatio >= 0.3) drop();
        else wake();
      },
      { threshold: [0, 0.3] }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [drop, wake]);

  useEffect(() => {
    if (!enabled && dropped.current) drop();
  }, [enabled, drop]);

  // Light / dark switches repaint at once, even while the loop sleeps:
  // data-theme covers the mode picker, the media query covers the OS under "auto".
  useEffect(() => {
    const repaint = () => {
      readTokens();
      draw();
    };
    const observer = new MutationObserver(repaint);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", repaint);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", repaint);
    };
  }, [readTokens, draw]);

  // Grow / shrink when the selected color changes.
  useEffect(() => {
    wake();
  }, [selected, wake]);

  useEffect(
    () => () => {
      // Clear the handle too, or wake() thinks a loop is still running after a StrictMode remount.
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    },
    []
  );

  // offsetX/Y are relative to the canvas and need no layout read, even under pointer capture.
  const localPoint = (e: React.PointerEvent) => ({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

  const hitTest = (x: number, y: number) => {
    const list = bodies.current;
    for (let i = list.length - 1; i >= 0; i--) {
      const b = list[i];
      if (b.leaving) continue;
      const dx = x - b.x;
      const dy = y - b.y;
      if (dx * dx + dy * dy <= b.radius * b.radius) return b;
    }
    return null;
  };

  const setCursor = (value: string | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (value) canvas.setAttribute("data-cursor", value);
    else canvas.removeAttribute("data-cursor");
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!e.isPrimary || e.button !== 0) return;
    const p = localPoint(e);
    const b = hitTest(p.x, p.y);

    if (b === null) {
      // Double click / double tap on empty space drops everything again.
      const now = performance.now();
      if (now - lastEmptyTap.current < DOUBLE_TAP) {
        lastEmptyTap.current = 0;
        drop();
      } else {
        lastEmptyTap.current = now;
      }
      return;
    }

    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = {
      body: b,
      pointerId: e.pointerId,
      offsetX: p.x - b.x,
      offsetY: p.y - b.y,
      startX: p.x,
      startY: p.y,
      targetX: b.x,
      targetY: b.y,
      lastX: p.x,
      lastY: p.y,
      lastT: performance.now(),
      velX: 0,
      velY: 0,
      moved: false,
    };
    wake();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = drag.current;

    if (!d) {
      if (e.pointerType === "touch") return;
      const p = localPoint(e);
      const b = hitTest(p.x, p.y);
      if (b !== hovered.current) {
        hovered.current = b;
        setCursor(b === null ? null : latest.current.enabled ? "grab" : b.filler ? null : "pointer");
        wake();
      }
      return;
    }
    if (d.pointerId !== e.pointerId || !latest.current.enabled) return;

    const p = localPoint(e);
    if (!d.moved && Math.hypot(p.x - d.startX, p.y - d.startY) > DRAG_THRESHOLD) {
      d.moved = true;
      hovered.current = null;
      setCursor("grabbing");
    }
    const now = performance.now();
    const dt = Math.max(now - d.lastT, 1) / 1000;
    d.velX = d.velX * 0.5 + ((p.x - d.lastX) / dt) * 0.5;
    d.velY = d.velY * 0.5 + ((p.y - d.lastY) / dt) * 0.5;
    d.lastX = p.x;
    d.lastY = p.y;
    d.lastT = now;
    d.targetX = p.x - d.offsetX;
    d.targetY = p.y - d.offsetY;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = drag.current;
    if (!d || d.pointerId !== e.pointerId) return;
    drag.current = null;
    const b = d.body;

    if (d.moved) {
      const max = MAX_FLING * size.current.cell;
      // A pointer that stopped before release shouldn't fling.
      const stale = performance.now() - d.lastT > 80;
      b.vx = stale ? 0 : Math.max(-max, Math.min(max, d.velX));
      b.vy = stale ? 0 : Math.max(-max, Math.min(max, d.velY));
      setCursor(e.pointerType === "touch" ? null : "grab");
    } else if (e.type === "pointerup" && !b.filler) {
      latest.current.onSelect(b.color);
    }
    wake();
  };

  const onPointerLeave = () => {
    if (hovered.current === null) return;
    hovered.current = null;
    setCursor(null);
    wake();
  };

  return {
    containerRef,
    canvasRef,
    canvasProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onPointerLeave,
    },
    drop,
  };
};
