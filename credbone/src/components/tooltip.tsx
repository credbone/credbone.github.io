import React, { useState, useRef, useEffect, CSSProperties } from 'react';
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

    const spaceAbove = targetRect.top;
    const spaceBelow = window.innerHeight - targetRect.bottom;

    const fitTop = spaceAbove >= popoverRect.height + distance;
    const fitBottom = spaceBelow >= popoverRect.height + distance;

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
        if (fitTop) {
          determinePosition('top');
        } else if (fitBottom) {
          determinePosition('bottom');
        } else {
          determinePosition('bottom');
        }
        break;
      default:
        determinePosition(placement);
        break;
    }

    return position;
  };

  // Track mouse position globally when cursor placement is active
  useEffect(() => {
    if (placement !== 'cursor') return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
      if (isVisible) {
        setTooltipPosition(calculateCursorPosition(e.clientX, e.clientY));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [placement, isVisible]);

  useEffect(() => {
    if (isVisible) {
      if (placement === 'cursor') {
        setTooltipPosition(calculateCursorPosition(cursorPos.current.x, cursorPos.current.y));
      } else {
        const position = calculatePosition();
        setTooltipPosition(position);
      }
    }
  }, [isVisible]);

  useEffect(() => {
    const handleOutsideClickOrMouseDown = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        childRef.current &&
        !childRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClickOrMouseDown);
    return () => document.removeEventListener('pointerdown', handleOutsideClickOrMouseDown);
  }, []);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        childRef.current &&
        !childRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        childRef.current &&
        !childRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('click', handleDocumentClick);
      window.addEventListener('scroll', handleScroll, true);
    } else {
      window.removeEventListener('scroll', handleScroll, true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isVisible]);

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

  const handlePointerDown = (e: React.PointerEvent) => {
    touchTimeout.current = setTimeout(() => {
      handleTooltipTrigger(true);
    }, 300);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch' && touchTimeout.current) {
      clearTimeout(touchTimeout.current);
    }
    handleTooltipTrigger(false);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch' && touchTimeout.current) {
      clearTimeout(touchTimeout.current);
    }
    handleTooltipTrigger(false);
  };

  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
        ref: childRef,
        onPointerDown: (e: React.PointerEvent) => {
          if (e.pointerType === 'touch' && placement !== 'cursor') {
            handlePointerDown(e);
          }
        },
        onPointerEnter: (e: React.PointerEvent) => {
          if (e.pointerType === 'mouse') {
            if (placement === 'cursor') {
              cursorPos.current = { x: e.clientX, y: e.clientY };
            }
            handleTooltipTrigger(true);
          }
        },
        onPointerLeave: handlePointerLeave,
      })}

      {isVisible &&
        content &&
        ReactDOM.createPortal(
          <group
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
          >
            {content}
          </group>,
          document.getElementById('tooltip-container')!
        )}
    </>
  );
};

export default Tooltip;