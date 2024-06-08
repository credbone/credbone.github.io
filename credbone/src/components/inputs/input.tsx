
import classNames from "classnames";
import React, {
  InputHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  useState,
} from "react";

import { CheckboxInner } from "./checkbox";

import { FormField, FormFieldProps, LabelPosition } from "./formField";
import { RadioInner } from "./radio";
import Tooltip from "../tooltip";
import { Control, Controller } from "react-hook-form";



export const InputType = {
  Text: "text",
  Password: "password",
  DatePicker: "datepicker",
  TimePicker: "timePicker",
  Select: "select",
  TreeSelect: "TreeSelect",
  Checkbox: "Checkbox",
  Radio: "Radio",
  TextArea: "textarea",
  Number: "number",
  ColorPicker: "colorPicker",
};
export interface UncontrolledInputProps
  extends FormFieldProps,
    InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  label?: string;
  translateLabel?: boolean;
  icon?: any;
  inputBox?: boolean;
  minimal?: boolean;
  button?: ReactElement;
  rules?: any;
  name?: string;
  control?: never;
  invalid?: any;
  isTouched?: any;
  isDirty?: any;
  error?: any;
  size?: any;
  fixLength?: string;
  labelPosition?: LabelPosition;
  disabledAlpha?: boolean;
  showText?: any;
}
export interface ControlledInputProps
  extends Omit<UncontrolledInputProps, "control" | "name"> {
  name: string;
  control: Control<any, any>;
}
export type InputProps = (ControlledInputProps | UncontrolledInputProps) & {
  confirmEdit?: boolean;
};

const Input: React.FC<InputProps> = React.forwardRef<
  ReactElement,
  PropsWithChildren<InputProps>
>((props, ref) => {
  const { name, control, ...restProps } = props as any;

  return control ? (
    <Controller
      defaultValue={restProps.defaultValue}
      control={control}
      name={name}
      render={({
        field: { onChange, value, ref },
        fieldState: { error, isDirty, invalid, isTouched },
      }) => (
        <InputInner
          ref={ref}
          isDirty={isDirty}
          invalid={invalid}
          isTouched={isTouched}
          value={value}
          error={error}
          onChange={onChange}
          {...restProps}
        />
      )}
    />
  ) : (
    <InputInner ref={ref} name={name} {...restProps} />
  );
});

const InputInner: React.FC<InputProps> = React.forwardRef<
  ReactElement,
  PropsWithChildren<InputProps>
>(
  (
    {
      type = InputType.Text,
      className,
      label = "",
      translateLabel = true,
      icon,
      inputBox = false,
      placeholder = " ",
      button,
      invalid,
      isTouched,
      isDirty,
      error,
      fixLength,
      dataLength,
      labelPosition,
      confirmEdit,
      borderLess,
      ...rest
    },
    ref
  ) => {
    // const { t } = useTranslation();
    const [confirmed, setConfirmed] = useState(false);
   // const { confirm } = useConfirm();

    let input;
    const inputProps = {
      ...rest,
    };
    const size = "compact";
    const antClassName = "form_field_ant";
    let isAnt = false;

    switch (type) {

      case InputType.Checkbox:
        input = (
          <CheckboxInner
            ref={ref}
            placeholder={placeholder}
            size={size}
            error={error}
            invalid={invalid}
            isTouched={isTouched}
            icon={icon}
            label={label}
            className={className}
            {...(inputProps as any)}
          />
        );
        break;
      case InputType.Radio:
        input = (
          <RadioInner
            ref={ref}
            placeholder={placeholder}
            size={size}
            error={error}
            invalid={invalid}
            isTouched={isTouched}
            icon={icon}
            className={className}
            label={label}
            {...(inputProps as any)}
          />
        );
        break;
      case InputType.TextArea:
        input = (
          <textarea
            ref={ref}
            placeholder={placeholder}
            {...(inputProps as any)}
          />
        );
        break;

      default:
        input = (
          <input
            type={type}
            ref={ref as any}
            placeholder={placeholder}
            {...(type === "password" ? { autoComplete: "new-password" } : null)}
            {...inputProps}
            // onChange={
            //   confirmEdit && !confirmed
            //     ? () => {
            //         confirm({
            //           message: t("#000002050"),
            //           positiveCallback: () => setConfirmed(true),
            //         });
            //       }
            //     : inputProps.onChange
            // }
            disabled={inputProps.disabled ? !confirmed : false}
          />
        );
    }

    let content = ![InputType.Checkbox, InputType.Radio].includes(type) ? (
      <FormField
        className={classNames(className, {
          //   hasValue: (!isTouched && inputProps.defaultValue) || hasValue,
          error: invalid,
          touched: isTouched,
          dirty: isDirty,
        })}
        label={label}
        translateLabel={translateLabel}
        button={button}
        icon={icon}
        dataLength={dataLength}
       // isAnt={isAnt}
        labelPosition={labelPosition}
        error={error?.message}
        borderLess={borderLess}
        size={rest.size}
        // onClick={
        //   rest.disabled && !confirmed && confirmEdit
        //     ? () => {
        //         confirm({
        //           message: ("#000002050"),
        //           positiveCallback: () => setConfirmed(true),
        //         });
        //       }
        //     : undefined
        // }
      >
        {input}
      </FormField>
    ) : (
      input
    );

    return content;
  }
);

export const Password: React.FC<InputProps> = React.forwardRef<
  ReactElement,
  PropsWithChildren<InputProps>
>((props, ref) => {
  const [show, setShow] = useState(false);
  const [blurTimeout, setBlurTimeout] = useState(setTimeout(() => {}));
 // const { t } = useTranslation();
  const onBlur = (e: any) => {
    let nativeEvent = e.nativeEvent;
    setBlurTimeout(
      setTimeout(() => {
        if (props.onBlur) {
          return props.onBlur(nativeEvent);
        }
      }, 300)
    );
  };
  return (
    <Input
      ref={ref}
      type={show ? "text" : "password"}
      button={
        <>
          <separator data-vertical="" data-height="input"></separator>
          <Tooltip
            
            content={show ? ("Hide Password") : ("Show Password")}
          >
            <div //NOSONAR
              className="button"
              data-height="input"
              data-length="input"
              onClick={() => {
                setShow((sh) => !sh);
                clearTimeout(blurTimeout);
              }}
            >
              <icon>{show ? "lock_open" : "lock"}</icon>
            </div>
          </Tooltip>
        </>
      }
      {...props}
      onBlur={onBlur}
    />
  );
});

export default Input;
