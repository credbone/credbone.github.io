import React, { useState, useRef, useEffect, useCallback } from "react";
import { SVG_TILES } from "./Tiles";

import Tooltip from "../../components/tooltip";
import { useSnackbar } from "../../components/snackbar/SnackbarContainer";
import Popover from "../../components/popover";
import { Plus } from "lucide-react";
import Ripple from "../../components/Ripple";

const PatternMaker: React.FC = () => {
  // Initialize from URL parameters or 3 random tiles
  const getInitialSelection = useCallback((): Set<string> => {
    const params = new URLSearchParams(window.location.search);
    const tilesParam = params.get('tiles');
    
    if (tilesParam) {
      const tileIds = tilesParam.split(',').filter(id => id.trim());
      // Validate that all tile IDs exist
      const validTileIds = tileIds.filter(id => 
        SVG_TILES.some(tile => tile.id === id)
      );
      
      if (validTileIds.length > 0) {
        return new Set(validTileIds);
      }
    }
    
    // Default to 3 random tiles if no valid parameters
    const randomTiles = [...SVG_TILES]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((tile) => tile.id);
    return new Set(randomTiles);
  }, []);

  const [selectedTiles, setSelectedTiles] = useState<Set<string>>(getInitialSelection);
  const svgRef = useRef<SVGSVGElement>(null);
  const [patternKey, setPatternKey] = useState(0);

  // Update URL whenever selection changes
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedTiles.size > 0) {
      const tileIds = Array.from(selectedTiles).sort().join(',');
      params.set('tiles', tileIds);
    }
    
    const newUrl = selectedTiles.size > 0 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    
    window.history.replaceState({}, '', newUrl);
  }, [selectedTiles]);

  const toggleTile = (tileId: string) => {
    const newSelected = new Set(selectedTiles);
    if (newSelected.has(tileId)) {
      newSelected.delete(tileId);
    } else {
      newSelected.add(tileId);
    }
    setSelectedTiles(newSelected);
    setPatternKey((prev) => prev + 1);
  };

  const selectRandomTiles = () => {
    const randomTiles = [...SVG_TILES]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((tile) => tile.id);
    setSelectedTiles(new Set(randomTiles));
    setPatternKey((prev) => prev + 1);
  };

  const getSelectedTiles = () => {
    return SVG_TILES.filter((tile) => selectedTiles.has(tile.id));
  };

  const resetSelection = () => {
    setSelectedTiles(new Set());
  };

  const { addSnackbar } = useSnackbar();

  const copySVGToClipboard = async () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current.cloneNode(true) as SVGSVGElement;
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgWithDeclaration = `<?xml version="1.0" encoding="UTF-8"?>\n${svgString}`;

    try {
      await navigator.clipboard.writeText(svgWithDeclaration);
      addSnackbar("SVG copied to clipboard", 1000);
    } catch (err) {
      addSnackbar("Failed to copy", 1000);
    }
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      addSnackbar("Link copied to clipboard", 1000);
    } catch (err) {
      addSnackbar("Failed to copy link", 1000);
    }
  };

  const downloadSVG = () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current.cloneNode(true) as SVGSVGElement;
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const currentDateTime = new Date()
      .toISOString()
      .replace(/[^\w]/g, "")
      .slice(0, 15);

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgWithDeclaration = `<?xml version="1.0" encoding="UTF-8"?>\n${svgString}`;

    const blob = new Blob([svgWithDeclaration], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pattern-${currentDateTime}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const tileGrid = (
    <>
      {SVG_TILES.map((tile, index) => {
        const Content = tile.content;
        return (
          <Tooltip content={tile.name} distance={-5} key={index} delay={500}>
            <group
              onClick={() => toggleTile(tile.id)}
              data-interactive=""
              data-over-color="neutral"
              data-cursor="pointer"
              data-background="context"
              data-shrink="no"
              data-border={selectedTiles.has(tile.id) ? "2" : ""}
              data-space="15"
              data-radius="15"
              key={tile.id}
              data-width="auto"
              data-ratio="1:1"
              data-align="center"
              data-justify="center"
              data-direction="column"
            >
              <group
                data-width="auto"
                data-background="adaptive-gray"
                data-interact=""
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                >
                  <Content />
                </svg>
              </group>
            </group>
          </Tooltip>
        );
      })}
    </>
  );

  return (
    <group
      data-gap="30"
      data-align="start"
      data-wrap="no"
      data-direction="column-800"
    >
      <svg
        viewBox="0 0 48 48"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <pattern
            id={`combined-svg-${patternKey}`}
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            {getSelectedTiles().map((tile) => {
              const Content = tile.content;
              return <Content key={tile.id} />;
            })}
          </pattern>
        </defs>
      </svg>

      <group
        data-autofit="1-800"
        data-length="395"
        data-gap="30"
        data-direction="column"
        data-align="start"
      >
        <group
          data-radius="40"
          data-elevation="2"
          data-background="context"
          data-index="1"
          data-direction="column"
        >
          <group data-space="30" data-gap="30">
            <group>
              <text
                data-weight="700"
                data-wrap="preline"
                data-text-size="large"
                data-ellipsis=""
                data-font-type="hero"
                data-line="1"
              >
                Preview<br></br> Your Pattern
              </text>

              <Ripple>
                <group
                  data-contain=""
                  data-adaptive="mobile"
                  data-position="right"
                  data-cursor="pointer"
                  data-interactive=""
                  data-space-vertical="15"
                  data-radius="15"
                  data-space-horizontal="20"
                  data-background="adaptive-gray"
                  onClick={selectRandomTiles}
                  data-width="auto"
                >
                  <text>Random</text>
                </group>
              </Ripple>
            </group>

            <group
              data-direction="column"
              data-ratio="1:1"
              data-contain=""
              data-gap="30"
              data-align="start"
            >
              <group
                data-hidden={selectedTiles.size === 0 ? "true" : ""}
                data-width="auto"
                data-gap="30"
                data-direcion="column"
              >
                <separator data-horizontal=""></separator>

                <text data-opacity="50" data-length="240" data-wrap="wrap" data-animation-name="appear-top"
                  data-fill-mode="backwards"
                  data-animation-duration="3">
                  Choose two or more tiles to combine and generate a new
                  pattern.
                </text>
              </group>

              <svg
                width="100%"
                height="100%"
                data-position="absolute"
              >
                <rect
                  width="100%"
                  height="100%"
                  fill={`url(#combined-svg-${patternKey})`}
                />
              </svg>

              <group
                data-adaptive="mobile"
                data-width="auto"
                data-position="absolute"
                data-index="2"
                data-bottom="0"
                data-right="0"
              >
                <Popover
                  placement="top"
                  data-space="0"
                  data-radius="30"
                  data-length="600"
                  content={(closePopover) => (
                    <group
                      data-direction="column"
                      data-wrap="no"
                      data-contain=""
                    >
                      <group data-scroll="scroll">
                        <group
                          data-space="20"
                          data-gap="15"
                          data-wrap="no"
                          data-width="auto"
                          data-max-length="auto"
                        >
                          {tileGrid}
                        </group>
                      </group>
                      <group data-space-horizontal="20">
                        <separator data-horizontal=""></separator>
                      </group>
                      <group
                        data-wrap="no"
                        data-align="center"
                        data-space="20"
                        data-gap="10"
                      >
                        <group
                          data-cursor="pointer"
                          data-interactive=""
                          data-space-vertical="15"
                          data-radius="15"
                          data-space-horizontal="20"
                          data-background="adaptive-gray"
                          onClick={resetSelection}
                          data-width="auto"
                        >
                          <text>Clear</text>
                        </group>

                        <group
                          data-cursor="pointer"
                          data-interactive=""
                          data-space-vertical="15"
                          data-radius="15"
                          data-space-horizontal="20"
                          data-background="text"
                          data-color="main-background"
                          onClick={closePopover}
                          data-align="center"
                          data-justify="center"
                        >
                          <text>Done</text>
                        </group>
                      </group>
                    </group>
                  )}
                >
                  <group data-width="auto">
                    <Ripple>
                      <group
                        data-contain=""
                        data-ink-color="main-dark"
                        data-cursor="pointer"
                        data-interactive=""
                        data-space="20"
                        data-radius="30"
                        data-background="main"
                        data-color="main-text"
                        data-width="auto"
                        data-wrap="no"
                        data-align="center"
                        data-gap="15"
                      >
                        <group data-interact="" data-width="auto">
                          <Plus size={20} />
                        </group>
                      </group>
                    </Ripple>
                  </group>
                </Popover>
              </group>
            </group>

            <group data-gap="10" data-wrap="no">
              <Ripple>
                <group
                  data-contain=""
                  data-shrink="no"
                  data-cursor="pointer"
                  data-interactive=""
                  data-space-vertical="15"
                  data-radius="15"
                  data-space-horizontal="20"
                  data-background="adaptive-gray"
                  onClick={resetSelection}
                  data-width="auto"
                  data-animation-name="appear-top-small"
                  data-animation-duration="4"
                >
                  <text>New</text>
                </group>
              </Ripple>

              <Popover
                data-space="5"
                data-radius="20"
                content={(closePopover) => (
                  <group
                    data-direction="column"
                    data-length="220"
                    onClick={closePopover}
                  >
                    <group data-direction="column" data-length="240">
                      <group
                        data-align="center"
                        data-justify="center"
                      >
                        <group
                          data-space="15"
                          data-radius="15"
                          data-height="fit"
                          data-animation-name="appear-bottom"
                          data-fill-mode="backwards"
                          data-animation-duration="2.5"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            ref={svgRef}
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                          >
                            {getSelectedTiles().map((tile) => {
                              const Content = tile.content;
                              return <Content key={tile.id} />;
                            })}
                          </svg>
                        </group>
                      </group>

                      <group
                        onClick={downloadSVG}
                        data-animation-name="appear-bottom"
                        data-fill-mode="backwards"
                        data-animation-duration="2.75"
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
                            <text data-weight="700">Download</text>
                            <text data-opacity="30">
                              Save pattern for later
                            </text>
                          </group>
                        </group>
                      </group>

                      <group
                        onClick={copySVGToClipboard}
                        data-animation-name="appear-bottom"
                        data-fill-mode="backwards"
                        data-animation-duration="3"
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
                            <text data-weight="700">Copy SVG</text>
                            <text data-opacity="30">
                              Paste in Figma or code
                            </text>
                          </group>
                        </group>
                      </group>

                      <group
                        onClick={copyShareLink}
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
                            <text data-weight="700">Share Link</text>
                            <text data-opacity="30">
                              Copy URL to share pattern
                            </text>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                )}
              >
                <group data-disabled={selectedTiles.size === 0}>
                  <Ripple>
                    <group
                      data-ink-color="gray-shade-20"
                      data-contain=""
                      data-space-vertical="15"
                      data-space-horizontal="20"
                      data-align="center"
                      data-justify="center"
                      data-background="text"
                      data-color="main-background"
                      data-interactive=""
                      data-over-color="neutral"
                      data-radius="15"
                      data-cursor="pointer"
                      data-position="right"
                      data-wrap="no"
                      data-gap="15"
                      data-animation-name="appear-top-small"
                      data-animation-duration="3"
                    >
                      <text data-opacity={selectedTiles.size === 0 ? "30" : ""}>
                        Export Pattern
                      </text>
                    </group>
                  </Ripple>
                </group>
              </Popover>
            </group>
          </group>
        </group>
      </group>

      <group data-fit="1" data-adaptive="desktop">
        <group data-align="center" data-gap="15" data-space-vertical="30">
          <Ripple>
            <group
              data-contain=""
              data-cursor="pointer"
              data-interactive=""
              data-space-vertical="15"
              data-radius="15"
              data-space-horizontal="20"
              data-background="adaptive-gray"
              onClick={selectRandomTiles}
              data-width="auto"
            >
              <text>Random</text>
            </group>
          </Ripple>

          <separator data-vertical="adaptive"></separator>
          <group data-width="auto" data-direction="column" data-gap="10">
            <text data-opacity="50" data-max-length="240" data-wrap="wrap">
              Choose any tiles you like—they'll layer together into one pattern.
            </text>
          </group>
        </group>

        <group data-gap="15" data-type="grid" data-grid-template="80">
          {tileGrid}
        </group>
      </group>
    </group>
  );
};

export default PatternMaker;