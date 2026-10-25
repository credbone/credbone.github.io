import React, { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../components/ThemeProvider";

import { democolors } from "../styles/colorData";
import { getComplementaryColor } from "../styles/skin";
import { CirclePhysicsOptions, useCirclePhysics } from "./useCirclePhysics";

interface ThemePickerVerticalProps {
  /** How many colors are in the capsule at once, centered on the selected one. Fewer leaves more room to play. */
  count?: number;
  /** Small text-colored circles mixed in for play; they can be moved but not selected. */
  fillers?: number;
  /** Overrides for gravity, bounce, stretch and the rest of the simulation. */
  physics?: Partial<CirclePhysicsOptions>;
}

const usePrefersReducedMotion = () => {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
};

const ThemePickerVertical: React.FC<ThemePickerVerticalProps> = ({ count = 12, fillers = 12, physics }) => {
  const themeContext = useContext(ThemeContext);
  const reducedMotion = usePrefersReducedMotion();

  const total = democolors.length;
  const size = Math.min(count, total);
  const half = Math.floor(size / 2);

  // Where the current theme color sits in the palette; -1 for a custom color.
  const primary = themeContext?.theme.colorPrimary.toLowerCase() ?? "";
  const selectedIndex = useMemo(() => democolors.findIndex((color) => color.code.toLowerCase() === primary), [primary]);

  // The window stays centered on the selected color, wrapping around the palette.
  // With a custom color nothing is selected, and the window stays where it last was.
  const [center, setCenter] = useState(() => (selectedIndex >= 0 ? selectedIndex : half));
  useEffect(() => {
    if (selectedIndex >= 0) setCenter(selectedIndex);
  }, [selectedIndex]);

  const colors = useMemo(
    () => Array.from({ length: size }, (_, i) => democolors[(((center - half + i) % total) + total) % total]),
    [center, half, size, total]
  );
  const codes = useMemo(() => colors.map((color) => color.code), [colors]);
  const selectedCode = selectedIndex >= 0 ? democolors[selectedIndex].code : "";

  const handleColorSelection = (color: string) => {
    if (!themeContext) return;

    const newTheme = {
      colorPrimary: color,
      colorSecondary: getComplementaryColor(color), // Automatically update secondary with complementary color
    };

    // Primary color will update and secondary will adjust automatically
    themeContext.setTheme(newTheme);
    localStorage.setItem("selectedColors", JSON.stringify(newTheme));
  };

  const { containerRef, canvasRef, canvasProps } = useCirclePhysics({
    colors: codes,
    selected: selectedCode,
    enabled: !reducedMotion,
    onSelect: handleColorSelection,
    fillers,
    options: physics,
  });

  // Check if themeContext is undefined
  if (!themeContext) {
    return null; // or return a fallback UI
  }

  return (
    <group ref={containerRef} data-ratio="1:2/2:1-600" data-radius="pill" data-contain="">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        data-position="absolute"
        data-top="0"
        data-left="0"
        data-touch-action="none"
        data-user-select="none"
        data-ink-color="dark-shade-10"
        {...canvasProps}
      />

      {/* The canvas is pointer-only; these keep the picker usable by keyboard and screen readers. */}
      {/* <group data-visibility="screen-reader">
        {colors.map((color) => (
          <button
            key={color.code}
            type="button"
            aria-label={color.name}
            aria-pressed={selectedCode === color.code}
            onClick={() => handleColorSelection(color.code)}
          />
        ))}
      </group> */}
    </group>
  );
};

export default ThemePickerVertical;
