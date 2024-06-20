import React, { useState, useEffect, ReactNode, HTMLProps, useRef } from "react";

// Define the props type
interface MarqueeEffectProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  auto?: boolean; // Add auto prop
}

function Marquee({ auto = false, ...props }: MarqueeEffectProps) {
  const [marqueeClone, setMarqueeClone] = useState<HTMLElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

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
    if (parentRef.current && marqueeClone) {
      marqueeClone.remove();
      setMarqueeClone(null);
      parentRef.current.classList.remove("start");
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
    if (!auto) {
      stopMarquee();
    }
  };

  useEffect(() => {
    const parent = parentRef.current;
    const child = parent?.querySelector("[data-marquee]") as HTMLElement;

    if (auto && parent && child) {
      startMarquee(parent, child);
    } else if (!auto) {
      stopMarquee();
    }

    return () => {
      // Clean up on unmount or auto change
      stopMarquee();
    };
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
