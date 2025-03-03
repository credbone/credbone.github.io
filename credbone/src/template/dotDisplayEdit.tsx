import { Eraser } from "lucide-react";
import React, { useState, useEffect } from "react";
import Popover from "../components/popover";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";

const DotDisplayEdit: React.FC<{ predefinedActiveIndexes?: Set<number> }> = ({
  predefinedActiveIndexes,
}) => {
  const [currentActiveIndexes, setCurrentActiveIndexes] = useState<Set<number>>(
    predefinedActiveIndexes || new Set()
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isEraserActive, setIsEraserActive] = useState(false); // State for eraser mode
  const rows = 16;
  const cols = 16;

  const handleCircleClick = (index: number) => {
    const newActiveIndexes = new Set(currentActiveIndexes);
    if (isEraserActive) {
      // Remove dot if eraser is active
      newActiveIndexes.delete(index);
    } else {
      // Add or remove dot depending on its current state
      if (newActiveIndexes.has(index)) {
        newActiveIndexes.delete(index);
      } else {
        newActiveIndexes.add(index);
      }
    }
    setCurrentActiveIndexes(newActiveIndexes);
  };

  const handleMouseDown = () => setIsMouseDown(true);
  const handleMouseUp = () => setIsMouseDown(false);

  const handleMouseMove = (index: number) => {
    if (isMouseDown) {
      const newActiveIndexes = new Set(currentActiveIndexes);
      if (isEraserActive) {
        // Erase dot on mouse move
        newActiveIndexes.delete(index);
      } else {
        // Add dot on mouse move
        newActiveIndexes.add(index);
      }
      setCurrentActiveIndexes(newActiveIndexes);
    }
  };

  const handleClear = () => {
    setCurrentActiveIndexes(new Set());
    setIsEraserActive(false);
  };
  const { addSnackbar } = useSnackbar();

  const copyRawData = async () => {
    try {
      await navigator.clipboard.writeText(getRawData());
      // console.log("Raw data copied to clipboard!");
      addSnackbar("Raw data copied to clipboard", 1000);
    } catch (err) {
      //  console.error("Failed to copy raw data", err);
      addSnackbar("Failed to copy raw data", 1000);
    }
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

  const copySVGToClipboard = async () => {
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

    try {
      await navigator.clipboard.writeText(svgContent);
      // console.log("SVG copied to clipboard!");

      addSnackbar("SVG copied to clipboard", 1000);
    } catch (err) {
      // console.error("Failed to copy SVG", err);
      addSnackbar("Failed to copy", 1000);
    }
  };

  useEffect(() => {
    if (predefinedActiveIndexes) {
      setCurrentActiveIndexes(predefinedActiveIndexes);
    }
  }, [predefinedActiveIndexes]);

  const getRawData = () => Array.from(currentActiveIndexes).join(", ");

  const toggleEraser = () => setIsEraserActive(!isEraserActive); // Toggle eraser mode

  return (
    <group data-direction="column"  >
      <group data-space="10" data-gap="10" data-align="center">
        <group
          data-space="15"
          data-align="center"
          data-justify="center"
          data-background="adaptive-gray"
          data-width="auto"
          data-interactive=""
          data-over-color="neutral"
          data-radius="10"
          data-cursor="pointer"
          onClick={handleClear}
        >
          <text>Clear</text>
        </group>

        <separator data-vertical="" data-height="20"></separator>

        <group
          data-space-horizontal="15"
          data-align="center"
          data-justify="center"
          data-background={isEraserActive ? "main" : "adaptive-gray"}
          data-color={isEraserActive ? "main-text" : ""}
          data-height="45"
          data-width="auto"
          data-interactive=""
          data-over-color="neutral"
          data-radius="10"
          data-cursor="pointer"
          onClick={toggleEraser}
        >
          <group data-interact="">
            <Eraser size={20} />
          </group>
        </group>
      </group>

      <separator data-horizontal=""></separator>

      <group data-space="30" data-background="adaptive-gray" data-justify="center">
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

      <separator data-horizontal=""></separator>

      <group data-space="10">
        <Popover
          data-space="5"
          content={(closePopover) => (
            <group
              data-direction="column"
              data-length="180"
              onClick={closePopover}
            >
              <group
                data-space="15"
                data-width="auto"
                data-interactive=""
                data-radius="5"
                data-cursor="pointer"
                onClick={exportSVG}
              >
                <text>Export SVG</text>
              </group>

              <group
                data-space="15"
                data-width="auto"
                data-interactive=""
                data-radius="5"
                data-cursor="pointer"
                onClick={copySVGToClipboard}
              >
                <text>Copy SVG</text>
              </group>

              <group
                data-space="15"
                data-width="auto"
                data-interactive=""
                data-radius="5"
                data-cursor="pointer"
                onClick={copyRawData}
              >
                <text>Copy Raw Data</text>
              </group>
            </group>
          )}
        >
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
          >
            <text>Export</text>
          </group>
        </Popover>
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
    />
  );
};

export default DotDisplayEdit;
