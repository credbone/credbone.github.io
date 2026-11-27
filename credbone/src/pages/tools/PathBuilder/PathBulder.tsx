import React, { useEffect, useState } from "react";
import { PathCanvas } from "./PathCanvas";
import {
  ConfigPanel,
  HintsPanel,
  CopyPathButton,
  PathOutput,
  ResetButton,
  PointPanel,
  RemovePointButton,
  SegmentTypeButton,
  SheetCloseButton,
  SegmentTypePicker,
} from "./Panel";
import { useEditorState } from "./useEditorState";
import { buildPathD, isApple, isTouchFirst } from "./pathUtils";
import { CanvasConfig, PointType } from "./types";
import Popover from "../../../components/popover";
import Ripple from "../../../components/Ripple";
import Tooltip from "../../../components/tooltip";
import MenuItem from "../../../components/MenuItem";

import { Code, Ellipsis, Grid2x2Plus, Info, PanelLeft, Waypoints } from "lucide-react";

export default function App() {
  const {
    state,
    dispatch,
    svgRef,
    canvasRef,
    selectedPoint,
    isFirstSelected,
    onCanvasMouseDown,
    onWorkAreaMouseDown,
    onAnchorMouseDown,
    onCtrlMouseDown,
    onMouseMove,
    onMouseUp,
    onCanvasTouchStart,
    startResize,
    isResizing,
    updateSelected,
    setSelectedType,
    removeSelected,
  } = useEditorState();

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
    <ConfigPanel
      config={state.config}
      onChange={(patch: Partial<CanvasConfig>) =>
        dispatch({ type: "SET_CONFIG", patch })
      }
    />
  );
  const resetCanvas = () => dispatch({ type: "RESET" });

  const pointPanel = (
    <PointPanel
      point={selectedPoint}
      isFirst={isFirstSelected}
      config={state.config}
      onUpdate={updateSelected}
    />
  );

  // "…" menu: list of items; picking one opens its panel in a separate popover (menuView)
  type MenuKey = "point" | "export" | "settings" | "info";
  type Breakpoint = "500" | "600" | "800" | "1000" | "1200";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState<MenuKey | null>(null);
  // Which promoted toolbar item's popover is open (its tooltip is off meanwhile)
  const [toolbarOpen, setToolbarOpen] = useState<MenuKey | null>(null);
  const menuItems: {
    key: MenuKey;
    icon: React.ReactElement;
    title: string;
    // Short line under the title in the menu list
    description: string;
    // Longer text under the panel header (popovers and the right pane)
    summary: string;
    panel: React.ReactNode;
    // Width from which the item lives outside the menu (toolbar or rail);
    // below it, it's in the menu. Uses the desktop-/mobile- pairs in control.css.
    // inToolbar without outsideFrom: always in the toolbar, never in the menu.
    // Neither: always in the menu.
    outsideFrom?: Breakpoint;
    // Shown as a toolbar button (from outsideFrom up, if set)
    inToolbar?: boolean;
    // Nothing to show yet: dimmed and not clickable, in the toolbar and the menu
    disabled?: boolean;
  }[] = [
    {
      key: "point",
      icon: <Waypoints size={20} strokeWidth={1.5} />,
      title: "Selected Point",
      description: "Position and control points",
      summary:
        "Fine-tune the selected point's position, control points and arc.",
      panel: pointPanel,
      // The right rail shows it from 1000px up
      outsideFrom: "1000",
      disabled: !selectedPoint,
    },
    {
      key: "export",
      icon: <Code size={20} strokeWidth={1.5} />,
      title: "Export Path",
      description: "Copy the path data",
      summary: "Copy the SVG path data to use in your own markup or code.",
      panel: <PathOutput d={pathD} />,
      inToolbar: true,
      // No points, no path to copy
      disabled: state.points.length === 0,
    },
    {
      key: "settings",
      icon: <Grid2x2Plus size={20} strokeWidth={1.5} />,
      title: "Canvas Settings",
      description: "Size, grid and snapping",
      summary: "Canvas size, grid and snapping, and whether the path closes.",
      panel: canvasPanel,
      // The right rail shows it from 1000px up
      outsideFrom: "1000",
    },
    {
      key: "info",
      icon: <Info size={20} strokeWidth={1.5} />,
      title: "Quick Help",
      description: "Shortcuts and gestures",
      summary: isTouchFirst
        ? "Touch gestures for adding, selecting and moving points."
        : "Keyboard and mouse shortcuts for adding, selecting and moving points.",
      panel: <HintsPanel />,
      outsideFrom: "1000",
      inToolbar: true,
    },
  ];

  // Each item's data, for the inline popovers and the right pane headers
  const pointItem = menuItems.find((i) => i.key === "point")!;
  const exportItem = menuItems.find((i) => i.key === "export")!;
  const settingsItem = menuItems.find((i) => i.key === "settings")!;
  const infoItem = menuItems.find((i) => i.key === "info")!;

  // The item whose panel was opened from the "…" menu
  const menuPanel = menuItems.find((i) => i.key === menuView);
  // Closes by itself if its item becomes disabled (e.g. the point is deselected)
  const isMenuPanelOpen = !!menuPanel && !menuPanel.disabled;

  // Items that can be in the menu, and the width the menu button hides from
  // (none = always shown, because an item never leaves the menu)
  const menuEntries = menuItems.filter((i) => i.outsideFrom || !i.inToolbar);
  const menuHidesFrom = menuEntries.some((i) => !i.outsideFrom)
    ? undefined
    : menuEntries
        .map((i) => i.outsideFrom!)
        .sort((a, b) => Number(b) - Number(a))[0];

  // Shared by the full picker and the compact button
  const segmentProps = {
    point: selectedPoint,
    isFirst: isFirstSelected,
    hasPoints: state.points.length > 0,
    onTypeChange: (t: PointType) => setSelectedType(t),
  };

  return (
    <group
      //  data-width="auto"
      data-gap="30"
      data-align="start"
      data-direction="column"
      data-height="fit"
      data-contain=""
    >
      <group
        data-align="start"
        data-wrap="no"
        data-height="fit"
        data-contain=""
      >
        <group data-height="fit" data-contain="">
          <group
            data-direction="column"
            data-wrap="no"
            data-contain=""
            data-gap="30"
            // data-width="auto"

            data-height="fit"
            data-scroll=""
            // Pressing the work area around the canvas deselects
            onMouseDown={onWorkAreaMouseDown}
          >
            {/* <group
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
                {isTouchFirst
                  ? "Long-press the canvas to add a point, long-press a point or handle to move it. Use the point panel to change segment type and adjust the path."
                  : `${isApple ? "⌘" : "Ctrl"} + Click or hold to add points. Use the point panel to change segment type and adjust the path.`}
              </text>
            </group>
          </group> */}

            {/* Padding keeps the corner resize handles from being clipped */}
            <group
              data-width="auto"
              data-space="50"
              data-max-length="auto"
              data-position="center"
            >
              <PathCanvas
                points={state.points}
                selectedId={state.selectedId}
                config={state.config}
                svgRef={svgRef}
                canvasRef={canvasRef}
                onCanvasMouseDown={onCanvasMouseDown}
                onAnchorMouseDown={onAnchorMouseDown}
                onCtrlMouseDown={onCtrlMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onTouchStart={onCanvasTouchStart}
                onResizeStart={startResize}
                isResizing={isResizing}
              />

              <group data-height="70" data-pointer-event="none"></group>
            </group>
          </group>

          <group
            data-position="absolute"
            data-bottom="30"
            data-space-horizontal="30"
            data-width="auto"
            data-align-center="x"
          >
            <group
              data-background="adaptive-gray"
              data-backdrop="20"
              data-name="toolbar"
              data-space="5"
              data-position="center"
              data-width="max-content"
              data-radius="20"
              data-wrap="no"
              data-align="center"
              data-gap="5"
            >
              {/* Full picker from 600px, one button opening the type list below */}
              <group
                data-adaptive="desktop-600"
                data-width="auto"
                data-shrink="no"
              >
                <SegmentTypePicker {...segmentProps} />
              </group>
              <group
                data-adaptive="mobile-600"
                data-width="auto"
                data-shrink="no"
              >
                <SegmentTypeButton {...segmentProps} />
              </group>
              <separator data-vertical="" data-height="20"></separator>
              <RemovePointButton onRemove={removeSelected} />

              {/* Toolbar popover: Export Path (always in the toolbar) */}
              <group
                data-width="auto"
                data-shrink="no"
                data-disabled={exportItem.disabled ? "true" : undefined}
                data-opacity={exportItem.disabled ? "30" : undefined}
              >
                <Popover
                  placement="top"
                  bottomsheet
                  data-space="0"
                  data-radius="30"
                  content={(close, isBottomSheet) => (
                    <group
                      data-direction="column"
                      data-length={isBottomSheet ? undefined : "280"}
                      data-wrap="no"
                      data-gap={isBottomSheet ? "25" : "15"}
                      data-space={isBottomSheet ? "5" : "15"}
                    >
                      <group data-space={isBottomSheet ? "10" : "15"} data-gap="5">
                        <group>
                          <text
                            data-weight="700"
                            data-wrap="preline"
                            data-text-size="medium"
                            data-ellipsis=""
                            data-font-type="hero"
                            data-line="1"
                          >
                            {exportItem.title}
                          </text>
                        </group>
                        <text
                          data-wrap="wrap"
                          data-opacity="40"
                          data-length="220"
                        >
                          {exportItem.summary}
                        </text>
                      </group>

                      <PathOutput d={pathD} />

                      <separator
                        data-horizontal=""
                        data-opacity="5"
                      ></separator>

                      <CopyPathButton d={pathD} isBottomSheet={isBottomSheet} />

                      {/* {isBottomSheet && (
                        <SheetCloseButton onClose={close} label="Done" />
                      )} */}
                    </group>
                  )}
                  open={toolbarOpen === "export" && !exportItem.disabled}
                  // Functional update: opening another one fires this one's close after it
                  onOpenChange={(open) =>
                    setToolbarOpen((cur) =>
                      open ? "export" : cur === "export" ? null : cur,
                    )
                  }
                >
                  <group data-width="auto">
                    <Tooltip
                      content={exportItem.title}
                      delay={300}
                      motion="zoom"
                      disabled={toolbarOpen === "export" || exportItem.disabled}
                    >
                      <group data-width="auto">
                        <Ripple>
                          <group
                            data-width="auto"
                            data-interactive=""
                            data-ink-color="neutral"
                            data-over-color="neutral"
                            data-cursor="pointer"
                            data-contain=""
                            data-space-horizontal="15"
                            data-radius="15"
                            data-height="45"
                            data-align="center"
                          >
                            <icon>{exportItem.icon}</icon>
                          </group>
                        </Ripple>
                      </group>
                    </Tooltip>
                  </group>
                </Popover>
              </group>

              {/* Toolbar popover: Quick Help (in the toolbar from 1000px, in the menu below) */}
              <group
                data-adaptive={`desktop-${infoItem.outsideFrom}`}
                data-width="auto"
                data-shrink="no"
              >
                <Popover
                  placement="top"
                  bottomsheet
                  data-space="0"
                  data-radius="30"
                  content={(close, isBottomSheet) => (
                    <group
                      data-direction="column"
                      data-length={isBottomSheet ? undefined : "280"}
                      data-wrap="no"
                      data-gap={isBottomSheet ? "25" : "15"}
                      data-space={isBottomSheet ? "5" : "15"}
                    >
                      <group data-gap="5" data-space={isBottomSheet ? "10" : "15"}>
                        <group>
                          <text
                            data-weight="700"
                            data-wrap="preline"
                            data-text-size="medium"
                            data-ellipsis=""
                            data-font-type="hero"
                            data-line="1"
                          >
                            {infoItem.title}
                          </text>
                        </group>
                        <text
                          data-wrap="wrap"
                          data-opacity="40"
                          data-length="220"
                        >
                          {infoItem.summary}
                        </text>
                      </group>
                      <separator data-horizontal="" data-opacity="5" />

                      <group data-direction="column">
                        <HintsPanel />
                      </group>
                      {isBottomSheet && (
                        <>
                          <separator
                            data-horizontal=""
                            data-opacity="5"
                          ></separator>
                          <SheetCloseButton onClose={close} label="Done" />
                        </>
                      )}
                    </group>
                  )}
                  open={toolbarOpen === "info"}
                  onOpenChange={(open) =>
                    setToolbarOpen((cur) =>
                      open ? "info" : cur === "info" ? null : cur,
                    )
                  }
                >
                  <group data-width="auto">
                    <Tooltip
                      content={infoItem.title}
                      delay={300}
                      motion="zoom"
                      disabled={toolbarOpen === "info"}
                    >
                      <group data-width="auto">
                        <Ripple>
                          <group
                            data-width="auto"
                            data-interactive=""
                            data-ink-color="neutral"
                            data-over-color="neutral"
                            data-cursor="pointer"
                            data-contain=""
                            data-space-horizontal="15"
                            data-radius="15"
                            data-height="45"
                            data-align="center"
                          >
                            <icon>{infoItem.icon}</icon>
                          </group>
                        </Ripple>
                      </group>
                    </Tooltip>
                  </group>
                </Popover>
              </group>

              {/* "…" menu: picking an item closes the list and opens that item's
                  panel in its own popover on the same button (no back step).
                  Hidden once every item has moved out of it. */}
              {menuEntries.length > 0 && (
                <group
                  data-adaptive={
                    menuHidesFrom ? `mobile-${menuHidesFrom}` : undefined
                  }
                  data-width="auto"
                  data-shrink="no"
                  data-align="center"
                  data-gap="5"
                  data-wrap="no"
                >
                  <separator data-vertical="" data-height="20"></separator>
                  {/* The item's panel, anchored to the same "…" button. Its trigger
                      click is ignored (only closing counts); the list opens it. */}
                  <Popover
                    placement="top"
                    open={isMenuPanelOpen}
                    onOpenChange={(open) => {
                      if (!open) setMenuView(null);
                    }}
                    bottomsheet
                    // Sheet only: a tall panel (Canvas Settings) scrolls inside it
                    bottomsheetProps={{
                      "data-scroll": "",
                      "data-scrollbar": "none",
                    }}
                    data-space="0"
                    data-radius="30"
                    content={(close, isBottomSheet) => (
                      <>
                        {/* Menu panel: Selected Point */}
                        {menuView === "point" && (
                          <group
                            data-direction="column"
                            data-length={isBottomSheet ? undefined : "280"}
                            data-wrap="no"
                            data-gap={isBottomSheet ? "25" : "15"}
                            data-space={isBottomSheet ? "5" : "15"}
                          >
                            <group data-gap="5" data-space={isBottomSheet ? "10" : "15"}>
                              <group>
                                <text
                                  data-weight="700"
                                  data-wrap="preline"
                                  data-text-size="medium"
                                  data-ellipsis=""
                                  data-font-type="hero"
                                  data-line="1"
                                >
                                  {pointItem.title}
                                </text>
                              </group>
                              <text data-wrap="wrap" data-opacity="40">
                                {pointItem.summary}
                              </text>
                            </group>
                            <group data-direction="column">
                              {pointPanel}
                            </group>
                            {isBottomSheet && (
                              <>
                                <separator
                                  data-horizontal=""
                                  data-opacity="5"
                                ></separator>
                                <SheetCloseButton
                                  onClose={close}
                                  label="Done"
                                />
                              </>
                            )}
                          </group>
                        )}

                        {/* Menu panel: Canvas Settings */}
                        {menuView === "settings" && (
                          <group
                            data-direction="column"
                            data-length={isBottomSheet ? undefined : "280"}
                            data-wrap="no"
                            data-gap={isBottomSheet ? "25" : "15"}
                            data-space={isBottomSheet ? "5" : "15"}
                          >
                            <group data-gap="5" data-space={isBottomSheet ? "10" : "15"}>
                              <group>
                                <text
                                  data-weight="700"
                                  data-wrap="preline"
                                  data-text-size="medium"
                                  data-ellipsis=""
                                  data-font-type="hero"
                                  data-line="1"
                                >
                                  {settingsItem.title}
                                </text>
                              </group>
                              <text data-wrap="wrap" data-opacity="40">
                                {settingsItem.summary}
                              </text>
                            </group>
                            <group
                              data-direction="column"
                              data-gap={isBottomSheet ? "25" : "15"}
                            >
                              {canvasPanel}
                              <separator
                                data-horizontal=""
                                data-opacity="5"
                              ></separator>
                              <ResetButton
                                onReset={resetCanvas}
                                isBottomSheet={isBottomSheet}
                              />
                            </group>
                            {/* {isBottomSheet && (
                              <SheetCloseButton onClose={close} label="Done" />
                            )} */}
                          </group>
                        )}

                        {/* Menu panel: Quick Help */}
                        {menuView === "info" && (
                          <group
                            data-direction="column"
                            data-length={isBottomSheet ? undefined : "280"}
                            data-wrap="no"
                            data-gap={isBottomSheet ? "25" : "15"}
                            data-space={isBottomSheet ? "5" : "15"}
                          >
                            <group data-gap="5" data-space={isBottomSheet ? "10" : "15"}>
                              <group>
                                <text
                                  data-weight="700"
                                  data-wrap="preline"
                                  data-text-size="medium"
                                  data-ellipsis=""
                                  data-font-type="hero"
                                  data-line="1"
                                >
                                  {infoItem.title}
                                </text>
                              </group>
                              <text
                                data-wrap="wrap"
                                data-opacity="40"
                                data-length="220"
                              >
                                {infoItem.summary}
                              </text>
                            </group>
                            <separator data-horizontal="" data-opacity="5" />

                            <group data-direction="column">
                              <HintsPanel />
                            </group>
                            {isBottomSheet && (
                              <>
                                <separator
                                  data-horizontal=""
                                  data-opacity="5"
                                ></separator>
                                <SheetCloseButton
                                  onClose={close}
                                  label="Done"
                                />
                              </>
                            )}
                          </group>
                        )}
                      </>
                    )}
                  >
                    <group data-width="auto" data-shrink="no">
                      <Popover
                        placement="top"
                        open={isMenuOpen}
                        onOpenChange={(open) => {
                          // With a panel open, the button only closes it
                          if (open && isMenuPanelOpen) return;
                          if (open) setMenuView(null);
                          setIsMenuOpen(open);
                        }}
                        bottomsheet
                        data-space="5"
                        data-radius="20"
                        content={(close, isBottomSheet) => (
                          <group
                            data-direction="column"
                            data-length={isBottomSheet ? undefined : "260"}
                            data-contain=""
                          >
                            {menuEntries.map((item, index) => (
                              <group
                                key={item.key}
                                data-adaptive={
                                  item.outsideFrom
                                    ? `mobile-${item.outsideFrom}`
                                    : undefined
                                }
                                data-disabled={
                                  item.disabled ? "true" : undefined
                                }
                                data-opacity={item.disabled ? "30" : undefined}
                                data-name="autoseparation"
                                data-animation-name="appear-bottom"
                                data-fill-mode="backwards"
                                data-animation-duration={2 + index * 0.5}
                              >
                                <separator
                                  data-horizontal=""
                                  data-margin-horizontal="10"
                                  data-opacity="5"
                                ></separator>
                                <MenuItem
                                  icon={item.icon}
                                  title={item.title}
                                  description={item.description}
                                  onClick={() => {
                                    close();
                                    // Next tick: opened during this click, the panel's
                                    // outside-click listener would catch it and close it
                                    setTimeout(() => setMenuView(item.key));
                                  }}
                                  data-space={isBottomSheet ? "20" : "15"}
                                  data-gap={isBottomSheet ? "20" : "15"}
                                />
                              </group>
                            ))}
                            {isBottomSheet && (
                              <>
                                <group data-height="20"></group>

                                <SheetCloseButton
                                  onClose={close}
                                  label="Close"
                                />
                              </>
                            )}
                          </group>
                        )}
                      >
                        <group data-width="auto" data-shrink="no">
                          <Tooltip
                            content="Menu"
                            delay={300}
                            motion="zoom"
                            disabled={isMenuOpen || isMenuPanelOpen}
                          >
                            <group data-width="auto">
                              <Ripple>
                                <group
                                  data-width="auto"
                                  data-interactive=""
                                  data-ink-color="neutral"
                                  data-over-color="neutral"
                                  data-cursor="pointer"
                                  data-contain=""
                                  data-space-horizontal="15"
                                  data-radius="15"
                                  data-height="45"
                                  data-align="center"
                                >
                                  <icon>
                                    <Ellipsis size={20} strokeWidth={1.5} />
                                  </icon>
                                </group>
                              </Ripple>
                            </group>
                          </Tooltip>
                        </group>
                      </Popover>
                    </group>
                  </Popover>
                </group>
              )}
            </group>
          </group>
        </group>

        <group
          data-height="fit"
          data-wrap="no"
          data-length="320"
          data-adaptive="desktop-1000"
          data-animation-name="appear-right"
          data-animation-duration="2.25"
        >
          <group data-space-vertical="30" data-width="auto">
            <separator data-vertical="" data-height="fit"></separator>
          </group>

{/* <group  data-height="fit" data-width="auto"  data-space-vertical="30">


<group data-space="10" >
  <group data-space="15" data-gap="15" data-align="start"  data-direction="column">
<group data-opacity="30">
      <PanelLeft size={20} strokeWidth={1.5}/>
</group>
<group  data-align="start" data-justify="center">
    <text data-orientation="vertical"> Point & Canvas Settings</text>
</group>
</group>
</group>

</group> */}

          <group
            data-direction="column"
            data-height="fit"
            data-scroll=""
            data-wrap="no"
            data-space-horizontal="30"
            data-space-vertical="60"
            data-gap="30"
          >
            <group data-gap="5">
              <group>
                <text
                  data-weight="700"
                  data-wrap="preline"
                  data-text-size="medium"
                  data-ellipsis=""
                  data-font-type="hero"
                  data-line="1"
                >
                  {pointItem.title}
                </text>
              </group>
              <text data-wrap="wrap" data-opacity="40">
                {pointItem.summary}
              </text>
            </group>

            {pointPanel}

            <separator data-horizontal=""></separator>

            <group data-gap="5">
              <group>
                <text
                  data-weight="700"
                  data-wrap="preline"
                  data-text-size="medium"
                  data-ellipsis=""
                  data-font-type="hero"
                  data-line="1"
                >
                  {settingsItem.title}
                </text>
              </group>
              <text data-wrap="wrap" data-opacity="40">
                {settingsItem.summary}
              </text>
            </group>

            {canvasPanel}
            <separator data-horizontal=""></separator>
            <ResetButton onReset={resetCanvas} />
          </group>
        </group>
      </group>
    </group>
  );
}
