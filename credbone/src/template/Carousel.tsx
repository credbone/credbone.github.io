import React, { useState } from "react";

import Carousel3D, { Carousel3DItem } from "../components/Carousel3D";
import Popover from "../components/popover";
import CustomSlider from "../components/inputs/slider";
import Ripple from "../components/Ripple";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import TemplatePageHeader from "./TemplatePageHeader";
import TickComponent from "../components/inputs/TickComponent";

import sample1 from "../styles/images/samples/sample_res/res-01.jpg";
import sample2 from "../styles/images/samples/sample_res/res-02.jpg";
import sample3 from "../styles/images/samples/sample_res/res-03.jpg";
import sample4 from "../styles/images/samples/sample_res/res-04.jpg";
import sample5 from "../styles/images/samples/sample_res/res-05.jpg";
import sample6 from "../styles/images/samples/sample_res/res-06.jpg";
import sample7 from "../styles/images/samples/sample_res/res-07.jpg";
import sample8 from "../styles/images/samples/sample_res/res-08.jpg";
import sample9 from "../styles/images/samples/sample_res/res-09.jpg";
import sample10 from "../styles/images/samples/sample_res/res-10.jpg";
import sample11 from "../styles/images/samples/sample_res/res-11.jpg";
import sample12 from "../styles/images/samples/sample_res/res-12.jpg";
import sample13 from "../styles/images/samples/sample_res/res-13.jpg";
import sample14 from "../styles/images/samples/sample_res/res-14.jpg";
import sample15 from "../styles/images/samples/sample_res/res-15.jpg";
import sample16 from "../styles/images/samples/sample_res/res-16.jpg";
import sample17 from "../styles/images/samples/sample_res/res-17.jpg";
import sample18 from "../styles/images/samples/sample_res/res-18.jpg";
import sample19 from "../styles/images/samples/sample_res/res-19.jpg";
import sample20 from "../styles/images/samples/sample_res/res-20.jpg";

// One image per item, in order (Items maxes out at 20, one per image)
const SAMPLE_IMAGES = [
  sample1, sample2, sample3, sample4, sample5, sample6, sample7,
  sample8, sample9, sample10, sample11, sample12, sample13, sample14,
  sample15, sample16, sample17, sample18, sample19, sample20
];


// Values data-perspective supports in control.css; the slider picks one by index
const PERSPECTIVES = [500, 1200, 2000, 3000];
const FADE = 0.3; // opacity lost per step when Fade is on

type Preset = "cylinder" | "spread";

const PRESETS: { value: Preset; name: string; hint: string }[] = [
  { value: "cylinder", name: "Cylinder", hint: "Ring" },
  { value: "spread", name: "Spread", hint: "Row" },
];

// Item shape: demo-only, not copied with the carousel props.
// Ratios and widths are values data-ratio / data-length support in control.css
const RATIOS = [
  { value: "1:1", name: "1:1", hint: "Square" },
  { value: "4:5", name: "4:5", hint: "Portrait" },
  { value: "3:4", name: "3:4", hint: "Portrait" },
  { value: "2:3", name: "2:3", hint: "Tall" },
  { value: "4:3", name: "4:3", hint: "Landscape" },
  { value: "16:9", name: "16:9", hint: "Wide" },
];
const WIDTHS = [140, 160, 180, 200, 220, 240, 260, 280, 300];

const DEFAULTS = {
  preset: "cylinder" as Preset,
  ratio: "3:4",
  images: true,
  width: 2, // index into WIDTHS
  radius: 30, // px; every multiple of 5 up to 50 is a data-radius value
  fade: false,
  count: 12,
  perspective: 1, // index into PERSPECTIVES
  gap: 20,
  ringTilt: -10,
  arc: 360,
  back: 30, // %
  tilt: 45,
  depth: 270,
  spread: 22, // % of the stage width between cards
  maxSpread: 170, // px cap on that distance
  sideCount: 3,
};

type Params = typeof DEFAULTS;
type NumberKey = {
  [K in keyof Params]: Params[K] extends number ? K : never;
}[keyof Params];
type SelectKey = "preset" | "ratio";
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

const WIDTH_CONTROL: Control = {
  key: "width",
  label: "Width",
  start: 0,
  end: WIDTHS.length - 1,
  step: 1,
  format: (v) => px(WIDTHS[v]),
};

const RADIUS_CONTROL: Control = {
  key: "radius",
  label: "Radius",
  start: 0,
  end: 50,
  step: 5,
  format: px,
};

const SPREAD_CONTROLS: Control[] = [
  { key: "tilt", label: "Tilt", start: -60, end: 60, step: 5, format: deg },
  { key: "depth", label: "Depth", start: 0, end: 400, step: 10, format: px },
  {
    key: "spread",
    label: "Spread",
    start: 5,
    end: 50,
    step: 1,
    format: (v) => `${v}%`,
  },
  {
    key: "maxSpread",
    label: "Max Spread",
    start: 60,
    end: 400,
    step: 10,
    format: px,
  },
  { key: "sideCount", label: "Side Cards", start: 1, end: 5, step: 1 },
];

