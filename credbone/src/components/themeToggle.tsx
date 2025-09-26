import React from "react";
import { useTheme } from "../components/ThemeProvider";
import OptionBar from "./inputs/optionBar";
import Radio, { RadioType } from "./inputs/radio";
import { FieldValues, useForm } from "react-hook-form";
import { useSnackbar } from "./snackbar/SnackbarContainer";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { themeMode, setThemeMode } = useTheme();
  const { addSnackbar } = useSnackbar();
  
  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    
    setThemeMode(value);
    addSnackbar(<text><text data-opacity="60">Theme changed to </text><text data-weight="700" data-text-transform="capitalize">{value}</text></text>,1000,'theme', true);
  };

  const { control } = useForm<FieldValues>({
    defaultValues: {},
  });

  const DarkModeTip = (  <group data-space="10"
  data-width=""
  data-length="280" data-gap="10">
              {/* <text data-weight="700">Auto Mode</text> */}
              <text data-line="1.5" data-wrap="wrap">
                Enables Auto Mode to switch between light and dark modes
                based on your system settings.
              </text>
  </group>)
  

  const radioOptions = [
    { icon: <Sun size={20}/>, radioValue: "light", label: "Light", tooltip: null, },
    { icon: <Moon size={20}/>, radioValue: "dark", label: "Dark", tooltip: null, },
    { icon: null, radioValue: "auto", label: "Auto Mode", tooltip: DarkModeTip, tooltipProps: { placement: 'auto' as const, distance: -10, delay: 500,'data-radius': '20' } },
  ];


  return (
    <group data-height="50" data-name="option-group"  >

    
      {radioOptions.map((option, index) => (
        <Radio
        id={option.radioValue}
        labelProps={{ "data-background": "" }}
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
        tooltipProps={option.tooltipProps}
        fitLabel={option.radioValue === "auto"}
      />
    ))}
        

    </group>
  );
};

export default ThemeToggle;
