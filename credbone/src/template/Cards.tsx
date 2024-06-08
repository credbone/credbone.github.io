import React from "react";
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
import list_res_11 from "../styles/images/samples/list_res/res-11.jpg";
import list_res_12 from "../styles/images/samples/list_res/res-12.jpg";
import list_res_13 from "../styles/images/samples/list_res/res-13.jpg";
import list_res_14 from "../styles/images/samples/list_res/res-14.jpg";




const ContentData = [
  { key: "1",  image: list_res_1, title: "Tech Talk Show", description: "A podcast about the latest in technology and innovation." },
  { key: "2",  image: list_res_2, title: "Creative Mind", description: "Exploring creativity, art, and design from different perspectives." },
  { key: "3",  image: list_res_3, title: "Science Hour", description: "Delving into the fascinating world of scientific discoveries and breakthroughs." },
  { key: "4",  image: list_res_4, title: "Business Insider", description: "Insights and discussions on business trends, entrepreneurship, and startups." },
  { key: "5",  image: list_res_5, title: "Health and Wellness Podcast", description: "Tips, advice, and discussions on maintaining a healthy lifestyle." },
  { key: "6",  image: list_res_6, title: "Comedy Hour", description: "Laugh-out-loud comedy and humor for your entertainment." },
  { key: "7",  image: list_res_7, title: "History Buffs", description: "Exploring historical events, figures, and mysteries from the past." },
  { key: "8",  image: list_res_8, title: "Sports Zone", description: "Covering all things sports, from games and matches to athlete interviews." },
  { key: "9",  image: list_res_9, title: "Mindfulness Journey", description: "Guided mindfulness practices and discussions on mental well-being." },
  { key: "10", image: list_res_10, title: "Travel Diaries", description: "Travel stories, tips, and destination reviews from around the world." },
];

const ViewSwitch = [
  { key: "1", name: "ViewSwitch", value: "CardView", label: "Card Layout", icon: "view_stream" },
  { key: "2", name: "ViewSwitch", value: "ListView", label: "List Layout", icon: "table_rows" },
  { key: "3", name: "ViewSwitch", value: "GridView", label: "Grid Layout", icon: "grid_view" },
];

const CardTemplate = () => (
  <>
    {ContentData.map((card) => (
      <group
        key={card.key}
        data-space="10"
        data-gap="5"
        data-radius="20"
        data-direction="column"
        data-border=""
      >
        <group data-ratio="1:1"  data-radius="15" data-contain="">
          <picture data-brightness="adaptive"> <img src={card.image} alt={card.description} /> </picture>
        </group>
        <group data-gap="10" data-space="10" data-direction="column">
          <text data-weight="700" data-text-size="medium" data-ellipsis="">{card.title}</text>
          <text data-opacity="60" data-wrap="wrap" data-line="1.5">
            {card.description}
          </text>
        </group>
      </group>
    ))}
  </>
);

const ListTemplate = () => (
  <>
    {ContentData.map((list) => (
      <group
      
        key={list.key}
        data-space="10"
        data-gap="5"
        data-radius="20"
       // data-direction="column"
        data-border=""
        data-wrap="no"
       
      >
        <group data-ratio="1:1"  data-length="60"  data-radius="15" data-contain="">
          <picture data-brightness="adaptive"> <img src={list.image} alt={list.description} /> </picture>
        </group>

     
        <group data-gap="5" data-space="10" data-direction="column">
          <text data-weight="700" data-text-size="medium">{list.title}</text>
          <text data-opacity="60" data-wrap="wrap">
            {list.description}
          </text>
        </group>
      </group>
    ))}
  </>
);

const GridTemplate = () => (
  <>
    {ContentData.map((grid) => (
      <group
      key={grid.key}
      data-space="20"
      data-gap="20"
      data-radius="20"
     // data-direction="column"
      data-border=""
     
    >
              <group data-ratio="1:1"  data-length="60"  data-radius="15" data-contain="">
        <picture data-brightness="adaptive"> <img src={grid.image} alt={grid.description} /> </picture>
      </group>

   
      <group data-gap="5" data-direction="column">
        <text data-weight="700" data-text-size="medium">{grid.title}</text>
        <text data-opacity="60" data-wrap="wrap">
          {grid.description}
        </text>
      </group>
    </group>
    ))}
  </>
);

// Define a type for the views
type ViewTypes = "CardView" | "ListView" | "GridView";

// Mapping views to their templates and grid templates
const ViewTemplates: Record<ViewTypes, { component: React.FC; gridTemplate: string }> = {
  CardView: { component: CardTemplate, gridTemplate: "200" },
  ListView: { component: ListTemplate, gridTemplate: "fit" },
  GridView: { component: GridTemplate, gridTemplate: "300" },
};

const Cards: React.FC = () => {
  const { control, watch } = useForm<FieldValues>({
    defaultValues: {
      ViewSwitch: "CardView",
    },
  });

  const view = watch("ViewSwitch") as ViewTypes; // Ensure the view type is correct
  const { component: ViewComponent, gridTemplate } = ViewTemplates[view];

  return (
    <view data-space="30" data-gap="30" data-scroll="">
      <group data-direction="column" data-gap="10">
        <text
          data-weight="700"
          data-text-size="xxx-large"
          data-wrap="wrap"
          data-color="main"
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
          <OptionBar compact dynamic data-height="40">
            {ViewSwitch.map((radio) => (
              <Controller
                key={radio.key}
                name={radio.name}
                control={control}
                render={({ field }) => (
                  <Radio
                    {...field}
                    iconProps={{ "data-length": "30" }}
                    tooltip={radio.label}
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
        <ViewComponent />
      </group>
    </view>
  );
};

export default Cards;
