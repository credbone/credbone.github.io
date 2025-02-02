import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider";
import { colors } from "../styles/colorData";

const ThemNameDisplay: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;
  const { theme } = themeContext;

  // Find the selected color from the colors array using the theme color code.
  const selectedColor = colors.find((c) => c.code === theme.colorPrimary);

  return (


<svg xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 400 400" data-index="2" transform="rotate(50)">
      <defs>
      <path  id="myTextPath" d="M 200 350 A 50 50 0 1 1 200 50 "></path>
      <path  id="myTextPath-2" d="M 200 335 A 50 50 0 1 1 200 65 "></path>

      </defs>


<text x="0" y="0" >
{selectedColor ? (
        <>
        <textPath  href="#myTextPath"   data-opacity="90" fill="currentColor"  spacing="auto" lengthAdjust="spacingAndGlyphs">
        {selectedColor.name} is Primary. 
        </textPath>

        <textPath   href="#myTextPath-2"  data-opacity="30"  fill="currentColor"  spacing="auto" lengthAdjust="spacingAndGlyphs">
        {selectedColor.description}         
        </textPath>
        </>
      ) : (
       <>
       
       <textPath href="#myTextPath"  data-opacity="90" fill="currentColor"  spacing="auto" lengthAdjust="spacingAndGlyphs">
        Custom Color is Selected
        </textPath>

        <textPath href="#myTextPath-2"  data-opacity="30"  fill="currentColor"  spacing="auto" lengthAdjust="spacingAndGlyphs">
      Click to select from presets
        </textPath>

       </>
      )}



      </text>
    </svg>


  );
};

export default ThemNameDisplay;
