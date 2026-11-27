import React, { useCallback, useEffect, useRef, useState } from "react";
import { CanvasConfig, PathPoint, PointType } from "./types";
import ConfigSlider from "../../../components/inputs/ConfigSlider";
import ConfigSwap from "../../../components/inputs/ConfigSwap";
import { SelectOption } from "../../../components/inputs/ConfigSelect";
import Ripple from "../../../components/Ripple";
import Tooltip from "../../../components/tooltip";
import { useSnackbar } from "../../../components/snackbar/SnackbarContainer";
import Popover from "../../../components/popover";
import MenuItem from "../../../components/MenuItem";

import { CANVAS_SIZE, GRID_SIZE, isApple, isTouchFirst } from "./pathUtils";
import { Trash2 } from "lucide-react";

// ─── Primitives ───────────────────────────────────────────────────────────────

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}
export const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => (
  <group
    data-interact=""
    data-width="auto"
    checkbox=""
    simple=""
    data-checked={checked ? "true" : "false"}
  >
    <box>
      <check> </check>
    </box>
  </group>
);

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}
export const ToggleRow: React.FC<ToggleRowProps> = ({
  label,
  checked,
  onChange,
}) => {
  const toggle = () => onChange(!checked);
  // Same bordered bar as the component demos' toggles (pairs with ConfigSlider / ConfigSwap)
  return (
    <group data-space="3" data-radius="15" data-border="" data-contain="">
      <Ripple>
        <group
          data-ink-color="neutral-light"
          data-gap="15"
          data-wrap="no"
          data-height="40"
          data-align="center"
          data-space-horizontal="15"
          data-space-right="10"
          data-radius="12"
          data-contain=""
          data-interactive=""
          data-over-color="neutral"
          data-cursor="pointer"
          role="switch"
          aria-checked={checked}
          aria-label={label}
          tabIndex={0}
          onClick={toggle}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
        >
          <group data-width="auto">
            <text data-ellipsis="">{label}</text>
          </group>
          <group data-width="auto" data-position="right">
            <Toggle checked={checked} onChange={onChange} />
          </group>
        </group>
      </Ripple>
    </group>
  );
};

// ─── Canvas Config Panel ──────────────────────────────────────────────────────
interface ConfigPanelProps {
  config: CanvasConfig;
  onChange: (patch: Partial<CanvasConfig>) => void;
}
export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  config,
  onChange,
}) => (
  <>
    {/* Same slider style and gap as the point panel */}
    <group data-direction="column" data-gap="15">
      <ConfigSlider
        label="Width"
        value={Math.round(config.width)}
        start={CANVAS_SIZE.min}
        end={CANVAS_SIZE.max}
        step={5}
        onValueChange={(v) => onChange({ width: v })}
      />
      <ConfigSlider
        label="Height"
        value={Math.round(config.height)}
        start={CANVAS_SIZE.min}
        end={CANVAS_SIZE.max}
        step={5}
        onValueChange={(v) => onChange({ height: v })}
      />

      <ToggleRow
        label="Snap to Grid"
        checked={config.snapGrid}
        onChange={(v) => onChange({ snapGrid: v })}
      />

      <ConfigSlider
        label="Grid Size"
        value={Math.round(config.gridSize)}
        start={GRID_SIZE.min}
        end={GRID_SIZE.max}
        step={5}
        onValueChange={(v) => onChange({ gridSize: v })}
      />
    </group>

<separator data-horizontal="dotted" data-opacity="20"></separator>

    <group data-direction="column" data-gap="15">
      <ToggleRow
        label="Close Path"
        checked={config.closePath}
        onChange={(v) => onChange({ closePath: v })}
      />

      <ToggleRow
        label="Show Grid"
        checked={config.showGrid}
        onChange={(v) => onChange({ showGrid: v })}
      />
    </group>
  </>
);

// ─── Reset Button ─────────────────────────────────────────────────────────────
// Clears the drawing and settings. Rounder in a bottom sheet.
export const ResetButton: React.FC<{
  onReset: () => void;
  isBottomSheet?: boolean;
}> = ({ onReset, isBottomSheet }) => (
  <Ripple>
    <group
      data-cursor="pointer"
      data-align="center"
      data-contain=""
      data-direction="column"
      data-background="text"
      data-color="main-background"
      data-ink-color="gray-shade-20"
      data-over-color="neutral"
      onClick={onReset}
      data-interactive=""
      data-space="15"
      data-radius={isBottomSheet ? "30" : "15"}
      data-shrink="no"
    >
      <text>Reset</text>
    </group>
  </Ripple>
);

