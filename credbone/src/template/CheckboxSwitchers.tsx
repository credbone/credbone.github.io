import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import Checkbox, { CheckboxType } from "../components/inputs/checkbox";
import Tooltip from "../components/tooltip";
import Radio, { RadioType } from "../components/inputs/radio";
import OptionBar from "../components/inputs/optionBar";
import {
  IconHome,
  IconSearch,
  IconTableRows,
  IconViewColumn,
  IconViewStream,
  IconViewWindow,
} from "../components/icon/credIcons";

import sectionImage from "../styles/images/samples/wide_res_72.webp";
import TemplatePageHeader from "./TemplatePageHeader";
import Ripple from "../components/Ripple";
// import sectionImage_2 from "../styles/images/samples/wide_res_73.webp";

const CheckboxAndSwitchers: React.FC = () => {
  const { reset, control } = useForm<FieldValues>({
    defaultValues: {
      1: true,
      4: true,
      7: true,
      6: true,
      8: "Option3",
      option_9: true,
      // option_4: true,
      option_5: true,
      RadioDemo4: "yes",
      RadioViewDemo: "RadioViewDemo2",
      RadioViewDemo3: "RadioViewDemo1",
      RadioDemo: "RadioDemo1",
      RadioDemo1: "0",
    },
  });

  //const radioValue = watch("RadioDemo1");

  const weekdays = [
    { name: "option_1", label: "Mo",  tooltip: "Monday" },
    { name: "option_2", label: "Tu",  tooltip: "Tuesday" },
    { name: "option_3", label: "We",  tooltip: "Wednesday" },
    { name: "option_4", label: "Th",  tooltip: "Thursday" },
    { name: "option_5", label: "Fr",  tooltip: "Friday" },
    // { name: "option_6", label: "Sa",  tooltip: "Saturday" },
    // { name: "option_7", label: "Su",  tooltip: "Sunday" },
  ];

  // const checkboxData = [
  //   { name: "checkbox_option_1", label: "Forest", icon: "phone" },
  //   { name: "checkbox_option_2", label: "Oasis", icon: "book_2" },
  //   { name: "checkbox_option_4", label: "Sky", icon: "home" },
  //   { name: "checkbox_option_5", label: "River", icon: "headphones" },
  // ];

  const radioData = [
    { key: "1", name: "RadioDemo", icon: <IconSearch size={20} /> },
    { key: "2", name: "RadioDemo", icon: <IconHome size={20} /> },
    { key: "3", name: "RadioDemo", label: "Explore" },
    // { key: "4", name: "RadioDemo", label: "Nutrition" },
  ];

  const radioViewData = [
    {
      key: "1",
      name: "RadioViewDemo",
      label: "Stream Layout",
      icon: <IconViewStream size={20} />,
    },
    {
      key: "2",
      name: "RadioViewDemo",
      label: "Table Layout",
      icon: <IconTableRows size={20} />,
    },
    {
      key: "3",
      name: "RadioViewDemo",
      label: "Grid Layout",
      icon: <IconViewWindow size={20} />,
    },
    {
      key: "4",
      name: "RadioViewDemo",
      label: "Column Layout",
      icon: <IconViewColumn size={20} />,
    },
  ];

  return (
    <>
      <group data-gap="30" data-space="30" data-align="start">




        <TemplatePageHeader
        title="Checkbox & Radio"
        description="Checkboxes allow users to toggle individual items on or off or select multiple options from a list, while radio buttons restrict selection to a single option."
        version="2.0.0"
        type="Component"
      />


        <group data-gap="30">
          <group>
            <picture
            data-object-position="right"
              data-radius="50"
              data-contain=""
              data-brightness="adaptive"
              data-background="grey-light"
              data-position="absolute"
              // data-object-position="bottom"
            >
              <img src={sectionImage} alt="" />
            </picture>

            <group data-space="30">
              <group
                data-radius="20"
                data-background="main"
                data-space="30"
                data-gap="30"
                data-color="main-text"
                //   data-wrap="no"
                data-contain=""
                data-width="auto"

                // data-direction="column"
              >
                <group
                  data-height="60"
                  data-length=""
                  style={{ width: "54px" }}
                  data-contain=""
                >
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

                <separator data-vertical="adaptive" data-height=""></separator>

                <group
                  data-direction="column"
                  data-contain=""
                  data-width="auto"
                >
                  <text
                    data-wrap="wrap"
                    data-length="300"
                    data-line="1.5"
                    //    data-opacity="60"
                    data-weight="600"
                  >
                    Checkbox and its variations adapt seamlessly to different
                    backgrounds, with each element individually configurable.
                  </text>
                </group>
              </group>
            </group>
          </group>

          <group
            data-contain=""
            data-type="grid"
            data-grid-template="240"
            data-gap="1"
          >
            <group data-direction="column" data-wrap="no" data-gap="1">
              <group
                data-border=""
                data-space="30"
                data-space-vertical="20"
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
                data-space="30"
                data-space-vertical="20"
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
                data-space="30"
                data-space-vertical="20"
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

            <group data-wrap="no" data-direction="column" data-gap="1">
              <group data-border="" data-space="30" data-space-vertical="20">
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
                data-space="30"
                data-space-vertical="20"
              >
                <Checkbox name="11" simple control={control} />
              </group>
              <group
                data-width="auto"
                data-border=""
                data-space="30"
                data-space-vertical="20"
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

            <group data-wrap="no" data-direction="column" data-gap="1">
              <group data-border="" data-space="30" data-space-vertical="20">
                <Checkbox
                  name="6"
                  minimal
                  label="Minimal Checkbox"
                  control={control}
                />
              </group>
              <group data-border="" data-space="30" data-space-vertical="20">
                <Checkbox name="9" minimal control={control} />
              </group>

              <group data-border="" data-space="30" data-space-vertical="20">
                <Checkbox
                  name="7"
                  minimal
                  label="Disabled Checkbox 7"
                  disabled
                  control={control}
                />
              </group>
            </group>

            <group data-wrap="no" data-direction="column" data-gap="1">
              <group data-border="" data-space="30" data-space-vertical="20">
                <Radio
                  name="8"
                  radioValue="Option1"
                  label="Radio Button"
                  control={control}
                />
              </group>

              <group data-border="" data-space="30" data-space-vertical="20">
                <Radio
                  name="8"
                  radioValue="Option3"
                  label="Radio Button disabled"
                  control={control}
                  disabled
                />
              </group>
              <group data-border="" data-space="30" data-space-vertical="20">
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




          <TemplatePageHeader
        title="Switch"
        description="Switches are used to toggle the selection of an item, turning it
              on or off as needed."
descriptionProps={{"data-length":"300"}}
      />

          <group data-gap="30" data-align="start">
            <group
              data-contain=""
              data-space="30"
              data-gap="30"
              data-direction="column"
              data-align="start"
            >
              <group
                data-gap="10"
                data-background="main-background"
                data-width="auto"
              >
                <OptionBar
                  compact
                  dynamic
                  data-palette="lighter"
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

              <text
                data-wrap="wrap"
                data-light=""
                data-line="1.5"
                data-max-length="300"
              >
                Component configured to use a lighter color pallete and
                tooltips.
              </text>

              <group
                data-direction="column"
                data-width="auto"
                data-align="start"
                data-gap="30"
              >
                <separator data-horizontal=""></separator>

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

                <text
                  data-wrap="wrap"
                  data-light=""
                  data-line="1.5"
                  data-max-length="200"
                >
                  Configured to use labels for every selected option.
                </text>
              </group>

              <group
                data-direction="column"
                data-width="auto"
                data-align="start"
                data-gap="30"
              >
                <separator data-horizontal=""></separator>

                <group
                  data-name="option-group"
                  data-width="auto"
                  data-space="5"
                  data-border=""
                  data-radius="15"
                  data-contain=""
                >
                  {radioData.map((radio, index) => (
                    <Radio
                      // tooltip={ radio.label}
                      labelProps={{ "data-background": "none" }}
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
                </group>

                <group data-width="auto">
                  <text
                    data-wrap="wrap"
                    data-light=""
                    data-line="1.5"
                    data-max-length="300"
                  >
                    The component is set up to use an alternate wrapper,
                    offering a adjusted UI for specific requirements.
                  </text>
                </group>
              </group>
            </group>

            <separator data-horizontal=""></separator>

            <group
              data-gap="30"
              data-space="30"
              data-direction="column"
              data-align="start"
            >
              {/* <OptionBar
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
              </OptionBar> */}

              {/* <OptionBar data-length="300" data-height="40" data-weight="600">
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
              </OptionBar> */}

                            <OptionBar
 data-length="400"
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

              <text
                data-wrap="wrap"
                data-light=""
                data-line="1.5"
                data-max-length="300"
              >
                The switch is configurable to function as either a picker or a
                toggle, based on the selected options.
              </text>



              <group
                data-direction="column"
                data-width="auto"
                data-align="start"
                data-gap="30"
              >
                <separator data-horizontal=""></separator>
<Ripple>
                  <group
                  data-contain=""
                  data-space-vertical="15"
                  data-space-horizontal="30"
                  data-interactive=""
                  data-cursor="pointer"
                  data-radius="15"
                  data-width="auto"
                  data-align="center"
                  data-direction="column"
                  data-background="adaptive-gray"
                  data-weight="700"
                  onClick={() => reset()}
                >
                  <text>Reset Form</text>
                </group>
</Ripple>
              </group>
            </group>

            {/* <group
              data-space="30"
          //    data-border=""
              data-align="center"
              data-gap="30"
          //    data-background="context"
          //    data-radius="15"
            >


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

            <separator data-horizontal=""></separator> */}
          </group>
        </group>
      </group>
    </>
  );
};
export default CheckboxAndSwitchers;
