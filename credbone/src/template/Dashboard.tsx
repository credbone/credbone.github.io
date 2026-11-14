import React, { useState, useEffect } from "react";
import Gauge from "../components/dashboard/Gauge";
import LineChart from "../components/dashboard/LineChart";
import GaugeZoom from "../components/dashboard/GaugeZoom";
import GaugeSimple from "../components/dashboard/GaugeSimple";
import SortableGrid from "../components/SortableGrid";
import Ripple from "../components/Ripple";

import sampleImage from "../styles/images/samples/wide_res_71.webp";

import TemplatePageHeader from "./TemplatePageHeader";

// Utility function to generate random values
const getRandomValue = (
  min: number,
  max: number,
  decimals: number = 0,
): string => {
  // const factor = Math.pow(10, decimals);
  return (Math.random() * (max - min) + min).toFixed(decimals);
};

const getRandomStepValue = (
  min: number,
  max: number,
  step: number,
  decimals: number = 0,
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
  wide?: boolean;
  long?: boolean;
  shortname?: string;
  description?: string;
}

// Function to generate the MonitorCard data
const generateMonitorCardData = (): MonitorCardType[] => [
  {
    title: "Temperature",
    shortname: "CPU",
    value: getRandomValue(29, 35, 0),
    chart: "gaugesimple",
    titleunit: "Celsius",
    max: 100,
    description: "CPU package temperature, refreshed every second.",
  },
  {
    title: "Panel Tilt",
    value: getRandomStepValue(10, 25, 5),
    unit: "°",
    max: 360,
    chart: "gaugezoom",
    description: "Panel angle, adjusted in 5° steps.",
  },
  //  { title: "CPU Load", value: getRandomValue(10, 20, 0), unit: "", chart: "none", titleunit: "", max: 100, showmax: true, },
  {
    title: "GPU",
    value: getRandomValue(65, 75, 0),
    unit: "°",
    titleunit: "Celsius",
    chart: "gauge",
    max: 100,
    showmax: true,
    description: "Graphics core temperature against a 100 °C limit.",
  },
  {
    title: "Memory",
    value: getRandomValue(12, 13.7, 1),
    unit: "",
    titleunit: "GB",
    chart: "gauge",
    max: 32,
    showmax: true,
    description: "RAM in use out of 32 GB installed.",
  },
  {
    title: "Network",
    value: getRandomValue(110, 150, 0),
    titleunit: "Kbps",
    max: 240,
    chart: "line",
    description: "Live throughput over the last few seconds.",
  },
  //{ title: "FPS", value: getRandomValue(200, 240, 0), max: 240, chart: "none",   },
  // { title:"",value:"",chart:"none",},
  // { title: "Blade Angle", value: getRandomStepValue(90, 160, 5), unit: "°", max: 360, chart: "gaugezoom", wide:true},
];

// Attributes every card face shares; each chart type adds its own on top
const FACE_ATTRIBUTES = {
  "data-height": "fit",
  "data-contain": "",
  "data-radius": "30",
  "data-wrap": "no",
  "data-direction": "column",
  "data-align": "center",
  "data-justify": "center",
  "data-backface-visibility": "hidden",
};

// Front face look per chart type
const frontAttributes = (item: MonitorCardType) => {
  switch (item.chart) {
    case "gauge":
      return { "data-space": "20", "data-gap": "20" };
    case "gaugesimple":
      return {
        "data-background": "main",
        "data-color": "main-text",
        "data-space": "20",
        "data-gap": "20",
      };
    case "line":
    case "gaugezoom":
      return {};
    default:
      return { "data-space": "20" };
  }
};

