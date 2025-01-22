
import sectionImage_1 from "../../styles/images/samples/wide_res_63.webp";
import sectionImage_2 from "../../styles/images/samples/wide_res_66.webp";
import sectionImage_3 from "../../styles/images/samples/wide_res_64.webp";
import sectionImage_4 from "../../styles/images/samples/wide_res_67.webp";
import { colorcontent, typefacecontent } from "./richTumbnail";





export const groupedLinksArray = [
  {
    title: "Visual\nComponents",
    image: sectionImage_1,
    description:
      "Focuses on elements that enhance the visual appeal and provide context.",
    items: [
      { title: "Typography", description: "Scalable tokens for managing text styles.", to: "/Components/Typography", content:typefacecontent, },
      { title: "Icons\n& Shapes", description: "Beautifully crafted and carefully designed icons.", to: "/Components/Icons", },
      { title: "Colors\n& Shades", description: "A system to craft and manage color palettes.", to: "/Components/Colors",content:colorcontent, },
      { title: "Divider\n& Space", description: "Dividers organize and separate content.", to: "/Components/DividerAndSpace", },
      { title: "Cards\n& Lists", description: "Organized containers for content display.", to: "/Components/CardsAndList", },
    ],
  },
  {
    title: "Interactive\nElements",
    image: sectionImage_2,
    description:
      "Interactive components that facilitate user actions and engagement.",
    items: [
      { title: "Checkbox\n& Switches", description: "Customizable toggle elements for user selection.", to: "/Components/CheckboxSwitchers", },
      { title: "Buttons", description: "Allow users to take actions, and make choices, with a single tap.", to: "/Components/Buttons", },
      { title: "Input\n& Forms", description: "Deals with input fields and form-related user interface elements.", to: "/Components/InputsAndForms", },
      { title: "Range\n Slider", description: "For adjusting values dynamically in user interface designs.", to: "/Components/RangeSlider", },
      { title: "Tooltip\n& Popover", description: "Provide additional information and context on hover or focus.", to: "/Components/TooltipAndPopover", },
      { title: "Snackbar", description: "Snackbars provide brief notifications about activities at the bottom of the screen.", to: "/Components/Snackbar", },
      { title: "Modals\n& Alerts", description: "Customizable modal component supporting various sizes and triggers.", to: "/Components/Modal", },
    ],
  },
  {
    title: "Structure\n& Navigation",
    image: sectionImage_3,
    description:
      "Components for organizing and navigating the interface effectively.",
    items: [
      { title: "Navigation\n& Tabs", description: "Elements to navigate between different views or sections within an app.", to: "/Components/Navigation", },
      { title: "Layout\n& Switches", description: "Arrangement and organization of elements in a design.", to: "/Components/Layout", },
    ],
  },

  {
    title: "Miscellaneous\n& Demos",
    image: sectionImage_4,
    description:
      "Examples designed to showcase flexibility and additional interface functionalities.",
    items: [
      { title: "Miscellaneous", description: "Encompasses a variety of small, diverse UI components.", to: "/Components/Miscellaneous", },
      { title: "Dashboard", description: "Demo features a simple dashboard interface designed for monitoring hardware.", to: "/Components/Dashboard", },
      { title: "Demos\n& Samples", description: "Various quick-designed apps, built for demo purposes.", to: "/Components/QuickDemos", },
    ],
  },
];