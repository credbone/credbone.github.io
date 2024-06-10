import React from "react";
import { useTheme } from "../components/ThemeProvider";
import OptionBar from "./inputs/optionBar";
import Radio, { RadioType } from "./inputs/radio";
import { FieldValues, useForm } from "react-hook-form";
import { useSnackbar } from "./snackbar/SnackbarContainer";

const ThemeToggle: React.FC = () => {
  const { themeMode, setThemeMode } = useTheme();
  const { addSnackbar } = useSnackbar();
  
  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    
    setThemeMode(value);
    addSnackbar(`Theme changed to ${value}.`);
  };

  const { control } = useForm<FieldValues>({
    defaultValues: {},
  });

  const DarkModeTip = (  <group data-space="5"
  data-width=""
  data-length="280" data-gap="10">
              <text data-weight="700">Auto Mode</text>
              <text data-line="1.3" data-wrap="wrap">
                Enable Auto Theme Toggle to switch between light and dark modes
                based on your system settings.
              </text>
  </group>)
  

  const radioOptions = [
    { icon: "light_mode", radioValue: "light", label: "Light Mode", tooltip: null, },
    { icon: "dark_mode", radioValue: "dark", label: "Dark Mode", tooltip: null, },
    { icon: null, radioValue: "auto", label: "Auto Mode", tooltip: DarkModeTip, },
  ];


  return (
    <group>
      <OptionBar data-length="autofit" dynamic compact data-height="40">
    
      {radioOptions.map((option, index) => (
        <Radio
        iconProps={{ "data-length": "30" }}
        key={index}
        value={themeMode}
        icon={option.icon}
        radioValue={option.radioValue}
        control={control}
        radioType={RadioType.Button}
        name="theme-mode"
        label={option.label}
        onChange={handleModeChange}
        tooltip={option.tooltip}
        fitLabel={option.radioValue === "auto"}
      />
    ))}
        
      </OptionBar>
    </group>
  );
};

export default ThemeToggle;