// Front face content per chart type
const renderFront = (item: MonitorCardType) =>
  item.chart === "gauge" && item.max ? (
    <>
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

      <group data-direction="column" data-align="center" data-justify="center">
        <group
          data-align="center"
          data-wrap="no"
          data-width="auto"
          data-direction="column"
          data-gap="10"
        >
          <group data-gap="5" data-wrap="no" data-width="auto">
            <text data-weight="700">{item.title}</text>

            {item.titleunit && (
              <text data-opacity="60" data-ellipsis="">
                {item.titleunit}
              </text>
            )}
          </group>

          {item.showmax && (
            <>
              <separator data-horizontal=""></separator>
              <text data-opacity="30">Max {item.max} </text>
            </>
          )}
        </group>
      </group>
    </>
  ) : item.chart === "gaugesimple" && item.max ? (
    <>
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
          data-gap="10"
        >
          <text data-ellipsis="" data-weight="600">
            {item.title}
          </text>

          {item.titleunit && (
            <>
              <separator data-horizontal=""></separator>
              <text data-opacity="40" data-ellipsis="">
                {item.titleunit}
              </text>
            </>
          )}
        </group>
      </group>
    </>
  ) : item.chart === "line" && item.max ? (
    <>
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
          data-gap="10"
          data-wrap="no"
          data-width="auto"
          data-direction="column"
        >
          <text data-weight="600" data-ellipsis="">
            {item.title}
          </text>

          {item.titleunit && (
            <>
              <separator data-horizontal=""></separator>
              <text data-opacity="40">{item.titleunit}</text>
            </>
          )}
        </group>
      </group>
    </>
  ) : item.chart === "gaugezoom" && item.max ? (
    <>
      <group data-direction="column" data-height="fit" data-align="center">
        <GaugeZoom value={parseFloat(item.value)} max={item.max} size={100} />
      </group>

      <group
        data-space="30"
        data-direction="column"
        data-align="center"
        data-justify="center"
        data-bottom="0"
        data-position="absolute"
      >
        <group data-weight="700" data-text-size="x-large" data-width="auto">
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
          data-gap="10"
          data-wrap="no"
          data-width="auto"
        >
          <text data-ellipsis="" data-weight="600">
            {item.title}
          </text>

          {item.titleunit && (
            <>
              <dot></dot>
              <text data-ellipsis="">{item.titleunit}</text>
            </>
          )}
        </group>
      </group>
    </>
  ) : (
    <group data-direction="column" data-align="center" data-justify="center">
      <group data-weight="700" data-text-size="xx-large" data-width="auto">
        <group data-direction="column" data-height="fit">
          <text>{item.value}</text>
        </group>

        {item.unit && (
          <text data-position="absolute" data-left="full">
            {item.unit}
          </text>
        )}
      </group>
      <group data-align="center" data-gap="10" data-wrap="no" data-width="auto">
        <text data-weight="600">{item.title}</text>

        {item.titleunit && (
          <>
            <dot></dot>
            <text>{item.titleunit}</text>
          </>
        )}
      </group>
    </group>
  );

const LAYOUT_KEY = "dashboardLayout";

const loadLayout = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(LAYOUT_KEY) || "[]");
  } catch {
    return [];
  }
};

// const getGreeting = (): string => {
//   const hour = new Date().getHours();

//   if (hour >= 5 && hour < 12) {
//     return 'Good morning';
//   } else if (hour >= 12 && hour < 17) {
//     return 'Good afternoon';
//   } else {
//     return 'Good evening';
//   }
// };

