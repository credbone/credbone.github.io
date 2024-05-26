
import classNames from 'classnames';
import { forwardRef, PropsWithChildren, ReactElement } from 'react';
import Input, { InputProps, InputType } from './input';
import Tooltip from '../tooltip';
import Ripple from '../Ripple';


export const enum RadioType {
  Button,
}
export type RadioProps = InputProps & {
  radioValue?: string | number;
  allowUncheck?: boolean;
  fitLabel?: boolean;
  radioType?: RadioType;
  icon?: string;
  tooltip?: string;
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
        onChange={() => { }}
        {...inputProps}
      />
    );

    const isButton = radioType === RadioType.Button;
    let content = (
      <Tooltip content={tooltip}>
        <label //NOSONAR
          {...(isButton ? null : { radio: "" })}
          {...(fitLabel ? { "data-fit": true } : null)}
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
            <wrap>
              {icon && <icon>{icon}</icon>}
              {label && <text>{label}</text>}
            </wrap>
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
