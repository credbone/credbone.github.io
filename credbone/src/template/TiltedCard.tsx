import React, { useState } from "react";

import TiltedCard, {
  TiltedCardAxis,
  TiltedCardLayer,
} from "../components/TiltedCard";
import Popover from "../components/popover";
import ConfigSlider from "../components/inputs/ConfigSlider";
import Ripple from "../components/Ripple";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import TemplatePageHeader from "./TemplatePageHeader";

import sample1 from "../styles/images/samples/res-card-01.webp";
import sample2 from "../styles/images/samples/sample_res/res-19.jpg";
import sample3 from "../styles/images/samples/sample_res/res-03.jpg";
import sample12 from "../styles/images/samples/sample_res/res-12.jpg";
import { ArrowRight } from "lucide-react";
import { IconPlaySolid } from "../components/icon/credIcons";


const ROW = [
  { image: sample2, title: "Morning", caption: "Soft light" },
  { image: sample3, title: "Noon", caption: "Hard shadows" },
  { image: sample12, title: "Evening", caption: "Long colors" },
];

// Values data-perspective supports in control.css; the slider picks one by index
// Short = dramatic depth, long = flat and even
const PERSPECTIVES = [
  300, 500, 800, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000,
];

const AXES: { value: TiltedCardAxis; name: string; hint: string }[] = [
  { value: "both", name: "Both", hint: "All directions" },
  { value: "x", name: "X", hint: "Up & down" },
  { value: "y", name: "Y", hint: "Left & right" },
];

type Demo = "card" | "gallery" | "product";

const DEMOS: { value: Demo; name: string; hint: string }[] = [
  { value: "card", name: "Card", hint: "Single" },
  { value: "gallery", name: "Gallery", hint: "Three cards" },
 // { value: "product", name: "Product", hint: "Configurator" },
];

// Depth Layers off flattens every layer onto the card (demo markup, not a card prop)
const layerDepth = (layers: boolean | undefined, depth: number) =>
  layers ? depth : 0;

// Demo starting values, tuned for the showcase (the component's own
// defaults are milder: maxTilt 12, lift 20, perspective 1000, smoothing 100).
// demo picks what the stage shows; Reset and Copy Parameters both leave it alone.
const DEFAULTS = {
  demo: "card" as Demo,
  axis: "both" as TiltedCardAxis,
  maxTilt: 20,
  lift: 35,
  scale: 100, // %
  perspective: PERSPECTIVES.indexOf(1000),
  smoothing: 140, // ms
  reverse: true,
  float: false,
  layers: true,
};

type Params = typeof DEFAULTS;
type NumberKey = {
  [K in keyof Params]: Params[K] extends number ? K : never;
}[keyof Params];
type SelectKey = "demo" | "axis";
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

const CONTROLS: Control[] = [
  {
    key: "maxTilt",
    label: "Tilt",
    start: 0,
    end: 45,
    step: 1,
    format: (v) => `${v}°`,
  },
  {
    key: "lift",
    label: "Lift",
    start: 0,
    end: 60,
    step: 5,
    format: (v) => `${v}px`,
  },
  {
    key: "scale",
    label: "Scale",
    start: 100,
    end: 115,
    step: 1,
    format: (v) => `${v}%`,
  },
  {
    key: "perspective",
    label: "Perspective",
    start: 0,
    end: PERSPECTIVES.length - 1,
    step: 1,
    format: (v) => `${PERSPECTIVES[v]}px`,
  },
  {
    key: "smoothing",
    label: "Smoothing",
    start: 0,
    end: 400,
    step: 20,
    format: (v) => `${v}ms`,
  },
];

// Current config as TiltedCard props, one per line, ready to paste
const getConfigText = (p: Params) =>
  [
    `axis="${p.axis}"`,
    `maxTilt={${p.maxTilt}}`,
    `lift={${p.lift}}`,
    `scale={${p.scale / 100}}`,
    `perspective="${PERSPECTIVES[p.perspective]}"`,
    `smoothing={${p.smoothing}}`,
    `reverse={${p.reverse}}`,
    `float={${p.float}}`,
  ].join("\n");

interface MainCardFaceProps {
  layers?: boolean; // lift the title and photo above the card while it's active
}

