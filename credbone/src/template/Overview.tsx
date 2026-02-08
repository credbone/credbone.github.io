import React from "react";

import { Link } from "react-router-dom";
import { groupedLinksArray } from "./utils/OverviewData";
import TemplatePageHeader from "./TemplatePageHeader";

const Overview: React.FC = () => {
  return (
    <group data-space="30" data-gap="30" data-wrap="no" data-direction="column">



      <TemplatePageHeader
        title="Overview"
        description="Explore how interactive elements come together to shape the user experience. This section organizes them into categories, making it easier to navigate and understand their roles."
        version="3.5.2"
        type="System"
        descriptionProps={{"data-length":"500"}}
      />

      <group data-gap="30">
        {groupedLinksArray.map((group, index) => (
          <group key={index} data-direction="column" data-gap="30">
            {index !== 0 && (
              <group
                data-wrap="no"
                data-align="center"
                data-gap="30"
                data-space-vertical="30"
              >
                <separator data-horizontal=""></separator>
                <group data-width="auto">
                  <text>{group.title}</text>
                </group>
                <separator data-horizontal=""></separator>
              </group>
            )}

            <group
              data-direction="column"
              data-align="start"
              data-radius="50"
              data-contain=""
            >
              <picture
                data-brightness="adaptive"
                data-position="absolute"
                data-object-position="right"
              >
                <img src={group.image} alt={group.title} />
              </picture>

              <group
                data-space="30"
                data-gap="10"
                data-direction="column"
                data-align="start"
              >
                {/* <group
                      data-space="20"
                    
                      data-width="auto"
                      data-direction="column"
                      data-radius="15"

                    >
                      <text
                        data-weight="700"
                        data-text-size="64"
                        data-color="white"
                        data-position="center"
                      >
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </text>
                    </group> */}

                <group
                  data-space="30"
                  data-width="auto"
                  data-radius="20"
                 // data-background="context"
                  data-backdrop="20-adaptive"
                  data-gap="15"
                  data-direction="column"
                  data-align="start"
                >
                  <text
                    
                   data-font-type="hero"
                    data-wrap="preline"
                                     
                     data-text-size="large"
                    
                      data-line="1"
                  >
                    {group.title}
                  </text>
                
                  <text
                    data-wrap="wrap"
                    data-max-length="240"
                    data-line="1.5"
                    //  data-weight="600"
                  >
                    {group.description}
                  </text>
                </group>
              </group>
            </group>

            <group
             data-radius="40"
              data-contain=""
              data-border="inset"
              data-gap="1"
              data-type="grid"
              data-grid-template="200"
              data-weight="600"
            >
              {group.items.map((item, index) => (
                <Link
                  data-drag="none"
                  data-type="group"
                  to={item.to}
                  key={index}
                  data-interactive=""
                  data-over-color="neutral"
                  data-align="start"
                  data-direction="column"
                  data-justify="start"
                  data-wrap="no"
                  data-border=""
                  data-space="40"
                  data-min-height="300"
                >
                  <group
                    data-index="1"
                    data-direction="column"
                    data-gap="10"
                    data-height="fit"
                    data-wrap="no"
                  >
                    <text
                      data-contain=""
                               data-font-feature="tnum"
                    >
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </text>

                    <text
                      data-text-size="medium"
                      data-font-type="hero"
                      data-wrap="preline"
                      data-ellipsis=""
                      data-line="1"
                    >
                      {item.title}
                    </text>
                    {item.content}
                    <text
                      data-ellipsis=""
                      data-wrap="wrap"
                      data-line="1.5"
                      data-max-length="300"
                      data-opacity="60"
                      data-position="bottom"
                      
                    >
                      {item.description}
                    </text>
                  </group>
                </Link>
              ))}
            </group>
          </group>
        ))}
      </group>
    </group>
  );
};

export default Overview;
