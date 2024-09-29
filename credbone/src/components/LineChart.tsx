import React, { useState, useEffect, useId } from "react";

interface LineChartProps {
  value: number;
  max: number;
}



const LineChart: React.FC<LineChartProps> = ({ value, max }) => {
  const [data, setData] = useState<number[]>([value]);

  const maskid = useId();

  useEffect(() => {
    // Update the data array whenever 'value' changes
    setData((prevData) => {
      const newData = [...prevData, value];
      return newData.length > 7 ? newData.slice(1) : newData;
    });
  }, [value]);

  const getCoordinates = (width: number, height: number) => {
    const stepX = width / Math.max(1, data.length - 1); // Avoid division by zero
    return data.map((val, i) => ({
      x: i * stepX,
      y: totalHeight - (val / max) * totalHeight,
    }));
  };

  const height = 50;
  const extraSpace = 100;
  const totalHeight = height + extraSpace;

  const coordinates = getCoordinates(100, height);

  // Function to generate a smooth curve using Bezier curves
  const smoothPath = coordinates
    .map((coord, i, arr) => {
      if (i === 0) return `M ${coord.x},${coord.y}`; // Start point
      if (i === 1) {
        // Handle the case for the second point to avoid NaN
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
      viewBox={`0 0 100 ${totalHeight}`}
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id={maskid}>
        <path data-duration="1" d={fillPath} fill="#fff" />
      </mask>

      <foreignObject width="100%" height="100%">
        <group
          data-align="center"
          data-justify="center"
          data-direction="column"
          data-height="fit"
          // data-background="secondary"
          // data-color="secondary-text"
        >
          <text data-weight="800" data-text-size="xx-large">
            {value}
          </text>
        </group>
      </foreignObject>

      <path d={fillPath} data-fill="main" />

      <foreignObject width="100%" height="100%" mask={`url(#${maskid})`}>
        <group
          data-align="center"
          data-justify="center"
          data-direction="column"
          data-height="fit"
        >
          <text
            data-weight="800"
            data-text-size="xx-large"
            data-color="main-text"
          >
            {value}
          </text>
        </group>
      </foreignObject>
    </svg>
  );
};

export default LineChart;
