import React from "react";

interface GaugeProps {
  value: number;
  max: number;
  size: number;
}

const Gauge: React.FC<GaugeProps> = ({ value, max, size }) => {
  const radius = size / 2 - 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;

  return (
    <svg  viewBox="0 0 100 100">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentcolor"
        strokeWidth="15"
        fill="none"
        data-opacity="10"
        // strokeDasharray="100"
        // strokeDashoffset="0"
      />
      <circle
//      data-opacity="0"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentcolor"
        strokeWidth="15"
        fill="none"
        stroke-linecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        data-duration=".725"
        data-transition-prop="stroke-dashoffset"
      />
    </svg>
  );
};

export default Gauge;
