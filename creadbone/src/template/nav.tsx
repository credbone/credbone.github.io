import React from "react";






import Ripple from "../components/Ripple";
import sampleImage from "../styles/images/samples/res_15.jpg";
import SideNav from "./sideNav";
import Marquee from "../components/Marquee";
import Scroll from "../components/scroll";
import Button from "../components/button";
import { SvgHamburger } from "../components/svg";
import Tabstrip from "../components/tabstrip";
import Tab from "../components/tabstrip/tab";


const tabsData = [
  {
    title: 'Home',
    index: 1,
  },
  {
    title: 'Orders',
    index: 2,
  },
  {
    title: 'Account',
    index: 3,
  },
];

const Landing: React.FC = () => {
  return (

    <>
        <view data-vertical="" data-adaptive="" data-border="no">


<view data-vertical="" data-scroll="">

  


  <view data-scroll data-border="no">
  <group data-direction="column" data-gap="15" data-space-vertical="30" >
              <Marquee>
              <text data-space-horizontal="30" data-weight="700" data-text-size="xxx-large" data-wrap="wrap" data-color="main" > Navigation </text>
</Marquee>
    <text data-space-horizontal="30" data-wrap="wrap" data-length="300" data-line="1.5" data-light="" >Navigation bars allow movement between primary destinations in an app.</text>
  </group>


            <group data-space="30" data-gap="20">
            <group data-space="10" data-elevation="1" data-radius="15" data-background="context">


<group data-type="grid" data-weight="600" data-grid-template="120" data-gap="5" >
  <Ripple><group data-contain="" data-radius="10" data-interactive="" data-cursor="pointer" data-background="main-lighter"   data-color="main"> <group data-direction="column" data-align="center" data-space="10" data-gap="5"> <icon>shopping_basket</icon> <text data-ellipsis="">Shopping Cart</text> </group> </group></Ripple>
  <Ripple><group data-contain="" data-radius="10" data-interactive="" data-cursor="pointer"> <group data-direction="column" data-align="center" data-space="10" data-gap="5"> <icon>local_cafe</icon> <text data-ellipsis="">Warranty</text> </group> </group></Ripple>
  <Ripple><group data-contain="" data-radius="10" data-interactive="" data-cursor="pointer"> <group data-direction="column" data-align="center" data-space="10" data-gap="5"> <icon>laundry</icon> <text data-ellipsis=""> History</text> </group> </group></Ripple>
  <Ripple><group data-contain="" data-radius="10" data-interactive="" data-cursor="pointer"> <group data-direction="column" data-align="center" data-space="10" data-gap="5"> <icon>local_pizza</icon> <text data-ellipsis="">Warranty</text> </group> </group></Ripple>
  <Ripple><group data-contain="" data-radius="10" data-interactive="" data-cursor="pointer" data-ink-color="main-dark" data-background="main"  data-color="main-text"> <group data-index="1" data-direction="column" data-align="center" data-space="10" data-gap="5"> <icon>Inventory_2</icon> <text data-ellipsis="">Order History</text> </group> </group></Ripple>
  <Ripple><group data-contain="" data-radius="10" data-interactive="" data-cursor="pointer"> <group data-direction="column" data-align="center" data-space="10" data-gap="5"> <icon>cloud</icon> <text data-ellipsis="">Order History</text> </group> </group></Ripple>
</group>


              </group>
              
              <separator data-horizontal=""></separator>

<group >
<group>

<group data-gap="5">
<Ripple><group data-contain="" data-interactive="" data-border="outline" data-radius="30" data-width="auto" data-wrap="no" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="10" data-gap="5" data-background="main" data-color="main-text"> <icon>home</icon> <text>Home</text> </group></Ripple>
<Ripple><group data-contain="" data-interactive="" data-border="outline" data-radius="30" data-width="auto" data-wrap="no" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="10" data-gap="5" data-background="secondary" data-color="secondary-text" > <icon>pet_supplies</icon> <text>Warranty</text> </group></Ripple>
<Ripple><group data-contain="" data-interactive="" data-border="outline" data-radius="30" data-width="auto" data-wrap="no" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="10" data-gap="5" > <icon>drafts</icon> <text> History</text><dot></dot>  <group   data-length="25" data-ratio="1:1" data-radius="20" data-color="white" data-justify="center" data-align="center" data-background="red"><text data-weight="700">3</text> </group> </group></Ripple>
<Ripple><group data-contain="" data-interactive="" data-border="outline" data-radius="30" data-width="auto" data-wrap="no" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="10" data-gap="5" > <icon>chair</icon> <text>Warranty</text> </group></Ripple>
<Ripple><group data-contain="" data-interactive="" data-border="outline" data-radius="30" data-width="auto" data-wrap="no" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="10" data-gap="5" > <icon>nest_eco_leaf</icon> <text>Directon</text> </group></Ripple>
<Ripple><group data-contain="" data-interactive="" data-border="outline" data-radius="30" data-width="auto" data-wrap="no" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="10" data-gap="5" > <icon>leaderboard</icon> <text>Order History</text> </group></Ripple>
<Ripple><group data-contain="" data-interactive="" data-border="outline" data-radius="30" data-width="auto" data-wrap="no" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="10" data-gap="5" > <icon>work</icon> <text>Directon</text> </group></Ripple>
</group> 

</group>
</group>
<separator data-horizontal=""></separator>

<group data-space="20" data-gap="20"  data-elevation="1" data-radius="15" data-background="main" >
<group data-direction="column"  data-width="auto" data-color="main-text">
<text data-weight="700" data-text-size="x-large" data-wrap="wrap" > Sample Navigation </text>
<text data-wrap="wrap" data-length="300" data-line="1.5" data-light="" >Left Aligned Navigation with Fixed Home Button </text>
</group>
<group
data-border=""
data-width="auto"
data-radius="10"
data-contain=""
data-background="main-background"
data-wrap="no"
data-weight="600"

>



<Scroll  >
<group data-wrap="no" data-space="5">
   <group data-contain="" data-shrink="no" data-name="autoseparation" data-wrap="no" data-align="center"  data-width="auto"><separator data-vertical="" data-height="20"></separator><Ripple><group data-height="fit" data-width="auto" data-interactive="" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="15" data-gap="5" data-wrap="no" data-radius="5" data-contain="" data-background="main" data-color="main-text" > <icon>home</icon> <text> Home</text> </group></Ripple></group>
   <group  data-contain="" data-shrink="no" data-name="autoseparation" data-wrap="no" data-align="center"  data-width="auto"><separator data-vertical="" data-height="20"></separator><Ripple><group data-height="fit" data-width="auto" data-interactive="" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="15" data-gap="10" data-wrap="no" data-radius="5" data-contain="" > <icon data-fill="" data-color="amber">mail</icon> <text> History</text><dot></dot>  <group   data-length="25" data-ratio="1:1" data-radius="20" data-color="white" data-justify="center" data-align="center" data-background="red"><text data-weight="700">3</text> </group> </group></Ripple></group>
   <group data-contain="" data-shrink="no" data-name="autoseparation" data-wrap="no" data-align="center"  data-width="auto"><separator data-vertical="" data-height="20"></separator><Ripple><group data-height="fit" data-width="auto" data-interactive="" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="15" data-gap="5" data-wrap="no" data-radius="5" data-contain="" > <text>Warranty</text> </group></Ripple></group>
   <group data-contain="" data-shrink="no" data-name="autoseparation" data-wrap="no" data-align="center"  data-width="auto"><separator data-vertical="" data-height="20"></separator><Ripple><group data-height="fit" data-width="auto" data-interactive="" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="15" data-gap="5" data-wrap="no" data-radius="5" data-contain="" > <text>Directon</text> </group></Ripple></group>
   <group data-contain="" data-shrink="no" data-name="autoseparation" data-wrap="no" data-align="center"  data-width="auto"><separator data-vertical="" data-height="20"></separator><Ripple><group data-height="fit" data-width="auto" data-interactive="" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="15" data-gap="5" data-wrap="no" data-radius="5" data-contain="" > <text>Order History</text> </group></Ripple></group>
   <group data-contain="" data-shrink="no" data-name="autoseparation" data-wrap="no" data-align="center"  data-width="auto"><separator data-vertical="" data-height="20"></separator><Ripple><group data-height="fit" data-width="auto" data-interactive="" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="15" data-gap="5" data-wrap="no" data-radius="5" data-contain="" > <text>Directon</text> </group></Ripple></group>
   <group data-contain="" data-shrink="no" data-name="autoseparation" data-wrap="no" data-align="center"  data-width="auto"><separator data-vertical="" data-height="20"></separator><Ripple><group data-height="fit" data-width="auto" data-interactive="" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="15" data-gap="5" data-wrap="no" data-radius="5" data-contain="" > <text>Sample</text> </group></Ripple></group>
   <group data-contain="" data-shrink="no" data-name="autoseparation" data-wrap="no" data-align="center"  data-width="auto"><separator data-vertical="" data-height="20"></separator><Ripple><group data-height="fit" data-width="auto" data-interactive="" data-cursor="pointer" data-align="center" data-space="5" data-space-horizontal="15" data-gap="5" data-wrap="no" data-radius="5" data-contain="" > <text>Account</text> </group></Ripple></group>
</group>
</Scroll>

</group>
</group>

<group data-space="20" data-elevation="1" data-radius="15" data-background="main-background" data-dark="" data-gap="20" >
<group data-direction="column"  data-width="auto">
<text data-weight="700" data-text-size="x-large" data-wrap="wrap" > Sample Navigation </text>
<text data-wrap="wrap" data-length="300" data-line="1.5" data-light="" >Right Aligned Navigation with Fixed Menu Button </text>
</group>
<group data-background="context"  data-radius="5" data-contain=""  data-border="outline">
  <group data-position="right" >
    <nav
  data-type="group"
  data-wrap="no"
  data-justify="end"
     
    >
       
  
  <group data-width="auto"  data-contain="">
  <Scroll>
      <group data-wrap="no">
        <group data-align="center" data-space="15"><text data-light="" data-ellipsis=""> Sample Tip Message ...</text></group>
        <group data-background="secondary" data-color="secondary-text" data-wrap="no" data-width="auto"><separator data-vertical="" data-height="fit"></separator><Ripple><group data-cursor="pointer" data-space="10" data-space-horizontal="15" data-gap="5" data-wrap="no" data-align="center" data-interactive=""><text data-adaptive="desktop">New</text><icon data-fill="" data-adaptive="mobile">star</icon> </group></Ripple></group>
        <group  data-wrap="no" data-width="auto"><separator data-vertical="" data-height="fit"></separator><Ripple><group data-cursor="pointer" data-space="10" data-space-horizontal="15" data-gap="5" data-wrap="no" data-align="center" data-interactive=""> <text>Warranty History</text> </group></Ripple></group>
        <group  data-wrap="no" data-width="auto"><separator data-vertical="" data-height="fit"></separator><Ripple><group data-cursor="pointer" data-space="10" data-space-horizontal="15" data-gap="10" data-wrap="no" data-align="center" data-interactive=""> <icon data-fill="">shopping_basket</icon>  <text data-adaptive="desktop">Cart</text><dot></dot><group   data-length="25" data-ratio="1:1" data-radius="20" data-color="secondary-text" data-justify="center" data-align="center" data-background="secondary"><text data-weight="700">5</text> </group> </group></Ripple></group>    
        <group  data-wrap="no" data-width="auto"><separator data-vertical="" data-height="fit"></separator><Ripple><group data-cursor="pointer" data-space="10" data-space-horizontal="15" data-gap="10" data-wrap="no" data-align="center" data-interactive=""> <icon data-fill="">person_4</icon><text data-adaptive="desktop"> Welcome Username </text> </group></Ripple></group>
  </group>
</Scroll>
</group>

  <group data-wrap="no" data-length="50"> <separator data-vertical="" data-height="fit"></separator><Button className="primary extra" toggleClassName="open"  > <icon> <SvgHamburger /> </icon> </Button> </group>

    </nav>
  </group>


</group>
</group>
            </group>

</view>


</view>



<view data-scroll="" data-size="large" data-gap="20"  >

  <group   data-space="30" >
    <group>
      <nav className="nav_strip classic invert">
        <ul>
          <li > <group data-type="group" data-align="center" data-space="10" data-gap="10" data-wrap="no" > <icon>drafts</icon> </group> </li>
          <li  className="selected"> <separator data-vertical="" data-height="20"></separator> <group data-align="center" data-space="10" data-gap="10" data-wrap="no" > <icon>search</icon> </group> </li>
          <li > <separator data-vertical="" data-height="20"></separator> <group data-align="center" data-space="10" data-gap="5" data-wrap="no" ><text>Products</text> </group> </li>
          <li > <separator data-vertical="" data-height="20"></separator> <group data-align="center" data-space="10" data-gap="5" data-wrap="no" > <text>Warranty</text> </group> </li>
        </ul>
      </nav>
    </group>

    <group
      data-space="10"
      data-background=""
      data-gap="10"
      data-direction="column"
      data-radius-bottom="10"
      data-elevation="1"
    >
      <div className="field" data-length="auto">
        <div className="form_fields">
          <div className="field_cont">
            <input
              type="text"
              placeholder="Family, a product, a reference"
            />
            <div className="button mini large">
              <icon>search</icon>
            </div>
          </div>
        </div>
      </div>
    </group>
  </group>

        
          
  <group data-shrink="no" data-background="secondary-dark"  data-contain="" >
  <picture data-position="absolute" data-opacity="60" data-name="color-demo">
        <img src={sampleImage} alt="" />
      </picture>
    <group data-space="30">

            <group>
        <Scroll className="nav_strip classic transparent">

                  <ul>
                    <li> <group data-type="group" data-align="center" data-space="10" data-gap="10" data-wrap="no" > <icon data-fill="">Home</icon> </group> </li>
                    <li className="selected"> <separator data-vertical="" data-height="20"></separator> <group data-align="center" data-space="10" data-gap="10" data-wrap="no" > <text>About</text> </group> </li>
                    <li> <separator data-vertical="" data-height="20"></separator> <group data-align="center" data-space="10" data-gap="10" data-wrap="no" > <text>Settings</text> </group> </li>
                  </ul>

              </Scroll>
            </group>


            <group
              data-space="30"
              data-background="main-background"
              data-gap="10"
              data-direction="column"
              data-radius="5"
            >
              
              <text data-weight="700" data-text-size="x-large" data-wrap="wrap" > Tabbed Invert Navigation </text>
              <text data-wrap="wrap" data-length="610" data-line="1.5" data-light="">
                Aenean tempus at nisl et tempor. Morbi et tincidunt justo.
                Curabitur luctus condimentum justo, sit amet suscipit justo
                laoreet ut. Curabitur ac ornare dolor.
              </text>
            </group>

            <group>
              <nav className="nav_strip classic bottom transparent">
                <Scroll>
                  <ul>
                    <li> <group data-type="group" data-align="center" data-space="10" data-gap="10" data-wrap="no" > <text>Home</text> </group> </li>
                    <li className="selected"> <separator data-vertical="" data-height="20"></separator> <group data-align="center" data-space="10" data-gap="10" data-wrap="no" ><text>History</text> </group> </li>
                    <li> <separator data-vertical="" data-height="20"></separator> <group data-align="center" data-space="10" data-gap="10" data-wrap="no" ><text>Orders</text></group></li>
                  </ul>
                </Scroll>
              </nav>
            </group>
    </group>
    
  </group>

  <group  data-space="30">




<group>




<Tabstrip
           // separator={false}
           bottom
          // classic={false}
          // invert={false}
          // modern={true}
          selectedIndex={1}
          tabStripProps={{"data-contain":"visible"}}
          tabStripContentProps={{
            "data-space":"30",
            "data-background":"context",
            "data-elevation":"1",
            "data-radius-top":"10",

          }}
          >
           {tabsData.map((tab) => (
      <Tab key={tab.index} title={tab.title}>
        <group data-wrap="no" data-gap="30" data-align="center">
          <group data-width="auto">
            <text data-text-size="48" data-weight="700">{tab.index}</text>
          </group>
          <group data-direction="column" data-width="auto" data-contain="" >
            <text data-weight="700" data-text-size="x-large" data-ellipsis="">{tab.title}</text>
            <text data-ellipsis=""  data-line="1.5" data-light="">Bottom Aligned Navigation</text>
          </group>
        </group>
      </Tab>
    ))}

            </Tabstrip>
</group>


  </group>




  <group data-height="90"></group>

</view>



        
</view>
      
<SideNav></SideNav>
        


    </>
  );
};
export default Landing;
