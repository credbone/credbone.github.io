// src/routesData.ts
export interface RouteData {
    path: string;
    tags: string[];
    description: string; 
    title: string; 
}
  
export const routesData: RouteData[] = [
  { 
    path: "../Components/Typography", 
    tags: ["typeface", "fonts", "typography", "glyph", "lettering", "font styles", "serif", "text", "token"], 
    description: "Typography tools, fonts, and typeface design for all styles.", 
    title: "Typography" 
  },
  { 
    path: "../Components/Icons", 
    tags: ["icons", "graphics", "user interface", "svg", "vector", "pictograms", "symbols", "glyphs"], 
    description: "Icon components for graphics and user interface design.", 
    title: "Icons" 
  },
  { 
    path: "../Components/Buttons", 
    tags: ["buttons", "user interface", "icon", "fab", "click", "actions", "controls", "form"], 
    description: "Interactive buttons for user interface actions and controls.", 
    title: "Buttons" 
  },
  { 
    path: "../Components/CheckboxSwitchers", 
    tags: ["checkbox", "switchers", "radio", "button", "forms", "toggle", "input", "selection"], 
    description: "Checkbox, switchers, and toggle input controls.", 
    title: "Checkbox & Switchers" 
  },
  { 
    path: "../Components/Colors", 
    tags: ["colors", "design", "palette", "theme", "light", "dark", "shades", "hues", "tints", "swatches", "token","export","figma", "tools"], 
    description: "Color design, palettes, and tools for theme building.", 
    title: "Colors" 
  },
  { 
    path: "../Components/DividerAndSpace", 
    tags: ["separator", "layout", "spacing", "structure", "arrangement", "space", "divider"], 
    description: "Essential components for creating structured layouts and managing spacing.", 
    title: "Divider & Space" 
  },
  { 
    path: "../Components/Layout", 
    tags: ["layout", "design", "grid", "structure", "arrangement", "spacing", "alignment"], 
    description: "Grid layouts and structure components for UI design.", 
    title: "Layout" 
  },
  { 
    path: "../Components/Navigation", 
    tags: ["navigation", "menu", "user interface", "navbar", "sidebar", "links", "breadcrumbs", "tabs"], 
    description: "Menus and navigation components for streamlined UIs.", 
    title: "Navigation" 
  },
  { 
    path: "../Components/Navigation/SideBar", 
    tags: ["navigation", "menu", "user interface", "navbar", "sidebar", "links", "tabs"], 
    description: "Sidebar navigation component Example for streamlined UIs.", 
    title: "Sidebar" 
  },
  { 
    path: "../Components/InputsAndForms", 
    tags: ["inputs", "forms", "user interface", "password", "text fields", "input fields", "user input", "data entry"], 
    description: "Input fields and forms for user interaction and data entry.", 
    title: "Inputs & Forms" 
  },
  { 
    path: "../Components/RangeSlider", 
    tags: ["inputs", "range", "slider", "tick", "text fields", "input fields", "user input", "data entry"], 
    description: "For adjusting values dynamically in user interface designs.", 
    title: "Range Slider" 
  },
  { 
    path: "../Components/TooltipAndPopover", 
    tags: ["tooltip", "popover","user interface", "hover", "hint", "overlay"], 
    description: "Tooltip, popover, toast, and snackbar overlay tools.", 
    title: "Tooltip & Popover" 
  },
  { 
    path: "../Components/Snackbar", 
    tags: ["toast", "snackbar", "user interface", "hint", "overlay"], 
    description: "Toast, and snackbar overlay tools.", 
    title: "Snackbar" 
  },
  { 
    path: "../Components/CardsAndList", 
    tags: ["cards", "list", "user interface", "item list", "data display", "containers", "grouping", "collections"], 
    description: "Cards and lists for grouping and displaying data items.", 
    title: "Cards & List" 
  },
  { 
    path: "../Components/Miscellaneous", 
    tags: ["miscellaneous", "marquee", "counter", "text", "digit", "ripple", "ink", "material"], 
    description: "Various unique UI components and handy design tools.", 
    title: "Miscellaneous" 
  },
  { 
    path: "../Components/Dashboard", 
    tags: ["dashboard","pattern", "monitoring", "gauge", "widget", "hardware", "temperature"], 
    description: "Dashboard interfaces for hardware monitoring and widgets.", 
    title: "Dashboard" 
  },
  { 
    path: "../Components/Modal", 
    tags: ["modal", "popup", "window", "overlay", "dialog"], 
    description: "Modal components for creating overlays and popup dialogs.", 
    title: "Modals" 
  },
  { 
    path: "../Components/QuickDemos", 
    tags: ["demo", "pattern", "showcase", "converter", "interactive", "weather", "paint", "app", "calculator"], 
    description: "Explore interactive demos, apps, and functional showcases.", 
    title: "Quick Demos" 
  },

  { 
    path: "../Components/Overview", 
    tags: ["overview", "all", "summary", "collection", "catalog", "categories","interface","experience"], 
    description: "Contains all routes and a summary of components.", 
    title: "Overview" 
  },

  {
    path: "../Components/Motion",
    tags: ["motion", "animation", "transition", "effect", "interaction", "movement"],
    description: "Create fluid animations and transitions for dynamic interactions.",
    title: "Motion"
  },



  {
    path: "../Tools",
    tags: ["design", "editor", "creation","generator", "tools", "icon", "blob"],
    description: "A collection of tools for designing, editing, and generating visuals.",
    title: "Tools & Resources"
  },

  {
    path: "../Tools/DotIconMaker",
    tags: ["icon", "pixel", "retro", "dot", "editor","tools",  "generator", "svg", "vector"],
    description: "Create and edit 16x16 dotted icons. Export raw data or optimized SVGs for a retro pixel-perfect look.",
    title: "Icon Maker"
  },


  {
    path: "../Tools/BlobGenerator",
    tags: ["blob", "pixel", "retro", "dot","tools", "editor", "svg", "vector"],
    description: "Yet another blob generator—because the world clearly needs more blobs.",
    title: "Blob Generator"
  }

];

