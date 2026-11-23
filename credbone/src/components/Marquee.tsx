import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export type MarqueeLoop = "overflow" | "always";
export type MarqueeGap = 0 | 5 | 10 | 15 | 20 | 30 | 50;

// Handlers the marquee needs for itself; everything else passes through
type OwnHandlers =
  | "onPointerEnter"
  | "onPointerLeave"
  | "onPointerDown"
  | "onPointerMove"
  | "onPointerUp"
  | "onPointerCancel"
  | "onLostPointerCapture"
  | "onClickCapture"
  | "onDragStart"
  | "onFocus"
  | "onBlur"
  | "onScroll";

interface MarqueeProps
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    "children" | "draggable" | OwnHandlers
  > {
  children: React.ReactNode;
  auto?: boolean; // scroll on its own; otherwise only while hovered
  speed?: number; // px per second
  reverse?: boolean; // against the reading direction
  loop?: MarqueeLoop; // "overflow": only when the content doesn't fit; "always": repeat it to fill
  delay?: number; // ms to hold before scrolling and after each loop
  gap?: MarqueeGap; // px between the end of the content and its repeat
  pauseOnHover?: boolean; // auto mode only
  draggable?: boolean; // drag or swipe along the marquee
  fade?: boolean; // fade the edges while there's content beyond them
}

interface Fit {
  width: number; // content, px
  inner: number; // container without its padding, px
  outer: number; // container with its padding, px
}

const MAX_FRAME = 100; // ms; caps the step after a stalled frame
const MAX_COPIES = 40; // safety cap for tiny content in a wide container
const EASE = 150; // ms time constant for starting, stopping and speed changes
const MOMENTUM = 325; // ms time constant for a flick settling back
const RETURN = 150; // ms time constant for easing back to the start
const BRAKE = 120; // ms time constant for slowing into a delay
const VELOCITY_SETTLE = 0.5; // px/s
const POSITION_SETTLE = 0.5; // px
const DRAG_SLOP = 5; // px before a press becomes a drag
const FLICK_WINDOW = 100; // ms of movement a flick is measured over
const FLICK_STALE = 60; // ms without movement that makes a release a plain drop
const FLICK_MAX = 3000; // px/s
const EDGE = 20; // px of fade at the start edge

const FOCUSABLE = "a[href], button, input, select, textarea, [tabindex]";

