import React, { useState } from "react";

import Ripple from "../../components/Ripple";

import Scroll from "../../components/scroll";
import Button from "../../components/button";
import { SvgHamburger } from "../../components/svg";
import Tabstrip from "../../components/tabstrip";
import Tab from "../../components/tabstrip/tab";
import {
  Armchair,
  Bird,
  BookMarked,
  CircleUser,
  Cloud,
  Coffee,
  Feather,
  PencilRuler,
  PenTool,
  Pizza,
  Presentation,
  Salad,
  Shirt,
  ShoppingBag,
  Spline,
  SplineIcon,
  Tickets,
  Trees,
  WandSparkles,
  Wheat,
} from "lucide-react";

// Demo Data

const tabsData = [
  { kay: "1", title: "Home", index: 1 },
  { kay: "2", title: "Orders", index: 2 },
  { kay: "3", title: "Account", index: 3 },
];

// Demo Data

const navData = [
  { key: 1, badge: true, icon: <PencilRuler size={20} />, title: "Design" },
  { key: 2, badge: "", icon: <Trees size={20} />, title: "Nature Park" },
  { key: 3, badge: "", icon: <Feather size={20} />, title: "Creative Writing" },
  { key: 4, badge: "", icon: <Salad size={20} />, title: "Fresh Salads" },
  { key: 6, badge: "", icon: <WandSparkles size={20} />, title: "Magic Tools" },
  { key: 12, badge: "", icon: <PenTool size={20} />, title: "Vector Tools" },
  { key: 14, badge: "", icon: <Bird size={20} />, title: "Bird Watch" },
  { key: 16, badge: "", icon: <Wheat size={20} />, title: "Grain Farm" },
];

