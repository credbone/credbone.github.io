import classNames from "classnames";
import React, { forwardRef, PropsWithChildren } from "react";

interface OptionBarProps {
  autosize?: boolean;
  compact?: boolean;
  fixed?: boolean;
  dynamic?: boolean;
  animate?: boolean;
  className?: string;
}

const OptionBar: React.FC<PropsWithChildren<OptionBarProps>> = forwardRef<
  HTMLDivElement,
  PropsWithChildren<OptionBarProps>
>(
  (
    {
      autosize = false,
      compact = false,
      className = "",
      fixed = false,
      dynamic = false,
      animate = false,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <group
        data-length="initial"
        data-wrap="no"
        data-height="30"
        data-contain=""
        ref={ref}
        className={classNames(
          "option_bar",
          {
            autosize,
            compact,
            fixed,
            dynamic,
            animate,
          },
          className
        )}
        {...rest}
      >
        {children}
      </group>
    );
  }
);

export default OptionBar;
