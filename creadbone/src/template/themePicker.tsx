import React from "react";

// import { setColorTheme } from "../../store/componentsSlice";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPalette } from "../styles/skin";
import Scroll from "../components/scroll";
import Button from "../components/button";

const ThemePicker: React.FC = () => {
//  const dispatch = useAppDispatch();

  // const { colorPrimary, colorSecondary } = useAppSelector(
  //   (state) => state.components.skinConfig.colorPalette
  // );
  // const onSelectPrimary = (color: string) =>
  //   dispatch(setColorTheme(getPalette(color, colorSecondary)));
  // const onSelectSecondary = (color: string) =>
  //   dispatch(setColorTheme(getPalette(colorPrimary, color)));

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
    "#cbacd8",
    "#83749f",
    "#6cc5cc",
    "#06969e",
    "#055b5c",

    "#7da10d",
    "#dcda63",
   
  ];
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
              style={{ ["--main-color-lighter" as string]: `${c}75` }}
              key={c}
          //    outline={colorPrimary === c}
              mini
              rounded
              material
       //       onClick={() => onSelectPrimary(c)}
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
              style={{ ["--main-color-lighter" as string]: `${c}75` }}
              key={c}
           //   outline={colorSecondary === c}
              mini
              rounded
              material
         //     onClick={() => onSelectSecondary(c)}
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
