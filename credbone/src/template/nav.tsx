import React, { useState } from "react";






import Ripple from "../components/Ripple";
import sampleImage from "../styles/images/samples/res_40.jpg";
import SideNav from "./sideNav";
import Marquee from "../components/Marquee";
import Scroll from "../components/scroll";
import Button from "../components/button";
import { SvgHamburger } from "../components/svg";
import Tabstrip from "../components/tabstrip";
import Tab from "../components/tabstrip/tab";


// Demo Data

const tabsData = [
  {kay: "1", title: 'Home', index: 1, },
  {kay: "2", title: 'Orders', index: 2, },
  {kay: "3", title: 'Account', index: 3, },
]

// Demo Data

const navData = [
  { key: 1,  badge: true, icon: 'shopping_basket', title: 'Shopping Cart' },
  { key: 2,  badge: "", icon: 'local_cafe', title: 'Beverage Deals' },
  { key: 3,  badge: "", icon: 'laundry', title: 'Laundry Service' },
  { key: 4,  badge: "", icon: 'local_pizza', title: 'Pizza Orders' },
  { key: 6,  badge: "", icon: 'cloud', title: 'Cloud Storage' },
  { key: 12, badge: "", icon: 'spa', title: 'Spa Services' },
  { key: 14, badge: "", icon: 'local_mall', title: 'Mall Directory' },
  { key: 16, badge: "", icon: 'school', title: 'Education Courses' }
];





