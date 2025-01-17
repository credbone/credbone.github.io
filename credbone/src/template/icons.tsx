import React, { useState } from "react";
import Ripple from "../components/Ripple";
import Tooltip from "../components/tooltip";

import {
  IconHeart,
  IconHome,
  IconSearch,
  IconSettings,
  IconShare,
  IconStar,
  IconSun,
} from "../components/icon/credIcons";

import {
  Proportions,
  Bird,
  BookMarked,
  Box,
  CakeSlice,
  Videotape,
  Feather,
  Package,
  Paintbrush,
  PencilRuler,
  Pizza,
  Snail,
  Wallet,
  X,
} from "lucide-react";

import sectionImage_2 from "../styles/images/samples/wide_res_74.jpg";
//import sectionImage_2 from "../styles/images/samples/wide_res_67.webp";
import CustomSlider from "../components/inputs/slider";
import StuckReporter from "../components/StuckReporter";
import SystemColorPicker from "./systemColorPicker";

const lucideIcons = [
  { Component: Snail, title: "Snail" },
  { Component: Package, title: "Package" },
  { Component: PencilRuler, title: "Pencil Ruler" },
  { Component: Box, title: "Box" },
  { Component: CakeSlice, title: "Cake Slice" },
  { Component: Videotape, title: "Videotape" },
  { Component: Feather, title: "Feather" },
  { Component: Pizza, title: "Pizza" },
  { Component: Proportions, title: "Proportions" },
  { Component: Bird, title: "Bird" },
  { Component: Wallet, title: "Wallet" },
  { Component: BookMarked, title: "BookMarked" },
  { Component: Paintbrush, title: "Paint Brush" },
];

const CustomIcons = [
  { Component: IconHome, title: "Home" },
  { Component: IconSearch, title: "Search" },
  { Component: IconSun, title: "Sun" },
  { Component: IconShare, title: "Share" },
  { Component: IconHeart, title: "Heart" },
  { Component: IconStar, title: "Star" },
  { Component: IconSettings, title: "Settings" },
  // { Component: IconPicker, title: "Picker" },
];

