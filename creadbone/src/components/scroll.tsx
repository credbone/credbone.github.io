import React, { useEffect, useRef, useState, useCallback } from "react";
import classNames from "classnames";
import Button from "./button";

const Scroll: React.FC<{
  children: React.ReactChild; //NOSONAR
  className?: string;
  vertical?: boolean;
}> = ({ children, className, vertical }) => {
  const [{ showLB, showRB }, setShowButtons] = useState({
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
      // How far the mouse has been moved
      if (vertical) {
        const dy = e.clientY - pos.y;
        element!.scrollTop = pos.top - dy;
      } else {
        const dx = e.clientX - pos.x;
        // Scroll the element
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
        element?.scrollBy(0, (right ? 1 : -1) * scrollSize);
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
        element?.scrollBy((right ? 1 : -1) * scrollSize, 0);
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
      <Button
        data-contain="visible"
        micro
        primary
        className={classNames("slider", "prev", { show: showLB })}
        icon={vertical ? "expand_less" : "chevron_left"}
        onClick={() => scrollHandler(false)}
      />
      <Button
        data-contain="visible"
        micro
        primary
        className={classNames("slider", "next", { show: showRB })}
        icon={vertical ? "expand_more" : "chevron_right"}
        onClick={() => scrollHandler(true)}
      />
    </div>
  );
};

export default Scroll;