const Landing: React.FC = () => {

  const [selectedItemKey, setSelectedItemKey] = useState<number | null>(2);
  const [selectedItem2Key, setSelectedItem2Key] = useState<number | null>(3);
  const [selectedItem3Key, setSelectedItem3Key] = useState<number | null>(3);

  const handleItemClick = (key: number) => {setSelectedItemKey(key);};
  const handleItem2Click = (key: number) => {setSelectedItem2Key(key);};
  const handleItem3Click = (key: number) => {setSelectedItem3Key(key);};

  return (

    <view data-vertical="">
        <view data-vertical="" data-adaptive="" data-border="no">


<view data-vertical="" data-scroll="">

  


  <view data-scroll data-border="no">
  <group data-direction="column" data-gap="15" data-space-vertical="30" >
              <Marquee>
              <text data-space-horizontal="30" data-weight="700" data-text-size="xxx-large" data-wrap="wrap" data-color="main" > Navigation </text>
</Marquee>
    <text data-space-horizontal="30" data-wrap="wrap" data-length="400" data-line="1.5" data-light="" >Navigation bars allow movement between primary destinations in an app.</text>
  </group>


            <group data-space="30" data-gap="20">
            <group data-space="10" data-elevation="1" data-radius="15" data-background="context">


<group data-type="grid" data-weight="600" data-grid-template="120" data-gap="5" >




{navData.map((item) => (
 <Ripple>
 <group

  key={item.key}
  onClick={() => handleItemClick(item.key)} 
  data-background={item.key === selectedItemKey ? 'main' : ''}
  data-color={item.key === selectedItemKey ? 'main-text' : ''}
  data-ink-color={item.key === selectedItemKey ? 'main-dark' : ''}

   data-contain=""
    data-radius="10"
     data-interactive="" 
     data-cursor="pointer"
     
     >
   <group data-direction="column" data-align="center" data-space="10" data-gap="5">

   {item.badge ? (
      <group data-background={item.key === selectedItemKey ? 'main-text' : 'red'} data-space="5" data-position="absolute" data-width="auto" data-radius="5" data-right="10" data-top="10"></group>
    ) : null}

     <icon>{item.icon}</icon>
     <text data-ellipsis="">{item.title}</text>
   </group>
 </group>
</Ripple>
      ))}

</group>


              </group>
              
              <separator data-horizontal="" data-interval='10'></separator>

<group >
<group>

<group data-gap="5">



{navData.map((item2) => (   


<Ripple>
  <group 
  

  key={item2.key}
  onClick={() => handleItem2Click(item2.key)} 

  data-background={item2.key === selectedItem2Key ? 'main' : ''}
  data-color={item2.key === selectedItem2Key ? 'main-text' : ''}
  data-ink-color={item2.key === selectedItem2Key ? 'main-dark' : ''}
  
  
  data-contain=""
   data-interactive=""
    data-border="outline"
     data-radius="30" 
     data-width="auto"
      data-wrap="no"
       data-cursor="pointer"
        data-align="center"
data-space="5" 
data-space-horizontal="10" 
data-gap="5" > 
    <icon  data-fill={item2.key === selectedItem2Key ? 'fill' : ''}>{item2.icon}</icon>
     <text data-weight="600">{item2.title}</text> 

     {item2.badge ? (
<>
      <group data-space="5"><dot></dot></group>
      <group data-ratio="1:1" data-justify="center" data-align="center" data-length="25"
       data-background={item2.key === selectedItem2Key ? 'main-text' : 'red'} 
        data-color={item2.key === selectedItem2Key ? 'main' : 'white'} 
        data-radius="20"><text data-weight="700">2</text></group>
</>

    ) : null}

    </group>
    </Ripple>

 ))}




</group> 

</group>
</group>
<separator data-horizontal=""data-interval='10'></separator>

<group data-space="20" data-gap="20"  data-elevation="1" data-radius="15" data-background="main" >
<group data-direction="column"  data-width="auto" data-color="main-text">
<text data-weight="700" data-text-size="x-large" data-wrap="wrap" > Sample Navigation </text>
<text data-wrap="wrap" data-length="300" data-line="1.5" data-light="" >Left Aligned Navigation with Fixed Home Button </text>
</group>
<group

data-width="auto"
data-radius="10"
data-contain=""
data-background="main-background"
data-wrap="no"
data-weight="600"

>



<Scroll  >
<group data-wrap="no" data-space="5">



{navData.map((item3) => (  


<group 

key={item3.key}
onClick={() => handleItem3Click(item3.key)} 

data-height="40"

data-contain="" data-shrink="no" data-name="autoseparation" data-wrap="no" data-align="center"  data-width="auto">
  <separator data-vertical="" data-height="20"></separator>
  <Ripple><group 
  

  data-background={item3.key === selectedItem3Key ? 'main' : ''}
data-color={item3.key === selectedItem3Key ? 'main-text' : ''}
data-ink-color={item3.key === selectedItem3Key ? 'main-dark' : ''}
  
  
  data-height="fit" data-width="auto" data-interactive="" data-cursor="pointer" data-align="center"  data-space-horizontal="10" data-gap="10" data-wrap="no" data-radius="5" data-contain="" > 
    {/* <icon data-fill={item3.key === selectedItem3Key ? 'fill' : ''}>{item3.icon}</icon> */}
  <text>{item3.title}</text>
  {item3.badge ? (
      <group
       data-ratio="1:1" 
       data-justify="center"
        data-align="center"
         data-length="25"
          data-background={item3.key === selectedItem3Key ? 'main-text' : 'red'} 
           data-color={item3.key === selectedItem3Key ? 'main' : 'white'} 
           data-radius="20"><text data-weight="700">3</text></group>
    ) : null}
   </group>
   </Ripple>
 </group>


   ))}


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
        <group  data-wrap="no" data-width="auto"><separator data-vertical="" data-height="fit"></separator><Ripple><group data-cursor="pointer" data-space="10" data-space-horizontal="15" data-gap="10" data-wrap="no" data-align="center" data-interactive=""> <icon data-fill="fill">person</icon><text data-adaptive="desktop"> Welcome Username </text> </group></Ripple></group>
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
        <ul data-weight="600">
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

        
          
  <group data-shrink="no" data-background="main"  data-contain=""  >

    <group data-space="30">

            <group>
        <Scroll className="nav_strip classic transparent">

                  <ul data-weight="600" data-color="main-text">
                    <li > <group data-type="group" data-align="center" data-space="10" data-gap="10" data-wrap="no" > <icon data-fill="fill">Home</icon> </group> </li>
                    <li className="selected"> <separator data-vertical="" data-height="20"></separator> <group data-align="center" data-space="10" data-gap="10" data-wrap="no" > <text>About</text> </group> </li>
                    <li > <separator data-vertical="" data-height="20"></separator> <group data-align="center" data-space="10" data-gap="10" data-wrap="no" > <text>Settings</text> </group> </li>
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
                  <ul data-weight="600" data-color="main-text">
                    <li  > <group data-type="group" data-align="center" data-space="10" data-gap="10" data-wrap="no" > <text>Home</text> </group> </li>
                    <li className="selected"> <separator data-vertical="" data-height="20"></separator> <group data-align="center" data-space="10" data-gap="10" data-wrap="no" ><text>History</text> </group> </li>
                    <li  > <separator data-vertical="" data-height="20"></separator> <group data-align="center" data-space="10" data-gap="10" data-wrap="no" ><text>Orders</text></group></li>
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




  <group data-height="70"></group>

</view>



        
</view>
      
<SideNav></SideNav>
        


    </view>
  );
};
export default Landing;
