import React, { useState } from "react";
import OptionBar from "../components/inputs/optionBar";
import Radio, { RadioType } from "../components/inputs/radio";
import { FieldValues, useForm, Controller } from "react-hook-form";

import list_res_1 from "../styles/images/samples/list_res/res-01.jpg";
import list_res_2 from "../styles/images/samples/list_res/res-02.jpg";
import list_res_3 from "../styles/images/samples/list_res/res-03.jpg";
import list_res_4 from "../styles/images/samples/list_res/res-04.jpg";
import list_res_5 from "../styles/images/samples/list_res/res-05.jpg";
import list_res_6 from "../styles/images/samples/list_res/res-06.jpg";
import list_res_7 from "../styles/images/samples/list_res/res-07.jpg";
import list_res_8 from "../styles/images/samples/list_res/res-08.jpg";
import list_res_9 from "../styles/images/samples/list_res/res-09.jpg";
import list_res_10 from "../styles/images/samples/list_res/res-10.jpg";


import Ripple from "../components/Ripple";
import { IconHeart, IconMoreHoriz, IconShare } from "../components/icon/credIcons";
import Popover from "../components/popover";
import Tooltip from "../components/tooltip";
import Count from "../components/Coutner";




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
      data-jusitify="start"
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
          data-animation-duration="125"
          data-interactive=""
          data-radius="10"
          data-align="center"
          data-gap="10"
          data-cursor="pointer"
        >
          <IconShare />
        </group>
      </Tooltip>
      <dot
         data-animation-name="appear-bottom"
         data-fill-mode="backwards"
         data-animation-duration="15"
      
      ></dot>
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
          <group data-animation-duration="475" data-fill-mode="backwards" data-animation-name={isFavorite ? "bounce":""}>
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

const CardTemplate: React.FC<TemplateProps> = ({ selectedKey, onSelect }) => (
  <>
    {ContentData.map((item) => (
      <group
        key={item.key}
        data-space="10"
        data-gap="5"
        data-radius="20"
        data-direction="column"
        data-border="outline"
        data-name="card"
        className={selectedKey === item.key ? 'selected' : ''}
        onClick={() => onSelect(item.key)}
        data-interactive=""
        data-cursor="pointer"
        
      >

<group data-ratio="1:1"  data-radius="15" data-contain="" data-background="highlight"  >
          <picture  data-brightness="adaptive"> <img src={item.image} alt={item.description} /> </picture>
        </group>
        



        <group data-gap="10" data-space="10" data-direction="column">
          <text data-weight="700" data-text-size="medium" data-ellipsis="">{item.title}</text>
          <text data-opacity="60" data-wrap="wrap" data-line="1.5">
            {item.description}
          </text>
        </group>

        <group data-position="bottom">
        {selectedKey === item.key && <ContentToolbar count={item.count}/>}
        </group>

      </group>
    ))}
  </>
);

const ListTemplate: React.FC<TemplateProps> = ({ selectedKey, onSelect }) => (
  <>
    {ContentData.map((item) => (
<Ripple key={item.key}>
<group
      
      key={item.key}
      data-space="10"
      data-gap="5"
      data-radius="20"
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




<group data-ratio="1:1"  data-length="60"  data-radius="15" data-contain="" data-index="1">
        <picture data-brightness="adaptive"> <img src={item.image} alt={item.description} /> </picture>
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
<group data-ratio="1:1"  data-length="60"  data-radius="15" data-contain="">
        <picture data-brightness="adaptive"> <img src={item.image} alt={item.description} /> </picture>
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
      ViewSwitch: "ListView",
    },
  });

  const view = watch("ViewSwitch") as ViewTypes; // Ensure the view type is correct
  const { component: ViewComponent, gridTemplate } = ViewTemplates[view];

  const [selectedKey, setSelectedKey] = useState<string>("1");

  const handleSelect = (key: string) => {
    setSelectedKey((prevKey) => (prevKey === key ? "" : key));
  };

  

  return (
    <view data-space="30" data-gap="30" data-scroll="">
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
        <text data-wrap="wrap" data-length="400" data-line="1.5" data-light="">
          A card is an excellent tool for displaying content and actions related
          to a single subject, offering a cohesive presentation of multiple
          elements that vary in type and size.
        </text>
      </group>

      <group>
        <group data-gap="10" data-background="main-background">
          <OptionBar compact dynamic data-height="40" data-weight="600">
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
      <separator data-horizontal=""></separator>
      <group data-type="grid" data-grid-template={gridTemplate} data-gap="10">
        <ViewComponent selectedKey={selectedKey} onSelect={handleSelect}/>
      </group>
      <group data-height="200" data-shrink="no"></group>
    </view>
  );
};

export default Cards;
