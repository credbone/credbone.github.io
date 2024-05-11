import React, { useRef } from "react";
import { useMaterialEffect } from "../utils/hooks/useMaterialEffectHook";


const Ripple: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const refObj = useRef(null);
  const { svg, onMouseDown, onMouseLeave, onMouseUp } = useMaterialEffect({
    ref: refObj,
    isMaterial: true,
  });
  return React.cloneElement(React.Children.only(children), {
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    ref: refObj,
    children: Array.isArray(children.props.children)
      ? [...children.props.children, svg]
      : [children.props.children, svg],
  });
};

export default Ripple;
