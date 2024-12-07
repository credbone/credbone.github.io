import classNames from "classnames";
import React, {
  PropsWithChildren,
  HTMLAttributes,
  useState,
  MouseEventHandler,
  RefObject,
  useRef,
} from "react";
import { useMaterialEffect } from "../utils/hooks/useMaterialEffectHook";
//import { Text } from "./text";


export interface ButtonProps extends HTMLAttributes<HTMLElement> {
  accent?: boolean;
  adaptive?: boolean;
  className?: string;
  disabled?: boolean | string;
  error?: boolean;
  extra?: boolean;
  fab?: boolean;
  fit?: boolean;
  highlight?: boolean;
  icon?: string;
  iconMicro?: boolean;
  large?: boolean;
  xlarge?: boolean;
  material?: boolean;
  mini?: boolean;
  micro?: boolean;
  onClick?: MouseEventHandler<HTMLElement> | (() => any);
  open?: boolean;
  outline?: boolean;
  preview?: boolean;
  primary?: boolean;
  secondary?: boolean;
  rounded?: boolean;
  show?: boolean;
  space?: boolean;
  special?: boolean;
  text?: string;
  textFirst?: boolean;
  textIsName?: boolean;
  toggleClassName?: string;
  wide?: boolean;
  position?: string;
  type?: string;
  toggleState?: boolean,
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = React.forwardRef<
  HTMLDivElement | HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      accent = false,
      adaptive = false,
      className = "",
      disabled = false,
      error = false,
      extra = false,
      fab = false,
      fit = false,
      highlight = false,
      icon = "",
      iconMicro = false,
      large = false,
      //   material = false,
      toggleState = false,
      mini = false,
      micro = false,
      onClick,
      open = false,
      outline = false,
      preview = false,
      primary = false,
      secondary = false,
      rounded = false,
      show = false,
      space = false,
      special = false,
      text = "",
      textFirst = false,
      textIsName = false,
      wide = false,
      children,
      material = true,
      toggleClassName = "",
      position,
      autoFocus,
      type,
      ...rest
    },
    ref
  ) => {
    const refObj = useRef(null);
    const [iconCode, fill] = icon.split(".");
    const [addToggleClassNames, setAddToggleClassNames] = useState(toggleState);
    let iconProps = null;
    if (fill === "fill") {
      iconProps = { fill: "" };
    }
    const { svg, onPointerDown, onPointerLeave, onPointerUp } = useMaterialEffect({
      ref: (ref || refObj) as RefObject<HTMLDivElement>,
      isMaterial: material,
    });

    return type === "button" || type === "submit" /*&& autoFocus*/ ? (
      <button
        type={type as any}
        ref={(ref || refObj) as any}
        className={classNames(
          "button",
          {
            accent,
            adaptive,
            error,
            extra,
            fab,
            fit,
            highlight,
            large,
            mini,
            micro,
            open,
            outline,
            preview,
            primary,
            secondary,
            rounded,
            show,
            special,
            space,
            wide,
            ...(toggleClassName
              ? { [toggleClassName]: addToggleClassNames }
              : null),
          },
          className
        )}
        onClick={(e) => {
          toggleClassName && setAddToggleClassNames((prev) => !prev);
          onClick?.(e);
        }}
        autoFocus={autoFocus}
        {...rest}
        {...(position ? { "data-position": position } : null)}  //NOSONAR
        {...(disabled ? { disabled: true } : null)}   //NOSONAR
        {...(material ? { effect: "material" } : null)}   //NOSONAR
      >
        {text && textFirst && <text>{text}</text>}
        {iconCode && (
          <icon {...iconProps} {...(iconMicro ? { micro: "" } : null)}>
            {iconCode}
          </icon>
        )}
        {children}
        {text && !textFirst && <text>{text}</text>}
        {svg}
      </button>
    ) : (
      <div //NOSONAR
        ref={(ref || refObj) as any}  //NOSONAR
        className={classNames(
          "button",
          {
            accent,
            adaptive,
            error,
            extra,
            fab,
            fit,
            highlight,
            large,
            mini,
            micro,
            open,
            outline,
            preview,
            primary,
            secondary,
            rounded,
            show,
            special,
            space,
            wide,
            ...(toggleClassName
              ? { [toggleClassName]: addToggleClassNames }
              : null),
          },
          className
        )}
        onClick={(e) => {
          toggleClassName && setAddToggleClassNames((prev) => !prev);
          onClick?.(e);
        }}
       // onMouseDown={onMouseDown}
       onPointerDown={onPointerDown}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        {...rest}
        {...(position ? { "data-position": position } : null)}  //NOSONAR
        {...(disabled ? { disabled: true } : null)}             //NOSONAR
        {...(material ? { effect: "material" } : null)}         //NOSONAR
      >
        {text && textFirst && <text>{text}</text>}
        {iconCode && (
          <icon {...iconProps} {...(iconMicro ? { micro: "" } : null)}>
            {iconCode}
          </icon>
        )}
        {children}
        {text && !textFirst && <text>{text}</text>}
        {svg}
      </div>
    );
  }
);

export default Button;
