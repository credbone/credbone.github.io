import React, { useEffect, useState } from "react";
import Tooltip from "../components/tooltip";
import Ripple from "../components/Ripple";
import ConfigSlider from "../components/inputs/ConfigSlider";
import ConfigSelect, { SelectOption } from "../components/inputs/ConfigSelect";
import ConfigSwap from "../components/inputs/ConfigSwap";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";

type Placement = "top" | "bottom" | "left" | "right" | "auto" | "cursor";
type Motion = "fade" | "slide" | "zoom" | "none";
type DemoTab = "preview" | "code";

const TABS: { value: DemoTab; title: string }[] = [
  { value: "preview", title: "Preview" },
  { value: "code", title: "Code" },
];

const FLIP_OPTIONS: SelectOption[] = [
  { value: "off", name: "Off" },
  { value: "on", name: "On" },
];

const TooltipPropsDemo: React.FC = () => {
  const { addSnackbar } = useSnackbar();
  const [activeTab, setActiveTab] = useState<DemoTab>("preview");
  const [selectedPlacement, setSelectedPlacement] = useState<Placement>("auto");

  const placementOptions: SelectOption[] = [
    { value: "auto", name: "Auto", hint: "Top or bottom" },
    {
      value: "cursor",
      name: "Cursor",
      hint: "Follows the mouse",
      separator: true,
    },
    { value: "top", name: "Top" },
    { value: "bottom", name: "Bottom" },
    { value: "left", name: "Left" },
    { value: "right", name: "Right" },
  ];

  const [selectedMotion, setSelectedMotion] = useState<Motion>("fade");

  const motionOptions: SelectOption[] = [
    { value: "fade", name: "Fade" },
    { value: "slide", name: "Slide", hint: "From the trigger" },
    { value: "zoom", name: "Zoom", hint: "From the trigger" },
    { value: "none", name: "None" },
  ];

  const [selectedColor, setSelectedColor] = useState<{
    background: string;
    color: string;
  }>({
    background: "tooltip",
    color: "white",
  });

  const colorOptions = [
    { label: "Default", background: "tooltip", color: "white" },
    { label: "Primary", background: "main", color: "main-text" },
    { label: "Neutral Light", background: "neutral-light", color: "default" },
    {
      label: "Neutral Lighter",
      background: "neutral-lighter",
      color: "default",
    },
    {
      label: "Neutral Lightest",
      background: "neutral-lightest",
      color: "default",
    },
  ];

  const handleColorSelect = (option: { background: string; color: string }) => {
    setSelectedColor(option);
  };

  const [GapValue, setGapValue] = useState(10);
  const [RadiusValue, setRadiusValue] = useState(10);
  const [DelayValue, setDelayValue] = useState(0);
  const [HideDelayValue, setHideDelayValue] = useState(0);
  const [flip, setFlip] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // The cursor placement has its own fixed offset. Distance only reaches its
  // touch and keyboard fallback, so the demo leaves it at the default
  const usesDistance = selectedPlacement !== "cursor";

  // Auto picks its own side, and Cursor falls back to it
  const usesFlip = selectedPlacement !== "auto" && selectedPlacement !== "cursor";

  const [hasChanged, setHasChanged] = useState(false);

  // Check if any value has changed from the initial state
  useEffect(() => {
    if (
      selectedColor.background !== "tooltip" ||
      selectedColor.color !== "white" ||
      GapValue !== 10 ||
      RadiusValue !== 10 ||
      DelayValue !== 0 ||
      HideDelayValue !== 0 ||
      selectedMotion !== "fade" ||
      flip ||
      disabled ||
      selectedPlacement !== "auto"
    ) {
      setHasChanged(true);
    }
  }, [
    selectedColor,
    GapValue,
    RadiusValue,
    DelayValue,
    HideDelayValue,
    selectedMotion,
    flip,
    disabled,
    selectedPlacement,
  ]);

  const resetValues = () => {
    setSelectedColor({ background: "tooltip", color: "white" });
    setGapValue(10);
    setRadiusValue(10);
    setDelayValue(0);
    setHideDelayValue(0);
    setSelectedMotion("fade");
    setFlip(false);
    setDisabled(false);
    setSelectedPlacement("auto");
    setHasChanged(false); // Hide the reset button after reset
  };

  // Current config as Tooltip props [name, value], shared by the Code tab and
  // Copy Parameters. Component defaults are left out, except placement and distance
  const configProps: [string, string][] = [
    ["placement", `"${selectedPlacement}"`],
  ];
  if (usesDistance) configProps.push(["distance", `{${GapValue}}`]);
  if (DelayValue !== 0) configProps.push(["delay", `{${DelayValue}}`]);
  if (HideDelayValue !== 0)
    configProps.push(["hideDelay", `{${HideDelayValue}}`]);
  if (selectedMotion !== "fade")
    configProps.push(["motion", `"${selectedMotion}"`]);
  if (flip && usesFlip) configProps.push(["flip", "{true}"]);
  if (disabled) configProps.push(["disabled", "{true}"]);
  if (RadiusValue !== 10) configProps.push(["data-radius", `"${RadiusValue}"`]);
  if (selectedColor.background !== "tooltip") {
    configProps.push(
      ["data-background", `"${selectedColor.background}"`],
      ["data-color", `"${selectedColor.color}"`],
    );
  }

  const getConfigText = () =>
    configProps.map(([name, value]) => `${name}=${value}`).join("\n");

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(getConfigText());
      addSnackbar("Tooltip config copied", 1000);
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

  // Clipped tabs, same as Color Formats in the Color Converter
  const renderTab = (
    { value, title }: (typeof TABS)[number],
    index: number,
  ) => {
    const isActive = activeTab === value;
    return (
      <Ripple key={value}>
        <group
          data-interactive=""
          data-over-color={isActive ? "none" : "neutral"}
          data-ink-color={isActive ? "transparent" : "neutral"}
          data-cursor="pointer"
          data-contain=""
          data-align="center"
          data-gap="15"
          data-space-vertical="15"
          data-space-horizontal="40"
          data-width="auto"
          data-background={isActive ? "text" : "adaptive-gray"}
          data-color={isActive ? "main-background" : undefined}
          data-index={isActive ? "2" : undefined}
          data-clip="tab-top"
          data-clip-size="12"
          data-margin-left={index > 0 ? "-tab" : undefined}
          role="tab"
          aria-selected={isActive}
          tabIndex={0}
          onClick={() => setActiveTab(value)}
          onKeyDown={onKeyActivate(() => setActiveTab(value))}
        >
          <group data-width="auto" data-contain="">
            <text data-ellipsis="" data-opacity={isActive ? "100" : "60"}>
              {title}
            </text>
          </group>
        </group>
      </Ripple>
    );
  };

  // Click-to-flip switch, same pattern as the toggles on the Marquee page
  const renderToggle = (
    label: string,
    on: boolean,
    setOn: (on: boolean) => void,
  ) => (
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
          aria-checked={on}
          aria-label={label}
          tabIndex={0}
          onClick={() => setOn(!on)}
          onKeyDown={onKeyActivate(() => setOn(!on))}
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

  return (
    <>
      <group data-space-vertical="30">
        <separator data-horizontal="dotted" data-opacity="20"></separator>
      </group>

      <group data-direction="column" data-align="start">



<group data-direction="column" data-gap="15" data-space-horizontal="30">
  <text data-weight="700" data-text-size="large" data-font-type="hero">Configure</text>

        <text data-wrap="wrap" data-line="1.5" data-max-length="400">
          Set where the tooltip appears, how quickly and how it looks. The code
          follows the controls below, and Preview lets you try the result.
        </text>
</group>
    <group data-height="60"></group>

        <group
          data-width="auto"
          data-wrap="no"
          data-align="end"
          role="tablist"
          aria-label="Tooltip demo"
          data-space-horizontal="20"
        >
          {TABS.map(renderTab)}
        </group>

<group data-height="1" data-index="3" data-background="text"></group>
      
  

        <group >
          {activeTab === "preview" && (
            <group
           //   data-border=""
         //     data-background="main-background"
           //    data-elevation="2"
           
              data-index="2"
              data-radius-bottom="35"
              data-align="center"
              data-justify="center"
               data-min-height="280"
              data-space="30"
              data-direction="column"
              role="tabpanel"
              aria-label="Preview"
              data-contain=""
            >
              <group data-height="30"></group>
              <Tooltip
                delay={DelayValue}
                hideDelay={HideDelayValue}
                motion={selectedMotion}
                flip={flip}
                disabled={disabled}
                distance={usesDistance ? GapValue : undefined}
                content="I am a tooltip"
                placement={selectedPlacement}
                data-radius={RadiusValue}
                data-background={selectedColor.background}
                data-color={selectedColor.color}
              >
                <button
                  data-animation-name="appear-bottom"
                  data-animation-duration="2.25"
                  data-index="1"
                  data-type="group"
                  data-width="auto"
                  data-cursor="pointer"
                  data-position="center"
                  data-background="adaptive-gray"

                  data-over-color="neutral"
                  data-color="default"
                  data-interactive=""
                  data-space-vertical="15"
                  data-space-horizontal="20"
                  data-radius="15"
                >
                  <text>Hover or Touch</text>
                </button>
              </Tooltip>
            </group>
          )}

          {activeTab === "code" && (
            <group
              data-contain=""
              data-background="main-background"
              data-theme="dark"
              data-text-size="14"
              data-user-select="text"
               data-min-height="280"
              role="tabpanel"
              aria-label="Code"
              data-border=""
             data-radius-bottom="35"
            >
              <pre
                data-scroll=""
                data-space="30"
                data-animation-name="appear-bottom"
                data-animation-duration="2.25"
              >
                <code>
                  <span data-color="grey">{`<`}</span>
                  <span data-color="teal-light">Tooltip</span>
                  <br />
                  {[["content", '"I am a tooltip"'], ...configProps].map(
                    ([name, value]) => (
                      <React.Fragment key={name}>
                        {"  "}
                        <span data-color="blue-light">{name}</span>
                        <span data-color="grey">=</span>
                        <span data-color="peach">{value}</span>
                        <br />
                      </React.Fragment>
                    ),
                  )}
                  <span data-color="grey">{`>`}</span>
                  <br />
                  {"  "}
                  <span data-color="grey">{`<`}</span>
                  <span data-color="blue">button</span>
                  <span data-color="grey">{`>`}</span>
                  <br />
                  {"    Hover or Touch"}
                  <br />
                  {"  "}
                  <span data-color="grey">{`</`}</span>
                  <span data-color="blue">button</span>
                  <span data-color="grey">{`>`}</span>
                  <br />
                  <span data-color="grey">{`</`}</span>
                  <span data-color="teal-light">Tooltip</span>
                  <span data-color="grey">{`>`}</span>
                </code>
              </pre>
            </group>
          )}
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


<group data-gap="15">
            <ConfigSelect
            label="Placement"
            options={placementOptions}
            value={selectedPlacement}
            onSelect={(v) => setSelectedPlacement(v as Placement)}
          />

          <ConfigSelect
            label="Motion"
            options={motionOptions}
            value={selectedMotion}
            onSelect={(v) => setSelectedMotion(v as Motion)}
          />
</group>

          <text data-wrap="wrap" data-line="1.5" data-opacity="60">
            A tooltip can take almost any system attribute and rich content. But
            it's still a hint, so keep it short, and use a popover for anything
            interactive.
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
            label="Distance"
            start={-10}
            end={30}
            step={5}
            value={GapValue}
            onValueChange={setGapValue}
            format={(v) => `${v}px`}
            disabled={!usesDistance}
          />
          <ConfigSlider
            label="Delay"
            start={0}
            end={500}
            step={100}
            value={DelayValue}
            onValueChange={setDelayValue}
            format={(v) => `${v}ms`}
          />
          <ConfigSlider
            label="Hide Delay"
            start={0}
            end={500}
            step={100}
            value={HideDelayValue}
            onValueChange={setHideDelayValue}
            format={(v) => `${v}ms`}
          />
          <ConfigSwap
            label="Flip"
            hint="If it doesn't fit"
            options={FLIP_OPTIONS}
            value={flip ? "on" : "off"}
            onSelect={(v) => setFlip(v === "on")}
            disabled={!usesFlip}
          />
          {renderToggle("Disabled", disabled, setDisabled)}
        </group>

        <group data-direction="column" data-gap="15">
          <ConfigSlider
            label="Radius"
            start={0}
            end={30}
            step={5}
            value={RadiusValue}
            onValueChange={setRadiusValue}
            format={(v) => `${v}px`}
          />

          {/* Swatch row, same pattern as Tint on the Glass page */}
          <group data-space="3" data-radius="15" data-border="" data-contain="">
            <group
              data-height="40"
              data-align="center"
              data-justify="space-between"
              data-space-left="15"
              data-space-right="5"
              data-wrap="no"
              data-gap="10"
            >
              <text>Color</text>

              <group
                data-width="auto"
                data-gap="3"
                data-wrap="no"
                role="radiogroup"
                aria-label="Color"
              >
                {colorOptions.map(({ label, background, color }) => {
                  const isSelected = selectedColor.background === background;
                  const select = () => handleColorSelect({ background, color });
                  return (
                    <Tooltip key={background} content={label} motion="zoom">
                      <group
                        data-length="30"
                        data-height="30"
                        data-radius="30"
                        data-space={isSelected ? "10" : "5"}
                        data-transition-prop="padding"
                        data-duration="1.25"
                        data-align="center"
                        data-justify="center"
                        data-background={isSelected ? "context" : undefined}
                        data-border={isSelected ? "outline" : undefined}
                        data-interactive=""
                        data-over-color="neutral"
                        data-cursor="pointer"
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={label}
                        tabIndex={0}
                        onClick={select}
                        onKeyDown={onKeyActivate(select)}
                      >
                        <group
                          data-interact=""
                          data-height="fit"
                          data-radius="30"
                          data-border="outline"
                          data-background={background}
                        ></group>
                      </group>
                    </Tooltip>
                  );
                })}
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  );
};
export default TooltipPropsDemo;
