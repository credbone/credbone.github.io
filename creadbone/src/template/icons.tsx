
import React from "react";
import MaterialIcons from "./materialIcons";
import Ripple from "../components/Ripple";

const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value.toLowerCase();
  const parentContainers = document.querySelectorAll("grid");

  parentContainers.forEach((parentContainer) => {
    let anyItemsToShow = false;
    const items = parentContainer.querySelectorAll("[data-name='icon-demo']");

    items.forEach((item) => {
      const text = item.textContent || ""; //NOSONAR
      const shouldShow = text.toLowerCase().includes(value);

      if (item instanceof HTMLElement) {
        if (shouldShow) {
          item.style.display = "";
          anyItemsToShow = true;
        } else {
          item.style.display = "none";
        }
      }
    });

    if (parentContainer instanceof HTMLElement) {
      parentContainer.style.display = anyItemsToShow ? "" : "none";
    }
  });
};

const Icons: React.FC = () => {
  return (
    <view>

      <view data-vertical="true">
        <view data-scroll="" data-space="15">
          <group   data-direction="column" data-gap="15" data-space="20">
            <text data-weight="700" data-text-size="xxx-large" data-wrap="wrap" data-color="main">Material Symbols</text>
            <text data-wrap="wrap" data-length="610" data-line="1.5" data-light="" >
              Material Symbols consolidating over <b>3,275</b> glyphs in a single font file with a wide range of design variants.
              Symbols are available in three styles and four adjustable variable font styles (fill, weight, grade, and optical size).
            </text> 
</group>
       <group
            data-sticky="top"
            data-space="20"
            data-width="auto"
          
          >
            <group data-length="400" data-radius="10" data-elevation="1" data-align="center"   data-backdrop="10"
            data-contain=""
            data-shrink="no" >
                                    <Ripple>
        <label  //NOSONAR
          className="field"
                data-label="left"
               
          data-multi-element=""
                data-length="autofit"
                data-space-horizontal="10"
        >
          <div className="form_fields">
            <div className="field_cont">
              <icon data-space="5">search</icon>
              <separator data-vertical="" data-margin="10"></separator>
              <input
               
                className="icon_search"
                placeholder="Search..."
                onChange={handleSearch}
                    /> 
                                    
            </div>
          </div>
              </label>
              </Ripple>
</group>
      </group>

          <group>
            <grid>
              <group
                data-align="center"
              //  data-border="overprint"
                data-space-horizontal="10"
              //  data-sticky="top"
              //  data-backdrop=""
              >
                <text data-weight="700" data-space="10" data-ellipsis="">
                  Material Icons Demo
                </text>
                <separator data-vertical=""></separator>
<a
                  data-link=""
                  target="_blank"
                  rel="noreferrer"
                  href="https://fonts.google.com/icons?icon.style=Rounded"
                >
                  
                  <text data-weight="700" data-space="10" data-ellipsis="">
                    More icons ...
                  </text>
                </a>
              </group>

              <group data-space="10">
                <group
                  data-space="10"
                  data-type="grid"
                  data-gap="10"
                  data-grid-template="110"
                  data-contain=""
                  // data-border=""
                  // data-radius="10"
                >
                  <MaterialIcons></MaterialIcons>
                </group>
              </group>
            </grid>

            <grid>
              <group
                data-align="center"
               // data-border="overprint"
                 data-space-horizontal="10"
              //  data-sticky="top"
              //  data-backdrop=""
              >
                <text data-weight="700" data-space="10" data-ellipsis="">
                  Filled & Colored Icons
                </text>
              </group>

               <group data-space="10">
                <group
                  data-space="10"
                  data-type="grid"
                  data-gap="10"
                  data-grid-template="110"
                  data-contain=""
                >
                  <group data-radius="10" data-name="icon-demo" data-contain="" data-interactive="" data-background="main-background" data-border="outline" data-space="15" data-cursor="pointer" data-ratio="1:1" > <group data-index="1" data-justify="center" data-align="center" data-gap="20" data-direction="column" > <icon data-icon-size="mini" data-fill="">apparel</icon> <text data-ellipsis="">Apparel</text> </group> </group>
                  <group data-radius="10" data-name="icon-demo" data-contain="" data-interactive="" data-background="main-background" data-border="outline" data-space="15" data-cursor="pointer" data-ratio="1:1" > <group data-index="1" data-justify="center" data-align="center" data-gap="20" data-direction="column" > <icon data-icon-size="mini" data-fill="">star</icon> <text data-ellipsis="">Star</text> </group> </group>
                  <group data-radius="10" data-name="icon-demo" data-contain="" data-interactive="" data-background="main-background" data-border="outline" data-space="15" data-cursor="pointer" data-ratio="1:1" > <group data-index="1" data-justify="center" data-align="center" data-gap="20" data-direction="column" > <icon data-icon-size="mini"  data-fill="">local_pizza</icon> <text data-ellipsis="">Pizza</text> </group> </group>
                  <group data-radius="10" data-name="icon-demo" data-contain="" data-interactive="" data-background="main-background" data-border="outline" data-space="15" data-cursor="pointer" data-ratio="1:1" > <group data-index="1" data-justify="center" data-align="center" data-gap="20" data-direction="column" > <icon data-icon-size="mini"  data-fill="" data-color="amber">folder</icon> <text>Folder</text> </group> </group>
                  <group data-radius="10" data-name="icon-demo" data-contain="" data-interactive="" data-background="main-background" data-border="outline" data-space="15" data-cursor="pointer" data-ratio="1:1" > <group data-index="1" data-justify="center" data-align="center" data-gap="20" data-direction="column" > <icon data-icon-size="mini"  data-fill="" data-color="red"> favorite </icon> <text>Heart</text> </group> </group>
                  <group data-radius="10" data-name="icon-demo" data-contain="" data-interactive="" data-background="main-background" data-border="outline" data-space="15" data-cursor="pointer" data-ratio="1:1" > <group data-index="1" data-justify="center" data-align="center" data-gap="20" data-direction="column" > <icon data-icon-size="mini"  data-fill="" data-color="light-green">nest_eco_leaf</icon> <text>Leaf</text> </group> </group>
                </group>
              </group>
            </grid>

            <grid>
              <group data-align="center"
              //  data-border="overprint"
                data-space-horizontal="10"
            //    data-sticky="top"
             //   data-backdrop=""
              > <text data-weight="700" data-space="10" data-ellipsis=""> Icon Weight </text> </group>

                <group data-space="10">
                <group
                  data-space="10"
                  data-type="grid"
                  data-gap="10"
                  data-grid-template="110"
                  data-contain=""
                >
                  <group data-radius="10" data-name="icon-demo" data-contain="" data-interactive="" data-background="main-background" data-border="outline" data-space="15" data-cursor="pointer" data-ratio="1:1"><group data-index="1" data-justify="center" data-align="center" data-gap="20" data-direction="column" > <icon data-icon-size="mini" data-icon-weight="100">nest_eco_leaf </icon> <text data-light="">Leaf - 100</text> </group></group>
                  <group data-radius="10" data-name="icon-demo" data-contain="" data-interactive="" data-background="main-background" data-border="outline" data-space="15" data-cursor="pointer" data-ratio="1:1"><group data-index="1" data-justify="center" data-align="center" data-gap="20" data-direction="column" > <icon data-icon-size="mini" data-icon-weight="200">nest_eco_leaf </icon> <text data-light="">Leaf - 200</text> </group></group>
                  <group data-radius="10" data-name="icon-demo" data-contain="" data-interactive="" data-background="main-background" data-border="outline" data-space="15" data-cursor="pointer" data-ratio="1:1"><group data-index="1" data-justify="center" data-align="center" data-gap="20" data-direction="column" > <icon data-icon-size="mini" data-icon-weight="300">nest_eco_leaf </icon> <text data-light="">Leaf - 300</text> </group></group>
                  <group data-radius="10" data-name="icon-demo" data-contain="" data-interactive="" data-background="main-background" data-border="outline" data-space="15" data-cursor="pointer" data-ratio="1:1"><group data-index="1" data-justify="center" data-align="center" data-gap="20" data-direction="column" > <icon data-icon-size="mini" data-icon-weight="">   nest_eco_leaf </icon> <text data-light="">Leaf - 400</text> </group></group>
                  <group data-radius="10" data-name="icon-demo" data-contain="" data-interactive="" data-background="main-background" data-border="outline" data-space="15" data-cursor="pointer" data-ratio="1:1"><group data-index="1" data-justify="center" data-align="center" data-gap="20" data-direction="column" > <icon data-icon-size="mini" data-icon-weight="500">nest_eco_leaf </icon> <text data-light="">Leaf - 500</text> </group></group>
                  <group data-radius="10" data-name="icon-demo" data-contain="" data-interactive="" data-background="main-background" data-border="outline" data-space="15" data-cursor="pointer" data-ratio="1:1"><group data-index="1" data-justify="center" data-align="center" data-gap="20" data-direction="column" > <icon data-icon-size="mini" data-icon-weight="600">nest_eco_leaf </icon> <text data-light="">Leaf - 600</text> </group></group>
                  <group data-radius="10" data-name="icon-demo" data-contain="" data-interactive="" data-background="main-background" data-border="outline" data-space="15" data-cursor="pointer" data-ratio="1:1"><group data-index="1" data-justify="center" data-align="center" data-gap="20" data-direction="column" > <icon data-icon-size="mini" data-icon-weight="700">nest_eco_leaf </icon> <text data-light="">Leaf - 700</text> </group></group>
                </group> 
              </group>
            </grid>
          </group>


        </view>
      </view>
    </view>
  );
};
export default Icons;
