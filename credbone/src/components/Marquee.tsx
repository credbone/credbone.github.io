import React, { useState, useEffect, ReactNode, HTMLProps, useRef } from "react";

// Define the props type
interface MarqueeEffectProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  auto?: boolean; // Add auto prop
}

function Marquee({ auto = false, ...props }: MarqueeEffectProps) {
  const [marqueeClone, setMarqueeClone] = useState<HTMLElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  let animationFrameId: number | null = null;

  const startMarquee = (parent: HTMLElement, child: HTMLElement) => {
    const parentWidth = Math.round(parent.offsetWidth);
    const childWidth = Math.floor(child.offsetWidth);

    if (parentWidth < childWidth) {
      const width = childWidth;
      child.style.setProperty("--duration-value", Math.max(width / 90, 1) + "s");

      const clonedChild = child.cloneNode(true) as HTMLElement;
      parent.appendChild(clonedChild);
      setMarqueeClone(clonedChild);
      parent.classList.add("start");
    }
  };

  const stopMarquee = () => {
    if (marqueeClone && parentRef.current) {
      const container = parentRef.current;
      const child = container.querySelector("[data-marquee]") as HTMLElement;
      const computedStyle = window.getComputedStyle(child);
      const transformValue = computedStyle.transform;
      container.style.setProperty("--transform-value", transformValue);

      cancelAnimationFrame(animationFrameId!);
      container.classList.remove("start");
      marqueeClone.remove();
      setMarqueeClone(null);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!auto) {
      const parent = e.currentTarget;
      const child = parent.querySelector("[data-marquee]") as HTMLElement;
      startMarquee(parent, child);
    }
  };

  const handleMouseLeave: EventListener = (e: Event) => {
    if (!auto && marqueeClone) {
      const container = e.currentTarget as HTMLDivElement;

      const captureAnimationFrame = () => {
        const child = container.querySelector("[data-marquee]") as HTMLElement;
        const computedStyle = window.getComputedStyle(child);
        const transformValue = computedStyle.transform;
        container.style.setProperty("--transform-value", transformValue);

        container.removeEventListener("mouseleave", handleMouseLeave);
        cancelAnimationFrame(animationFrameId!);
        container.classList.remove("start");
      };

      animationFrameId = requestAnimationFrame(captureAnimationFrame);
      marqueeClone.remove();
      setMarqueeClone(null);
    }
  };

  useEffect(() => {
    if (auto && parentRef.current) {
      const parent = parentRef.current;
      const child = parent.querySelector("[data-marquee]") as HTMLElement;
      if (parent && child) {
        startMarquee(parent, child);
      }
    } else if (!auto) {
      stopMarquee();
    }
  }, [auto]);

  return (
    <group
      ref={parentRef}
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
