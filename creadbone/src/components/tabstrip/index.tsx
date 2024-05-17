import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import Scroll from "../scroll";
import classNames from "classnames";

/**
 * TabStrip is a custom tabstrip component in React that allows for additional functionality.
 * @param {function} props.onChange - (optional) callback function that takes the index of the selected tab as a parameter.
 * @param {boolean} props.skipSecondaryTabs - (optional) boolean that determines whether secondary tabs should be skipped.
 * @param {number} props.selectedIndex - (optional) the index of the selected tab.
 * @param {string} props.id - (optional) the id of the tab strip.
 * @param {Array} children - array of ReactNode components to be used as tabs.
 * @param {object} props.tabStripProps - (optional) additional props for the tab_strip div.
 * @param {object} props.tabStripContentProps - (optional) additional props for the tab_strip_content div.
 * @param {object} props.tabStripNavProps - (optional) additional props for the tab_strip_nav div.
 */

const TabStrip: React.FC<
  PropsWithChildren<{
    onChange?: (e: number, children: any[]) => void;
    skipSecondaryTabs?: boolean;
    selectedIndex?: number;
    selectedCallback?: (children: any[]) => number;
    id?: string;
    classic?: boolean;
    invert?: boolean;
    bottom?: boolean;
    tabStripProps?: any;
    tabStripContentProps?: any;
    tabStripNavProps?: any;
  }>
> = ({
  children,
  onChange,
  skipSecondaryTabs,
  selectedIndex,
  selectedCallback,
  id,
  classic = true,
  invert = true,
  bottom,
  tabStripProps,
  tabStripContentProps,
  tabStripNavProps,
}) => {
  const [selected, setSelected] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (index: number) => {
    if (onChange) {
      onChange(index || 0, React.Children.toArray(children));
    }
    setSelected(index || 0);
  };

  useEffect(() => {
    const childrenArr = React.Children.toArray(children);
    if (ref.current && childrenArr.length) {
      setSelected(
        (selectedCallback ? selectedCallback?.(childrenArr) : selectedIndex) ||
          selected ||
          0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, children, selectedCallback]);

  const processedChildren = ((!skipSecondaryTabs && children) ||
    React.Children.toArray(children).filter(
      (child) => (child as ReactElement)?.props?.primary
    ) ||
    children) as ReactElement[] | ReactElement;

  const content = (
    <div className="tab_strip_content" {...tabStripContentProps}>
      {React.Children.map(processedChildren, (child, index) => {
        return (
          <div
            className={`tab_strip_tab${selected === index ? " selected" : ""}`}
            {...(selected === index ? {} : {})}
          >
            {child?.props.children}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="tab_strip" ref={ref} {...tabStripProps}>
      {bottom ? content : null}
      <div className="tab_strip_nav" id={id} {...tabStripNavProps}>
        <group data-type="snap">
          <Scroll
            className={classNames("nav_strip", { classic, invert, bottom })}
          >
            <ul>
              {React.Children.map(
                processedChildren,
                (child: ReactElement, index) => {
                  return (
                    child?.props && (
                      <li
                        onClick={() => handleSelect(index)}
                        index={index}
                        className={classNames({
                          selected: selected === index,
                          disabled: child.props.disabled,
                        })}
                      >
                        <separator data-vertical="" data-height="15"></separator>
                        <group
                          data-wrap="no"
                          data-align="center"
                          data-space="5"
                        >
                          {child?.props.icon && <icon>{child.props.icon}</icon>}

                          {child?.props.title && (
                            <text data-space-horizontal="10">
                              {child.props.title}
                            </text>
                          )}
                        </group>
                      </li>
                    )
                  );
                }
              )}
            </ul>
          </Scroll>
        </group>
      </div>
      {!bottom ? content : null}
    </div>
  );
};

export default TabStrip;
