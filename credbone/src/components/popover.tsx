import React, {
  useState,
  useRef,
  useEffect,
  CSSProperties,
  ReactNode,
} from "react";
import ReactDOM from "react-dom";
import { isMobile } from "react-device-detect";

interface PopoverProps {
content: ReactNode | ((closePopover: () => void, isBottomSheet: boolean) => ReactNode);
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right" | "auto" | "middle" | "mouse";
  hideOnScroll?: boolean;
  containerId?: string;
  trigger?: "click" | "contextmenu";
  onOpenChange?: (isOpen: boolean) => void;
  open?: boolean; // ← NEW: optional controlled mode
  bottomsheet?: boolean;
  dim?: boolean;
  bottomsheetProps?: React.HTMLAttributes<HTMLElement> & Record<string, string>;
}

const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  placement = "top",
  hideOnScroll = true,
  containerId = "popover-container",
  trigger = "click",
  onOpenChange,
  open,
  bottomsheet = false,
  bottomsheetProps,
  dim=true,
  ...rest
}) => {
  const isControlled = open !== undefined; // ← NEW

  const [internalVisible, setInternalVisible] = useState(false);
  const isVisible = isControlled ? open : internalVisible; // ← NEW: use prop if controlled

  // Unified setter — always fires onOpenChange, only updates internal state if uncontrolled
  const setIsVisible = (value: boolean) => {
    // ← NEW
    if (!isControlled) setInternalVisible(value);
    onOpenChange?.(value);
  };

  const [popoverPosition, setPopoverPosition] = useState<CSSProperties>({});
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      document.body.appendChild(container);
    }
  }, [containerId]);

  let isInteractionInside = false;

  const handleMouseDown = (event: MouseEvent) => {
    isInteractionInside =
      popoverRef.current?.contains(event.target as Node) ||
      false ||
      childRef.current?.contains(event.target as Node) ||
      false;
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      !isInteractionInside &&
      !(popoverRef.current?.contains(event.target as Node) || false) &&
      !(childRef.current?.contains(event.target as Node) || false)
    ) {
      setIsVisible(false);
    }
    isInteractionInside = false;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleDocumentContextMenu = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      childRef.current &&
      !childRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("contextmenu", handleDocumentContextMenu);
    } else {
      document.removeEventListener("contextmenu", handleDocumentContextMenu);
    }
    return () => {
      document.removeEventListener("contextmenu", handleDocumentContextMenu);
    };
  }, [isVisible]);

  const handleResize = () => setIsVisible(false);

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

    const spaceAbove = targetRect.top;
    const spaceBelow = window.innerHeight - targetRect.bottom;
    const fitTop = spaceAbove >= popoverRect.height + 10;
    const fitBottom = spaceBelow >= popoverRect.height + 10;

    const determinePosition = (placement: string) => {
      switch (placement) {
        case "top":
          position.top = Math.max(10, targetRect.top - popoverRect.height + 10);
          position.left = Math.max(
            10,
            Math.min(
              targetRect.left + targetRect.width / 2 - popoverRect.width / 2,
              window.innerWidth - popoverRect.width - 10,
            ),
          );
          break;
        case "bottom":
          position.top = Math.min(
            window.innerHeight - popoverRect.height - 10,
            targetRect.bottom - 10,
          );
          position.left = Math.max(
            10,
            Math.min(
              targetRect.left + targetRect.width / 2 - popoverRect.width / 2,
              window.innerWidth - popoverRect.width - 10,
            ),
          );
          break;
        case "left":
          position.top = Math.max(
            10,
            Math.min(
              targetRect.top + targetRect.height / 2 - popoverRect.height / 2,
              window.innerHeight - popoverRect.height - 10,
            ),
          );
          position.left = Math.max(
            10,
            targetRect.left - popoverRect.width - 10,
          );
          break;
        case "right":
          position.top = Math.max(
            10,
            Math.min(
              targetRect.top + targetRect.height / 2 - popoverRect.height / 2,
              window.innerHeight - popoverRect.height - 10,
            ),
          );
          position.left = Math.min(
            window.innerWidth - popoverRect.width - 10,
            targetRect.right + 10,
          );
          break;
        case "middle":
          position.width = targetRect.width - 20;
          position.top = Math.max(
            10,
            Math.min(
              targetRect.top - popoverRect.height / 2 + 10,
              window.innerHeight - popoverRect.height - 10,
            ),
          );
          position.left = Math.max(
            10,
            Math.min(
              targetRect.left + 10,
              window.innerWidth - targetRect.width - 10,
            ),
          );
          break;
        case "mouse":
          if (clickPosition) {
            position.top = Math.max(
              10,
              clickPosition.y - popoverRect.height - 10,
            );
            position.left = Math.max(
              10,
              Math.min(
                clickPosition.x - popoverRect.width / 2,
                window.innerWidth - popoverRect.width - 10,
              ),
            );
          }
          break;
        default:
          break;
      }
    };

    if (placement === "auto") {
      determinePosition(fitTop ? "top" : "bottom");
    } else {
      determinePosition(placement);
    }

    return position;
  };

  useEffect(() => {
    if (isVisible) {
      const position = calculatePosition();
      setPopoverPosition(position);
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("click", handleDocumentClick);
      window.addEventListener("resize", handleResize);
      if (hideOnScroll) window.addEventListener("scroll", handleScroll, true);
      childRef.current?.setAttribute("data-popover-expand", "true");
    } else {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("resize", handleResize);
      if (hideOnScroll)
        window.removeEventListener("scroll", handleScroll, true);
      childRef.current?.removeAttribute("data-popover-expand");
    }
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("resize", handleResize);
      if (hideOnScroll)
        window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isVisible, hideOnScroll]);

  const handlePopoverTrigger = (event: React.MouseEvent) => {
    if (trigger === "contextmenu") event.preventDefault();
    setClickPosition({ x: event.clientX, y: event.clientY });
    setIsVisible(!isVisible);
  };

  const closePopover = () => setIsVisible(false);
  const isBottomSheet = bottomsheet && isMobile;
