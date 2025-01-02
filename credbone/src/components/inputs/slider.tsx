import React, { useState } from "react";

interface SliderProps {
  start: number;
  end: number;
  step?: number;
  initialValue?: number;
  onValueChange?: (value: number) => void;
  handlerWidth?: number; // Configurable handlerWidth with default
  unit?: string; // Optional unit
  handlerProps?: React.HTMLAttributes<HTMLDivElement> & { [key: string]: any }; // Allows extra props
  trackLeftProps?: React.HTMLAttributes<HTMLDivElement> & { [key: string]: any; };
  trackRightProps?: React.HTMLAttributes<HTMLDivElement> & { [key: string]: any; };
}

const CustomSlider: React.FC<SliderProps> = ({
  start,
  end,
  step,
  initialValue = start,
  onValueChange,
  handlerWidth = 60, // Default value for handlerWidth
  unit,
  handlerProps,
  trackLeftProps,
  trackRightProps,
  
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };



  const percentage = ((value - start) / (end - start)) * 100;

  return (
    <group data-name="range-slider" data-wrap="no" data-contain="">
      <input
        type="range"
        min={start}
        max={end}
        value={value}
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
       // data-direction="column"
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
        <text data-weight="700">{value}{unit ? unit : ''}</text>
        
      </group>
    </group>
  );
};

export default CustomSlider;
