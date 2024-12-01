import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Ripple from "../../components/Ripple";

import { navItems } from "./subroutesData";

import { useNavContext } from "../../components/NavProvider";
import ThemePickerNav from "../../template/ThemePickerNav";

interface VerticalSubNavProps {
  isOpen: boolean; // Prop to accept the open/close state
  onClose: () => void;
  // navRef: React.RefObject<HTMLDivElement>;
}

const VerticalSubNav: React.FC<VerticalSubNavProps> = ({ isOpen, onClose }) => {
  const context = useNavContext();
  const { isNavOpen, setIsNavOpen } = context;

  const handleItemClick = () => {
    setIsNavOpen(false);
  };

  const location = useLocation();

  const navRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const [indicatorTop, setIndicatorTop] = useState(0);
  const [indicatorHeight, setIndicatorHeight] = useState(0);

  useEffect(() => {
    const updateIndicator = () => {
      const currentIndex = navItems.findIndex((item) =>
        location.pathname.endsWith(item.to)
      );
      const activeItem = navRefs.current[currentIndex];

      if (activeItem) {
        const rect = activeItem.getBoundingClientRect();
        const parentRect =
          activeItem.parentElement?.parentElement?.getBoundingClientRect();
        const parentScrollTop =
          activeItem.parentElement?.parentElement?.scrollTop || 0;

        const top = rect.top - (parentRect?.top || 0) + parentScrollTop;
        const height = rect.height ?? 0;

        setIndicatorTop(top);
        setIndicatorHeight(height);

        window.requestAnimationFrame(() => {
          activeItem.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        });
      }
    };

    if (document.fonts.ready) {
      document.fonts.ready.then(updateIndicator);
    } else {
      updateIndicator();
    }

    // Optional: Recalculate on window resize to handle responsive layouts
    window.addEventListener("resize", updateIndicator);

    const parentElement = navRefs.current[0]?.parentElement;
    let resizeObserver: ResizeObserver | null = null;

    if (parentElement) {
      resizeObserver = new ResizeObserver(() => updateIndicator());
      resizeObserver.observe(parentElement);
    }

    return () => {
      window.removeEventListener("resize", updateIndicator);
      if (resizeObserver && parentElement) {
        resizeObserver.unobserve(parentElement);
      }
    };
  }, [location.pathname]);


  return (
    <>

      <group
        data-expanded={isOpen ? "open" : "close"}
        data-name="vertical-subnav"
        data-height="fit"
        data-contain=""
        data-direction="column"
        data-wrap="no"
      >
        <group data-height="fit" data-scroll="" data-scrollbar="none">
          <group
            data-name="vertical-indicator"
            data-position="absolute"
            data-background="main"
            style={{
              transform: `translateY(${indicatorTop}px)`,
              height: `${indicatorHeight}px`,
            }}
          ></group>

          <group
           
            data-wrap="no"
            data-gap="5"
            data-space="30"
            data-direction="column"
          >
            <group

              data-adaptive="mobile"
              onClick={onClose}
              data-space="15"
data-cursor="pointer"
              data-contain=""
              data-shrink="no"
              data-interactive=""
              data-radius="10"
              data-align="center"
              data-gap="10"
            >
             
              <text data-ellipsis="" >Show Main Navigation</text>
            </group>

            {navItems.map((item, index) => (
              <group key={index}  data-weight="600">
                {item.separator === "true" && (
                  <separator data-horizontal="" data-interval="30"></separator>
                )}
                <NavLink
                  data-animation-name="appear-left"
                  data-fill-mode="backwards"
                  data-animation-duration={2 + index * 0.25}
                  data-touch-action="manipulation"
                  data-type="group"
                  to={`../${item.to}`}
                  ref={(el: HTMLAnchorElement | null) =>
                    (navRefs.current[index] = el)
                  }
                  data-name="nav-item"
                  data-contain=""
                  data-shrink="no"
                  data-interactive=""
                  data-radius="10"
                  onClick={() => {
                    //   onClose();
                    handleItemClick();
                  }}
                >
                  <Ripple>
                    <group
                      data-space="15"
                      data-wrap="no"
                      data-align="center"
                      data-gap="5"
                    >
                      <text data-ellipsis="">{item.label}</text>

                      {item.new === "true" && (
                        <group
                          data-background="red"
                          data-space="3"
                          data-width="auto"
                          data-radius="5"
                          data-position="right"
                        ></group>
                      )}
                    </group>
                  </Ripple>
                </NavLink>
              </group>
            ))}
          </group>

<ThemePickerNav/>
        </group>
      </group>
    </>
  );
};

export default VerticalSubNav;