// ─── Segment Type Picker ─────────────────────────────────────────────────────
interface SegmentTypePickerProps {
  point: PathPoint | null;
  isFirst: boolean;
  hasPoints: boolean;
  onTypeChange: (t: PointType) => void;
}

// Shown in place of the options when there's nothing to pick
const PICKER_MESSAGES = {
  empty: isTouchFirst
    ? "Long-press to add a point"
    : `${isApple ? "⌘" : "Ctrl"} + Click to add a point`,
  none: "Select a point to set its type",
  first: "Starting point type is fixed",
};

// Segment types the selected point can switch between (the first point is always M)
const SEGMENT_TYPES: { type: PointType; label: string; description: string }[] =
  [
    { type: "L", label: "Line", description: "Straight segment" },
    {
      type: "Q",
      label: "Quadratic",
      description: "Curve with one control point",
    },
    { type: "C", label: "Cubic", description: "Curve with two control points" },
    { type: "A", label: "Arc", description: "Elliptical arc" },
  ];

// Empty canvas, no point, or the fixed starting point: show a message instead of the types
const pickerMessage = (
  point: PathPoint | null,
  isFirst: boolean,
  hasPoints: boolean,
): keyof typeof PICKER_MESSAGES | null =>
  !hasPoints ? "empty" : !point ? "none" : isFirst ? "first" : null;

