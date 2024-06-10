import { useState, MouseEventHandler, RefObject } from "react";
import classNames from "classnames";

interface MaterialEffectProps {
  ref?: RefObject<HTMLDivElement>;
  isMaterial?: boolean;
}

interface Circle {
  key: number;
  classNames: string[];
  element: JSX.Element;
}

export const useMaterialEffect = ({ ref, isMaterial }: MaterialEffectProps) => {
  const [circles, setCircles] = useState<Circle[]>([]);

  const onMouseDown: MouseEventHandler<HTMLDivElement> | undefined = isMaterial
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

          setCircles((prevCircles) => [...prevCircles, newCircle]);

          setTimeout(() => {
            setCircles((prevCircles) =>
              prevCircles.map((circle) =>
                circle.key === newCircle.key
                  ? { ...circle, classNames: [...circle.classNames, "ready"] }
                  : circle
              )
            );
          }, 300);
        }
      }
    : undefined;

  const onEffectEnd: MouseEventHandler<HTMLDivElement> | undefined = isMaterial
    ? () => {
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
        }, 1000);
      }
    : undefined;

  return {
    onMouseDown,
    onMouseUp: onEffectEnd,
    onMouseLeave: onEffectEnd,
    svg: circles.length > 0 && (
      <>
        {circles.map((circle) => (
          <svg
            key={circle.key}
            className={classNames("material_ink", ...circle.classNames)}
          >
            {circle.element}
          </svg>
        ))}
      </>
    ),
  };
};
