import React, { useEffect, useRef, useState } from "react";

import Radio, { RadioType } from "../components/inputs/radio";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { ContentData } from "./utils/ContentData";


import {
  IconHeart,
  IconMoreHoriz,
  IconShare,
  IconTableRows,
  IconViewStream,
  IconViewWindow,
} from "../components/icon/credIcons";
import Popover from "../components/popover";
import Tooltip from "../components/tooltip";
import Count from "../components/Coutner";
import StuckReporter from "../components/StuckReporter";
import { Link } from "react-router-dom";
import { useModal } from "../components/Modal";
import Marquee from "../components/Marquee";
import CardModal from "./CardsModal";
import TemplatePageHeader from "./TemplatePageHeader";


interface ContentToolbarProps {
  count: number;
}

const modalConfig = {
  "data-radius": "none",
  "data-margin": "0",
  "data-background": "main-background-top",
  "data-elevation": "none",
  "data-width": "fit",
  "data-scroll": "",
  "data-min-height": "fit",
  "data-contain": "scroll",
};

const useOpenCustomModal = () => {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = (item: {
    key: string;
    title: string;
    description: string;
    long_description: string;
    image: string;
  }) => {
    openModal({
      id: `modal-${item.key}`,
      title: item.title,
      content: (
        <CardModal
          item={item}
          onClose={() => closeModal(`modal-${item.key}`)}
        />
      ),
      hasHeader: false,
      hasToolbar: false,
      customAttributes: modalConfig,
      spacing: 0,
    });
  };

  return handleOpenModal;
};

const ContentToolbar: React.FC<ContentToolbarProps> = ({ count }) => {
  const [isFavorite, setIsFavorite] = React.useState(false); // for demo

  const handleFavClick = () => {
    // for demo
    setIsFavorite(!isFavorite);
  };

  return (
    <group
      onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
      onMouseDown={(e: { stopPropagation: () => any }) => e.stopPropagation()}
      data-wrap="no"
      data-justify="start"
      data-width="auto"
      data-index="1"
      data-align="center"
      data-gap="5"
    >
      <Tooltip content="Share">
        <group
          data-width="auto"
          data-space="10"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="1.25"
          data-interactive=""
          data-radius="10"
          data-align="center"
          data-gap="10"
          data-cursor="pointer"
        >
          <IconShare />
        </group>
      </Tooltip>

      <Tooltip content="Like">
        <group
          data-width="auto"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="2"
          data-align="center"
          data-gap="10"
          data-space="10"
          data-interactive=""
          data-radius="10"
          data-cursor="pointer"
          onClick={handleFavClick}
          data-wrap="no"
        >
          <group
            data-animation-duration="4.75"
            data-fill-mode="backwards"
            data-animation-name={isFavorite ? "bounce" : ""}
          >
            <IconHeart fill={isFavorite} />
          </group>

          <text data-weight="700">
            <Count from={0} to={count} duration={1500} />
          </text>
        </group>
      </Tooltip>
      
    </group>
  );
};

const ViewSwitch = [
  {
    key: "1",
    name: "ViewSwitch",
    value: "CardView",
    label: "Card Layout",
    icon:<IconViewWindow size={20}/> ,
  },
  {
    key: "2",
    name: "ViewSwitch",
    value: "ListView",
    label: "List Layout",
    icon: <IconTableRows size={20}/>,
  },
  {
    key: "3",
    name: "ViewSwitch",
    value: "GridView",
    label: "Grid Layout",
    icon: <IconViewStream size={20}/>,
  },
];

