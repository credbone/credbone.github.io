import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import DotIconMaker from "./DotIconMaker";


function ToolsCollection() {
  return (
    <group
      data-wrap="no"
      data-direction="column"
      data-scroll=""
      data-index="1"
         data-space="adaptive-30-50"
     data-gap="30"
    >
      <group data-sticky="top">
        <group
          data-border=""
          data-space="5"
          data-gap="5"
          data-radius="15"
          data-background="main-background"
          data-width="auto"
        >
          <Link to="./">
            <group
              data-space="15"
              data-radius="10"
              data-width="auto"
            //  data-background="adaptive-gray"
              data-interactive=""
            >
              <text>Tools</text>
            </group>
          </Link>

          <Link to="DotIconMaker">
            <group
              data-space="15"
              data-radius="10"
              data-width="auto"
                data-interactive=""
              data-background="adaptive-gray"
            >
              <text>Dot Icon Maker</text>
            </group>
          </Link>
        </group>
      </group>

      <Routes>
        <Route path="/*" element={<Navigate replace to="./" />} />
        <Route path="DotIconMaker" element={<DotIconMaker />} />
      </Routes>

      <group data-height="300" data-shrink="no"></group>
    </group>
  );
}

export default ToolsCollection;
