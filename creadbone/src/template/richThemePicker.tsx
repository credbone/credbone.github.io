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

      <group><text data-weight="700" data-space-vertical="30">Choose Primary Color</text></group>


      <group data-type="grid" data-gap="10" data-grid-template="80">
        {colors.map((c) => (

          <group data-direction="column" data-radius="10" data-contain="" data-border="" onClick={() => handleColorSelection(c.code, true)}>

            <group

              data-gap="5"
              // data-direction="column"

              data-width="auto"
              data-space="20"
              key={c.code}
              mini
              rounded

              data-background={theme.colorPrimary === c.code ? "main-lighter" : ""}


            >
              <text data-ellipsis="" data-weight="700"
                data-height="100"
                data-orientation="vertical-bottom"
              >{c.name}</text>
              <text data-ellipsis="" data-light=""
                data-height="100"
                data-orientation="vertical-bottom"

              >{c.description}</text>

            </group>
            <group data-ratio="1:1" style={{ backgroundColor: c.code }} data-space="10"></group>
          </group>


        ))}
      </group>

      <group><text data-weight="700" data-space-vertical="30">Choose Secondary Color</text></group>

      <group data-type="grid" data-gap="10" data-grid-template="80">
        {seccolors.map((c) => (

<group data-direction="column" data-radius="10" data-contain="" data-border="" onClick={() => handleColorSelection(c.code, false)}>

<group

  data-gap="5"
  // data-direction="column"

  data-width="auto"
  data-space="20"
  key={c.code}
  mini
  rounded

  data-background={theme.colorSecondary === c.code ? "secondary-lighter" : ""}


>
  <text data-ellipsis="" data-weight="700"
    data-height="100"
    data-orientation="vertical-bottom"
  >{c.name}</text>
  <text data-ellipsis="" data-light=""
    data-height="100"
    data-orientation="vertical-bottom"

  >{c.description}</text>

</group>
<group data-ratio="1:1" style={{ backgroundColor: c.code }} data-space="10"></group>
</group>



        ))}
      </group>
    </group>



  );
};

export default RichThemePicker;