import React, { useState, useRef, useEffect, useCallback } from "react";
import Tooltip from "../components/tooltip";
import Popover from "../components/popover";
import Scroll from "../components/scroll";

const colors = [
  { name: "Coral Sunset", value: "#F5745E" }, // Warm coral
  { name: "Sunset Orange", value: "#EF7843" }, // Bright sunset orange
  { name: "Warm Apricot", value: "#F39555" }, // Soft apricot
  { name: "Golden Sand", value: "#F2CA89" }, // Light golden yellow
  { name: "Lemon Chiffon", value: "#EBC368" }, // Soft lemon yellow
  { name: "Mossy Green", value: "#CBC24B" }, // Earthy moss green
  { name: "Olive Drab", value: "#AFB247" }, // Muted olive green
  { name: "Slate Gray", value: "#717896" }, // Cool slate gray
  { name: "Dusty Blue", value: "#7F959F" }, // Soft dusty blue
  { name: "Aqua Teal", value: "#8DAFB2" }, // Gentle aqua teal
  { name: "Seafoam Green", value: "#9DC3BE" }, // Light seafoam
  { name: "Cool Breeze", value: "#84CEC0" }, // Refreshing cool teal
];

const brushSizes = [
  { name: "Thin Line", value: 2 },
  { name: "Fine Brush", value: 4 },
  { name: "Regular Size", value: 8 },
  { name: "Wide Brush", value: 12 },
];

