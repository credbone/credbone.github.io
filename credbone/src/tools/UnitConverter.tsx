import React, { useEffect, useState } from "react";
import Popover from "../components/popover";
import Ripple from "../components/Ripple";
import Tooltip from "../components/tooltip";

const UnitConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState<number>(1); // Default to 1 for conversions
  const [toValue, setToValue] = useState<number>(0);
  const [conversionType, setConversionType] = useState< "mass" | "length" | "pressure" | "volume" | "time" | "digitalStorage" >("mass");
  const [fromUnit, setFromUnit] = useState<string>("kg");
  const [toUnit, setToUnit] = useState<string>("g");

  const units = {
    mass: [
      { unit: "mg", name: "mg", full: "Milligram" },
      { unit: "g", name: "g", full: "Gram" },
      { unit: "kg", name: "kg", full: "Kilogram" },
      { unit: "lb", name: "lb", full: "Pound" },
      { unit: "oz", name: "oz", full: "Ounce" },
      { unit: "t", name: "ton", full: "Ton" },
    ],
    length: [
      { unit: "mm", name: "mm", full: "Millimeter" },
      { unit: "cm", name: "cm", full: "Centimeter" },
      { unit: "m", name: "m", full: "Meter" },
      { unit: "km", name: "km", full: "Kilometer" },
      // { unit: "in", name: "inch", full: "Inch" },
      // { unit: "ft", name: "foot", full: "Foot" },
      // { unit: "yd", name: "yard", full: "Yard" },
      // { unit: "mi", name: "mile", full: "Mile" },
    ],
    pressure: [
      { unit: "Pa", name: "pa", full: "Pascal" },
      { unit: "bar", name: "bar", full: "Bar" },
      { unit: "atm", name: "atm", full: "Atmosphere" },
    ],
    volume: [
      { unit: "mL", name: "ml", full: "Milliliter" },
      { unit: "L", name: "liter", full: "Liter" },
      { unit: "gal", name: "gallon", full: "Gallon" },
      { unit: (<text>m<sup>3</sup></text>), name: "cubic_meter", full: "Cubic Meter", },
      { unit: (<text>in<sup>3</sup></text>), name: "cubic_inch", full: "Cubic Inch", },
    ],
    time: [

      { unit: "sec", name: "second", full: "Second" },
      { unit: "min", name: "minute", full: "Minute" },
      { unit: "hr", name: "hour", full: "Hour" },
      { unit: "day", name: "day", full: "Day" },
    ],
    digitalStorage: [
      { unit: "B", name: "byte", full: "Byte" },
      { unit: "KB", name: "kilobyte", full: "Kilobyte" },
      { unit: "MB", name: "megabyte", full: "Megabyte" },
      { unit: "GB", name: "gigabyte", full: "Gigabyte" },
      { unit: "TB", name: "terabyte", full: "Terabyte" },
    ],
  };

  const conversions: {
    [key: string]: {
      name: string;
      description: string;
      units: { [key: string]: number };
    };
  } = {
    mass: {
      name: "Mass",
      description: "Units for measuring the amount of matter in an object.",
      units: {
        kg: 1,
        g: 1000,
        mg: 1000000,
        lb: 2.20462,
        oz: 35.274,
        ton: 0.001,
      },
    },
    length: {
      name: "Length",
      description: "Units for measuring distance or dimension.",
      units: {
        m: 1,
        cm: 100,
        mm: 1000,
        km: 0.001,
        inch: 39.3701,
        foot: 3.28084,
        yard: 1.09361,
        mile: 0.000621371,
      },
    },
    pressure: {
      name: "Pressure",
      description: "Units for measuring force per unit area.",
      units: {
        bar: 1,
        pa: 100000,
        atm: 0.986923,
      },
    },
    volume: {
      name: "Volume",
      description: "Units for measuring the amount of space an object occupies.",
      units: {
        liter: 1,
        ml: 1000,
        gallon: 0.264172,
        cubic_meter: 0.001,
        cubic_inch: 61.0237,
      },
    },
    time: {
      name: "Time",
      description: "Units for measuring the duration of events.",
      units: {
        second: 1,
        minute: 1 / 60, // 1 minute equals 1/60th of a second
        hour: 1 / 3600, // 1 hour equals 1/3600th of a second
        day: 1 / 86400, // 1 day equals 1/86400th of a second
      },
    },
    digitalStorage: {
      name: "Digital Storage",
      description: "Units for measuring data storage size.",
      units: {
        byte: 1,
        kilobyte: 1 / 1024, // 1 kilobyte equals 1/1024th of a byte
        megabyte: 1 / 1024 ** 2, // 1 megabyte equals 1/1,048,576th of a byte
        gigabyte: 1 / 1024 ** 3, // 1 gigabyte equals 1/1,073,741,824th of a byte
        terabyte: 1 / 1024 ** 4, // 1 terabyte equals 1/1,099,511,627,776th of a byte
      },
    },
  };
  

  const convertValue = (
    value: number,
    from: string,
    to: string,
    type: string
  ): number => {
   
    
    const converted = (value * conversions[type].units[to]) / conversions[type].units[from];
    switch (type) {

      case 'time':
        return converted < 0.00001 ? 0 : Math.round(converted * 100000) / 100000;

  
      default:
        return converted; 
    }


  };

  useEffect(() => {
    const convertedValue = convertValue(
      fromValue,
      fromUnit,
      toUnit,
      conversionType
    );
    setToValue(convertedValue);
  }, [fromValue, fromUnit, toUnit, conversionType]);

  const handleFromInputChange = (value: number) => {
    setFromValue(value);
    const convertedValue = convertValue(
      value,
      fromUnit,
      toUnit,
      conversionType
    );
    setToValue(convertedValue);
  };

  const handleToInputChange = (value: number) => {
    setToValue(value);
    const convertedValue = convertValue(
      value,
      toUnit,
      fromUnit,
      conversionType
    );
    setFromValue(convertedValue);
  };

  const handleConversionTypeChange = ( type: "mass" | "length" | "pressure" | "volume" | "time" | "digitalStorage" ) => { setConversionType(type);

    // Update from and to units to the first items in the list for the selected type
    const newFromUnit = units[type][1].name;
    const newToUnit = units[type][0].name;

    setFromUnit(newFromUnit);
    setToUnit(newToUnit);
    setFromValue(1); // Reset input to default value of 1

    // Recalculate the conversion with the new units
    const convertedValue = convertValue(
      fromValue,
      newFromUnit,
      newToUnit,
      type
    );
    setToValue(convertedValue);
  };

  const handleFromUnitChange = (unitName: string) => {
    setFromUnit(unitName);
    const convertedValue = convertValue(
      fromValue,
      unitName,
      toUnit,
      conversionType
    );
    setToValue(convertedValue);
  };

  const handleToUnitChange = (unitName: string) => {
    setToUnit(unitName);
    const convertedValue = convertValue(
      fromValue,
      fromUnit,
      unitName,
      conversionType
    );
    setToValue(convertedValue);
  };

  // Helper function to get the full name of a unit based on its name name
  const getFullUnitName = (unit: string) => {
    const unitObj = units[conversionType].find((u) => u.name === unit);
    return unitObj ? unitObj.full : unit; // Return full name or name name if not found
  };

  const getFormula = () => {
    if (fromUnit === toUnit) {
      return null; // No message if the units are the same
    }

    const conversionFactor =
      conversions[conversionType].units[toUnit] /
      conversions[conversionType].units[fromUnit];


      let displayConversionFactor = conversionFactor;

      switch (conversionType) {

        case 'time':
          // Round for mass and length
         
          displayConversionFactor = Math.round(conversionFactor * 100000) / 100000;
          break;
    
    
        default:
          // Default case, no rounding needed
          break;
      }
      
  

    return (
      <>
        Multiply the {getFullUnitName(fromUnit)} value by <b>{displayConversionFactor}</b> to get the {getFullUnitName(toUnit)} value.
      </>
    );
  };

  return (
    <group data-direction="column" data-gap="10">
      {/* Select conversion type */}


      <group data-direction="column" data-gap="10">
        <group data-background="highlight" data-contain="" data-radius="10">
          <Popover
        //    placement="mouse"
            data-space="5"
            content={(closePopover) => (
              <group
                data-length="200"
                data-direction="column"
                data-contain=""
                onClick={closePopover}
              >
                {[
                  "mass",
                  "length",
                  "pressure",
                  "volume",
                  "time",
                  "digitalStorage",
                ].map((type) => (

                  <group
                    data-radius="5"
                    key={type}
                    data-cursor="pointer"
                    data-interactive=""
                    data-space="15"
                    data-background={conversionType === type ? "main" : ""}
                    data-color={conversionType === type ? "main-text" : ""}
                    onClick={() =>
                      handleConversionTypeChange(
                        type as
                          | "mass"
                          | "length"
                          | "pressure"
                          | "volume"
                          | "time"
                          | "digitalStorage"
                      )
                    }
                  >

<text data-weight="600" data-ellipsis="">
                    {conversions[type].name}
                    </text>

                    
                  </group>

                ))}
              </group>
            )}
          >
            <group>
              <Ripple>
                <group
                  data-cursor="pointer"
                  data-contain=""
                  data-interactive=""
                  data-space="15"
                 // data-space-horizontal="15"
                  data-wrap="no"
                  data-align="center"
                  data-gap="15"
                >

                  <text data-ellipsis="" data-weight="600">
                  {conversions[conversionType].name}
                  </text>

                </group>
              </Ripple>
            </group>
          </Popover>
        </group>

        <group
        //  data-elevation="2"
          data-border=""
          data-contain=""
          data-radius="10"
          data-direction="column"
          data-index="2"
        //  data-background="context"
        >
          <group data-direction="column" data-space="5">
            <group>
              <input
                data-name="input-reset"
                data-weight="300"
                data-text-size="xx-large"
                placeholder="0"
                data-length="fit"
                data-space="10"
                type="number"
                value={fromValue}
                onChange={(e) =>
                  handleFromInputChange(parseFloat(e.target.value))
                }
              />
            </group>

            <Popover
              data-space="5"
              content={(closePopover) => (
                <group
                  data-length="200"
                  data-direction="column"
                  onClick={closePopover}
                >
                  {units[conversionType].map(({ name, full, unit }) => (
                    <group
                      key={name}
                      onClick={() => handleFromUnitChange(name)}
                      data-radius="5"
                      data-cursor="pointer"
                      data-interactive=""
                      data-space="15"
                      data-background={fromUnit === name ? "main" : ""}
                      data-color={fromUnit === name ? "main-text" : ""}
                    >
                      <text
                        data-ellipsis=""
                        data-weight="600"
                        data-position="left"
                      >
                        {full}
                      </text>
                      <text data-opacity="60">{unit}</text>
                    </group>
                  ))}
                </group>
              )}
            >
              <group>
                <Ripple>
                  <group
                    data-cursor="pointer"
                    data-contain=""
                    data-interactive=""
                    data-space="10"
                    data-radius="5"
                    data-wrap="no"
                    data-align="center"
                    data-gap="5"
                  >
                    <text data-ellipsis="">{getFullUnitName(fromUnit)}</text>
                  </group>
                </Ripple>
              </group>
            </Popover>
          </group>

          <group 
        //  data-space-horizontal="15"
           data-opacity="50">
            <separator data-horizontal="dotted"></separator>
          </group>

          <group data-direction="column" data-space="5">
            <group>
              <input
                data-name="input-reset"
                data-weight="300"
                data-text-size="xx-large"
                placeholder="0"
                data-length="fit"
                data-space="10"
                type="number"
                value={toValue}
                onChange={(e) =>
                  handleToInputChange(parseFloat(e.target.value))
                }
              />
            </group>

            {/* To Unit Select using Popover */}
            <Popover
              data-space="5"
              content={(closePopover) => (
                <group
                  data-length="200"
                  data-direction="column"
                  onClick={closePopover}
                >
                  {units[conversionType].map(({ name, full, unit }) => (
                    <group
                      key={name}
                      onClick={() => handleToUnitChange(name)}
                      data-radius="5"
                      data-cursor="pointer"
                      data-interactive=""
                      data-space="15"
                      data-background={toUnit === name ? "main" : ""}
                      data-color={toUnit === name ? "main-text" : ""}
                    >
                      <text
                        data-ellipsis=""
                        data-weight="600"
                        data-position="left"
                      >
                        {full}
                      </text>

                      <text data-opacity="60">{unit}</text>
                    </group>
                  ))}
                </group>
              )}
            >
              <group>
                <Ripple>
                  <group
                    data-cursor="pointer"
                    data-contain=""
                    data-interactive=""
                    data-space="10"
                    data-wrap="no"
                    data-align="center"
                    data-gap="5"
                    data-radius="5"
                  >
                    <text data-ellipsis="">{getFullUnitName(toUnit)}</text>
                  </group>
                </Ripple>
              </group>
            </Popover>
          </group>
        </group>
      </group>

      {getFormula() && (
        <group data-gap="10" data-space="15" data-direction="column" data-align="start" data-max-length="260">
          <group
            data-background="amber-light"
            data-color="brown-dark"
            data-width="auto"
            data-space="10"
            data-radius="10"
          >
            <text data-weight="700">Formula</text>
          </group>
          <text data-wrap="wrap" data-line="20">
            {getFormula()}
          </text>
        </group>
      )}
    </group>
  );
};

export default UnitConverter;
