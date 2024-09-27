import React, { useState, useEffect } from "react";

interface LineChartProps {
  value: number;
  max: number;
}

const LineChart: React.FC<LineChartProps> = ({ value, max }) => {
  const [data, setData] = useState<number[]>([value]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData, Math.random() * max];
        return newData.length > 7 ? newData.slice(1) : newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [max]);

  const getCoordinates = (width: number, height: number) => {
    const stepX = width / (data.length - 1);
    const maxDataValue = max;
    return data.map((val, i) => ({
      x: i * stepX,
      y: height - (val / maxDataValue) * height,
    }));
  };

  // Helper function to generate a smooth path using cubic Bézier curves
  const generateSmoothPath = (points: { x: number; y: number }[]) => {
    let d = `M ${points[0].x},${points[0].y}`;

    for (let i = 1; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const controlPointX = (curr.x + next.x) / 2;

      // Cubic Bézier curve (C) to smoothen transition between points
      d += ` C ${controlPointX},${curr.y} ${controlPointX},${next.y} ${next.x},${next.y}`;
    }

    return d;
  };

  const height = 50; // Original height of the SVG
  const extraSpace = 20; // Extra space to fill at the bottom
  const totalHeight = height + extraSpace; // New total height for the SVG

  const coordinates = getCoordinates(100, height);
  const fillPath = `${generateSmoothPath(coordinates)} L ${coordinates[coordinates.length - 1].x},${totalHeight} L ${coordinates[0].x},${totalHeight} Z`;

  return (
    <svg
      viewBox={`0 0 100 ${totalHeight}`}
      preserveAspectRatio="none"
      width="100%"
      height="100%"
    >
      {/* Fill area below the line */}
      <path
       //  data-duration=".325"
        d={fillPath}
        //  fill="rgba(0, 0, 255, 0.3)" // Semi-transparent blue fill
        data-fill="main"
      />
      {/* Line */}
      {/* <path
        d={generateSmoothPath(coordinates)}
        fill="none"
        stroke="blue"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      /> */}
    </svg>
  );
};

export default LineChart;
