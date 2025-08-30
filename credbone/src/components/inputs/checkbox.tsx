import classNames from "classnames";
import { forwardRef, PropsWithChildren, ReactElement } from "react";

import Input, { InputProps, InputType } from "./input";
import Ripple from "../Ripple";
import { SvgCheckbox } from "../svg";
import Tooltip from "../tooltip";

export const enum CheckboxType {
  Button,
}

export type CheckboxProps = InputProps & {
  classic?: boolean;
  noInk?: boolean;
  checkbox?: boolean;
  icon?: string;
  simple?: boolean;
  checkboxType?: CheckboxType;
  checkboxProps?: any;
  tooltip?: any;
  tooltipProps?: Omit<React.ComponentProps<typeof Tooltip>, 'content' | 'children'>;
};

export const CheckboxInner: React.FC<CheckboxProps> = forwardRef<
  ReactElement,
  PropsWithChildren<CheckboxProps>
>(
  (
    {
      children,
      classic,
      noInk,
      checkbox,
      icon,
      minimal,
      simple,
      label,
      className,
      value,
      isDirty,
      isTouched,
      invalid,
      error,
      tooltip,
      checkboxType,
      checkboxProps,
      ...inputProps
    },
    ref
  ) => {
    let type: any;
    let input;
    input = (
      <input
        type="checkbox"
        ref={ref as any}
        checked={!!value}
        {...inputProps}
      />
    );

    const isButton = checkboxType === CheckboxType.Button;

    if (minimal || simple || classic) {
      if (classic) {
        type = { classic: "" };
      } else {
        type = { checkbox: "" };
        if (minimal) {
          type.minimal = "";
        }
        if (simple) {
          type.simple = "";
        }
      }
    } else if (!isButton) {
      type = { classic: "" };
    }

    let content = (
      <Tooltip content={tooltip}>
      <label
      data-background={isButton? "context":""}
        {...type}
        {...checkboxProps}
        className={classNames(className, {
          error: invalid,
          touched: isTouched,
          dirty: isDirty,
        })}
      >
        {input}

        {isButton ? (
<>
<wrap>
            {icon && <icon>{icon}</icon>}
            {label && <text>{label}</text>}
          </wrap>
          <group data-name="option-decor"></group>
</>
        ) : (
          <>
            <box>
              <check>{!minimal && !simple &&  (
                <>
                <SvgCheckbox></SvgCheckbox>
                </>
              )} </check>
              {minimal && (
                    <>
                      <check data-name="handle"></check>
                      <check></check>
                    </>
              )}
              {!minimal && !simple && !noInk && (
                <Ripple>
                  <ink></ink>
                </Ripple>
              )}
            </box>
            {label && <text>{label}</text>}
          </>
        )}
      </label>
      </Tooltip>
    );

    return content;
  }
);

const Checkbox: React.FC<CheckboxProps> = forwardRef<
  ReactElement,
  PropsWithChildren<CheckboxProps>
>((props, ref) => {
  return <Input ref={ref} {...props} type={InputType.Checkbox} />;
});

export default Checkbox;
