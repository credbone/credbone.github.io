import React, { useEffect, useRef, useState, useCallback } from "react";
import classNames from "classnames";
import Button from "./button";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

// Drag and glide, same feel as the marquee
const DRAG_SLOP = 5; // px before a press becomes a drag
const FLICK_WINDOW = 100; // ms of movement a flick is measured over
const FLICK_STALE = 60; // ms without movement that makes a release a plain drop
const FLICK_MAX = 3000; // px/s
const MOMENTUM = 325; // ms time constant for a flick slowing down
const MAX_FRAME = 100; // ms; caps the step after a stalled frame
const VELOCITY_SETTLE = 10; // px/s
const CATCH_VELOCITY = 100; // px/s above which a press only stops the glide
const DRIFT = 2; // px of movement that isn't the glide's own
const PAGE = 0.8; // share of the visible size an arrow button scrolls

// Presses on these never start a drag
const NO_DRAG = 'input, textarea, select, [role="slider"], [draggable="true"]';

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const isRtl = (el: HTMLElement) => getComputedStyle(el).direction === "rtl";

const getScroll = (el: HTMLElement, vertical?: boolean) =>
  vertical ? el.scrollTop : el.scrollLeft;

const setScroll = (
  el: HTMLElement,
  vertical: boolean | undefined,
  v: number
) => {
  if (vertical) el.scrollTop = v;
  else el.scrollLeft = v;
};

// Lowest and highest scroll position. In RTL, scrollLeft runs from 0 down.
const getBounds = (el: HTMLElement, vertical?: boolean): [number, number] => {
  if (vertical) return [0, Math.max(el.scrollHeight - el.clientHeight, 0)];
  const max = Math.max(el.scrollWidth - el.clientWidth, 0);
  return isRtl(el) ? [-max, 0] : [0, max];
};


  // ButtonTemplate component
const ButtonTemplate: React.FC<{
  vertical: boolean;
  direction: "prev" | "next";
  show: boolean;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement> & Record<string, unknown>;
  onClick: () => void;
}> = ({ vertical, direction, show, onClick, buttonProps }) => {
  const icon = vertical
    ? direction === "prev"
      ? <ChevronUp strokeWidth={1.5} size={20}/>
      : <ChevronDown strokeWidth={1.5} size={20}/>
    : direction === "prev"
    ? <ChevronLeft strokeWidth={1.5} size={20}/>
    : <ChevronRight strokeWidth={1.5} size={20}/>;

  return (
    <Button
    data-over-color="neutral"
    data-ink-color="neutral"
      data-contain="visible"
      micro
data-backdrop="10"
      className={classNames("slide-button", direction, { show })}
      icon={icon}
       {...buttonProps}
      onClick={onClick}
    />
  );
};


