import React, { useRef } from "react";
import { useMaterialEffect } from "../utils/hooks/useMaterialEffectHook";

interface RippleProps {
  children: React.ReactElement;
  /** Ink grow time in ms; the fade scales with it. Omit for the default (300). */
  duration?: number;
}

const Ripple: React.FC<RippleProps> = ({ children, duration }) => {
  const refObj = useRef<HTMLDivElement>(null);
  const { svg,onPointerDown, onPointerLeave, onPointerUp } = useMaterialEffect({
    ref: refObj,
    isMaterial: true,
    duration,
  });

  return React.cloneElement(React.Children.only(children), {
    onPointerDown,
    onPointerLeave,
    onPointerUp,
    ref: refObj,
    children: (
      <>
         {svg}
        {children.props.children}
       
      </>
    ),
  });
};

export default Ripple;
