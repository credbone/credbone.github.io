import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import Checkbox, { CheckboxType } from "../components/inputs/checkbox";
import Tooltip from "../components/tooltip";
import Radio, { RadioType } from "../components/inputs/radio";
import OptionBar from "../components/inputs/optionBar";
import Button from "../components/button";
import Ripple from "../components/Ripple";

import sampleImage from "../styles/images/samples/res_20.jpg";

const CheckboxAndSwitchers: React.FC = () => {
  const { reset, control } = useForm<FieldValues>({
    defaultValues: {
      1: true,
      4: true,
      7: true,
      6: true,
      8: "Option3",
      option_9: true,
      option_7: true,
      option_6: true,
      RadioDemo4: "yes",
      RadioViewDemo: "RadioViewDemo2",
      RadioViewDemo3: "RadioViewDemo1",
      RadioDemo: "RadioDemo1",
    },
  });

  const weekdays = [
    { name: "option_1", label: "Mo" },
    { name: "option_2", label: "Tu" },
    { name: "option_3", label: "We" },
    { name: "option_4", label: "Th" },
    { name: "option_5", label: "Fr" },
    { name: "option_6", label: "Sa" },
    { name: "option_7", label: "Su" },
  ];

  const checkboxData = [
    { name: "checkbox_option_1", label: "Phone", icon: "phone" },
    { name: "checkbox_option_2", label: "Book", icon: "book_2" },
    { name: "checkbox_option_4", label: "Home", icon: "home" },
    { name: "checkbox_option_5", label: "Music", icon: "headphones" },
  ];

  const radioData = [
    { key: "1", name: "RadioDemo", icon: "nest_eco_leaf" },
    { key: "2", name: "RadioDemo", label: "Nature", icon: "photo_camera" },
    { key: "3", name: "RadioDemo", label: "Explore" },
    { key: "4", name: "RadioDemo", label: "Nutrition" },
  ];

  const radioViewData = [
    {
      key: "1",
      name: "RadioViewDemo",
      label: "Stream Layout",
      icon: "view_stream",
    },
    {
      key: "2",
      name: "RadioViewDemo",
      label: "Table Layout",
      icon: "table_rows",
    },
    { key: "3", name: "RadioViewDemo", label: "Grid Layout", icon: "window" },
    {
      key: "4",
      name: "RadioViewDemo",
      label: "Column Layout",
      icon: "view_column",
    },
  ];

  return (
    <view
      data-adaptive=""
      data-space="30"
      data-gap="15"
      data-align="start"
      data-scroll=""
    >
      <group data-gap="15" data-align="start" data-container-type="grid">
        <group
          data-max-length="900"
          data-contain=""
          data-radius="10"
          data-elevation="1"
        >
          <group>
            <group data-direction="column" data-space="30">
              <text
                data-weight="700"
                data-text-size="xxx-large"
                data-wrap="wrap"
                data-color="main"
              >
                Checkbox & Radio
              </text>
              <text
                data-wrap="wrap"
                data-length="300"
                data-line="1.5"
                data-light=""
              >
                Checkboxes let users select one or more items from a list, or
                turn an item on or off
              </text>
            </group>

            <group
              data-background="main-dark"
              data-contain=""
              data-align="center"
            >
              <picture data-position="absolute" data-name="color-demo">
                <img src={sampleImage} alt="" />
              </picture>

              <group
                data-length="fit"
                data-space="40"
                data-space-vertical="30"
                data-height="150"
              >
                <group
                  data-scale="3"
                  data-origin="left"
                  data-color="main-text"
                  data-width="auto"
                >
                  <Checkbox name="1" noInk={true} control={control} />
                </group>
              </group>
            </group>
          </group>

          <group data-type="grid" data-grid-template="200" data-gap="1">
            <group data-direction="column" data-wrap="no" data-border="">
              <group
                data-border=""
                data-space="20"
                data-space-vertical="15"
                data-background="context"
              >
                <Checkbox
                  name="1"
                  label="Classic Checkbox"
                  checkbox
                  control={control}
                />
              </group>

              <group
                data-width="auto"
                data-border=""
                data-space="20"
                data-space-vertical="15"
                data-background="context"
              >
                <Tooltip content="No Label Here" placement="right">
                  <group data-width="auto">
                    <Checkbox name="4" control={control} />
                  </group>
                </Tooltip>
              </group>

              <group
                data-width="auto"
                data-border=""
                data-space="20"
                data-space-vertical="15"
                data-background="context"
              >
                <Checkbox
                  name="2"
                  label="Disabled Classic Checkbox "
                  classic
                  control={control}
                  disabled
                />
              </group>
            </group>

            <group data-wrap="no" data-direction="column">
              <group
                data-border=""
                data-space="20"
                data-space-vertical="15"
                data-background="context"
              >
                <Checkbox
                  name="3"
                  simple
                  label="Toggle Switch"
                  control={control}
                />
              </group>
              <group
                data-width="auto"
                data-border=""
                data-space="20"
                data-space-vertical="15"
                data-background="context"
              >
                <Checkbox name="11" simple control={control} />
              </group>
              <group
                data-width="auto"
                data-border=""
                data-space="20"
                data-space-vertical="15"
                data-background="context"
              >
                <Checkbox
                  name="5"
                  label="Disabled Toggle Switch"
                  disabled
                  simple
                  control={control}
                />
              </group>
            </group>

            <group data-wrap="no" data-direction="column">
              <group
                data-border=""
                data-space="20"
                data-space-vertical="15"
                data-background="context"
              >
                <Checkbox
                  name="6"
                  minimal
                  label="Minimal Checkbox"
                  control={control}
                />
              </group>
              <group
                data-border=""
                data-space="20"
                data-space-vertical="15"
                data-background="context"
              >
                <Checkbox name="9" minimal control={control} />
              </group>

              <group
                data-border=""
                data-space="20"
                data-space-vertical="15"
                data-background="context"
              >
                <Checkbox
                  name="7"
                  minimal
                  label="Disabled Checkbox 7"
                  disabled
                  control={control}
                />
              </group>
            </group>

            <group data-wrap="no" data-direction="column">
              <group
                data-border=""
                data-space="20"
                data-space-vertical="15"
                data-background="context"
              >
                <Radio
                  name="8"
                  radioValue="Option1"
                  label="Radio Button"
                  control={control}
                />
              </group>

              <group
                data-border=""
                data-space="20"
                data-space-vertical="15"
                data-background="context"
              >
                <Radio
                  name="8"
                  radioValue="Option3"
                  label="Radio Button disabled"
                  control={control}
                  disabled
                />
              </group>
              <group
                data-border=""
                data-space="20"
                data-space-vertical="15"
                data-background="context"
              >
                <Radio
                  name="8"
                  radioValue="Option4"
                  allowUncheck
                  label="Uncheck Me"
                  control={control}
                  tooltip="Radio Button Allowed Uncheck"
                />
              </group>
            </group>
          </group>
        </group>
        <group
          data-type="grid"
          data-grid-template="360"
          data-gap="15"
          data-align="start"
          data-max-length="800"
        >
          <group
            data-direction="column"
            data-space="30"
            data-radius="10"
            data-elevation="1"
          >
            <text
              data-weight="700"
              data-text-size="xxx-large"
              data-wrap="wrap"
              data-color="main"
            >
              Switch
            </text>
            <text
              data-wrap="wrap"
              
              data-line="1.5"
              data-light=""
            >
              Switches toggle the selection of an item on or off
            </text>
          </group>

          <group data-radius="10" data-elevation="1" data-contain="">
            <group
              data-gap="10"
              data-space="20"
              data-border=""
              data-background="main-background"
              data-weight="600"
            >
              <OptionBar autosize data-height="40" data-length="200">
                <Radio
                  control={control}
                  radioType={RadioType.Button}
                  name="RadioDemo1"
                  radioValue="Dashboard"
                  label="Weekly"
                />
                <Radio
                  control={control}
                  radioType={RadioType.Button}
                  name="RadioDemo1"
                  radioValue="Listview"
                  label="Monthly"
                />
              </OptionBar>
            </group>
            <group
              data-gap="10"
              data-space="20"
              data-border=""
              data-background="main-background"
            >


              <OptionBar
                compact
                dynamic
                data-palette="secondary"
                data-height="40"
              >
                {radioViewData.map((radio, index) => (
                  <Radio
                    iconProps={{ "data-length": "30" }}
                    tooltip={radio.label}
                    icon={radio.icon}
                    key={index}
                    radioValue={radio.name + radio.key}
                    control={control}
                    radioType={RadioType.Button}
                    name={radio.name}
                  />
                ))}
              </OptionBar>
            </group>
          </group>

          <group
            data-gap="10"
            data-space="20"
            data-border=""
            data-background="context"
            data-radius="10"
            data-elevation="1"
          >
            <OptionBar
              compact
              dynamic
              data-palette="lighter"
              data-height="40"
              data-weight="600"
            >
              {radioData.map((radio, index) => (
                <Radio
                  iconProps={{ "data-length": "30" }}
                  icon={radio.icon}
                  key={index}
                  radioValue={radio.name + radio.key}
                  control={control}
                  radioType={RadioType.Button}
                  name={radio.name}
                  label={radio.label}
                />
              ))}
            </OptionBar>

            <separator data-horizontal=""></separator>

            <OptionBar
              data-length="autofit"
              data-height="40"
              // data-palette="lighter"
              data-weight="600"
            >
              {checkboxData.map((checkbox, index) => (
                <Checkbox
                  //        icon={checkbox.icon}
                  key={index}
                  control={control}
                  checkboxType={CheckboxType.Button}
                  name={checkbox.name}
                  label={checkbox.label}
                />
              ))}
            </OptionBar>
          </group>

          <group
            data-space="20"
            data-border=""
            data-align="center"
            data-gap="10"
            data-background="context"
            data-radius="10"
            data-elevation="1"
          >
            <OptionBar compact dynamic>
              {radioViewData.map((radio, index) => (
                <Radio
                  label={radio.label}
                  icon={radio.icon}
                  key={index}
                  radioValue={radio.name + radio.key}
                  control={control}
                  radioType={RadioType.Button}
                  name={radio.name + 3}
                />
              ))}
            </OptionBar>

            <separator data-horizontal=""></separator>
            <group data-align="center" data-width="auto" data-wrap="no">
              <OptionBar animate data-length="100" data-height="40">
                <Radio
                  control={control}
                  radioType={RadioType.Button}
                  name="RadioDemo4"
                  radioValue="yes"
                  label="On"
                />
                <Radio
                  control={control}
                  radioType={RadioType.Button}
                  name="RadioDemo4"
                  radioValue="no"
                  label="Off"
                />
              </OptionBar>
              <text data-opacity="30" data-space="10" data-ellipsis="">
                Animated Switcher
              </text>
            </group>
          </group>

          <group data-gap="10" data-radius="10" data-elevation="2">
            <OptionBar data-length="autofit" data-height="40">
              {weekdays.map((option) => (
                <Checkbox
                  key={option.name}
                  control={control}
                  checkboxType={CheckboxType.Button}
                  name={option.name}
                  label={option.label}
                />
              ))}
            </OptionBar>
          </group>
        </group>
      </group>

      <Tooltip content="Reset">
        <group data-position="right" data-width="auto" data-sticky="bottom">
          <Button secondary fab onClick={() => reset()} toggleClassName="open">
          <icon data-icon-size="mini">restart_alt</icon>
          </Button>
        </group>
      </Tooltip>
    </view>
  );
};
export default CheckboxAndSwitchers;