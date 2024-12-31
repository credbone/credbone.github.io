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
      return newData.length > 4 ? newData.slice(1) : newData;
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

  const smoothPath = coordinates
  .map((coord, i, arr) => {
    if (i === 0) {
      return `M ${coord.x},${coord.y}`; // Start point
    }
    const prev = arr[i - 1];
    const controlX = (prev.x + coord.x) / 2; // Midpoint for smooth control point
    return `C ${controlX},${prev.y} ${controlX},${coord.y} ${coord.x},${coord.y}`;
  })
  .join(" ");


const fillPath = `${smoothPath} 
  L ${coordinates[coordinates.length - 1].x},${totalHeight} 
  L ${coordinates[0].x},${totalHeight} Z`;

  return (
    <svg
      viewBox={`0 0 75 ${totalHeight}`}
      preserveAspectRatio="none"
    //  width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id={maskid}>
        <path  d={fillPath} fill="#fff" />
      </mask>

      <text x="50%" y="50%" data-weight="800" dominantBaseline="middle" textAnchor="middle" data-text-size="x-large">
            {value}
          </text>

      <path d={fillPath} data-fill="main" />

      
      <text  x="50%" y="50%" data-weight="800" dominantBaseline="middle" textAnchor="middle" mask={`url(#${maskid})`} data-color="main-text" data-fill="main-text" data-text-size="x-large">
            {value}
          </text>


    </svg>
  );
};

export default LineChart;
