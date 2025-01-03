// src/routesData.ts
export interface RouteData {
    path: string;
    tags: string[];
    description: string; 
    title: string; 
}
  
export const routesData: RouteData[] = [
  { 
    path: "Typography", 
    tags: ["typeface", "fonts", "typography", "glyph", "lettering", "font styles", "serif", "sans-serif", "token"], 
    description: "Typography tools, fonts, and typeface design for all styles.", 
    title: "Typography" 
  },
  { 
    path: "Icons", 
    tags: ["icons", "graphics", "user interface", "svg", "vector", "pictograms", "symbols", "glyphs"], 
    description: "Icon components for graphics and user interface design.", 
    title: "Icons" 
  },
  { 
    path: "Buttons", 
    tags: ["buttons", "user interface", "icon", "fab", "click", "actions", "controls", "form"], 
    description: "Interactive buttons for user interface actions and controls.", 
    title: "Buttons" 
  },
  { 
    path: "CheckboxSwitchers", 
    tags: ["checkbox", "switchers", "radio", "button", "forms", "toggle", "input", "selection"], 
    description: "Checkbox, switchers, and toggle input controls.", 
    title: "Checkbox & Switchers" 
  },
  { 
    path: "Colors", 
    tags: ["colors", "design", "palette", "theme", "light", "dark", "shades", "hues", "tints", "token"], 
    description: "Color design, palettes, and tools for theme building.", 
    title: "Colors" 
  },
  { 
    path: "Layout", 
    tags: ["layout", "design", "grid", "structure", "arrangement", "spacing", "alignment"], 
    description: "Grid layouts and structure components for UI design.", 
    title: "Layout" 
  },
  { 
    path: "Navigation", 
    tags: ["navigation", "menu", "user interface", "navbar", "sidebar", "links", "breadcrumbs", "tabs"], 
    description: "Menus and navigation components for streamlined UIs.", 
    title: "Navigation" 
  },
  { 
    path: "Navigation/SideBar", 
    tags: ["navigation", "menu", "user interface", "navbar", "sidebar", "links", "tabs"], 
    description: "Sidebar navigation component Example for streamlined UIs.", 
    title: "Sidebar" 
  },
  { 
    path: "InputsAndForms", 
    tags: ["inputs", "forms", "user interface", "password", "text fields", "input fields", "user input", "data entry"], 
    description: "Input fields and forms for user interaction and data entry.", 
    title: "Inputs & Forms" 
  },
  { 
    path: "RangeSlider", 
    tags: ["inputs", "range", "slider", "tick", "text fields", "input fields", "user input", "data entry"], 
    description: "For adjusting values dynamically in user interface designs.", 
    title: "Range Slider" 
  },
  { 
    path: "TooltipAndPopover", 
    tags: ["tooltip", "popover","user interface", "hover", "hint", "overlay"], 
    description: "Tooltip, popover, toast, and snackbar overlay tools.", 
    title: "Tooltip & Popover" 
  },
  { 
    path: "Snackbar", 
    tags: ["toast", "snackbar", "user interface", "hint", "overlay"], 
    description: "Toast, and snackbar overlay tools.", 
    title: "Snackbar" 
  },
  { 
    path: "CardsAndList", 
    tags: ["cards", "list", "user interface", "item list", "data display", "containers", "grouping", "collections"], 
    description: "Cards and lists for grouping and displaying data items.", 
    title: "Cards & List" 
  },
  { 
    path: "Miscellaneous", 
    tags: ["miscellaneous", "marquee", "counter", "text", "digit", "ripple", "ink", "material"], 
    description: "Various unique UI components and handy design tools.", 
    title: "Miscellaneous" 
  },
  { 
    path: "Dashboard", 
    tags: ["dashboard","pattern", "monitoring", "gauge", "widget", "hardware", "temperature"], 
    description: "Dashboard interfaces for hardware monitoring and widgets.", 
    title: "Dashboard" 
  },
  { 
    path: "Modal", 
    tags: ["modal", "popup", "window", "overlay", "dialog"], 
    description: "Modal components for creating overlays and popup dialogs.", 
    title: "Modals" 
  },
  { 
    path: "QuickDemos", 
    tags: ["demo", "pattern", "showcase", "converter", "interactive", "weather", "paint", "app", "calculator"], 
    description: "Explore interactive demos, apps, and functional showcases.", 
    title: "Quick Demos" 
  },

  { 
    path: "Overview", 
    tags: ["overview", "all", "summary", "collection", "catalog", "categories","interface","experience","comprehensive"], 
    description: "Contains all routes and a summary of components.", 
    title: "Overview" 
  }

];

