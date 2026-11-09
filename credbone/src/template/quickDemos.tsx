import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import Radio, { RadioType } from "../components/inputs/radio";
import StuckReporter from "../components/StuckReporter";
import UnitConverter from "../tools/UnitConverter";

import SnackbarContainer from "../components/snackbar/SnackbarContainer";
import Calculator from "../tools/Calculator";
import SimplePaint from "../tools/SimplePaint";
import WeatherWidget from "../tools/WeatherWidget";
import Ripple from "../components/Ripple";
import Carousel3D, { Carousel3DItem } from "../components/Carousel3D";
import { useModal } from "../components/Modal";
import TemplatePageHeader from "./TemplatePageHeader";
import StopWatch from "../tools/StopWatch";
import { isMobile } from "react-device-detect";
import { IconCarousel, IconViewWindow } from "../components/icon/credIcons";

import sample_4 from "../styles/images/samples/res_007.webp";
import { SquareArrowOutUpRight } from "lucide-react";

//import { isMobile } from "react-device-detect";

type DemoView = "grid" | "carousel";

const VIEW_KEY = "quick_demos_view";

// ?demo=paint opens Simple Paint (deep link, Back closes)
const DEMO_PARAM = "demo";
const PAINT_DEMO = "paint";
const PAINT_MODAL_ID = "paint-modal";

const viewOptions: { id: DemoView; label: string; icon: React.ReactElement }[] =
  [
    { id: "grid", label: "Grid", icon: <IconViewWindow size={20} /> },
    { id: "carousel", label: "Carousel", icon: <IconCarousel size={20} /> },
  ];

type DataAttributes = Record<string, string | undefined>;

// How one view wraps a demo: where the title/description sits and the attributes of each layer
interface DemoWrapper {
  titlePosition?: "outside" | "inside" | "none";
  wrapperProps?: DataAttributes;
  activeWrapperProps?: DataAttributes; // merged over wrapperProps while the item is centered (carousel)
  headerProps?: DataAttributes;
  content?: React.ReactNode; // replaces the item's content in this view
}

interface DemoItem {
  id: string;
  title: string;
  heading: React.ReactNode;
  description?: string;
  content: React.ReactNode;
  wrappers?: Partial<Record<DemoView, DemoWrapper>>;
}

// View defaults; each item can override any part through `wrappers`
const defaultWrappers: Record<DemoView, DemoWrapper> = {
  grid: {
    titlePosition: "outside",
    wrapperProps: {},
    headerProps: { "data-gap": "10", "data-space": "30" },
  },
  // Title/description show as the carousel caption under the centered card
  carousel: {
    titlePosition: "none",
    wrapperProps: {
      "data-radius": "25",

      "data-border": "",
      "data-contain": "",
      "data-background": "main-background",
    },
    activeWrapperProps: { "data-elevation": "2" },
    headerProps: { "data-gap": "10", "data-space": "30" },
  },
};

const DemoBlock: React.FC<{
  item: DemoItem;
  mode: DemoView;
  active?: boolean;
}> = ({ item, mode, active = false }) => {
  const base = defaultWrappers[mode];
  const custom = item.wrappers?.[mode] || {};
  const titlePosition = custom.titlePosition || base.titlePosition;
  const wrapperProps = {
    ...(custom.wrapperProps || base.wrapperProps),
    ...(active ? custom.activeWrapperProps || base.activeWrapperProps : {}),
  };
  const headerProps = { ...base.headerProps, ...custom.headerProps };

  const header = titlePosition !== "none" && (
    <group {...headerProps}>
      <text
        data-weight="700"
        data-wrap="wrap"
        data-text-size="large"
        data-ellipsis=""
        data-font-type="hero"
        data-line="1"
      >
        {item.heading}
      </text>

      {item.description && (
        <text data-wrap="wrap" data-line="1.5" data-opacity="40">
          {item.description}
        </text>
      )}
    </group>
  );

  const wrapped = (
    <group {...wrapperProps}>
      {titlePosition === "inside" && header}
      {custom.content ?? item.content}
    </group>
  );

  if (titlePosition !== "outside") return wrapped;

  return (
    <group>
      {header}
      {wrapped}
    </group>
  );
};

