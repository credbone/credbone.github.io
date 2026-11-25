import React from "react";
import Ripple from "../Ripple";
import { SelectOption } from "./ConfigSelect";

interface ConfigSwapProps {
  label: string;
  /** Short explanation, dimmed before the value */
  hint?: React.ReactNode;
  /** Best with two or three. Their own hints and separators are ignored */
  options: SelectOption[];
  value: string;
  onSelect: (value: string) => void;
  /** Dims the content (not the border) and can't be pressed or focused */
  disabled?: boolean;
}

// Config swap (pairs with ConfigSelect and ConfigSlider): a bordered bar with the label on the left
// and the current option on the right. Each press picks the next option, swapping the texts with a
// font-size transition. Fills its parent; wrap it in data-width="auto" to fit its content
const ConfigSwap: React.FC<ConfigSwapProps> = ({
  label,
  hint,
  options,
  value,
  onSelect,
  disabled = false,
}) => {
  const index = options.findIndex((option) => option.value === value);
  const selectNext = () => {
    // It can still hold focus from before it was disabled
    if (disabled) return;
    onSelect(options[(index + 1) % options.length].value);
  };

  return (
    <group data-space="3" data-radius="15" data-border="" data-contain="">
      <Ripple>
        <group
          data-height="40"
          data-radius="12"
          data-align="center"
          data-gap="15"
          data-wrap="no"
          data-space-horizontal="15"
          data-interactive=""
          data-over-color="neutral"
          data-ink-color="neutral-light"
          data-cursor="pointer"
          data-contain=""
          data-opacity={disabled ? "40" : undefined}
          data-disabled={disabled ? "true" : undefined}
          role="button"
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={selectNext}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              selectNext();
            }
          }}
        >
          <group data-width="auto">
            <text data-ellipsis="" data-opacity="40">
              {label}
            </text>
          </group>
          <group
            data-width="auto"
            data-position="right"
            data-align="center"
            data-gap="15"
            data-wrap="no"
          >
            {hint !== undefined && (
              <text data-ellipsis="" data-opacity="30">
                {hint}
              </text>
            )}
            <separator data-vertical="" data-height="20"></separator>
            <group
              data-align="center"
              data-justify="center"
              data-width="auto"
              data-wrap="no"
            //  data-contain=""
            >
              {options.map((option) => (
                <text
                  key={option.value}
                  data-ellipsis=""
                  data-transition-prop="font-size"
                  data-duration="2"
                  data-text-size={option.value === value ? "" : "0"}
                  aria-hidden={option.value !== value}
                >
                  {option.name}
                </text>
              ))}
            </group>
          </group>
        </group>
      </Ripple>
    </group>
  );
};

export default ConfigSwap;
