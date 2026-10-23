import React, { useState, useEffect, useLayoutEffect, useRef, useId } from "react";

interface LineChartProps {
  value: number;
  max: number;
}

const VISIBLE = 5; // segments visible at once
const BUFFER = VISIBLE + 3; // + one off the left edge, + one entering from the right, + one for curve continuity
const WIDTH = 75;
const STEP = WIDTH / VISIBLE;

const height = 50;
const extraSpace = 100;
const totalHeight = height + extraSpace;

const clamp = (val: number, max: number) =>
  max > 0 ? Math.min(Math.max(val, 0), max) : 0;

const LineChart: React.FC<LineChartProps> = ({ value, max }) => {
  const [data, setData] = useState<number[]>(() =>
    Array(BUFFER).fill(clamp(value, max))
  );

  const maskid = useId();

  const fillGroupRef = useRef<SVGGElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);
  const lastUpdateRef = useRef(performance.now());
  const intervalRef = useRef(1000);

  // Slide the strip left by up to one step, based on time since the last value
  const applyOffset = () => {
    const progress = Math.min(
      (performance.now() - lastUpdateRef.current) / intervalRef.current,
      1
    );
    const transform = `translate(${-progress * STEP} 0)`;
    fillGroupRef.current?.setAttribute("transform", transform);
    maskGroupRef.current?.setAttribute("transform", transform);
  };

  useEffect(() => {
    // Measure the update cadence so the scroll speed matches it
    const now = performance.now();
    const gap = now - lastUpdateRef.current;
    if (gap > 100 && gap < 5000) intervalRef.current = gap;
    lastUpdateRef.current = now;

    // Fixed-size buffer: push newest on the right, drop oldest on the left
    setData((prevData) => [...prevData.slice(1), clamp(value, max)]);
  }, [value, max]);

  // Reset the offset in the same frame the shifted data renders, so there is no jump
  useLayoutEffect(applyOffset, [data]);

  useEffect(() => {
    let frame: number;
    const loop = () => {
      applyOffset();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const coordinates = data.map((val, i) => ({
    x: (i - 1) * STEP,
    y: totalHeight - (max > 0 ? val / max : 0) * totalHeight,
  }));

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
      viewBox={`0 0 ${WIDTH} ${totalHeight}`}
      preserveAspectRatio="none"
      //  width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id={maskid}>
        <g ref={maskGroupRef}>
          <path d={fillPath} fill="#fff" />
        </g>
      </mask>

      <text x="50%" y="50%" data-weight="800" dominantBaseline="middle" textAnchor="middle" data-text-size="x-large">
        {value}
      </text>

      <g ref={fillGroupRef}>
        <path d={fillPath} data-fill="main" />
      </g>

      <text x="50%" y="50%" data-weight="800" dominantBaseline="middle" textAnchor="middle" mask={`url(#${maskid})`} data-color="main-text" data-fill="main-text" data-text-size="x-large">
        {value}
      </text>
    </svg>
  );
};

export default LineChart;
