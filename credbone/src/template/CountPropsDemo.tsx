import React, { useEffect, useRef, useState } from "react";

import Count, { CountEasing, formatCount } from "../components/Counter";
import Popover from "../components/popover";
import ConfigSlider from "../components/inputs/ConfigSlider";
import Ripple from "../components/Ripple";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";

type Preset = "counter" | "currency" | "percent" | "countdown" | "temperature";
type Separator = "none" | "," | ".";
type Status = "ready" | "counting" | "done";

type Params = {
  preset: Preset;
  from: number; // slider value, multiplied by scale
  to: number;
  scale: number;
  duration: number; // ms
  decimals: 0 | 1 | 2 | 3;
  separator: Separator;
  prefix: string;
  suffix: string;
  easing: CountEasing;
};

type Option = { value: string; name: string; hint: string };

// Each preset sets every value, so switching presets is a clean starting point
const PRESET_VALUES: Record<Preset, Omit<Params, "preset">> = {
  counter: {
    from: 128,
    to: 512,
    scale: 1,
    duration: 1500,
    decimals: 0,
    separator: "none",
    prefix: "",
    suffix: "",
    easing: "out",
  },
  currency: {
    from: 0,
    to: 12.5,
    scale: 1000,
    duration: 2500,
    decimals: 2,
    separator: ",",
    prefix: "$",
    suffix: "",
    easing: "out",
  },
  percent: {
    from: 0,
    to: 98.5,
    scale: 1,
    duration: 2000,
    decimals: 1,
    separator: "none",
    prefix: "",
    suffix: "%",
    easing: "in-out",
  },
  countdown: {
    from: 10,
    to: 0,
    scale: 1,
    duration: 10000,
    decimals: 0,
    separator: "none",
    prefix: "",
    suffix: "s",
    easing: "linear",
  },
  temperature: {
    from: 30,
    to: 22,
    scale: 1,
    duration: 900,
    decimals: 0,
    separator: "none",
    prefix: "",
    suffix: "°",
    easing: "out",
  },
};

const DEFAULTS: Params = { preset: "counter", ...PRESET_VALUES.counter };

const PRESETS: Option[] = [
  { value: "counter", name: "Counter", hint: "128 to 512" },
  { value: "currency", name: "Currency", hint: "$12,500.00" },
  { value: "percent", name: "Percent", hint: "98.5%" },
  { value: "countdown", name: "Countdown", hint: "10s to 0s" },
  { value: "temperature", name: "Temperature", hint: "30° to 22°" },
];

const SCALES: Option[] = [
  { value: "1", name: "×1", hint: "Up to 1,000" },
  { value: "100", name: "×100", hint: "Up to 100,000" },
  { value: "1000", name: "×1,000", hint: "Up to 1,000,000" },
];

const SEPARATORS: Option[] = [
  { value: "none", name: "None", hint: formatCount(12450.5, 2) },
  { value: ",", name: "Comma", hint: formatCount(12450.5, 2, ",") },
  { value: ".", name: "Dot", hint: formatCount(12450.5, 2, ".") },
];

const DECIMALS: Option[] = [0, 1, 2, 3].map((d) => ({
  value: String(d),
  name: d === 0 ? "None" : String(d),
  hint: formatCount(98.6, d),
}));

const PREFIXES: Option[] = [
  { value: "", name: "None", hint: "128" },
  { value: "$", name: "$", hint: "$128" },
  { value: "€", name: "€", hint: "€128" },
  { value: "+", name: "+", hint: "+128" },
];

const SUFFIXES: Option[] = [
  { value: "", name: "None", hint: "128" },
  { value: "%", name: "%", hint: "128%" },
  { value: "°", name: "°", hint: "128°" },
  { value: "s", name: "s", hint: "128s" },
  { value: "K", name: "K", hint: "128K" },
];

const EASINGS: Option[] = [
  { value: "out", name: "Out", hint: "Fast, then slows" },
  { value: "linear", name: "Linear", hint: "Even pace" },
  { value: "in-out", name: "In-out", hint: "Slow at both ends" },
];

