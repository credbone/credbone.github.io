import React from "react";
import { Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
import DotIconMaker from "./DotIconMaker";

import { links } from "./toolData";
import { Grip } from "lucide-react";
import Popover from "../../components/popover";
import BlobGenerator from "./BlobGenerator";


function ToolsCollection() {
  return (
    <group
      data-wrap="no"
      data-direction="column"
      data-scroll=""
      data-index="1"
      data-space="adaptive-30-50"
      data-gap="30"
      data-align="start"
      data-min-height="fit"
    >
      <group data-sticky="top" data-width="auto">
        <group
          data-border=""
          data-space="10"
          data-gap="10"
          data-radius="15"
          data-background="main-background"
          data-width="auto"
          data-align="center"
        >
          <Link
            data-type="group"
            data-space="15"
            data-radius="10"
            data-width="auto"
            //  data-background="adaptive-gray"
            data-interactive=""
            data-height="fit"
            data-align="center"
            to="./"
          >
            <text>Tools & Resources</text>
          </Link>
          <separator data-vertical=""></separator>
          <Popover
            data-radius="25"
            data-space="10"
            placement="bottom"
            data-elevation="2"
            content={(closePopover) => (
              <group
                onClick={closePopover}
                data-type="grid"
                data-grid-template="90"
                data-gap="10"
                data-length="320"
              >
                {links.map((link, index) => (
                  <NavLink
                    data-type="group"
                    data-space="15"
                    data-radius="15"
                    data-width="auto"
                    data-interactive=""
                   // data-background="adaptive-gray"
                    key={index}
                    to={link.url}
                    data-name="nav-item"
          
                    data-direction="column"
                    data-gap="10"
                  >
                    <group data-ratio="1:1" data-interact="">
                      {link.content}
                    </group>
                    <text data-wrap="wrap" data-text-align="center">{link.title}</text>
                  </NavLink>
                ))}
              </group>
            )}
          >
            <group
              data-interactive=""
              data-cursor="pointer"
              data-space="15"
              data-radius="10"
              data-width="auto"
            >
              <group data-interact="">
                <Grip size={20} />
              </group>
            </group>
          </Popover>
        </group>
      </group>

<group data-max-length="1200">
<Routes>
        <Route path="/*" element={<Navigate replace to="./" />} />
        <Route path="DotIconMaker" element={<DotIconMaker />} />
        <Route path="BlobGenerator" element={<BlobGenerator />} />
      </Routes>

</group>
      <group data-position="bottom" data-height="200" data-shrink="no"></group>

    </group>
  );
}

export default ToolsCollection;
