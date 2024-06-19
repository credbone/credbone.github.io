import React, { useEffect, useRef, useState, useCallback } from "react";
import classNames from "classnames";
import Button from "./button";

// ButtonTemplate component
const ButtonTemplate: React.FC<{
  vertical: boolean;
  direction: "prev" | "next";
  show: boolean;
  onClick: () => void;
}> = ({ vertical, direction, show, onClick }) => {
  const icon = vertical
    ? direction === "prev"
      ? "expand_less"
      : "expand_more"
    : direction === "prev"
    ? "chevron_left"
    : "chevron_right";

  return (
    <Button
      data-contain="visible"
      micro
      primary
      className={classNames("slide-button", direction, { show })}
      icon={icon}
      onClick={onClick}
    />
  );
};

const Scroll: React.FC<{
  children: React.ReactNode; // Updated from React.ReactChild to React.ReactNode
  className?: string;
  vertical?: boolean;
  wheelEnabled?: boolean;
}> = ({ children, className, vertical, wheelEnabled = false }) => {
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
  
  useEffect(() => {
    let pos = { x: 0, y: 0, left: 0, top: 0 };
    const mouseDownHandler = function (e: MouseEvent) {
      pos = {
        left: element!.scrollLeft,
        top: element!.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };
      element!.addEventListener("mousemove", mouseMoveHandler);
      document!.addEventListener("mouseup", mouseUpHandler);
    };
    element?.addEventListener("mousedown", mouseDownHandler);

    const mouseMoveHandler = function (e: any) {
      if ((vertical && element!.offsetHeight < element!.scrollHeight) || (!vertical && element!.offsetWidth < element!.scrollWidth)) {
        setIsDragging(true);
        element!.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      }
      if (vertical) {
        const dy = e.clientY - pos.y;
        element!.scrollTop = pos.top - dy;
      } else {
        const dx = e.clientX - pos.x;
        element!.scrollLeft = pos.left - dx;
      }
    };

    const mouseUpHandler = (e: MouseEvent) => {
      setIsDragging(false);
      element!.removeEventListener("mousemove", mouseMoveHandler);
      document!.removeEventListener("mouseup", mouseUpHandler);
    };

    return () => {
      element?.removeEventListener("mousedown", mouseDownHandler);
    };
  }, [element, vertical]);

  const scrollHandler = (right: boolean) => {  //NOSONAR
    const elementChildren = element?.children;
    let scrollSize = 0;
    if (elementChildren?.length) {
      let i = 0;
      let item = elementChildren.item(i) as HTMLElement;
      if (vertical) {
        scrollSize = item.scrollHeight;
        while (++i < elementChildren.length) {
          item = elementChildren.item(i) as HTMLElement;
          if (item.offsetTop >= element!.scrollTop) {
            if (right) {
              scrollSize = item.scrollHeight;
            }
            break;
          }
          scrollSize = item.scrollHeight;
        }
        element?.scrollBy({
          left: (right ? 1 : -1) * scrollSize,
          behavior: 'smooth'
        });
      } else {
        scrollSize = item.scrollWidth;
        while (++i < elementChildren.length) {
          item = elementChildren.item(i) as HTMLElement;
          if (item.offsetLeft >= element!.scrollLeft) {
            if (right) {
              scrollSize = item.scrollWidth;
            }
            break;
          }
          scrollSize = item.scrollWidth;
        }
        element?.scrollBy({
          left: (right ? 1 : -1) * scrollSize,
          behavior: 'smooth'
        });
      }
    }
  };

  const manageButtonsVisibility = useCallback(() => {
    const show =
      !!element &&
      (vertical
        ? element?.offsetHeight < element?.scrollHeight
        : element?.offsetWidth < element?.scrollWidth);
    const showL =
      !!element && (vertical ? !!element.scrollTop : !!element.scrollLeft);
    const showR =
      !!element &&
      (vertical
        ? element.scrollTop + element.offsetHeight < element.scrollHeight
        : element.scrollLeft + element.offsetWidth < element.scrollWidth);
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
    let timeout: NodeJS.Timeout;
    const onScrollOrResize = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(manageButtonsVisibility, 50);
    };

    onScrollOrResize();

    window.addEventListener("resize", onScrollOrResize);
    element?.addEventListener("scroll", onScrollOrResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onScrollOrResize);
      element?.removeEventListener("scroll", onScrollOrResize);
    };
  }, [element, manageButtonsVisibility]);

  useEffect(() => {
    manageButtonsVisibility();
  }, [children, manageButtonsVisibility]);

  useEffect(() => {
    // Optional mouse wheel event handler based on wheelEnabled prop
    const wheelHandler = (e: WheelEvent) => {
      if (horizontal && wheelEnabled) {
        e.preventDefault();
        element?.scrollBy({ left: e.deltaY });
      }
    };

    if (wheelEnabled) {
      element?.addEventListener("wheel", wheelHandler, { passive: false });
    }

    return () => {
      if (wheelEnabled) {
        element?.removeEventListener("wheel", wheelHandler);
      }
    };
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
        onClick={() => scrollHandler(false)}
      />
      <ButtonTemplate
        vertical={vertical ?? false}
        direction="next"
        show={showRB}
        onClick={() => scrollHandler(true)}
      />
    </div>
  );
};

export default Scroll;