// The demo applies one spread to both breakpoints
const spreadOf = (p: Params) => ({
  spread: p.spread / 100,
  maxSpread: p.maxSpread,
  sideCount: p.sideCount,
});
const spreadText = (p: Params) =>
  `spread: ${p.spread / 100}, maxSpread: ${p.maxSpread}, sideCount: ${p.sideCount}`;

// Current config as Carousel3D props, one per line, ready to paste
const getConfigText = (p: Params) =>
  [
    ...(p.preset === "cylinder"
      ? [
          `layout="cylinder"`,
          `cylinder={{ gap: ${p.gap}, tilt: ${p.ringTilt}, arc: ${p.arc}, back: ${p.back / 100} }}`,
        ]
      : [
          `tilt={${p.tilt}}`,
          `depth={${p.depth}}`,
          `desktop={{ ${spreadText(p)} }}`,
          `mobile={{ ${spreadText(p)} }}`,
        ]),
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
          data-ratio={params.ratio}
          data-radius={String(params.radius)}
          data-background={centered ? "context" : "adaptive-gray"}
          data-border={centered ? "outline" : undefined}
          data-align="center"
          data-justify="center"
          data-contain=""
         
        >


        {params.images && (
        <picture

          data-contain=""
          data-brightness={centered ? undefined : "adaptive"}
          data-background="grey-light"
          data-position="absolute"
          data-object-position="right"
        >
          <img src={SAMPLE_IMAGES[i % SAMPLE_IMAGES.length]} alt="" />
        </picture>
        )}

          {!params.images && (
          <text
            data-text-size="large"
          //  data-weight="700"
           // data-font-type="hero"
           data-font-feature="tnum"
            data-opacity={centered ? undefined : "40"}
          >
            {i + 1}
          </text>
          )}
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


      <group
        data-position="absolute"
        data-width="fit"
        data-left="0"
        data-top="0"
        data-space-horizontal="25"
        data-height="fit"
        data-align="center"
        data-mask="left-right"
        data-pointer-event="none"
      >
        <TickComponent
          tickCount={18}
          emphasizeCenter={false}
          data-opacity="70"
          data-align="center"
          heights={{ minor: 8, major: 8, center: 30 }}
        ></TickComponent>
      </group>

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

  // Popover picker, same pattern as the Grid Gap selector on the Layout page
  const renderSelector = (
    key: SelectKey,
    label: string,
    options: { value: string; name: string; hint: string }[],
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
              const selected = params[key] === value;

              return (
                <group
                  key={value}
                  onClick={() => {
                    if (!selected) setParam(key, value as Params[SelectKey]);
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
                <text>{options.find((o) => o.value === params[key])?.name}</text>
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
          cardWidth={String(WIDTHS[params.width])}
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
          // Spread layout only; a cylinder takes its spacing from gap
          desktop={isCylinder ? undefined : spreadOf(params)}
          mobile={isCylinder ? undefined : spreadOf(params)}
        />
      </group>

      <group
        data-space="30"
        data-type="grid"
        data-grid-template="300"
        data-gap="30"
        data-align="start"
        data-row-gap="15"
      >

        <group data-direction="column" data-gap="30"  data-align="start">
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

        <group data-direction="column" data-gap="15">
          {/* <text data-weight="700" data-space-left="15">
            General
          </text> */}
          {renderSelector("preset", "Preset", PRESETS)}
          {renderToggle("fade", "Fade Side Cards")}
          {GENERAL_CONTROLS.map(renderSlider)}
        </group>

        <group data-direction="column" data-gap="15">
          {/* <text data-weight="700" data-space-left="15">
            {presetName}
          </text> */}
          {(isCylinder ? CYLINDER_CONTROLS : SPREAD_CONTROLS).map(
            renderSlider,
          )}
        </group>


      </group>



<group data-space="30">
  <separator data-horizontal="dotted" data-opacity="20"></separator>
</group>


{/* Item shape: demo-only, not part of Copy Parameters */}



        <group data-direction="column" data-gap="10" data-space-horizontal="30" data-length="340">

          <text data-wrap="wrap" data-line="1.5" data-opacity="60" >
            Shape of the sample cards. The ring adapts to the card width on
            its own.
          </text>
        </group>



      <group
        data-space="30"
        data-type="grid"
        data-grid-template="300"
        data-gap="30"
        data-row-gap="15"
        data-align="start"
      >


          {renderSelector("ratio", "Ratio", RATIOS)}
          {renderToggle("images", "Show Images")}
          {renderSlider(WIDTH_CONTROL)}
          {renderSlider(RADIUS_CONTROL)}

      </group>



    </group>
  );
};

export default CarouselPage;
