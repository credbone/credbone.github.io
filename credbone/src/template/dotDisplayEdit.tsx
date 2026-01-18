import { Eraser } from "lucide-react";
import React, { useState, useEffect } from "react";
import Popover from "../components/popover";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import DotDisplay from "./dotDisplay";

const DotDisplayEdit: React.FC<{ predefinedActiveIndexes?: Set<number> }> = ({
  predefinedActiveIndexes,
}) => {
  const [currentActiveIndexes, setCurrentActiveIndexes] = useState<Set<number>>(
    predefinedActiveIndexes || new Set()
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const [isEraserActive, setIsEraserActive] = useState(false);
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

  // Mouse event handlers
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

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling
    setIsTouchActive(true);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsTouchActive(false);
  };
  
  const handleTouchMove = (e: React.TouchEvent, svgElement: SVGSVGElement) => {
    e.preventDefault();
    if (!isTouchActive || !svgElement) return;
    
    // Get touch position relative to SVG
    const touch = e.touches[0];
    const svgRect = svgElement.getBoundingClientRect();
    const x = touch.clientX - svgRect.left;
    const y = touch.clientY - svgRect.top;
    
    // Convert to grid coordinates
    const col = Math.floor(x / (svgRect.width / cols));
    const row = Math.floor(y / (svgRect.height / rows));
    
    // Ensure valid index
    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      const index = row * cols + col;
      
      const newActiveIndexes = new Set(currentActiveIndexes);
      if (isEraserActive) {
        newActiveIndexes.delete(index);
      } else {
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
      addSnackbar("Raw data copied to clipboard", 1000);
    } catch (err) {
      addSnackbar("Failed to copy raw data", 1000);
    }
  };

  const exportSVG = () => {
    const currentDateTime = new Date().toISOString().replace(/[^\w]/g, "").slice(0, 15);
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
    a.download = `dots-${currentDateTime}.svg`;
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
      addSnackbar("SVG copied to clipboard", 1000);
    } catch (err) {
      addSnackbar("Failed to copy", 1000);
    }
  };



useEffect(() => {
  // Handle mouse up and touch end events globally
  const handleGlobalMouseUp = () => {
    setIsMouseDown(false);
  };
  
  const handleGlobalTouchEnd = () => {
    setIsTouchActive(false);
  };
  
  // Add global event listeners
  document.addEventListener('mouseup', handleGlobalMouseUp);
  document.addEventListener('touchend', handleGlobalTouchEnd);
  
  // Clean up
  return () => {
    document.removeEventListener('mouseup', handleGlobalMouseUp);
    document.removeEventListener('touchend', handleGlobalTouchEnd);
  };
}, []);



  useEffect(() => {
    if (predefinedActiveIndexes) {
      setCurrentActiveIndexes(predefinedActiveIndexes);
    }
  }, [predefinedActiveIndexes]);

  const getRawData = () => Array.from(currentActiveIndexes).join(", ");

  const toggleEraser = () => setIsEraserActive(!isEraserActive);

  // SVG reference for touch events
  const svgRef = React.useRef<SVGSVGElement>(null);

  return (
    <>
      <group data-border="" data-width="auto" data-radius="30" data-contain="" data-elevation="2">
        <group data-direction="column" 
        
          data-space="10">


         

          <group
            data-space="30"
            
            data-justify="center"
          >
            {/* <group
             data-disabled="true"
            data-opacity="30"
             data-position="absolute"

              data-height="fit"
              data-wrap="no"
              data-top="0"
              data-justify="center"
            >
              <group
                data-length="1"
                data-height="fit"
                data-background="red"
              ></group>

            </group>

            <group
            data-disabled="true"
            data-opacity="30"
             data-top="0"
             data-position="absolute"
                          data-justify="center"
              data-height="fit"
              data-wrap="no"
              data-direction="column"
            >
              <group
                data-height="1"
                data-length="fit"
                data-background="red"
              ></group>

            </group> */}

            <svg
            
              ref={svgRef}
              width="256"
              //height="256"
              viewBox="0 0 160 160"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchMove={(e) => handleTouchMove(e, svgRef.current!)}
              style={{ touchAction: "none" }}
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

                    <group data-space="10" data-gap="10" data-align="center"  data-radius="20" data-wrap="no" >
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
              data-contain=""
              
            >
              <text data-ellipsis="">Clear Canvas</text>
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

            <Popover
               data-space="5"
               data-radius="15"
              content={(closePopover) => (
                <group
                  data-direction="column"
                  data-length="240"
                  onClick={closePopover}

                >
                  <group
                    data-space="15"
                    data-width="auto"
                    data-interactive=""
 data-radius="10"
                    data-cursor="pointer"
                    onClick={exportSVG}
                    data-weight="700"
                  >
                    <text>Download</text>
                  </group>

                  <group
                    data-space="15"
                    data-width="auto"
                    data-interactive=""
 data-radius="10"
                    data-cursor="pointer"
                    onClick={copySVGToClipboard}
                  >
                    <text>Copy</text>
                  </group>


                  <group
                    data-space="15"
                    data-width="auto"
                    data-interactive=""
 data-radius="10"
                    data-cursor="pointer"
                    onClick={copyRawData}
                  >
                    <text>Grab Raw Data</text>
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
                data-position="right"
              >
                <text>Export</text>
              </group>
            </Popover>
          </group>
        </group>
      </group>

      <group
        data-width="auto"
        data-radius="30"
        data-space="adaptive-30-50"
        data-background="text"
        data-color="main-background"
        data-align="center"
        data-direction="column"
        data-justify="center"
        data-gap="20"
      >
        <group data-position="center" data-justify="center">
          <DotDisplay activeIndexes={currentActiveIndexes} />
        </group>
        <text data-opacity="30">Preview</text>
      </group>
    </>
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