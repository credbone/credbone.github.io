import React, { useState, useEffect, useId } from "react";

interface LineChartProps {
  value: number;
  max: number;
}

const LineChart: React.FC<LineChartProps> = ({ value, max }) => {
  const [data, setData] = useState<number[]>([value]);
  const [translateX, setTranslateX] = useState(0);
  const maskid = useId();

  const svgWidth = 100; // Fixed SVG width

  const getCoordinates = (height: number) => {
    const stepX = svgWidth / 5; // Fixed X-step for each point
    return data.map((val, i) => ({
      x: i * stepX, // X grows indefinitely, even beyond the SVG
      y: totalHeight - (val / max) * totalHeight,
    }));
  };

  useEffect(() => {
    // Update the data array and translateX whenever 'value' changes
    setData((prevData) => {
      const newData = [...prevData, value];
      setTranslateX(translateX - svgWidth / 5); // Shift path left by svgWidth on new data point
      return newData;
    });
  }, [value]);

  const height = 50;
  const extraSpace = 100;
  const totalHeight = height + extraSpace;

  const coordinates = getCoordinates(height);

  // Function to generate a smooth curve using Bezier curves
  const smoothPath = coordinates
    .map((coord, i, arr) => {
      if (i === 0) return `M ${coord.x},${coord.y}`; // Start point
      if (i === 1) {
        return `L ${coord.x},${coord.y}`; // Straight line to the second point
      }
      const prev = arr[i - 1];
      const controlX = (prev.x + coord.x) / 2; // Control point between the two points for smoothness
      return `C ${controlX},${prev.y} ${controlX},${coord.y} ${coord.x},${coord.y}`;
    })
    .join(" ");

  const fillPath = `${smoothPath} L ${
    coordinates[coordinates.length - 1].x
  },${totalHeight} L ${coordinates[0].x},${totalHeight} Z`;

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${totalHeight}`}
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible" // Allow path to overflow beyond the SVG
    >
      <mask id={maskid}>
        <g
          style={{
            transform: `translateX(${translateX}px)`,
            transition: "transform 1s linear",
          }}
        >
          <path
            transform="translate(100 0)"
            d={fillPath}
            fill="#fff"
          />
        </g>
      </mask>
      <text
        x="50%"
        y="50%"
        data-weight="800"
        dominant-baseline="middle"
        text-anchor="middle"
        data-text-size="xx-large"
      >
        {" "}
        {value}
      </text>
      <g
        style={{
          transform: `translateX(${translateX}px)`,
          transition: "transform 1s linear",
        }}
      >
        <path transform="translate(100 0)" d={fillPath} data-fill="main" />
      </g>

      <text
        x="50%"
        y="50%"
        data-weight="800"
        dominant-baseline="middle"
        text-anchor="middle"
        mask={`url(#${maskid})`}
        data-color="main-text"
        data-fill="main-text"
        data-text-size="xx-large"
      >
        {value}
      </text>
    </svg>
  );
};

export default LineChart;