const Scroll: React.FC<{
  children: React.ReactNode; // Updated from React.ReactChild to React.ReactNode
  className?: string;
  vertical?: boolean;
  wheelEnabled?: boolean;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement> & Record<string, unknown>;
}> = ({ children, className, vertical, wheelEnabled = false, buttonProps  }) => {
  const [{ showLB, showRB }, setShowButtons] = useState<{
    showB: boolean;
    showLB: boolean;
    showRB: boolean;
  }>({
    showB: false,
    showLB: false,
    showRB: false,
  });

  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const horizontal = !vertical;

  // Glide after a flick
  const frame = useRef<number | null>(null);
  const velocity = useRef(0); // px/s along the scroll position

  const stopGlide = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    velocity.current = 0;
  }, []);

  const startGlide = useCallback(
    (el: HTMLElement, v: number) => {
      stopGlide();
      velocity.current = v;
      // Kept here: the browser may round the scroll position
      let pos = getScroll(el, vertical);
      let last = performance.now();

      const tick = (now: number) => {
        frame.current = null;
        // Something else scrolled it
        if (Math.abs(getScroll(el, vertical) - pos) > DRIFT) {
          stopGlide();
          return;
        }
        // By elapsed time, so it's the same at any refresh rate
        const dt = clamp(now - last, 0, MAX_FRAME);
        last = now;
        const decay = Math.exp(-dt / MOMENTUM);
        const [min, max] = getBounds(el, vertical);
        const next = pos + (velocity.current * MOMENTUM * (1 - decay)) / 1000;
        pos = clamp(next, min, max);
        velocity.current *= decay;
        setScroll(el, vertical, pos);
        if (pos !== next || Math.abs(velocity.current) < VELOCITY_SETTLE) {
          stopGlide();
          return;
        }
        frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    },
    [vertical, stopGlide]
  );

  // Drag, mouse only: touch and pen scroll natively. Native listeners, so
  // presses in popovers opened from the items don't bubble in as React events.
  useEffect(() => {
    if (!element) return;
    let pressed = false;
    let dragged = false; // the press became a drag
    let suppressClick = false;
    let start = 0;
    let lastPoint = 0;
    let pos = 0;
    let samples: { t: number; p: number }[] = [];

    const point = (e: PointerEvent) => (vertical ? e.clientY : e.clientX);

    const endPress = () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointercancel", endPress);
      if (dragged) setIsDragging(false);
      pressed = false;
      dragged = false;
      samples = [];
    };

    const handleDown = (e: PointerEvent) => {
      if (!e.isPrimary) return;
      // Catching a moving strip only stops it
      suppressClick = Math.abs(velocity.current) > CATCH_VELOCITY;
      stopGlide();
      endPress();

      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (target.closest(NO_DRAG) || target.isContentEditable) return;
      const [min, max] = getBounds(element, vertical);
      if (max - min < 1) return;

      pressed = true;
      start = point(e);
      // On the document, so a fast move can leave the strip before it's a drag
      document.addEventListener("pointermove", handleMove);
      document.addEventListener("pointerup", handleUp);
      document.addEventListener("pointercancel", endPress);
    };

    const handleMove = (e: PointerEvent) => {
      if (!e.isPrimary) return;
      // Released where the page couldn't see it
      if (!(e.buttons & 1)) {
        endPress();
        return;
      }
      if (!dragged) {
        if (Math.abs(point(e) - start) <= DRAG_SLOP) return;
        dragged = true;
        suppressClick = true;
        lastPoint = point(e);
        pos = getScroll(element, vertical);
        setIsDragging(true);
        // Captured only now: capturing on press would take clicks from items
        try {
          element.setPointerCapture(e.pointerId);
        } catch {
          // The pointer is already gone
        }
      }

      const [min, max] = getBounds(element, vertical);
      pos = clamp(pos - (point(e) - lastPoint), min, max);
      lastPoint = point(e);
      samples = [
        ...samples.filter((s) => e.timeStamp - s.t <= FLICK_WINDOW),
        { t: e.timeStamp, p: lastPoint },
      ];
      setScroll(element, vertical, pos);
    };

    const handleUp = (e: PointerEvent) => {
      if (!e.isPrimary) return;
      const first = samples[0];
      const last = samples[samples.length - 1];
      let v = 0;
      if (
        dragged &&
        last &&
        last.t > first.t &&
        e.timeStamp - last.t <= FLICK_STALE &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        // The content goes where the pointer goes, so the scroll goes against it
        const speed = ((first.p - last.p) / (last.t - first.t)) * 1000;
        v = clamp(speed, -FLICK_MAX, FLICK_MAX);
      }
      endPress();
      if (Math.abs(v) >= VELOCITY_SETTLE) startGlide(element, v);
    };

    // Releasing a drag isn't a click on an item. Keyboard clicks have no detail.
    const handleClick = (e: MouseEvent) => {
      if (!suppressClick || e.detail === 0) return;
      suppressClick = false;
      e.preventDefault();
      e.stopPropagation();
    };

    // No native drag of links and images
    const handleDragStart = (e: DragEvent) => {
      if (pressed) e.preventDefault();
    };

    element.addEventListener("pointerdown", handleDown);
    element.addEventListener("click", handleClick, true);
    element.addEventListener("dragstart", handleDragStart);
    element.addEventListener("wheel", stopGlide, { passive: true });
    window.addEventListener("keydown", stopGlide, true);

    return () => {
      endPress();
      stopGlide();
      element.removeEventListener("pointerdown", handleDown);
      element.removeEventListener("click", handleClick, true);
      element.removeEventListener("dragstart", handleDragStart);
      element.removeEventListener("wheel", stopGlide);
      window.removeEventListener("keydown", stopGlide, true);
    };
  }, [element, vertical, startGlide, stopGlide]);

  const scrollHandler = (next: boolean) => {
    if (!element) return;
    stopGlide();
    const size = vertical ? element.clientHeight : element.clientWidth;
    element.scrollBy({
      [vertical ? "top" : "left"]: (next ? 1 : -1) * size * PAGE,
      behavior: "smooth",
    });
  };

  const manageButtonsVisibility = useCallback(() => {
    let show = false;
    let showL = false;
    let showR = false;
    if (element) {
      // 1px of tolerance: the sizes are rounded, the position may not be
      const [min, max] = getBounds(element, vertical);
      const at = getScroll(element, vertical);
      show = max - min >= 1;
      showL = at - min >= 1;
      showR = max - at >= 1;
    }
    setShowButtons((prev) =>
      prev.showB !== show || prev.showLB !== showL || prev.showRB !== showR
        ? { showB: show, showLB: showL, showRB: showR }
        : prev
    );
  }, [element, vertical]);

  useEffect(() => {
    if (ref.current) {
      const container: HTMLDivElement = ref.current;
      setElement(
        container.children.length > 0
          ? (container.children[0] as HTMLElement)
          : null
      );
    } else {
      setElement(null);
    }
  }, [ref]);

  useEffect(() => {
    // Once per frame, so the arrows and fade keep up with the movement
    let raf: number | null = null;
    const onScrollOrResize = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        manageButtonsVisibility();
      });
    };

    // Once more when the layout has settled
    const timeout = window.setTimeout(manageButtonsVisibility, 50);

    window.addEventListener("resize", onScrollOrResize);
    element?.addEventListener("scroll", onScrollOrResize);

    return () => {
      window.clearTimeout(timeout);
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onScrollOrResize);
      element?.removeEventListener("scroll", onScrollOrResize);
    };
  }, [element, manageButtonsVisibility]);

  useEffect(() => {
    manageButtonsVisibility();
  }, [children, manageButtonsVisibility]);

  useEffect(() => {
    if (!element || !horizontal || !wheelEnabled) return;

    const wheelHandler = (e: WheelEvent) => {
      // Zooming, or a sideways wheel that already scrolls it natively
      if (e.ctrlKey || Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
      const delta = isRtl(element) ? -e.deltaY : e.deltaY;
      const [min, max] = getBounds(element);
      const left = delta > 0 ? max - element.scrollLeft : element.scrollLeft - min;
      // Nothing left to scroll that way: let the page have it
      if (left < 1) return;
      e.preventDefault();
      element.scrollBy({ left: delta });
    };

    element.addEventListener("wheel", wheelHandler, { passive: false });
    return () => element.removeEventListener("wheel", wheelHandler);
  }, [element, horizontal, wheelEnabled]);

  return (
    <div
      className={classNames("snapcont", {
        vertical,
        horizontal,
        left: showLB,
        right: showRB,
      })}
    >
      <div
        ref={ref}
        className={classNames("snapscroll", className, {
          dragging: isDragging,
        })}
      >
        {children}
      </div>
      <ButtonTemplate
        vertical={vertical ?? false}
        direction="prev"
        show={showLB}
buttonProps={buttonProps}
        onClick={() => scrollHandler(false)}
      />
      <ButtonTemplate
        vertical={vertical ?? false}
        direction="next"
        show={showRB}
buttonProps={buttonProps}
        onClick={() => scrollHandler(true)}
      />
    </div>
  );
};

export default Scroll;
