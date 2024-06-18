import React from "react";
import { IconSearch } from "../components/icon/credIcons";

function Search() {
  return (
    <view data-space="30" data-scroll="" data-border="no">
      <group data-gap="30" data-direction="column">
        <group
          data-direction="column"
          data-gap="10"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="125"
        >
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-opacity="20"
          >
            Search
          </text>
        </group>

        <group
          data-border=""
          data-space="15"
          data-radius="10"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="15"
        >
          <IconSearch size={20} />
        </group>
      </group>
    </view>
  );
}

export default Search;
