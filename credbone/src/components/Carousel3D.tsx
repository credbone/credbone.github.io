import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Ripple from "./Ripple";
import Tooltip from "./tooltip";
import { POPOVER_DISMISS_EVENT } from "./popover";

export interface Carousel3DItem {
  id: string;
  title?: string;
  // Or a render function, to style the card differently while it's centered
  node: React.ReactNode | ((state: { centered: boolean }) => React.ReactNode);
  // Shown under the stage for the centered item; slides with the cards
  caption?: React.ReactNode;
}

// Horizontal layout for one breakpoint
export interface Carousel3DSpread {
  spread: number; // distance between cards, as a share of the stage width
  maxSpread: number; // px cap on that distance
  sideCount: number; // cards visible on each side of the center
}

interface Carousel3DProps {
  items: Carousel3DItem[];
  initialIndex?: number;
  onChange?: (index: number) => void;
  desktop?: Partial<Carousel3DSpread>;
  mobile?: Partial<Carousel3DSpread>; // below MOBILE_BREAKPOINT
  depth?: number; // px each step sits further back
  tilt?: number; // deg side cards turn
  fade?: number; // opacity lost per step (0..1)
  cardWidth?: string; // data-length value of each card
  perspective?: string; // data-perspective value of the stage
  align?: "start" | "center" | "end"; // vertical alignment of cards with different heights
  intro?: boolean | number; // slide in from this many cards before initialIndex; true = INTRO_STEPS, negative slides the other way
}

const DEFAULT_DESKTOP: Carousel3DSpread = { spread: 0.22, maxSpread: 240, sideCount: 2 };
const DEFAULT_MOBILE: Carousel3DSpread = { spread: 0.3, maxSpread: 140, sideCount: 1 };

// Text fields keep their own drag (text selection) while focused
const TEXT_FIELD_SELECTOR =
  'textarea, [contenteditable], input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"])';

const DRAG_THRESHOLD = 8;
const WHEEL_IDLE = 120; // ms without wheel events that ends a touchpad swipe
const WHEEL_LINE = 16; // px per line, for wheels that report in lines
const FLICK_VELOCITY = 0.5; // px per ms
const MOMENTUM_TIME = 250; // ms of coasting projected from release velocity
const SNAP_DURATION = 450; // ms
const INTRO_STEPS = 3;
const INTRO_DURATION = 900; // ms
const MOBILE_BREAKPOINT = 600;

// Tick rail
const TICK_SPACING = 15; // px between ticks
const RAIL_HALF = 120; // px, half of the rail width (data-length="240")
const RAIL_TICKS = Math.ceil(RAIL_HALF / TICK_SPACING) + 1; // per side

// Caption
const CAPTION_SHIFT = 120; // px a caption travels per item step
const CAPTION_FOLLOW = 0.3; // 0..1 per frame; lower trails the cards more

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

// Always-positive modulo, for wrapping indexes and offsets
const mod = (v: number, n: number) => ((v % n) + n) % n;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

