// src/routesData.ts
export interface RouteData {
    path: string;
    tags: string[];
    description: string; 
    title: string; 
}
  
export const routesData: RouteData[] = [
  { path: "Typeface", tags: ["typeface", "fonts", "typography", "glyph", "lettering", "font styles", "serif", "sans-serif"], description: "Handles typography-related aspects, such as fonts and typeface design.", title: "Typeface" },
  { path: "Icons", tags: ["icons", "graphics", "user interface",  "svg", "vector", "pictograms", "symbols", "glyphs"], description: "Manages graphical elements like icons, suser interfacetable for use in user interfaces.", title: "Icons" },
  { path: "Buttons", tags: ["buttons", "user interface",  "icon", "fab", "click", "actions", "controls", "form"], description: "Includes user interface elements like buttons, especially focusing on floating action buttons", title: "Buttons" },
  { path: "CheckboxSwitchers", tags: ["checkbox", "switchers", "radio", "button", "forms", "toggle", "input", "selection"], description: "Manages components like checkboxes, switchers, radio buttons, and other form-related elements.", title: "Checkbox & Switchers" },
  { path: "Colors", tags: ["colors", "design", "palette", "theme", "light", "dark", "shades", "hues", "tints"], description: "Covers color-related topics, including design, palette creation, and light/dark theme considerations.", title: "Colors" },
  { path: "Layout", tags: ["layout", "design", "grid", "structure", "arrangement", "spacing", "alignment"], description: "Concerns the arrangement and organization of elements in a design, often utilizing grids.", title: "Layout" },
  { path: "Navigation", tags: ["navigation", "menu", "user interface",  "navbar", "sidebar", "links", "breadcrumbs", "tabs"], description: "Focuses on navigation elements such as menus and other user interface navigation components.", title: "Navigation" },
  { path: "InputsAndForms", tags: ["inputs", "forms", "user interface",  "password", "text fields", "input fields", "user input", "data entry"], description: "Deals with input fields and form-related user interface elements.", title: "Inputs & Forms" },
  { path: "TooltipAndPopover", tags: ["tooltip", "popover", "toast", "snackbar", "user interface",  "hover", "hint", "overlay"], description: "Includes tooltip, popover, toast, and snackbar components, enhancing user interactions.", title: "Tooltip & Popover" },
  { path: "CardsAndList", tags: ["cards", "list", "user interface",  "item list", "data display", "containers", "grouping", "collections"], description: "Handles user interface components like cards and lists, commonly used for displaying information.", title: "Cards & List" },
  { path: "Miscellaneous", tags: ["miscellaneous", "marquee", "counter", "text", "digit", "direction"], description: "Encompasses a variety of small, diverse UI components that don't fit into other categories, including elements like marquees and counters.", title: "Miscellaneous" },
  { path: "Dashboard", tags: ["dashboard", "monitoring", "gauge", "widget", "hardware", "temperature"], description: "Simple dashboard interface designed for monitoring hardware", title: "Dashboard" },
  { path: "Modal", tags: ["modal", "popup", "window", "overlay", "dialog"], description: "Flexible component designed for displaying modal windows for various purposes.", title: "Modals" },
  { path: "Showcase", tags: ["demo", "showcase", "converter", "interactive", "app"], description: "Experience the UI system through interactive demos", title: "Showcase" }
];