const QuickDemos: React.FC = () => {
  const { openModal, closeModal } = useModal();
  // Remember the selected view; fall back to grid if the stored value is missing or stale
  const savedView = localStorage.getItem(VIEW_KEY);
  const initialView: DemoView = viewOptions.some((o) => o.id === savedView)
    ? (savedView as DemoView)
    : "grid";

  const { control, watch } = useForm<{ view: DemoView }>({
    defaultValues: { view: initialView },
  });
  const view = watch("view");

  useEffect(() => {
    localStorage.setItem(VIEW_KEY, view);
  }, [view]);

  // ─── Paint modal tied to ?demo=paint: Back closes it, links open it ───────
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const paintOpenRef = useRef(false);
  // True when Launch pushed the entry; a direct link has nothing to go back to
  const pushedPaintRef = useRef(false);

  // Exit / Esc: drop the param; the effect below then closes the modal
  const leavePaint = () => {
    if (pushedPaintRef.current) {
      pushedPaintRef.current = false;
      navigate(-1);
    } else {
      setSearchParams(
        (p) => {
          p.delete(DEMO_PARAM);
          return p;
        },
        { replace: true },
      );
    }
  };

  const openPaint = () =>
    openModal({
      id: PAINT_MODAL_ID,
      title: "Simple Paint",
      content: (
        <group
          data-min-length="600"
          data-max-height="fit"
          data-height="fit"
          data-contain=""
          data-shrink="initial"
        >
          <SimplePaint onExit={leavePaint} />
        </group>
      ),
      hasHeader: false,
      fullscreen: isMobile,
      hasToolbar: false,
      // Exit button only: a stray backdrop click would lose the drawing
      dimClose: false,
      onClose: leavePaint,
      customAttributes: {
        "data-radius": "40",
        "data-background": "main-background",
        "data-animation-name": "zoom-in-9",
        "data-animation-duration": "2.75",
        "data-fill-mode": "backwards",
      },
    });

  useEffect(() => {
    const wantPaint = searchParams.get(DEMO_PARAM) === PAINT_DEMO;
    if (wantPaint && !paintOpenRef.current) {
      paintOpenRef.current = true;
      openPaint();
    } else if (!wantPaint && paintOpenRef.current) {
      paintOpenRef.current = false;
      pushedPaintRef.current = false;
      closeModal(PAINT_MODAL_ID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const paintLaunch = (
    <Ripple>
      <group
        data-ink-color="gray-shade-20"
        data-over-color="neutral"
        data-contain=""
        data-space="15"
        data-interactive=""
        data-cursor="pointer"
        data-radius="15"
        data-wrap="no"
        data-height="45"
        data-gap="10"
        data-align="center"
        //  data-justify="center"
        // data-direction="column"
        onClick={() => {
          // New history entry, so Back (or Exit) returns to the page
          pushedPaintRef.current = true;
          setSearchParams((p) => {
            p.set(DEMO_PARAM, PAINT_DEMO);
            return p;
          });
        }}
      >
        <text data-ellipsis="">Launch</text>

        <group
          data-width="auto"
          data-position="right"
          data-interact=""
          data-opacity="40"
        >
          <SquareArrowOutUpRight size={20} strokeWidth={1.5} />
        </group>
      </group>
    </Ripple>
  );

  const demoItems: DemoItem[] = [
    {
      id: "stopwatch",
      title: "Stop Watch",
      heading: (
        <>
          Stop<br></br>Watch
        </>
      ),
      description:
        "Demonstrates state-driven UI, dynamic controls, and animation within a token-based system",
      content: <StopWatch />,
      wrappers: {
        carousel: {
          wrapperProps: {
            "data-radius": "35",
            "data-space": "15",
            "data-background": "main-background",
            "data-border": "",
          },
        },
      },
    },
    {
      id: "paint",
      title: "Simple Paint",
      heading: (
        <>
          Simple<br></br> Paint
        </>
      ),
      description:
        "Designed with minimal functionality to demonstrate the usability of a UI system",
      wrappers: {
        grid: {
          titlePosition: "inside",
          wrapperProps: {
            "data-height": "auto",
            "data-max-height": "fit",
            "data-radius": "25",
            "data-border": "",
            "data-contain": "",
            "data-space": "10",
            "data-gap": "10",
            "data-length": "500",
            "data-elevation": "2",
            "data-index": "2",
            // "data-backdrop": "20",
          },
          headerProps: { "data-space": "20" },
        },
        carousel: {
          wrapperProps: {
            "data-radius": "25",
            "data-border": "",
            "data-contain": "",
            "data-background": "main-background",
            "data-space": "10",
            "data-gap": "10",
          },
          // Placeholder preview until a real one is designed
          content: (
            <group data-gap="10">
              <group  data-interactive="" data-over-color="none">
                <group
                
                  data-ratio="4:5"
                  //data-background="adaptive-gray"
                  data-align="center"
                  data-justify="center"
                  data-radius="15"
                  data-contain=""
                  data-cursor="pointer"
                 data-interact=""

                          onClick={() => {
          // New history entry, so Back (or Exit) returns to the page
          pushedPaintRef.current = true;
          setSearchParams((p) => {
            p.set(DEMO_PARAM, PAINT_DEMO);
            return p;
          });
        }}

                >
                  <picture
                  
                    data-brightness="adaptive"
                    data-position="absolute"

                    // data-space="20"
                  >
                    <img src={sample_4} alt="" />
                  </picture>
                </group>
              </group>

              {paintLaunch}
            </group>
          ),
        },
      },
      content: (
        <group data-gap="10">
          <separator data-horizontal="dotted" data-opacity="20"></separator>
          <group
            data-background="adaptive-gray"
            data-contain=""
            data-radius="15"
          >
            {paintLaunch}
          </group>
        </group>
      ),
    },
    {
      id: "weather",
      title: "Weather",
      heading: "Weather",
      description:
        "A simple weather widget built entirely from the design system",
      wrappers: {
        grid: {
          titlePosition: "none",
          wrapperProps: {
            "data-height": "auto",
            "data-max-height": "fit",
            "data-radius": "25",
            "data-contain": "",
            "data-border": "",
            "data-gap": "20",
            //    "data-backdrop": "20",
          },
        },
      },
      content: <WeatherWidget />,
    },
    {
      id: "unit-converter",
      title: "Unit Converter",
      heading: (
        <>
          Unit<br></br> Converter
        </>
      ),
      description:
        "You can use the unit converter to convert from one measurement to another.",
      wrappers: {
        grid: {
          wrapperProps: {
            "data-height": "auto",
            "data-max-height": "fit",
            "data-radius": "25",
            "data-border": "",
            "data-contain": "",
            "data-gap": "20",
          },
        },
      },
      content: <UnitConverter />,
    },
    {
      id: "calculator",
      title: "Basic Calculator",
      heading: (
        <>
          Basic<br></br> Calculator
        </>
      ),
      description:
        "Designed with minimal functionality to demonstrate the usability a UI system",
      wrappers: {
        grid: {
          wrapperProps: {
            "data-index": "2",
            "data-height": "auto",
            "data-max-height": "fit",
            "data-radius": "25",
            "data-border": "",
            "data-contain": "",
            "data-space-top": "0",
            "data-elevation": "2",
          },
        },
      },
      content: (
        <SnackbarContainer>
          <group>
            <Calculator />
          </group>
        </SnackbarContainer>
      ),
    },
  ];

  const carouselItems: Carousel3DItem[] = demoItems.map((item) => ({
    id: item.id,
    title: item.title,
    node: ({ centered }) => (
      <DemoBlock item={item} mode="carousel" active={centered} />
    ),
    caption: (
      <group data-direction="column" data-align="center" data-gap="10">
        <text
          data-weight="700"
          data-text-size="medium"
          data-font-type="hero"
          data-wrap="wrap"
        >
          {item.title}
        </text>
        {item.description && (
          <text data-wrap="wrap" data-line="1.3" data-opacity="40">
            {item.description}
          </text>
        )}
      </group>
    ),
  }));

  return (
    <group
      data-space-vertical="30"
      //data-gap="30"
      data-align="start"
    >
      <group data-space-horizontal="30">
        <TemplatePageHeader
          title=" Quick Demos"
          description="Explore the UI system through a few simple demo apps designed purely
            for demonstration purposes, showcasing its versatility and
            performance. Notably, these apps utilize the design system with zero
            lines of app-specific UI code written."
          //  version="2.0.1"
          type="Demo"
          descriptionProps={{ "data-length": "600" }}
        />
      </group>
      {/* View switch, same pattern as the Cards page: sticks to the top on scroll */}
      <StuckReporter>
        {(isSticky) => (
          <group
            data-sticky="top"
            data-index="3"
            data-width="auto"
            data-space="30"
            //   data-space-horizontal={isSticky ? "60" : "30"}
            data-duration=".125"
          >
            <group
              data-background="main-background"
              data-elevation={isSticky ? "1" : ""}
              data-backdrop={isSticky ? "20-adaptive" : ""}
              data-height="55"
              data-width="auto"
              data-space="5"
              data-border=""
              data-radius="15"
              data-contain=""
              data-weight="600"
              data-name="option-group"
            >
              {viewOptions.map((option) => (
                <Controller
                  key={option.id}
                  name="view"
                  control={control}
                  render={({ field }) => (
                    <Radio
                      {...field}
                      label={option.label}
                      iconProps={{ "data-length": "30" }}
                      tooltip={field.value === option.id ? null : option.label}
                      tooltipProps={{ distance: 5 }}
                      labelProps={{ "data-background": "none" }}
                      icon={option.icon}
                      radioValue={option.id}
                      radioType={RadioType.Button}
                      checked={field.value === option.id}
                    />
                  )}
                />
              ))}
            </group>
          </group>
        )}
      </StuckReporter>

      {view === "grid" ? (
        <group
          // data-max-length="900"
          data-column-gap="15"
          data-justify="start"
          data-align="start"
          data-type="column"
          data-column-size="240"
          data-space="30"
        >
          {demoItems.map((item) => (
            <DemoBlock key={item.id} item={item} mode="grid" />
          ))}
        </group>
      ) : (
        <group
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-contain=""
        >
          <Carousel3D items={carouselItems} align="end" fade={0} />
        </group>
      )}
    </group>
  );
};
export default QuickDemos;
