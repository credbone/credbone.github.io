import React from "react";
import Popover from "../popover";
import Ripple from "../Ripple";


export interface SelectOption {
  value: string;
  name: React.ReactNode;
  hint?: React.ReactNode;
  /** Draws a separator after this option */
  separator?: boolean;
}

interface SelectOptionsProps {
  options: SelectOption[];
  value: string;
  onSelect: (value: string) => void;
  /** Passed through from Popover's content callback */
  isBottomSheet: boolean;
  /** Animation delay step per item (data-animation-duration units). Defaults to 0.25 */
  stagger?: number;
}

// Option list for a popover picker. In a popover, items animate outward from the selected one
// (the middle if none is); in a bottom sheet they animate in order. The selected item gets the
// main color, and data-selected for the popover's "align-selected" placement
export const SelectOptions: React.FC<SelectOptionsProps> = ({
  options,
  value,
  onSelect,
  isBottomSheet,
  stagger = 0.25,
}) => {
  const selectedIndex = options.findIndex((option) => option.value === value);
  const originIndex =
    selectedIndex >= 0 ? selectedIndex : Math.floor(options.length / 2);

  return (
    <>
      {options.map((option, index) => {
        const distance = Math.abs(index - originIndex);
        const belowOrigin = index >= originIndex;
        const selected = value === option.value;

        return (
          <React.Fragment key={option.value}>
            <group
              onClick={() => {
                if (!selected) onSelect(option.value);
              }}
              data-selected={selected ? "true" : undefined}
              data-background={selected ? "main" : ""}
              data-color={selected ? "main-text" : ""}
              data-animation-name={
                isBottomSheet
                  ? "appear-bottom"
                  : selected
                    ? undefined
                    : belowOrigin
                      ? "appear-top"
                      : "appear-bottom"
              }
              data-fill-mode="backwards"
              data-animation-duration={
                isBottomSheet ? 2 + index * stagger : 2 + distance * stagger
              }
              data-align="center"
              data-interactive=""
              data-over-color="neutral"
              data-radius={isBottomSheet ? "10" : undefined}
              data-cursor="pointer"
              data-space="15"
              data-gap="10"
            >
              <text>{option.name}</text>
              {option.hint !== undefined && (
                <text data-opacity="40">{option.hint}</text>
              )}
            </group>
            {option.separator && (
              <separator data-horizontal="" data-interval="10"></separator>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

interface ConfigSelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onSelect: (value: string) => void;
  /** Show as a bottom sheet on mobile */
  bottomsheet?: boolean;
  /** Dims the content (not the border) and can't be used or focused */
  disabled?: boolean;
}

// Config selector (pairs with ConfigSlider): a bordered bar with the label on the left and
// "Change" + the current option on the right. Opens a popover over itself to pick an option,
// with the selected one lined up with the bar
const ConfigSelect: React.FC<ConfigSelectProps> = ({
  label,
  options,
  value,
  onSelect,
  bottomsheet,
  disabled = false,
}) => (
  <group data-space="3" data-radius="15" data-border="" data-contain="">
    <Popover
      placement="align-selected"
      bottomsheet={bottomsheet}
      data-radius="15"
      data-space="0"
      data-space-vertical="10"
      content={(closePopover, isBottomSheet) => (
        <group data-direction="column" onClick={closePopover}>
          <SelectOptions
            options={options}
            value={value}
            onSelect={onSelect}
            isBottomSheet={isBottomSheet}
          />
        </group>
      )}
    >
      {/* The popover's trigger, so it has to be the one that ignores presses */}
      <group
        data-opacity={disabled ? "40" : undefined}
        data-disabled={disabled ? "true" : undefined}
        aria-disabled={disabled || undefined}
      >
        <Ripple>
          <group
            data-height="40"
            data-radius="12"
            data-align="center"
            data-justify="space-between"
            data-gap="10"
            data-wrap="no"
            data-space-horizontal="15"
            data-interactive=""
            data-over-color="neutral"
            data-ink-color="neutral"
            data-cursor="pointer"
            data-contain=""
          >
            <text data-ellipsis="">{label}</text>
            <group
              data-width="auto"
              data-align="center"
              data-gap="15"
              data-wrap="no"
            >
              <text data-opacity="30">Change</text>
              <separator data-vertical="" data-height="20"></separator>
              <text>{options.find((o) => o.value === value)?.name}</text>
            </group>
          </group>
        </Ripple>
      </group>
    </Popover>
  </group>
);

export default ConfigSelect;
