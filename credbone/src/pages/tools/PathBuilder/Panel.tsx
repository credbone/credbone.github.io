import React, { useCallback, useEffect, useRef, useState } from "react";
import { CanvasConfig, PathPoint, PointType } from "./types";
import ConfigSlider from "../../../components/inputs/ConfigSlider";
import Ripple from "../../../components/Ripple";
import Tooltip from "../../../components/tooltip";
import { useSnackbar } from "../../../components/snackbar/SnackbarContainer";

import { isApple, isTouchFirst } from "./pathUtils";

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

interface NumberRowProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
}
export const NumberRow: React.FC<NumberRowProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}) => {
  const [local, setLocal] = React.useState(String(value));
  React.useEffect(() => {
    setLocal(String(value));
  }, [value]);

  const valueRef = useRef(value);
  valueRef.current = value;

  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHold = (dir: "inc" | "dec") => {
    const fn = () => {
      const next =
        dir === "inc" ? valueRef.current + step : valueRef.current - step;
      const clamped =
        dir === "inc"
          ? max !== undefined
            ? Math.min(max, next)
            : next
          : min !== undefined
            ? Math.max(min, next)
            : next;
      onChange(clamped);
    };

    // delay before hold starts
    interval.current = setTimeout(() => {
      interval.current = setInterval(fn, 80);
    }, 400);
  };

  const stopHold = () => {
    if (interval.current) {
      clearTimeout(interval.current);
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  // single tap fires on mouseup only if hold never started
  const hasFired = useRef(false);

  const handleMouseDown = (dir: "inc" | "dec") => {
    hasFired.current = false;
    startHold(dir);
  };

  const handleMouseUp = (dir: "inc" | "dec") => {
    const wasHolding =
      !interval.current || typeof interval.current === "number";
    stopHold();
    if (!hasFired.current) {
      // was a quick tap, fire once
      const next =
        dir === "inc" ? valueRef.current + step : valueRef.current - step;
      onChange(
        dir === "inc"
          ? max !== undefined
            ? Math.min(max, next)
            : next
          : min !== undefined
            ? Math.max(min, next)
            : next,
      );
    }
  };

  return (
    <label
      data-type="group"
      data-over-color="neutral"
      data-interactive=""
      data-radius="15"
      data-wrap="no"
      data-align="center"
      data-space="5"
    >
      <group data-align="center">
        <text data-opacity="60" data-space-horizontal="10">
          {label}
        </text>
      </group>
      <group
        data-height="35"
        data-length="35"
        data-align="center"
        data-justify="center"
        data-direction="column"
        data-interactive=""
        data-radius="10"
        data-cursor="pointer"
        data-disabled={min !== undefined && value <= min ? "true" : undefined}
        data-opacity={min !== undefined && value <= min ? "30" : undefined}
        onMouseDown={() => handleMouseDown("dec")}
        onMouseUp={() => handleMouseUp("dec")}
        onMouseLeave={stopHold}
      >
        <text>−</text>
      </group>

      <input
        data-interact=""
        data-text-align="center"
        data-name="input-reset"
        name={label}
        type="number"
        value={local}
        min={min}
        max={max}
        step={step}
        onChange={(e) => setLocal(e.target.value)}
        onBlur={(e) => onChange(parseFloat(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") {
            e.preventDefault();
            const next = valueRef.current + step;
            onChange(max !== undefined ? Math.min(max, next) : next);
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = valueRef.current - step;
            onChange(min !== undefined ? Math.max(min, next) : next);
          }
          if (e.key === "Enter") onChange(parseFloat(e.currentTarget.value));
        }}
      />

      <group
        data-height="35"
        data-length="35"
        data-align="center"
        data-justify="center"
        data-direction="column"
        data-interactive=""
        data-radius="10"
        data-cursor="pointer"
        data-disabled={max !== undefined && value >= max ? "true" : undefined}
        data-opacity={max !== undefined && value >= max ? "30" : undefined}
        onMouseDown={() => handleMouseDown("inc")}
        onMouseUp={() => handleMouseUp("inc")}
        onMouseLeave={stopHold}
      >
        <text>+</text>
      </group>
      <group
        data-position="absolute"
        data-pointer-event="none"
        data-name="input-indicator"
        data-height="fit"
        data-background="adaptive-gray"
        data-radius="12"
        data-left="0"
      ></group>
    </label>
  );
};

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}
export const ToggleRow: React.FC<ToggleRowProps> = ({
  label,
  checked,
  onChange,
}) => (
  <group
    data-contain=""
    data-cursor="pointer"
    data-align="center"
    data-interactive=""
    data-over-color="neutral"
    onClick={() => onChange(!checked)}
    data-radius="15"
    data-space="15"
    data-height="45"
    data-wrap="no"
  >
    <group>
      <text>{label}</text>
    </group>
    <Toggle checked={checked} onChange={onChange} />
  </group>
);

// ─── Section wrapper ──────────────────────────────────────────────────────────
export const Section: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <>
    {title && (
      <group data-space="10">
        <text data-opacity="30">{title}</text>
      </group>
    )}

    <group
      //  data-background="main-background"
      data-direction="column"
      data-border=""
      data-space="10"
      data-elevation="2"
      data-radius="25"
      data-gap="10"
      data-contain=""
    >
      {children}
    </group>
  </>
);

