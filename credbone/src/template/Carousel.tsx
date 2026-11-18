import React, { useState } from "react";

import Carousel3D, { Carousel3DItem } from "../components/Carousel3D";
import Popover from "../components/popover";
import CustomSlider from "../components/inputs/slider";
import Ripple from "../components/Ripple";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import TemplatePageHeader from "./TemplatePageHeader";

// Values data-perspective supports in control.css; the slider picks one by index
const PERSPECTIVES = [500, 1200, 2000, 3000];
const FADE = 0.3; // opacity lost per step when Fade is on

type Preset = "cylinder" | "spread";

const PRESETS: { value: Preset; name: string; hint: string }[] = [
  { value: "cylinder", name: "Cylinder", hint: "Ring" },
  { value: "spread", name: "Spread", hint: "Row" },
];

const DEFAULTS = {
  preset: "cylinder" as Preset,
  fade: false,
  count: 12,
  perspective: 3, // index into PERSPECTIVES
  gap: 20,
  ringTilt: -5,
  arc: 360,
  back: 30, // %
  tilt: 35,
  depth: 160,
};

type Params = typeof DEFAULTS;
type NumberKey = {
  [K in keyof Params]: Params[K] extends number ? K : never;
}[keyof Params];
type ToggleKey = {
  [K in keyof Params]: Params[K] extends boolean ? K : never;
}[keyof Params];

type Control = {
  key: NumberKey;
  label: string;
  start: number;
  end: number;
  step: number;
  format?: (value: number) => string;
};

const px = (v: number) => `${v}px`;
const deg = (v: number) => `${v}°`;

const GENERAL_CONTROLS: Control[] = [
  { key: "count", label: "Items", start: 5, end: 20, step: 1 },
  {
    key: "perspective",
    label: "Perspective",
    start: 0,
    end: PERSPECTIVES.length - 1,
    step: 1,
    format: (v) => px(PERSPECTIVES[v]),
  },
];

const CYLINDER_CONTROLS: Control[] = [
  { key: "gap", label: "Gap", start: 0, end: 60, step: 5, format: px },
  { key: "ringTilt", label: "Tilt", start: -20, end: 20, step: 1, format: deg },
  { key: "arc", label: "Arc", start: 90, end: 360, step: 10, format: deg },
  {
    key: "back",
    label: "Back Opacity",
    start: 0,
    end: 100,
    step: 5,
    format: (v) => `${v}%`,
  },
];

const SPREAD_CONTROLS: Control[] = [
  { key: "tilt", label: "Tilt", start: -60, end: 60, step: 5, format: deg },
  { key: "depth", label: "Depth", start: 0, end: 400, step: 10, format: px },
];

// Current config as Carousel3D props, one per line, ready to paste
const getConfigText = (p: Params) =>
  [
    ...(p.preset === "cylinder"
      ? [
          `layout="cylinder"`,
          `cylinder={{ gap: ${p.gap}, tilt: ${p.ringTilt}, arc: ${p.arc}, back: ${p.back / 100} }}`,
        ]
      : [`tilt={${p.tilt}}`, `depth={${p.depth}}`]),
    `perspective="${PERSPECTIVES[p.perspective]}"`,
    `fade={${p.fade ? FADE : 0}}`,
  ].join("\n");

