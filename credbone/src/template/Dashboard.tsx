import React, { useState, useEffect } from "react";

// Utility function to generate random values
const getRandomValue = (min: number, max: number, decimals: number = 0): string => {
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
}

// Function to generate the MonitorCard data
const generateMonitorCardData = (): MonitorCardType[] => [
  { title: "CPU", value: getRandomValue(29, 42, 0), unit: "°", color: true },
  { title: "GPU", value: getRandomValue(25, 35, 0), unit: "°" },
  { title: "Memory", value: getRandomValue(6, 7, 1), titleunit: "GB" },
  { title: "Network", value: getRandomValue(120, 140, 0), titleunit: "Kbps" },
  { title: "FPS", value: getRandomValue(200, 240, 0) },
];

const Dashboard: React.FC = () => {
  const [monitorCard, setMonitorCard] = useState<MonitorCardType[]>(generateMonitorCardData());

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
      <group>
        <group data-direction="column" data-gap="10">
          <text data-weight="700" data-text-size="xxx-large" data-wrap="wrap">
            Monitoring
          </text>
        </group>

        <group
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="1.5"
        >
          <text
            data-wrap="wrap"
            data-length="610"
            data-line="20"
            data-light=""
          ></text>
        </group>
      </group>

      <group data-type="grid" data-grid-template="200" data-gap="10">
        {monitorCard.map((item, index) => (
          <group
            data-background={item.color ? "main" : ""}
            data-color={item.color ? "main-text" : ""}
            key={index}
            data-space="20"
            data-elevation="1"
            data-radius="15"
            data-direction="column"
            data-gap="5"
          >
            <group data-align="center" data-gap="5">
              <text data-weight="800">{item.title}</text>

              {item.titleunit && (
                <>
                  <dot></dot>
                  <text>{item.titleunit}</text>
                </>
              )}
            </group>
            <group data-weight="700" data-text-size="xx-large">
              <text>{item.value}</text>

              {item.unit && <text>{item.unit}</text>}
            </group>
          </group>
        ))}
      </group>

      <separator data-horizontal=""></separator>
    </group>
  );
};

export default Dashboard;
