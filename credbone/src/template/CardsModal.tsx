import React, { Suspense, useState } from "react";
import StuckReporter from "../components/StuckReporter";
import { SvgLoader } from "../components/svg";

interface CardModalProps {
  item: {
    key: string;
    title: string;
    description: string;
    long_description:string;
    image: string;
  };
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ item, onClose }) => {


  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };


  return (
    <group data-min-height="fit">
      <group
        data-position="absolute"
        data-height="fit"
        data-background="main-background-top"
        onClick={onClose}
      ></group>
      <group
        data-max-length="500"
        data-space="30"
        data-gap="10"
        data-position="center"
      >
        <group>
          <group data-gap="10" data-max-length="300" data-direction="column">
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
              data-animation-duration="2.5"
              data-weight="600"
              data-text-size=""
              data-wrap="wrap"
              data-line="1.5"
            >
              {item.description}
            </text>
          </group>
        </group>

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
                          data-animation-duration="2.5"
                          data-background="main"
                          data-color="main-text"
                          data-interactive=""
                          data-width="auto"
                          data-cursor="pointer"
                          data-space="15"
                          data-radius="10"
                          onClick={onClose}
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
          data-animation-duration="2.75"
          data-contain=""
          data-radius="20"
          data-direction="column"
          data-wrap="no"
        //  data-elevation="1"
        >

{loading && <group data-space="30" data-backdrop="20"  data-gap="30"><SvgLoader/><text>Loading image...</text></group>}
          <picture data-position="center" data-hide={loading ? "true" : undefined}>

         
      <img 
        src={item.image} 
        alt={item.title} 
        onLoad={handleImageLoad} 
       
      />

          </picture>



        </group>
        <group
        
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="3"
        data-space="30"  data-radius="20" data-backdrop="10">
        <text

              data-weight="600"
              data-text-size=""
              data-wrap="wrap"
              data-line="1.5"
            >
              {item.long_description}
            </text>
        </group>
      </group>
    </group>
  );
};

export default CardModal;
