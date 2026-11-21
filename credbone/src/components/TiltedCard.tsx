import React, { useCallback, useEffect, useRef, useState } from "react";

// Which rotation axes follow the pointer:
// "x" tips up/down (pointer's vertical position), "y" turns left/right (horizontal)
export type TiltedCardAxis = "both" | "x" | "y";

interface TiltedCardProps {
  children: React.ReactNode; // the card face; style it yourself
  axis?: TiltedCardAxis;
  maxTilt?: number; // deg the card turns at its edges
  lift?: number; // px the card rises toward the viewer while active
  scale?: number; // size while active; 1 = no change
  perspective?: string; // data-perspective value of the stage
  smoothing?: number; // ms the card takes to catch up (time constant); 0 = instant
  reverse?: boolean; // tilt away from the pointer instead of toward it
  float?: boolean; // slow idle bob and sway while the card is untouched
  disabled?: boolean; // static card
}

interface Pose {
  x: number; // rotateX from the pointer, deg
  y: number; // rotateY from the pointer, deg
  a: number; // active amount, 0..1: drives lift, scale and layer depth
  f: number; // idle float amount, 0..1
}

const REST: Pose = { x: 0, y: 0, a: 0, f: 0 };
const SETTLE = 0.001; // stop easing once every channel is this close
const MAX_FRAME = 100; // ms; caps the step after a stalled frame

// Idle float
const FLOAT_PERIOD = 6000; // ms for one full bob
const FLOAT_TILT = 3; // deg of sway
const FLOAT_RISE = 6; // px of bob

// Touch: a short hold picks the card up, then the finger tilts it
const HOLD_DELAY = 300; // ms the finger must rest before tilt mode starts
const HOLD_SLOP = 8; // px the finger may drift during the hold; more is a scroll
const HOLD_BUZZ = 10; // ms vibration when tilt mode starts (where supported)