const SimplePaint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#F5745E");
  const [brushSize, setBrushSize] = useState(4);

  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [isResizing, setIsResizing] = useState(false);

  const startResize = () => setIsResizing(true);
  const stopResize = () => setIsResizing(false);

  const handleResize = useCallback(
    (e: PointerEvent | TouchEvent) => {
      if (!isResizing || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      let clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      let newWidth = Math.max(40, Math.round(clientX - rect.left));
      let newHeight = Math.max(40, Math.round(clientY - rect.top));

      setWidth(newWidth);
      setHeight(newHeight);
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("pointermove", handleResize);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("touchmove", handleResize, { passive: false });
    window.addEventListener("touchend", stopResize);

    return () => {
      window.removeEventListener("pointermove", handleResize);
      window.removeEventListener("pointerup", stopResize);
      window.removeEventListener("touchmove", handleResize);
      window.removeEventListener("touchend", stopResize);
    };
  }, [handleResize]);

  // useEffect(() => {
  //   window.addEventListener("pointermove", handleResize);
  //   window.addEventListener("pointerup", stopResize);

  //   return () => {
  //     window.removeEventListener("pointermove", handleResize);
  //     window.removeEventListener("pointerup", stopResize);
  //   };
  // }, [handleResize]);

  useEffect(() => {
    if (appRef.current) {
      const containerWidth = appRef.current.offsetWidth;
      setWidth(containerWidth - 60); // Set the canvas width to the container's width
    }
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      const containerHeight = wrapperRef.current.offsetHeight;

      setHeight(containerHeight - 60);
    }
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    if ("touches" in e) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    } else {
      return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    }
  };

  const drawDot = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = brushColor;
    context.beginPath();
    context.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    context.fill();
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getCoordinates(e);
    drawDot(x, y); // Draw dot when clicking or tapping
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.beginPath(); // Start a new path
    context.moveTo(x, y); // Move to the initial dot position
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const { x, y } = getCoordinates(e);

    // Ensure brush size and color are applied
    context.strokeStyle = brushColor;
    context.lineWidth = brushSize;
    context.lineCap = "round";
    //context.lineJoin = 'round';

    context.lineTo(x, y); // Draw line to new position
    context.stroke(); // Render the stroke
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <group
      data-direction="column"
      data-wrap="no"
      ref={appRef}
      data-max-height="fit"
      data-height="fit"
      data-contain=""
    >
      <group
        //  data-space="10"
        // data-gap="10"
        data-border="overprint"
        data-index="2"
      >
        <group data-snap-button="15">
          <Scroll>
            <group data-wrap="no" data-space="10">
              {colors.map((color, index) => (
                <group key={index} data-ratio="1:1" data-length="40">
                  <Tooltip content={color.name}>
                    <group
                      data-animation-name="appear-left"
                      data-fill-mode="backwards"
                      data-animation-duration={2 + index * 0.25}
                      data-radius="10"
                      data-align="center"
                      data-justify="center"
                      data-direction="column"
                      data-cursor="pointer"
                      data-interactive=""
                      data-background={
                        brushColor === color.value ? "highlight" : ""
                      }
                      data-space="10"
                      onClick={() => setBrushColor(color.value)}
                    >
                      <group
                        data-interact=""
                        data-radius="30"
                        data-height="fit"
                        style={{
                          backgroundColor: color.value,
                        }}
                      ></group>
                    </group>
                  </Tooltip>
                </group>
              ))}
            </group>
          </Scroll>
        </group>
        <separator data-horizontal=""></separator>
        <group data-contain="" data-gap="10" data-space="10" data-shrink="no">
          <group data-gap="5">
            <group data-gap="5" data-width="auto" data-align="center">
              <group
                onClick={clearCanvas}
                data-cursor="pointer"
                data-radius="10"
                data-width="auto"
                data-background="highlight"
                data-contain=""
                data-interactive=""
                data-space="15"
                data-wrap="no"
                data-align="center"
                data-gap="15"
              >
                <text data-weight="700" data-length="autofit">
                  New
                </text>
              </group>

              <Popover
                data-space="5"
                content={(closePopover) => (
                  <group data-direction="column" onClick={closePopover}>
                    {brushSizes.map((size, index) => (
                      <group
                        data-radius="5"
                        data-cursor="pointer"
                        data-interactive=""
                        data-space="15"
                        data-background={brushSize === size.value ? "main" : ""}
                        data-color={brushSize === size.value ? "main-text" : ""}
                        key={index}
                        data-length="180"
                        data-align="center"
                        onClick={() => setBrushSize(size.value)}
                        //  data-wrap="no"
                        data-gap="5"
                        data-animation-name="appear-bottom"
                        data-fill-mode="backwards"
                        data-animation-duration={2 + index * 0.25}
                      >
                        <text data-opacity="30">{size.name}</text>

                        <group
                          //    data-opacity={brushSize === size.value ? "100" : "10"}
                          data-interact=""
                          data-radius=""
                          data-height={size.value}
                          // data-length={size.value}
                          data-background={
                            brushSize === size.value ? "main-text" : "text"
                          }
                        ></group>
                      </group>
                    ))}
                  </group>
                )}
              >
                <group
                  data-cursor="pointer"
                  data-radius="10"
                  data-width="auto"
                  // data-background="highlight"
                  data-border="outline"
                  data-contain=""
                  data-interactive=""
                  data-space="15"
                  data-wrap="no"
                  data-align="center"
                  data-gap="15"
                >
                  <text>Brush Size</text>

                  <group
                    data-length="20"
                    data-align="center"
                    data-direction="column"
                    data-interact=""
                  >
                    <group
                      data-top="0"
                      data-bottom="0"
                      data-margin="auto"
                      data-duration=".225"
                      data-position="absolute"
                      data-radius="20"
                      data-height={brushSize}
                      data-length={brushSize}
                      data-background="text"
                    ></group>
                  </group>
                </group>
              </Popover>
            </group>
          </group>
        </group>
      </group>

      <group
        data-scroll=""
        data-background="adaptive-gray"
        data-max-height="fit"
        data-height="fit"
        data-space="30"
        ref={wrapperRef}
      >
        <group
          data-border=""
          data-type="group"
          data-direction="column"
          data-align="start"
          data-max-length="auto"
          data-position="center"
          data-width="auto"
          data-background="white"
          ref={containerRef}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{
              cursor: "crosshair",
              touchAction: "none",
            }}
          />
          <group
            data-position="absolute"
            data-height="30"
            data-length="30"
            data-bottom="-30"
            data-right="-30"
            style={{
              cursor: "nwse-resize",
            }}
            onPointerDown={startResize}
          >
            <group
              data-height="5"
              data-length="5"
              data-background="text"
            ></group>
          </group>
        </group>
      </group>

      <group data-position="bottom">
        <group data-space-horizontal="30" data-background="adaptive-gray">
          <separator data-horizontal=""></separator>
          <group data-space-vertical="30" data-gap="5" data-width="auto">
            <text>{width}</text> <text>×</text> <text>{height}</text>
          </group>
        </group>
      </group>
    </group>
  );
};

export default SimplePaint;
