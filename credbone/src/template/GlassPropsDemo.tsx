import React, { useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";

import Glass from "../components/Glass";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import CustomSlider from "../components/inputs/slider";
import TickComponent from "../components/inputs/TickComponent";
import Tooltip from "../components/tooltip";

import glassBackdrop from "../styles/images/samples/glass_demo.mp4";
import sampleImage_4 from "../styles/images/samples/wide_res_70.webp";
import Ripple from "../components/Ripple";
import { IconPlaySolid } from "../components/icon/credIcons";

// Demo starting values (tuned for the sample photo; component defaults are in Glass.tsx)
const GLASS_DEFAULTS = {
  lightAngle: -40,
  lightIntensity: 70,
  refraction: 70,
  depth: 56,
  dispersion: 40,
  frost: 0,
  radius: 65,
  tintOpacity: 15,
  saturation: 120,
};

type GlassParams = typeof GLASS_DEFAULTS;

type GlassControl = {
  key: keyof GlassParams;
  label: string;
  start: number;
  end: number;
  step: number;
  unit?: string;
};

// Tint swatches: value goes to the Glass tint prop, swatch is the data-background preview
const GLASS_TINTS = [
  { label: "White", value: "white", swatch: "white" },
  { label: "Black", value: "black", swatch: "black" },
  { label: "Primary", value: "var(--main-color)", swatch: "main" },
  { label: "Secondary", value: "var(--secondary-color)", swatch: "secondary" },
  {
    label: "Background",
    value: "var(--background)",
    swatch: "main-background",
  },
];

const GLASS_TINT_DEFAULT = "var(--background)";

const GLASS_EXTRA_CONTROLS: GlassControl[] = [
  {
    key: "tintOpacity",
    label: "Tint Opacity",
    start: 0,
    end: 60,
    step: 1,
    unit: "%",
  },
  {
    key: "saturation",
    label: "Saturation",
    start: 0,
    end: 250,
    step: 5,
    unit: "%",
  },
];

const GLASS_CONTROLS: GlassControl[] = [
  {
    key: "lightAngle",
    label: "Light Angle",
    start: -180,
    end: 180,
    step: 5,
    unit: "°",
  },
  {
    key: "lightIntensity",
    label: "Light Intensity",
    start: 0,
    end: 100,
    step: 1,
    unit: "%",
  },
  { key: "refraction", label: "Refraction", start: 0, end: 100, step: 1 },
  { key: "depth", label: "Depth", start: 0, end: 100, step: 1 },
  { key: "dispersion", label: "Dispersion", start: 0, end: 100, step: 1 },
  { key: "frost", label: "Frost", start: 0, end: 100, step: 1 },
];

const GLASS_RADIUS_CONTROL: GlassControl = {
  key: "radius",
  label: "Radius",
  start: 0,
  end: 65,
  step: 1,
  unit: "px",
};

const GLASS_SIZE = "90";
// Glass position is its center, in % of the stage (0–100 lets half of it leave the stage)
const GLASS_POS_DEFAULT = { x: 50, y: 50 };
const GLASS_KEY_STEP = 2; // % per arrow key press, ×3 with Shift

const clampPct = (value: number) => Math.min(100, Math.max(0, value));

// Current config as Glass props, one per line, ready to paste
const getConfigText = (params: GlassParams, tint: string) =>
  [
    ...[...GLASS_CONTROLS, GLASS_RADIUS_CONTROL, ...GLASS_EXTRA_CONTROLS].map(
      ({ key }) => `${key}={${params[key]}}`,
    ),
    `tint="${tint}"`,
  ].join("\n");

const GlassPropsDemo: React.FC = () => {
  const { addSnackbar } = useSnackbar();
  const [params, setParams] = useState<GlassParams>(GLASS_DEFAULTS);
  const [tint, setTint] = useState(GLASS_TINT_DEFAULT);
  const [pos, setPos] = useState(GLASS_POS_DEFAULT);
  // Sticky: set on the first change, cleared only by Reset
  const [hasChanged, setHasChanged] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  const itemRef = useRef<HTMLElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Release a drag that ends outside the window
  useEffect(() => {
    if (!isDragging) return;
    const release = () => setIsDragging(false);
    window.addEventListener("blur", release);
    return () => window.removeEventListener("blur", release);
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    const item = itemRef.current;
    if (!item) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    // Pointer offset from the glass center, so it doesn't jump on grab
    const rect = item.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - (rect.left + rect.width / 2),
      y: e.clientY - (rect.top + rect.height / 2),
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const stage = stageRef.current;
    if (!isDragging || !stage) return;
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    setPos({
      x: clampPct(((e.clientX - rect.left - dragOffset.current.x) / rect.width) * 100),
      y: clampPct(((e.clientY - rect.top - dragOffset.current.y) / rect.height) * 100),
    });
    setHasChanged(true);
  };

  const handlePointerEnd = () => setIsDragging(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const step = e.shiftKey ? GLASS_KEY_STEP * 3 : GLASS_KEY_STEP;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    setPos((prev) => ({
      x: clampPct(prev.x + move[0]),
      y: clampPct(prev.y + move[1]),
    }));
    setHasChanged(true);
  };

  const setParam = (key: keyof GlassParams, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
    setHasChanged(true);
  };

  const selectTint = (value: string) => {
    setTint(value);
    if (value !== tint) setHasChanged(true);
  };

  const resetValues = () => {
    setParams(GLASS_DEFAULTS);
    setTint(GLASS_TINT_DEFAULT);
    setPos(GLASS_POS_DEFAULT);
    setHasChanged(false);
  };

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(getConfigText(params, tint));
      addSnackbar("Glass config copied", 1000);
    } catch (err) {
      addSnackbar("Failed to copy", 1000);
    }
  };

  const renderSlider = (control: GlassControl) => (
    <group
      key={control.key}
      data-space="3"
      data-radius="15"
      data-border=""
      data-contain=""
    >
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

      <group data-radius="12" data-contain="">
        <CustomSlider
          label=""
          start={control.start}
          end={control.end}
          step={control.step}
          value={params[control.key]}
          onValueChange={(value) => setParam(control.key, value)}
          handlerProps={{
            "data-height": "40",
            "data-background": "none",
          }}
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
        data-justify="center"
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
        data-justify="center"
      >
        <text>
          {params[control.key]}
          {control.unit}
        </text>
      </group>
    </group>
  );

  return (
    <group
      data-type="grid"
      data-grid-template="300"
      data-align="start"
      data-gap="30"
    >
      <group  data-gap="30">
        <group
         // data-border=""
          data-radius="40"
          //  data-space="10"
          data-gap="10"
          data-direction="column"
        >
          <group
            data-index="2"
            ref={stageRef}
            data-radius="30"
            // /  data-contain=""
            //  data-height="400"
          //  data-ratio="4:3"
          //  data-space="15"
          >
            <group data-contain="">
              {/* <picture
              data-contain=""
              data-brightness="adaptive"
              data-position="absolute"
              data-background="grey-light"  
              data-radius="25"
              data-object-position="right"
            >
              <img src={glassBackdrop} alt="" />
            </picture> */}

              <video
              data-brightness="adaptive"
                data-radius="40"
                //  data-position="absolute"
                src={glassBackdrop}
                autoPlay
                muted
                loop
                playsInline
                data-object-fit="cover"
                //    data-height="fit"
                data-max-length="fit"
              ></video>
            </group>

            <group
              ref={itemRef}
              data-gap="15"
              data-wrap="no"data-align="start"
              data-position="absolute"
              data-width="auto"
              data-cursor={isDragging ? "grabbing" : "grab"}
              data-touch-action="none"
              data-user-select="none"
              tabIndex={0}
              role="group"
              aria-label="Glass sample. Drag, or use the arrow keys to move it."
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
              onLostPointerCapture={handlePointerEnd}
              onKeyDown={handleKeyDown}
            >
              {/* <Glass
                {...params}
                tint={tint}
                data-length={GLASS_SIZE}
                data-height={GLASS_SIZE}
                data-align="center"
                data-justify="center"
              ></Glass> */}

<Glass


                {...params}
                tint={tint}

>

              <group data-space="25" data-color="white" data-interactive="" data-contain="" data-radius="30" data-over-color="neutral">
                <group data-interact="">
                  <IconPlaySolid size={30}/>
                </group>
              </group>

</Glass>




{/* <Glass


                {...params}
                tint={tint}

>

              <group data-space="25" data-color="white" data-interactive="" data-contain="" data-radius="30" data-over-color="neutral">
<text data-weight="700">Liquid Glass</text>
              </group>

</Glass> */}



 
            </group>
          </group>
        </group>

        <group   data-gap="10">


<Ripple>
            <group
            data-contain=""
            data-space-vertical="15"
            data-space-horizontal="20"
            data-radius="15"
            data-align="center"
            data-justify="center"
            data-background="adaptive-gray"
            data-height="45"
            data-gap="10"
            data-wrap="no"
            data-width="auto"
            data-interactive=""
            data-over-color="neutral"
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
            <group
              data-space-vertical="15"
              data-space-horizontal="20"
              data-radius="15"
              data-align="center"
              data-justify="center"
              data-background="adaptive-gray"
              data-height="45"
              data-direction="column"
              data-width="auto"
              data-interactive=""
              data-over-color="neutral"
              data-cursor="pointer"
              data-animation-name="appear-bottom"
              data-fill-mode="backwards"
              data-animation-duration="2.25"
              onClick={resetValues}
            >
              <text data-weight="600">Reset</text>
            </group>
          )}

        </group>
      </group>

      <group
        data-direction="column"
        data-gap="30"
    //    data-space="30"
        data-align="start"
      >
        <group data-gap="15">{GLASS_CONTROLS.map(renderSlider)}</group>



      </group>

      <group         data-direction="column"
        data-gap="30"
      //  data-space="30"
        data-align="start">


        <group>
          <text
            data-wrap="wrap"
            data-line="1.5"
             data-max-length="300"
            data-opacity="60"
          >
            The first six match the Glass effect in Figma. Refraction and
            dispersion need a Chromium browser; others show a frosted blur.
          </text>
        </group>

        <group data-gap="15">
          {renderSlider(GLASS_RADIUS_CONTROL)}

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
              <text>Tint</text>

              <group
                data-width="auto"
                data-gap="3"
                data-wrap="no"
                role="radiogroup"
                aria-label="Tint"
              >
                {GLASS_TINTS.map((option) => {
                  const isSelected = tint === option.value;
                  return (
                    <Tooltip key={option.value} content={option.label}>
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
                        aria-label={option.label}
                        tabIndex={0}
                        onClick={() => selectTint(option.value)}
                        onKeyDown={(e: React.KeyboardEvent) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            selectTint(option.value);
                          }
                        }}
                      >
                        <group
                          data-interact=""
                          data-height="fit"
                          data-radius="30"
                          data-border="outline"
                          data-background={option.swatch}
                        ></group>
                      </group>
                    </Tooltip>
                  );
                })}
              </group>
            </group>
          </group>

          {GLASS_EXTRA_CONTROLS.map(renderSlider)}
        </group>


      </group>
    </group>
  );
};

export default GlassPropsDemo;