const RegularNavItems: React.FC = () => {
  const [selectedItemKey, setSelectedItemKey] = useState<number | null>(2);
  const [selectedItem2Key, setSelectedItem2Key] = useState<number | null>(3);
  const [selectedItem3Key, setSelectedItem3Key] = useState<number | null>(3);

  const handleItemClick = (key: number) => {
    setSelectedItemKey(key);
  };
  const handleItem2Click = (key: number) => {
    setSelectedItem2Key(key);
  };
  const handleItem3Click = (key: number) => {
    setSelectedItem3Key(key);
  };

  return (
    <>
      <group
        //   data-space="30"
        data-gap="30"
        data-direction="column"
        data-shrink="0"
        //  data-contain=""
        data-wrap="no"
        data-fit="1"
        data-align="start"
      >
        <group data-direction="column" data-gap="10" data-space="30">
          <text data-font-type="hero" data-text-size="large" data-ellipsis="">
            Tile Navigation
          </text>

          <text
            data-wrap="wrap"
            data-line="1.3"
            data-opacity="60"
            data-max-length="300"
          >
         Grid-based navigation with icons and labels for quick scanning and section access.
          </text>
        </group>

        <group
          data-elevation="2"
          data-radius="25"
          data-border=""
          data-background="context"
          data-max-length="400"
        >
          <group
            data-type="grid"
            data-grid-template="120"
            data-gap="1"
            data-contain=""
          >
            {navData.slice(0, 5).map((item) => (
              <group
                data-border=""
                data-space="10"
                key={item.key}
                onClick={() => handleItemClick(item.key)}
              >
                <Ripple>
                  <group
                    data-background={item.key === selectedItemKey ? "main" : ""}
                    data-color={item.key === selectedItemKey ? "main-text" : ""}
                    data-ink-color={
                      item.key === selectedItemKey ? "main-dark" : ""
                    }
                    data-contain=""
                    data-radius="15"
                    data-interactive=""
                    data-cursor="pointer"
                  >
                    <group
                      data-direction="column"
                      data-align="center"
                      data-space="15"
                      data-gap="5"
                    >
                      {item.badge ? (
                        <group
                          data-background={
                            item.key === selectedItemKey ? "main-text" : "red"
                          }
                          data-space="3"
                          data-position="absolute"
                          data-width="auto"
                          data-radius="5"
                          data-right="10"
                          data-top="10"
                        ></group>
                      ) : null}

                      <icon>{item.icon}</icon>
                      <text
                        data-ellipsis=""
                        data-opacity={
                          item.key === selectedItemKey ? "100" : "60"
                        }
                      >
                        {item.title}
                      </text>
                    </group>
                  </group>
                </Ripple>
              </group>
            ))}
          </group>
        </group>

        <separator data-horizontal="dotted" data-opacity="20"></separator>

        <group data-direction="column" data-gap="10" data-space="30">
          <text data-font-type="hero" data-text-size="large" data-ellipsis="">
           Pill Navigation
          </text>

          <text
            data-wrap="wrap"
            data-line="1.3"
            data-opacity="60"
            data-max-length="300"
          >
          Compact rounded items for filters, categories, or quick context switching.
          </text>
        </group>

        <group>
          <group>
            <group data-gap="5">
              {navData.map((item2) => (
                <Ripple key={item2.key}>
                  <group
                    key={item2.key}
                    onClick={() => handleItem2Click(item2.key)}
                    data-background={
                      item2.key === selectedItem2Key ? "main" : ""
                    }
                    data-color={
                      item2.key === selectedItem2Key ? "main-text" : ""
                    }
                    data-ink-color={
                      item2.key === selectedItem2Key ? "main-dark" : ""
                    }
                    data-contain=""
                    data-interactive=""
                    data-border="outline"
                    data-radius="30"
                    data-width="auto"
                    data-wrap="no"
                    data-cursor="pointer"
                    data-align="center"
                    data-space="5"
                    data-space-horizontal="15"
                    data-gap="10"
                  >
                    <icon
                      data-fill={item2.key === selectedItem2Key ? "fill" : ""}
                    >
                      {item2.icon}
                    </icon>
                    <text data-weight="600">{item2.title}</text>

                    {item2.badge ? (
                      <>
                        <group
                          data-margin-right="-10"
                          data-ratio="1:1"
                          data-length="30"
                          data-space="2"
                        >
                          <group
                            data-justify="center"
                            data-align="center"
                            data-height="fit"
                            data-background={
                              item2.key === selectedItem2Key
                                ? "main-text"
                                : "red"
                            }
                            data-color={
                              item2.key === selectedItem2Key
                                ? "main-color"
                                : "white"
                            }
                            data-radius="20"
                          >
                            <text data-weight="700">2</text>
                          </group>
                        </group>
                      </>
                    ) : null}
                  </group>
                </Ripple>
              ))}
            </group>
          </group>
        </group>

        <separator data-horizontal="dotted" data-opacity="20"></separator>

        <group
          data-gap="20"
          data-wrap="no"
          data-direction="column"
          data-align="start"
        >
          <group
            data-direction="column"
            data-width="auto"
            data-gap="10"
            data-space="30"
          >
            <text data-font-type="hero" data-text-size="large" data-wrap="wrap">
             Horizontal Section Navigation
            </text>
            <text
              data-wrap="wrap"
              data-max-length="260"
              data-line="1.3"
              data-opacity="60"
            >
             Left-aligned sections inside a scroll container with wheel interaction.
            </text>
          </group>
          <group
            data-border=""
            data-width="auto"
            data-radius="20"
            data-contain=""
            data-elevation="2"
            data-wrap="no"
            data-weight="600"
            data-snap-button="15"
          >
            <Scroll wheelEnabled={true}>
              <group data-wrap="no" data-space="10">
                {navData.map((item3) => (
                  <group
                    key={item3.key}
                    onClick={() => handleItem3Click(item3.key)}
                    data-height="40"
                    data-contain=""
                    data-shrink="no"
                    data-name="autoseparation"
                    data-wrap="no"
                    data-align="center"
                    data-width="auto"
                    data-selected={
                      item3.key === selectedItem3Key ? "true" : undefined
                    }
                  >
                    <separator
                      data-vertical=""
                      data-height="20"
                      data-position="absolute"
                      data-left="0"
                    ></separator>
                    <Ripple>
                      <group
                        data-background={
                          item3.key === selectedItem3Key ? "main-alpha-15" : ""
                        }


                        data-height="fit"
                        data-width="auto"
                        data-interactive=""
                        data-cursor="pointer"
                        data-align="center"
                        data-space-horizontal="15"
                        data-gap="10"
                        data-wrap="no"
                        data-radius="10"
                        data-contain=""
                      >

                        <text>{item3.title}</text>
                        {item3.badge ? (
                          <group
                            data-ratio="1:1"
                            data-justify="center"
                            data-align="center"
                            data-length="25"
                            data-background="red"
                            data-color="white"
                            data-radius="20"
                                          data-margin-right="-5"
                          >
                            <text data-weight="700">3</text>
                          </group>
                        ) : null}
                      </group>
                    </Ripple>
                  </group>
                ))}
              </group>
            </Scroll>
          </group>
        </group>
        <separator data-horizontal="dotted" data-opacity="20"></separator>

        {/* <group data-width="auto" data-gap="20">
          <group
            data-direction="column"
            data-width="auto"
            data-gap="10"
            data-space="30"
          >
            <text data-font-type="hero" data-text-size="large" data-wrap="wrap">
              Horizontal Navigation
            </text>
            <text
              data-wrap="wrap"
              data-length="200"
              data-line="1.3"
              data-opacity="60"
            >
              Right Aligned Navigation with Fixed Menu Button
            </text>
          </group>
          <group
            data-background="context"
            data-radius="15"
            data-contain=""
            data-elevation="2"
          >
            <group>
              <nav data-type="group" data-wrap="no" data-justify="end">
                <group data-width="auto" data-contain="">
                  <Scroll>
                    <group data-wrap="no">
                      <group data-wrap="no" data-width="auto">
                        <separator
                          data-vertical=""
                          data-height="fit"
                        ></separator>
                        <Ripple>
                          <group
                            data-cursor="pointer"
                            data-space="10"
                            data-space-horizontal="15"
                            data-gap="10"
                            data-wrap="no"
                            data-align="center"
                            data-interactive=""
                          >
     
                            <text data-adaptive="desktop">Cart</text>
                         
                            <group
                              data-length="25"
                              data-ratio="1:1"
                              data-radius="20"
                              data-color="white"
                              data-justify="center"
                              data-align="center"
                              data-background="red"
                            >
                              <text data-weight="700">5</text>
                            </group>
                          </group>
                        </Ripple>
                      </group>
                      <group data-wrap="no" data-width="auto">
                        <separator
                          data-vertical=""
                          data-height="fit"
                        ></separator>
                        <Ripple>
                          <group
                            data-cursor="pointer"
                            data-space="10"
                            data-space-horizontal="15"
                            data-gap="10"
                            data-wrap="no"
                            data-align="center"
                            data-interactive=""
                          >
                
                            <text data-weight="700">
                              Charlote Thompson
                            </text>
                          </group>
                        </Ripple>
                      </group>
                    </group>
                  </Scroll>
                </group>

                <group data-wrap="no" data-length="60" data-height="60">
                  <separator data-vertical="" data-height="fit"></separator>
                  <Button className="primary extra" toggleClassName="open">
                    <icon>
                      <SvgHamburger />
                    </icon>
                  </Button>
                </group>
              </nav>
            </group>
          </group>
        </group>
        <separator data-horizontal="dotted" data-opacity="20"></separator>
 */}

       <group
            data-direction="column"
            data-width="auto"
            data-gap="10"
            data-space="30"
          >
            <text data-font-type="hero" data-text-size="large" data-wrap="wrap">
             Tabbed Navigation
            </text>
            <text
              data-wrap="wrap"
              data-max-length="260"
              data-line="1.3"
              data-opacity="60"
            >
              Tabs for switching between related views within the same context.
            </text>
          </group>


        <group>
          <Tabstrip
            // separator={false}
            bottom
            // classic={false}
            // invert={false}
            // modern={true}
            selectedIndex={1}
            tabStripProps={{ "data-contain": "visible" }}
            tabStripContentProps={{
              "data-space": "30",
              "data-background": "context",
              "data-border": "",
              "data-radius-top": "20",
            }}
          >
            {tabsData.map((tab) => (
              <Tab key={tab.index} title={tab.title}>
                <group data-wrap="no" data-gap="30" data-align="center">
                  <group data-width="auto">
                    <text data-text-size="48" data-weight="700">
                      {tab.index}
                    </text>
                  </group>
                  <group
                    data-direction="column"
                    data-width="auto"
                    data-contain=""
                  >
                    <text
                      data-font-type="hero"
                      data-text-size="large"
                      data-ellipsis=""
                    >
                      {tab.title}
                    </text>
                    <text data-ellipsis="" data-line="1.5" data-light="">
                      Bottom Aligned Navigation
                    </text>
                  </group>
                </group>
              </Tab>
            ))}
          </Tabstrip>
        </group>
      </group>
    </>
  );
};
export default RegularNavItems;
