import React, { useState, useEffect } from "react";
import Gauge from "../components/dashboard/Gauge";
import LineChart from "../components/dashboard/LineChart";
import GaugeZoom from "../components/dashboard/GaugeZoom";
import GaugeSimple from "../components/dashboard/GaugeSimple";
import sampleImage from "../styles/images/samples/res_73.jpg";

// Utility function to generate random values
const getRandomValue = (
  min: number,
  max: number,
  decimals: number = 0
): string => {
  // const factor = Math.pow(10, decimals);
  return (Math.random() * (max - min) + min).toFixed(decimals);
};

const getRandomStepValue = (
  min: number,
  max: number,
  step: number,
  decimals: number = 0
): string => {
  //const factor = Math.pow(10, decimals);
  const steps = Math.floor((max - min) / step);
  const randomStep = Math.floor(Math.random() * (steps + 1));
  const value = min + randomStep * step;
  return value.toFixed(decimals);
};

type ChartType = "gauge" | "gaugesimple" | "line" | "none" | "gaugezoom";

// Define the type for MonitorCard items
interface MonitorCardType {
  title: string;
  value: string;
  unit?: string;
  color?: boolean;
  titleunit?: string;
  chart?: ChartType;
  max?: number;
  showmax?: boolean;
  wide?:boolean;
  long?:boolean;
  shortname?: string;
}

// Function to generate the MonitorCard data
const generateMonitorCardData = (): MonitorCardType[] => [
  { title: "Temperature", shortname:"CPU", value: getRandomValue(29, 35, 0), chart: "gaugesimple", titleunit: "Celsius", max: 100,long:true  },
  { title: "Panel Tilt", value: getRandomStepValue(11, 26, 5), unit: "°", max: 360, chart: "gaugezoom",},

   { title: "CPU Load", value: getRandomValue(10, 20, 0), unit: "", chart: "none", titleunit: "", max: 100, showmax: true, },
  { title: "GPU", value: getRandomValue(65, 75, 0), unit: "°",titleunit: "Celsius", chart: "gauge", max: 100, showmax: true, },
  { title: "Memory", value: getRandomValue(12, 13.7, 1),unit: "", titleunit: "GB", chart: "gauge", max: 32, showmax: true, },

  { title: "Network", value: getRandomValue(90, 160, 0),  titleunit: "Kbps", max: 240, chart: "line", },

  { title: "FPS", value: getRandomValue(200, 240, 0), max: 240, chart: "none",  },
  
  { title: "Blade Angle", value: getRandomStepValue(90, 160, 5), unit: "°", max: 360, chart: "gaugezoom", wide:true},
];

