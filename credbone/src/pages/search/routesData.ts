// src/routesData.ts
export interface RouteData {
    path: string;
    tags: string[];
    description: string; 
    title: string; 
}
  
export const routesData: RouteData[] = [
  { path: "Typeface", tags: ["typeface", "fonts", "typography", "glyph", "lettering", "font styles", "serif", "sans-serif"], description: "Handles typography-related aspects, such as fonts and typeface design.", title: "Typeface" },
  { path: "Icons", tags: ["icons", "graphics", "ui", "svg", "vector", "pictograms", "symbols", "glyphs"], description: "Manages graphical elements like icons, suitable for use in user interfaces.", title: "Icons" },
  { path: "Buttons", tags: ["buttons", "ui", "icon", "fab", "click", "actions", "controls", "submit", "form buttons"], description: "Includes UI elements like buttons, especially focusing on floating action buttons", title: "Buttons" },
  { path: "CheckboxSwitchers", tags: ["checkbox", "switchers", "radio", "button", "forms", "toggle", "input", "selection"], description: "Manages components like checkboxes, switchers, radio buttons, and other form-related elements.", title: "Checkbox & Switchers" },
  { path: "Colors", tags: ["colors", "design", "palette", "theme", "light", "dark", "shades", "hues", "tints"], description: "Covers color-related topics, including design, palette creation, and light/dark theme considerations.", title: "Colors" },
  { path: "Layout", tags: ["layout", "design", "grid", "structure", "arrangement", "spacing", "alignment", "organization"], description: "Concerns the arrangement and organization of elements in a design, often utilizing grids.", title: "Layout" },
  { path: "Navigation", tags: ["navigation", "menu", "ui", "navbar", "sidebar", "links", "breadcrumbs", "tabs"], description: "Focuses on navigation elements such as menus and other UI navigation components.", title: "Navigation" },
  { path: "InputsAndForms", tags: ["inputs", "forms", "ui", "password", "text fields", "input fields", "user input", "data entry"], description: "Deals with input fields and form-related UI elements.", title: "Inputs & Forms" },
  { path: "TooltipAndPopover", tags: ["tooltip", "popover", "toast", "snackbar", "ui", "hover", "hint", "overlay"], description: "Includes tooltip, popover, toast, and snackbar components, enhancing user interactions.", title: "Tooltip & Popover" },
  { path: "CardsAndList", tags: ["cards", "list", "ui", "item list", "data display", "containers", "grouping", "collections"], description: "Handles UI components like cards and lists, commonly used for displaying information.", title: "Cards & List" },
];
