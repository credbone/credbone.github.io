import React, { useState, useEffect } from "react";
import Gauge from "../components/Gauge";

// Utility function to generate random values
const getRandomValue = (
  min: number,
  max: number,
  decimals: number = 0
): string => {
  const factor = Math.pow(10, decimals);
  return (Math.random() * (max - min) + min).toFixed(decimals);
};

// Define the type for MonitorCard items
interface MonitorCardType {
  title: string;
  value: string;
  unit?: string;
  color?: boolean;
  titleunit?: string;
  chart?: boolean;
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
    chart: true,
    max: 100,
  },
  {
    title: "GPU",
    value: getRandomValue(65, 75, 0),
    unit: "°",
    chart: true,
    max: 100,
  },
  {
    title: "Memory",
    value: getRandomValue(6, 6.7, 1),
    titleunit: "GB",
    chart: true,
    max: 32,
    showmax: true,
  },
  {
    title: "Network",
    value: getRandomValue(120, 140, 0),
    titleunit: "Kbps",
    max: 240,
  },
  { title: "FPS", value: getRandomValue(200, 240, 0), max: 240 },
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
            data-background={item.color ? "main" : "context"}
            data-color={item.color ? "main-text" : ""}
            key={index}
            data-space="20"
            data-border=""
            data-wrap="no"
            data-direction="column"
            data-radius="15"
            data-align="center"
            data-justify="center"
          //  data-ratio="1:1"
          >
            
              {item.chart && item.max && (
              <group data-ratio="1:1" data-direction="column" data-margin-bottom="-20">

                  {/* {item.showmax && (
                    <group
                      data-position="center"
                      data-width="auto"
                      data-opacity="30"
                    >
                      <text data-weight="700">{item.max}</text>
                    </group>
                  )} */}

                  <group data-position="absolute">
                    <Gauge
                      value={parseFloat(item.value)}
                      max={item.max}
                      size={100}
                    />
                  </group>

                            </group>
              )}


            <group  data-direction="column" data-align="center" >
              <group data-weight="700" data-text-size="x-large" data-width="auto">
                <text >{item.value}</text>

                {item.unit && <text data-position="absolute" data-left="full">{item.unit}</text>}
              </group>
              <group data-align="center" data-gap="5" data-wrap="no" data-width="auto">
                <text data-weight="800">{item.title}</text>

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
