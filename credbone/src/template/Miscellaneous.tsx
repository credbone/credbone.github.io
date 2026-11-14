import React, { useState, useEffect, useCallback, useRef } from "react";

import Marquee from "../components/Marquee";
import Count from "../components/Coutner";

import sampleImage from "../styles/images/samples/wide_res_68.webp";
import sampleImage_2 from "../styles/images/samples/wide_res_66.webp";
import sampleImage_3 from "../styles/images/samples/wide_res_67.webp";
import sampleImage_4 from "../styles/images/samples/wide_res_70.webp";
import Ripple from "../components/Ripple";
import TemplatePageHeader from "./TemplatePageHeader";
import GlassPropsDemo from "./GlassPropsDemo";
import CustomSlider from "../components/inputs/slider";
import TickComponent from "../components/inputs/TickComponent";

// Ripple demo speed, in seconds of ink grow time (used in "slow" mode)
const RIPPLE_SPEED_SLOW = 2;
const RIPPLE_SPEED_MIN = 0.3;
const RIPPLE_SPEED_MAX = 3;


const Miscellaneous: React.FC = () => {
  const [restartKey, setRestartKey] = useState(0);
  const [rippleSpeed, setRippleSpeed] = useState(RIPPLE_SPEED_SLOW);
  const [rippleMode, setRippleMode] = useState<"slow" | "default">("slow");
  // Default mode passes no duration, so the ripple uses its own CSS timing
  const rippleDuration =
    rippleMode === "slow" ? Math.round(rippleSpeed * 1000) : undefined;

  // Segmented toggle indicator (same logic as the Blob Generator mode toggle)
  const rippleModeToggleRef = useRef<HTMLDivElement>(null);
  const rippleModeIndicatorRef = useRef<HTMLDivElement>(null);
  const [rippleModeIndicatorStyle, setRippleModeIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  // Tracks the selected option relative to the toggle container
  const updateRippleModeIndicator = useCallback(() => {
    if (!rippleModeToggleRef.current) return;

    const container = rippleModeToggleRef.current;
    const selected = container.querySelector<HTMLElement>(
      '[data-selected="true"]',
    );
    if (!selected) return;

    const containerRect = container.getBoundingClientRect();
    const selectedRect = selected.getBoundingClientRect();

    // The indicator's own data-space pads the fill inward, so grow and shift the wrapper by it
    const indicatorStyle = rippleModeIndicatorRef.current
      ? getComputedStyle(rippleModeIndicatorRef.current)
      : null;
    const padLeft = indicatorStyle ? parseFloat(indicatorStyle.paddingLeft) : 0;
    const padRight = indicatorStyle
      ? parseFloat(indicatorStyle.paddingRight)
      : 0;

    setRippleModeIndicatorStyle({
      // clientLeft offsets the container border, since absolute positioning starts inside it
      left:
        selectedRect.left - containerRect.left - container.clientLeft - padLeft,
      width: selectedRect.width + padLeft + padRight,
    });
  }, []);

  // Fire on selection change
  useEffect(() => {
    updateRippleModeIndicator();
  }, [rippleMode, updateRippleModeIndicator]);

  // Fire on resize
  useEffect(() => {
    const ro = new ResizeObserver(updateRippleModeIndicator);
    if (rippleModeToggleRef.current) ro.observe(rippleModeToggleRef.current);
    return () => ro.disconnect();
  }, [updateRippleModeIndicator]);


  const handleRestartCount = () => {
    // Increment the restart key to trigger a re-render of the Count component
    setRestartKey((prevKey) => prevKey + 1);
  };

  const [dir, setDir] = useState<"rtl" | "ltr">("ltr"); // Initialize dir state

  // Function to toggle dir attribute
  const toggleDir = () => {
    setDir((prevDir) => (prevDir === "rtl" ? "ltr" : "rtl"));
  };

  const [isAutoMode, setIsAutoMode] = useState(true);

  const toggleAutoMode = () => {
    setIsAutoMode((prevMode) => !prevMode);
  };

  return (
    <group data-space="30" data-gap="30" data-align="start">


      <TemplatePageHeader
        title="Miscellaneous"
        description="Encompasses a variety of small, diverse UI components that don't fit
          into other categories, including elements like marquees, counters and liquid glass."
        // version="1.0.2"
          type="Component"
        descriptionProps={{ "data-length": "500" }}
      />

      <group
        data-justify="start"
        data-align="start"
        data-direction="column"
        data-gap="30"
      >
        <group
          id="marquee"
          //      data-max-length="500"
          data-height="auto"
          data-max-height="fit"
          data-radius="50"
          data-contain=""
        >
          <group data-direction="column" data-justify="end">
            <picture
              data-contain=""
              data-brightness="adaptive"
              data-position="absolute"
              data-background="grey-light"
                          data-object-position="right"
            >
              <img src={sampleImage} alt="" />
            </picture>

            <group data-space="15">
              <group
                data-width="auto"
                data-background="context"
                data-direction="column"
                data-space="40"
                data-gap="10"
                data-radius="35"
                data-backdrop="20-adaptive"
              >
                <text
                  data-font-type="hero"
                  data-text-size="large"
                  data-wrap="wrap"
                  data-ellipsis=""
                >
                  Marquee
                </text>

                <text
                  data-wrap="wrap"
                  data-length="300"
                  data-line="1.5"
                  data-ellipsis=""
                >
                  Functional component that provides a marquee effect for its
                  children elements, supporting both <b>LTR</b> and <b>RTL</b>{" "}
                  directions
                </text>
              </group>
            </group>
          </group>
        </group>

        <group
          data-contain=""
          data-align="center"
          data-border=""
          data-index="2"
          data-radius="20"
        >
          <group data-contain="" dir={dir}>
            <Marquee auto={isAutoMode}>
              <group data-space="30">
                <text data-weight="600">
                  Did you know? The first computer mouse was invented in{" "}
                  <b>1964</b> by Douglas Engelbart and was made of wood. It
                  revolutionized how we interact with computers, paving the way
                  for modern UI designs we use today.
                </text>
              </group>
            </Marquee>
          </group>
        </group>

        <group data-gap="10">
<Ripple>
            <group
            data-contain=""
            data-space-vertical="15"
            data-space-horizontal="20"
            data-interactive=""
            data-cursor="pointer"
            data-radius="15"
            data-width="auto"
            // data-length="180"
            data-align="center"
            data-direction="column"
            data-background="highlight"
            onClick={toggleDir}
          >
            <text data-weight="600">Toggle Direction </text>
          </group>
</Ripple>

<Ripple>
            <group
            data-contain=""
       //   data-space-vertical="15"
            data-space-horizontal="20"
            data-height="45"
            data-interactive=""
            data-cursor="pointer"
            data-radius="15"
            data-width="auto"
            data-wrap="no"
            //   data-length="180"
            data-align="center"
           data-gap="15"
            onClick={toggleAutoMode}
            data-background={isAutoMode ? "main" : "highlight"}
            data-color={isAutoMode ? "main-text" : ""}
            data-ink-color={isAutoMode ? "main-dark" : ""}
          >
            <text>Automode</text>
                <separator data-vertical="" data-height="20"></separator>
            <text data-weight="600">
              {isAutoMode ? "Enabled" : "Disabled"}
            </text>



{/* <group data-wrap="no">
                    <text
                  data-weight="600"
                    data-ellipsis=""
                    data-transition-prop="font-size"
                    data-duration="2"
                    data-text-size={isAutoMode ? "" : "0"}
                  >
                    Enabled
                  </text>
                  <text
                  data-weight="600"
                    data-ellipsis=""
                    data-transition-prop="font-size"
                    data-duration="2"
                    data-text-size={!isAutoMode ? "" : "0"}
                  >
                    Disabled
                  </text>
</group> */}


        
          </group>
</Ripple>
        </group>


        <separator data-horizontal="dotted" data-opacity="20" data-interval="30"></separator>

        <group id="glass" data-radius="50" data-contain="">
          <group data-direction="column" data-justify="end">
            <picture
              data-contain=""
              data-brightness="adaptive"
              data-position="absolute"
              data-background="grey-light"
            >
              <img src={sampleImage_4} alt="" />
            </picture>

            <group data-space="15">
              <group
                data-width="auto"
                data-background="context"
                data-direction="column"
                data-space="40"
                data-gap="10"
                data-radius="35"
                data-backdrop="20-adaptive"
              >
                <text
                  data-font-type="hero"
                  data-text-size="large"
                  data-wrap="wrap"
                  data-ellipsis=""
                >
                  Glass
                </text>

                <text data-wrap="wrap" data-line="1.5" data-length="300">
                  Liquid glass surface that bends, splits and frosts whatever
                  sits behind it, lit by a movable <b>light</b> source.
                </text>
              </group>
            </group>
          </group>
        </group>

        <GlassPropsDemo />


        <separator data-horizontal="dotted" data-opacity="20" data-interval="30"></separator>

        <group id="count" data-radius="50" data-contain="">
          <group data-direction="column" data-justify="end">
            <picture
              data-contain=""
              data-brightness="adaptive"
              data-position="absolute"
              data-background="grey-light"
                       data-object-position="right"
            >
              <img src={sampleImage_2} alt="" />
            </picture>

            <group data-space="15">
              <group
                data-width="auto"
                data-background="context"
                data-direction="column"
                data-space="40"
                data-gap="10"
                data-radius="35"
                data-backdrop="20-adaptive"
              >
                <text
                  data-font-type="hero"
                  data-text-size="large"
                  data-wrap="wrap"
                  data-ellipsis=""
                >
                  Count
                </text>

                <text data-wrap="wrap" data-line="1.5" data-length="300">
                  Component that smoothly transitions a number from a starting
                  value <b>from</b> to an ending value <b>to</b> over a set
                  period of time <b>duration</b>.
                </text>
              </group>
            </group>
          </group>
        </group>

        <group
          data-border=""
          data-radius="30"
          data-gap="1"
          data-direction="column"
          data-type="grid"
          data-grid-template="120"
          data-contain=""
          data-length="600"
        >
          <group
            data-ratio="1:1"
            data-align="center"
            data-border=""
            data-justify="center"
          >
            <text data-text-size="xx-large" data-weight="700">
              <Count
                key={restartKey}
                from={128}
                to={256}
                duration={2000}
              ></Count>
            </text>
          </group>

          <group
            data-ratio="1:1"
            data-align="center"
            data-border=""
            data-justify="center"
          >
            <text data-text-size="xx-large" data-weight="700">
              <Count
                key={restartKey}
                from={128}
                to={64}
                //  direction="down"
                duration={2000}
              ></Count>
            </text>
          </group>

          <group
            data-ratio="1:1"
            data-align="center"
            data-border=""
            data-justify="center"
          >
            <text data-text-size="xx-large" data-weight="700">
              <Count
                key={restartKey}
                from={512}
                to={128}
                //   direction="down"
                duration={5000}
              ></Count>
            </text>
          </group>

          <group
            data-ratio="1:1"
            data-align="center"
            data-border=""
            data-justify="center"
          >
            <text data-text-size="xx-large" data-weight="700">
              <Count
                key={restartKey}
                from={128}
                to={512}
                duration={8000}
              ></Count>
            </text>
          </group>
        </group>

        <group>
<Ripple>
            <group
            data-contain=""
                      data-space-vertical="15"
            data-space-horizontal="20"
            data-interactive=""
            data-cursor="pointer"
            data-radius="15"
            data-width="auto"
            data-align="center"
            data-direction="column"
            data-background="highlight"
            onClick={handleRestartCount}
          >
            <text data-ellipsis="" data-weight="600">
              Restart Counters
            </text>
          </group>   
</Ripple>
        </group>



        <separator data-horizontal="dotted" data-opacity="20" data-interval="30"></separator>

        <group id="ripple" data-radius="50" data-contain="">
          <group  data-contain="">
            <group data-direction="column" data-justify="end">
              <picture
                data-contain=""
                data-brightness="adaptive"
                data-position="absolute"
                data-background="grey-light"
              >
                <img src={sampleImage_3} alt="" />
              </picture>

            <group data-space="15">
              <group
                data-width="auto"
                data-background="context"
                data-direction="column"
                data-space="40"
                data-gap="10"
                data-radius="35"
                data-backdrop="20-adaptive"
                >
                  <text
                    data-font-type="hero"
                    data-text-size="large"
                    data-wrap="wrap"
                    data-ellipsis=""
                  >
                    Ripple
                  </text>

                  <text data-wrap="wrap" data-line="1.5" data-length="300">
                    Ripple is a visual feedback effect for touch interactions,
                    giving users a clear indication that an element has been
                    touched.
                  </text>
                </group>
              </group>
            </group>
          </group>
        </group>

        <group data-gap="15">
          <Ripple duration={rippleDuration}>
            <group
              data-width="auto"
              data-direction="column"
              data-ink-color="neutral"
              data-cursor="pointer"
              data-border="outline"
              data-radius="30"
              data-contain=""
              data-space="30"
              data-length="forcefit"
              data-gap="20"
              data-align="start"
            >
              <group data-width="auto" data-direction="column">
                <text data-weight="600">Interact</text>
                <text data-opacity="40">Neutral Color</text>
              </group>

              <separator data-horizontal="" data-height=""></separator>

              <text
                data-wrap="wrap"
                data-line="1.5"
                data-opacity="40"
                data-length="200"
              >
                The component creates a radial ripple effect from the user's
                touch.
              </text>
            </group>
          </Ripple>

          <Ripple duration={rippleDuration}>
            <group
              data-length="forcefit"
              data-width="auto"
              data-direction="column"
              data-cursor="pointer"
              data-background="highlight"
              data-radius="30"
              data-contain=""
              data-space="30"
            >
              <text data-weight="600">Interact</text>
              <text data-opacity="30">Default Shade</text>
            </group>
          </Ripple>

          <Ripple duration={rippleDuration}>
            <group
              data-length="forcefit"
              data-width="auto"
              data-direction="column"
              data-ink-color="main-deep"
              data-cursor="pointer"
              data-background="main"
              data-color="main-text"
              data-radius="30"
              data-contain=""
              data-space="30"
            >
              <text data-weight="600">Interact</text>
              <text data-opacity="30">Primary Color</text>
            </group>
          </Ripple>
        </group>

        {/* Demo only: slows the ripple down so the animation is visible */}
        <group data-direction="column" data-gap="30">
<group >
          <text data-wrap="wrap" data-line="1.5" data-opacity="60" data-length="300">
          The ripple normally lasts 0.3s. Slow it down to watch it grow from the
          touch point and fade out.
        </text>
</group>
        <group data-gap="15" data-align="center">
          <group
            data-max-length="300"
            data-opacity={rippleMode === "slow" ? undefined : "40"}
            data-disabled={rippleMode === "slow" ? undefined : "true"}
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
                start={RIPPLE_SPEED_MIN}
                end={RIPPLE_SPEED_MAX}
                step={0.1}
                value={rippleSpeed}
                onValueChange={(value) =>
                  setRippleSpeed(Math.round(value * 10) / 10)
                }
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
              <text>Duration</text>
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
              <text>{rippleSpeed}s</text>
            </group>
          </group>

          {/* Segmented toggle, same as the (commented) Blob Generator mode toggle */}
          <group data-width="auto">
            <group
              ref={rippleModeToggleRef}
              data-gap="3"
              data-space="3"
              data-radius="15"
              data-wrap="no"
              data-width="auto"
              data-background="adaptive-gray"
            >
              {/* Rendered before the options so their labels paint above the fill */}
              <group
                ref={rippleModeIndicatorRef}
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
                  width: rippleModeIndicatorStyle.width,
                  transform: `translateX(${rippleModeIndicatorStyle.left}px)`,
                }}
              >
                <group
                  data-height="fit"
                  data-radius="12"
                  data-background="white"
                  data-border="outline"
                ></group>
              </group>
              {(["slow", "default"] as const).map((m) => (
                  <group
                  key={m}
                    data-ink-color="neutral"
                    data-over-color="neutral"
                    data-contain=""
                    data-height="40"
                    data-space-horizontal="20"
                    data-align="center"
                    data-justify="center"
                    data-selected={rippleMode === m ? "true" : undefined}
                    data-color={rippleMode === m ? "black" : ""}
                    data-radius="12"
                    data-cursor="pointer"
                    data-interactive=""
                    onClick={() => setRippleMode(m)}
                  >
                    <text>{m === "slow" ? "Slow" : "Default"}</text>
                  </group>
              ))}
            </group>
          </group>
        </group>
        </group>
      </group>
    </group>
  );
};
export default Miscellaneous;