const Dashboard: React.FC = () => {
  const [monitorCard, setMonitorCard] = useState<MonitorCardType[]>(
    generateMonitorCardData()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMonitorCard(generateMonitorCardData());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  


  return (
    <group
      data-space="30"
      data-gap="30"
      data-direction="column"
      data-align="start"
    >
      <group data-gap="20">
        <group data-direction="column">
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-color="main"
            data-ellipsis=""
          >
            Dashboard
          </text>
        </group>

        <group
        // data-animation-name="appear-bottom"
        // data-fill-mode="backwards"
        // data-animation-duration="1.5"
        >
          <text
            data-wrap="wrap"
            data-length="400"
            data-line="1.5"
            data-light=""
              data-ellipsis=""
          >
            Demo features a simple dashboard interface designed for monitoring
            hardware. It includes various widgets that display real-time
            simulated data, offering a clear view of performance metrics and
            status updates.
          </text>
        </group>
      </group>

      <group
      
        data-type="grid"
        data-grid-template="180/120"
        data-gap="10"
        // data-max-length="900"
      >

<group   data-row-end="2" data-height="fit" data-radius="15" data-direction="column">

<picture
             data-radius="15"
              data-contain=""
              data-brightness="adaptive"
              data-position="absolute"
              data-background="grey-light"
            >
              <img src={sampleImage} alt="" />
            </picture>




</group>

        {monitorCard.map((item, index) =>
          item.chart === "gauge" && item.max ? (
            <group
              key={index}
              data-height="fit"
              data-contain=""
              data-space="20"
              data-column-end={item.wide === true ? "2" : ""}
              data-border=""
              data-wrap="no"
              data-direction="column"
              data-radius="15"
              data-align="center"
              data-justify="center"
              data-ratio={item.wide === true ? "4:3" : "2:3"}

              data-gap="20"
            >
              <group>
                <group data-direction="column">
                  <group>
                    <Gauge
                      value={parseFloat(item.value)}
                      max={item.max}
                      size={100}
                      {...(item.unit ? { unit: item.unit } : {})}
                      
                    />
                  </group>
                </group>
              </group>

              <group
                data-direction="column"
                data-align="center"
                data-justify="center"
              >

                <group
                  data-align="center"
                  data-wrap="no"
                  data-width="auto"
                  data-direction="column"
                  data-gap="5"
                >
                  <group data-gap="5" data-wrap="no" data-width="auto">
                    <text data-weight="600">{item.title}</text>

                    {item.titleunit && (
                      <>
                        <dot></dot>
                        <text   data-ellipsis="">{item.titleunit}</text>
                      </>
                    )}
                  </group>

                  {item.showmax && (
<>
<separator data-horizontal=""></separator>
<text data-opacity="30">Available {item.max} </text>
</>
                  )}
                </group>
              </group>
            </group>
          ) : item.chart === "gaugesimple" && item.max ? (
            <group
              data-background="main"
              data-color="main-text"
              key={index}
              data-height="fit"
              data-contain=""
              data-space="20"
              data-column-end={item.wide === true ? "2" : ""}
              data-row-end={item.long === true ? "2" : ""}
              //  data-border=""
              data-wrap="no"
              data-direction="column"
              data-radius="15"
              data-align="center"
              data-justify="center"
              data-ratio={item.wide === true ? "4:3" : "2:3"}
              data-gap="20"
            >
              <group>
                <GaugeSimple
                  value={parseFloat(item.value)}
                  max={item.max}
                  size={100}
                  {...(item.unit ? { unit: item.unit } : {})}
                  {...(item.shortname ? { shortname: item.shortname } : {})}
                />
              </group>

              <group
                data-direction="column"
                data-align="center"
                data-justify="center"
                data-bottom="0"
              >
                <group
                  data-align="center"
                  data-wrap="no"
                  data-width="auto"
                  data-direction="column"
                  data-gap="5"
                >
                  <text   data-ellipsis="" data-weight="600">{item.title}</text>

                  {item.titleunit && (
                    <>
                    <separator data-horizontal=""></separator>
                      <text data-opacity="40"   data-ellipsis="">{item.titleunit}</text>
                    </>
                  )}
                </group>
              </group>
            </group>
          ) : item.chart === "line" && item.max ? (
            <group
              data-height="fit"
              data-contain=""
              key={index}
              data-column-end={item.wide === true ? "2" : ""}
              data-border=""
              data-wrap="no"
              data-direction="column"
              data-radius="15"
              data-align="center"
              data-justify="center"
              data-ratio={item.wide === true ? "4:3" : "2:3"}
            >
              <group data-direction="column" data-height="fit">
                <LineChart value={parseFloat(item.value)} max={item.max} />
              </group>

              <group
                data-space="30"
                data-color="main-text"
                data-direction="column"
                data-align="center"
                data-justify="center"
                data-bottom="0"
                data-position="absolute"
              >
                <group data-weight="700" data-width="auto"></group>
                <group
                  data-align="center"
                  data-gap="5"
                  data-wrap="no"
                  data-width="auto"
                   data-direction="column"
                  
                  
                >
                  <text data-weight="600" data-ellipsis=""   >{item.title}</text>

                  {item.titleunit && (
                    <>
                     <separator data-horizontal=""></separator>
                      <text data-opacity="40"  >{item.titleunit}</text>
                    </>
                  )}
                </group>
              </group>
            </group>
          ) : item.chart === "gaugezoom" && item.max ? (
            <group
              data-height="fit"
              data-contain=""
              key={index}
              data-column-end={item.wide === true ? "2" : ""}
              data-row-end={item.long === true ? "2" : ""}
              data-border=""
              data-wrap="no"
              data-direction="column"
              data-radius="15"
              data-align="center"
              data-justify="center"
              data-ratio={item.wide === true ? "4:3" : "2:3"}
            >
              {item.chart === "gaugezoom" && item.max && (
                <group
                  data-direction="column"
                  data-height="fit"
                  data-align="center"
                >
                  <GaugeZoom
                    value={parseFloat(item.value)}
                    max={item.max}
                    size={100}
                  />
                </group>
              )}

              <group
                data-space="30"
                data-direction="column"
                data-align="center"
                data-justify="center"
                data-bottom="0"
                data-position="absolute"
              >
                <group
                  data-weight="700"
                  data-text-size="x-large"
                  data-width="auto"
                >
                  <group data-direction="column" data-height="fit">
                    <text>{item.value}</text>
                  </group>

                  {item.unit && (
                    <text data-position="absolute"  data-left="full">
                      {item.unit}
                    </text>
                  )}
                </group>
                <group
                  data-align="center"
                  data-gap="5"
                  data-wrap="no"
                  data-width="auto"
                >
                  <text   data-ellipsis="" data-weight="600">{item.title}</text>

                  {item.titleunit && (
                    <>
                      <dot></dot>
                      <text   data-ellipsis="">{item.titleunit}</text>
                    </>
                  )}
                </group>
              </group>
            </group>
          ) : (
            <group
              data-height="fit"
              data-contain=""
              key={index}
              data-space={item.chart === "line" ? "" : "20"}
              data-column-end={item.wide === true ? "2" : ""}
              data-border=""
              data-wrap="no"
              data-direction="column"
              data-radius="15"
              data-align="center"
              data-justify="center"
              data-ratio={item.wide === true ? "4:3" : "2:3"}
            >
              <group
                data-direction="column"
                data-align="center"
                data-justify="center"
              >
                <group
                  data-weight="700"
                  data-text-size="xx-large"
                  data-width="auto"
                >
                  <group data-direction="column" data-height="fit">
                    <text>{item.value}</text>
                  </group>

                  {item.unit && (
                    <text data-position="absolute" data-left="full">
                      {item.unit}
                    </text>
                  )}
                </group>
                <group
                  data-align="center"
                  data-gap="5"
                  data-wrap="no"
                  data-width="auto"
                >
                  <text data-weight="600">{item.title}</text>

                  {item.titleunit && (
                    <>
                      <dot></dot>
                      <text>{item.titleunit}</text>
                    </>
                  )}
                </group>
              </group>
            </group>
          )
        )}
      </group>
    </group>
  );
};

export default Dashboard;
