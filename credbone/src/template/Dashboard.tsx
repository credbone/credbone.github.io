import React, { useState, useEffect } from "react";
import Gauge from "../components/Gauge";
import LineChart from "../components/LineChart";

// Utility function to generate random values
const getRandomValue = (
  min: number,
  max: number,
  decimals: number = 0
): string => {
  const factor = Math.pow(10, decimals);
  return (Math.random() * (max - min) + min).toFixed(decimals);
};


type ChartType = "gauge" | "line" | "none";

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
}

// Function to generate the MonitorCard data
const generateMonitorCardData = (): MonitorCardType[] => [
  {
    title: "CPU",
    value: getRandomValue(29, 42, 0),
    unit: "°",
    //color: true,
    chart: "gauge",
    max: 100,
  },
  {
    title: "GPU",
    value: getRandomValue(65, 75, 0),
    unit: "°",
    chart: "gauge",
    max: 100,
  },
  {
    title: "Memory",
    value: getRandomValue(12, 13.7, 1),
    titleunit: "GB",
    chart: "gauge",
    max: 32,
    showmax: true,
  },
  {
    title: "Network",
    value: getRandomValue(90, 160, 0),
    titleunit: "Kbps",
    max: 240,
    chart:"line"

  },
  {
    title: "FPS",
    value: getRandomValue(200, 240, 0),
    max: 240,

  },
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
          <text data-weight="700" data-text-size="xxx-large" data-wrap="wrap">
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
        data-grid-template="160"
        data-gap="15"
        data-max-length="900"
      >
        {monitorCard.map((item, index) => (
          <group
            data-contain=""
         //  data-background={item.chart === "line" ? "secondary-lighter" : "main-background"}
            data-color={item.color ? "main-text" : ""}
            key={index}
            data-space={item.chart === "line" ? "" : "20"}
            //data-space="20"
            data-border=""
            data-wrap="no"
            data-direction="column"
            data-radius="15"
            data-align="center"
            data-justify="center"
           data-ratio="2:3"
          >
            
              {item.chart === "gauge" && item.max &&  (
              <group data-direction="column" data-margin-bottom="-30">

                  {/* {item.showmax && (
                    <group
                      data-position="center"
                      data-width="auto"
                      data-opacity="30"
                    >
                      <text data-weight="700">{item.max}</text>
                    </group>
                  )} */}

                  <group >
                    <Gauge
                      value={parseFloat(item.value)}
                      max={item.max}
                      size={100}
                    />
                  </group>

                            </group>
            )}
            
            {item.chart === "line" && item.max && (
              <group data-direction="column" >
                <LineChart value={parseFloat(item.value)} max={item.max} />
              </group>
            )}


            <group
           
            //  style={{ mask: 'url(#mask1)' }}
            //   data-background={item.chart === "line" ? "red" : ""}
              data-space={item.chart === "line" ? "30" : ""}
             data-color={item.chart === "line" ? "main-text" : ""}
              data-direction="column"
              data-align="center"
              data-justify="center"
              data-bottom="0"
           // data-height={item.chart === "line" ? "fit" : ""}
               data-position={item.chart === "line" ? "absolute" : ""}
            >
              <group 
              data-weight="700" 
              data-text-size={item.chart === "line" ? "xx-large" : "x-large"}
               data-width="auto"
               >
                <text >{item.value}</text>

                {item.unit && <text data-position="absolute" data-left="full">{item.unit}</text>}
              </group>
              <group data-align="center" data-gap="5" data-wrap="no" data-width="auto">
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
        ))}
      </group>

      <separator data-horizontal="" data-max-length="700"></separator>
    </group>
  );
};

export default Dashboard;
