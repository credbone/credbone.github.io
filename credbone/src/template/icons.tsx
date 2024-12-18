import React, { useState } from "react";
import Ripple from "../components/Ripple";
import Tooltip from "../components/tooltip";

import {
  IconBook,
  IconHeart,
  IconHome,
  IconPicker,
  IconSearch,
  IconSettings,
  IconShare,
  IconStar,
  IconSun,
} from "../components/icon/credIcons";

import {
  Armchair,
  Bird,
  BookMarked,
  Box,
  CakeSlice,
  Database,
  Feather,
  Package,
  Paintbrush,
  PencilRuler,
  Pizza,
  Snail,
  Wallet,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import sectionImage from "../styles/images/samples/wide_res_61.jpg";
import sectionImage_2 from "../styles/images/samples/wide_res_66.jpg";

const lucideIcons = [
  { name: <Snail size={20} />, title: "Snail" },
  { name: <Package size={20} />, title: "Package" },
  { name: <PencilRuler size={20} />, title: "Pencil Ruler" },
  { name: <Box size={20} />, title: "Box" },
  { name: <CakeSlice size={20} />, title: "Cake Slice" },
  { name: <Database size={20} />, title: "Database" },
  { name: <Feather size={20} />, title: "Feather" },
  { name: <Pizza size={20} />, title: "Pizza" },
  { name: <Armchair size={20} />, title: "Armchair" },
  { name: <Bird size={20} />, title: "Bird" },
  { name: <Wallet size={20} />, title: "Wallet" },
  { name: <BookMarked size={20} />, title: "BookMarked" },
  { name: <Paintbrush size={20} />, title: "Paint Brush" },
];

const CustomIcons = [
  { name: <IconHome />, title: "Home" },
  { name: <IconSearch />, title: "Search" },
  { name: <IconSun />, title: "Sun" },
  { name: <IconShare />, title: "Share" },
  { name: <IconHeart />, title: "Heart" },
  { name: <IconStar />, title: "Star" },
  { name: <IconSettings />, title: "Settings" },
  { name: <IconPicker />, title: "Picker" },
];

const Icons: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

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

  return (
    <group
      data-space="30"
      data-gap="30"
      data-align="start"
      data-direction="column"
    >
      <group data-direction="column" data-gap="10">
        <text
          data-weight="700"
          data-text-size="xxx-large"
          data-wrap="wrap"
          data-color="main"
        >
          Icons
        </text>
        <text data-wrap="wrap" data-length="400" data-line="1.5" data-light="">
          Currently Lucide is in use as the standard icon set, integrated into
          existing components to save time and simplify maintenance.
        </text>
      </group>

      <group data-sticky="top" data-top="30" data-width="auto">
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

      <group data-gap="30">
        <group data-name="icon-group" data-gap="30">
          <group>
            <picture
              data-radius="20"
              data-contain=""
              data-brightness="adaptive"
              data-background="grey-light"
              data-position="absolute"
            >
              <img src={sectionImage} alt="" />
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
              >
                <text data-weight="700" data-text-size="large" data-ellipsis="">
                  Lucide Icons Demo
                </text>

                <text
                  data-opacity="50"
                  data-max-length="300"
                  data-wrap="wrap"
                  data-line="20"
                >
                  Few examples of Lucide Icons in action, showcasing a variety
                  of icons
                </text>

                <Link
                  data-type="group"
                  data-drag="none"
                  data-width="auto"
                  data-link=""
                  target="_blank"
                  rel="noreferrer"
                  to="https://lucide.dev/"
                >
                  <text data-weight="700" data-ellipsis="">
                    View More
                  </text>
                </Link>
              </group>
            </group>
          </group>

          <group>
            <group
              // data-max-length="900"
              data-type="grid"
              data-gap="5"
              data-grid-template="100"
              data-contain=""
            >
              {lucideIcons.map((icon, index) => (
                <Ripple key={index}>
                  <group
                    onClick={() => handleIconClick(icon.title)}
                    data-ink-color={isSelected(icon.title) ? "main-dark" : ""}
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
                      <icon>{icon.name}</icon>
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

      
        <group data-name="icon-group" data-gap="30">


        <group>
            <picture
              data-radius="20"
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
              >
            <text data-weight="700" data-text-size="large" data-ellipsis="">
              Icons
            </text>
            <text data-opacity="50">Examples of Custom-Designed Icons</text>


              </group>
            </group>
          </group>




          <group>
            <group
              data-type="grid"
              data-gap="5"
              data-grid-template="100"
              data-contain=""
            >
              {CustomIcons.map((icon, index) => (
                <Ripple key={index}>
                  <group
                    onClick={() => handleIconClick(icon.title)}
                    data-ink-color={isSelected(icon.title) ? "main-dark" : ""}
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
                        {icon.name}
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

        <group></group>
      </group>
    </group>
  );
};
export default Icons;
