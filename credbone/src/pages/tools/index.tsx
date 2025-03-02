import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import DotIconMaker from "./DotIconMaker";
import Tools from "./tools";

function ToolsCollection() {
  return (
    <group data-space="30" data-gap="30" data-wrap="no" data-direction="column" data-scroll="">
      <group data-border="" data-space="20" data-gap="10" data-radius="20" data-sticky="top" data-background="main-background">
        <Link to="./">
          <group data-space="15" data-radius="10" data-width="auto" data-background="adaptive-gray">
            <text>Tools</text>
          </group>
        </Link>

        <Link to="DotIconMaker">
          <group data-space="15" data-radius="10" data-width="auto" data-background="adaptive-gray">
            <text>Dot Icon Maker</text>
          </group>
        </Link>
      </group>

      <Routes>
        <Route path="/*" element={<Navigate replace to="./" />} />
        <Route path="DotIconMaker" element={<DotIconMaker />} />
      </Routes>
    </group>
  );
}

export default ToolsCollection;
