import React, { useState, useEffect, useRef, useCallback } from "react";
import Ripple from "../components/Ripple";

import {
  SvgTimerDigits,
  SvgTimerHand,
  SvgTimerIndex,
} from "../components/icon/svgRes";
import Popover from "../components/popover";

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centis = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")} . ${String(centis).padStart(2, "0")}`;
}

const StopWatch: React.FC = () => {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<{ index: number; time: number }[]>([]);

  const startedAtRef = useRef<number | null>(null);
  const baseElapsedRef = useRef(0);

  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setElapsed(
        baseElapsedRef.current +
          (Date.now() - (startedAtRef.current ?? Date.now())),
      );
    }, 16);
    return () => clearInterval(id);
  }, [running]);

  const handleStart = useCallback(() => {
    if (running) return;
    startedAtRef.current = Date.now();
    setRunning(true);
  }, [running]);

  const handleStop = useCallback(() => {
    if (!running) return;
    baseElapsedRef.current += Date.now() - (startedAtRef.current ?? Date.now());
    setElapsed(baseElapsedRef.current);
    setRunning(false);
  }, [running]);

  const handleReset = useCallback(() => {
    // Freeze the hand first, then remount the animation wrapper on the next
    // microtask so the paused state is painted before the key flip — no flicker.
    setRunning(false);
    baseElapsedRef.current = 0;
    startedAtRef.current = null;
    setElapsed(0);
    setLaps([]);
    setTimeout(() => setAnimationKey((k) => k + 1), 0);
  }, []);

  const handleLap = useCallback(() => {
    const snapshot =
      baseElapsedRef.current +
      (startedAtRef.current != null ? Date.now() - startedAtRef.current : 0);
    setLaps((prev) => [{ index: prev.length + 1, time: snapshot }, ...prev]);
  }, []);

  const isIdle = elapsed === 0 && !running;
  const isRunning = running;
  const isPaused = elapsed > 0 && !running;

  return (
    <group data-gap="20" data-space="10">
      <group
        data-index="2"
        data-height="auto"
        data-max-height="fit"
        //  data-border=""
        data-contain=""
        data-space-top="0"
        //  data-elevation="2"
        data-radius="full"
        // data-background="text"
        // data-color="main-background"
      >
        <group data-direction="column" data-space="10">
          <group data-ratio="1:1">
            <SvgTimerIndex />

            {/* ── Number labels ── */}
            <SvgTimerDigits />

            {/* ── Hand — original data-attribute CSS animation, play-state toggled ── */}
            <group
              data-position="absolute"
              data-height="fit"
              data-animation-name="reset"
              data-animation-duration="3"
              key={animationKey}
            >
              <group
                data-height="fit"
                data-animation-name="rotate"
                data-animation-duration="60"
                data-animation-timing="steps-360"
                data-animation-interation="infinite"
                data-animation-play-state={running ? "running" : "paused"}
              >
                <SvgTimerHand />
              </group>
            </group>
          </group>
        </group>
      </group>

      <group
        data-align="center"
        data-justify="center"
        data-direction="column"
        data-width="auto"
        data-position="center"
        data-gap="20"
      >
        <separator data-horizontal="" />
        <group data-space-horizontal="20" data-width="auto">
          <text
       //     data-weight="700"
            data-text-size="medium"
            data-font-feature="tnum"
          >
            {formatTime(elapsed)}
          </text>
        </group>
      </group>

      <group  data-gap="10">
        <group>
          <group data-wrap="no" >
       
            {/* MAIN BUTTON */}
            <Ripple>
              <group
              data-ink-color="gray-shade-20"
              data-over-color="neutral"
                data-fit="1"
                data-contain=""
                data-space="15"
                data-interactive=""
                data-cursor="pointer"
                data-radius="15"
                data-align="center"
                data-direction="column"
                data-background={
                  isIdle
                    ? "text"
                    : isRunning
                      ? "ember"
                      : "adaptive-gray"
                }
                data-color={isIdle ? "main-background" : isRunning ? "white" : ""}
                onClick={
                  isIdle ? handleStart : isRunning ? handleStop : handleStart
                }
              >
                <text data-weight="700">{isIdle ? "Start" : isRunning ? "Stop" : "Resume"}</text>
              </group>
            </Ripple>

            {/* SECONDARY BUTTON */}
<group                 data-fit={!isIdle ? "1" : "0"}
                data-duration=".225"
                data-transition-prop="flex"
                data-contain=""
                data-wrap="no"
                >

<group data-length="10" ></group>

              <Ripple>
              <group
                
                data-duration=".225"
                data-transition-prop="opacity"
                data-contain=""
                data-space="15"

                data-opacity={!isIdle ? undefined : "0"}
                data-interactive=""
                data-over-color="neutral"
                data-cursor="pointer"
                data-radius="15"
                data-justify="center"
                onClick={isRunning ? handleLap : handleReset}
                data-background={isRunning ? "adaptive-gray" : ""}
              >
                <text>{isRunning ? "Lap" : "Reset"}</text>
              </group>
            </Ripple>
</group>
          </group>
        </group>

        <group>
          <group data-direction="column" data-wrap="no">
            {laps.length === 0 ? (
              <group data-align="center" data-justify="center" data-space="15">
                <text>No Laps Recorded</text>
              </group>
            ) : (
              <Popover
                placement="top"
                // data-backdrop="20"
                data-radius="25"
                data-space="0"
                data-scroll=""
                data-scrollbar="none"
                
                data-length="220"

                content={(closePopover) => (
                  <group data-max-height="270">



                    <group
                      data-direction="column"
                      data-space="10"
                      data-wrap="no"
                      data-contain=""
                      data-space-bottom="0"
                     
                      //   data-scroll=""
                    >


                      
                      {laps.map((lap, index) => (
                        <group
                          key={lap.index}
                          data-shrink="no"
                          data-name="autoseparation"
                          data-contain=""
                          data-animation-name="appear-bottom"
                          data-fill-mode="backwards"
                          data-animation-duration={2 + index * 0.25}
                        >
                          <separator
                            data-horizontal=""
                            data-opacity="5"
                          />
                          <group
                            data-gap="15"
                            data-align="center"
                            data-space="15"
                            data-contain=""
                            data-radius="15"
                            data-interactive=""
                            data-over-color="neutral"
                            data-wrap="no"
                          >
                            <text data-font-feature="tnum" data-weight="700">
                              {String(lap.index).padStart(2, "0")}
                            </text>
                            <group />
                            <text data-font-feature="tnum">
                              {formatTime(lap.time)}
                            </text>
                          </group>
                        </group>
                      ))}
                    </group>

                    <group
                      data-space="10"
                      data-background="context-bottom"
                      data-shrink="no"
                      data-position="sticky"
                      data-bottom="0"
                      data-index="3"
                      data-wrap="no"
                      data-gap="10"
                    >
                      
                      <Ripple>
                        <group
                          onClick={closePopover}
                          data-over-color="neutral"
                          data-ink-color="neutral"
                          data-contain=""
                          data-space="15"
                          data-radius="15"
                          data-interactive=""
                          data-align="center"
                          data-justify="center"
                          data-cursor="pointer"
                          data-backdrop="20"
                        >
                          <text data-weight="600">Done</text>
                        </group>
                      </Ripple>
{/* 
                      <Ripple>
                        <group

                         onClick={handleLap} 
                          data-width="auto"
                          data-over-color="neutral"
                          data-ink-color="neutral"
                          data-contain=""
                          data-space="15"
                          data-radius="15"
                          data-interactive=""
                          data-align="center"
                          data-justify="center"
                          data-cursor="pointer"
                          data-backdrop="20"
                        >
                          <text data-weight="600">+</text>
                        </group>
                      </Ripple> */}

                    </group>
                  </group>
                )}
              >
                {/* Opener — always shows the latest lap (laps[0] since list is prepended) */}
                <group

                  data-shrink="no"
                  data-pointer-event={laps.length > 1 ? undefined : "none"}
                >
<Ripple>
                    <group
                    data-contain=""
                    data-gap="10"
                    data-align="center"
                    data-space="15"
                    //  data-contain=""
                    data-radius="15"
                 //   data-border=""

                    data-interactive=""
                    data-over-color="neutral"
                    data-cursor={laps.length > 1 ? "pointer" : undefined}
                    data-wrap="no"
                  >
    <text data-font-feature="tnum" data-weight="700">
                      {String(laps[0].index).padStart(2, "0")}
                    </text><separator data-vertical="" data-height="fit" />
                    <group />
                    <text data-font-feature="tnum">
                      {formatTime(laps[0].time)}
                    </text>
                    {laps.length > 1 && (
                      <>
                        <separator data-vertical="" data-height="fit" />
                        <text data-opacity="40" data-font-feature="tnum" >
                          +{laps.length - 1} more
                        </text>
                      </>
                    )}
                  </group>
</Ripple>
                </group>
              </Popover>
            )}
          </group>
        </group>
      </group>
    </group>
  );
};

export default StopWatch;