// Face of the main, configurable card. It keeps 3D and doesn't clip, so the
// title and photo can rise as separate layers.
const MainCardFace: React.FC<MainCardFaceProps> = ({ layers }) => (
  <group
    data-direction="column"
    // data-background="context"
    // data-elevation="2"
    //   data-border=""
    //   data-interactive=""
    data-over-color="neutral"
    data-radius="40"
    data-space="20"
    data-gap="10"
    data-transform-style="preserve-3d"
    data-length="280"
    data-color="white"
  >
    <TiltedCardLayer
      data-position="absolute"
      data-left="0"
      data-space="10"
      data-contain=""
      data-top="0"
      data-height="fit"
      depth={layerDepth(layers, 20)}
    >
      <group
        data-length="fit"
        data-contain=""
        data-interact=""
        data-radius="30"
      >
        <picture
          data-position="absolute"
          data-height="fit"
          data-background="grey-light"
        >
          <img src={sample1} alt="" />
        </picture>
      </group>
    </TiltedCardLayer>

    <TiltedCardLayer depth={layerDepth(layers, 40)}>
      <group
        data-direction="column"
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="3.25"
        data-gap="15"
        data-space="15"
      >
        <text data-opacity="40" data-wrap="wrap">
          Switzerland · 7 nights
        </text>
        <text
          data-text-size="large"
          data-wrap="wrap"
          data-font-type="hero"
          data-weight="700"
          data-line="1"
        >
          Swiss Alpine <br></br>Retreat
        </text>
        <group data-height="10"></group>
        <text data-opacity="60" data-wrap="wrap">
          Snowy peaks, glassy lakes and quiet villages, a world away from the
          everyday.
        </text>
      </group>
    </TiltedCardLayer>

    <TiltedCardLayer depth={layerDepth(layers, 50)}>
      <group
        data-direction="column"
        data-gap="5"
        data-space="15"
        data-align="start"
                data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="2.25"
      >
        <group data-width="auto" data-gap="40">
          <separator data-horizontal=""></separator>

          <group data-direction="column">
            <text data-opacity="60" data-wrap="wrap">
              Per person from
            </text>
            <text
              data-text-size="x-large"
              data-wrap="wrap"
              data-font-type="hero"
              data-weight="700"
            >
              $1,499
            </text>
          </group>
        </group>
      </group>
    </TiltedCardLayer>
    <group data-height="50"></group>
    <TiltedCardLayer depth={layerDepth(layers, 60)}>
      <group
        data-space="15"
        data-radius="30"
        //   data-background="white"
        // data-color="white"
        // data-backdrop="20-light"

       

        data-background="yellow-light" data-color="brown-darker"

        data-cursor="pointer"
        data-interactive=""
        data-interact=""
        data-align="center"
        data-height="45"
        data-wrap="no"

                data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="1.25"
      >
<group data-space-horizontal="5">
          <text>Explore the Trip</text>
</group>
        <group
          data-width="auto"
          data-opacity="40"
          data-interact=""
          data-position="right"
        >
          <ArrowRight size={20} strokeWidth={1.5} />
        </group>
      </group>
    </TiltedCardLayer>
  </group>
);

interface CardFaceProps {
  image: string;
  title: string;
  caption: string;
  layers?: boolean; // lift the photo, play icon and title while it's active
}

// Face of the small cards in the default row
const CardFace: React.FC<CardFaceProps> = ({
  image,
  title,
  caption,
  layers,
}) => (
  <group
    data-direction="column"
    // data-border=""
    // data-radius="20"
    //  data-space="5"
    data-gap="5"
    data-transform-style="preserve-3d"
    data-ratio="1:1"
    data-cursor="pointer"
    data-interactive=""
    data-over-color="none"
  >
    <TiltedCardLayer
      data-position="absolute"
      data-radius="25"
      data-contain=""
      data-height="fit"
      depth={layerDepth(layers, 20)}
    >
      <picture data-position="absolute" data-background="grey-light">
        <img src={image} alt="" />
      </picture>
    </TiltedCardLayer>

    <TiltedCardLayer
      data-position="absolute"
      data-height="fit"
      data-space="15"
      data-align="center"
      data-justify="center"
      depth={layerDepth(layers, 60)}
    >
      <group
        data-space="25"
        data-color="white"
        data-contain=""
        data-width="auto"
      >
        <group data-interact="">
          <IconPlaySolid size={50} />
        </group>
      </group>
    </TiltedCardLayer>

    <TiltedCardLayer
      data-height="fit"
      data-space="15"
      data-align="center"
      depth={layerDepth(layers, 40)}
    >
      <group
        data-direction="column"
        data-align="center"
        data-position="bottom"
        data-color="white"
      >
        <text
          data-text-size="medium-small"
          data-font-type="hero"
          data-weight="700"
        >
          {title}
        </text>
        <text data-opacity="60">{caption}</text>
      </group>
    </TiltedCardLayer>
  </group>
);

// Face of the Product demo: a blank card for the buds configurator, to be
// designed. Keeps 3D so TiltedCardLayers can go inside later.
const ProductCardFace: React.FC = () => (
  <group
    data-background="context"
    data-elevation="2"
    data-radius="30"
    data-ratio="3:4"
    data-length="300"
    data-transform-style="preserve-3d"
  >


    
  </group>
);

