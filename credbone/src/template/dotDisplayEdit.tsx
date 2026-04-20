import { ArrowDown, Copy, Eraser, Grid3x3, Pencil } from "lucide-react";
import React, { useState, useEffect } from "react";
import Popover from "../components/popover";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import DotDisplay from "./dotDisplay";
import Ripple from "../components/Ripple";

import { IconMoreHoriz } from "../components/icon/credIcons";
import { useModal } from "../components/Modal";

// Cursor size definitions
// small = r:2, suffix ".2" | default = r:4, no suffix | large = r:6, suffix ".3"
type CursorSize = "small" | "default" | "large";

const CURSOR_SIZE_CONFIG: Record<
  CursorSize,
  { r: number; suffix: string | null; label: string; dotSize: number }
> = {
  small: { r: 2, suffix: ".2", label: "S", dotSize: 2 },
  default: { r: 4, suffix: null, label: "M", dotSize: 4 },
  large: { r: 6, suffix: ".3", label: "L", dotSize: 6 },
};

// Encoded dot: index (default) or "index.2" / "index.3" (sized)
type EncodedDot = { index: number; size: CursorSize };

const encodeDot = (dot: EncodedDot): string => {
  const suffix = CURSOR_SIZE_CONFIG[dot.size].suffix;
  return suffix ? `${dot.index}${suffix}` : `${dot.index}`;
};

const decodeDot = (raw: string): EncodedDot => {
  if (raw.includes(".2")) return { index: parseInt(raw), size: "small" };
  if (raw.includes(".3")) return { index: parseInt(raw), size: "large" };
  return { index: parseInt(raw), size: "default" };
};