export const SegmentTypePicker: React.FC<SegmentTypePickerProps> = ({
  point,
  isFirst,
  hasPoints,
  onTypeChange,
}) => {
  // The message slides in over the options
  const message = pickerMessage(point, isFirst, hasPoints);
  const types = SEGMENT_TYPES;
  const selectedType = point && !isFirst ? point.type : null;

  // Segmented toggle indicator (same logic as the Ripple demo mode toggle in Miscellaneous)
  const typeToggleRef = useRef<HTMLDivElement>(null);
  const typeIndicatorRef = useRef<HTMLDivElement>(null);
  const [typeIndicatorStyle, setTypeIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  // Tracks the selected option relative to the toggle container
  const updateTypeIndicator = useCallback(() => {
    const container = typeToggleRef.current;
    if (!container) return;
    const selected = container.querySelector<HTMLElement>(
      '[data-selected="true"]',
    );
    // No selection (no point, or the fixed starting point): collapse the fill
    if (!selected) {
      setTypeIndicatorStyle((s) => ({ ...s, width: 0 }));
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const selectedRect = selected.getBoundingClientRect();

    // The indicator's own data-space pads the fill inward, so grow and shift the wrapper by it
    const indicatorStyle = typeIndicatorRef.current
      ? getComputedStyle(typeIndicatorRef.current)
      : null;
    const padLeft = indicatorStyle ? parseFloat(indicatorStyle.paddingLeft) : 0;
    const padRight = indicatorStyle
      ? parseFloat(indicatorStyle.paddingRight)
      : 0;

    setTypeIndicatorStyle({
      // clientLeft offsets the container border, since absolute positioning starts inside it
      left:
        selectedRect.left - containerRect.left - container.clientLeft - padLeft,
      width: selectedRect.width + padLeft + padRight,
    });
  }, []);

  // Fire on selection change
  useEffect(() => {
    updateTypeIndicator();
  }, [selectedType, updateTypeIndicator]);

  // Fire on resize
  useEffect(() => {
    const ro = new ResizeObserver(updateTypeIndicator);
    if (typeToggleRef.current) ro.observe(typeToggleRef.current);
    return () => ro.disconnect();
  }, [updateTypeIndicator]);

  return (
    <group data-direction="column">
      <group
        // data-background="adaptive-gray"

        //  data-backdrop="20"

        data-radius="15"
        data-wrap="no"
        data-direction="column"
        data-height="45"
        data-contain=""
        data-length="220"
        data-align="start"
      >
        <group
          //   data-position="absolute"
          data-translate-vertical={message ? "" : "-100%"}
          data-transition-prop="transform"
          data-timing="fancy"
          data-duration="3"
          data-height="fit"
          data-align="center"
        >
          <group data-space="10" data-align="center" data-direction="column">
            <text data-ellipsis="">{PICKER_MESSAGES[message ?? "first"]}</text>
          </group>
        </group>

        <group
          ref={typeToggleRef}
          data-position="absolute"
          data-height="fit"
          data-wrap="no"
          data-translate-vertical={message ? "100%" : ""}
          data-timing="fancy"
          data-transition-prop="transform"
          data-duration="3"
          data-top="0"
          data-left="0"
        >
          {/* Rendered before the options so their labels paint above the fill */}
          <group
            ref={typeIndicatorRef}
            data-position="absolute"
            data-top="0"
            data-left="0"
            data-height="fit"
            //  data-space="3"
            data-pointer-event="none"
            data-transition-prop="transform"
            data-duration=".325"
            data-timing="fancy"
            style={{
              width: typeIndicatorStyle.width,
              transform: `translateX(${typeIndicatorStyle.left}px)`,
            }}
          >
            <group
              data-height="fit"
              data-radius="15"
              data-background="white"
              //  data-border=""
            ></group>
          </group>
          {types.map(({ type: t, label }) => (
            <Tooltip content={label} key={t} delay={300} motion="zoom">
              <group
                data-interactive=""
                data-ink-color="neutral"
                data-over-color="neutral"
                data-contain=""
                data-radius="15"
                // data-transition-prop="flex"
                // data-duration=".225"
                // data-space="10"
                data-justify="center"
                data-height="fit"
                //  data-space-horizontal="15"
                //  data-fit={selectedType === t ? "1.5" : "1"}
                data-cursor="pointer"
                data-selected={selectedType === t ? "true" : undefined}
                data-color={selectedType === t ? "black" : undefined}
                data-align="center"
                data-direction="column"
                data-disabled={!!message}
                data-pointer-event={message ? "none" : undefined}
                onClick={() => onTypeChange(t)}
              >
                <text>{t}</text>
              </group>
            </Tooltip>
          ))}
        </group>
      </group>
    </group>
  );
};

// ─── Sheet Close ─────────────────────────────────────────────────────────────
// Close button at the end of a bottom sheet (same as the Dot Icon Maker menus);
// its top spacing doubles as the sheet's bottom gap. Render it only in a sheet.
export const SheetCloseButton: React.FC<{
  onClose: () => void;
  label?: string;
}> = ({ onClose, label = "Close" }) => (
  <group data-direction="column" data-shrink="no">
    {/* <group data-height="20"></group> */}
    <group data-wrap="no" data-align="center" data-gap="10">
      <group
        data-cursor="pointer"
        data-interactive=""
        data-space-vertical="15"
        data-radius="30"
        data-space-horizontal="20"
        data-background="text"
        data-color="main-background"
        onClick={onClose}
        data-align="center"
        data-justify="center"
        data-weight="600"
      >
        <text>{label}</text>
      </group>
    </group>
  </group>
);

// ─── Segment Type Button (compact picker) ────────────────────────────────────
// One button showing the current type; opens the types as a menu list
// (bottom sheet on mobile), or the picker's message when there's nothing to pick.
export const SegmentTypeButton: React.FC<SegmentTypePickerProps> = ({
  point,
  isFirst,
  hasPoints,
  onTypeChange,
}) => {
  const [open, setOpen] = useState(false);
  const message = pickerMessage(point, isFirst, hasPoints);
  const selectedType = point && !isFirst ? point.type : null;
  const current = !point ? "–" : point.type;

  return (
    <Popover
      placement="top"
      bottomsheet
      open={open}
      onOpenChange={setOpen}
      data-space="5"
      data-radius="20"
      content={(close, isBottomSheet) => (
        <>
          {message ? (
            <group
              data-space="15"
              data-length={isBottomSheet ? undefined : "240"}
            >
              <text data-wrap="wrap" data-opacity="60">
                {PICKER_MESSAGES[message]}
              </text>
            </group>
          ) : (
            <group
              data-direction="column"
              data-length={isBottomSheet ? undefined : "240"}
              data-contain=""
            >
              {SEGMENT_TYPES.map(({ type: t, label, description }, index) => (
                <group
                  key={t}
                  data-name="autoseparation"
                  // On the wrapper: hides the separators around the highlighted type
                  data-selected={selectedType === t ? "true" : undefined}
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
                    icon={<group data-length="20" data-aling="center" data-justify="center" data-line="1"><text>{t}</text></group>}
                    title={label}
                    description={description}
                    data-background={
                      selectedType === t ? "adaptive-gray" : undefined
                    }
                    onClick={() => {
                      onTypeChange(t);
                      setOpen(false);
                    }}
                    data-space={isBottomSheet ? "20" : "15"}
                    data-gap={isBottomSheet ? "20" : "15"}
                  />
                </group>
              ))}
            </group>
          )}
          {/* Picking a type closes the list, so this only keeps the current one */}
          {isBottomSheet && 

<group>
            <group data-height="20"></group>
          <SheetCloseButton onClose={close} label="Cancel" />
</group>
          
          }
        </>
      )}
    >
      <group data-width="auto" data-shrink="no">
        <Tooltip
          content="Segment Type"
          delay={300}
          motion="zoom"
          disabled={open}
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
               // data-background="text" data-color="main-background"
              >
                <group data-length="30" data-height="30" data-align="center"  data-radius="30"  data-justify="center">
                  <text>{current}</text>
                </group>
              </group>
            </Ripple>
          </group>
        </Tooltip>
      </group>
    </Popover>
  );
};

// ─── Remove Point ────────────────────────────────────────────────────────────
export const RemovePointButton: React.FC<{ onRemove: () => void }> = ({
  onRemove,
}) => (
  <Tooltip content="Remove Point">
    <group data-width="auto" data-shrink="no">
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
          onClick={onRemove}
        >
          <icon>
            <Trash2 size={20} strokeWidth={1.5} />
          </icon>
        </group>
      </Ripple>
    </group>
  </Tooltip>
);

// ─── Point Panel ──────────────────────────────────────────────────────────────
// Arc flags (A command): large-arc-flag and sweep-flag. Sweep 1 runs clockwise on screen (y down)
const ARC_SIZES: SelectOption[] = [
  { value: "small", name: "Small" },
  { value: "large", name: "Large" },
];
const SWEEPS: SelectOption[] = [
  { value: "ccw", name: "Counterclockwise" },
  { value: "cw", name: "Clockwise" },
];

interface PointPanelProps {
  point: PathPoint | null;
  isFirst: boolean;
  config: CanvasConfig;
  onUpdate: (patch: Partial<PathPoint>) => void;
}
export const PointPanel: React.FC<PointPanelProps> = ({
  point,
  isFirst,
  config,
  onUpdate,
}) => {
  const disabled = !point;

  return (
    <>
      <group data-gap="15" data-direction="column">
        <group
          data-gap="15"
          data-opacity={disabled ? "40" : undefined}
          data-pointer-event={disabled ? "none" : undefined}
        >
          <>
            <ConfigSlider
              label="Point X"
              value={Math.round(point?.x ?? 0)}
              start={0}
              end={config.width}
              onValueChange={(v) => onUpdate({ x: v })}
            />
            <ConfigSlider
              label="Point Y"
              value={Math.round(point?.y ?? 0)}
              start={0}
              end={config.height}
              onValueChange={(v) => onUpdate({ y: v })}
            />
          </>
        </group>

        {/* Q controls */}
        {point && point.type === "Q" && !isFirst && (
          <>
            <ConfigSlider
              label="Control X"
              value={Math.round(point.cx ?? 0)}
              start={0}
              end={config.width}
              onValueChange={(v) => onUpdate({ cx: v })}
            />
            <ConfigSlider
              label="Control Y"
              value={Math.round(point.cy ?? 0)}
              start={0}
              end={config.height}
              onValueChange={(v) => onUpdate({ cy: v })}
            />
          </>
        )}

        {/* C controls */}
        {point && point.type === "C" && !isFirst && (
          <>
            <ConfigSlider
              label="Control 1 X"
              value={Math.round(point.cx1 ?? 0)}
              start={0}
              end={config.width}
              onValueChange={(v) => onUpdate({ cx1: v })}
            />
            <ConfigSlider
              label="Control 1 Y"
              value={Math.round(point.cy1 ?? 0)}
              start={0}
              end={config.height}
              onValueChange={(v) => onUpdate({ cy1: v })}
            />

            <ConfigSlider
              label="Control 2 X"
              value={Math.round(point.cx2 ?? 0)}
              start={0}
              end={config.width}
              onValueChange={(v) => onUpdate({ cx2: v })}
            />
            <ConfigSlider
              label="Control 2 Y"
              value={Math.round(point.cy2 ?? 0)}
              start={0}
              end={config.height}
              onValueChange={(v) => onUpdate({ cy2: v })}
            />
          </>
        )}

        {/* A controls */}
        {point && point.type === "A" && !isFirst && (
          <>
            <ConfigSlider
              label="Radius X"
              value={Math.round(point.rx ?? 50)}
              start={0}
              end={400}
              onValueChange={(v) => onUpdate({ rx: v })}
            />
            <ConfigSlider
              label="Radius Y"
              value={Math.round(point.ry ?? 50)}
              start={0}
              end={400}
              onValueChange={(v) => onUpdate({ ry: v })}
            />
            <ConfigSlider
              label="Rotation"
              value={Math.round(point.xrot ?? 0)}
              start={0}
              end={360}
              onValueChange={(v) => onUpdate({ xrot: v })}
            />

            {/* The two arc flags as named choices */}
            <ConfigSwap
              label="Arc Size"
              options={ARC_SIZES}
              value={point.large ? "large" : "small"}
              onSelect={(v) => onUpdate({ large: v === "large" })}
            />
            <ConfigSwap
              label="Sweep"
              options={SWEEPS}
              value={point.sweep ? "cw" : "ccw"}
              onSelect={(v) => onUpdate({ sweep: v === "cw" })}
            />
          </>
        )}
      </group>
    </>
  );
};

// ─── Path Output ──────────────────────────────────────────────────────────────
export const PathOutput: React.FC<{ d: string }> = ({ d }) => (
  <>
    {d && (
      <group
        //    data-space="30"
        data-user-select="text"
        data-radius="15"
        data-background="adaptive-gray"

        data-space="30"
      >
        <text data-font-feature="tnum" data-wrap="wrap">
          {d}
        </text>
      </group>
    )}
  </>
);

// ─── Copy Path Button ─────────────────────────────────────────────────────────
// Copies the path data; label swaps to "Copied" for a moment (text swap)
export const CopyPathButton: React.FC<{
  d: string;
  isBottomSheet?: boolean;
}> = ({ d, isBottomSheet }) => {
  const [copied, setCopied] = React.useState(false);
  const { addSnackbar } = useSnackbar();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(d);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      addSnackbar("Path copied to clipboard", 1000);
    } catch (err) {
      console.error(err);
      addSnackbar("Failed to copy", 1000);
    }
  };

  if (!d) return null;

  return (
    <Ripple>
      <group
        data-cursor="pointer"
        data-align="center"
        data-contain=""
        data-direction="column"
        data-background="text"
        data-color="main-background"
        data-ink-color="gray-shade-20"
        data-over-color="neutral"
        onClick={copy}
        data-interactive=""
        data-space="15"
        data-radius={isBottomSheet ? "30" : "15"}
      >
        <text>
          <text
            data-ellipsis=""
            data-transition-prop="font-size"
            data-duration="2"
            data-text-size={copied ? "" : "0"}
          >
          Path Copied
          </text>
          <text
            data-ellipsis=""
            data-transition-prop="font-size"
            data-duration="2"
            data-text-size={!copied ? "" : "0"}
          >
            Copy
          </text>
        </text>
      </group>
    </Ripple>
  );
};

// ─── Hints ───────────────────────────────────────────────────────────────────
// Touch-first devices get gesture hints; keyboards get Apple symbols on macOS / iOS
const HINTS: [string, string][] = isTouchFirst
  ? [
      ["Long-press", "Add point & drag"],
      ["Tap", "Select point"],
      ["Long-press point", "Move point / handle"],
    ]
  : [
      [`${isApple ? "⌘" : "Ctrl"} + Click`, "Add point"],
      ["Hold", "Add point & drag"],
      ["Click", "Select point"],
      ["Drag", "Move point / handle"],
      [isApple ? "⌫" : "Delete", "Remove selected"],
    ];

export const HintsPanel: React.FC = () => (
  <group data-gap="10">
    {HINTS.map(([key, desc], index) => (
      <group
        data-gap="10"
        data-align="center"
        data-wrap="no"
        key={key}
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration={2 + index * 0.5}
      >
        <group
          data-space="10"
          data-space-horizontal="15"
          data-background="adaptive-gray"
          data-width="auto"
          data-radius="15"
        >
          <text>{key}</text>
        </group>
        <text data-opacity="50" data-ellipsis="">
          {desc}
        </text>
      </group>
    ))}
  </group>
);

