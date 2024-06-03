import { PropsWithChildren, useState, useEffect, useRef } from "react";
import Ripple from "./Ripple";

type SwitchableProps = PropsWithChildren<{
  defaultExpanded?: boolean;
  title?: string;
  togglerProps?: any;
  icon?: any;
  collapseThreshold?: number | false;
  closeOnOutsideClick?: boolean;
}>;

const Switchable: React.FC<SwitchableProps> = ({
  children,
  defaultExpanded = true,
  title,
  togglerProps,
  icon,
  collapseThreshold = false,
  closeOnOutsideClick = false,
  ...rest
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [userAction, setUserAction] = useState(false);
  const switchableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!userAction && collapseThreshold !== false && window.innerWidth <= collapseThreshold) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    if (!userAction && collapseThreshold !== false) {
      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [collapseThreshold, userAction]);

  useEffect(() => {
    if (!closeOnOutsideClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (switchableRef.current && !switchableRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnOutsideClick]);

  const handleToggle = () => {
    setUserAction(true);
    setIsExpanded((prev) => !prev);
  };

  return (
    <group
    data-border=""
    data-index="1"
    data-wrap="no"
    data-height="fit"
    data-contain=""
      ref={switchableRef}
      data-name="switchable"
      data-direction="column"
      data-align="start"
      data-expanded={isExpanded}
      {...rest}
    >
      <group
        data-background="context"
        data-name="switch"
        data-wrap="no"
        data-border=""
        data-index="2"
        data-interactive=""
        data-cursor="pointer"
        data-space="10"
        data-align="center"
        data-gap="5"
        onClick={handleToggle}
        {...togglerProps}
      >
        <icon data-length="30" data-index="1" className={isExpanded ? "open" : ""}>
          {icon ?? "apps"}
        </icon>
        {title && (
          <>
            <text data-ellipsis="" data-index="1" data-weight="700" data-space="5">
              {title}
            </text>
          </>
        )}
      </group>
      <view data-scroll="" data-border="no" data-name="switch_content">
        {children}
      </view>
    </group>
  );
};

export default Switchable;
