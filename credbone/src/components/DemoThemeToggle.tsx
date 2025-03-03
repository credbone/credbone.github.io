import React, { useEffect, useState } from "react";
import { useTheme } from "../components/ThemeProvider";
import { useSnackbar } from "./snackbar/SnackbarContainer";

import DotDisplay from "../template/dotDisplay";
import { moon, sun } from "../pages/tools/dotIcon";

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
      ? sun // Active dots for dark mode
      : moon

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
 data-autofit="1-600"
data-backdrop="20-adaptive"

data-shrink="no"

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