const CarouselPage: React.FC = () => {
  const { addSnackbar } = useSnackbar();
  const [params, setParams] = useState<Params>(DEFAULTS);
  // Sticky: set on the first change, cleared only by Reset
  const [hasChanged, setHasChanged] = useState(false);

  const setParam = <K extends keyof Params>(key: K, value: Params[K]) => {
    setParams((prev) => ({ ...prev, [key]: value }));
    setHasChanged(true);
  };

  const resetValues = () => {
    setParams(DEFAULTS);
    setHasChanged(false);
  };

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(getConfigText(params));
      addSnackbar("Carousel config copied", 1000);
    } catch (err) {
      addSnackbar("Failed to copy", 1000);
    }
  };

  // Plain gray blocks, numbered, so the layout itself is what you see
  const items: Carousel3DItem[] = Array.from(
    { length: params.count },
    (_, i) => ({
      id: `item-${i}`,
      title: `Item ${i + 1}`,
      node: ({ centered }) => (
        <group
          data-ratio="1:1"
          data-radius="25"
          data-background={centered ? "context" : "adaptive-gray"}
          data-elevation={centered ? "2" : undefined}
          data-align="center"
          data-justify="center"
        >
          <text
            data-text-size="xx-large"
            data-weight="700"
            data-font-type="hero"
            data-opacity={centered ? undefined : "40"}
          >
            {i + 1}
          </text>
        </group>
      ),
    }),
  );

  const renderSlider = (control: Control) => {
    const value = params[control.key];
    return (
      <group
        key={control.key}
        data-space="3"
        data-radius="15"
       // data-background="adaptive-gray"
        data-contain=""
        data-border=""
      >
        <group data-radius="12" data-contain="">
          <CustomSlider
            label=""
            start={control.start}
            end={control.end}
            step={control.step}
            value={value}
            onValueChange={(v) => setParam(control.key, v)}
            handlerProps={{ "data-height": "40", "data-background": "none" }}
            fillProps={{
              "data-background": "neutral-light",
              "data-height": "40",
              "data-radius": "12",
              "data-opacity": "80",
            }}
            trackLeftProps={{ "data-background": "none" }}
            trackRightProps={{ "data-background": "none" }}
          />
        </group>

        <group
          data-position="absolute"
          data-pointer-event="none"
          data-height="fit"
          data-left="0"
          data-top="0"
          data-width="auto"
          data-align="center"
          data-space-horizontal="15"
        >
          <text>{control.label}</text>
        </group>

        <group
          data-position="absolute"
          data-pointer-event="none"
          data-height="fit"
          data-right="0"
          data-top="0"
          data-width="auto"
          data-align="center"
          data-space-horizontal="15"
        >
          <text>{control.format ? control.format(value) : value}</text>
        </group>
      </group>
    );
  };

  const isCylinder = params.preset === "cylinder";
  const presetName = PRESETS.find((p) => p.value === params.preset)?.name;

  // Same pattern as the Grid Gap selector on the Layout page
  const renderPresetSelector = () => (
    <group data-space="3" data-radius="15" data-border="" data-contain="">
      <Popover
        placement="middle"
        data-radius="15"
        data-space="0"
        data-space-vertical="10"
        content={(closePopover, isbottomsheet) => (
          <group data-direction="column" onClick={closePopover}>
            {PRESETS.map(({ value, name, hint }, index) => {
              const midIndex = Math.floor(PRESETS.length / 2);
              const distance = Math.abs(index - midIndex);
              const fromBottom = index >= midIndex;
              const selected = params.preset === value;

              return (
                <group
                  key={value}
                  onClick={() => {
                    if (!selected) setParam("preset", value);
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
              <text data-ellipsis="">Preset</text>
              <group
                data-width="auto"
                data-align="center"
                data-gap="10"
                data-wrap="no"
              >
                <text data-opacity="30">Change</text>
                <text>{presetName}</text>
              </group>
            </group>
          </Ripple>
        </group>
      </Popover>
    </group>
  );

  // Click-to-flip toggle, same as the Blob Generator "Blob Style" button,
  // stretched full width: the label fills, the value sits at the end
  const renderToggle = (key: ToggleKey, label: string) => {
    const on = params[key];
    return (
      <group key={key} data-space="3" data-radius="15" data-border="" data-contain="">
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
            aria-checked={on}
            aria-label={label}
            tabIndex={0}
            onClick={() => setParam(key, !on)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setParam(key, !on);
              }
            }}
          >
            <group data-width="auto">
              <text data-ellipsis="">{label}</text>
            </group>
<group data-width="auto" data-position="right" data-gap="15">
              {/* <separator data-vertical="" data-height="20"></separator> */}
            <group
              data-align="center"
              data-justify="center"
              data-width="auto"
              data-contain=""
            >
              {/* <text
                data-ellipsis=""
                data-transition-prop="font-size"
                data-duration="2"
                data-text-size={on ? "" : "0"}
              >
                On
              </text>
              <text
                data-ellipsis=""
                data-transition-prop="font-size"
                data-duration="2"
                data-text-size={on ? "0" : ""}
              >
                Off
              </text> */}



  <group
    data-interact=""
    data-width="auto"
    checkbox=""
    simple=""
    data-checked={on ? "true" : "false"}
  >
    <box>
      <check> </check>
    </box>
  </group>


            </group>
</group>
          </group>
        </Ripple>
      </group>
    );
  };

  return (
    <group data-space-vertical="30" data-align="start" data-contain="">
      <group data-space-horizontal="30">
        <TemplatePageHeader
          title="3D Carousel"
          description="A looping 3D carousel that lays cards out in a row or around a cylinder. Drag, swipe or use the arrow keys, and tune the layout below."
          type="Component"
          descriptionProps={{ "data-length": "500" }}
        />
      </group>

      <group
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-space-vertical="30"
        
      >
        <group data-height="30">

        </group>
        <Carousel3D
          items={items}
          cardWidth="220"
          fade={params.fade ? FADE : 0}
          perspective={String(PERSPECTIVES[params.perspective])}
          layout={params.preset}
          cylinder={{
            gap: params.gap,
            tilt: params.ringTilt,
            arc: params.arc,
            back: params.back / 100,
          }}
          tilt={params.tilt}
          depth={params.depth}
        />
      </group>

      <group
        data-space="30"
        data-type="grid"
        data-grid-template="300"
        data-gap="30"
        data-align="start"
      >

        <group data-direction="column" data-gap="30" data-align="start">
          <text data-wrap="wrap" data-line="1.5" data-opacity="60">
            Arc sets how far the cards wrap around. At 360° they form a full
            ring, and lower values open it into an arc. Back Opacity controls
            how visible the cards on the far side remain.
          </text>

<group data-width="auto" data-gap="30">
            <separator data-horizontal=""></separator>

          <group data-gap="10" data-width="auto">
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
                role="button"
                tabIndex={0}
                onClick={copyConfig}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    copyConfig();
                  }
                }}
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
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      resetValues();
                    }
                  }}
                >
                  <text data-weight="600">Reset</text>
                </group>
              </Ripple>
            )}
          </group>
</group>
        </group>

        <group data-direction="column" data-gap="10">
          {/* <text data-weight="700" data-space-left="15">
            General
          </text> */}
          {renderPresetSelector()}
          {renderToggle("fade", "Fade Side Cards")}
          {GENERAL_CONTROLS.map(renderSlider)}
        </group>

        <group data-direction="column" data-gap="10">
          {/* <text data-weight="700" data-space-left="15">
            {presetName}
          </text> */}
          {(isCylinder ? CYLINDER_CONTROLS : SPREAD_CONTROLS).map(
            renderSlider,
          )}
        </group>


      </group>
    </group>
  );
};

export default CarouselPage;
