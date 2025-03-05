import React from "react";

type GridProps = {
  activeIndexes?: Set<number>;
  size?: number | "fit";
};

const DotDisplay: React.FC<GridProps> = ({
  activeIndexes = new Set(),
  size = 110,
}) => {
  const rows = 16;
  const cols = 16;

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


          return (
            <Dot
              key={index}
              row={row}
              x={x}
              y={y}
              active={activeIndexes.has(index)}
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
};

const Dot: React.FC<DotProps> = ({ x, y, row, active }) => {
  return (
    <circle
      data-duration={3 + row * 0.25}
      cx={x}
      cy={y}
      r={active ? "4" : "0"}
      transform={active ? "translate(0 0)" : "translate(2 5)"}
    />
  );
};

export default DotDisplay;
