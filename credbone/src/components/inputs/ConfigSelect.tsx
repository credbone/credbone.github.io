import React from "react";
import Popover from "../popover";
import Ripple from "../Ripple";


export interface SelectOption {
  value: string;
  name: React.ReactNode;
  hint?: React.ReactNode;
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

// Option list for a popover picker. In a popover, items animate outward from the middle;
// in a bottom sheet they animate in order. The selected item gets the main color
export const SelectOptions: React.FC<SelectOptionsProps> = ({
  options,
  value,
  onSelect,
  isBottomSheet,
  stagger = 0.25,
}) => {
  const midIndex = Math.floor(options.length / 2);

  return (
    <>
      {options.map((option, index) => {
        const distance = Math.abs(index - midIndex);
        const fromBottom = index >= midIndex;
        const selected = value === option.value;

        return (
          <group
            key={option.value}
            onClick={() => {
              if (!selected) onSelect(option.value);
            }}
            data-background={selected ? "main" : ""}
            data-color={selected ? "main-text" : ""}
            data-animation-name={
              isBottomSheet
                ? "appear-bottom"
                : fromBottom
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
}

// Config selector (pairs with ConfigSlider): a bordered bar with the label on the left and
// "Change" + the current option on the right. Opens a popover over itself to pick an option
const ConfigSelect: React.FC<ConfigSelectProps> = ({
  label,
  options,
  value,
  onSelect,
  bottomsheet,
}) => (
  <group data-space="3" data-radius="15" data-border="" data-contain="">
    <Popover
      placement="middle"
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
      <group>
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
