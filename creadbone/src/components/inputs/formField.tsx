import classNames from "classnames";
import { ReactElement, HTMLAttributes, PropsWithChildren } from "react";
//import useTranslation from "../../../utils/hooks/useTranslation";

export type LabelPosition = "left";

export interface FormFieldProps {
  label?: string;
  className?: string;
  dataLength?: string;
  translateLabel?: boolean;
  isAnt?: boolean;
  button?: ReactElement;
  icon?: any;
  labelPosition?: LabelPosition;
  borderLess?: boolean;
  error?: string;
  size?: string;
}
export const FormField: React.FC<
  PropsWithChildren<FormFieldProps & HTMLAttributes<HTMLElement>>
> = ({
  icon,
  label,
  className,
  translateLabel = true,
  button,
  children,
  dataLength,
  isAnt,
  labelPosition,
  borderLess = false,
  error,
  size,
  ...rest
}) => {
 // const { t } = useTranslation();
  const labelText = label && translateLabel ? (label) : label;
  return (
    <div
      data-label={labelPosition}
      className={classNames("field", className, { third_part: isAnt })}
      data-length={dataLength}
      data-size={size}
      {...rest}
    >
      <label
        className={
          "form_fields " +
          classNames({
            validationError: error,
          })
        }
      >
        {!labelPosition && labelText && (
          <div className="data_label">
            <text data-ellipsis="">{labelText}</text>
          </div>
        )}

        <div className="field_cont">
          {icon && (
            <>
              <icon data-space-horizontal="input" data-length="input">{icon}</icon>
              {!borderLess && (
                <separator data-vertical="" data-height="input"></separator>
              )}
            </>
          )}
          {labelPosition === "left" && labelText && (
            <div className="data_label">
              <text data-margin="input" data-ellipsis="">
                {labelText}
              </text>
              <separator data-vertical="" data-height="input"></separator>
            </div>
          )}

          {children}
          {button}

          {!borderLess && <i />}
        </div>
        {error ? <errormessage>{error}</errormessage> : null}
      </label>
    </div>
  );
};