const CardTemplate: React.FC<TemplateProps> = ({ selectedKey,selectedRef, onSelect }) => {
  const openCustomModal = useOpenCustomModal();


  const [pressTimer, setPressTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [isPressing, setIsPressing] = React.useState(false);

  const handleLongPress = (item: any) => {
    // Trigger modal on long press
    openCustomModal(item);
  };

  const handleTouchStart = (item: any) => {
    setIsPressing(true);
    setPressTimer(
      setTimeout(() => {
        setIsPressing(false); // Ensure the state is updated after delay
        handleLongPress(item); // Call long press action after delay
      }, 500) // 1000 ms = 1 second for long press
    );
  };

  const handleTouchEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer); // Clear the timer if the user releases early
    }
    setIsPressing(false);
  };

  const handleTouchMove = () => {
    // Optionally handle touch move, to clear the timer if the user drags the finger
    if (pressTimer) {
      clearTimeout(pressTimer); // Clear the timer if the user moves their finger
    }
    setIsPressing(false);
  };


  return (
    <>
      {ContentData.map((item,index) => (
        <group
          key={item.key}
          ref={selectedKey === item.key ? selectedRef : index === 0 ? selectedRef : null}
          data-space="5"
          //data-gap="5"
          data-radius="20"
          data-direction="column"
          data-border="outline"
          data-name="card"
          className={selectedKey === item.key ? "selected" : ""}
          onClick={() => onSelect(item.key)}
          data-interactive=""
          data-react="scale"
          data-cursor="pointer"
          onDoubleClick={() => openCustomModal(item)}
          onTouchStart={() => handleTouchStart(item)} // Use onTouchStart for touch event
          onTouchEnd={handleTouchEnd} // Use onTouchEnd for touch release
          onTouchMove={handleTouchMove} // Optional: Handle touch move to cancel long press

        >
          <group
            data-ratio="4:7/4:5"
            data-contain=""
            data-direction="column"
            data-wrap="no"
            data-gap="5"
            data-radius="15"
            
          >
            <picture
              
              //  data-position="absolute"
              data-brightness="adaptive"
              //    data-mask={selectedKey === item.key ? "bottom" : ""}
            >
              <img src={item.image_1x} srcSet={`${item.image} 2x`}  alt={item.title} />
            </picture>
          </group>

          <group
            data-space="15"
            data-direction="column"
            data-position="absolute"
            data-bottom="0"
            data-left="0"
            
          >
            <group
              data-backdrop="20"
              data-contain=""
              data-radius="10"
              data-color="white"
            >
              {selectedKey === item.key && (
                <>
                  <group
                    //    data-background="context"
                    //   data-radius="15"
                    data-space="5"
                    //   data-index="2"
                    //  data-width="auto"
                  >
                    <ContentToolbar count={item.count} />
                  </group>
                  <group data-opacity="30">
                    <separator data-horizontal=""></separator>
                  </group>
                </>
              )}

              <group
                data-space-vertical="15"
                data-gap="2"
                data-direction="column"
              >
                <text
                  data-space-horizontal="15"
                  data-weight="700"
                  data-ellipsis=""
                >
                  {item.title}
                </text>
                <Marquee
                  data-space-horizontal="15"
                  data-disabled="true"
                  auto={selectedKey === item.key ? true : false}
                >
                  <text
                    data-opacity="60"
                    //  data-wrap="wrap"
                    data-ellipsis=""
                  >
                    {item.description}
                  </text>
                </Marquee>
              </group>
            </group>
          </group>
        </group>
      ))}
    </>
  );
};

const ListTemplate: React.FC<TemplateProps> = ({ selectedKey, selectedRef, onSelect }) => {
  const openCustomModal = useOpenCustomModal();
  return (
    <>
      {ContentData.map((item,index) => (

          <group
            data-max-length="700"
            key={item.key}
            ref={selectedKey === item.key ? selectedRef : index === 0 ? selectedRef : null}
            data-space="5"
            data-gap="5"
            data-radius="15"
            // data-direction="column"
            // data-border=""
            data-wrap="no"
            className={selectedKey === item.key ? "selected" : ""}
            onClick={() => onSelect(item.key)}
            data-interactive=""
            data-cursor="pointer"
            data-name="card"
            data-contain=""
            data-ink-color={selectedKey === item.key ? "main-dark" : ""}
            onDoubleClick={() => openCustomModal(item)}
          >
            <group
              data-ratio="1:1"
              data-length="60"
              data-radius="10"
              data-contain=""
              data-index="1"
            >
              <picture data-brightness="adaptive" data-object-position="top">
                <img src={item.thumbnail}  alt={item.title} />
              </picture>
            </group>

            <group data-align="center" data-contain="">
              <group
               data-contain=""
                data-space="10"
                data-direction="column"
                data-index="1"
                data-gap="5"
              >
                <text
                  data-weight="700"
                 // data-text-size="medium"
                  data-wrap="wrap"
                >
                  {item.title}
                </text>
                <text data-opacity="60" data-ellipsis="">
                  {item.description}
                </text>
              </group>

              {selectedKey === item.key && (
                <ContentToolbar count={item.count} />
              )}
            </group>
          </group>

      ))}
    </>
  );
};