const Icons: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [IconSize, setIconSize] = useState(64);
  const [IconStroke, setIconStroke] = useState(2);
  const [isFilled, setisFilled] = useState(false);

  const [isInverted, setIsInverted] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("text");



  const toggleInvert = () => {
    setIsInverted((prev) => !prev);
    if (selectedColor === "text") {
      setSelectedColor("main-background");
    } else if (selectedColor === "main-background") {
      setSelectedColor("text");
    }
  };
  
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  
    if (color === "text") {
      setIsInverted(false); // Set inverted state to false for "text"
    } else if (color === "main-background") {
      setIsInverted(true); // Set inverted state to true for "main-background"
    }
  };



  const updateDisplay = (value: string) => {
    const parentContainers = document.querySelectorAll(
      "[data-name='icon-group']"
    );

    parentContainers.forEach((parentContainer) => {
      let anyItemsToShow = false;
      const items = parentContainer.querySelectorAll("[data-name='icon-demo']");

      items.forEach((item) => {
        if (item instanceof HTMLElement) {
          const text = item.textContent || "";
          const shouldShow = text.toLowerCase().includes(value.toLowerCase());
          item.style.display = value && !shouldShow ? "none" : "";
          if (shouldShow) {
            anyItemsToShow = true;
          }
        }
      });

      if (parentContainer instanceof HTMLElement) {
        parentContainer.style.display = anyItemsToShow ? "" : "none";
      }
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    updateDisplay(value);
  };

  const clearSearch = () => {
    setSearchValue(""); // Reset search input
    updateDisplay(""); // Show all items and parent containers
  };

  const [selectedIcon, setSelectedIcon] = useState<string>(
    lucideIcons.length > 0 ? lucideIcons[0].title : ""
  );

  const handleIconClick = (iconName: string) => {
    setSelectedIcon(iconName);
  };

  const isSelected = (iconName: string) => {
    return selectedIcon === iconName;
  };

  const selectedCustomIcon = CustomIcons.find(
    (icon) => icon.title === selectedIcon
  );
  const selectedLucideIcon = lucideIcons.find(
    (icon) => icon.title === selectedIcon
  );

  return (
    <group
      data-space="30"
    //  data-gap="30"
      data-align="start"
      data-direction="column"
    >
      <group
        data-direction="column"
        data-gap="10"
        data-background="adaptive-gray"
        data-radius="20"
        data-justify="end"
        data-space="30"
      >
        <group data-height="100" data-adaptive="desktop"></group>
        <text
          data-weight="700"
          data-text-size="xxx-large"
          data-wrap="wrap"
          //   data-color="main"
        >
          Icons
        </text>
        <text data-wrap="wrap" data-length="400" data-line="1.5">
        Currently, Lucide serves as the standard icon set, integrated into existing components, with additional custom-designed icons for specific use cases.
        </text>
      </group>

      <group data-direction="column" data-gap="50">
        <group >


<StuckReporter>
{(isSticky) => (
<group data-sticky="top" data-space-vertical="30" data-space-horizontal={isSticky ? "30" : ""} data-duration=".125">
            <group
              data-length="600"
              data-radius="10"
              data-border="outline"
              data-align="center"
              data-backdrop="10"
              data-contain=""
              data-shrink="no"
            >
              <Ripple>
                <label
                  data-align="center"
                  className="field"
                  data-label="left"
                  data-multi-element=""
                  data-length="autofit"
                  data-space-horizontal="10"
                >
                  <div className="form_fields">
                    <div className="field_cont" data-height="50" data-gap="10">
                      <group
                        data-length="30"
                        data-align="center"
                        data-justify="center"
                      >
                        <IconSearch size={20} />
                      </group>

                      <separator data-vertical="" data-height="20"></separator>
                      <input
                        type="search"
                        className="icon_search"
                        placeholder="Search..."
                        onChange={handleSearch}
                        value={searchValue}
                      />
                      {searchValue && (
                        <Tooltip content="Clear">
                          <group
                            data-contain=""
                            data-space="5"
                            data-shrink="no"
                            data-interactive=""
                            data-width="auto"
                            data-cursor="pointer"
                            data-radius="5"
                            data-align="center"
                            data-direction="column"
                            onClick={clearSearch}
                            data-animation-name="appear-bottom"
                            data-fill-mode="backwards"
                            data-animation-duration="2"
                          >
                            <icon data-height="auto">{<X size={20} />}</icon>
                          </group>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </label>
              </Ripple>
            </group>
          </group>
 )}
</StuckReporter>

          <group data-gap="50">
            <group data-name="icon-group" data-gap="50">
              <group data-border="" data-radius="20">


                <group data-space="30">
                  <group
                    data-background="main-background"
                    data-space="30"
                    data-width="auto"
                    data-radius="15"
                    data-direction="column"
                    data-gap="15"
                    data-align="start"
                    data-contain=""
                  >
                    <text
                      data-weight="700"
                      data-text-size="large"
                      data-ellipsis=""
                    >
                      Lucide Icons Demo
                    </text>

                    <text
                      data-opacity="50"
                      data-max-length="240"
                      data-wrap="wrap"
                      data-line="20"
                    >
                      Few examples of Lucide Icons in action, showcasing a
                      variety of icons
                    </text>

                    {/* <Link
                    data-type="group"
                    data-drag="none"
                    data-width="auto"
                    data-color="main"
                    // data-link=""
                    target="_blank"
                    //  rel="noreferrer"
                    to="https://lucide.dev/"
                  >
                    <text data-weight="700" data-ellipsis="">
                      View More
                    </text>
                  </Link> */}
                  </group>
                </group>
              </group>

              <group>
                <group
                  // data-max-length="900"
                  data-type="grid"
                  data-gap="5"
                  data-grid-template="120"
                  data-contain=""
                >
                  {lucideIcons.map((icon, index) => (
                    <Ripple key={index}>
                      <group
                        onClick={() => handleIconClick(icon.title)}
                        data-ink-color={
                          isSelected(icon.title) ? "main-dark" : ""
                        }
                        data-background={isSelected(icon.title) ? "main" : ""}
                        data-color={isSelected(icon.title) ? "main-text" : ""}
                        key={index}
                        data-name="icon-demo"
                        data-contain=""
                        data-interactive=""
                        data-space="15"
                        data-cursor="pointer"
                        data-radius="10"
                      >
                        <group
                          data-index="1"
                          data-justify="center"
                          data-align="center"
                          data-gap="20"
                          data-direction="column"
                        >
                          <icon.Component size={20} />
                          <text data-light="" data-ellipsis="">
                            {icon.title}
                          </text>
                        </group>
                      </group>
                    </Ripple>
                  ))}
                </group>
              </group>
            </group>

            <group data-name="icon-group" data-gap="50">
              <group>
                <picture
                  data-radius="30"
                  data-contain=""
                  data-brightness="adaptive"
                  data-background="grey-light"
                  data-position="absolute"
                >
                  <img src={sectionImage_2} alt="" />
                </picture>

                <group data-space="30">
                  <group
                    data-background="main-background"
                    data-space="30"
                    data-width="auto"
                    data-radius="15"
                    data-direction="column"
                    data-gap="15"
                    data-align="start"
                    data-contain=""
                  >
                    <text
                      data-weight="700"
                      data-text-size="large"
                      data-ellipsis=""
                    >
                      Custom Icons
                    </text>
                    <text
                      data-opacity="50"
                      data-line="20"
                      data-wrap="wrap"
                      data-length="300"
                    >
                      Examples of custom-designed icons. If a fill option is
                      supported, a specific part of the icon will be filled
                    </text>
                  </group>
                </group>
              </group>

              <group>
                <group
                  data-type="grid"
                  data-gap="5"
                  data-grid-template="120"
                  data-contain=""
                >
                  {CustomIcons.map((icon, index) => (
                    <Ripple key={index}>
                      <group
                        onClick={() => handleIconClick(icon.title)}
                        data-ink-color={
                          isSelected(icon.title) ? "main-dark" : ""
                        }
                        data-background={isSelected(icon.title) ? "main" : ""}
                        data-color={isSelected(icon.title) ? "main-text" : ""}
                        key={index}
                        data-name="icon-demo"
                        data-contain=""
                        data-interactive=""
                        data-space="15"
                        data-cursor="pointer"
                        data-radius="10"
                      >
                        <group
                          data-index="1"
                          data-justify="center"
                          data-align="center"
                          data-gap="20"
                          data-direction="column"
                        >
                          <group
                            data-length="30"
                            data-height="30"
                            data-align="center"
                            data-justify="center"
                          >
                            <icon.Component />
                          </group>
                          <text data-light="" data-ellipsis="">
                            {icon.title}
                          </text>
                        </group>
                      </group>
                    </Ripple>
                  ))}
                </group>
              </group>
            </group>
          </group>
        </group>

        <group
          data-gap="30"
          data-type="grid"
          data-grid-template="300"
          data-align="start"
          // data-length="300"

          data-direction="column"
          //    data-autofit="1-600"
        >
          <group
            data-background={isInverted ? "text" : ""}
            data-color={isInverted ? "main-background" : ""}
            // data-sticky="top"
            // data-top="15"
            //   data-direction="column"

            data-border=""
            data-radius="20"
            data-align="center"
            data-gap="30"
            data-space="30"
          >
            <group
              data-height="120"
              data-align="center"
              data-justify="center"
              data-gap="30"
              data-color={selectedColor}
            >
              {selectedCustomIcon ? (
                <selectedCustomIcon.Component
                  fill={isFilled}
                  stroke={IconStroke}
                  size={IconSize}
                />
              ) : selectedLucideIcon ? (
                <selectedLucideIcon.Component
                  strokeWidth={IconStroke}
                  size={IconSize}
                  fill={isFilled ? "currentcolor" : "none"}
                />
              ) : (
                <text data-opacity="50">Select an icon</text>
              )}
            </group>
            {/* 
          <separator data-horizontal=""></separator> */}

            <group data-direction="column">
              <text data-wrap="wrap" data-opacity="60" data-line="1.5">
                Icons use the current color by default. Invert the container to
                see how icons adapt to different contexts.
              </text>
            </group>

            <group data-width="auto" data-gap="30">
              <separator data-horizontal=""></separator>
              <group
                data-space="15"
                data-align="center"
                data-justify="center"
                data-background="adaptive-gray"
                // data-border="outline"
                data-width="auto"
                data-interactive=""
                data-over-color="neutral"
                data-radius="10"
                data-cursor="pointer"
                onClick={toggleInvert}
              >
                <text>Invert</text>
              </group>
            </group>
          </group>

          <group data-gap="15" data-direction="column">
            <group
              data-border=""
              data-radius="15"
              data-align="center"
              data-gap="15"
              data-space="15"
              // data-disabled={selectedLucideIcon ? "true" : ""}
              // data-opacity={selectedLucideIcon ? "50" : ""}
              // data-background={selectedLucideIcon ? "highlight" : ""}
            >
              <group
                data-width="auto"
                //data-min-length="80"
              >
                <group
                  data-space-horizontal="15"
                  data-space-vertical="10"
                  data-background="text"
                  data-width="auto"
                  data-color="main-background"
                  data-radius="30"
                >
                  <text>Style</text>
                </group>
              </group>

              <separator data-vertical=""></separator>

              <group data-gap="5" data-width="auto" data-wrap="no">
                <group
                  onClick={() => setisFilled(false)}
                  data-align="center"
                  data-justify="center"
                  data-background={isFilled ? "" : "highlight"}
                  data-border={isFilled ? "" : "none"}
                  data-width="auto"
                  data-interactive=""
                  data-over-color="neutral"
                  data-radius="10"
                  data-cursor="pointer"
                  data-space-vertical="10"
                  data-space-horizontal="15"
                >
                  <text>Outline</text>
                </group>

                <group
                  onClick={() => setisFilled(true)}
                  data-align="center"
                  data-justify="center"
                  data-background={isFilled ? "highlight" : ""}
                  data-border={isFilled ? "none" : ""}
                  data-width="auto"
                  data-interactive=""
                  data-over-color="neutral"
                  data-radius="10"
                  data-cursor="pointer"
                  data-space-vertical="10"
                  data-space-horizontal="15"
                >
                  <text>Filled</text>
                </group>
              </group>
            </group>

            <group data-space="20">
              <text
                data-wrap="wrap"
                data-line="1.5"
                //   data-opacity="60"
                data-max-length="300"
              >
                Icons can be configured for size, stroke width, and color. Some
                icons also support fill customization
              </text>
            </group>

            <group data-border="" data-radius="15">
              <group data-align="center" data-gap="15" data-space="15">
                <group
                  data-width="auto"
                  //data-min-length="80"
                >
                  <group
                    data-space-horizontal="15"
                    data-space-vertical="10"
                    data-background="text"
                    data-width="auto"
                    data-color="main-background"
                    data-radius="30"
                  >
                    <text>Size</text>
                  </group>
                </group>

                <separator data-vertical=""></separator>

                <group data-fit="1">
                  <CustomSlider
                    handlerWidth={50}
                    //     step={2}
                    start={18}
                    end={96}
                    value={IconSize}
                    onValueChange={(value) => setIconSize(value)}
                    handlerProps={{
                      "data-background": "none",
                      "data-color": "text",
                      "data-border": "inset",
                      "data-radius": "10",
                      "data-height": "initial",
                      "data-space-vertical": "10",
                    }}
                    trackLeftProps={{ "data-margin": "0", "data-height": "1" }}
                    trackRightProps={{
                      "data-opacity": "10",
                      "data-height": "1",
                    }}
                  />
                </group>
              </group>

              <separator data-horizontal=""></separator>

              <group data-align="center" data-gap="15" data-space="15">
                <group
                  data-width="auto"
                  //data-min-length="80"
                >
                  <group
                    data-space-horizontal="15"
                    data-space-vertical="10"
                    data-background="text"
                    data-width="auto"
                    data-color="main-background"
                    data-radius="30"
                  >
                    <text>Stroke</text>
                  </group>
                </group>

                <separator data-vertical=""></separator>

                <group data-fit="1">
                  <CustomSlider
                    handlerWidth={50}
                    step={0.1}
                    start={0.5}
                    end={3}
                    value={IconStroke}
                    onValueChange={(value) => setIconStroke(value)}
                    handlerProps={{
                      "data-background": "none",
                      "data-color": "text",
                      "data-border": "inset",
                      "data-radius": "10",
                      "data-height": "initial",
                      "data-space-vertical": "10",
                    }}
                    trackLeftProps={{ "data-margin": "0", "data-height": "1" }}
                    trackRightProps={{
                      "data-opacity": "10",
                      "data-height": "1",
                    }}
                  />
                </group>
              </group>
            </group>




<group data-border="" data-radius="15" data-contain="">
 <SystemColorPicker selectedColor={selectedColor} handleColorSelect={handleColorSelect}/>
</group>


          </group>
        </group>
      </group>
    </group>
  );
};
export default Icons;
