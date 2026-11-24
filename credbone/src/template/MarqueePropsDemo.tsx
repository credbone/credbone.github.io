import React, { useState } from "react";

import Marquee, { MarqueeGap, MarqueeLoop } from "../components/Marquee";
import ConfigSlider from "../components/inputs/ConfigSlider";
import ConfigSelect, { SelectOption } from "../components/inputs/ConfigSelect";
import Ripple from "../components/Ripple";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";

import sampleImage_4 from "../styles/images/samples/sample_res/res-02.jpg";
import sampleImage_3 from "../styles/images/samples/sample_res/res-03.jpg";
import sampleImage_2 from "../styles/images/samples/sample_res/res-01.jpg";

import { IconSearch, IconShare } from "../components/icon/credIcons";



type Content = "text" | "elements";
type Mode = "auto" | "hover";
type TextDirection = "ltr" | "rtl";

type Params = {
  content: Content;
  dir: TextDirection;
  mode: Mode;
  loop: MarqueeLoop;
  speed: number; // px/s
  delay: number; // ms
  gap: MarqueeGap;
  reverse: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  fade: boolean;
};

type ToggleKey = "reverse" | "pauseOnHover" | "draggable" | "fade";

const DEFAULTS: Params = {
  content: "text",
  dir: "ltr",
  mode: "auto",
  loop: "overflow",
  speed: 90,
  delay: 0,
  gap: 20,
  reverse: false,
  pauseOnHover: true,
  draggable: true,
  fade: true,
};

const CONTENTS: SelectOption[] = [
  { value: "text", name: "Text", hint: "Long line" },
  { value: "elements", name: "Elements", hint: "Mixed UI, repeats" },
];

const MODES: SelectOption[] = [
  { value: "auto", name: "Auto", hint: "Always scrolling" },
  { value: "hover", name: "On Hover", hint: "Scrolls under the mouse" },
];

const LOOPS: SelectOption[] = [
  { value: "overflow", name: "Overflow", hint: "Only if it doesn't fit" },
  { value: "always", name: "Always", hint: "Repeats to fill" },
];

const DIRECTIONS: SelectOption[] = [
  { value: "ltr", name: "LTR", hint: "Left to right" },
  { value: "rtl", name: "RTL", hint: "Right to left" },
];

const GAPS: MarqueeGap[] = [0, 5, 10, 15, 20, 30, 50];
const GAP_OPTIONS: SelectOption[] = GAPS.map((g) => ({
  value: String(g),
  name: g === 0 ? "None" : `${g}px`,
}));

const TAGS = ["Components", "Tools & Resources", "Motion"];

// Current config as Marquee props, one per line, ready to paste. Component
// defaults are left out; content and text direction are markup
const getConfigText = (p: Params) =>
  [
    ...(p.mode === "auto" ? ["auto"] : []),
    `speed={${p.speed}}`,
    ...(p.reverse ? ["reverse"] : []),
    ...(p.loop !== "overflow" ? [`loop="${p.loop}"`] : []),
    ...(p.delay ? [`delay={${p.delay}}`] : []),
    ...(p.gap !== 20 ? [`gap={${p.gap}}`] : []),
    ...(p.pauseOnHover ? [] : ["pauseOnHover={false}"]),
    ...(p.draggable ? ["draggable"] : []),
    ...(p.fade ? [] : ["fade={false}"]),
  ].join("\n");

