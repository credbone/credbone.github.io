import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useId,
  CSSProperties,
} from 'react';
import ReactDOM from 'react-dom';

interface TooltipProps {
  content: any;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto' | 'cursor';
  distance?: number;
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  distance = 10,
  delay = 0,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<CSSProperties>({});
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLElement>(null);
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);
  const showTimeout = useRef<NodeJS.Timeout | null>(null);
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

    const rect = tooltipRef.current.getBoundingClientRect();
    const minDistance = 10;

    const left = Math.min(x + CURSOR_OFFSET_X, window.innerWidth - rect.width - minDistance);
    const top = Math.max(minDistance, y + CURSOR_OFFSET_Y - rect.height);

    return { top, left };
  };

  const calculatePosition = () => {
    if (!childRef.current || !tooltipRef.current) return {};

    const targetRect = childRef.current.getBoundingClientRect();
    const popoverRect = tooltipRef.current.getBoundingClientRect();
    const position: CSSProperties = {};

    const fitTop = targetRect.top >= popoverRect.height + distance;

    const determinePosition = (placement: string) => {
      const minDistance = Math.max(10, Math.abs(distance));

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

    switch (placement) {
      case 'auto':
      case 'cursor': // no mouse to follow
        determinePosition(fitTop ? 'top' : 'bottom');
        break;
      default:
        determinePosition(placement);
        break;
    }

    return position;
  };

  const updatePosition = () => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    // Measure at the left edge: near the right one the width would be squeezed
    const { left } = tooltip.style;
    tooltip.style.left = '0px';

    setTooltipPosition(
      placement === 'cursor' && mouseOver.current
        ? calculateCursorPosition(cursorPos.current.x, cursorPos.current.y)
        : calculatePosition()
    );

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
  }, [isVisible, content, placement, distance]);

  // Clear pending timers on unmount
  useEffect(
    () => () => {
      if (showTimeout.current) clearTimeout(showTimeout.current);
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
  }, [isVisible, placement, distance]);

  const handleTooltipTrigger = (showTooltip: boolean) => {
    if (showTimeout.current) {
      clearTimeout(showTimeout.current);
      showTimeout.current = null;
    }

    if (showTooltip) {
      if (delay > 0) {
        showTimeout.current = setTimeout(() => setIsVisible(true), delay);
      } else {
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
    }
  };

  // Hide whatever opened it
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
      handleTooltipTrigger(false);
    }
  };

  // Keyboard focus only. React events also bubble here from portals opened
  // inside the trigger (a popover, a modal), so check it's really inside
  const handleFocus = (e: React.FocusEvent) => {
    const target = e.target as HTMLElement;
    if (!childRef.current?.contains(target) || !target.matches(':focus-visible')) return;
    focused.current = true;
    if (!isVisible) handleTooltipTrigger(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!focused.current || childRef.current?.contains(e.relatedTarget as Node | null)) return;
    focused.current = false;
    if (!hovered.current) handleTooltipTrigger(false);
  };

  const child = children as React.ReactElement<any>;
  const isShown = isVisible && content;

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
          data-animation-name="tooltip"
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