const renderedContent = typeof content === "function" ? content(closePopover, isBottomSheet) : content;



const startXRef = useRef<number | null>(null);


useEffect(() => {
  if (!isBottomSheet || !isVisible) return;
  const el = popoverRef.current;
  const dim = dimRef.current;
  if (!el) return;

  const startYRef = { current: null as number | null };
  const startXRef = { current: null as number | null };
  const deltaRef = { current: 0 };
  const axisRef = { current: null as "x" | "y" | null };
  const THRESHOLD = 100;
  const startedAtTopRef = { current: false };

  const onTouchStart = (e: TouchEvent) => {

     startedAtTopRef.current = el.scrollTop === 0 || e.currentTarget === dim;

    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    deltaRef.current = 0;
    axisRef.current = null;
    el.style.transitionDuration = "0s";

    if (dim) dim.style.transitionDuration = "0s";
  };

  const onTouchMove = (e: TouchEvent) => {
    if (startYRef.current === null) return;

    const deltaY = e.touches[0].clientY - startYRef.current;
    const deltaX = Math.abs(e.touches[0].clientX - startXRef.current!);

    if (axisRef.current === null) {
      if (deltaY > deltaX) axisRef.current = "y";
      else axisRef.current = "x";
    }

if (axisRef.current === "y" && deltaY > 0) {
  if (!startedAtTopRef.current) return; // ← block if didn't start at top
  if (e.cancelable) e.preventDefault();
  deltaRef.current = deltaY;
  el.style.transform = `translateY(${deltaY}px)`;
  if (dim) dim.style.opacity = `${1 - deltaY / THRESHOLD}`;
}
  };

  const onTouchEnd = () => {
    if (deltaRef.current >= THRESHOLD) {
      setIsVisible(false);
    }
    el.style.transform = "";
    el.style.transitionDuration = "";
    startYRef.current = null;
    startXRef.current = null;
    deltaRef.current = 0;
    axisRef.current = null;
    if (dim) dim.style.opacity = "";
    if (dim) dim.style.transitionDuration = "";
  };

  const attachSwipe = (target: HTMLElement) => {
    target.addEventListener("touchstart", onTouchStart, { passive: true });
    target.addEventListener("touchmove", onTouchMove, { passive: false });
    target.addEventListener("touchend", onTouchEnd);
  };

  const detachSwipe = (target: HTMLElement) => {
    target.removeEventListener("touchstart", onTouchStart);
    target.removeEventListener("touchmove", onTouchMove);
    target.removeEventListener("touchend", onTouchEnd);
  };

  attachSwipe(el);
  if (dim) attachSwipe(dim);

  return () => {
    detachSwipe(el);
    if (dim) detachSwipe(dim);
  };
}, [isBottomSheet, isVisible]);

  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
        ref: childRef,
        onClick: trigger === "click" ? handlePopoverTrigger : undefined,
        onContextMenu:
          trigger === "contextmenu" ? handlePopoverTrigger : undefined,
      })}

      {isVisible &&
        content &&
        ReactDOM.createPortal(
          <>
            {isBottomSheet && dim &&  (
              <group
               ref={dimRef}
                data-background="dim"
                data-index="9998"
                data-position="absolute"
                data-bottom="0"
                data-left="0"
                data-height="viewport"
                data-animation-name="tooltip"
                data-fill-mode="backwards"
                data-animation-duration="2.75"
                onClick={closePopover}
                  data-duration="1.25"
              />
            )}

            <group
            
              data-length={isBottomSheet ? undefined : "auto"}
              data-position="absolute"
              data-background={isBottomSheet ? "context-main-background" : "context"}
              data-elevation={isBottomSheet ? "2" : "1"}
              data-radius={isBottomSheet ? "30" : "10"}
              data-radius-bottom={isBottomSheet ? "0" : undefined}
              data-index={isBottomSheet ? "9998" : "9996"}
              data-space={isBottomSheet ? "20" : "15"}
              //= data-contain=""

              data-max-length={isBottomSheet ? undefined : "fit-20"}
              data-max-height="fit-20"
              data-animation-name={isBottomSheet ? "appear-bottom" : "tooltip"}
              data-fill-mode="backwards"
              data-animation-duration="2.25"
               data-duration={isBottomSheet ? "1.25" : undefined}
               data-direction="column"
              ref={popoverRef}
              className={`popover ${placement}`}
              style={isBottomSheet ? { bottom: 0 } : popoverPosition}
             {...(isBottomSheet ? bottomsheetProps : rest)}
              
            >
              {isBottomSheet && (
                <group
                  data-space="10"
                  onClick={closePopover}
                  data-position="absolute"
                  data-justify="center"
                  data-left="0"
                  data-bottom="100%"
                >
                  <group
                    data-height="4"
                    data-radius="20"
                    data-length="40"
                    data-background="text"
                    data-opacity="30"
                  />
                </group>
              )}
              {renderedContent}
              {/* {isBottomSheet && <group data-height="30" data-shrink="no" />} */}
            </group>
          </>,
          document.getElementById(containerId)!,
        )}
    </>
  );
};

export default Popover;
