import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider";
import { defaultPrimaryColor, defaultSecondaryColor } from "../styles/skin";
import Button from "../components/button";
import { colors, seccolors } from "../styles/colorData";


const RichThemePicker: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  // Check if themeContext is undefined
  if (!themeContext) {
    return null; // or return a fallback UI
  }

  const { theme, setTheme } = themeContext;



  const handleColorSelection = (color: string, isPrimary: boolean) => {
    const newTheme = {
      colorPrimary: isPrimary ? color : theme.colorPrimary,
      colorSecondary: isPrimary ? theme.colorSecondary : color,
    };
    setTheme(newTheme);
    localStorage.setItem("selectedColors", JSON.stringify(newTheme));
  };

  return (


    <group

      data-name="themes"
    >

      <group><text  data-space-vertical="30" ata-space-vertical="30" data-light="">Choose Primary Color</text></group>


      <group data-type="grid" data-grid-template="80" data-gap="10">
        {colors.map((c) => (

<group data-background={theme.colorSecondary === c.code ? "secondary-lighter" : ""} data-radius="5" data-contain="" data-border="" onClick={() => handleColorSelection(c.code, true)}>
<group style={{ backgroundColor: c.code }} data-ratio="1:1">
</group>
<group
  data-direction="column"
  data-width="auto"
  data-space="10"
  key={c.code}
  data-wrap="wrap"
>
  <text data-ellipsis="" data-light=""

  >{c.name}</text>
  {/* <text data-ellipsis="" data-light="">{c.description}</text> */}
</group>
</group>


        ))}
      </group>

      <group><text  data-space-vertical="30" data-light="">Choose Secondary Color</text></group>

      <group data-type="grid" data-gap="10" data-grid-template="80"



      >
        {seccolors.map((c) => (

          <group data-background={theme.colorSecondary === c.code ? "secondary-lighter" : ""} data-radius="5" data-contain="" data-border="" onClick={() => handleColorSelection(c.code, false)}>
            <group style={{ backgroundColor: c.code }} data-ratio="1:1">
            </group>
            <group
              data-direction="column"
              data-width="auto"
              data-space="10"
              key={c.code}
              data-wrap="wrap"
            >
              <text data-ellipsis="" data-light=""

              >{c.name}</text>
              {/* <text data-ellipsis="" data-light="">{c.description}</text> */}
            </group>
          </group>
        ))}
      </group>
    </group>



  );
};

export default RichThemePicker;