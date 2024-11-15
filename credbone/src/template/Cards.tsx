import React, { useState } from "react";
import OptionBar from "../components/inputs/optionBar";
import Radio, { RadioType } from "../components/inputs/radio";
import { FieldValues, useForm, Controller } from "react-hook-form";

import list_res_1 from  "../styles/images/samples/ai_res/res-21.jpg";
import list_res_2 from  "../styles/images/samples/ai_res/res-22.jpg";
import list_res_3 from  "../styles/images/samples/ai_res/res-23.jpg";
import list_res_4 from  "../styles/images/samples/ai_res/res-24.jpg";
import list_res_5 from  "../styles/images/samples/ai_res/res-25.jpg";
import list_res_6 from  "../styles/images/samples/ai_res/res-26.jpg";
import list_res_7 from  "../styles/images/samples/ai_res/res-27.jpg";
import list_res_8 from  "../styles/images/samples/ai_res/res-28.jpg";
import list_res_9 from  "../styles/images/samples/ai_res/res-29.jpg";
import list_res_10 from "../styles/images/samples/ai_res/res-30.jpg";


import Ripple from "../components/Ripple";
import { IconHeart, IconMoreHoriz, IconShare } from "../components/icon/credIcons";
import Popover from "../components/popover";
import Tooltip from "../components/tooltip";
import Count from "../components/Coutner";
import StuckReporter from "../components/StuckReporter";
import { Link } from "react-router-dom";
import { useModal } from "../components/Modal";
import Marquee from "../components/Marquee";




const ContentData = [
  { key: "1",  count: 17, image: list_res_1, title: "Tech Talk Show", description: "A podcast about the latest in technology and innovation." },
  { key: "2",  count: 19, image: list_res_2, title: "Creative Mind", description: "Exploring creativity, art, and design from different perspectives." },
  { key: "3",  count: 23, image: list_res_3, title: "Science Hour", description: "Delving into the fascinating world of scientific discoveries and breakthroughs." },
  { key: "4",  count: 29, image: list_res_4, title: "Business Insider", description: "Insights and discussions on business trends, entrepreneurship, and startups." },
  { key: "5",  count: 31, image: list_res_5, title: "Health and Wellness Podcast", description: "Tips, advice, and discussions on maintaining a healthy lifestyle." },
  { key: "6",  count: 37, image: list_res_6, title: "Comedy Hour", description: "Laugh-out-loud comedy and humor for your entertainment." },
  { key: "7",  count: 41, image: list_res_7, title: "History Buffs", description: "Exploring historical events, figures, and mysteries from the past." },
  { key: "8",  count: 43, image: list_res_8, title: "Sports Zone", description: "Covering all things sports, from games and matches to athlete interviews." },
  { key: "9",  count: 47, image: list_res_9, title: "Mindfulness Journey", description: "Guided mindfulness practices and discussions on mental well-being." },
  { key: "10", count: 53, image: list_res_10, title: "Travel Diaries", description: "Travel stories, tips, and destination reviews from around the world." },
];

interface ContentToolbarProps {
  count: number;
}

const modalConfig = {
  "data-radius": "none",
  "data-margin": "0",
  "data-background": "none",
  "data-elevation": "none",
  "data-width": "fit",
  "data-scroll": "",
  "data-min-height":"fit",
  "data-contain": "scroll",
};



