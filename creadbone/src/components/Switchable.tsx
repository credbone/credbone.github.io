import { PropsWithChildren, useState, useEffect } from "react";
import Ripple from "./Ripple";

type SwitchableProps = PropsWithChildren<{
  defaultExpanded?: boolean;
  title?: string;
  togglerProps?: any;
  icon?: any;
  collapseThreshold?: number | false;
}>;

const Switchable: React.FC<SwitchableProps> = ({
  children,
  defaultExpanded = true,
  title,
  togglerProps,
  icon,
  collapseThreshold = false,
  ...rest
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [userAction, setUserAction] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (!userAction && collapseThreshold !== false && window.innerWidth <= collapseThreshold) {
        setIsExpanded(false);
      }
      else { 
        setIsExpanded(true)
      }
    };

    if (!userAction && collapseThreshold !== false) {
      window.addEventListener("resize", handleResize);
      handleResize(); 

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [collapseThreshold, userAction]);

  const handleToggle = () => {
    setUserAction(true); 
    setIsExpanded((prev) => !prev);
  };

  return (
    <view
      data-name="switchable"
      data-direction="column"
      data-align="start"
      data-expanded={isExpanded}
      {...rest}
    >
      <Ripple>
        <group
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
      </Ripple>
      <view data-scroll="" data-border="no" data-name="switch_content">
        {children}
      </view>
    </view>
  );
};

export default Switchable;
