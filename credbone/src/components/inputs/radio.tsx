import classNames from "classnames";
import { forwardRef, PropsWithChildren, ReactElement } from "react";
import Input, { InputProps, InputType } from "./input";
import Tooltip from "../tooltip";
import Ripple from "../Ripple";

export const enum RadioType {
  Button,
}

export type RadioProps = InputProps & {
  radioValue?: string | number;
  allowUncheck?: boolean;
  fitLabel?: boolean;
  radioType?: RadioType;
  icon?: ReactElement | string;
  iconProps?: any;
  tooltip?: any;
  labelProps?: Record<string, any>;
};

export const RadioInner: React.FC<RadioProps> = forwardRef<
  ReactElement,
  PropsWithChildren<RadioProps>
>(
  (
    {
      children,
      label,
      tooltip,
      icon,
      iconProps, // Destructured iconProps here
      className,
      value,
      isDirty,
      isTouched,
      invalid,
      error,
      radioValue,
      allowUncheck,
      fitLabel,
      radioType,
      labelProps,
      ...inputProps
    },
    ref
  ) => {
    let input = (
      <input
        type="radio"
        ref={ref as any}
        value={radioValue}
        checked={value === radioValue}
        onChange={() => {}}
        {...inputProps}
      />
    );

    const isButton = radioType === RadioType.Button;
    let content = (
      <Tooltip content={tooltip} placement="auto">
        <label
          data-background={isButton? "context":""}
          {...(isButton ? null : { radio: "" })}
          {...(fitLabel ? { "data-length": "autofit" } : null)}
          className={classNames(className, {
            error: invalid,
            touched: isTouched,
            dirty: isDirty,
          })}
          onClick={(e) => {
            if (allowUncheck && value === radioValue) {
              !!inputProps.onChange && inputProps.onChange(null as any);
              e.preventDefault();
            }
          }}
          {...labelProps}
        >
          {input}
          {isButton ? (
            <>
              <wrap>
                {icon && <icon {...iconProps}>{icon}</icon>}{" "}
                {/* Spread iconProps here */}
                {label && <text>{label}</text>}
              </wrap>
              <group data-name="option-decor"></group>
            </>
          ) : (
            <>
              <box>
                <check></check>
                <Ripple>
                  <ink></ink>
                </Ripple>
              </box>
              <text>{label}</text>
            </>
          )}
        </label>
      </Tooltip>
    );

    return content;
  }
);

const Radio: React.FC<RadioProps> = forwardRef<
  ReactElement,
  PropsWithChildren<RadioProps>
>((props, ref) => {
  return (
    <Input
      ref={ref}
      radio=""
      {...(props as InputProps)}
      type={InputType.Radio}
    />
  );
});

export default Radio;