// ─── Canvas Config Panel ──────────────────────────────────────────────────────
interface ConfigPanelProps {
  config: CanvasConfig;
  onChange: (patch: Partial<CanvasConfig>) => void;
  onReset: () => void;
}
export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  config,
  onChange,
  onReset,
}) => (
  <Section title="Canvas">
    <group data-direction="column" data-gap="10">
      <group data-direction="column">
        <NumberRow
          label="Width"
          value={config.width}
          min={100}
          max={1000}
          step={5}
          onChange={(v) => onChange({ width: v })}
        />

        <NumberRow
          label="Height"
          value={config.height}
          min={100}
          max={1000}
          step={5}
          onChange={(v) => onChange({ height: v })}
        />

        <ToggleRow
          label="Close Path"
          checked={config.closePath}
          onChange={(v) => onChange({ closePath: v })}
        />
        <NumberRow
          label="Grid Size"
          value={config.gridSize}
          min={5}
          max={200}
          step={5}
          onChange={(v) => onChange({ gridSize: v })}
        />

        {/* <ConfigSlider
                label="Grid Size"
          value={Math.round(config.gridSize)}
          start={5}
          end={200}
          step={5}
                 onValueChange={(v) => onChange({ gridSize: v })}
              /> */}

        <ToggleRow
          label="Snap to Grid"
          checked={config.snapGrid}
          onChange={(v) => onChange({ snapGrid: v })}
        />
        <ToggleRow
          label="Show Grid"
          checked={config.showGrid}
          onChange={(v) => onChange({ showGrid: v })}
        />
      </group>

      {/* <separator data-horizontal=""></separator> */}

      <ActionBtn onClick={onReset}>Reset</ActionBtn>
    </group>
  </Section>
);

// ─── Point Panel ──────────────────────────────────────────────────────────────
interface PointPanelProps {
  point: PathPoint | null;
  isFirst: boolean;
  config: CanvasConfig;
  onTypeChange: (t: PointType) => void;
  onUpdate: (patch: Partial<PathPoint>) => void;
  onRemove: () => void;
}
export const PointPanel: React.FC<PointPanelProps> = ({
  point,
  isFirst,
  config,
  onTypeChange,
  onUpdate,
  onRemove,
}) => {
  const disabled = !point;
const types: { type: PointType; label: string }[] = [
  { type: 'L', label: 'Line' },
  { type: 'Q', label: 'Quadratic' },
  { type: 'C', label: 'Cubic' },
  { type: 'A', label: 'Arc' },
];
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
    <>
      <group data-space="10">
        <text data-opacity="30">Segment Type</text>
      </group>

      <group data-direction="column">
        <group
          data-background="text"
          data-color="main-background"
          //  data-backdrop="20"
 data-space="3"
          data-radius="15"
          data-wrap="no"
          data-direction="column"
          //data-height="45"
          data-contain=""
        >
          <group
           
         //   data-position="absolute"
            data-translate-vertical={isFirst ? "" : "-100%"}
            data-transition-prop="transform"
             data-timing="fancy"
            data-duration="3"
            data-height="40"
            data-align="center"
          >
            <group data-space="10" data-align="center" data-direction="column">
              <text data-ellipsis="">Starting point type is fixed</text>
            </group>
          </group>

          <group
            ref={typeToggleRef}
            data-position="absolute"
         //   data-height="40"
            data-wrap="no"
            data-translate-vertical={isFirst ? "100%" : ""}
             data-timing="fancy"
            data-transition-prop="transform"
            data-duration="3"
            data-space="3"
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
               data-space="3"
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
                data-radius="12"
                data-background="context"
              ></group>
            </group>
            {types.map(({ type: t, label }) => (
              <Tooltip content={label} key={t} delay={500}>
              <group
                data-interactive=""
                data-ink-color="neutral"
                data-over-color="neutral"
                data-contain=""
                data-radius="12"
                // data-transition-prop="flex"
                // data-duration=".225"
               // data-space="10"
               data-justify="center"
                data-height="40"
              //  data-space-horizontal="15"
                data-fit={selectedType === t ? "1.5" : "1"}
                data-cursor="pointer"
                data-selected={selectedType === t ? "true" : undefined}
                data-color={selectedType === t ? "text" : undefined}
                data-align="center"
                data-direction="column"
                data-disabled={isFirst}
                data-opacity={disabled ? "30" : undefined}
                data-pointer-event={disabled ? "none" : undefined}
                onClick={() => onTypeChange(t)}
              >
                <text>{t}</text>
              </group>
              </Tooltip>
            ))}
          </group>
        </group>
      </group>

      <group data-gap="10" data-direction="column">
        {/* Type buttons */}

        {/* Position */}

        <group data-space="10">
          <text data-opacity="30">Selected Point</text>
        </group>
        <ActionBtn onClick={onRemove}>Remove Point</ActionBtn>


<group data-height="5">

</group>

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

<group></group>

<Section>
<group>
<group data-name="autoseparation">
                    <ToggleRow
                label="Large Arc"
                checked={point.large ?? false}
                onChange={(v) => onUpdate({ large: v })}
              />
</group>
<group data-name="autoseparation">
                <separator data-horizontal="dotted"></separator>
              <ToggleRow
                label="Sweep"
                checked={point.sweep ?? false}
                onChange={(v) => onUpdate({ sweep: v })}
              />
</group>
</group>
</Section>

            </>
        )}
