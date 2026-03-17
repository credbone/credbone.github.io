import React, { useRef } from "react";
import { CanvasConfig, PathPoint, PointType } from "./types";
import CustomSlider from "../../../components/inputs/slider";
import Ripple from "../../../components/Ripple";
import { useSnackbar } from "../../../components/snackbar/SnackbarContainer";

import { isIOS, isMacOs } from "react-device-detect";

const isApple = isMacOs || isIOS;

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

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}
export const SliderRow: React.FC<SliderRowProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}) => (
  <group data-space="10" data-gap="5" data-align="center">
    <group data-space="5" data-gap="10" data-align="center" data-wrap="no">
      <text data-opacity="50" data-ellipsis="">
        {label}
      </text>

      {/* <text data-position="right">{Math.round(value)}</text> */}
    </group>

    <group data-fit="1">
      <CustomSlider
        //  showvalue={false}
        handlerWidth={50}
        start={min}
        end={max}
        step={step}
        value={Math.round(value)}
        onValueChange={(v) => onChange(v)}
        // handlerProps={{ "data-radius": "10" }}
        trackLeftProps={{"data-margin-right": "0", "data-height": "1" }}
        trackRightProps={{ "data-opacity": "10", "data-height": "1" }}
      />
    </group>
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
        data-radius="15"
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

        {/* <SliderRow
                label="Grid Size"
          value={config.gridSize}
          min={5}
          max={200}
          step={5}
                 onChange={(v) => onChange({ gridSize: v })}
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

          data-radius="15"
          data-wrap="no"
          data-direction="column"
          //data-height="45"
          data-contain=""
        >
          <group
            data-space="5"
         //   data-position="absolute"
            data-translate-vertical={isFirst ? "" : "-100%"}
            data-transition-prop="transform"
            data-duration="3"
     //       data-height="45"
            data-align="center"
          >
            <group data-space="10">
              <text>Starting point type is fixed</text>
            </group>
          </group>

          <group
            data-position="absolute"
            data-space="5"
            data-translate-vertical={isFirst ? "100%" : ""}
            data-transition-prop="transform"
            data-duration="3"
          >
           {types.map(({ type: t, label }) => (
              <group
                data-interactive=""
                data-radius="10"
                data-space="10"
                data-space-horizontal="15"
                //  data-duration=".125"

                data-fit={point && !isFirst && point.type === t ? "2" : "1"}
                data-transition-prop="flex"
                data-duration=".225"
                // data-length={
                //   point && !isFirst && point.type === t ? "90" : "auto"
                // }
                data-cursor="pointer"
                data-background={
                  point && !isFirst && point.type === t ? "context" : ""
                }
                data-color={
                  point && !isFirst && point.type === t ? "text" : undefined
                }
                data-align="center"
                data-direction="column"
                data-over-color="neutral"
                key={t}
                data-disabled={isFirst}
                data-opacity={disabled ? "30" : undefined}
                data-pointer-event={disabled ? "none" : undefined}
                onClick={() => onTypeChange(t)}
              >
                <text>{t}</text>
              </group>
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
        {/* <group data-space="10">
          <text data-opacity="30">Point Position</text>
        </group> */}
        <Section>
          <group
            data-gap="10"
            data-opacity={disabled ? "30" : undefined}
            data-pointer-event={disabled ? "none" : undefined}
          >
            <group>
              <SliderRow
                label="Point X Position"
                value={point?.x ?? 0}
                min={0}
                max={config.width}
                onChange={(v) => onUpdate({ x: v })}
              />
              <SliderRow
                label="Point Y Position"
                value={point?.y ?? 0}
                min={0}
                max={config.height}
                onChange={(v) => onUpdate({ y: v })}
              />
            </group>
          </group>
        </Section>

        {/* Q controls */}
        {point && point.type === "Q" && !isFirst && (
          <Section title={"Control Point"}>
            <group>
              <SliderRow
                label="Control Point X Position"
                value={point.cx ?? 0}
                min={0}
                max={config.width}
                onChange={(v) => onUpdate({ cx: v })}
              />
              <SliderRow
                label="Control Point Y Position"
                value={point.cy ?? 0}
                min={0}
                max={config.height}
                onChange={(v) => onUpdate({ cy: v })}
              />
            </group>
          </Section>
        )}

        {/* C controls */}
        {point && point.type === "C" && !isFirst && (
          <>
            <Section title={"First Control Point"}>
              <group

              // data-animation-name="appear-top"
              // data-animation-duration="3.25"
              // data-fill-mode="backwards"
              >
                <SliderRow
                  label="First control point X"
                  value={point.cx1 ?? 0}
                  min={0}
                  max={config.width}
                  onChange={(v) => onUpdate({ cx1: v })}
                />
                <SliderRow
                  label="First control point Y"
                  value={point.cy1 ?? 0}
                  min={0}
                  max={config.height}
                  onChange={(v) => onUpdate({ cy1: v })}
                />
              </group>
            </Section>

            <Section title={"Second Control Point"}>
              <group>
                <SliderRow
                  label="Second control point X"
                  value={point.cx2 ?? 0}
                  min={0}
                  max={config.width}
                  onChange={(v) => onUpdate({ cx2: v })}
                />
                <SliderRow
                  label="Second control point Y"
                  value={point.cy2 ?? 0}
                  min={0}
                  max={config.height}
                  onChange={(v) => onUpdate({ cy2: v })}
                />
              </group>
            </Section>
          </>
        )}

        {/* A controls */}
        {point && point.type === "A" && !isFirst && (
          <Section title={"Arc Parameters"}>
            <group>
              <SliderRow
                label="X Radius"
                value={point.rx ?? 50}
                min={0}
                max={400}
                onChange={(v) => onUpdate({ rx: v })}
              />
              <SliderRow
                label="Y Radius"
                value={point.ry ?? 50}
                min={0}
                max={400}
                onChange={(v) => onUpdate({ ry: v })}
              />
              <SliderRow
                label="X Rotation"
                value={point.xrot ?? 0}
                min={0}
                max={360}
                onChange={(v) => onUpdate({ xrot: v })}
              />
              <ToggleRow
                label="Large Arc"
                checked={point.large ?? false}
                onChange={(v) => onUpdate({ large: v })}
              />
              <ToggleRow
                label="Sweep"
                checked={point.sweep ?? false}
                onChange={(v) => onUpdate({ sweep: v })}
              />
            </group>
          </Section>
        )}
        {/* 
<group data-space-vertical="15" >
          <separator data-horizontal=""></separator>
          </group> */}
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
export const HintsPanel: React.FC = () => (
  <group data-space="10">
    {[
      [`${isApple ? "⌘" : "Ctrl"} + Click`, "Add point"],
      ["Click", "Select point"],
      ["Drag", "Move point / handle"],
      ["Delele", "Remove selected"],
    ].map(([key, desc], index) => (
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
        <text data-opacity="50">{desc}</text>
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
