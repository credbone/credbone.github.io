// src/routesData.ts
export interface RouteData {
    path: string;
    tags: string[];
    description: string; 
    title: string; 
    tagsVisible?: boolean;
}
  
export const routesData: RouteData[] = [
  {
    "path": "../Components/Typography",
    "title": "Typography",
    "description": "Typography tools, fonts, and typeface design for all styles.",
    "tags": ["typography", "fonts", "typeface", "text", "glyph", "lettering", "serif","token"]
  },
  {
    "path": "../Components/Icons",
    "title": "Icons",
    "description": "Icon components for graphics and user interface design.",
    "tags": ["icon","component", "svg", "vector", "glyphs", "symbols"]
  },
  {
    "path": "../Components/Buttons",
    "title": "Buttons",
    "description": "Interactive buttons for user interface actions and controls.",
    "tags": ["button","component", "actions", "controls", "click", "fab", "form", "user interface"]
  },
  {
    "path": "../Components/CheckboxSwitchers",
    "title": "Checkbox & Switchers",
    "description": "Highly configurable checkboxes, switches, and toggle controls.",
    "tags": ["checkbox","component", "switchers", "toggle", "radio", "selection", "input", "forms", "button"]
  },
  {
    "path": "../Components/Colors",
    "title": "Colors",
    "description": "Color design, palettes, and tools for theme building.",
    "tags": ["color", "palette", "theme", "shades", "hues", "tints", "swatches", "light", "dark", "token", "export", "figma", "tools"]
  },
  {
    "path": "../Components/DividerAndSpace",
    "title": "Divider & Space",
    "description": "Essential components for creating structured layouts and managing spacing.",
    "tags": ["spacing","component", "divider", "separator", "layout", "structure", "arrangement", "space"]
  },
  {
    "path": "../Components/Layout",
    "title": "Layout",
    "description": "Grid layouts and structure components for UI design.",
    "tags": ["layout", "grid", "structure", "alignment", "spacing", "arrangement", "design"]
  },
  {
    "path": "../Components/Navigation",
    "title": "Navigation",
    "description": "Menus and navigation components for streamlined UIs.",
    "tags": ["navigation","component", "menu", "navbar", "sidebar", "tabs", "links", "breadcrumbs",]
  },
  {
    "path": "../Components/Navigation/SideBar",
    "title": "Sidebar",
    "description": "Sidebar navigation component Example for streamlined UIs.",
    "tags": ["sidebar", "navigation", "menu", "tabs", "links", "navbar",]
  },
  {
    "path": "../Components/InputsAndForms",
    "title": "Inputs & Forms",
    "description": "Input fields and forms for user interaction and data entry.",
    "tags": ["inputs","component", "forms", "input fields", "data entry", "user input", "textarea", "password",]
  },
  {
    "path": "../Components/RangeSlider",
    "title": "Range Slider",
    "description": "For adjusting values dynamically in user interface designs.",
    "tags": ["slider","component", "range", "inputs", "user input", "data entry", "tick", "input fields"]
  },
  {
    "path": "../Components/TooltipAndPopover",
    "title": "Tooltip & Popover",
    "description": "Contextual overlay components for hints and lightweight interactions.",
    "tags": ["tooltip","component", "popover","bottom sheet", "overlay", "hint", "hover",]
  },
  {
    "path": "../Components/Snackbar",
    "title": "Snackbar",
    "description": "Notification components for feedback, alerts, and system messages.",
    "tags": ["snackbar","component", "toast", "notification", "feedback", "alert","hint"]
  },
  {
    "path": "../Components/CardsAndList",
    "title": "Cards & List",
    "description": "Cards and lists for grouping and displaying data items.",
    "tags": ["card", "list", "data display", "containers", "grouping", "collections", "item list"]
  },
  {
    "path": "../Components/Miscellaneous",
    "title": "Miscellaneous",
    "description": "Various unique UI components and handy design tools.",
    "tags": ["miscellaneous","component", "marquee", "counter", "digit", "ripple", "ink", "material", "text"]
  },
  {
    "path": "../Components/Dashboard",
    "title": "Dashboard",
    "description": "Dashboard interfaces for hardware monitoring and widgets.",
    "tags": ["dashboard","component", "widget", "monitoring", "gauge", "temperature", "hardware", "pattern"]
  },
  {
    "path": "../Components/Modal",
    "title": "Modals",
    "description": "Modal components for creating overlays and popup dialogs.",
    "tags": ["modal","component", "dialog", "popup", "overlay", "window"]
  },
  {
    "path": "../Components/QuickDemos",
    "title": "Quick Demos",
    "description": "Explore interactive demos, apps, and functional showcases.",
    "tags": ["demo", "interactive", "showcase", "app", "calculator", "converter", "weather", "paint", "stopwatch"]
  },
  {
    "path": "../Components/Overview",
    "title": "Overview",
    "description": "Contains all routes and a summary of components.",
    "tags": ["overview", "summary", "collection", "catalog", "categories", "interface", "experience", "all"]
  },
  {
    "path": "../Components/Motion",
    "title": "Motion",
    "description": "Create fluid animations and transitions for dynamic interactions.",
    "tags": ["motion", "animation", "transition", "interaction", "effect", "movement"]
  },



  {
    "path": "../Tools",
    "title": "Tools & Resources",
    "description": "A collection of tools for designing, editing, and generating visuals.",
    "tags": ["tool", "editor", "generator", "creation", "design", "icon", "blob", "CSS", "figma",]
  },
  {
    "path": "../Tools/DotIconMaker",
    "title": "Icon Maker",
    "description": "Create and edit 16x16 dotted icons. Export raw data or optimized SVGs.",
    "tags": ["icon", "pixel", "dot", "editor", "generator", "retro", "svg", "vector", "tools", "figma",]
  },
  {
    "path": "../Tools/BlobGenerator",
    "title": "Blob Generator",
    "description": "Yet another blob generator—because the world clearly needs more blobs.",
    "tags": ["blob", "generator", "editor", "shape", "svg", "vector", "tools", "figma",]
  },
  {
    "path": "../Tools/PatternMaker",
    "title": "Pattern Maker",
    "description": "Ideal for creating seamless, repeatable backgrounds.",
    "tags": ["pattern", "seamless", "repeatable", "generator", "texture", "svg", "vector", "tools","figma",]
  },
  {
    "path": "../Tools/ColorMixer",
    "title": "Color Mixer",
    "description": "Tool for blending and experimenting with custom colors.",
    "tags": ["color", "mixer", "gradient", "LAB", "RGB", "swatches", "token", "export", "svg", "CSS", "tools", "figma",]
  },
  {
    "path": "../Tools/ColorSpaceConverter",
    "title": "Color Converter",
    "description": "Convert colors across spaces and explore theory-based combinations.",
    "tags": ["color", "converter", "LAB", "RGB", "HSL", "HEX", "color-theory", "harmony", "swatches", "token", "export", "svg", "CSS", "tools", "figma",]
  },
  {
    "path": "../Tools/PathBuilder",
    "title": "Path Builder",
    "description": "Build and edit SVG paths visually by combining segments, curves, and lines, with quick export.",
    "tags": ["path", "svg", "vector", "bezier", "curve", "arc", "line", "segments", "editor", "tools"]
  },
{
  "path": "../Tools/AvatarMaker",
  "title": "Avatar Maker",
  "description": "Customize and export simple avatars by adjusting size, colors, and basic attributes.",
  "tags": ["avatar", "maker", "editor", "customize", "color", "size", "export", "svg", "tools"]
},





  {
    "path": "/Settings",
    "title": "Application Settings",
    "description": "Configure the application, adjust preferences, and reset or customize behavior.",
    "tags": ["settings", "preferences", "configuration", "customize", "options", "reset"],
    "tagsVisible": false
  },
  {
    "path": "/About",
    "title": "About the Project",
    "description": "Learn more about the project, its goals, features, and design approach.",
    "tags": ["about", "project", "overview", "information", "details"],
    "tagsVisible": false
  },
  {
    "path": "/About/Resume",
    "title": "Author & Resume",
    "description": "View the creator profile, background, experience, and resume.",
    "tags": ["resume", "author", "profile", "experience", "creator", "ruben", "sargsyan"],
    "tagsVisible": false
  },


  {
  "path": "/",
  "title": "Credbone",
  "description": "Atomic design system and UI toolkit for building scalable interfaces and tools.",
  "tags": ["home", "landing", "index","start"],
  "tagsVisible": false
}
]

