import React from "react";
import { isIOS } from "react-device-detect";

type Props = {
  children: React.ReactNode;
};

// Keep device-specific default in one place
const DEFAULT_FONT_SIZE = isIOS ? 15 : 13;

function updateFontSizeStyle(size: number) {
  let styleEl = document.getElementById("textsize") as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "textsize";
    document.head.appendChild(styleEl);
  }
  styleEl.innerHTML = `:root { --text: ${size}px; }`;
}

export function FontSizeProvider({ children }: Props) {
  const [fontSize, setFontSize] = React.useState(() => {
    const saved = localStorage.getItem("fontSize");
    return saved ? parseInt(saved, 10) : DEFAULT_FONT_SIZE;
  });

  React.useEffect(() => {
    updateFontSizeStyle(fontSize);
    localStorage.setItem("fontSize", String(fontSize));
  }, [fontSize]);

  const resetFontSize = React.useCallback(() => {
    setFontSize(DEFAULT_FONT_SIZE);
    localStorage.removeItem("fontSize");
    updateFontSizeStyle(DEFAULT_FONT_SIZE);
  }, []);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize, resetFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

// Context
type FontSizeContextType = {
  fontSize: number;
  setFontSize: (size: number) => void;
  resetFontSize: () => void;
};

const FontSizeContext = React.createContext<FontSizeContextType | undefined>(
  undefined
);

export function useFontSize() {
  const ctx = React.useContext(FontSizeContext);
  if (!ctx) throw new Error("useFontSize must be used inside FontSizeProvider");
  return ctx;
}
