import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import ReactDOM from 'react-dom';

interface TooltipProps {
  content: any;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<CSSProperties>({});
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLElement>(null);
  let timer: NodeJS.Timeout;

  const handleTouchStart = () => {
    setIsVisible(false);
  };

  const calculatePosition = () => {
    if (!childRef.current || !tooltipRef.current) return {};

    const targetRect = childRef.current.getBoundingClientRect();
    const popoverRect = tooltipRef.current.getBoundingClientRect();
    const position: CSSProperties = {};

    const spaceAbove = targetRect.top;
    const spaceBelow = window.innerHeight - targetRect.bottom;

    const fitTop = spaceAbove >= popoverRect.height + 10;
    const fitBottom = spaceBelow >= popoverRect.height + 10;

    const determinePosition = (placement: string) => {
      switch (placement) {
        case 'top':
          position.top = Math.max(10, targetRect.top - popoverRect.height - 10);
          position.left = Math.max(
            10,
            Math.min(
              targetRect.left + targetRect.width / 2 - popoverRect.width / 2,
              window.innerWidth - popoverRect.width - 10
            )
          );
          break;
        case 'bottom':
          position.top = Math.min(
            window.innerHeight - popoverRect.height - 10,
            targetRect.bottom + 10
          );
          position.left = Math.max(
            10,
            Math.min(
              targetRect.left + targetRect.width / 2 - popoverRect.width / 2,
              window.innerWidth - popoverRect.width - 10
            )
          );
          break;
        case 'left':
          position.top = Math.max(
            10,
            Math.min(
              targetRect.top + targetRect.height / 2 - popoverRect.height / 2,
              window.innerHeight - popoverRect.height - 10
            )
          );
          position.left = Math.max(10, targetRect.left - popoverRect.width - 10);
          break;
        case 'right':
          position.top = Math.max(
            10,
            Math.min(
              targetRect.top + targetRect.height / 2 - popoverRect.height / 2,
              window.innerHeight - popoverRect.height - 10
            )
          );
          position.left = Math.min(
            window.innerWidth - popoverRect.width - 10,
            targetRect.right + 10
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
          // Default to bottom if neither fit perfectly
          determinePosition('bottom');
        }
        break;
      default:
        determinePosition(placement);
        break;
    }

    return position;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(false);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchstart', handleTouchStart);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const position = calculatePosition();
      setTooltipPosition(position);
    }
  }, [isVisible]);

  const handleTooltipTrigger = (showTooltip: boolean) => {
    setIsVisible(showTooltip);
  };

  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
        ref: childRef,
        onMouseEnter: () => handleTooltipTrigger(true),
        onMouseLeave: () => handleTooltipTrigger(false),
        onTouchStart: () => handleTooltipTrigger(false), // Close tooltip on touch
      })}

      {isVisible &&
        content &&
        ReactDOM.createPortal(
          <group
          data-contain=""
           data-background="tooltip"
           data-color="white"
            data-length="auto"
            data-radius="5"
            data-space="10"
            ref={tooltipRef}
            className={`tooltip ${placement}`}
            style={tooltipPosition}
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
