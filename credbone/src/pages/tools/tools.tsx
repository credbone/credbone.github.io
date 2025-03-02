import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";

function Tools() {
  return (
    <group data-space="30" data-gap="30" data-wrap="no" data-direction="column">
      <group data-type="grid">
        <Link data-type="group" data-radius="30" data-space="30"  data-background="adaptive-gray" to="DotIconMaker">
          <group data-width="auto" data-height="120">
            <text>Dot Icon Maker</text>
          </group>
        </Link>
      </group>


    </group>
  );
}

export default Tools;