const TiltedCardPage: React.FC = () => {
  const { addSnackbar } = useSnackbar();
  const [params, setParams] = useState<Params>(DEFAULTS);
  // Sticky: set on the first change, cleared only by Reset
  const [hasChanged, setHasChanged] = useState(false);

  const setParam = <K extends keyof Params>(key: K, value: Params[K]) => {
    setParams((prev) => ({ ...prev, [key]: value }));
    // Switching the demo is a view choice, not a setting to reset
    if (key !== "demo") setHasChanged(true);
  };

  // Restores the settings but keeps the selected demo
  const resetValues = () => {
    setParams((prev) => ({ ...DEFAULTS, demo: prev.demo }));
    setHasChanged(false);
  };

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(getConfigText(params));
      addSnackbar("Card config copied", 1000);
    } catch (err) {
      addSnackbar("Failed to copy", 1000);
    }
  };

  // Tick slider, same pattern as the sliders on the Carousel page
  const renderSlider = (control: Control) => (
    <ConfigSlider
      key={control.key}
      label={control.label}
      start={control.start}
      end={control.end}
      step={control.step}
      value={params[control.key]}
      onValueChange={(v) => setParam(control.key, v)}
      format={control.format}
    />
  );

  // Popover picker, same pattern as the selectors on the Carousel page
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
                <text>
                  {options.find((o) => o.value === params[key])?.name}
                </text>
              </group>
            </group>
          </Ripple>
        </group>
      </Popover>
    </group>
  );

  // Click-to-flip switch, same pattern as the toggles on the Carousel page
  const renderToggle = (key: ToggleKey, label: string) => {
    const on = params[key];
    return (
      <group
        key={key}
        data-space="3"
        data-radius="15"
        data-border=""
        data-contain=""
      >
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
            <group data-width="auto" data-position="right">
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
        </Ripple>
      </group>
    );
  };

  // Every demo card follows the controls
  const cardProps = {
    axis: params.axis,
    maxTilt: params.maxTilt,
    lift: params.lift,
    scale: params.scale / 100,
    perspective: String(PERSPECTIVES[params.perspective]),
    smoothing: params.smoothing,
    reverse: params.reverse,
    float: params.float,
  };

  const runOnKey = (action: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <group data-space-vertical="30" data-align="start" data-contain="">
      <group data-space-horizontal="30">
        <TemplatePageHeader
          title="Tilted Card"
          description="A card that floats and tilts toward the pointer in 3D. Hover it, or hold a finger on it on touch screens, and tune the motion below."
          version="1.0.0"
          type="Component"
          descriptionProps={{ "data-length": "500" }}
        />
      </group>

      <group data-direction="column">
        <group data-space="30">
          <group data-height="30"></group>
          <group data-justify="center">
            {params.demo === "card" ? (
              <group data-justify="center" data-space="30">
                <group
                  data-width="auto"
                  data-animation-name="appear-bottom"
                  data-animation-duration="2.25"
                >
                  <TiltedCard {...cardProps}>
                    <MainCardFace layers={params.layers} />
                  </TiltedCard>
                </group>
              </group>
            ) : params.demo === "product" ? (
              <group data-justify="center" data-space="30">
                <group
                  data-width="auto"
                  data-animation-name="appear-bottom"
                  data-animation-duration="2.25"
                >
                  <TiltedCard {...cardProps}>
                    <ProductCardFace />
                  </TiltedCard>
                </group>
              </group>
            ) : (
              <group
                data-gap="30"
                data-justify="center"
                data-space="30"
                //  data-space-vertical="50"
                data-direction="column-1200"
                data-width="auto"
              >
                {ROW.map((card, index) => (
                  <group
                    key={card.title}
                    data-length="200"
                    data-animation-name="appear-bottom"
                    data-animation-duration={3 + index * 0.75}
                  >
                    <TiltedCard {...cardProps}>
                      <CardFace {...card} layers={params.layers} />
                    </TiltedCard>
                  </group>
                ))}
              </group>
            )}
          </group>
        </group>

        <group
          data-space="30"
          data-type="grid"
          data-grid-template="300"
          data-gap="30"
          data-row-gap="15"
          data-align="start"
        >
          <group data-direction="column" data-gap="30" data-align="start">
            <group data-direction="column" data-gap="15">
              {renderSelector("demo", "Demo", DEMOS)}
            </group>

            <text data-wrap="wrap" data-line="1.5" data-opacity="60">
              Tune how the card tilts, lifts and follows the pointer. Depth
              Layers is markup, so it isn't copied.
            </text>

            <group data-width="auto" data-gap="30">
              <separator data-horizontal="dotted" data-opacity="30"></separator>

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
                    onKeyDown={runOnKey(copyConfig)}
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
                      data-animation-duration="2.25"
                      role="button"
                      tabIndex={0}
                      onClick={resetValues}
                      onKeyDown={runOnKey(resetValues)}
                    >
                      <text data-weight="600">Reset</text>
                    </group>
                  </Ripple>
                )}
              </group>
            </group>
          </group>

          <group data-direction="column" data-gap="15">
            {renderSelector("axis", "Axis", AXES)}
            {renderToggle("reverse", "Reverse")}
            {renderToggle("float", "Idle Float")}
            {renderToggle("layers", "Depth Layers")}
          </group>

          <group data-direction="column" data-gap="15">
            {CONTROLS.map(renderSlider)}
          </group>
        </group>
      </group>
    </group>
  );
};

export default TiltedCardPage;
