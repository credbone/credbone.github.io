import React, { useRef } from "react";
import { useMaterialEffect } from "../utils/hooks/useMaterialEffectHook";

const Ripple: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const refObj = useRef<HTMLDivElement>(null);
  const { svg,onPointerDown, onPointerLeave, onPointerUp } = useMaterialEffect({
    ref: refObj,
    isMaterial: true,
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