const Dashboard: React.FC = () => {
  const [monitorCard, setMonitorCard] = useState<MonitorCardType[]>(
    generateMonitorCardData(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMonitorCard(generateMonitorCardData());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [layout, setLayout] = useState<string[]>(loadLayout);

  // Title of the one card showing its description side, if any;
  // flipping another card turns the previous one back
  const [flipped, setFlipped] = useState<string | null>(null);

  const toggleFlip = (title: string) =>
    setFlipped((prev) => (prev === title ? null : title));

  // Title of the card being dragged; it gets the lifted look on its own surface
  const [dragging, setDragging] = useState<string | null>(null);

  // A card turns back to its front as soon as it's picked up
  const handleSortStart = (title: string) => {
    setDragging(title);
    setFlipped((prev) => (prev === title ? null : prev));
  };

  const handleSortEnd = () => setDragging(null);

  useEffect(() => {
    try {
      if (layout.length)
        localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
      else localStorage.removeItem(LAYOUT_KEY);
    } catch {}
  }, [layout]);

  return (
    <group
      data-space="30"
      data-gap="30"
      data-direction="column"
      data-align="start"
    >
      <TemplatePageHeader
        title="Dashboard"
        description="Demo features a simple dashboard interface designed for monitoring
            hardware."
        version="2.0.1"
        type="Demo"
        descriptionProps={{ "data-length": "400" }}
      />
      <SortableGrid
        order={layout}
        onOrderChange={setLayout}
        onSortStart={handleSortStart}
        onSortEnd={handleSortEnd}
        data-type="grid"
        data-grid-template="140/120"
        data-gap="10"
        //  data-max-length="800"
      >
        {/* 
<group   data-row-end="2" data-height="fit"    data-ratio="1:2" data-radius="15" data-direction="column">

<picture
             data-radius="15"
              data-contain=""
              data-brightness="adaptive"
              data-position="absolute"
              data-background="grey-light"
            >
              <img src={sampleImage} alt="" />
            </picture>




</group> */}

        <group
          key="info"
          data-contain=""
          // data-elevation="2"

          data-index="2"
          data-space="20"
          data-gap="15"
          data-height="fit"
          data-background="context"
          data-elevation="2"
          data-align="center"
          data-justify="center"
          data-ratio="1:2"
          data-radius="30"
          data-wrap="no"
          data-direction="column"
        >
          <group data-width="auto" data-align="center" data-direction="column">
            <group data-space="15">
              <text data-weight="700">Info</text>
            </group>
            <separator data-horizontal=""></separator>
          </group>
          <group>
            <text
              data-text-align="center"
              data-opacity="60"
              data-wrap="wrap"
              data-line="1.5"
            >
              Tap a widget for details. Drag to rearrange.
            </text>
          </group>
        </group>

        {monitorCard.map((item) => {
          const isFlipped = flipped === item.title;
          return (
            // Shell: grid slot and drag target. SortableGrid animates its
            // transform, so the flip lives on the inner group instead.
            <group
              key={item.title}
              data-height="fit"
              data-radius="30"
              data-column-end={item.wide === true ? "2" : ""}
              data-row-end={item.long === true ? "2" : ""}
              data-ratio={item.wide === true ? "4:3" : "1:2"}
              data-perspective="1200"





            >
              <group
                data-background={
                  dragging === item.title ? undefined : "main-background"
                }
                data-border=""
                data-radius="30"
                // Lifted look while dragged, on the visible surface itself
                data-elevation={dragging === item.title ? "2" : undefined}
                data-backdrop={dragging === item.title ? "20-clear" : undefined}
                data-type="stack"
                data-height="fit"
                data-transform-style="preserve-3d"
                data-transition-prop="transform"
                data-duration="3.25"
                // data-timing="fancy"
                data-rotate-y={isFlipped ? "180" : undefined}
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                aria-label={`${item.title} details`}
                onClick={() => toggleFlip(item.title)}
                onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFlip(item.title);
                  }
                }}
              >
                <group
                  {...FACE_ATTRIBUTES}
                  {...frontAttributes(item)}
                  aria-hidden={isFlipped}
                >
                  {renderFront(item)}
                </group>

                <group
                  data-background="main-background"
                  {...FACE_ATTRIBUTES}
                  data-rotate-y="180"
                  //    data-background="context"
                  //   data-border=""
                  data-space="20"
                  // data-gap="15"
                  aria-hidden={!isFlipped}
                >
                  <group
                    data-height="fit"
                    data-align="center"
                    data-justify="center"
                    data-direction="column"
                    data-gap="15"
                  >
                    <group data-width="auto">
                      <group data-space="15">
                        <text data-weight="700" data-ellipsis="">
                          {item.title}
                        </text>
                      </group>
                      <separator data-horizontal=""></separator>
                    </group>
                    <text
                      data-text-align="center"
                      data-opacity="60"
                      data-wrap="wrap"
                      data-line="1.5"
                    >
                      {item.description}
                    </text>
                  </group>
                  <group
                    data-shrink="no"
                    data-contain=""
                    data-space-vertical="15"
                    data-space-horizontal="20"
                    data-interactive=""
                    data-cursor="pointer"
                    data-radius="15"
                    //  data-width="auto"
                    data-align="center"
                    data-direction="column"
                    data-background="adaptive-gray"
                    data-animation-name={
                      isFlipped ? "appear-bottom" : undefined
                    }
                    data-fill-mode="backwards"
                    data-animation-duration="2.25"
                    data-animation-delay="1.25"
                  >
                    <text data-ellipsis="">Done</text>
                  </group>
                </group>
              </group>
            </group>
          );
        })}
      </SortableGrid>

      {layout.length > 0 && (
        <group data-gap="30">
          <separator data-horizontal="dotted" data-opacity="20"></separator>

          <Ripple>
            <group
              data-contain=""
              data-space-vertical="15"
              data-space-horizontal="20"
              data-interactive=""
              data-cursor="pointer"
              data-radius="15"
              data-width="auto"
              data-align="center"
              data-direction="column"
              data-background="highlight"
              data-animation-name="appear-top"
              data-fill-mode="backwards"
              data-animation-duration="2.25"
              onClick={() => setLayout([])}
            >
              <text data-ellipsis="" data-weight="600">
                Reset Layout
              </text>
            </group>
          </Ripple>
        </group>
      )}

      <group>
        <picture
          data-radius="50"
          data-contain=""
          data-brightness="adaptive"
          data-background="grey-light"
          data-position="absolute"
          data-object-position="right"
        >
          <img src={sampleImage} alt="" />
        </picture>

        <group data-space="15">
          <group
            data-width="auto"
            data-background="context"
            data-direction="column"
            data-space="40"
            data-gap="10"
            data-radius="35"
            data-backdrop="20-adaptive"
          >
            <group data-width="auto" data-gap="30">
              <group data-gap="30" data-direction="column-1200">
                <text data-wrap="wrap" data-line="1.5" data-length="200">
                  All widgets are independent components, easily configurable
                  for flexibility.
                </text>

                <separator
                  data-vertical="adaptive-1200"
                  data-height=""
                ></separator>

                <text data-wrap="wrap" data-line="1.5" data-length="160">
                  Widgets show real-time simulated data.
                </text>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default Dashboard;
