import React from "react";
import { Navigation } from "../components/navigation";


const HorizontalNav: React.FC = () => {


  return (
    
<>
{/* <group data-height="90" data-background="main-background-top" data-position="absolute" data-index="3" data-disabled="true">

</group> */}

    <group
    data-adaptive="mobile"
    data-adaptive-order="2"
    data-index="3"
    data-border="overprint"
    data-background="main-background"
    data-print="hide"
  >
    <group
      data-wrap="no"
      data-gap="10"
      data-space="10"
      data-space-bottom="10-sab"
      data-justify="adaptive-space-around"
    >
      
      <Navigation />
    </group>
  </group>

</>
  );
};
export default HorizontalNav;
