import React from "react";
import CustomSlider from "./slider";
import TickComponent from "./TickComponent";

interface ConfigSliderProps {
  label: string;
  start: number;
  end: number;
  step?: number;
  value: number;
  onValueChange: (value: number) => void;
  /** Formats the value shown on the right (units, rounding…). Defaults to the raw value. */
  format?: (value: number) => React.ReactNode;
  /** Dims the content (not the border) and can't be used or focused */
  disabled?: boolean;
}

// Config slider (the "Grain" style from the slider demos): a bordered bar whose fill follows the value,
// decorative ticks behind it, the label on the left and the current value on the right
const ConfigSlider: React.FC<ConfigSliderProps> = ({
  label,
  start,
  end,
  step,
  value,
  onValueChange,
  format,
  disabled = false,
}) => (
  <group data-space="3" data-radius="15" data-border="" data-contain="">
    <group
      data-position="absolute"
      data-width="fit"
      data-left="0"
      data-top="0"
      data-space-horizontal="25"
      data-height="fit"
      data-align="center"
      data-mask="left-right"
      data-pointer-event="none"
      data-opacity={disabled ? "40" : undefined}
    >
      <TickComponent
        tickCount={18}
        emphasizeCenter={false}
        data-opacity="40"
        data-align="center"
        heights={{ minor: 8, major: 8, center: 30 }}
      />
    </group>

    <group
      data-radius="12"
      data-contain=""
      data-interactive=""
      data-over-color="none"
      data-opacity={disabled ? "40" : undefined}
      data-disabled={disabled ? "true" : undefined}
    >
      <CustomSlider
        label=""
        start={start}
        end={end}
        step={step}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        handlerProps={{
          "data-height": "40",
          "data-background": "none",
        }}
        fillProps={{
          "data-background": "neutral-light",
          "data-height": "40",
          "data-radius": "12",
          "data-opacity": "80",
          "data-react": "background",
          "data-over-color": "neutral-10",
        }}
        trackLeftProps={{ "data-background": "none" }}
        trackRightProps={{ "data-background": "none" }}
      />
    </group>

    <group
      data-position="absolute"
      data-pointer-event="none"
      data-opacity={disabled ? "40" : undefined}
      data-height="fit"
      data-width="fit"
      data-left="0"
      data-top="0"
      data-align="center"
      data-wrap="no"
      data-gap="10"
      data-space-horizontal="15"
    >
<group data-space="3">
        <text data-ellipsis="">{label}</text>
      <text data-position="right">{format ? format(value) : value}</text>
</group>
    </group>
  </group>
);

export default ConfigSlider;
