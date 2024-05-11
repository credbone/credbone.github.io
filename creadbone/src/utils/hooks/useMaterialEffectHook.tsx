import classNames from "classnames";
import { MouseEventHandler, RefObject, useState } from "react";
export const useMaterialEffect = ({
  ref,
  isMaterial,
}: {
  ref?: RefObject<HTMLDivElement>;
  isMaterial?: boolean;
}) => {
  const [circles, setCircles] = useState<any[]>([]);
  let onMouseDown: MouseEventHandler<HTMLDivElement> | undefined;
  let onEffectEnd: MouseEventHandler<HTMLDivElement> | undefined;
  if (isMaterial) {
    onMouseDown = (e) => {
      let current = ref?.current;
      if (current) {
        let clientRect = current.getBoundingClientRect(),
          mouseX =
            e.pageX - (clientRect.left + document.documentElement.scrollLeft),
          mouseY =
            e.pageY - (clientRect.top + document.documentElement.scrollTop),
          radius = Math.sqrt(
            Math.pow(current.offsetWidth, 2) + Math.pow(current.offsetHeight, 2)
          );

        if (ref?.current) {
          const newCircle = {
            key: Date.now(),
            classNames: [],
            value: (
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

          setCircles((c) => {
            return [...c, newCircle];
          });

          setTimeout(() => {
            if (ref?.current) {
              setCircles((prev) =>
                prev.map((c) => {
                  return c.key === newCircle.key
                    ? { ...c, classNames: [...c.classNames, "ready"] }
                    : c;
                })
              );
            }
          }, 350);
        }
      }
    };

    onEffectEnd = () => {
      let removingCircles = circles;

      setCircles((prev) => {
        return prev.length
          ? prev.map((c) => ({
              ...c,
              classNames: c.classNames.includes("finish")
                ? c.classNames
                : [c.classNames, "finish"],
            }))
          : prev;
      });

      setTimeout(() => {
        if (ref?.current) {
          setCircles((prev) =>
            prev.length
              ? [
                  ...prev.filter(
                    (currentCircle) =>
                      !removingCircles.some(
                        (removing) => removing.key === currentCircle.key
                      )
                  ),
                ]
              : prev
          );
        }
      }, 1000);
    };
  }
  return {
    onMouseDown,
    onMouseUp: onEffectEnd,
    onMouseLeave: onEffectEnd,
    svg: circles.length > 0 && (
      <>
        {circles.map((c) => (
          <svg
            key={c.key}
            className={classNames("material_ink", ...c.classNames)}
          >
            {c.value}
          </svg>
        ))}
      </>
    ),
  };
};