const DotDisplayEdit: React.FC<{
  predefinedActiveIndexes?: Set<number>;
  // Pass the raw encoded string (e.g. "115.2, 131.2, 102.3, 71") to preserve sizes on load
  predefinedEncodedDots?: string;
  onNewIcon?: () => void;
  onStartEdit?: () => void;
}> = ({
  predefinedActiveIndexes,
  predefinedEncodedDots,
  onNewIcon,
  onStartEdit,
}) => {
  // Map of index -> EncodedDot (stores size per dot)
  const [activeDots, setActiveDots] = useState<Map<number, EncodedDot>>(() => {
    // Encoded string takes priority — preserves size suffixes
    if (predefinedEncodedDots) {
      const dots = predefinedEncodedDots
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map(decodeDot);
      return new Map(dots.map((d) => [d.index, d]));
    }
    // Fallback: plain Set<number>, all default size
    if (predefinedActiveIndexes) {
      return new Map(
        Array.from(predefinedActiveIndexes).map((i) => [
          i,
          { index: i, size: "default" as CursorSize },
        ]),
      );
    }
    return new Map();
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [cursorSize, setCursorSize] = useState<CursorSize>("default");

  const rows = 16;
  const cols = 16;

  const currentActiveIndexes = new Set(activeDots.keys());

  const paintDot = (
    index: number,
    dots: Map<number, EncodedDot>,
    size: CursorSize,
  ): Map<number, EncodedDot> => {
    const next = new Map(dots);
    next.set(index, { index, size });
    return next;
  };

  const eraseDot = (
    index: number,
    dots: Map<number, EncodedDot>,
  ): Map<number, EncodedDot> => {
    const next = new Map(dots);
    next.delete(index);
    return next;
  };

  const handleCircleClick = (index: number) => {
    onStartEdit?.();
    setActiveDots((prev) => {
      if (isEraserActive) return eraseDot(index, prev);
      // Toggle: if dot exists at same size, remove it; otherwise paint
      const existing = prev.get(index);
      if (existing && existing.size === cursorSize) {
        return eraseDot(index, prev);
      }
      return paintDot(index, prev, cursorSize);
    });
  };

  const [isshowoverlay, setshowoverlay] = useState(true);
  const toggleoverlay = () => setshowoverlay((prev) => !prev);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
    setIsMouseDown(true);
  const handleMouseUp = () => setIsMouseDown(false);

  const handleMouseMove = (index: number) => {
    if (!isMouseDown) return;
    onStartEdit?.();
    setActiveDots((prev) => {
      if (isEraserActive) return eraseDot(index, prev);
      return paintDot(index, prev, cursorSize);
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => setIsTouchActive(true);
  const handleTouchEnd = (e: React.TouchEvent) => setIsTouchActive(false);

  const handleTouchMove = (e: React.TouchEvent, svgElement: SVGSVGElement) => {
    onStartEdit?.();
    if (!isTouchActive || !svgElement) return;

    const touch = e.touches[0];
    const svgRect = svgElement.getBoundingClientRect();
    const x = touch.clientX - svgRect.left;
    const y = touch.clientY - svgRect.top;

    const col = Math.floor(x / (svgRect.width / cols));
    const row = Math.floor(y / (svgRect.height / rows));

    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      const index = row * cols + col;
      setActiveDots((prev) => {
        if (isEraserActive) return eraseDot(index, prev);
        return paintDot(index, prev, cursorSize);
      });
    }
  };

  const handleClear = () => {
    setActiveDots(new Map());
    setIsEraserActive(false);
    onNewIcon?.();
  };

  const { addSnackbar } = useSnackbar();

  const getRawData = () =>
    Array.from(activeDots.values()).map(encodeDot).join(", ");

  const copyRawData = async () => {
    try {
      await navigator.clipboard.writeText(getRawData());
      addSnackbar("Raw data copied to clipboard", 1000);
    } catch {
      addSnackbar("Failed to copy raw data", 1000);
    }
  };

  const buildSVGContent = () => `
    <svg width="160" height="160" viewBox="0 0 160 160" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
      ${Array.from(activeDots.values())
        .map((dot) => {
          const x = (dot.index % cols) * 10 + 5;
          const y = Math.floor(dot.index / cols) * 10 + 5;
          const r = CURSOR_SIZE_CONFIG[dot.size].r;
          return `<circle cx="${x}" cy="${y}" r="${r}"/>`;
        })
        .join("\n")}
    </svg>
  `;

  const exportSVG = () => {
    const currentDateTime = new Date()
      .toISOString()
      .replace(/[^\w]/g, "")
      .slice(0, 15);
    const blob = new Blob([buildSVGContent()], { type: "image/svg+xml" });
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
    try {
      await navigator.clipboard.writeText(buildSVGContent());
      addSnackbar("SVG copied to clipboard", 1000);
    } catch {
      addSnackbar("Failed to copy", 1000);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsMouseDown(false);
    const handleGlobalTouchEnd = () => setIsTouchActive(false);
    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("touchend", handleGlobalTouchEnd);
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, []);

  useEffect(() => {
    // Encoded string takes priority — preserves size suffixes
    if (predefinedEncodedDots) {
      const dots = predefinedEncodedDots
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map(decodeDot);
      setActiveDots(new Map(dots.map((d) => [d.index, d])));
    } else if (predefinedActiveIndexes) {
      setActiveDots(
        new Map(
          Array.from(predefinedActiveIndexes).map((i) => [
            i,
            { index: i, size: "default" as CursorSize },
          ]),
        ),
      );
    }
  }, [predefinedActiveIndexes, predefinedEncodedDots]);

  const togglePencil = () => setIsEraserActive(false);
  const toggleEraser = () => setIsEraserActive(true);

  const svgRef = React.useRef<SVGSVGElement>(null);

  const [isInverted, setIsInverted] = useState(true);

  const toggleInvert = () => {
    setIsInverted((prev) => !prev);
  };

  const { openModal, closeModal } = useModal(); // Use the modal hook to control modal behavior
  const [importValue, setImportValue] = useState("");

  const handleImport = (): boolean => {
    const textarea = document.getElementById(
      "import-textarea",
    ) as HTMLTextAreaElement;
    const raw = textarea?.value.trim();
    if (!raw) {
      addSnackbar("Nothing to import", 1000);
      return false;
    }
    const dots = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map(decodeDot)
      .filter((d) => !isNaN(d.index) && d.index >= 0 && d.index <= 255);
    if (!dots.length) {
      addSnackbar("No valid dots found", 1000);
      return false;
    }
    setActiveDots(new Map(dots.map((d) => [d.index, d])));
    onStartEdit?.();

    const dotsMap = new Map(dots.map((d) => [d.index, d]));
    setActiveDots(dotsMap);
    addSnackbar(
      `${dotsMap.size} dot${dotsMap.size === 1 ? "" : "s"} imported`,
      1000,
    );

    return true;
  };

  const ImportContent = (
    <group
      data-direction="column"
      data-align="start"
      data-scroll=""
      data-wrap="no"
      data-margin="auto"
      data-length="300"
      data-max-height="fit"
    >
      <group
        data-direction="column"
        data-align="start"
        // data-width="auto"
        data-margin="auto"
        data-scroll=""
        data-scrollbar="none"
        data-max-height="fit"
        data-wrap="no"
      >
        <label data-type="group" data-direction="column" data-wrap="no">
          <group data-gap="10" data-space="30">
            <group>
              <text
                data-weight="700"
                data-wrap="preline"
                data-text-size="medium"
                data-ellipsis=""
                data-font-type="hero"
                data-line="1"
              >
                Import Raw Data
              </text>
            </group>
            <text data-wrap="wrap" data-max-length="200" data-opacity="40">
              Paste your previously copied matrix data
            </text>
          </group>
          <group data-space-horizontal="30">
            <separator data-horizontal="dotted" data-opacity="20"></separator>
          </group>
          <group data-direction="column" data-align="start">
            <textarea
              autoFocus
              data-name="input-reset"
              data-space="30"
              data-length="fit"
              data-height="content"
              data-min-height="200"
              maxLength={2048}
              id="import-textarea"
              rows={8}
              placeholder="115.2, 131, 102.3 ..."
            />
          </group>
        </label>

        <group
          data-shrink="no"
          data-position="sticky"
          data-bottom="0"
          data-index="3"
          data-direction="column"
        >
          {/* <group data-space-horizontal="10">
            <separator data-horizontal="" data-opacity="5"></separator>
          </group> */}
          <group
            data-position="absolute"
            data-background="context-bottom"
            data-pointer-event="none"
            data-top="-100%"
            data-height="fit"
          ></group>
          <group data-space="10" data-gap="5" data-background="context">
            <Ripple>
              <group
                data-ink-color="neutral"
                data-contain=""
                data-align="center"
                data-justify="center"
                data-interactive=""
                data-space="15"
                data-radius="15"
                data-cursor="pointer"
                data-over-color="neutral"
                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                data-animation-duration="2.25"
                onClick={() => {
                  setImportValue("");
                  closeModal("modal-import");
                }}
              >
                <text data-ellipsis="">Cancel</text>
              </group>
            </Ripple>
            <Ripple>
              <group
                data-ink-color="neutral"
                data-contain=""
                data-align="center"
                data-justify="center"
                data-interactive=""
                data-space="15"
                data-radius="15"
                data-cursor="pointer"
                data-background="adaptive-gray"
                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                data-animation-duration="2.75"
                onClick={() => {
                  handleImport();
                  closeModal("modal-import");
                }}
              >
                <text data-ellipsis="">Apply</text>
              </group>
            </Ripple>
          </group>
        </group>
      </group>
    </group>
  );

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
            //  data-radius="20"
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
                <text>New</text>
              </group>
            </Ripple>

            <Popover
            bottomsheet
          
              open={isExportOpen}
              onOpenChange={setIsExportOpen}
              placement="bottom"
              data-space="5"
              data-radius="20"
              content={(closePopover, isBottomSheet) => (
                <group
                  data-direction="column"
                  data-length={isBottomSheet ? undefined : "240"}
                  onClick={closePopover}
                  data-contain=""
                >
                  <group
                    onClick={exportSVG}
                    data-animation-name="appear-top"
                    data-fill-mode="backwards"
                    data-animation-duration="2.75"
                    data-name="autoseparation"
                  >
                    <group
                       data-space={isBottomSheet ? "20" : "15"}
                      data-align="center"
                      data-gap="15"
                      data-interactive=""
                      data-radius="15"
                      data-cursor="pointer"
                      data-wrap="no"
                    >
                      <group
                        data-length="20"
                        data-opacity="30"
                        data-interact=""
                      >
                        <ArrowDown strokeWidth={1.5} size={20} />
                      </group>
                      <group data-direction="column" data-width="auto">
                        <text data-weight="700">Download</text>
                        <text data-opacity="30">Save icon for later</text>
                      </group>
                    </group>
                  </group>

                  <group
                    onClick={copySVGToClipboard}
                    data-animation-name="appear-top"
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
                       data-space={isBottomSheet ? "20" : "15"}
                      data-align="center"
                      data-gap="15"
                      data-interactive=""
                      data-radius="15"
                      data-cursor="pointer"
                       data-wrap="no"
                    >
                      <group
                        data-length="20"
                        data-opacity="30"
                        data-interact=""
                      >
                        <Copy strokeWidth={1.5} size={20} />
                      </group>
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
                    data-animation-name="appear-top"
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
                      data-space={isBottomSheet ? "20" : "15"}
                      data-align="center"
                      data-gap="15"
                      data-interactive=""
                      data-radius="15"
                      data-cursor="pointer"
                       data-wrap="no"
                    >
                                            <group
                        data-length="20"

                      >
                        
                      </group>
                      <group data-direction="column" data-width="auto">
                        <text data-weight="700">Matrix</text>
                        <text data-opacity="30">Grab Raw Data</text>
                      </group>
                    </group>
                  </group>
                </group>
              )}
            >
              <group data-width="auto">
                <Ripple>
                  <group
                    data-contain=""
                    data-space-vertical="15"
                    data-space-horizontal="20"
                    data-align="center"
                    data-justify="center"
                    data-background="adaptive-gray"
                    data-color="adaptive-gray"
                    //  data-width="auto"
                    data-interactive=""
                    data-over-color="neutral"
                    data-radius="15"
                    data-cursor="pointer"
                  >
                    <text>Export Icon</text>
                  </group>
                </Ripple>
              </group>
            </Popover>

            <Popover
             bottomsheet
              dim={false}
              open={isMenuOpen}
              onOpenChange={setIsMenuOpen}
              placement="bottom"
              data-radius="20"
              data-space="5"
              content={(closePopover, isBottomSheet) => (
                <group data-length={isBottomSheet ? undefined: "200"}>
                  <Ripple>
                    <group
                     
                      data-wrap="no"
                      data-contain=""
                       data-space={isBottomSheet ? "20" : "15"}
                      data-radius="15"
                      //    data-background="adaptive-gray"
                      onClick={toggleoverlay}
                      data-interactive=""
                      data-over-color="neutral"
                      data-cursor="pointer"
                      data-align='center'
                      data-name="autoseparation"
                    >


<group  data-wrap="no"  data-gap="15"  data-align='center'>
                        <group
                        data-length="20"
                        data-opacity="30"
                        data-interact=""
                      >
                        <Grid3x3 strokeWidth={1.5} size={20} />
                      </group>

                      <group>
                        <text data-ellipsis="" data-opacity="40">
                          Guides
                        </text>
                      </group>
                      <separator data-vertical="" data-height="fit"></separator>
                      <group
                        data-align="center"
                        data-justify="center"
                        data-width="auto"
                      >
                        <text
                          data-ellipsis=""
                          data-transition-prop="font-size"
                          data-duration="2"
                          data-text-size={isshowoverlay ? "" : "0"}
                        >
                          Hide
                        </text>
                        <text
                          data-ellipsis=""
                          data-transition-prop="font-size"
                          data-duration="2"
                          data-text-size={!isshowoverlay ? "" : "0"}
                        >
                          Show
                        </text>
                      </group>
</group>
                    </group>
                  </Ripple>

                  <Ripple>
                    <group
                   
                      data-direction="column"
                      data-contain=""
                     
                      data-radius="15"
                      data-interactive=""
                      data-over-color="neutral"
                      data-cursor="pointer"
                      data-align="center"
                      data-name="autoseparation"
                      onClick={() => {
                        setIsMenuOpen(false);
                        openModal({
                          id: "modal-import",
                          title: "Import Raw Data",
                          content: ImportContent,
                          hasHeader: false,
                          hasToolbar: false,

                          customAttributes: {
                            "data-radius": "25",
                            "data-animation-name": "appear-bottom",
                            "data-animation-duration": "1.75",
                            "data-fill-mode": "backwards",
                            "data-max-height": "fit",
                          },
                        });
                      }}
                    >
                        <separator data-horizontal=""                      
                      data-opacity="5"></separator>
<group data-wrap="no"   data-space={isBottomSheet ? "20" : "15"} data-gap="15"  data-align='center'>
  


                      <group
                        data-length="20"
                        data-opacity="30"
                        data-interact=""
                      >
                        <ArrowDown strokeWidth={1.5} size={20} />
                      </group>
                      
                      <group>
                        <text data-ellipsis="">Import</text>
                      </group>
</group>
                    </group>
                  </Ripple>
                </group>
              )}
            >
              <group data-width="auto" data-position="right">
                <Ripple>
                  <group
                    data-contain=""
                    data-width="auto"
                    data-interactive=""
                    data-over-color="neutral"
                    data-radius="15"
                    data-space="10"
                    data-cursor="pointer"
                  >
                    <group>
                      <IconMoreHoriz />
                    </group>
                  </group>
                </Ripple>
              </group>
            </Popover>
          </group>

          <group
            data-space="30"
            data-width="auto"
            data-justify="center"
            data-animation-name="appear-bottom"
            data-fill-mode="backwards"
            data-animation-duration="2.25"
          >
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
                <group
                  data-radius="full"
                  data-border="text"
                  data-height="fit"
                ></group>
              </group>
              <group
                data-top="0"
                data-position="absolute"
                data-height="fit"
                data-wrap="no"
                data-direction="column"
                data-space="25%"
              >
                <group
                  data-radius="full"
                  data-border="text"
                  data-height="fit"
                ></group>
              </group>
            </group>

            <svg
              ref={svgRef}
              width="256"
              viewBox="0 0 160 160"
              onMouseDown={(e) => {
                setIsMenuOpen(false);
                setIsExportOpen(false);
                handleMouseDown(e);
              }}
              onMouseUp={handleMouseUp}
              onTouchStart={(e) => {
                setIsMenuOpen(false);
                setIsExportOpen(false);
                handleTouchStart(e);
              }}
              onTouchEnd={handleTouchEnd}
              onTouchMove={(e) => handleTouchMove(e, svgRef.current!)}
              style={{ touchAction: "none" }}
            >
              {Array.from({ length: rows * cols }).map((_, index) => {
                const x = (index % cols) * 10 + 5;
                const y = Math.floor(index / cols) * 10 + 5;
                const dot = activeDots.get(index);

                return (
                  <Dot
                    key={index}
                    x={x}
                    y={y}
                    active={!!dot}
                    r={dot ? CURSOR_SIZE_CONFIG[dot.size].r : 4}
                    onClick={() => handleCircleClick(index)}
                    onMouseMove={() => handleMouseMove(index)}
                  />
                );
              })}
            </svg>
          </group>

          {/* Tool controls row: pencil/eraser + cursor size selector */}
          <group
            //data-gap="10"
            data-align="end"
            // data-radius="20"
            data-wrap="no"
          >
            {/* Pencil / Eraser pill */}
            <group
              data-width="auto"
              data-background="text"
              data-color="main-background"
              data-radius="30"
              data-wrap="no"
              data-space="2"
              data-contain=""
              data-animation-name="appear-bottom"
              data-fill-mode="backwards"
              data-animation-duration="2"
            >
              <group
                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                data-animation-duration="3.5"
                data-space-vertical="15"
                data-align="center"
                data-justify="center"
                data-background={!isEraserActive ? "main-background" : ""}
                data-color={!isEraserActive ? "text" : ""}
                data-space-horizontal={!isEraserActive ? "25" : "15"}
                data-duration=".225"
                data-transition-prop="padding"
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
                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                data-animation-duration="3.25"
                data-space-vertical="10"
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

            {/* Cursor size selector pill — S / M / L */}

            <group data-width="auto" data-position="right" data-wrap="no">
              <group data-align="center" data-wrap="no">
                {(["small", "default", "large"] as CursorSize[]).map(
                  (size, index) => {
                    const cfg = CURSOR_SIZE_CONFIG[size];
                    const isActive = cursorSize === size;
                    return (
                      <group
                        data-animation-name="appear-bottom"
                        data-fill-mode="backwards"
                        data-animation-duration={4 - index * 0.5}
                        key={size}
                        data-space="10"
                        data-align="center"
                        data-justify="center"
                        data-gap="6"
                        data-border={isActive ? "" : "none"}
                        //  data-background={isActive ? "context" : ""}
                        // data-color={isActive ? "text" : ""}
                        data-duration=".225"
                        data-transition-prop="padding"
                        data-width="auto"
                        data-interactive=""
                        data-over-color="neutral"
                        data-radius="30"
                        data-cursor="pointer"
                        data-wrap="no"
                        onClick={() => {
                          setCursorSize(size);
                          setIsEraserActive(false);
                        }}
                      >
                        <group data-interact="">
                          <svg width="20" height="20" viewBox={`0 0 16 16`}>
                            <circle
                              cx="8"
                              cy="8"
                              r={cfg.r}
                              fill="currentcolor"
                            />
                          </svg>
                        </group>
                      </group>
                    );
                  },
                )}
              </group>
            </group>
          </group>
        </group>
      </group>

      <group
        data-width="auto"
        data-radius="40"
        data-border=""
        data-background={isInverted ? "text" : "context"}
        data-color={isInverted ? "main-background" : "text"}
        data-direction="column"
        data-justify="center"
        data-wrap="no"
      >
        <group
          data-direction="column"
          data-space="30"
          data-gap="30"
          data-height="fit"
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
            <DotDisplay size={130} activeDots={activeDots} />
          </group>
        </group>
        <group data-space-horizontal="20">
          <separator data-horizontal="dotted" data-opacity="20"></separator>
        </group>

        <group data-space="20">
          <Ripple>
            <group
              data-ink-color="neutral"
              data-contain=""
              data-space-vertical="15"
              data-space-horizontal="20"
              data-align="center"
              data-justify="center"
              data-background="adaptive-gray"
              // data-border="outline"

              data-interactive=""
              data-over-color="neutral"
              data-radius="30"
              data-cursor="pointer"
              onClick={toggleInvert}
            >
              <text>Invert Colors</text>
            </group>
          </Ripple>
        </group>
      </group>
    </>
  );
};

const Dot: React.FC<{
  x: number;
  y: number;
  active: boolean;
  r: number;
  onClick: () => void;
  onMouseMove: () => void;
}> = ({ x, y, active, r, onClick, onMouseMove }) => {
  const rectX = x - 5;
  const rectY = y - 5;

  return (
    <g>
      <rect
        // strokeWidth={1}
        // stroke="red"
        x={rectX}
        y={rectY}
        width="10"
        height="10"
        fill="transparent"
        onClick={onClick}
        onMouseMove={onMouseMove}
      />
      <circle
        opacity={active ? "1" : ".1"}
        cx={x}
        cy={y}
        r={active ? r : "4"}
        fill="currentcolor"
        pointerEvents="none"
      />
    </g>
  );
};

export default DotDisplayEdit;