// Read by TiltedCardLayer; 0 at rest, 1 while active
const ACTIVE_VAR = "--tilted-card-active";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  axis = "both",
  maxTilt = 12,
  lift = 20,
  scale = 1,
  perspective = "1000",
  smoothing = 100,
  reverse = false,
  float = false,
  disabled = false,
}) => {
  const stageRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const pose = useRef<Pose>({ ...REST });
  const target = useRef<Pose>({ ...REST });
  const frame = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const idleTime = useRef(0);
  const visible = useRef(true);
  const touching = useRef(false); // touch tilt mode is on
  const holdTimer = useRef<number | null>(null);
  const holdStart = useRef({ x: 0, y: 0 });
  const lastPoint = useRef({ x: 0, y: 0 });
  const suppressClick = useRef(false);

  // Latest props for the animation loop, which outlives renders
  const live = useRef({ axis, maxTilt, lift, scale, smoothing, reverse });
  live.current = { axis, maxTilt, lift, scale, smoothing, reverse };

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const inactive = disabled || reducedMotion;

  const write = () => {
    const el = cardRef.current;
    if (!el) return;
    const { x, y, a, f } = pose.current;
    const { lift, scale } = live.current;

    // Idle float fades out while the pointer drives the card
    const idle = f * (1 - a);
    const phase = (idleTime.current / FLOAT_PERIOD) * Math.PI * 2;
    const rx = x + Math.sin(phase) * FLOAT_TILT * idle;
    const ry = y + Math.cos(phase * 0.75) * FLOAT_TILT * idle;
    const ty = Math.sin(phase) * FLOAT_RISE * idle;
    const tz = a * lift;
    const s = 1 + (scale - 1) * a;

    const atRest = rx === 0 && ry === 0 && ty === 0 && tz === 0 && s === 1;
    el.style.transform = atRest
      ? ""
      : `translateY(${ty}px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px) scale(${s})`;
    if (a === 0) el.style.removeProperty(ACTIVE_VAR);
    else el.style.setProperty(ACTIVE_VAR, String(a));
  };

  // Each frame, ease every channel toward its target by elapsed time, so the
  // speed is the same at any refresh rate. Written straight to the element:
  // the card never re-renders while it moves.
  const tick = useRef<(now: number) => void>(() => {});
  tick.current = (now: number) => {
    const dt = Math.min(now - (lastTime.current ?? now), MAX_FRAME);
    lastTime.current = now;

    const { smoothing } = live.current;
    const k = smoothing > 0 ? 1 - Math.exp(-dt / smoothing) : 1;
    const p = pose.current;
    const t = target.current;
    const settled =
      Math.abs(t.x - p.x) < SETTLE &&
      Math.abs(t.y - p.y) < SETTLE &&
      Math.abs(t.a - p.a) < SETTLE &&
      Math.abs(t.f - p.f) < SETTLE;

    pose.current = settled
      ? { ...t }
      : {
          x: p.x + (t.x - p.x) * k,
          y: p.y + (t.y - p.y) * k,
          a: p.a + (t.a - p.a) * k,
          f: p.f + (t.f - p.f) * k,
        };

    // Floating keeps the loop alive, but only while the card is on screen
    const floating = t.f > 0 && visible.current;
    if (floating) idleTime.current += dt;
    write();

    if (settled && !floating) {
      frame.current = null;
      lastTime.current = null;
    } else {
      frame.current = requestAnimationFrame((n) => tick.current(n));
    }
  };

  const run = useCallback(() => {
    if (frame.current === null)
      frame.current = requestAnimationFrame((n) => tick.current(n));
  }, []);

  // Turning inactive drops the card flat at once; unmounting stops the loop
  useEffect(() => {
    const cancel = () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
      lastTime.current = null;
    };
    if (inactive) {
      cancel();
      pose.current = { ...REST };
      target.current = { ...REST };
      const el = cardRef.current;
      if (el) {
        el.style.transform = "";
        el.style.removeProperty(ACTIVE_VAR);
      }
    }
    return cancel;
  }, [inactive]);

  // Float eases in and out rather than snapping
  useEffect(() => {
    if (inactive) return;
    target.current = { ...target.current, f: float ? 1 : 0 };
    run();
  }, [float, inactive, run]);

  // Pause the float loop while the card is off screen
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !float || inactive) return;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (entry.isIntersecting) run();
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      visible.current = true;
    };
  }, [float, inactive, run]);

  const aim = (clientX: number, clientY: number) => {
    // Measured on the stage, which never transforms, so the tilt
    // doesn't skew the reading. Re-read each move to follow scrolling.
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const nx = clamp(((clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
    const ny = clamp(((clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
    // Read from live so the native touch listeners, bound once, stay current
    const { axis, maxTilt, reverse } = live.current;
    const sign = reverse ? -1 : 1;
    target.current = {
      ...target.current,
      x: axis === "y" ? 0 : -ny * maxTilt * sign,
      y: axis === "x" ? 0 : nx * maxTilt * sign,
      a: 1,
    };
    run();
  };

  // No text selection while a finger holds the card. Written to the
  // element, like the transform, so a hold doesn't re-render the card.
  const setNoSelect = (on: boolean) => {
    const el = stageRef.current;
    if (!el) return;
    if (on) el.setAttribute("data-user-select", "none");
    else el.removeAttribute("data-user-select");
  };

  const cancelHold = () => {
    if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
    holdTimer.current = null;
  };

  const release = () => {
    cancelHold();
    setNoSelect(false);
    touching.current = false;
    target.current = { ...target.current, x: 0, y: 0, a: 0 };
    run();
  };

  // Turning inactive or unmounting mid-hold must not start tilt mode later
  useEffect(() => {
    if (inactive) {
      cancelHold();
      setNoSelect(false);
      touching.current = false;
    }
    return cancelHold;
  }, [inactive]);

  // Latest handlers for the native listeners below, which are bound once
  const touchHandlers = useRef({ aim, release });
  touchHandlers.current = { aim, release };

  // While tilt mode is on, the finger moves the card instead of the page.
  // touch-action is fixed when the finger lands, before a hold can be told
  // from a scroll, so the scroll is stopped here instead. React's touch
  // handlers are passive and can't do that, hence the native listener.
  // Tilt mode is driven by touch events, not pointer events: iOS still reads
  // the blocked move as a pan and cancels the pointer stream, while touch
  // events keep coming until the finger lifts.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const handleTouchMove = (e: TouchEvent) => {
      if (!touching.current) return;
      if (e.cancelable) e.preventDefault();
      const touch = e.touches[0];
      if (touch) touchHandlers.current.aim(touch.clientX, touch.clientY);
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (touching.current && e.touches.length === 0)
        touchHandlers.current.release();
    };
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);
    el.addEventListener("touchcancel", handleTouchEnd);
    return () => {
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  const startTilt = (el: HTMLElement, pointerId: number) => {
    holdTimer.current = null;
    touching.current = true;
    suppressClick.current = true;
    // Keep following the finger past the card's edge until it lifts
    try {
      el.setPointerCapture(pointerId);
    } catch {
      // The pointer is already gone
    }
    navigator.vibrate?.(HOLD_BUZZ);
    aim(lastPoint.current.x, lastPoint.current.y);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    suppressClick.current = false;
    if (inactive || e.pointerType !== "touch" || !e.isPrimary) return;
    holdStart.current = { x: e.clientX, y: e.clientY };
    lastPoint.current = { x: e.clientX, y: e.clientY };
    setNoSelect(true);
    cancelHold();
    const el = e.currentTarget;
    const id = e.pointerId;
    holdTimer.current = window.setTimeout(() => startTilt(el, id), HOLD_DELAY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (inactive) return;
    // Mouse and pen tilt on hover
    if (e.pointerType !== "touch") {
      aim(e.clientX, e.clientY);
      return;
    }
    if (!e.isPrimary) return;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    // In tilt mode the touch listeners aim the card
    if (!touching.current && holdTimer.current !== null) {
      // Moving before the hold completes is a scroll, not a pick-up
      const dx = e.clientX - holdStart.current.x;
      const dy = e.clientY - holdStart.current.y;
      if (Math.hypot(dx, dy) > HOLD_SLOP) {
        cancelHold();
        setNoSelect(false);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch" && e.isPrimary) release();
  };

  // Tilt mode ends on touchend / touchcancel instead: iOS cancels the
  // pointer mid-tilt even though the finger is still down
  const handleRelease = () => {
    if (!inactive && !touching.current) release();
  };

  // A long press would open the context menu (Android) mid-tilt
  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    if (touching.current || holdTimer.current !== null) e.preventDefault();
  };

  // Lifting the finger after a tilt isn't a tap on the card's content
  const handleClickCapture = (e: React.MouseEvent<HTMLElement>) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <group
      ref={stageRef}
      data-perspective={perspective}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      // The browser cancels the pointer when it takes over for a scroll
      onPointerCancel={handleRelease}
      onPointerLeave={handleRelease}
      onContextMenu={handleContextMenu}
      onClickCapture={handleClickCapture}
    >
      <group ref={cardRef} data-transform-style="preserve-3d">
        {children}
      </group>
    </group>
  );
};

interface TiltedCardLayerProps {
  children: React.ReactNode;
  depth?: number; // px this layer rises above the card while it's active
  // Any data-* attribute goes on the layer's group (data-position, data-top…)
  [key: `data-${string}`]: any;
}

// A part of the card face that floats above the rest while the card is
// active. Every element between the card and the layer must keep 3D
// (data-transform-style="preserve-3d") and must not clip (data-contain),
// or the layer flattens back onto the card.
// Extra data-* attributes are passed through; preserve-3d and the depth
// transform always win, since the layer needs them to work.
export const TiltedCardLayer: React.FC<TiltedCardLayerProps> = ({
  children,
  depth = 0,
  ...rest
}) => (
  <group
    {...rest}
    data-transform-style="preserve-3d"
    style={
      depth
        ? { transform: `translateZ(calc(var(${ACTIVE_VAR}, 0) * ${depth}px))` }
        : undefined
    }
  >
    {children}
  </group>
);

export default TiltedCard;
