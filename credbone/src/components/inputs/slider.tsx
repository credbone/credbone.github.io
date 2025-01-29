import React from "react";

interface SliderProps {
  start: number;
  end: number;
  step?: number;
  value: number; // Use `value` as a prop for controlled component
  onValueChange: (value: number) => void; // Ensure this prop is required
  handlerWidth?: number; // Configurable handlerWidth with default
  unit?: string; // Optional unit
  handlerProps?: React.HTMLAttributes<HTMLDivElement> & { [key: string]: any }; // Allows extra props
  trackLeftProps?: React.HTMLAttributes<HTMLDivElement> & { [key: string]: any };
  trackRightProps?: React.HTMLAttributes<HTMLDivElement> & { [key: string]: any };
  showvalue?: boolean;
}

const CustomSlider: React.FC<SliderProps> = ({
  start,
  end,
  step,
  value,
  onValueChange,
  handlerWidth = 60, // Default value for handlerWidth
  unit,
  handlerProps,
  trackLeftProps,
  trackRightProps,
  showvalue = true,
}) => {
  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    onValueChange(newValue); // Pass the value up to the parent component
  };

  // Calculate the percentage for positioning
  const percentage = ((value - start) / (end - start)) * 100;

  return (
    <group data-name="range-slider" data-wrap="no" data-contain="">
      <input
        type="range"
        min={start}
        max={end}
        value={value} // Controlled by parent
        onChange={handleChange}
        data-height="fit"
        step={step}
      />

      <group
        data-name="range-slider-handle"
        data-background="text"
        data-color="main-background"
        data-height="30"
        data-length={handlerWidth}
        data-align="center"
        data-justify="center"
        data-gap="5"
        data-radius="40"
        style={{
          left: `calc(${percentage}% - ${handlerWidth * (percentage / 100)}px)`,
        }}
        {...handlerProps}
      >
        <group
          data-background="text"
          data-name="range-slider-track-left"
          data-min-length="600"
          data-position="absolute"
          data-margin-right="5"
          {...trackLeftProps}
        ></group>
        <group
          data-background="text"
          data-name="range-slider-track-right"
          data-min-length="600"
          data-position="absolute"
          data-margin-left="5"
          {...trackRightProps}
        ></group>
        <text data-weight="700">
         {showvalue ? value : ""}
          {unit || ""}
        </text>
      </group>
    </group>
  );
};

export default CustomSlider;
