import React, {
  Children,
  HTMLAttributes,
  ReactElement,
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

// Rearranges keyed children by drag. Mouse drags after a short move,
// touch after a long-press so normal scrolling keeps working.
// Children must be keyed elements; the keys make up `order`.
// The dragged item itself follows the pointer (never remounted), while an
// empty placeholder holds its future place in the grid.

interface SortableGridProps extends HTMLAttributes<HTMLElement> {
  order: string[];
  onOrderChange: (order: string[]) => void;
}

interface DragState {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

const MOUSE_THRESHOLD = 5;
const TOUCH_TOLERANCE = 10;
const LONG_PRESS = 300;
const EDGE = 60;
const MAX_SCROLL_SPEED = 15;
const MOVE_DURATION = 200;
const MOVE_EASING = "cubic-bezier(0.2, 0, 0, 1)";
const ANIMATION_ID = "sortable-move";

const isMoving = (node: HTMLElement) =>
  node.getAnimations().some((a) => a.id === ANIMATION_ID);

// Nearest scrollable ancestor, or null for the window
const getScroller = (node: HTMLElement): HTMLElement | null => {
  for (let n = node.parentElement; n; n = n.parentElement) {
    const { overflowY } = getComputedStyle(n);
    if (/auto|scroll/.test(overflowY) && n.scrollHeight > n.clientHeight) return n;
  }
  return null;
};

// Layout attributes copied from the dragged item so the placeholder takes its shape
const SHAPE_ATTRIBUTES = [
  "data-column-end",
  "data-row-end",
  "data-ratio",
  "data-radius",
  "data-height",
];

const SortableGrid: React.FC<SortableGridProps> = ({
  order,
  onOrderChange,
  children,
  ...rest
}) => {
  const [drag, setDrag] = useState<DragState | null>(null);
  const grid = useRef<HTMLElement | null>(null);
  const nodes = useRef(new Map<string, HTMLElement>());
  const cancel = useRef<() => void>();

  const items = new Map<string, ReactElement>();
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.key != null) {
      items.set(String(child.key), child);
    }
  });

  const ids = Array.from(items.keys());
  const sorted = [
    ...order.filter((id) => items.has(id)),
    ...ids.filter((id) => !order.includes(id)),
  ];

  const sortedRef = useRef(sorted);
  sortedRef.current = sorted;
  const onOrderChangeRef = useRef(onOrderChange);
  onOrderChangeRef.current = onOrderChange;

  useEffect(() => () => cancel.current?.(), []);

  // FLIP: positions recorded right before a layout change, animated from after it
  const snapshot = useRef<Map<string, DOMRect> | null>(null);
  const dropped = useRef<string | null>(null);

  const measure = () => {
    const rects = new Map<string, DOMRect>();
    nodes.current.forEach((node, id) => rects.set(id, node.getBoundingClientRect()));
    return rects;
  };

  useLayoutEffect(() => {
    const first = snapshot.current;
    const droppedId = dropped.current;
    snapshot.current = null;
    dropped.current = null;
    if (!first || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    nodes.current.forEach((node, id) => {
      const from = first.get(id);
      if (!from) return;
      // Measured mid-animation, so an interrupted move continues from where it is
      node.getAnimations().forEach((a) => a.id === ANIMATION_ID && a.cancel());
      const to = node.getBoundingClientRect();
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      if (!dx && !dy) return;

      // The dropped item stays above the others while it settles
      const lift = id === droppedId ? { zIndex: 999 } : {};
      const animation = node.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)`, ...lift },
          { transform: "none", ...lift },
        ],
        { duration: MOVE_DURATION, easing: MOVE_EASING }
      );
      animation.id = ANIMATION_ID;
    });
  });

  const reorder = (dragId: string, { x, y }: Point) => {
    for (const [id, node] of Array.from(nodes.current)) {
      // Skip items still moving so they don't flip back under the pointer
      if (id === dragId || isMoving(node)) continue;
      const r = node.getBoundingClientRect();
      if (x < r.left || x > r.right || y < r.top || y > r.bottom) continue;

      const current = sortedRef.current;
      const next = current.filter((i) => i !== dragId);
      next.splice(current.indexOf(id), 0, dragId);
      snapshot.current = measure();
      onOrderChangeRef.current(next);
      return;
    }
  };

  // Shared drag session for mouse/pen (pointer events) and touch (touch events)
  const startSession = (id: string, el: HTMLElement, start: Point, touch: boolean) => {
    if (cancel.current) return;
    let active = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    let pointer = start;
    let origin: DOMRect;
    const scroller = getScroller(grid.current!);

    // Item is positioned in the grid, so offset it by however far the grid
    // has scrolled since the drag began to keep it under the pointer
    const follow = () => {
      if (!active) return;
      const box = grid.current!.getBoundingClientRect();
      const dx = pointer.x - start.x - (box.left - origin.left);
      const dy = pointer.y - start.y - (box.top - origin.top);
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      reorder(id, pointer);
    };

    // Scrolls while the pointer is near the top or bottom edge
    const autoScroll = () => {
      const { top, bottom } = scroller
        ? scroller.getBoundingClientRect()
        : { top: 0, bottom: window.innerHeight };
      let speed = 0;
      if (pointer.y < top + EDGE) speed = -(top + EDGE - pointer.y);
      else if (pointer.y > bottom - EDGE) speed = pointer.y - (bottom - EDGE);
      if (speed) {
        const step = (Math.min(Math.abs(speed), EDGE) / EDGE) * MAX_SCROLL_SPEED * Math.sign(speed);
        (scroller ?? window).scrollBy(0, step);
      }
      frame = requestAnimationFrame(autoScroll);
    };

    const begin = () => {
      origin = grid.current!.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      active = true;
      setDrag({
        id,
        left: r.left - origin.left,
        top: r.top - origin.top,
        width: r.width,
        height: r.height,
      });
      frame = requestAnimationFrame(autoScroll);
      if (touch) navigator.vibrate?.(10);
    };

    const move = (p: Point) => {
      pointer = p;

      if (!active) {
        const distance = Math.hypot(p.x - start.x, p.y - start.y);
        if (touch) {
          if (distance > TOUCH_TOLERANCE) end();
          return;
        }
        if (distance < MOUSE_THRESHOLD) return;
        begin();
      }

      follow();
    };

    let detach: () => void;

    const end = () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", follow, true);
      detach();
      if (active) {
        // Settle from where the item was released into the placeholder's spot
        const rects = measure();
        rects.set(id, el.getBoundingClientRect());
        snapshot.current = rects;
        dropped.current = id;
      }
      el.style.transform = "";
      cancel.current = undefined;
      setDrag(null);
    };

    // Capture phase catches scrolling of any ancestor, not just the window
    window.addEventListener("scroll", follow, true);

    if (touch) {
      // Listen on the touch target itself: touch events always reach it
      const onTouchMove = (ev: TouchEvent) => {
        if (active && ev.cancelable) ev.preventDefault();
        const t = ev.touches[0];
        if (t) move({ x: t.clientX, y: t.clientY });
      };
      const onMenu = (ev: Event) => ev.preventDefault();
      el.addEventListener("touchmove", onTouchMove, { passive: false });
      el.addEventListener("touchend", end);
      el.addEventListener("touchcancel", end);
      window.addEventListener("contextmenu", onMenu);
      detach = () => {
        el.removeEventListener("touchmove", onTouchMove);
        el.removeEventListener("touchend", end);
        el.removeEventListener("touchcancel", end);
        window.removeEventListener("contextmenu", onMenu);
      };
      timer = setTimeout(begin, LONG_PRESS);
    } else {
      const onPointerMove = (ev: PointerEvent) =>
        move({ x: ev.clientX, y: ev.clientY });
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", end);
      window.addEventListener("pointercancel", end);
      detach = () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", end);
        window.removeEventListener("pointercancel", end);
      };
    }

    cancel.current = end;
  };

  const handlePointerDown = (id: string) => (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    startSession(id, e.currentTarget, { x: e.clientX, y: e.clientY }, false);
  };

  const handleTouchStart = (id: string) => (e: React.TouchEvent<HTMLElement>) => {
    const t = e.touches[0];
    if (e.touches.length !== 1 || !t) return;
    startSession(id, e.currentTarget, { x: t.clientX, y: t.clientY }, true);
  };

  return (
    <group ref={grid} {...rest}>
      {sorted.flatMap((id) => {
        const child = items.get(id)!;
        const ref = (node: HTMLElement | null) => {
          if (node) nodes.current.set(id, node);
          else nodes.current.delete(id);
        };

        if (drag?.id !== id) {
          return [
            cloneElement(child, {
              ref,
              "data-cursor": "grab",
              "data-user-select": "none",
              onPointerDown: handlePointerDown(id),
              onTouchStart: handleTouchStart(id),
            }),
          ];
        }

        const shape = Object.fromEntries(
          SHAPE_ATTRIBUTES.map((name) => [name, child.props[name]])
        );

        return [
          <group key="sortable-placeholder" ref={ref}  data-background="adaptive-gray" {...shape} />,
          // Filter-only backdrop and shadow leave the item's own background intact
          cloneElement(child, {
            "data-position": "absolute",
            "data-index": "999",
            "data-elevation": "2",
            "data-backdrop": "20-clear",
            "data-cursor": "grabbing",
            "data-user-select": "none",
            onPointerDown: handlePointerDown(id),
            onTouchStart: handleTouchStart(id),
            style: {
              ...child.props.style,
              left: drag.left,
              top: drag.top,
              width: drag.width,
              height: drag.height,
            },
          }),
        ];
      })}
    </group>
  );
};

export default SortableGrid;