const GridTemplate: React.FC<TemplateProps> = ({ selectedKey,selectedRef, onSelect }) => {
  const openCustomModal = useOpenCustomModal();
  return (
    <>
      {ContentData.map((item,index) => (
        <group
          key={item.key}
          ref={selectedKey === item.key ? selectedRef : index === 0 ? selectedRef : null}
          data-space="20"
          data-gap="20"
       //   data-radius="20"
          // data-direction="column"
          data-border=""
          data-name="card"
          data-interactive=""
          data-over-color="neutral"
          data-cursor="pointer"
          className={selectedKey === item.key ? "selected" : ""}
          onClick={() => {
            onSelect(item.key);
            //openCustomModal(item);
          }}

          onDoubleClick={() => openCustomModal(item)}
        >
          <group data-wrap="no" data-align="start">
            <group
              data-height="60"
              data-length="60"
              data-radius="10"
              data-contain=""
              data-interact=""
            >
              <picture data-brightness="adaptive" data-object-position="top">
              <img src={item.thumbnail}  alt={item.title} />
              </picture>
            </group>

            <group
              data-width="auto"
              data-position="right"
              onDoubleClick={(e: { stopPropagation: () => any }) =>
                e.stopPropagation()
              }
            >
              <Popover
                content={<ContentToolbar count={item.count} />}
                data-space="5"
                data-radius="15"
              //  trigger="contextmenu"

              >
                <group
                  data-space="10"
                  data-radius="10"
                  data-over-color="neutral-10"
                  data-interactive=""
                >
                  <IconMoreHoriz />
                </group>
              </Popover>
            </group>
          </group>

          <group data-gap="5" data-direction="column">
            <text data-weight="700" data-font-type="hero" data-text-size="medium"  data-wrap="wrap">
              {item.title}
            </text>
            <text data-opacity="60" data-wrap="wrap" data-line="1.5">
              {item.description}
            </text>
          </group>
        </group>
      ))}
    </>
  );
};

// Define a type for the views
type ViewTypes = "CardView" | "ListView" | "GridView";

// Mapping views to their templates and grid templates
const ViewTemplates: Record<
  ViewTypes,
  { component: React.FC<TemplateProps>; gridTemplate: string, gridGap: string, wrapperProps?: Record<string, string>; }
> = {
  CardView: { component: CardTemplate, gridTemplate: "200", gridGap: "5" },
  ListView: { component: ListTemplate, gridTemplate: "fit", gridGap: "5",  },
  GridView: { component: GridTemplate, gridTemplate: "240", gridGap: "1",  wrapperProps: { "data-radius": "30", "data-contain":"", "data-border":"" }  },
};

// Define a type for the props that the template components will receive
type TemplateProps = {
  selectedKey: string;
  selectedRef: React.RefObject<HTMLDivElement>;
  onSelect: (key: string) => void;
};

const Cards: React.FC = () => {
  const { control, watch } = useForm<FieldValues>({
    defaultValues: {
      ViewSwitch: "CardView",
    },
  });

  const view = watch("ViewSwitch") as ViewTypes; // Ensure the view type is correct
  const { component: ViewComponent, gridTemplate, gridGap, wrapperProps } = ViewTemplates[view];

  const [selectedKey, setSelectedKey] = useState<string>("1");
  const selectedRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (key: string) => {
    setSelectedKey((prevKey) => (prevKey === key ? "" : key));
  };




  useEffect(() => {

    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }

  }, [view]);

  return (
<>
<group data-space="30" >




<TemplatePageHeader
  title="Cards & List"
  description="A card is an excellent tool for displaying content and actions related
    to a single subject, offering a cohesive presentation of multiple
    elements that vary in type and size."

/>


<StuckReporter>
  {(isSticky) => (
    <group
      data-sticky="top"
      data-index="3"
      data-width="auto"
      data-space-vertical="30"
      data-space-horizontal={isSticky? "30" :""}
      data-duration=".125"
    >
        <group
        data-background="main-background"
        data-elevation={isSticky? "1" :""}
        data-backdrop={isSticky? "20-adaptive" :""}
    
          data-height="60"
          data-name="option-group" data-width="auto" data-space="5" data-border="" data-radius="15" data-contain=""
          data-weight="600"
        >
          {ViewSwitch.map((radio) => (
            <Controller
              key={radio.key}
              name={radio.name}
              control={control}
              render={({ field }) => (
                <Radio
                  {...field}
                  label={radio.label}
                  iconProps={{ "data-length": "30" }}
                  tooltip={
                    field.value === radio.value ? null : radio.label
                  }
                  tooltipProps={{distance:5}}
                   labelProps={{ "data-background": "none" }}
                  // labelProps={{
                  //   "data-background": "none",

                  // }}
                  //     tooltip={radio.label}
                  icon={radio.icon}
                  radioValue={radio.value}
                  radioType={RadioType.Button}
                  checked={field.value === radio.value}
                />
              )}
            />
          ))}
        </group>
    </group>
  )}
</StuckReporter>

{/* <separator data-horizontal=""></separator>
<group data-height="30"></group> */}
<group data-type="grid" data-grid-template={gridTemplate} data-gap={gridGap} {...wrapperProps} >
  <ViewComponent selectedKey={selectedKey} onSelect={handleSelect} selectedRef={selectedRef} />
</group>


</group>


<group data-space="30">
<group data-space="30">
<text data-wrap="wrap" data-length="600" data-line="1.5">
Please note, the subjects portrayed are entirely digital creations,
crafted with precision. For more captivating visuals, an account on <Link data-link="" to="https://www.instagram.com/musesincode/" target="_blank" >Instagram</Link> holds them all
</text>
</group>
</group>
</>

  );
};

export default Cards;
