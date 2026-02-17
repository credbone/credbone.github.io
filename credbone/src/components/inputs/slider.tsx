import React, { useState, useRef, useEffect } from "react";

interface SliderProps {
  start: number;
  end: number;
  step?: number;
  value: number;
  onValueChange: (value: number) => void;
  handlerWidth?: number;
  unit?: string;
  handlerProps?: React.HTMLAttributes<HTMLDivElement> & { [key: string]: any };
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
  handlerWidth = 60,
  unit,
  handlerProps,
  trackLeftProps,
  trackRightProps,
  showvalue = true,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => setIsDragging(false);

    input.addEventListener('input', handleDragStart);
    input.addEventListener('change', handleDragEnd);
    input.addEventListener('touchend', handleDragEnd);
    input.addEventListener('mouseup', handleDragEnd);

    return () => {
      input.removeEventListener('input', handleDragStart);
      input.removeEventListener('change', handleDragEnd);
      input.removeEventListener('touchend', handleDragEnd);
      input.removeEventListener('mouseup', handleDragEnd);
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    onValueChange(newValue);
  };

  const percentage = ((value - start) / (end - start)) * 100;

  return (
    <group 
      data-name="range-slider" 
      data-wrap="no" 
      data-contain=""
      
      
    >
      <input
        ref={inputRef}
        type="range"
        min={start}
        max={end}
        value={value}
        onChange={handleChange}
        data-height="fit"
        step={step}
      />

      <group
      data-duration={isDragging ? undefined : "2.25"}
data-transition-prop="position"

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
          data-height="2"
          data-min-length="700"
          data-position="absolute"
          data-margin-right="5"
          {...trackLeftProps}
        ></group>
        <group
          data-background="text"
          data-height="2"
          data-name="range-slider-track-right"
          data-min-length="700"
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