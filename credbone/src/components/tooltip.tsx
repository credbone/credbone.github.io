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
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);




  // const handleTouchStart = () => {
  //   setIsVisible(false);
  // };


  
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

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsVisible(false);
  //   };

  //   window.addEventListener('resize', handleResize);
  //   window.addEventListener('touchstart', handleTouchStart);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //     window.removeEventListener('touchstart', handleTouchStart);
  //     clearTimeout(timer);
  //   };
  // }, []);

  useEffect(() => {
    if (isVisible) {
      const position = calculatePosition();
      setTooltipPosition(position);
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
      setIsVisible(false); // Close tooltip if the click or mousedown is outside
    }
  };

 
  document.addEventListener('click', handleOutsideClickOrMouseDown);

  return () => {

    document.removeEventListener('click', handleOutsideClickOrMouseDown);
  };
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
  
    if (isVisible) {
      window.addEventListener("scroll", handleScroll, true); // Capture scroll events
    } else {
      window.removeEventListener("scroll", handleScroll, true);
    }
  
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isVisible]);


  const handleTooltipTrigger = (showTooltip: boolean) => {
    setIsVisible(showTooltip);
  };


  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") {
      // Start a timer for long-press detection
      touchTimeout.current = setTimeout(() => {
        handleTooltipTrigger(true); // Show tooltip for long press
      }, 500); // Adjust duration as needed
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" && touchTimeout.current) {
      clearTimeout(touchTimeout.current); // Cancel long-press detection
    }
    handleTooltipTrigger(false); // Hide tooltip on touch/mouse release
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      handleTooltipTrigger(false); // Hide tooltip when mouse leaves
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") {
      handleTooltipTrigger(false); // Close tooltip immediately if touch moves
    }
  };

  return (
    <>
{React.cloneElement(children as React.ReactElement, {
  ref: childRef,
 onPointerDown: handlePointerDown,
 onPointerUp: handlePointerUp,
 //onPointerMove: handlePointerMove, // Detect swipe
  onPointerEnter: (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      handleTooltipTrigger(true); // Show tooltip on mouse hover
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