const wrap = (v: number, period: number) =>
  period > 0 ? ((v % period) + period) % period : 0;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const Marquee: React.FC<MarqueeProps> = ({
  children,
  auto = false,
  speed = 90,
  reverse = false,
  loop = "overflow",
  delay = 0,
  gap = 20,
  pauseOnHover = true,
  draggable = false,
  fade = true,
  ...rest
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLElement>(null);
  const itemRef = useRef<HTMLElement>(null);

  // Motion. Position and velocity run along the reading direction: positive
  // is forward (content moves left in LTR, right in RTL).
  const pos = useRef(0); // px, 0..period
  const vel = useRef(0); // px/s
  const fling = useRef(false); // settling after a flick
  const returning = useRef(false); // easing back to the start
  const holding = useRef(false); // waiting out the delay
  const holdTimer = useRef<number | null>(null);
  const frame = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const visible = useRef(true);
  const rtl = useRef(false);
  const startFade = useRef<number | null>(null); // last written, px

  // Drag
  const pressed = useRef(false);
  const dragged = useRef(false); // the press became a drag
  const pressX = useRef(0);
  const lastX = useRef(0);
  const samples = useRef<{ t: number; x: number }[]>([]);
  const suppressClick = useRef(false);

  const [fit, setFit] = useState<Fit>({ width: 0, inner: 0, outer: 0 });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [engaged, setEngaged] = useState(false); // away from rest, so copies are needed
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const period = fit.width + gap;
  // 1px of tolerance: the container is measured in whole pixels
  const scrollable =
    fit.width > 0 &&
    fit.inner > 0 &&
    (loop === "always" || fit.width - fit.inner >= 1);
  const active = scrollable && !reducedMotion && (auto || hovered);
  const paused = focused || (auto && pauseOnHover && hovered);
  const repeating = scrollable && (loop === "always" || engaged || draggable);
  const copies = repeating
    ? Math.min(Math.ceil(fit.outer / period), MAX_COPIES)
    : 0;

  // Latest values for the animation loop, which outlives renders
  const live = useRef({
    active,
    paused,
    speed,
    reverse,
    delay,
    period,
    reducedMotion,
  });
  live.current = {
    active,
    paused,
    speed,
    reverse,
    delay,
    period,
    reducedMotion,
  };

  const write = () => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;
    const p = pos.current;
    const x = rtl.current ? p : -p;
    track.style.transform = p === 0 ? "" : `translate3d(${x}px, 0, 0)`;

    // The start edge fades only as content slides under it, so a resting
    // title is readable from its first letter
    const edge = Math.min(p, EDGE);
    if (edge === startFade.current) return;
    startFade.current = edge;
    root.style.setProperty("--mask-start", `${edge}px`);
  };

  // Copies only repeat the content for the eye: they're hidden from assistive
  // tech, and their links stay clickable but leave the tab order
  useLayoutEffect(() => {
    trackRef.current
      ?.querySelectorAll<HTMLElement>(":scope > [aria-hidden]")
      .forEach((copy) =>
        copy
          .querySelectorAll<HTMLElement>(FOCUSABLE)
          .forEach((el) => el.setAttribute("tabindex", "-1")),
      );
  });

  // Follow direction changes, which don't resize anything
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const next = getComputedStyle(root).direction === "rtl";
    if (next === rtl.current) return;
    rtl.current = next;
    write();
  });

  // Measure
  useEffect(() => {
    const root = rootRef.current;
    const item = itemRef.current;
    if (!root || !item) return;
    const measure = () => {
      const style = getComputedStyle(root);
      const outer = root.clientWidth;
      const inner =
        outer - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      // Not offsetWidth: a rounded width would make the loop point jump.
      // NaN while hidden (display: none).
      const width = parseFloat(getComputedStyle(item).width) || 0;
      setFit((prev) =>
        prev.width === width && prev.inner === inner && prev.outer === outer
          ? prev
          : { width, inner, outer },
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    observer.observe(item);
    return () => observer.disconnect();
  }, []);

  const clearHold = useCallback(() => {
    if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
    holdTimer.current = null;
    holding.current = false;
  }, []);

  const tick = useRef<(now: number) => void>(() => {});

  const run = useCallback(() => {
    if (frame.current === null)
      frame.current = requestAnimationFrame((now) => tick.current(now));
  }, []);

  const startHold = useCallback(() => {
    clearHold();
    if (live.current.delay <= 0) return;
    holding.current = true;
    holdTimer.current = window.setTimeout(() => {
      holdTimer.current = null;
      holding.current = false;
      run();
    }, live.current.delay);
  }, [clearHold, run]);

  const startReturn = useCallback(() => {
    vel.current = 0;
    fling.current = false;
    if (pos.current !== 0 && !live.current.reducedMotion) {
      returning.current = true;
      run();
      return;
    }
    pos.current = 0;
    write();
    setEngaged(false);
  }, [run]);

  // Moves one frame and returns whether there's more motion to come. Easing is
  // by elapsed time, so the speed is the same at any refresh rate.
  const step = (dt: number): boolean => {
    const { active, paused, speed, reverse, delay, period } = live.current;

    if (returning.current) {
      // The start and the loop point look the same: take the nearer one
      const distance =
        pos.current > period / 2 ? period - pos.current : -pos.current;
      if (Math.abs(distance) < POSITION_SETTLE) {
        pos.current = 0;
        returning.current = false;
        setEngaged(false);
        return false;
      }
      pos.current = wrap(
        pos.current + distance * (1 - Math.exp(-dt / RETURN)),
        period,
      );
      return true;
    }

    const sign = reverse ? -1 : 1;
    const moving = active && !paused && !holding.current;
    const target = moving ? Math.max(speed, 0) * sign : 0;
    vel.current +=
      (target - vel.current) *
      (1 - Math.exp(-dt / (fling.current ? MOMENTUM : EASE)));
    if (Math.abs(target - vel.current) < VELOCITY_SETTLE) {
      vel.current = target;
      fling.current = false;
    }

    const distance = (vel.current * dt) / 1000;

    // With a delay, slow into the loop point and hold there
    if (delay > 0 && target !== 0 && !fling.current) {
      const left = reverse ? pos.current || period : period - pos.current;
      const limit = left * (1 - Math.exp(-dt / BRAKE));
      const braked = Math.min(Math.abs(distance), limit);
      if (distance * sign > 0) {
        if (left - braked < POSITION_SETTLE) {
          pos.current = 0;
          vel.current = 0;
          startHold();
          return false;
        }
        pos.current = wrap(pos.current + braked * sign, period);
        return true;
      }
    }

    pos.current = wrap(pos.current + distance, period);
    return vel.current !== 0 || target !== 0;
  };

  // Written straight to the element: the marquee never re-renders as it moves
  tick.current = (now: number) => {
    const sleep = () => {
      frame.current = null;
      lastTime.current = null;
    };
    if (pressed.current || !visible.current || live.current.period <= 0) {
      sleep();
      return;
    }
    const dt = Math.min(now - (lastTime.current ?? now), MAX_FRAME);
    lastTime.current = now;
    const more = step(dt);
    write();
    if (more) frame.current = requestAnimationFrame((n) => tick.current(n));
    else sleep();
  };

  // Start and stop
  useEffect(() => {
    if (!active) {
      startReturn();
      return;
    }
    returning.current = false;
    setEngaged(true);
    startHold();
    run();
    return clearHold;
  }, [active, startReturn, startHold, clearHold, run]);

  // Setting changes ease in
  useEffect(() => {
    if (delay <= 0) clearHold();
    run();
  }, [paused, speed, reverse, delay, clearHold, run]);

  // Keep the position valid when the content, gap or container changes
  useLayoutEffect(() => {
    if (scrollable) {
      pos.current = wrap(pos.current, period);
    } else {
      pos.current = 0;
      vel.current = 0;
      fling.current = false;
      returning.current = false;
    }
    write();
  }, [scrollable, period]);

  // Sleep while off screen
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !scrollable) return;
    const observer = new IntersectionObserver((entries) => {
      visible.current = entries[entries.length - 1].isIntersecting;
      if (visible.current) run();
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      visible.current = true;
    };
  }, [scrollable, run]);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
      lastTime.current = null;
    },
    [],
  );

  const endPress = (velocity = 0) => {
    if (!pressed.current) return;
    pressed.current = false;
    if (dragged.current) setDragging(false);
    dragged.current = false;
    samples.current = [];
    vel.current = reducedMotion ? 0 : velocity;
    fling.current = vel.current !== 0;
    run();
  };

  // Losing the content or the prop mid-drag must not leave it held
  useEffect(() => {
    if (draggable && scrollable) return;
    pressed.current = false;
    dragged.current = false;
    samples.current = [];
    setDragging(false);
    run();
  }, [draggable, scrollable, run]);

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    suppressClick.current = false;
    if (!draggable || !scrollable || !e.isPrimary || e.button !== 0) return;
    pressed.current = true;
    dragged.current = false;
    pressX.current = e.clientX;
    samples.current = [];
    vel.current = 0;
    fling.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!pressed.current || !e.isPrimary) return;

    if (!dragged.current) {
      if (Math.abs(e.clientX - pressX.current) <= DRAG_SLOP) return;
      dragged.current = true;
      suppressClick.current = true;
      returning.current = false;
      clearHold();
      setDragging(true);
      lastX.current = e.clientX;
      // Captured only now: capturing on press would take clicks from links
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // The pointer is already gone
      }
    }

    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    pos.current = wrap(pos.current + (rtl.current ? dx : -dx), period);
    samples.current = [
      ...samples.current.filter((s) => e.timeStamp - s.t <= FLICK_WINDOW),
      { t: e.timeStamp, x: e.clientX },
    ];
    write();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (!e.isPrimary) return;
    const first = samples.current[0];
    const last = samples.current[samples.current.length - 1];
    let velocity = 0;
    if (
      dragged.current &&
      last &&
      last.t > first.t &&
      e.timeStamp - last.t <= FLICK_STALE
    ) {
      const v = ((last.x - first.x) / (last.t - first.t)) * 1000;
      velocity = clamp(rtl.current ? v : -v, -FLICK_MAX, FLICK_MAX);
    }
    endPress(velocity);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "touch") setHovered(true);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "touch") setHovered(false);
    // A press that wandered off before becoming a drag has no capture
    if (!dragged.current) endPress();
  };

  // Releasing a drag isn't a click on the content. Keyboard clicks have no detail.
  const handleClickCapture = (e: React.MouseEvent<HTMLElement>) => {
    if (!suppressClick.current || e.detail === 0) return;
    suppressClick.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  // Keyboard focus stops the motion and brings the focused item into view
  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    const root = rootRef.current;
    const item = itemRef.current;
    const el = e.target as HTMLElement;
    if (!root || !item || !scrollable || !el.matches(":focus-visible")) return;
    clearHold();
    setFocused(true);
    setEngaged(true);
    returning.current = false;
    vel.current = 0;
    fling.current = false;
    const box = root.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    if (rect.left >= box.left && rect.right <= box.right) return;
    const start = item.getBoundingClientRect();
    const offset = rtl.current
      ? start.right - rect.right
      : rect.left - start.left;
    pos.current = wrap(Math.max(offset - EDGE, 0), period);
    write();
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!focused || e.currentTarget.contains(e.relatedTarget as Node | null))
      return;
    setFocused(false);
    if (!active) startReturn();
  };

  // The browser may scroll the container itself (focus, find in page). Turn
  // that into a position, so the two never add up.
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (el.scrollLeft === 0) return;
    const by = rtl.current ? -el.scrollLeft : el.scrollLeft;
    el.scrollLeft = 0;
    if (!scrollable) return;
    pos.current = wrap(pos.current + by, period);
    write();
  };

  return (
    <group
      {...rest}
      ref={rootRef}
      data-wrap="no"
      data-contain=""
      data-mask={fade && scrollable ? "start-end" : undefined}
      data-cursor={
        draggable && scrollable ? (dragging ? "grabbing" : "grab") : undefined
      }
      data-touch-action={draggable && scrollable ? "pan-y" : undefined}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      // The browser cancels the pointer when it takes over for a scroll
      onPointerCancel={() => endPress()}
      // Taking the capture from a touched child also reports a loss, on the child
      onLostPointerCapture={(e: React.PointerEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) endPress();
      }}
      onClickCapture={handleClickCapture}
      // No native drag of links and images
      onDragStart={
        draggable ? (e: React.DragEvent) => e.preventDefault() : undefined
      }
      onFocus={handleFocus}
      onBlur={handleBlur}
      onScroll={handleScroll}
    >
      <group
        ref={trackRef}
        data-width="max-content"
        data-max-length="auto"
        data-shrink="no"
        data-will-change={engaged ? "transform" : undefined}
      >
        <group ref={itemRef} data-width="max-content" data-max-length="auto">
          {children}
        </group>

        {/* Out of flow, so repeating never changes the marquee's own size */}
        {Array.from({ length: copies }, (_, i) => (
          <group
            key={i}
            aria-hidden="true"
            data-position="absolute"
            data-top="0"
            data-width="max-content"
            data-max-length="auto"
            style={{ insetInlineStart: period * (i + 1) }}
          >
            {children}
          </group>
        ))}
      </group>
    </group>
  );
};

export default Marquee;
