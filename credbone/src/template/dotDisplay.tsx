import React from "react";

// Cursor size radius map — must stay in sync with DotDisplayEdit
const CURSOR_RADIUS: Record<string, number> = {
  small: 2,
  default: 4,
  large: 6,
};

// Decode a Set<number> that may contain float-encoded sizes (115.2, 102.3)
// into a Map<integer index, radius> for rendering
const decodeEncodedSet = (set: Set<number>): Map<number, number> => {
  const map = new Map<number, number>();
  set.forEach((val) => {
    const index = Math.floor(val);
    const frac = Math.round((val - index) * 10); // 0, 2, or 3
    const r = frac === 2 ? 2 : frac === 3 ? 6 : 4;
    map.set(index, r);
  });
  return map;
};

type GridProps = {
  activeIndexes?: Set<number>;
  // Optional: pass the full dot map to support per-dot sizes
  activeDots?: Map<number, { index: number; size: string }>;
  size?: number | "fit";
};

const DotDisplay: React.FC<GridProps> = ({
  activeIndexes = new Set(),
  activeDots,
  size = 110,
}) => {
  const rows = 16;
  const cols = 16;

  // If activeIndexes contains float-encoded sizes, decode them
  const decodedIndexMap = React.useMemo(
    () => decodeEncodedSet(activeIndexes),
    [activeIndexes]
  );

  return (
    <group data-contain="" data-width="auto" data-name="dot-display">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size === "fit" ? "100%" : size}
        height={size === "fit" ? "100%" : size}
        viewBox="0 0 160 160"
        fill="currentcolor"
      >
        {/* <defs>  
    <filter id="filter">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="filter"/>
      <feComposite in="SourceGraphic" in2="filter" operator="atop"/>
    </filter>
  </defs> */}

        {Array.from({ length: rows * cols }).map((_, index) => {
          const row = Math.floor(index / cols);
          const x = (index % cols) * 10 + 5;
          const y = Math.floor(index / cols) * 10 + 5;


          //offset


          // const row = Math.floor(index / cols);
          // const col = index % cols;
          // const offsetX = row % 2 === 0 ? 0 : 5;
          // const x = col * 10 + 5 + offsetX;
          // const y = row * 10 + 5;


          // Resolve active state and radius:
          // activeDots (Map) > decodedIndexMap (float-encoded Set) > plain activeIndexes
          const dot = activeDots?.get(index);
          const decodedR = decodedIndexMap.get(index);
          const isActive = dot ? true : decodedIndexMap.has(index);
          const r = dot ? CURSOR_RADIUS[dot.size] ?? 4 : decodedR ?? 4;

          return (
            <Dot
              key={index}
              row={row}
              x={x}
              y={y}
              active={isActive}
              r={r}
            />
          );
        })}



      </svg>
    </group>
  );
};

type DotProps = {
  x: number;
  y: number;
  active: boolean;
  row: number;
  r: number;
};

const Dot: React.FC<DotProps> = ({ x, y, row, active, r }) => {
  return (
    <circle
      data-duration={3 + row * 0.25}
      cx={x}
      cy={y}
      r={active ? r : "0"}
      transform={active ? "translate(0 0)" : "translate(2 5)"}
    />
  );
};

export default DotDisplay;