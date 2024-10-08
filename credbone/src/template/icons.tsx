import React, { useState } from "react";
import MaterialIcons from "./materialIcons";
import Ripple from "../components/Ripple";
import {
  IconDemo,
  IconHeart,
  IconHome,
  IconSearch,
  IconShare,
  IconStar,
  IconSun,
} from "../components/icon/credIcons";
import Tooltip from "../components/tooltip";



const ColorIcons = [
  { label: "Apparel Icon", name: "apparel", title: "Apparel", color: "" },
  { label: "Star Icon", name: "star", title: "Star", color: "" },
  { label: "Pizza Icon", name: "local_pizza", title: "Pizza", color: "" },
  { label: "Folder Icon", name: "folder", title: "Folder", color: "amber" },
  { label: "Favorite Icon", name: "favorite", title: "Heart", color: "red" },
  { label: "Leaf Icon", name: "nest_eco_leaf", title: "Leaf", color: "teal", },
];

const WeightIcons = [
  { label: "Leaf Icon - 100", name: "nest_eco_leaf", title: "Leaf - 100", color: "", weight: "100" },
  { label: "Leaf Icon - 200", name: "nest_eco_leaf", title: "Leaf - 200", color: "", weight: "200" },
  { label: "Leaf Icon - 300", name: "nest_eco_leaf", title: "Leaf - 300", color: "", weight: "300" },
  { label: "Leaf Icon - 400", name: "nest_eco_leaf", title: "Leaf - 400", color: "", weight: "" },
  { label: "Leaf Icon - 500", name: "nest_eco_leaf", title: "Leaf - 500", color: "", weight: "500" },
  { label: "Leaf Icon - 600", name: "nest_eco_leaf", title: "Leaf - 600", color: "", weight: "600" },
  { label: "Leaf Icon - 700", name: "nest_eco_leaf", title: "Leaf - 700", color: "", weight: "700" }
];