const STATUS_TEXT: Record<Status, string> = {
  ready: "Press Replay to count",
  counting: "Counting…",
  done: "Done",
};

const VALUE_RANGE = { start: -100, end: 1000, step: 0.5 };
const REPLAY_DELAY = 300; // ms after the last change, so slider drags don't restart every frame

// Current config as Count props, one per line, ready to paste. Defaults are left out
const getConfigText = (p: Params) =>
  [
    `from={${p.from * p.scale}}`,
    `to={${p.to * p.scale}}`,
    `duration={${p.duration}}`,
    ...(p.decimals ? [`decimals={${p.decimals}}`] : []),
    ...(p.separator !== "none" ? [`separator="${p.separator}"`] : []),
    ...(p.prefix ? [`prefix="${p.prefix}"`] : []),
    ...(p.suffix ? [`suffix="${p.suffix}"`] : []),
    ...(p.easing !== "out" ? [`easing="${p.easing}"`] : []),
  ].join("\n");

const CountPropsDemo: React.FC = () => {
  const { addSnackbar } = useSnackbar();
  const [params, setParams] = useState<Params>(DEFAULTS);
  // Sticky: set on the first change, cleared only by Reset
  const [hasChanged, setHasChanged] = useState(false);
  // Remounts Count to replay it; 0 holds the From value until the first play
  const [playKey, setPlayKey] = useState(0);
  const [status, setStatus] = useState<Status>("ready");
  const isFirstRender = useRef(true);

  const separator = params.separator === "none" ? undefined : params.separator;

  const replay = () => {
    setStatus("counting");
    setPlayKey((k) => k + 1);
  };

  // Replay shortly after any change, so the preview always shows the current config
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = window.setTimeout(() => {
      setStatus("counting");
      setPlayKey((k) => k + 1);
    }, REPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [params]);

  const setParam = <K extends keyof Params>(key: K, value: Params[K]) => {
    setParams((prev) => ({ ...prev, [key]: value }));
    setHasChanged(true);
  };

  const selectPreset = (preset: Preset) => {
    setParams({ preset, ...PRESET_VALUES[preset] });
    setHasChanged(true);
  };

  const resetValues = () => {
    setParams(DEFAULTS);
    setHasChanged(false);
  };

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(getConfigText(params));
      addSnackbar("Count config copied", 1000);
    } catch (err) {
      addSnackbar("Failed to copy", 1000);
    }
  };

  const onKeyActivate = (action: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  const formatValue = (v: number) =>
    formatCount(
      v * params.scale,
      params.decimals,
      separator,
      params.prefix,
      params.suffix,
    );

  // Popover picker, same pattern as the selectors on the Carousel page
  const renderSelector = (
    label: string,
    options: Option[],
    current: string,
    onSelect: (value: string) => void,
  ) => (
    <group data-space="3" data-radius="15" data-border="" data-contain="">
      <Popover
        placement="middle"
        data-radius="15"
        data-space="0"
        data-space-vertical="10"
        content={(closePopover, isbottomsheet) => (
          <group data-direction="column" onClick={closePopover}>
            {options.map(({ value, name, hint }, index) => {
              const midIndex = Math.floor(options.length / 2);
              const distance = Math.abs(index - midIndex);
              const fromBottom = index >= midIndex;
              const selected = current === value;

              return (
                <group
                  key={value}
                  onClick={() => {
                    if (!selected) onSelect(value);
                  }}
                  data-background={selected ? "main" : ""}
                  data-color={selected ? "main-text" : ""}
                  data-animation-name={
                    isbottomsheet
                      ? "appear-bottom"
                      : fromBottom
                        ? "appear-top"
                        : "appear-bottom"
                  }
                  data-fill-mode="backwards"
                  data-animation-duration={
                    isbottomsheet ? 2 + index * 0.25 : 2 + distance * 0.25
                  }
                  data-align="center"
                  data-interactive=""
                  data-over-color="neutral"
                  data-radius={isbottomsheet ? "10" : undefined}
                  data-cursor="pointer"
                  data-space="15"
                  data-gap="10"
                >
                  <text>{name}</text>
                  <text data-opacity="40">{hint}</text>
                </group>
              );
            })}
          </group>
        )}
      >
        <group>
          <Ripple>
            <group
              data-height="40"
              data-radius="12"
              data-align="center"
              data-justify="space-between"
              data-gap="10"
              data-wrap="no"
              data-space-horizontal="15"
              data-interactive=""
              data-over-color="neutral"
              data-ink-color="neutral"
              data-cursor="pointer"
              data-contain=""
            >
              <text data-ellipsis="">{label}</text>
              <group
                data-width="auto"
                data-align="center"
                data-gap="10"
                data-wrap="no"
              >
                <text data-opacity="30">Change</text>
                <text>{options.find((o) => o.value === current)?.name}</text>
              </group>
            </group>
          </Ripple>
        </group>
      </Popover>
    </group>
  );

  return (
    <group data-direction="column" data-gap="30">
      <group
        //  data-border=""
        //  data-radius="40"

        data-direction="column"
        data-gap="10"
        data-space="30"
        data-contain=""
        data-align="start"
      >
        <group
          data-height="300"
          data-direction="column"
          data-align="center"
          data-justify="center"
          data-gap="30"
        >
          <group data-height="30"></group>
          {/* <text data-opacity="0">symmetry</text> */}
          <text
            //  data-font-feature="tnum"
            data-wrap="no"
            data-text-clamp="64"
            data-weight="700"
            //  data-font-type="hero"
          >
            <Count
              key={playKey}
              start={playKey > 0}
              from={params.from * params.scale}
              to={params.to * params.scale}
              duration={params.duration}
              decimals={params.decimals}
              separator={separator}
              prefix={params.prefix}
              suffix={params.suffix}
              easing={params.easing}
              onComplete={() => setStatus("done")}
              decimalProps={
                params.preset === "currency"
                  ? { "data-weight": "300" }
                  : undefined
              }
            />
          </text>
          <group data-width="auto" data-align="center" data-justify="center">
            <separator data-horizontal=""></separator>
            <group data-space="40">
              <Ripple>
                <group
                data-wrap="no"
                  data-contain=""
                  data-space-horizontal="20"
                  data-radius="15"
                  data-align="center"
                  data-justify="center"
                  data-background="adaptive-gray"
                  data-height="45"
                  data-width="auto"
                  data-interactive=""
                  data-cursor="pointer"
                  role="button"
                  tabIndex={0}
                  onClick={replay}
                  onKeyDown={onKeyActivate(replay)}
                  data-gap="15"
                >

                  {/* Duration progress: grows over the count's duration, restarts with each play.
                      Rendered first so the labels paint above it */}
                  {playKey > 0 && (
                    <group
                      key={playKey}
                      data-position="absolute"
                      data-height="fit"
                      data-left="0"
                      data-top="0"
                      data-length="fit"
                      data-background="main-alpha-15"
                      data-pointer-event="none"
                      // Visible only while a count runs; fades out once it's done
                      data-opacity={status === "counting" ? undefined : "0"}
                      data-transition-prop="opacity"
                      data-duration="2"
                      data-animation-name="grow-width"
                      data-animation-timing="linear"
                      style={{ animationDuration: `${params.duration}ms` }}
                    ></group>
                  )}

                  {/* Status swap: same font-size transition as the Blob Generator "Blob Style" button */}
                  <group
                    data-align="center"
                    data-justify="center"
                    data-width="auto"
                    data-contain=""
                    data-opacity="40"
                  >
                    {(Object.keys(STATUS_TEXT) as Status[]).map((s) => (
                      <text
                        key={s}
                        data-ellipsis=""
                        data-transition-prop="font-size"
                        data-duration="2"
                        data-text-size={status === s ? "" : "0"}
                      >
                        {STATUS_TEXT[s]}
                      </text>
                    ))}
                  </group>
                  <separator data-vertical="" data-height="20"></separator>

                  <text data-weight="700">Replay</text>




                </group>
              </Ripple>
            </group>
          </group>
        </group>
      </group>

      <group
        data-type="grid"
        data-grid-template="300"
        data-gap="30"
        data-row-gap="15"
        data-align="start"
      >
        <group data-direction="column" data-gap="30" data-align="start">
          {renderSelector("Preset", PRESETS, params.preset, (v) =>
            selectPreset(v as Preset),
          )}

          <text data-wrap="wrap" data-line="1.5" data-opacity="60">
            From and To are multiplied by Scale, so larger numbers can show the
            separator. When reduced motion is on, the count jumps straight to
            the end.
          </text>

          <group data-width="auto" data-gap="30">
            <separator data-horizontal="dotted" data-opacity="20"></separator>

            <group data-gap="10" data-width="auto" data-space-bottom="15">
              <Ripple>
                <group
                  data-contain=""
                  data-ink-color="main-deep"
                  data-space-horizontal="20"
                  data-radius="15"
                  data-align="center"
                  data-justify="center"
                  data-background="main"
                  data-color="main-text"
                  data-height="45"
                  data-width="auto"
                  data-interactive=""
                  data-cursor="pointer"
                  role="button"
                  tabIndex={0}
                  onClick={copyConfig}
                  onKeyDown={onKeyActivate(copyConfig)}
                >
                  <text data-weight="600">Copy Parameters</text>
                </group>
              </Ripple>

              {hasChanged && (
                <Ripple>
                  <group
                    data-contain=""
                    data-space-horizontal="20"
                    data-radius="15"
                    data-align="center"
                    data-justify="center"
                    data-background="adaptive-gray"
                    data-height="45"
                    data-width="auto"
                    data-interactive=""
                    data-cursor="pointer"
                    data-animation-name="appear-bottom"
                    data-fill-mode="backwards"
                    role="button"
                    tabIndex={0}
                    onClick={resetValues}
                    onKeyDown={onKeyActivate(resetValues)}
                  >
                    <text data-weight="600">Reset</text>
                  </group>
                </Ripple>
              )}
            </group>
          </group>
        </group>

        <group data-direction="column" data-gap="15">
          <ConfigSlider
            label="From"
            {...VALUE_RANGE}
            value={params.from}
            onValueChange={(v) => setParam("from", v)}
            format={formatValue}
          />
          <ConfigSlider
            label="To"
            {...VALUE_RANGE}
            value={params.to}
            onValueChange={(v) => setParam("to", v)}
            format={formatValue}
          />
          {renderSelector("Scale", SCALES, String(params.scale), (v) =>
            setParam("scale", Number(v)),
          )}
          <ConfigSlider
            label="Duration"
            start={300}
            end={10000}
            step={100}
            value={params.duration}
            onValueChange={(v) => setParam("duration", v)}
            format={(v) => `${(v / 1000).toFixed(1)}s`}
          />
          {renderSelector("Easing", EASINGS, params.easing, (v) =>
            setParam("easing", v as CountEasing),
          )}
        </group>

        <group data-direction="column" data-gap="15">
          {renderSelector("Separator", SEPARATORS, params.separator, (v) =>
            setParam("separator", v as Separator),
          )}
          {renderSelector("Decimals", DECIMALS, String(params.decimals), (v) =>
            setParam("decimals", Number(v) as Params["decimals"]),
          )}
          {renderSelector("Prefix", PREFIXES, params.prefix, (v) =>
            setParam("prefix", v),
          )}
          {renderSelector("Suffix", SUFFIXES, params.suffix, (v) =>
            setParam("suffix", v),
          )}
        </group>
      </group>
    </group>
  );
};

export default CountPropsDemo;