const ContentToolbar: React.FC<ContentToolbarProps> = ({ count }) => {
  const [isFavorite, setIsFavorite] = React.useState(false); // for demo

  const handleFavClick = () => { // for demo
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
      {/* <dot
         data-animation-name="appear-bottom"
         data-fill-mode="backwards"
         data-animation-duration="1.5"
      
      ></dot> */}
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
          <group data-animation-duration="4.75" data-fill-mode="backwards" data-animation-name={isFavorite ? "bounce":""}>
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
  { key: "1", name: "ViewSwitch", value: "CardView", label: "Card Layout", icon: "window" },
  { key: "2", name: "ViewSwitch", value: "ListView", label: "List Layout", icon: "table_rows" },
  { key: "3", name: "ViewSwitch", value: "GridView", label: "Grid Layout", icon: "view_stream" },
];

const CardTemplate: React.FC<TemplateProps> = ({ selectedKey, onSelect }) => {

  const { openModal, closeModal } = useModal(); 
  return (
    <>
      {ContentData.map((item) => (
        <group
          key={item.key}
          data-space="5"
          //data-gap="5"
          data-radius="20"
          data-direction="column"
          data-border="outline"
          data-name="card"
            className={selectedKey === item.key ? "selected" : ""}
            // data-elevation={selectedKey === item.key ? "2" : ""}
            // data-index={selectedKey === item.key ? "2" : ""}
          onClick={() => onSelect(item.key)}
          data-interactive=""
          data-react="scale"
          data-cursor="pointer"
          // onDoubleClick={() => openModal(item.title,
          //   <picture data-position="center"> <img src={item.image} alt={item.title} /> </picture>,
          //   false,
          // true
          // )}

          onDoubleClick={() =>
            openModal(
              `modal-card-${item.key}`,
              "Customized Popup",
              <group data-min-height="fit">
                <group
                  data-position="absolute"
                  data-height="fit"
                  data-background="main-background-top"
                  onClick={() => closeModal(`modal-card-${item.key}`)}
                ></group>
                <group
                  data-max-length="500"
                  data-space="30"
                  data-gap="10"
                  data-position="center"
                >
                  <group>
                    <group
                      data-gap="10"
                      data-max-length="300"
                      data-direction="column"
                    >
                      <text
                        data-animation-name="appear-bottom"
                        data-fill-mode="backwards"
                        data-animation-duration="2.25"
                        data-weight="700"
                        data-text-size="x-large"
                        data-wrap="wrap"
                      >
                        {item.title}
                      </text>
                      <text
                        data-animation-name="appear-bottom"
                        data-fill-mode="backwards"
                        data-animation-duration="2"
                        data-weight="600"
                        data-text-size=""
                        data-wrap="wrap"
                        data-line="1.5"
                      >
                        {item.description}
                      </text>
                    </group>
                  </group>

                  {/* <ContentToolbar count={item.count}/> */}

                  <StuckReporter>
                    {(isSticky) => (
                      <group
                        data-duration=".125"
                        data-space-horizontal={isSticky ? "20" : "0"}
                        data-space-top="20"
                        data-sticky="top"
                      >
                        <group
                          data-animation-name="appear-bottom"
                          data-fill-mode="backwards"
                          data-animation-duration="1.75"
                          data-background="main"
                          data-color="main-text"
                          data-interactive=""
                          data-width="auto"
                          data-cursor="pointer"
                          data-space="15"
                          data-radius="10"
                          onClick={() => closeModal(`modal-card-${item.key}`)}
                          data-align="center"
                          data-min-length="160"
                          data-direction="column"
                        >
                          <text data-weight="700">Close</text>
                        </group>
                      </group>
                    )}
                  </StuckReporter>
                  <group data-height="20"></group>

                  <group
                    data-animation-name="appear-bottom"
                    data-fill-mode="backwards"
                    data-animation-duration="1.5"
                    data-contain=""
                    data-radius="20"
                    
                  >
                    <picture data-position="center">
                      <img src={item.image} alt={item.title} />{" "}
                    </picture>
                  </group>
                </group>
              </group>,
              false,
              false,
              modalConfig,
              0
            )
          }
        >
          <group
            data-ratio="1:2"
            data-contain=""

            data-direction="column"
            data-wrap="no"
            data-gap="5"
            data-radius="15"
          >
            <picture
            data-interact=""
              //  data-position="absolute"
              data-brightness="adaptive"
              //    data-mask={selectedKey === item.key ? "bottom" : ""}
              
            >
              <img src={item.image} alt={item.title} />
            </picture>
          </group>

          <group
            data-space="15"
            data-direction="column"
            data-position="absolute"
            data-bottom="0"
            data-left="0"
          >
            <group data-backdrop="20" data-contain=""  data-radius="10" data-color="white">
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
                 <group data-opacity="30"> <separator data-horizontal=""></separator></group>
                </>
              )}

              <group data-space-vertical="15" data-gap="2" data-direction="column">
                <text data-space-horizontal="15" data-weight="700" data-ellipsis="">
                  {item.title}
                </text>
                <Marquee
                data-space-horizontal="15"
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

const ListTemplate: React.FC<TemplateProps> = ({ selectedKey, onSelect }) => (
  <>
    {ContentData.map((item) => (
<Ripple key={item.key}>
<group
      data-max-length="700"
      key={item.key}
      data-space="5"
      data-gap="5"
      data-radius="15"
     // data-direction="column"
     // data-border=""
      data-wrap="no"
      className={selectedKey === item.key ? 'selected' : ''}
      onClick={() => onSelect(item.key)}
      data-interactive=""
      data-cursor="pointer"
      data-name="card"
      data-contain=""
      data-ink-color={selectedKey === item.key ? 'main-dark' : ''}
    >




<group data-ratio="1:1"  data-length="60"  data-radius="10" data-contain="" data-index="1">
        <picture data-brightness="adaptive"> <img src={item.image} alt={item.title} /> </picture>
      </group>


   
<group>
<group data-gap="5" data-space="10" data-direction="column" data-index="1">
        <text data-weight="700" data-text-size="medium" data-wrap="wrap">{item.title}</text>
        <text data-opacity="60" data-wrap="wrap" data-line="1.5">
          {item.description}
        </text>
      </group>

      {selectedKey === item.key && <ContentToolbar count={item.count}/>}
</group>
    </group>
</Ripple>
    ))}
  </>
);

const GridTemplate: React.FC<TemplateProps> = ({ selectedKey, onSelect }) => (
  <>
    {ContentData.map((item) => (
      <group
      key={item.key}
      data-space="20"
      data-gap="20"
      data-radius="20"
     // data-direction="column"
      data-border="outline"
      data-name="card"
       data-interactive=""
        data-cursor="pointer"
      className={selectedKey === item.key ? 'selected' : ''}
      onClick={() => onSelect(item.key)}
    >
<group>
<group data-ratio="1:1"  data-length="60"  data-radius="10" data-contain="">
        <picture data-brightness="adaptive"> <img src={item.image} alt={item.title} /> </picture>
      </group>
<Popover  content={<ContentToolbar count={item.count} />} data-space="5" data-radius="15">
<group data-width="auto" data-position="right">
      <IconMoreHoriz/>
      </group>
</Popover>
</group>

   
      <group data-gap="5" data-direction="column">
        <text data-weight="700" data-text-size="medium" data-wrap="wrap">{item.title}</text>
        <text data-opacity="60" data-wrap="wrap" data-line="1.5">
          {item.description}
        </text>
      </group>
    </group>
    ))}
  </>
);

// Define a type for the views
type ViewTypes = "CardView" | "ListView" | "GridView";

// Mapping views to their templates and grid templates
const ViewTemplates: Record<ViewTypes, { component: React.FC<TemplateProps>; gridTemplate: string }> = {
  CardView: { component: CardTemplate, gridTemplate: "200" },
  ListView: { component: ListTemplate, gridTemplate: "fit" },
  GridView: { component: GridTemplate, gridTemplate: "300" },
};

// Define a type for the props that the template components will receive
type TemplateProps = {
  selectedKey: string;
  onSelect: (key: string) => void;
};

const Cards: React.FC = () => {
  
  const { control, watch } = useForm<FieldValues>({
    defaultValues: {
      ViewSwitch: "CardView",
    },
  });

  const view = watch("ViewSwitch") as ViewTypes; // Ensure the view type is correct
  const { component: ViewComponent, gridTemplate } = ViewTemplates[view];

  const [selectedKey, setSelectedKey] = useState<string>("1");

  const handleSelect = (key: string) => {
    setSelectedKey((prevKey) => (prevKey === key ? "" : key));
  };

  

  return (
    <group data-space="30" data-gap="30" >
      <group data-direction="column" data-gap="10">
        <text
          data-weight="700"
          data-text-size="xxx-large"
          data-wrap="wrap"
          data-color="main"
          data-ellipsis=""
        >
          Cards & List
        </text>
        <text data-wrap="wrap" data-length="600" data-line="1.5" data-light="">
          A card is an excellent tool for displaying content and actions related
          to a single subject, offering a cohesive presentation of multiple
          elements that vary in type and size.
        </text>


      </group>

      <StuckReporter>
        {(isSticky) => (
          

          <group
            data-sticky="top"
            data-index="3"
            data-width="auto"
            data-space-vertical={isSticky ? "30" : ""}
          >
            <group data-gap="10"
          
              
          data-space={isSticky ? "5" : ""}
          data-background={isSticky ? "context" : ""}
          data-elevation={isSticky ? "1" : ""}
          data-radius={isSticky ? "10" : ""}
          data-duration=".125"
            
            
            >
            <OptionBar compact dynamic data-height="40"  data-radius="5"  data-weight="600">
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
                      tooltip={field.value === radio.value ? null : radio.label} 
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
            </OptionBar>
          </group>
        </group>

        )}
        </StuckReporter>


      <separator data-horizontal=""></separator>
      <group data-type="grid" data-grid-template={gridTemplate} data-gap="10">
        <ViewComponent selectedKey={selectedKey} onSelect={handleSelect}/>
      </group>

<group>
<text data-wrap="wrap" data-length="600" data-line="1.5">Please note, the women portrayed are entirely digital creations, crafted with precision. For more captivating visuals, an account on <Link data-link="" to="https://www.instagram.com/musesincode/" target="_blank">Instagram</Link> holds them all</text>
</group>

    </group>
  );
};

export default Cards;

