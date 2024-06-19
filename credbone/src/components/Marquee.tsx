import React, { useState, ReactNode, HTMLProps } from "react";

// Define the props type
interface MarqueeEffectProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

function Marquee(props: MarqueeEffectProps) {
  //NOSONAR
  const [marqueeClone, setMarqueeClone] = useState<HTMLElement | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const parent = e.currentTarget;
    const child = parent.querySelector("[data-marquee]") as HTMLElement;
    const parentWidth = Math.round(parent.offsetWidth);
    const childWidth = Math.floor(child.offsetWidth);

    if (parentWidth < childWidth) {
      const width = childWidth;

      child.style.setProperty(
        "--duration-value",
        Math.max(width / 90, 1) + "s"
      );
      const clonedChild = child.cloneNode(true) as HTMLElement;
      parent.appendChild(clonedChild);
      setMarqueeClone(clonedChild);
      parent.classList.add("start");
    }
  };

  const handleMouseLeave: EventListener = (e: Event) => {
    const container = e.currentTarget as HTMLDivElement;

    if (marqueeClone) {
      let animationFrameId: number;

      const captureAnimationFrame = () => {
        const child = container.querySelector("[data-marquee]") as HTMLElement;
        const computedStyle = window.getComputedStyle(child);

        const transformValue = computedStyle.transform;

        // console.log(
        //   "Transform value from interrupted animation:",
        //   transformValue
        // );
        container.style.setProperty("--transform-value", transformValue);

        container.removeEventListener("mouseleave", handleMouseLeave);

        cancelAnimationFrame(animationFrameId);

        container.classList.remove("start");
      };

      animationFrameId = requestAnimationFrame(captureAnimationFrame);

      marqueeClone.remove();
      setMarqueeClone(null);
    }
  };

  return (
    <group
      data-wrap="no"
      data-contain=""
      data-name="marquee_cont"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <group data-marquee="" data-width="auto" data-max-length="auto">
        {props.children}
      </group>
    </group>
  );
}

export default Marquee;