const Icons: React.FC = () => {


  const [searchValue, setSearchValue] = useState<string>('');

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
    setSearchValue(''); // Reset search input
    updateDisplay(''); // Show all items and parent containers
  };






  return (
    <group data-align="start" data-direction="column">
      <group
        data-max-length="400"
        data-space="30"
        data-border="no"
        data-margin-right="-30"
        data-margin-bottom="-30"
      >
        <group
          data-background="context"
          data-radius="10"
          data-elevation="1"
          data-contain=""
        >
          <group data-direction="column" data-gap="10" data-space="30">
            <text
              data-weight="700"
              data-text-size="xxx-large"
              data-wrap="wrap"
              data-color="main"
            >
              Icons
            </text>
            <text
              data-wrap="wrap"
              data-length="610"
              data-line="1.5"
              data-light=""
            >
              Material Symbols consolidating over <b>3,275</b> glyphs in a
              single font file with a wide range of design variants.
            </text>
          </group>

          <group
            data-background="main"
            data-contain=""
            // data-dark=""
            data-align="center"
          >
            <group data-length="fit" data-space="40" data-color="main-text">
              <IconDemo />
            </group>
          </group>
        </group>
      </group>

      <group data-max-length="1200">
        <group data-space="30" data-sticky="top" data-width="auto">
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
                        <icon data-height="auto">close</icon>
                      </group>
                    </Tooltip>
      )}
                   

                  </div>
                </div>
              </label>
            </Ripple>
          </group>
        </group>

        <group data-space-horizontal="30" data-gap="30">
          <group data-name="icon-group" data-gap="30">
            <group data-align="center" data-gap="15">
              <group data-width="auto">
                <text data-weight="700" data-ellipsis="">
                  Material Icons Demo
                </text>
              </group>

              <group
                data-name="autoseparation"
                data-width="auto"
                data-align="center"
              >
                <separator data-vertical=""></separator>
                <a
                  data-radius="5"
                  data-interactive=""
                  data-space="10"
                  data-space-horizontal="15"
                  data-link=""
                  target="_blank"
                  rel="noreferrer"
                  href="https://fonts.google.com/icons?icon.style=Rounded"
                >
                  <text data-weight="700" data-ellipsis="">
                    More icons ...
                  </text>
                </a>
              </group>
            </group>

            <group>
              <group
                data-type="grid"
                data-gap="5"
                data-grid-template="110"
                data-contain=""
              >
                <MaterialIcons></MaterialIcons>
              </group>
            </group>
          </group>

          <group data-name="icon-group" data-gap="30">
            <group data-align="center">
              <text data-weight="700" data-ellipsis="">
                Filled & Colored Icons
              </text>
            </group>

            <group>
              <group
                data-type="grid"
                data-gap="10"
                data-grid-template="110"
                data-contain=""
              >
                {ColorIcons.map((coloricon, index) => (
                  <Ripple key={index}>
                    <group
                      key={index}
                      data-name="icon-demo"
                      data-contain=""
                      data-interactive=""
                      data-space="15"
                      data-cursor="pointer"
                      data-ratio="1:1"
                      data-radius="10"
                    >
                      <group
                        data-index="1"
                        data-justify="center"
                        data-align="center"
                        data-gap="20"
                        data-direction="column"
                      >
                        <icon
                          data-icon-size="mini"
                          data-fill="fill"
                          data-color={coloricon.color}
                        >
                          {coloricon.name}
                        </icon>
                        <text data-light="" data-ellipsis="">
                          {coloricon.title}
                        </text>
                      </group>
                    </group>
                  </Ripple>
                ))}
              </group>
            </group>
          </group>

          <group data-name="icon-group" data-gap="30">
            <group data-align="center">
              <text data-weight="700" data-ellipsis="">
                Icon Weight
              </text>
            </group>

            <group>
              <group
                data-type="grid"
                data-gap="10"
                data-grid-template="110"
                data-contain=""
              >
                {WeightIcons.map((weighticon, index) => (
                  <Ripple key={index}>
                    <group
                      key={index}
                      data-name="icon-demo"
                      data-contain=""
                      data-interactive=""
                      data-space="15"
                      data-cursor="pointer"
                      data-ratio="1:1"
                      data-radius="10"
                    >
                      <group
                        data-index="1"
                        data-justify="center"
                        data-align="center"
                        data-gap="20"
                        data-direction="column"
                      >
                        <icon
                          data-icon-size="mini"
                          data-icon-weight={weighticon.weight}
                        >
                          {weighticon.name}
                        </icon>
                        <text data-light="" data-ellipsis="">
                          {weighticon.title}
                        </text>
                      </group>
                    </group>
                  </Ripple>
                ))}
              </group>
            </group>
          </group>

          <group data-name="icon-group" data-gap="30">
            <group data-align="center">
              <text data-weight="700" data-ellipsis="">
                Icons
              </text>
            </group>

            <group>
              <group
                data-type="grid"
                data-gap="10"
                data-grid-template="110"
                data-contain=""
              >
                <group
                  data-radius="10"
                  data-name="icon-demo"
                  data-contain=""
                  data-interactive=""
                  data-background="main-background"
                  data-space="15"
                  data-cursor="pointer"
                  data-ratio="1:1"
                >
                  <group
                    data-index="1"
                    data-justify="center"
                    data-align="center"
                    data-gap="20"
                    data-direction="column"
                  >
                    <icon>
                      <IconHome />
                    </icon>
                    <text data-ellipsis="">Home</text>
                  </group>
                </group>

                <group
                  data-radius="10"
                  data-name="icon-demo"
                  data-contain=""
                  data-interactive=""
                  data-background="main-background"
                  data-space="15"
                  data-cursor="pointer"
                  data-ratio="1:1"
                >
                  <group
                    data-index="1"
                    data-justify="center"
                    data-align="center"
                    data-gap="20"
                    data-direction="column"
                  >
                    <icon>
                      <IconSearch />
                    </icon>
                    <text data-ellipsis="">Search</text>
                  </group>
                </group>

                <group
                  data-radius="10"
                  data-name="icon-demo"
                  data-contain=""
                  data-interactive=""
                  data-background="main-background"
                  data-space="15"
                  data-cursor="pointer"
                  data-ratio="1:1"
                >
                  <group
                    data-index="1"
                    data-justify="center"
                    data-align="center"
                    data-gap="20"
                    data-direction="column"
                  >
                    <icon>
                      <IconSun />
                    </icon>
                    <text data-ellipsis="">Sun</text>
                  </group>
                </group>

                <group
                  data-radius="10"
                  data-name="icon-demo"
                  data-contain=""
                  data-interactive=""
                  data-background="main-background"
                  data-space="15"
                  data-cursor="pointer"
                  data-ratio="1:1"
                >
                  <group
                    data-index="1"
                    data-justify="center"
                    data-align="center"
                    data-gap="20"
                    data-direction="column"
                  >
                    <icon>
                      <IconShare />
                    </icon>
                    <text data-ellipsis="">Share</text>
                  </group>
                </group>

                <group
                  data-radius="10"
                  data-name="icon-demo"
                  data-contain=""
                  data-interactive=""
                  data-background="main-background"
                  data-space="15"
                  data-cursor="pointer"
                  data-ratio="1:1"
                >
                  <group
                    data-index="1"
                    data-justify="center"
                    data-align="center"
                    data-gap="20"
                    data-direction="column"
                  >
                    <icon>
                      <IconHeart />
                    </icon>
                    <text data-ellipsis="">Heart</text>
                  </group>
                </group>

                <group
                  data-radius="10"
                  data-name="icon-demo"
                  data-contain=""
                  data-interactive=""
                  data-background="main-background"
                  data-space="15"
                  data-cursor="pointer"
                  data-ratio="1:1"
                >
                  <group
                    data-index="1"
                    data-justify="center"
                    data-align="center"
                    data-gap="20"
                    data-direction="column"
                  >
                    <icon>
                      <IconStar />
                    </icon>
                    <text data-ellipsis="">Star</text>
                  </group>
                </group>
              </group>
            </group>
          </group>

          <group></group>
        </group>
      </group>
    </group>
  );
};
export default Icons;