const MarqueePropsDemo: React.FC = () => {
  const { addSnackbar } = useSnackbar();
  const [params, setParams] = useState<Params>(DEFAULTS);
  // Sticky: set on the first change, cleared only by Reset
  const [hasChanged, setHasChanged] = useState(false);

  const setParam = <K extends keyof Params>(key: K, value: Params[K]) => {
    setParams((prev) => ({ ...prev, [key]: value }));
    setHasChanged(true);
  };

  // Elements may fit the width, so they repeat to scroll at all
  const selectContent = (content: Content) => {
    setParams((prev) => ({
      ...prev,
      content,
      loop: content === "elements" ? "always" : "overflow",
    }));
    setHasChanged(true);
  };

  const resetValues = () => {
    setParams(DEFAULTS);
    setHasChanged(false);
  };

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(getConfigText(params));
      addSnackbar("Marquee config copied", 1000);
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

  // Click-to-flip switch, same pattern as the toggles on the Tilted Card page
  const renderToggle = (key: ToggleKey, label: string, disabled = false) => {
    const on = params[key];
    return (
      <group
        data-space="3"
        data-radius="15"
        data-border=""
        data-contain=""
        data-opacity={disabled ? "40" : undefined}
        data-disabled={disabled ? "true" : undefined}
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
            aria-disabled={disabled}
            aria-label={label}
            tabIndex={disabled ? -1 : 0}
            onClick={() => setParam(key, !on)}
            onKeyDown={onKeyActivate(() => setParam(key, !on))}
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

  return (
    <group data-direction="column" data-gap="30" data-align="center">
      <group
        data-contain=""
        data-align="center"
        //   data-border=""
        data-index="2"
        data-space-vertical="30"
        data-wrap="no"
        //  data-length="600"
      >
        {!params.fade && <separator data-vertical="" data-height="90" />}
        <group data-contain="" dir={params.dir}>
          <Marquee
            // A fresh start for each content
            key={params.content}
            auto={params.mode === "auto"}
            speed={params.speed}
            reverse={params.reverse}
            loop={params.loop}
            delay={params.delay}
            gap={params.gap}
            pauseOnHover={params.pauseOnHover}
            draggable={params.draggable}
            fade={params.fade}
            data-space="40"
          >
            {params.content === "text" ? (
              <group data-height="60" data-align="center">
                <text data-text-size="xx-large" data-weight="300">
                  Did you know? The first computer mouse was invented in{" "}
                  <b>1964</b> by Douglas Engelbart and was made of wood. It
                  revolutionized how we interact with computers, paving the way
                  for modern UI designs we use today.
                </text>
              </group>
            ) : (
              <group
                data-gap="20"
                data-height="60"
                data-align="center"
                data-wrap="no"
              >
                <group
                  data-length="40"
                  data-height="40"
                  //   data-contain=""
                  data-radius="50"
                  data-justify="center"
                  data-align="center"
                  data-background="yellow-light"
                  data-color="brown-darker"
                  data-weight="700"
                >
                  <group
                    data-background="ember"
                    data-border="3-main-background"
                    data-space="4"
                    data-position="absolute"
                    data-width="auto"
                    data-radius="5"
                    data-right="0"
                    data-top="0"
                    data-index="2"
                  ></group>

                  <text>23</text>
                </group>

                <group
                  data-length="140"
                  data-height="40"
                  data-contain=""
                  data-radius="40"
                  data-background="adaptive-gray"
                  //   data-color="main-background"
                  data-align="center"
                >
                  <group
                    data-height="40"
                    data-length="40"
                    data-justify="center"
                    data-align="center"
                  >
                    <IconSearch stroke={1.5} />

                  </group>

                </group>

                <group
                  data-length="40"
                  data-height="40"
                  data-contain=""
                  data-radius="50"
                  data-justify="center"
                  data-align="center"
                >
                  <IconShare stroke={1.5} />
                </group>

                {/* <group
                  data-border="outline"
                  data-width="auto"
                  data-space="5"
                  data-radius="30"
                  data-align="center"
                  data-justify="center"
                  data-gap="10"
                  data-wrap="no"
                >
                  <group
                    data-justify="center"
                    data-align="center"
                    data-length="30"
                    data-height="30"
                    data-background="text"
                    data-color="main-background"
                    data-radius="20"
                  >
                    <text>3</text>
                  </group>
                  <text>Notifications</text>
                  <group data-length="5"></group>
                </group> */}

                <group data-wrap="no">
                  <group margin-inline-end="-10">
                    <group
                      data-length="40"
                      data-height="40"
                      data-contain=""
                      data-radius="50"
                      data-max-length="auto"
                    >
                      <picture
                        data-contain=""
                        data-brightness="adaptive"
                        //  data-position="absolute"
                        data-background="grey-light"
                      >
                        <img src={sampleImage_4} alt="" />
                      </picture>
                    </group>
                  </group>

                  <group margin-inline-end="-10">
                    <group
                      data-length="40"
                      data-height="40"
                      data-contain=""
                      data-radius="50"
                      data-max-length="auto"
                      data-border="3-main-background"
                    >
                      <picture
                        data-contain=""
                        data-brightness="adaptive"
                        //  data-position="absolute"
                        data-background="grey-light"
                      >
                        <img src={sampleImage_2} alt="" />
                      </picture>
                    </group>
                  </group>

                  <group margin-inline-end="-10">
                    <group
                      data-length="40"
                      data-height="40"
                      data-contain=""
                      data-radius="50"
                      data-max-length="auto"
                      data-border="3-main-background"
                    >
                      <picture
                        data-contain=""
                        data-brightness="adaptive"
                        //  data-position="absolute"
                        data-background="grey-light"
                      >
                        <img src={sampleImage_3} alt="" />
                      </picture>
                    </group>
                  </group>

                  <group
                    data-length="40"
                    data-height="40"
                    data-contain=""
                    data-radius="50"
                    data-justify="center"
                    data-align="center"
                    data-background="text"
                    data-weight="700"
                    data-border="3-main-background"
                    data-color="main-background"
                  >
                    <text>+2</text>
                  </group>
                </group>

                <separator data-vertical=""> </separator>

                {TAGS.map((tag) => (
                  <group
                    //   data-interactive=""
                    key={tag}
                    data-height="40"
                    data-width="auto"
                    data-space-horizontal="20"
                    data-align="center"
                    data-radius="30"
                    data-border="outline"
                    //   data-color="main-background"
                  >
                    <text>{tag}</text>
                  </group>
                ))}
              </group>
            )}
          </Marquee>
        </group>
        {!params.fade && <separator data-vertical="" data-height="90" />}
      </group>

      <group
        data-type="grid"
        data-grid-template="300"
        data-gap="30"
        data-row-gap="15"
        data-align="start"
      >
        <group data-direction="column" data-gap="30" data-align="start">
          <ConfigSelect
            label="Content"
            options={CONTENTS}
            value={params.content}
            onSelect={(v) => selectContent(v as Content)}
          />

          <text data-wrap="wrap" data-line="1.5" data-opacity="60">
            Drag or flick it either way and it settles back to its own pace.
            When reduced motion is on, it only moves by hand. Content and Text
            Direction are markup, so they aren't copied.
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
            label="Speed"
            start={10}
            end={400}
            step={10}
            value={params.speed}
            onValueChange={(v) => setParam("speed", v)}
            format={(v) => `${v}px/s`}
          />
          <ConfigSlider
            label="Delay"
            start={0}
            end={3000}
            step={100}
            value={params.delay}
            onValueChange={(v) => setParam("delay", v)}
            format={(v) => `${(v / 1000).toFixed(1)}s`}
          />
          <ConfigSelect
            label="Gap"
            options={GAP_OPTIONS}
            value={String(params.gap)}
            onSelect={(v) => setParam("gap", Number(v) as MarqueeGap)}
          />
          <ConfigSelect
            label="Loop"
            options={LOOPS}
            value={params.loop}
            onSelect={(v) => setParam("loop", v as MarqueeLoop)}
          />
        </group>

        <group data-direction="column" data-gap="15">
          <ConfigSelect
            label="Mode"
            options={MODES}
            value={params.mode}
            onSelect={(v) => setParam("mode", v as Mode)}
          />
          <ConfigSelect
            label="Text Direction"
            options={DIRECTIONS}
            value={params.dir}
            onSelect={(v) => setParam("dir", v as TextDirection)}
          />
          {renderToggle("reverse", "Reverse")}
          {renderToggle(
            "pauseOnHover",
            "Pause on Hover",
            params.mode === "hover",
          )}
          {renderToggle("draggable", "Draggable")}
          {renderToggle("fade", "Fade Edges")}
        </group>
      </group>
    </group>
  );
};

export default MarqueePropsDemo;
