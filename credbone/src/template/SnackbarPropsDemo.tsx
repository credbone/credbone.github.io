import React, { ReactNode, useState } from "react";
import Count from "../components/Counter";
import Ripple from "../components/Ripple";
import ConfigSlider from "../components/inputs/ConfigSlider";
import ConfigSelect, { SelectOption } from "../components/inputs/ConfigSelect";
import {
  SnackbarProvider,
  SnackbarStack,
  useSnackbar,
} from "../components/snackbar/SnackbarContainer";

type Message = "text" | "rich" | "countdown";
type Repeat = "stack" | "replace";
type Target = "preview" | "app";

type Params = {
  message: Message;
  duration: number; // s
  repeat: Repeat;
  target: Target;
};

type AddSnackbar = ReturnType<typeof useSnackbar>["addSnackbar"];

const DEFAULTS: Params = {
  message: "text",
  duration: 3,
  repeat: "stack",
  target: "preview",
};

const MESSAGES: SelectOption[] = [
  { value: "text", name: "Text", hint: "Plain string" },
  { value: "rich", name: "Rich", hint: "Any markup" },
  { value: "countdown", name: "Countdown", hint: "Live content" },
];

const REPEATS: SelectOption[] = [
  { value: "stack", name: "Stack", hint: "Keeps earlier ones" },
  { value: "replace", name: "Replace", hint: "Clears earlier ones" },
];

const TARGETS: SelectOption[] = [
  { value: "preview", name: "Preview", hint: "Its own stack" },
  { value: "app", name: "App", hint: "Bottom of the screen" },
];

// Shown in the preview area
const HINTS: Record<Target, string> = {
  preview: "Snackbars will show here",
  app: "Snackbars will show at the bottom of the screen",
};

// Names this demo's messages, so Replace clears only them
const SOURCE = "snackbar-demo";

// The Text message: a random one each time
const TEXTS = [
  "Changes saved",
  "Welcome! You're now connected.",
  "Hey there! New notification incoming.",
  "Alert! Important message ahead.",
  "Success! Button clicked successfully.",
  "Heads up! A different message for you.",
  "Hello! How are you today?",
  "Reminder: Meeting at 2 PM tomorrow.",
  "Don't forget to check your email.",
  "You've got a new follower!",
];

// The Rich message: a random change each time. Keep them short, <text> doesn't wrap
const CHANGES: { setting: string; value: string }[] = [
  { setting: "Color", value: "Ocean" },
  { setting: "Theme", value: "Dark" },
  { setting: "Font size", value: "Large" },
  { setting: "Language", value: "English" },
  { setting: "Layout", value: "Grid" },
  { setting: "Volume", value: "80%" },
  { setting: "Speed", value: "1.5x" },
  { setting: "Quality", value: "High" },
];

// Random items, never the same one twice in a row
const createPicker = <T,>(items: T[]) => {
  let last: T | undefined;
  return () => {
    const others = items.filter((item) => item !== last);
    const next = others[Math.floor(Math.random() * others.length)];
    last = next;
    return next;
  };
};

const pickText = createPicker(TEXTS);
const pickChange = createPicker(CHANGES);

const getMessage = ({ message, duration }: Params): ReactNode => {
  if (message === "rich") {
    const { setting, value } = pickChange();
    return (
      <text>
        <text data-opacity="60">{setting} changed to </text>
        <text data-weight="700">{value}</text>
      </text>
    );
  }
  if (message === "countdown") {
    return (
      <group data-align="center" data-gap="10">
        <text data-opacity="40">Closing in </text>
        <separator data-vertical="" data-height="15"></separator>
        <text data-weight="700" data-font-feature="tnum">
          <Count
            from={duration}
            to={0}
            duration={duration * 1000}
            decimals={2}
            //  suffix="s"
            easing="linear"
          />
        </text>
      </group>
    );
  }
  return pickText();
};

const showMessage = (addSnackbar: AddSnackbar, params: Params) => {
  const ms = params.duration * 1000;
  if (params.repeat === "replace") {
    addSnackbar(getMessage(params), ms, SOURCE, true);
  } else {
    addSnackbar(getMessage(params), ms);
  }
};

const onKeyActivate = (action: () => void) => (e: React.KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    action();
  }
};

// Has to be inside the preview's own provider, so its useSnackbar() shows there.
// `addToApp` comes from outside of it
const ShowButton: React.FC<{ params: Params; addToApp: AddSnackbar }> = ({
  params,
  addToApp,
}) => {
  const { addSnackbar: addToPreview } = useSnackbar();

  const show = () =>
    showMessage(params.target === "preview" ? addToPreview : addToApp, params);

  return (
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
        onClick={show}
        onKeyDown={onKeyActivate(show)}
      >
        <text data-weight="600">Show Snackbar</text>
      </group>
    </Ripple>
  );
};

const SnackbarPropsDemo: React.FC = () => {
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

  return (
    // Adds no element, so it can hold both the preview and the controls
    <SnackbarProvider>
      <group
     //   data-background="context"
          // data-elevation="2"
    //    data-border=""
    //    data-radius="40"
        data-contain=""
        data-height="320"
        data-align="end"
        data-index="2"
      >
        {/* Behind the snackbars */}
        <group
          data-align="center"
          data-justify="center"
          data-wrap="no"
          data-space="30"
          data-text-align="center"
          data-pointer-event="none"
          data-opacity="40"
        >
          <text data-wrap="wrap" data-max-length="200" data-line="1.4">
            {HINTS[params.target]}
          </text>
        </group>
        <SnackbarStack />
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
            label="Message"
            options={MESSAGES}
            value={params.message}
            onSelect={(v) => setParam("message", v as Message)}
          />

          <text data-wrap="wrap" data-line="1.5" data-opacity="60">
            A message goes to the nearest provider around the component that
            sends it. The preview has its own, while App uses the one around the
            whole site.
          </text>

          <group data-width="auto" data-gap="30">
            <separator data-horizontal="dotted" data-opacity="20"></separator>

            <group data-gap="10" data-width="auto" data-space-bottom="15">
              <ShowButton params={params} addToApp={addSnackbar} />

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
            label="Duration"
            start={1}
            end={10}
            step={1}
            value={params.duration}
            onValueChange={(v) => setParam("duration", v)}
            format={(v) => `${v}s`}
          />
          <ConfigSelect
            label="Repeat"
            options={REPEATS}
            value={params.repeat}
            onSelect={(v) => setParam("repeat", v as Repeat)}
          />
        </group>

        <group data-direction="column" data-gap="15">
          <ConfigSelect
            label="Show In"
            options={TARGETS}
            value={params.target}
            onSelect={(v) => setParam("target", v as Target)}
          />
        </group>
      </group>
    </SnackbarProvider>
  );
};

export default SnackbarPropsDemo;
