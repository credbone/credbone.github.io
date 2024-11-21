// src/routesData.ts
export interface RouteData {
    path: string;
    tags: string[];
    description: string; 
    title: string; 
}
  
export const routesData: RouteData[] = [
  { 
    path: "Typeface", 
    tags: ["typeface", "fonts", "typography", "glyph", "lettering", "font styles", "serif", "sans-serif"], 
    description: "Typography tools, fonts, and typeface design.", 
    title: "Typeface" 
  },
  { 
    path: "Icons", 
    tags: ["icons", "graphics", "user interface", "svg", "vector", "pictograms", "symbols", "glyphs"], 
    description: "Icon components for graphics and user interfaces.", 
    title: "Icons" 
  },
  { 
    path: "Buttons", 
    tags: ["buttons", "user interface", "icon", "fab", "click", "actions", "controls", "form"], 
    description: "Interactive buttons for user interface actions.", 
    title: "Buttons" 
  },
  { 
    path: "CheckboxSwitchers", 
    tags: ["checkbox", "switchers", "radio", "button", "forms", "toggle", "input", "selection"], 
    description: "Checkbox, switchers, and toggle inputs.", 
    title: "Checkbox & Switchers" 
  },
  { 
    path: "Colors", 
    tags: ["colors", "design", "palette", "theme", "light", "dark", "shades", "hues", "tints"], 
    description: "Color design, palettes, and theme tools.", 
    title: "Colors" 
  },
  { 
    path: "Layout", 
    tags: ["layout", "design", "grid", "structure", "arrangement", "spacing", "alignment"], 
    description: "Grid layouts and structure for UI design.", 
    title: "Layout" 
  },
  { 
    path: "Navigation", 
    tags: ["navigation", "menu", "user interface", "navbar", "sidebar", "links", "breadcrumbs", "tabs"], 
    description: "Menus and navigation components for UIs.", 
    title: "Navigation" 
  },
  { 
    path: "InputsAndForms", 
    tags: ["inputs", "forms", "user interface", "password", "text fields", "input fields", "user input", "data entry"], 
    description: "Input fields and forms for data entry.", 
    title: "Inputs & Forms" 
  },
  { 
    path: "TooltipAndPopover", 
    tags: ["tooltip", "popover", "toast", "snackbar", "user interface", "hover", "hint", "overlay"], 
    description: "Tooltip, popover, toast, and snackbar tools.", 
    title: "Tooltip & Popover" 
  },
  { 
    path: "CardsAndList", 
    tags: ["cards", "list", "user interface", "item list", "data display", "containers", "grouping", "collections"], 
    description: "Cards and lists for displaying grouped data.", 
    title: "Cards & List" 
  },
  { 
    path: "Miscellaneous", 
    tags: ["miscellaneous", "marquee", "counter", "text", "digit", "direction"], 
    description: "Various unique UI components and tools.", 
    title: "Miscellaneous" 
  },
  { 
    path: "Dashboard", 
    tags: ["dashboard", "monitoring", "gauge", "widget", "hardware", "temperature"], 
    description: "Dashboard interface for hardware monitoring.", 
    title: "Dashboard" 
  },
  { 
    path: "Modal", 
    tags: ["modal", "popup", "window", "overlay", "dialog"], 
    description: "Modal components for overlays and popups.", 
    title: "Modals" 
  },
  { 
    path: "QuickDemos", 
    tags: ["demo", "showcase", "converter", "interactive", "weather", "paint", "app", "calculator"], 
    description: "Explore interactive demos and showcases.", 
    title: "Quick Demos" 
  }
  
];
