import React, { useEffect, useState } from "react";
import { useTheme } from "../components/ThemeProvider";
import { useSnackbar } from "./snackbar/SnackbarContainer";

import DotDisplay from "../template/dotDisplay";

const DemoThemeToggle: React.FC = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const { themeMode, setThemeMode } = useTheme();
  const { addSnackbar } = useSnackbar();

  const activeDots =
    themeMode === "dark" || (themeMode === "auto" && prefersDarkMode)
      ? new Set([
          130, 129, 113, 114, 126, 125, 141, 142, 231, 232, 216, 215, 23, 24,
          40, 39, 51, 68, 75, 60, 187, 204, 180, 195, 196, 179, 203, 188, 76,
          59, 52, 67, 71, 72, 183, 184, 123, 139, 116, 132, 101, 86, 89, 106,
          154, 169, 166, 149, 165, 170, 90, 85, 117, 133, 150, 167, 168, 153,
          138, 122, 105, 88, 87, 102, 103, 118, 119, 120, 104, 121, 137, 136,
          135, 134, 151, 152,
        ]) // Active dots for dark mode
      : new Set([
          115, 131, 164, 181, 186, 171, 199, 200, 54, 55, 56, 69, 84, 99, 156,
          140, 124, 71, 86, 102, 118, 135, 152, 153, 139, 154, 70, 85, 100, 101,
          116, 117, 132, 133, 134, 148, 150, 151, 149, 165, 166, 167, 168, 169,
          170, 155, 182, 183, 184, 185, 201, 198, 147, 180,
        ]); // Active dots for light mode

  const handleModeChange = () => {
    const newMode =
      themeMode === "dark" || (themeMode === "auto" && prefersDarkMode)
        ? "light"
        : "dark";
    setThemeMode(newMode);

    addSnackbar(
      <text>
        <text data-opacity="60">Theme changed to </text>
        <text data-weight="700" data-text-transform="capitalize">
          {newMode}
        </text>
      </text>,
      1000,
      "theme",
      true
    );
  };

  return (
    <group
      onClick={handleModeChange}
      data-cursor="pointer"
      data-width="auto"
      data-direction="column"
// data-background="text"
// data-color="main-background"
 data-autofit="1-800"
data-backdrop="20-adaptive"

      data-space="20"
      data-contain=""
      data-radius="20"

      data-gap="30"
      data-interactive=""
      data-over-color="neutral"
      data-justify="center"
      data-align="center"
    >
<group data-interact="" data-width="auto">
<DotDisplay activeIndexes={activeDots} />
</group>

{/* <group data-direction="column" data-gap="10">
<text >
        {themeMode === "dark" || (themeMode === "auto" && prefersDarkMode)
          ? "Light Theme"
          : "Dark Theme"}
      </text>

      <text  data-text-size="15" data-wrap="wrap" data-line="1.5" data-opacity="40" data-length="200">Switch and watch how the system adapts.</text>

</group> */}
    </group>
  );
};

export default DemoThemeToggle;
