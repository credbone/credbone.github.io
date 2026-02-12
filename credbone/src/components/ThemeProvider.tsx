import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import {
  defaultPrimaryColor,
  defaultSecondaryColor,
  getPalette,
  ColorPalette,
  getCSSByPalette,
  isColorLight,
} from "../styles/skin";
import { JSX } from "react/jsx-runtime";
import { useSnackbar } from "./snackbar/SnackbarContainer";

type ThemeContextType = {
  theme: ColorPalette;
  setTheme: React.Dispatch<React.SetStateAction<ColorPalette>>;
  themeMode: string;
  setThemeMode: (mode: string) => void;
  resetTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

// Validation utilities
const isValidHexColor = (color: string): boolean => {
  if (!color || typeof color !== "string") return false;

  // Remove # if present
  const hex = color.replace("#", "");

  // Check if it's a valid 3 or 6 character hex
  const validHexPattern = /^[0-9A-Fa-f]{6}$|^[0-9A-Fa-f]{3}$/;
  return validHexPattern.test(hex);
};

const normalizeHexColor = (color: string): string => {
  if (!color) return "";

  let hex = color.trim().replace("#", "");

  // Expand 3-char hex to 6-char
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  return `#${hex}`;
};

const validateAndNormalizeColor = (color: string, fallback: string): string => {
  if (!isValidHexColor(color)) {
    return fallback;
  }
  return normalizeHexColor(color);
};

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addSnackbar } = useSnackbar();

  const [theme, setTheme] = useState<ColorPalette>(() =>
    getPalette(defaultPrimaryColor, defaultSecondaryColor),
  );
  const [themeMode, setThemeMode] = useState<string>(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "light";
  });

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedColors = localStorage.getItem("selectedColors");
    if (storedColors) {
      try {
        const parsedColors = JSON.parse(storedColors) as ColorPalette;

        // Validate primary and secondary colors
        const validPrimary = validateAndNormalizeColor(
          parsedColors.colorPrimary,
          defaultPrimaryColor,
        );
        const validSecondary = validateAndNormalizeColor(
          parsedColors.colorSecondary,
          defaultSecondaryColor,
        );

        // Check if we had to fallback
        const hadInvalidPrimary = parsedColors.colorPrimary !== validPrimary;
        const hadInvalidSecondary =
          parsedColors.colorSecondary !== validSecondary;

        if (hadInvalidPrimary || hadInvalidSecondary) {

          addSnackbar(
            <text>
              <text data-opacity="60">
                Invalid colors detected in saved theme.
              </text>
              <text data-weight="700"> Using defaults.</text>
            </text>,
            3000,
            "error",
            true,
          );

          // Clear corrupted data
          localStorage.removeItem("selectedColors");
        }

        // Generate palette with validated colors
        const validatedPalette = getPalette(validPrimary, validSecondary);
        setTheme(validatedPalette);
      } catch (error) {
        console.error("Failed to parse stored colors:", error);


        addSnackbar(
          <text>
            <text data-opacity="60">Failed to load saved theme.</text>
            <text data-weight="700"> Using defaults.</text>
          </text>,
          3000,
          "error",
          true,
        );

        localStorage.removeItem("selectedColors");
      }
    }
  }, []);

  // Apply theme CSS
  useEffect(() => {
    const cssContent = getCSSByPalette(theme);
    let styleElement = document.querySelector(
      "#theme-styles",
    ) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "theme-styles";
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = cssContent;

    // Update luminance data attributes
    const primaryLuminance = isColorLight(theme.colorPrimary)
      ? "light"
      : "dark";
    const secondaryLuminance = isColorLight(theme.colorSecondary)
      ? "light"
      : "dark";

    document.documentElement.setAttribute(
      "data-main-color-luminance",
      primaryLuminance,
    );
    document.documentElement.setAttribute(
      "data-secondary-color-luminance",
      secondaryLuminance,
    );
  }, [theme]);

  // Apply theme mode
  useEffect(() => {
    updateTheme(themeMode);
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const updateTheme = (mode: string) => {
    document.documentElement.setAttribute("data-theme", mode);
  };

  // Wrapped setTheme with validation
  const setThemeWithValidation: React.Dispatch<
    React.SetStateAction<ColorPalette>
  > = (value) => {
    setTheme((prevTheme) => {
      const newTheme = typeof value === "function" ? value(prevTheme) : value;

      // Validate the new theme colors
      const validPrimary = validateAndNormalizeColor(
        newTheme.colorPrimary,
        defaultPrimaryColor,
      );
      const validSecondary = validateAndNormalizeColor(
        newTheme.colorSecondary,
        defaultSecondaryColor,
      );

      const hadInvalidColors =
        newTheme.colorPrimary !== validPrimary ||
        newTheme.colorSecondary !== validSecondary;

      if (hadInvalidColors) {


        addSnackbar(
          <text>
            <text data-opacity="60">Invalid color format detected.</text>
            <text data-weight="700"> Using defaults.</text>
          </text>,
          3000,
          "warning",
          true,
        );
      }

      // Regenerate palette with validated colors
      const validatedPalette = getPalette(validPrimary, validSecondary);

      // Save to localStorage
      localStorage.setItem("selectedColors", JSON.stringify(validatedPalette));

      return validatedPalette;
    });
  };

  const resetTheme = () => {
    localStorage.removeItem("selectedColors");
    localStorage.removeItem("themeMode");
    setTheme(getPalette(defaultPrimaryColor, defaultSecondaryColor));
    setThemeMode("light");

    
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setThemeWithValidation,
        themeMode,
        setThemeMode,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };

function addSnackbar(
  arg0: JSX.Element,
  arg1: number,
  arg2: string,
  arg3: boolean,
) {
  throw new Error("Function not implemented.");
}
