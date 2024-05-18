import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider";
import { defaultPrimaryColor, defaultSecondaryColor } from "../styles/skin";
import Scroll from "../components/scroll";
import Button from "../components/button";



const ThemePicker: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  // Check if themeContext is undefined
  if (!themeContext) {
    return null; // or return a fallback UI
  }

  const { theme, setTheme } = themeContext;

  const colors = [
    "#934f9a",
    "#544f9a",
    "#0066ff",
    "#598b7f",
    "#adbb88",
    "#ebd187",
    "#e89468",
    "#db6b5d",
    "#ff705e",
  
  ];

  const seccolors = [
    "#ec5b55",
    "#f08c34",
    "#f9dd6c",
    "#388174",
    "#49c5b6",
    "#a9d1d5",
    "#7a55e7",
    "#495de6",
    "#3983dd",

    
"#1673e0",
"#19a598",
"#76cec6",
"#d1eeec",
"#fd9326",
"#fdb457",
"#feebd0",
"#fd7b5e",
"#fdab97",
"#fee7e1",
"#5a4a99",
"#a59cc7",
"#e1ddeb",
"#cf455d",
"#df8c97",
"#f5dde1",

  ];

  const handleColorSelection = (color: string, isPrimary: boolean) => {
    const newTheme = {
      colorPrimary: isPrimary ? color : theme.colorPrimary,
      colorSecondary: isPrimary ? theme.colorSecondary : color,
    };
    setTheme(newTheme);
    localStorage.setItem("selectedColors", JSON.stringify(newTheme));
  };

  return (
    <group data-width="auto" data-snap-button="15" data-height="fit" data-contain="">
      <Scroll vertical>
      <group
          data-wrap="no"
          data-align="center"
          data-direction="column"
          data-name="themes"
        >
          <text data-space="20" data-orientation="vertical">
            Theme Primary Color
          </text>
          {colors.map((c) => (
            <Button
  key={c}
  mini
  rounded
  onClick={() => handleColorSelection(c, true)}
  data-background={theme.colorPrimary === c ? "main-lighter" : ""}
>
  <icon>
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="10" fill={c}></circle>
    </svg>
  </icon>
</Button>


            
          ))}
                    <text data-space="20" data-orientation="vertical">
            Secondary Color
          </text>
          {seccolors.map((c) => (
           <Button
           key={c}
           mini
           rounded
           onClick={() => handleColorSelection(c, false)}
           data-background={theme.colorSecondary === c ? "secondary-lighter" : ""}
         >
           <icon>
             <svg width="20" height="20" viewBox="0 0 20 20">
               <circle cx="10" cy="10" r="10" fill={c}></circle>
             </svg>
           </icon>
         </Button>
          ))}
                  <space data-height="10"></space>
        </group>

      </Scroll>
    </group>
  );
};

export default ThemePicker;