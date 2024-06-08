import React, { useState, useRef, useEffect, CSSProperties } from "react";
import ReactDOM from "react-dom";

interface TooltipProps {
  content: any;
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";

}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
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
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const position: CSSProperties = {};

    switch (placement) {
      case "top":
        position.top = Math.max(10, targetRect.top - tooltipRect.height - 10);
        position.left = Math.max( 10, Math.min( targetRect.left + targetRect.width / 2 - tooltipRect.width / 2 ) ) ;
        if (window.innerWidth - position.left > tooltipRect.width + 20) {
         // position.right = "auto";
         console.log(targetRect.width , tooltipRect.width)
      
        } else {
          position.left = "auto";
          position.right = 10;
        }
        break;
        break;
      case "bottom":
        position.top = Math.min( window.innerHeight - tooltipRect.height, targetRect.bottom );
        position.left = Math.max( 10, Math.min( targetRect.left + targetRect.width / 2 - tooltipRect.width / 2, window.innerWidth - tooltipRect.width ) );
        break;
      case "left":
        position.top = Math.max( 10, Math.min( targetRect.top + targetRect.height / 2 - tooltipRect.height / 2, window.innerHeight - tooltipRect.height ) );
        position.left = Math.max(10, targetRect.left - tooltipRect.width);
        break;
      case "right":
        position.top = Math.max( 10, Math.min( targetRect.top + targetRect.height / 2 - tooltipRect.height / 2, window.innerHeight - tooltipRect.height ) );
        position.left = Math.min( window.innerWidth - tooltipRect.width, targetRect.right + 10 );
        break;
      default:
        break;
    }

    return position;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("touchstart", handleTouchStart);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("touchstart", handleTouchStart);
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
          document.body
        )}
    </>
  );
};

export default Tooltip;
