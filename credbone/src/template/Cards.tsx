import React from "react";

const Cards: React.FC = () => {
  return (
    <view data-space="30" data-gap="30" data-scroll="">
      <group data-direction="column" data-gap="10">
        <text
          data-weight="700"
          data-text-size="xxx-large"
          data-wrap="wrap"
          data-color="main"
        >
          Cards
        </text>
        <text data-wrap="wrap" data-length="400" data-line="1.5" data-light="">
          A card is an excellent tool for displaying content and actions related
          to a single subject, offering a cohesive presentation of multiple
          elements that vary in type and size.
        </text>
      </group>


<group data-type="grid" data-grid-template="240">


<group data-space="20" data-gap="20" data-radius="20" data-direction="column" data-border="" >
<group data-ratio="1:1" data-border="" data-radius="10" >

</group>


<group data-gap="5" data-direction="column" >
<text data-weight="700">Title</text>
<text data-opacity="60" data-wrap="wrap">Sample Description Goes Here</text>
</group>


</group>

</group>

    </view>
  );
};
export default Cards;
