import { Eraser, Pencil } from "lucide-react";
import React, { useState, useEffect } from "react";
import Popover from "../components/popover";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import DotDisplay from "./dotDisplay";
import Ripple from "../components/Ripple";

const DotDisplayEdit: React.FC<{
  predefinedActiveIndexes?: Set<number>;
  onNewIcon?: () => void;
  onStartEdit?: () => void;
}> = ({ predefinedActiveIndexes, onNewIcon, onStartEdit }) => {
  const [currentActiveIndexes, setCurrentActiveIndexes] = useState<Set<number>>(
    predefinedActiveIndexes || new Set(),
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const [isEraserActive, setIsEraserActive] = useState(false);
  const rows = 16;
  const cols = 16;

  const handleCircleClick = (index: number) => {
    onStartEdit?.();

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

  const [isshowoverlay, setshowoverlay] = useState(true);

  const toggleoverlay = () => {
    setshowoverlay((prev) => !prev);
  };

  // Mouse event handlers
  const handleMouseDown = () => setIsMouseDown(true);
  const handleMouseUp = () => setIsMouseDown(false);

  const handleMouseMove = (index: number) => {
    if (isMouseDown) {
      onStartEdit?.();

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
    // e.preventDefault(); // Prevent scrolling
    setIsTouchActive(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    //   e.preventDefault();
    setIsTouchActive(false);
  };

  const handleTouchMove = (e: React.TouchEvent, svgElement: SVGSVGElement) => {
    onStartEdit?.();
    // e.preventDefault();
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
    onNewIcon?.();
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
    const currentDateTime = new Date()
      .toISOString()
      .replace(/[^\w]/g, "")
      .slice(0, 15);
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
    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("touchend", handleGlobalTouchEnd);

    // Clean up
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, []);

  useEffect(() => {
    if (predefinedActiveIndexes) {
      setCurrentActiveIndexes(predefinedActiveIndexes);
    }
  }, [predefinedActiveIndexes]);

  const getRawData = () => Array.from(currentActiveIndexes).join(", ");

  const togglePencil = () => setIsEraserActive(false);
  const toggleEraser = () => setIsEraserActive(true);

  // SVG reference for touch events
  const svgRef = React.useRef<SVGSVGElement>(null);

  return (
    <>
      <group
        data-border=""
        data-width="auto"
        data-radius="40"
        data-contain=""
        data-elevation="2"
        data-index="2"
      >
        <group
          data-direction="column"
          data-space="20"
          data-gap="20"
          data-align="center"
        >
          <group
            data-gap="10"
            data-align="center"
            data-radius="20"
            data-wrap="no"
          >
            <Ripple>
              <group
                data-space="15"
                data-space-horizontal="20"
                data-align="center"
                data-justify="center"
                data-background="adaptive-gray"
                data-width="auto"
                data-interactive=""
                data-over-color="neutral"
                data-radius="15"
                data-cursor="pointer"
                onClick={handleClear}
                data-contain=""
              >
                <text>New Icon</text>
              </group>
            </Ripple>



            <group
           //   data-align="center"
              data-gap="15"
              //  data-space="15"
              data-wrap="no"
              data-width="auto"
              data-contain=""
              data-space="15"
              
              data-radius="15"
              data-background="adaptive-gray"
              onClick={toggleoverlay}
              data-interactive=""
              data-over-color="neutral"
              data-cursor="pointer"
            >
                <group data-width="auto">
                  <text data-ellipsis="" data-opacity="40">
                    Guides
                  </text>
                </group>
            <separator data-vertical="" data-height="autofit"></separator>
              <group
                data-align="center"
                data-justify="center"
                // data-background="text"
                // data-color="main-background"
                data-width="auto"
                data-weight="600"
                data-contain=""
              >
                <text data-ellipsis="">{isshowoverlay ? "Hide" : "Show"}</text>
              </group>
            </group>
          </group>

          <group data-space="30" data-width="auto" data-justify="center">
            <group
              data-disabled="true"
              data-position="absolute"
              data-ratio="1:1"
              data-width="auto"
              data-height="fit"
              data-top="0"
              data-opacity={isshowoverlay ? "20" : "0"}
            >
              <group
                data-position="absolute"
                data-height="fit"
                data-wrap="no"
                data-top="0"
                data-justify="space-evenly"
                data-align="space"
              >
                <group
                  data-length="1"
                  data-height="fit"
                  data-background="text"
                ></group>
                <group
                  data-length="1"
                  data-height="fit"
                  data-background="text"
                ></group>
                <group
                  data-length="1"
                  data-height="fit"
                  data-background="text"
                ></group>
              </group>

              <group
                data-top="0"
                data-position="absolute"
                data-justify="space-evenly"
                data-height="fit"
                data-wrap="no"
                data-direction="column"
              >
                <group
                  data-height="1"
                  data-length="fit"
                  data-background="text"
                ></group>

                <group
                  data-height="1"
                  data-length="fit"
                  data-background="text"
                ></group>

                <group
                  data-height="1"
                  data-length="fit"
                  data-background="text"
                ></group>
              </group>

              <group
                data-top="0"
                data-position="absolute"
                data-height="fit"
                data-wrap="no"
                data-direction="column"
              >
                {" "}
                <group data-radius="full" data-border="text" data-height="fit">
                  {" "}
                </group>{" "}
              </group>
              <group
                data-top="0"
                data-position="absolute"
                data-height="fit"
                data-wrap="no"
                data-direction="column"
                data-space="25%"
              >
                {" "}
                <group data-radius="full" data-border="text" data-height="fit">
                  {" "}
                </group>{" "}
              </group>
            </group>

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

          <group
            data-gap="10"
            data-align="center"
            data-radius="20"
            data-wrap="no"
          >
            {/* <separator data-vertical="" data-height="20"></separator> */}

            <group
              data-width="auto"
              data-background="text"
              data-color="main-background"
              data-radius="30"
              data-wrap="no"
              data-space="2"
            >
              <group
                data-space-vertical="15"
                data-align="center"
                data-justify="center"
                data-background={!isEraserActive ? "main-background" : ""}
                data-color={!isEraserActive ? "text" : ""}
                data-space-horizontal={!isEraserActive ? "25" : "15"}
                data-duration=".225"
                data-transition-prop="padding"
                data-sp
                data-width="auto"
                data-interactive=""
                data-over-color="neutral"
                data-radius="30"
                data-cursor="pointer"
                onClick={togglePencil}
              >
                <group data-interact="">
                  <Pencil size={20} />
                </group>
              </group>

              <group
                data-space-vertical="15"
                data-align="center"
                data-justify="center"
                data-background={isEraserActive ? "main-background" : ""}
                data-color={isEraserActive ? "text" : ""}
                data-space-horizontal={isEraserActive ? "25" : "15"}
                data-duration=".225"
                data-transition-prop="padding"
                data-width="auto"
                data-interactive=""
                data-over-color="neutral"
                data-radius="30"
                data-cursor="pointer"
                onClick={toggleEraser}
              >
                <group data-interact="">
                  <Eraser size={20} />
                </group>
              </group>
            </group>

            <Popover
              data-space="5"
              data-radius="20"
              content={(closePopover) => (
                <group
                  data-direction="column"
                  data-length="240"
                  onClick={closePopover}
                >
                  {/* <group
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
                  </group> */}

                  <group
                    onClick={exportSVG}
                    data-animation-name="appear-bottom"
                    data-fill-mode="backwards"
                    data-animation-duration="2.75"
                    data-name="autoseparation"
                  >
                    <group
                      data-space="15"
                      data-align="center"
                      data-gap="15"
                      data-interactive=""
                      data-radius="15"
                      data-cursor="pointer"
                    >
                      <group data-direction="column" data-width="auto">
                        <text data-weight="700">Download</text>
                        <text data-opacity="30">Save icon for later</text>
                      </group>
                    </group>
                  </group>
                  <group
                    onClick={copySVGToClipboard}
                    data-animation-name="appear-bottom"
                    data-fill-mode="backwards"
                    data-animation-duration="3.25"
                    data-name="autoseparation"
                  >
                    <separator
                      data-horizontal=""
                      data-margin-horizontal="10"
                      data-opacity="5"
                    ></separator>
                    <group
                      data-space="15"
                      data-align="center"
                      data-gap="15"
                      data-interactive=""
                      data-radius="15"
                      data-cursor="pointer"
                    >
                      <group data-direction="column" data-width="auto">
                        <text data-weight="700">Copy</text>
                        <text data-opacity="30">
                          Paste in Figma or code ...
                        </text>
                      </group>
                    </group>
                  </group>

                  <group
                    onClick={copyRawData}
                    data-animation-name="appear-bottom"
                    data-fill-mode="backwards"
                    data-animation-duration="3.75"
                    data-name="autoseparation"
                  >
                    <separator
                      data-horizontal=""
                      data-margin-horizontal="10"
                      data-opacity="5"
                    ></separator>
                    <group
                      data-space="15"
                      data-align="center"
                      data-gap="15"
                      data-interactive=""
                      data-radius="15"
                      data-cursor="pointer"
                    >
                      <group data-direction="column" data-width="auto">
                        <text data-weight="700">Matrix</text>
                        <text data-opacity="30">Grab Raw Data</text>
                      </group>
                    </group>
                  </group>
                </group>
              )}
            >
              <group
                data-space-vertical="15"
                data-space-horizontal="20"
                data-align="center"
                data-justify="center"
                data-background="adaptive-gray"
                data-color="adaptive-gray"
                data-width="auto"
                data-interactive=""
                data-over-color="neutral"
                data-radius="15"
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
        data-radius="40"
        data-space="30"
        data-background="text"
        data-color="main-background"
        //  data-align="center"
        data-direction="column"
        data-justify="center"
        //  data-gap="20"
        //  data-max-height="fit-content"
      >
        <group data-direction="column" data-gap="5">
          <text
            data-weight="700"
            data-wrap="preline"
            data-text-size="large"
            data-ellipsis=""
            data-font-type="hero"
            data-line="1"
          >
            Preview
          </text>
          <text data-opacity="30" data-max-length="160" data-wrap="wrap">
            Your edits and icons update here live.
          </text>
        </group>
        <group data-position="center" data-justify="center" data-space="30">
          <DotDisplay size={130} activeIndexes={currentActiveIndexes} />
        </group>
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