</group>



      </group>
    </>
  );
};

// ─── Path Output ──────────────────────────────────────────────────────────────
export const PathOutput: React.FC<{ d: string }> = ({ d }) => {
  const [copied, setCopied] = React.useState(false);

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

  const { addSnackbar } = useSnackbar();

  return (
    <>
      {d && (
        <>
          <group data-space="10">
            <text data-opacity="30">Path</text>
          </group>

          <group
            data-border=""
            data-space="10"
            data-radius="25"
            //    data-theme="dark"
            data-gap="10"
          >
            <group
              data-space="15"
              data-user-select="text"
              data-radius="15"
              data-background={copied ? "adaptive-gray" : undefined}
            >
              <text data-font-feature="tnum" data-wrap="wrap">
                {d || "—"}
              </text>
            </group>

            {/* <separator data-horizontal=""></separator> */}

            <ActionBtn onClick={copy}>
              <text
                data-ellipsis=""
                data-transition-prop="font-size"
                data-duration="2"
                data-text-size={copied ? "" : "0"}
              >
                Copied
              </text>
              <text
                data-ellipsis=""
                data-transition-prop="font-size"
                data-duration="2"
                data-text-size={!copied ? "" : "0"}
              >
                Copy Path
              </text>
            </ActionBtn>
          </group>
        </>
      )}
    </>
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
  <group data-space="10">
    {HINTS.map(([key, desc], index) => (
      <group
        data-space="5"
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
          data-radius="10"
        >
          <text data-weight="600">{key}</text>
        </group>
        <text data-opacity="50" data-ellipsis="">{desc}</text>
      </group>
    ))}
  </group>
);

// ─── Shared styles ────────────────────────────────────────────────────────────

interface ActionBtnProps {
  onClick: () => void;
  variant?: "danger" | "primary";
  style?: React.CSSProperties;
  children: React.ReactNode;
}
const ActionBtn: React.FC<ActionBtnProps> = ({ onClick, children }) => {
  return (
    <Ripple>
      <group
        data-cursor="pointer"
        data-align="center"
        data-contain=""
        data-direction="column"
        data-background="adaptive-gray"
        // data-color="main-background"

        //data-border=""
        data-ink-color="gray-shade-20"
        data-over-color="neutral"
        onClick={onClick}
        data-interactive=""
        data-space="15"
        data-radius="15"
        // onMouseEnter={(e: { currentTarget: HTMLButtonElement; }) => { (e.currentTarget as HTMLButtonElement).style.background = `${borderColor}22`; }}
        // onMouseLeave={(e: { currentTarget: HTMLButtonElement; }) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
      >
        <text>{children}</text>
      </group>
    </Ripple>
  );
};
