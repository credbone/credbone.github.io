import React, { useState, useRef, useEffect, CSSProperties, ReactNode } from "react";
import ReactDOM from "react-dom";

interface PopoverProps {
  content: ReactNode | ((closePopover: () => void) => ReactNode);
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right" | "over";
  hideOnScroll?: boolean;
  containerId?: string; // Optional custom container ID
}

const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  placement = "top",
  hideOnScroll = true,
  containerId = "popover-container", // Default to "popover-container" if not specified
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<CSSProperties>({});
  const popoverRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLElement>(null);

  // Ensure popover container exists
  useEffect(() => {
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      document.body.appendChild(container);
    }
  }, [containerId]);

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      childRef.current &&
      !childRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  const handleResize = () => {
    setIsVisible(false);
  };

  const handleScroll = (event: Event) => {
    if (hideOnScroll) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        childRef.current &&
        !childRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    }
  };

    const calculatePosition = () => {
      if (!childRef.current || !popoverRef.current) return {};

      const targetRect = childRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const position: CSSProperties = {};

      switch (placement) {
        case "top":
          position.top = Math.max(10, targetRect.top - popoverRect.height - 10);
          position.left = Math.max(
            10,
            Math.min(
              targetRect.left + targetRect.width / 2 - popoverRect.width / 2,
              window.innerWidth - popoverRect.width - 10
            )
          );
          break;
        case "bottom":
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
        case "left":
          position.top = Math.max(
            10,
            Math.min(
              targetRect.top + targetRect.height / 2 - popoverRect.height / 2,
              window.innerHeight - popoverRect.height - 10
            )
          );
          position.left = Math.max(10, targetRect.left - popoverRect.width - 10);
          break;
        case "right":
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
        case "over":
          position.top = Math.max(
            10,
            Math.min(
              targetRect.top + targetRect.height / 2 - popoverRect.height,
              window.innerHeight - popoverRect.height - 10
            )
          );
          position.left = Math.max(
            10,
            Math.min(
              targetRect.left + targetRect.width - popoverRect.width / 2,
              window.innerWidth - popoverRect.width - 10
            )
          );
          break;
        default:
          break;
      }

      return position;
    };

  useEffect(() => {
    if (isVisible) {
      const position = calculatePosition();
      setPopoverPosition(position);
      document.addEventListener("click", handleDocumentClick);
      window.addEventListener("resize", handleResize);
      if (hideOnScroll) {
        window.addEventListener("scroll", handleScroll, true); // capture scroll events in the capture phase
      }

      // Add the data-popover-expand attribute to the child element when popover is open
      if (childRef.current) {
        childRef.current.setAttribute("data-popover-expand", "true");
      }
    } else {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("resize", handleResize);
      if (hideOnScroll) {
        window.removeEventListener("scroll", handleScroll, true);
      }

      // Remove the data-popover-expand attribute when popover is closed
      if (childRef.current) {
        childRef.current.removeAttribute("data-popover-expand");
      }
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("resize", handleResize);
      if (hideOnScroll) {
        window.removeEventListener("scroll", handleScroll, true);
      }
    };
  }, [isVisible, hideOnScroll]);

  const handlePopoverTrigger = () => {
    setIsVisible(!isVisible);
  };

  const closePopover = () => {
    setIsVisible(false);
  };

  const renderedContent =
    typeof content === "function" ? content(closePopover) : content;

  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
        ref: childRef,
        onClick: handlePopoverTrigger,
      })}

      {isVisible &&
        content &&
        ReactDOM.createPortal(
          <group
          data-length="auto"
            data-position="absolute"
            data-background="context"
            data-elevation="1"
            data-radius="10"
            data-index="3"
            data-space="15"
            data-contain=""
            ref={popoverRef}
            className={`popover ${placement}`}
            style={popoverPosition}
            {...rest}
          >
             {renderedContent}
          </group>,
          document.getElementById(containerId)!
        )}
    </>
  );
};

export default Popover;
