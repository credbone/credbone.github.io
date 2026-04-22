import React, { useEffect } from "react";
import { PathCanvas } from "./PathCanvas";
import { ConfigPanel, HintsPanel, PathOutput, PointPanel } from "./Panel";
import { useEditorState } from "./useEditorState";
import { buildPathD } from "./pathUtils";
import { CanvasConfig, PointType } from "./types";
import Popover from "../../../components/popover";
import Ripple from "../../../components/Ripple";

import {  Grid2x2Plus, Waypoints } from "lucide-react";

export default function App() {
  const {
    state,
    dispatch,
    svgRef,
    selectedPoint,
    isFirstSelected,
    onCanvasMouseDown,
    onAnchorMouseDown,
    onCtrlMouseDown,
    onMouseMove,
    onMouseUp,
    updateSelected,
    setSelectedType,
    removeSelected,
  } = useEditorState();


  const bottomsheetConfig = {
  "data-height": "600",
  "data-scroll":"",
  "data-direction":"column",
"data-wrap":"no",
"data-space":"0",
"data-scrollbar":"none"


};

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === "INPUT") return;
      if (e.key === "Delete" || e.key === "Backspace") {
        removeSelected();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [removeSelected]);

  const pathD = buildPathD(state.points, state.config.closePath);

  const canvasPanel = (
    <group data-gap="10" data-direction="column">

<group data-index="2" data-gap="10">
  
        <ConfigPanel
        config={state.config}
        onChange={(patch: Partial<CanvasConfig>) =>
          dispatch({ type: "SET_CONFIG", patch })
        }
        onReset={() => dispatch({ type: "RESET" })}
      />

</group>

      <PathOutput d={pathD} />
      <HintsPanel />
    </group>
  );

  const pointPanel = (
    <PointPanel
      point={selectedPoint}
      isFirst={isFirstSelected}
      config={state.config}
      onTypeChange={(t: PointType) => setSelectedType(t)}
      onUpdate={updateSelected}
      onRemove={removeSelected}
    />
  );

  return (
    <group
    //  data-width="auto"
      data-gap="30"
      data-align="start"
      data-direction="column"
    >
      <group data-gap="30" data-align="start" data-wrap="no">
        <group
          data-direction="column"
          data-length="260"
          data-adaptive="desktop-1000"
        >
          {canvasPanel}
        </group>

        <group
          data-direction="column"
          data-wrap="no"
          data-contain=""
          data-gap="30"
          data-width="auto"
        >
          <group
            data-width="auto"
            data-gap="30"
            data-direction="column"
            data-align="start"
          >
            <group data-gap="10" data-direction="column" data-width="auto">
              <text
                data-weight="700"
                data-wrap="preline"
                data-text-size="large"
                data-ellipsis=""
                data-font-type="hero"
                data-line="1"
              >
                Path Builder
              </text>
              <text data-wrap="wrap" data-max-length="300" data-opacity="40">
                Ctrl + Click to add points. Use the left panel to change segment
                type and adjust the path.
              </text>
            </group>
          </group>

          <group data-index="2" data-adaptive="mobile-1000">
            <Popover
                     bottomsheet
          bottomsheetProps={bottomsheetConfig}
            // data-backdrop="20"
              data-scrollbar="none"
              data-elevation="2"
              data-space="0"
              data-radius="30"
              placement="top"
              data-scroll=""
              data-length="400"
data-height="600"
data-wrap="no"
data-direction="column"
              

              content={(closePopover, isBottomSheet) => (
                <>
                  <group data-space={isBottomSheet ? "30" : "20"}  data-space-top={isBottomSheet ? "20" : "10"} data-gap="10" data-wrap="no" data-direction="column">
                    {canvasPanel}
                  </group>
                                <group  data-position="bottom">
                 <separator data-horizontal="dotted"></separator>
               </group>
                  <group
                    data-space={isBottomSheet ? "30" : "20"}
                   data-background="main-background-bottom"
                    data-shrink="no"
                    data-position="sticky"
                    data-bottom="0"
                    data-index="3"
                  >
                    <Ripple>
                      <group
                        onClick={closePopover}
                        data-over-color="neutral"
                          data-ink-color="neutral"
                        data-contain=""
                        data-space="15"
                        data-radius="30"
                        data-interactive=""
                        data-align="center"
                        data-justify="center"
                        data-cursor="pointer"
                     data-backdrop="20"
    
                      >
                        <text data-weight="600">Done</text>
                      </group>
                    </Ripple>
                  </group>
                </>
              )}
            >
              <group data-width="auto">
                <Ripple>
                  <group
                  data-width="auto"
                    data-interactive=""
                    data-ink-color="neutral"
                    data-cursor="pointer"
                    data-over-color="neutral"
                    data-contain=""
                    data-radius="20"
                    data-space="20"
                    data-gap="15"
                    data-align="center"
                    data-border="inset"
                    data-wrap="no"
                    data-background="context"
                  >
                    <group data-width="auto" data-interact="">
                      <Grid2x2Plus size={20}/>
                    </group>
                    <separator data-vertical="" data-height="fit"></separator>
                    <text data-ellipsis="">Canvas & Path Export</text>
                  </group>
                </Ripple>
              </group>
            </Popover>
          </group>

          <group
            data-direction="column"
            data-gap="30"
            // data-space="30"
         //   data-border="inset"
           // data-radius="25"
            data-scroll=""
        //   data-scrollbar="none"
          >
            <group data-width="auto">
              <PathCanvas
                points={state.points}
                selectedId={state.selectedId}
                config={state.config}
                svgRef={svgRef}
                onCanvasMouseDown={onCanvasMouseDown}
                onAnchorMouseDown={onAnchorMouseDown}
                onCtrlMouseDown={onCtrlMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
              />
            </group>
          </group>
        </group>

        <group
          data-adaptive="desktop"
          data-gap="10"
          data-direction="column"
          data-length="260"
          //   data-position="sticky" data-right="0" data-top="0"
        >
          {pointPanel}
        </group>
      </group>






      <group
        data-adaptive="mobile"
        data-direction="column"
        data-gap="10"
        data-position="sticky"
        data-bottom="0"
        data-index="2"
      >
        <group>
          <Popover
          bottomsheet
          bottomsheetProps={bottomsheetConfig}
         //  data-backdrop="20"
            data-elevation="2"
            data-space="0"
            data-radius="30"
            placement="top"
            data-scroll=""
            data-length="400"

            data-height="600"

data-direction="column"
data-wrap="no"
            data-scrollbar="none"
            content={(closePopover, isBottomSheet) => (
              <>
                <group data-space={isBottomSheet ? "30" : "20"} data-space-top={isBottomSheet ? "20" : "10"} data-gap="10" data-wrap="no" data-direction="column">
                  {pointPanel}
                </group>
                                <group  data-position="bottom">
                 <separator data-horizontal="dotted"></separator>
               </group>
                <group
                  data-space={isBottomSheet ? "30" : "20"}
                  data-background="main-background-bottom"
                  data-shrink="no"
                  data-position="sticky"
                  data-bottom="0"
                  data-index="3"
                  
                >
                  <Ripple>
                    <group
                      onClick={closePopover}
                      data-over-color="neutral"
                      data-ink-color="neutral"
                      data-contain=""
                      data-space="15"
                      data-radius="30"
                      data-interactive=""
                      data-align="center"
                      data-justify="center"
                      data-cursor="pointer"
                      // data-background="main"
                      // data-color="main-text"
                      data-backdrop="20"
                    >
                      <text data-weight="600">Done</text>
                    </group>
                  </Ripple>
                </group>
              </>
            )}
          >
            <group>
              <Ripple>
                <group
                  data-background="context"
                  data-interactive=""
                  data-ink-color="neutral"
                  data-cursor="pointer"
                  data-over-color="neutral"
                  data-contain=""
                  data-radius="20"
                  data-space="20"
                  data-gap="15"
                  data-align="center"
                  data-border="inset"
                  data-wrap="no"
                  data-backdrop="20-adaptive"
                >
                  <group data-width="auto" data-interact="">
                    <Waypoints size="20"/>
                    
                  </group>
                  <separator data-vertical="" data-height="fit"></separator>
                  <text data-ellipsis="">Selected Point & Segment</text>
                </group>
              </Ripple>
            </group>
          </Popover>
        </group>
      </group>
    </group>
  );
}
