import React, { useState, useEffect } from "react";

const DotDisplayEdit: React.FC<{ predefinedActiveIndexes?: Set<number> }> = ({
  predefinedActiveIndexes,
}) => {
  const [currentActiveIndexes, setCurrentActiveIndexes] = useState<Set<number>>(
    predefinedActiveIndexes || new Set()
    
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const rows = 16;
  const cols = 16;

  const handleCircleClick = (index: number) => {
    const newActiveIndexes = new Set(currentActiveIndexes);
    if (newActiveIndexes.has(index)) {
      newActiveIndexes.delete(index);
    } else {
      newActiveIndexes.add(index);
    }
    setCurrentActiveIndexes(newActiveIndexes);
  };

  const handleMouseDown = () => setIsMouseDown(true);
  const handleMouseUp = () => setIsMouseDown(false);

  const handleMouseMove = (index: number) => {
    if (isMouseDown) {
      const newActiveIndexes = new Set(currentActiveIndexes);
      newActiveIndexes.add(index);
      setCurrentActiveIndexes(newActiveIndexes);
    }
  };

  const handleClear = () => {
    setCurrentActiveIndexes(new Set());
  };

  const getRawData = () => Array.from(currentActiveIndexes).join(", ");

  const copyRawData = () => {
    navigator.clipboard.writeText(getRawData());
  };

  const exportSVG = () => {
    const svgContent = `
      <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        ${Array.from(currentActiveIndexes)
          .map((index) => {
            const x = (index % cols) * 10 + 5;
            const y = Math.floor(index / cols) * 10 + 5;
            return `<circle cx="${x}" cy="${y}" r="4" fill="black"/>`;
          })
          .join("\n")}
      </svg>
    `;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dots.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (predefinedActiveIndexes) {
      setCurrentActiveIndexes(predefinedActiveIndexes);
    }
  }, [predefinedActiveIndexes]);

  return (
    <group data-direction="column">
      <group data-space="10" data-gap="10" data-align="center">
        <group
          data-space="15"
          data-align="center"
          data-justify="center"
          data-background="adaptive-gray"
          data-color="adaptive-gray"
          data-width="auto"
          data-interactive=""
          data-over-color="neutral"
          data-radius="10"
          data-cursor="pointer"
          onClick={handleClear}
        >
          <text>Clear</text>
        </group>

        <separator data-vertical=""></separator>

        <group
          data-space="15"
          data-align="center"
          data-justify="center"
          data-background="adaptive-gray"
          data-color="adaptive-gray"
          data-width="auto"
          data-interactive=""
          data-over-color="neutral"
          data-radius="10"
          data-cursor="pointer"
          onClick={copyRawData}
        >
          <text>Copy Raw Data</text>
        </group>

        <group
          data-space="15"
          data-align="center"
          data-justify="center"
          data-background="adaptive-gray"
          data-color="adaptive-gray"
          data-width="auto"
          data-interactive=""
          data-over-color="neutral"
          data-radius="10"
          data-cursor="pointer"
          onClick={exportSVG}
        >
          <text>Export SVG</text>
        </group>
      </group>

      <separator data-horizontal=""></separator>

      <group data-space="30" data-background="adaptive-gray">
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {Array.from({ length: rows * cols }).map((_, index) => {
            const x = (index % cols) * 10 + 5;
            const y = Math.floor(index / cols) * 10 + 5;
            return (
              <Dot
                key={index}
                x={x}
                y={y}
                active={currentActiveIndexes.has(index)}
                onClick={() => handleCircleClick(index)}
                onMouseMove={() => handleMouseMove(index)}
              />
            );
          })}
        </svg>
      </group>
    </group>
  );
};

const Dot: React.FC<{
  x: number;
  y: number;
  active: boolean;
  onClick: () => void;
  onMouseMove: () => void;
}> = ({ x, y, active, onClick, onMouseMove }) => {
  return (
    <circle
      opacity={active ? "1" : ".1"}
      cx={x}
      cy={y}
      r="4"
      fill="currentcolor"
      onClick={onClick}
      onMouseMove={onMouseMove}
      style={{ cursor: "pointer" }}
    />
  );
};

export default DotDisplayEdit;
