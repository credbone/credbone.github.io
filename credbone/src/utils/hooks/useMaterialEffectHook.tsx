import React, { useState, MouseEventHandler, RefObject } from "react";
import classNames from "classnames";

interface MaterialEffectProps {
  ref?: RefObject<HTMLDivElement>;
  isMaterial?: boolean;
  /** Grow time in ms. Fade and cleanup scale with it. Omit for the CSS default (300). */
  duration?: number;
}

const DEFAULT_DURATION = 300;
// Fade-to-grow ratio of the CSS defaults (0.55s / 0.3s)
const FADE_RATIO = 550 / 300;

interface Circle {
  key: number;
  classNames: string[];
  element: JSX.Element;
}

export const useMaterialEffect = ({ ref, isMaterial, duration }: MaterialEffectProps) => {
  const [circles, setCircles] = useState<Circle[]>([]);

  const growMs = duration ?? DEFAULT_DURATION;
  const fadeMs = Math.round(growMs * FADE_RATIO);
  // A release before "ready" waits for the grow, then fades, so cover both
  const removeMs = growMs + fadeMs + 150;
  const inkStyle =
    duration !== undefined
      ? ({
          "--ink-duration": `${growMs}ms`,
          "--ink-fade-duration": `${fadeMs}ms`,
        } as React.CSSProperties)
      : undefined;

const effectStart: MouseEventHandler<HTMLDivElement> | undefined = isMaterial
  ? (e) => {
      const current = ref?.current;
      if (current) {
        const clientRect = current.getBoundingClientRect();
        const mouseX = e.clientX - clientRect.left;
        const mouseY = e.clientY - clientRect.top;
        const radius = Math.sqrt(
          current.offsetWidth ** 2 + current.offsetHeight ** 2
        );

        const newCircle: Circle = {
          key: Date.now(),
          classNames: [],
          element: (
            <circle
              r={radius}
              cx={mouseX}
              cy={mouseY}
              style={{
                transformOrigin: `${mouseX}px ${mouseY}px`,
              }}
            ></circle>
          ),
        };

        // Defer state update to not block navigation
        requestAnimationFrame(() => {
          setCircles((prevCircles) => [...prevCircles, newCircle]);

          setTimeout(() => {
            setCircles((prevCircles) =>
              prevCircles.map((circle) =>
                circle.key === newCircle.key
                  ? { ...circle, classNames: [...circle.classNames, "ready"] }
                  : circle
              )
            );
          }, growMs);
        });
      }
    }
  : undefined;

const onEffectEnd: MouseEventHandler<HTMLDivElement> | undefined = isMaterial
  ? () => {
      // Defer to not block navigation
      requestAnimationFrame(() => {
        const currentCircles = circles;

        setCircles((prevCircles) =>
          prevCircles.map((circle) => ({
            ...circle,
            classNames: circle.classNames.includes("finish")
              ? circle.classNames
              : [...circle.classNames, "finish"],
          }))
        );

        setTimeout(() => {
          setCircles((prevCircles) =>
            prevCircles.filter(
              (circle) =>
                !currentCircles.some((c) => c.key === circle.key)
            )
          );
        }, removeMs);
      });
    }
  : undefined;

  return {
    onPointerDown: effectStart,
  //  onMouseDown: effectStart,
    onPointerUp: onEffectEnd,
    onPointerLeave: onEffectEnd,
    svg: circles.length > 0 && (
      <>
        {circles.map((circle) => (
          <svg
            key={circle.key}
            className={classNames("material_ink", ...circle.classNames)}
            style={inkStyle}
          >
            {circle.element}
          </svg>
        ))}
      </>
    ),
  };
};
