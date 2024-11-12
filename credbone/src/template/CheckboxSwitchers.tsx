import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import Checkbox, { CheckboxType } from "../components/inputs/checkbox";
import Tooltip from "../components/tooltip";
import Radio, { RadioType } from "../components/inputs/radio";
import OptionBar from "../components/inputs/optionBar";

const CheckboxAndSwitchers: React.FC = () => {
  const { reset, control, watch } = useForm<FieldValues>({
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
      RadioDemo1: "0",
    },
  });

  const radioValue = watch("RadioDemo1");

  const weekdays = [
    { name: "option_1", label: "Mo", tooltip: "Monday" },
    { name: "option_2", label: "Tu", tooltip: "Tuesday" },
    { name: "option_3", label: "We", tooltip: "Wednesday" },
    { name: "option_4", label: "Th", tooltip: "Thursday" },
    { name: "option_5", label: "Fr", tooltip: "Friday" },
    { name: "option_6", label: "Sa", tooltip: "Saturday" },
    { name: "option_7", label: "Su", tooltip: "Sunday" },
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
    <>
      <group data-gap="30" data-space="30" data-align="start">
        <group data-direction="column" data-gap="10">
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
            Checkboxes let users select one or more items from a list, or turn
            an item on or off
          </text>
        </group>

        <group data-gap="15">
          <group
            data-max-length="800"
            data-contain=""
            data-radius="15"
            data-elevation="1"
          >
            <group
              data-background="main"
              data-space="30"
              data-gap="20"
              data-color="main-text"
              data-wrap="no"
              data-contain=""
             
              data-direction="column"
            >
              <group data-height="60" data-length="60" data-contain="">
                <group
                  data-scale="3"
                  data-origin="left"
                  data-color="main-text"
                  data-width="auto"
                  data-checkbox-color="invert"
                >
                  <Checkbox name="1" noInk={true} control={control} />
                </group>
              </group>


              <group data-direction="column" >

          <text
            data-wrap="wrap"
            data-length="400"
            data-line="1.5"
            data-light=""
          >
        This checkbox is adaptable to various backgrounds, and each element can also be configured individually.
          </text>
        </group>

            </group>

            <group data-type="grid" data-grid-template="180" data-gap="1">
              <group data-direction="column" data-wrap="no" data-border="">
                <group
                  data-border=""
                  data-space="20"
                  data-space-vertical="15"
                  data-background="context"
                  data-color="default"
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
            data-column-gap="15"
            data-align="start"
            data-max-length="800"
            data-type="column"
          >
            <group
              data-direction="column"
              data-radius="15"
              data-elevation="1"
              data-contain=""
            >
              <group
                data-background="main"
                 data-color="main-text"
                data-contain=""
                //  data-align="center"
               // data-dark=""
                data-justify="center"
                data-space="30"
                data-gap="30"
              >
                <group data-direction="column" data-gap="10">
                  <text
                    data-weight="700"
                    data-text-size="xxx-large"
                    data-wrap="wrap"
                   
                  >
                    Switch
                  </text>
                  <text
                    data-wrap="wrap"
                    data-line="1.5"
                    // data-light=""
                    data-max-length="300"
                    data-index="1"
                  >
                    Switches are used to toggle the selection of an item,
                    turning it on or off as needed.
                  </text>
                </group>

                {/* <group data-mix-lend-mode="multiply" data-timing="fancy" data-duration=".725" data-translate-vertical={radioValue} data-contain="" data-position="absolute" data-right="0" data-height="600" data-max-length="400" data-direction="column" >
                    <picture   data-min-length="300" data-contain="" data-ratio="1:1" data-shrink="no">
                      <img src={sampleImage_2} alt="" />
                    </picture>
                  </group> */}

                <group data-gap="20" data-direction="column" data-weight="600">
                  <OptionBar
                    data-height="40"
                   // data-backdrop="3"
                   // data-background="main-lighter"
                    data-radius="5"
                    data-border="outline"

                    data-switch-color="invert"
                  >
                    <Radio
                      labelProps={{
                        "data-background": "main",
                      //  "data-color": "main-text-lighter-white",
                      }}
                      control={control}
                      radioType={RadioType.Button}
                      name="RadioDemo1"
                      radioValue="0"
                      label="Day"
                    />
                    <Radio
                      labelProps={{
                        "data-background": "main",
                     //   "data-color": "main-text-lighter-white",
                      }}
                      control={control}
                      radioType={RadioType.Button}
                      name="RadioDemo1"
                      radioValue="200"
                      label="Week"
                    />
                    <Radio
                      labelProps={{
                        "data-background": "main",
                    //    "data-color": "main-text-lighter-white",
                      }}
                      control={control}
                      radioType={RadioType.Button}
                      name="RadioDemo1"
                      radioValue="300"
                      label="Month"
                    />
                  </OptionBar>

                  <group>
                    <text
                      data-wrap="wrap"
                      data-light=""
                      data-line="1.5"
                      data-max-length="300"
                    >
                    The component is configured to use an inverted color scheme to enhance contrast against vibrant backgrounds.
                    </text>
                  </group>
                </group>
              </group>
            </group>

            <group
              data-radius="15"
              data-elevation="1"
              data-contain=""
              data-space="20"
              data-gap="10"
            >
              <group data-gap="10" data-background="main-background">
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

              <separator data-horizontal="" data-interval="10"></separator>
              <text
                data-wrap="wrap"
                data-light=""
                data-line="1.5"
                data-max-length="300"
              >
                Component configured to use a secondary color pallete and
                tooltips.
              </text>
            </group>

            <group
              data-gap="10"
              data-space="20"
              data-border=""
              data-background="context"
              data-radius="15"
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
                    // tooltip={ radio.label}
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

              <separator data-horizontal="" data-interval="10"></separator>

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

            <group data-gap="10" data-radius="5">
              <OptionBar
                data-length="autofit"
                data-height="40"
                data-weight="600"
              >
                {weekdays.map((option) => (
                  <Checkbox
                    tooltip={option.tooltip}
                    key={option.name}
                    control={control}
                    checkboxType={CheckboxType.Button}
                    name={option.name}
                    label={option.label}
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
              data-radius="15"
              data-elevation="1"
            >
              <OptionBar compact dynamic data-height="40">
                {radioViewData.map((radio, index) => (
                  <Radio
                    iconProps={{ "data-length": "30" }}
                    // tooltip={radio.label}
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

              <separator data-horizontal="" data-interval="10"></separator>
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

            <group
              data-space="20"
              data-border=""
              data-align="center"
              data-gap="10"
              data-background="context"
              data-radius="15"
              data-elevation="1"
            >
              <group
                data-contain=""
                data-space="15"
                data-interactive=""
                data-cursor="pointer"
                data-radius="10"
                data-width="auto"
                data-align="center"
                data-direction="column"
                data-background="secondary"
                data-color="secondary-text"
                data-weight="600"
                onClick={() => reset()}
              >
                <text>Reset Form</text>
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  );
};
export default CheckboxAndSwitchers;
