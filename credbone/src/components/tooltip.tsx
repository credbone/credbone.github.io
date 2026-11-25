import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useId,
  CSSProperties,
} from 'react';
import ReactDOM from 'react-dom';

type Side = 'top' | 'bottom' | 'left' | 'right';

const OPPOSITE: Record<Side, Side> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

const MOTIONS = {
  fade: 'tooltip',
  slide: 'slide-in',
  zoom: 'zoom-in-9',
  none: undefined,
};

// Closes the tooltip waiting out its hideDelay, so two never show side by side
let closeLingering: (() => void) | null = null;

interface TooltipProps {
  content: any;
  children: React.ReactNode;
  placement?: Side | 'auto' | 'cursor';
  distance?: number;
  delay?: number;
  /** Ms before hiding when the pointer or focus leaves. */
  hideDelay?: number;
  /** Entrance animation. Slide and zoom start from the trigger's side. */
  motion?: keyof typeof MOTIONS;
  /** Switch a fixed placement to the opposite side when it doesn't fit. */
  flip?: boolean;
  /** Never show, and hide right away if shown. */
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  distance = 10,
  delay = 0,
  hideDelay = 0,
  motion = 'fade',
  flip = false,
  disabled = false,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<CSSProperties>({});
  // The side of the trigger it ended up on
  const [side, setSide] = useState<Side>('top');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLElement>(null);
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);
  // Pending show or hide
  const toggleTimeout = useRef<NodeJS.Timeout | null>(null);
  const hideNow = useRef(() => setIsVisible(false));
  const cursorPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  // What holds the tooltip open: the pointer, keyboard focus, or both
  const hovered = useRef(false);
  const focused = useRef(false);
  // A mouse is over the trigger. Without one (touch, keyboard), placement
  // "cursor" works like "auto"
  const mouseOver = useRef(false);
  const tooltipId = useId();

  const CURSOR_OFFSET_X = 12;
  const CURSOR_OFFSET_Y = -8; // slightly above cursor

  const calculateCursorPosition = (x: number, y: number): CSSProperties => {
    if (!tooltipRef.current) return { top: y, left: x };

    const { offsetWidth, offsetHeight } = tooltipRef.current;
    const minDistance = 10;

    const left = Math.min(x + CURSOR_OFFSET_X, window.innerWidth - offsetWidth - minDistance);
    const top = Math.max(minDistance, y + CURSOR_OFFSET_Y - offsetHeight);

    return { top, left };
  };

  const calculatePosition = (): { position: CSSProperties; side: Side } => {
    if (!childRef.current || !tooltipRef.current) return { position: {}, side };

    const targetRect = childRef.current.getBoundingClientRect();
    // Layout size: a running zoom would shrink the bounding rect
    const popoverRect = {
      width: tooltipRef.current.offsetWidth,
      height: tooltipRef.current.offsetHeight,
    };
    const position: CSSProperties = {};

    const fitTop = targetRect.top >= popoverRect.height + distance;

    const minDistance = Math.max(10, Math.abs(distance));

    // Flips to the opposite side when there's no room and that side has more
    const resolveSide = (preferred: Side): Side => {
      if (!flip) return preferred;

      const room: Record<Side, number> = {
        top: targetRect.top,
        bottom: window.innerHeight - targetRect.bottom,
        left: targetRect.left,
        right: window.innerWidth - targetRect.right,
      };
      const isVertical = preferred === 'top' || preferred === 'bottom';
      const needed =
        (isVertical ? popoverRect.height : popoverRect.width) + distance + minDistance;
      const opposite = OPPOSITE[preferred];

      return room[preferred] < needed && room[opposite] > room[preferred]
        ? opposite
        : preferred;
    };

    const determinePosition = (placement: Side) => {
      switch (placement) {
        case 'top':
          position.top = Math.max(minDistance, targetRect.top - popoverRect.height - distance);
          position.left = Math.max(
            minDistance,
            Math.min(
              targetRect.left + targetRect.width / 2 - popoverRect.width / 2,
              window.innerWidth - popoverRect.width - minDistance
            )
          );
          break;
        case 'bottom':
          position.top = Math.min(
            window.innerHeight - popoverRect.height - minDistance,
            targetRect.bottom + distance
          );
          position.left = Math.max(
            minDistance,
            Math.min(
              targetRect.left + targetRect.width / 2 - popoverRect.width / 2,
              window.innerWidth - popoverRect.width - minDistance
            )
          );
          break;
        case 'left':
          position.top = Math.max(
            minDistance,
            Math.min(
              targetRect.top + targetRect.height / 2 - popoverRect.height / 2,
              window.innerHeight - popoverRect.height - minDistance
            )
          );
          position.left = Math.max(minDistance, targetRect.left - popoverRect.width - distance);
          break;
        case 'right':
          position.top = Math.max(
            minDistance,
            Math.min(
              targetRect.top + targetRect.height / 2 - popoverRect.height / 2,
              window.innerHeight - popoverRect.height - minDistance
            )
          );
          position.left = Math.min(
            window.innerWidth - popoverRect.width - minDistance,
            targetRect.right + distance
          );
          break;
        default:
          break;
      }
    };

    let nextSide: Side;

    switch (placement) {
      case 'auto':
      case 'cursor': // no mouse to follow
        nextSide = fitTop ? 'top' : 'bottom';
        break;
      default:
        nextSide = resolveSide(placement);
        break;
    }

    determinePosition(nextSide);

    return { position, side: nextSide };
  };

  const updatePosition = () => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    // Measure at the left edge: near the right one the width would be squeezed
    const { left } = tooltip.style;
    tooltip.style.left = '0px';

    if (placement === 'cursor' && mouseOver.current) {
      setTooltipPosition(calculateCursorPosition(cursorPos.current.x, cursorPos.current.y));
      setSide('top'); // it sits above the cursor
    } else {
      const next = calculatePosition();
      setTooltipPosition(next.position);
      setSide(next.side);
    }

    tooltip.style.left = left;
  };

  // Track mouse position globally when cursor placement is active
  useEffect(() => {
    if (placement !== 'cursor') return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseOver.current) return;
      cursorPos.current = { x: e.clientX, y: e.clientY };
      if (isVisible) {
        setTooltipPosition(calculateCursorPosition(e.clientX, e.clientY));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [placement, isVisible]);

  // Position before paint, and again when anything that affects it changes
  useLayoutEffect(() => {
    if (!isVisible) return;

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isVisible, content, placement, distance, flip]);

  // Clear pending timers on unmount
  useEffect(
    () => () => {
      clearToggleTimeout();
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
    },
    []
  );

  useEffect(() => {
    const handleOutsideClickOrMouseDown = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        childRef.current &&
        !childRef.current.contains(event.target as Node)
      ) {
        dismiss();
      }
    };

    document.addEventListener('pointerdown', handleOutsideClickOrMouseDown);
    return () => document.removeEventListener('pointerdown', handleOutsideClickOrMouseDown);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const isOutside = (event: Event) =>
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node) &&
      childRef.current &&
      !childRef.current.contains(event.target as Node);

    const handleScroll = (event: Event) => {
      if (!isOutside(event)) return;
      // Tabbing to an element scrolls it into view, so follow instead of hiding
      if (focused.current) {
        updatePosition();
      } else {
        dismiss();
      }
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (isOutside(event)) dismiss();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isVisible, placement, distance, flip]);

  // Once enabled again, it takes a new hover or focus to show
  useEffect(() => {
    if (!disabled) return;
    if (touchTimeout.current) clearTimeout(touchTimeout.current);
    dismiss();
  }, [disabled]);

  const clearToggleTimeout = () => {
    if (toggleTimeout.current) {
      clearTimeout(toggleTimeout.current);
      toggleTimeout.current = null;
    }
    if (closeLingering === hideNow.current) closeLingering = null;
  };

  const showNow = () => {
    closeLingering?.();
    closeLingering = null;
    setIsVisible(true);
  };

  const handleTooltipTrigger = (showTooltip: boolean, wait = showTooltip ? delay : 0) => {
    clearToggleTimeout();

    if (showTooltip) {
      if (disabled) return;
      if (wait > 0) {
        toggleTimeout.current = setTimeout(showNow, wait);
      } else {
        showNow();
      }
    } else if (wait > 0 && isVisible) {
      closeLingering = hideNow.current;
      toggleTimeout.current = setTimeout(hideNow.current, wait);
    } else {
      hideNow.current();
    }
  };

  // Hide right away, whatever opened it
  const dismiss = () => {
    hovered.current = false;
    mouseOver.current = false;
    focused.current = false;
    handleTooltipTrigger(false);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    touchTimeout.current = setTimeout(() => {
      hovered.current = true;
      mouseOver.current = false;
      handleTooltipTrigger(true);
    }, 300);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch' && touchTimeout.current) {
      clearTimeout(touchTimeout.current);
    }
    hovered.current = false;
    mouseOver.current = false;
    if (focused.current) {
      if (placement === 'cursor') updatePosition();
    } else {
      handleTooltipTrigger(false, hideDelay);
    }
  };

  // Keyboard focus only. React events also bubble here from portals opened
  // inside the trigger (a popover, a modal), so check it's really inside
  const handleFocus = (e: React.FocusEvent) => {
    const target = e.target as HTMLElement;
    if (!childRef.current?.contains(target) || !target.matches(':focus-visible')) return;
    focused.current = true;
    handleTooltipTrigger(true, isVisible ? 0 : delay);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!focused.current || childRef.current?.contains(e.relatedTarget as Node | null)) return;
    focused.current = false;
    if (!hovered.current) handleTooltipTrigger(false, hideDelay);
  };

  const child = children as React.ReactElement<any>;
  const isShown = isVisible && !disabled && content;

  return (
    <>
      {React.cloneElement(child, {
        ref: childRef,
        'aria-describedby':
          [child.props['aria-describedby'], isShown && tooltipId].filter(Boolean).join(' ') ||
          undefined,
        onFocus: (e: React.FocusEvent) => {
          child.props.onFocus?.(e);
          handleFocus(e);
        },
        onBlur: (e: React.FocusEvent) => {
          child.props.onBlur?.(e);
          handleBlur(e);
        },
        onPointerDown: (e: React.PointerEvent) => {
          // The pointer takes over from the keyboard
          focused.current = false;
          if (e.pointerType === 'touch') {
            handlePointerDown(e);
          }
        },
        onPointerEnter: (e: React.PointerEvent) => {
          if (e.pointerType === 'mouse') {
            cursorPos.current = { x: e.clientX, y: e.clientY };
            hovered.current = true;
            mouseOver.current = true;
            handleTooltipTrigger(true);
          }
        },
        onPointerLeave: handlePointerLeave,
      })}

      {isShown &&
        ReactDOM.createPortal(
          <group
          data-animation-name={MOTIONS[motion]}
          data-animation-from={OPPOSITE[side]}
          data-animation-duration="2.25"
          data-fill-mode="backwards"
            data-contain=""
            data-background="tooltip"
            data-color="white"
            data-length="auto"
            data-radius="10"
            data-space="12"
            ref={tooltipRef}
            className={`tooltip ${placement}`}
            style={{
              ...tooltipPosition,
              // position: 'fixed',
              // pointerEvents: 'none', // cursor-following tooltips shouldn't block mouse events
            }}
            {...rest}
            id={tooltipId}
            role="tooltip"
          >
            {content}
          </group>,
          document.getElementById('tooltip-container')!
        )}
    </>
  );
};

export default Tooltip;