// True when something between the target and the stage can still scroll
// sideways in the swipe's direction, so the swipe belongs to it
const innerScrollsX = (from: EventTarget | null, root: HTMLElement, dx: number) => {
  let el = from instanceof HTMLElement ? from : null;
  while (el && el !== root) {
    const { overflowX } = getComputedStyle(el);
    if (
      (overflowX === "auto" || overflowX === "scroll") &&
      el.scrollWidth > el.clientWidth &&
      (dx < 0
        ? el.scrollLeft > 0
        : el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    ) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Carousel3D: React.FC<Carousel3DProps> = ({
  items,
  initialIndex = 0,
  onChange,
  desktop,
  mobile,
  depth = 160,
  tilt = 35,
  fade = 0.3,
  cardWidth = "260",
  perspective = "1200",
  align = "center",
  intro = true,
}) => {
  const count = items.length;

  // Where the intro starts; fixed on mount. Capped so it never laps the items
  const [introStart] = useState(() => {
    if (prefersReducedMotion()) return initialIndex;
    const steps = intro === true ? INTRO_STEPS : intro === false ? 0 : intro;
    const max = Math.max(count - 1, 0);
    return initialIndex - clamp(steps, -max, max);
  });
  const introDone = useRef(false);

  // Unbounded: every integer is a card, wrapped onto items with mod()
  const [position, setPositionState] = useState(introStart);
  const positionRef = useRef(introStart);
  const setPosition = (value: number) => {
    positionRef.current = value;
    setPositionState(value);
  };

  const [dragging, setDragging] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);

  const stageRef = useRef<HTMLElement>(null);
  const animation = useRef<number | null>(null);
  const drag = useRef({
    el: null as HTMLElement | null,
    stepSize: 0, // px of pointer travel per item: card spacing on the stage, tick spacing on the rail
    pointerId: -1,
    startX: 0,
    startY: 0,
    startPos: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    active: false,
    moved: false,
  });

  const activeIndex = mod(Math.round(position), count);
  const isMobile = stageWidth > 0 && stageWidth < MOBILE_BREAKPOINT;
  const layout = isMobile
    ? { ...DEFAULT_MOBILE, ...mobile }
    : { ...DEFAULT_DESKTOP, ...desktop };
  // Cards visible per side; capped so the wrap point stays out of view
  const sideCount = Math.min(layout.sideCount, Math.floor((count - 1) / 2));
  const spacing = Math.min(layout.maxSpread, stageWidth * layout.spread);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setStageWidth(entry.contentRect.width)
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const stopAnimation = () => {
    if (animation.current !== null) cancelAnimationFrame(animation.current);
    animation.current = null;
  };

  useEffect(() => stopAnimation, []);

  // Caption position chases the card position a little behind, so it moves
  // with the same direction and speed but trails slightly
  const [captionPos, setCaptionPos] = useState(introStart);
  const captionRef = useRef(introStart);
  const captionAnimation = useRef<number | null>(null);

  useEffect(() => {
    if (captionAnimation.current !== null) return;
    const follow = reducedMotion ? 1 : CAPTION_FOLLOW;
    const tick = () => {
      const target = positionRef.current;
      const diff = target - captionRef.current;
      const next =
        Math.abs(diff) < 0.001 ? target : captionRef.current + diff * follow;
      captionRef.current = next;
      setCaptionPos(next);
      captionAnimation.current =
        next === target ? null : requestAnimationFrame(tick);
    };
    captionAnimation.current = requestAnimationFrame(tick);
  }, [position, reducedMotion]);

  useEffect(
    () => () => {
      if (captionAnimation.current !== null)
        cancelAnimationFrame(captionAnimation.current);
      // Reset so a remount (StrictMode runs effects twice) can start the loop again
      captionAnimation.current = null;
    },
    []
  );

  // Animated in JS (not CSS transitions) so cards wrapping from one end to
  // the other move continuously instead of flying across the stage
  // silent skips onChange, for moves the user didn't make (the intro)
  const animateTo = useCallback(
    (
      target: number,
      { duration = SNAP_DURATION, ease = easeOutCubic, silent = false } = {}
    ) => {
      stopAnimation();
      if (!silent) onChange?.(mod(target, count));

      const from = positionRef.current;
      if (reducedMotion || from === target) {
        setPosition(target);
        return;
      }

      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setPosition(from + (target - from) * ease(t));
        animation.current = t < 1 ? requestAnimationFrame(step) : null;
      };
      animation.current = requestAnimationFrame(step);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, onChange, reducedMotion]
  );

  // Intro: slide to initialIndex once the stage has a width, so card spacing
  // is real. A drag during the intro stops it like any other snap
  useEffect(() => {
    if (introDone.current || stageWidth <= 0) return;
    introDone.current = true;
    if (introStart !== initialIndex) {
      animateTo(initialIndex, {
        duration: INTRO_DURATION,
        ease: easeOutQuint,
        silent: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageWidth]);

  // Move by a number of cards from the nearest snapped position
  const goBy = (steps: number) =>
    animateTo(Math.round(positionRef.current) + steps);

  // Go to an item through the shortest way around
  const goTo = (index: number) => {
    const current = Math.round(positionRef.current);
    let delta = mod(index - current, count);
    if (delta > count / 2) delta -= count;
    animateTo(current + delta);
  };

  // Shared by the stage (cards) and the tick rail; only the step size differs
  const startDrag = (e: React.PointerEvent<HTMLElement>, stepSize: number) => {
    if (e.button !== 0) return;
    // Portaled content (popovers, bottom sheets) bubbles here through React
    // but isn't in the carousel: leave its swipes alone
    if (!e.currentTarget.contains(e.target as Node)) return;
    drag.current.moved = false;
    // Any press can become a swipe (buttons included): the first movement decides.
    // Only a focused text field keeps the drag, for selecting text
    const field = (e.target as HTMLElement).closest(TEXT_FIELD_SELECTOR);
    if (field && field === document.activeElement) return;

    // Grab the rail mid-animation where it is
    stopAnimation();

    drag.current = {
      el: e.currentTarget,
      stepSize,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startPos: positionRef.current,
      lastX: e.clientX,
      lastT: e.timeStamp,
      velocity: 0,
      active: true,
      moved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.pointerId || d.stepSize <= 0) return;

    const dx = e.clientX - d.startX;
    if (!d.moved) {
      // Axis lock on the first real movement: horizontal swipes the carousel,
      // vertical leaves the gesture to the page and the content
      const dy = e.clientY - d.startY;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < DRAG_THRESHOLD) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        d.active = false;
        return;
      }
      d.moved = true;
      setDragging(true);
      window.dispatchEvent(new Event(POPOVER_DISMISS_EVENT));
      d.el?.setPointerCapture(e.pointerId);
    }

    // Smoothed velocity so a single jittery sample doesn't dominate
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) {
      const v = (e.clientX - d.lastX) / dt;
      d.velocity = d.velocity * 0.6 + v * 0.4;
    }
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;

    setPosition(d.startPos - dx / d.stepSize);
  };

  const endDrag = (e: React.PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    d.active = false;
    if (!d.moved) {
      // A tap that interrupted a snap leaves the rail between cards: finish it
      const pos = positionRef.current;
      if (pos !== Math.round(pos)) animateTo(Math.round(pos));
      return;
    }

    if (d.el?.hasPointerCapture(e.pointerId)) {
      d.el.releasePointerCapture(e.pointerId);
    }
    setDragging(false);

    // Pointer held still before release: no momentum
    const velocity = e.timeStamp - d.lastT > 100 ? 0 : d.velocity;

    // Inertia: project where the drag would coast to, then snap there
    const projected =
      positionRef.current - (velocity * MOMENTUM_TIME) / d.stepSize;
    const startIndex = Math.round(d.startPos);
    let target = Math.round(projected);
    if (Math.abs(velocity) > FLICK_VELOCITY && target === startIndex) {
      target = startIndex - Math.sign(velocity);
    }
    animateTo(target);
  };

  // Touchpad swipes (and Shift + wheel) arrive as wheel events, not pointers.
  // Cards follow deltaX like a drag; a short pause in events ends the swipe
  // and snaps. macOS momentum events keep it coasting before the pause
  const wheel = useRef({
    axis: null as "x" | "y" | null, // locked for the whole gesture
    timer: null as number | null,
  });

  const handleWheel = useRef<(e: WheelEvent) => void>(() => {});
  handleWheel.current = (e: WheelEvent) => {
    const stage = stageRef.current;
    if (!stage || spacing <= 0 || drag.current.active) return;

    const unit =
      e.deltaMode === 1 ? WHEEL_LINE : e.deltaMode === 2 ? stageWidth : 1;
    const dx = e.deltaX * unit;
    const dy = e.deltaY * unit;
    const w = wheel.current;

    if (w.axis === null) {
      if (dx === 0 && dy === 0) return;
      // Vertical, or a sideways scroll something inside should take: not ours
      w.axis =
        Math.abs(dx) > Math.abs(dy) && !innerScrollsX(e.target, stage, dx)
          ? "x"
          : "y";
      if (w.axis === "x") {
        stopAnimation();
        window.dispatchEvent(new Event(POPOVER_DISMISS_EVENT));
      }
    }

    if (w.timer !== null) window.clearTimeout(w.timer);
    w.timer = window.setTimeout(() => {
      w.timer = null;
      const wasOurs = w.axis === "x";
      w.axis = null;
      if (wasOurs) animateTo(Math.round(positionRef.current));
    }, WHEEL_IDLE);

    if (w.axis !== "x") return;
    // Also keeps the browser's two-finger back/forward swipe from firing
    e.preventDefault();
    setPosition(positionRef.current + dx / spacing);
  };

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => handleWheel.current(e);
    // Non-passive so preventDefault works (React's onWheel is passive)
    el.addEventListener("wheel", onWheel, { passive: false });
    const w = wheel.current;
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (w.timer !== null) window.clearTimeout(w.timer);
    };
  }, []);

  // Swallow the click that follows a drag so cards/widgets don't fire
  const handleClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      drag.current.moved = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.target as Node)) return;
    if ((e.target as HTMLElement).closest("input, textarea, select")) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goBy(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goBy(1);
    }
  };

  // Offset of an item from the center, wrapped into [-count/2, count/2)
  const cardOffset = (index: number) =>
    mod(index - position + count / 2, count) - count / 2;

  const cardStyle = (index: number): React.CSSProperties => {
    const offset = cardOffset(index);
    const distance = Math.abs(offset);
    const turn = clamp(offset, -1, 1);

    // Full fade between the last visible card and half a step past it,
    // so the card is invisible by the time it wraps to the other side
    const fadeEnd = sideCount + 0.5;
    const opacity = clamp(
      distance <= sideCount
        ? 1 - distance * fade
        : (1 - sideCount * fade) * clamp((fadeEnd - distance) / 0.5, 0, 1),
      0,
      1
    );
    // Until the stage is measured, spacing is 0 and every card would sit in the center
    const hidden = opacity <= 0 || stageWidth <= 0;

    const transform = reducedMotion
      ? `translateX(${offset * spacing}px)`
      : `translateX(${offset * spacing}px) translateZ(${-distance * depth}px) rotateY(${-turn * tilt}deg)`;

    return {
      transform,
      opacity,
      zIndex: 100 - Math.round(distance * 10),
      visibility: hidden ? "hidden" : "visible",
    };
  };

  // Ticks around the current position; each integer step is one item, repeating forever
  const railBase = Math.round(position);
  const railTicks = [];
  for (let k = -RAIL_TICKS; k <= RAIL_TICKS; k++) {
    const step = railBase + k;
    const x = (step - position) * TICK_SPACING;
    // Fades out toward the edges
    const opacity = clamp(
      (RAIL_HALF - Math.abs(x)) / (TICK_SPACING * 2),
      0,
      1
    );
    railTicks.push({ step, x, opacity, index: mod(step, count) });
  }

  // The two captions either side of the caption position; full at center, gone half a step out
  const captionBase = Math.floor(captionPos);
  const captionSteps = [captionBase, captionBase + 1].map((step) => {
    const offset = step - captionPos;
    return { step, offset, opacity: clamp(1 - Math.abs(offset) * 2, 0, 1) };
  });

  return (
    <group data-direction="column" data-gap="30"  data-align="center">
      <group
        ref={stageRef}
        data-type="stack"
        data-align={align}
        data-perspective={perspective}
       // data-contain=""
        data-touch-action="pan-y"
        data-user-select={dragging ? "none" : undefined}
        data-cursor={dragging ? "grabbing" : "grab"}
        data-space="30"
        tabIndex={0}
        aria-roledescription="carousel"
        onPointerDown={(e: React.PointerEvent<HTMLElement>) => startDrag(e, spacing)}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={handleClickCapture}
        onKeyDown={handleKeyDown}


      >
        {items.map((item, index) => {
          const isActive = index === activeIndex && !dragging;
          return (
            <group
              key={item.id}
              data-length={cardWidth}
              data-carousel-active={isActive ? "true" : "false"}
              data-cursor={isActive ? undefined : "pointer"}
              aria-hidden={!isActive}
              aria-label={item.title}
              style={cardStyle(index)}
              onClick={isActive ? undefined : () => goTo(index)}
            >
              <group data-pointer-event={isActive ? undefined : "none"}>
                {typeof item.node === "function"
                  ? item.node({ centered: index === activeIndex })
                  : item.node}
              </group>
            </group>
          );
        })}
      </group>

      {/* Captions of the two items around the center slide with the cards
          and cross-fade, so they read as one motion */}
      {items.some((item) => item.caption) && (
        <group
          data-type="stack"
          data-length="320"
       //   data-contain=""
          data-text-align="center"
          aria-live="polite"
        >
          {captionSteps.map(({ step, offset, opacity }) => {
            const item = items[mod(step, count)];
            return (
              <group
                key={step}
                data-direction="column"
                data-align="center"
                aria-hidden={opacity < 0.5}
                style={{
                  transform: `translateX(${offset * CAPTION_SHIFT}px)`,
                  opacity,
                  visibility: opacity > 0 ? "visible" : "hidden",
                }}
              >
                {item.caption}
              </group>
            );
          })}
        </group>
      )}

      <group
        data-gap="5"
        data-align="center"
        data-justify="center"
        data-wrap="no"
        data-width="auto"
      >
        <Tooltip content="Previous">
<group data-width="auto">
            <Ripple>
            <group
            data-over-color="neutral"
            data-ink-color="neutral"
            data-background="adaptive-gray"
              data-interactive=""
              data-cursor="pointer"
              data-length="36"
              data-height="36"
              data-radius="40"
              data-align="center"
              data-justify="center"
              data-contain=""
              onClick={() => goBy(-1)}
            >
              <icon>
                <ChevronLeft strokeWidth={1.5} size={20} />
              </icon>
            </group>
          </Ripple>
</group>
        </Tooltip>

        {/* Infinite tick rail: scrolls with the carousel and can be dragged to scroll it */}
        <group
          data-length="240"
          data-height="30"
          data-contain=""
          data-shrink="no"
          data-touch-action="pan-y"
          data-user-select="none"
          data-cursor={dragging ? "grabbing" : "grab"}
          onPointerDown={(e: React.PointerEvent<HTMLElement>) =>
            startDrag(e, TICK_SPACING)
          }
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={handleClickCapture}
        >
          {railTicks.map((tick) => (
            <group
              key={tick.step}
              data-position="absolute"
              data-left="50%"
              data-top="0"
              data-length="15"
              data-height="30"
              data-align="center"
              data-justify="center"
              data-cursor="pointer"
              aria-label={items[tick.index].title || `Item ${tick.index + 1}`}
              style={{
                transform: `translateX(${tick.x - TICK_SPACING / 2}px)`,
                opacity: tick.opacity,
                visibility: tick.opacity > 0 ? "visible" : "hidden",
              }}
              onClick={() => animateTo(tick.step)}
            >
              <group
                data-length="1"
                data-height="10"
              //  data-radius="full"
                data-background="text"
                data-opacity="30"
              ></group>
            </group>
          ))}
        </group>

        <Tooltip content="Next">
<group>
            <Ripple>
            <group
                        data-over-color="neutral"
            data-ink-color="neutral"
            data-background="adaptive-gray"
              data-interactive=""
              data-cursor="pointer"
              data-length="36"
              data-height="36"
              data-radius="full"
              data-align="center"
              data-justify="center"
              data-contain=""
              onClick={() => goBy(1)}
            >
              <icon>
                <ChevronRight strokeWidth={1.5} size={20} />
              </icon>
            </group>
          </Ripple>
</group>
        </Tooltip>
      </group>
    </group>
  );
};

export default Carousel3D;
