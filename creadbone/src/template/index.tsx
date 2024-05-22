import React from 'react';


import { Routes, Route, Link, Outlet, Navigate } from 'react-router-dom';


import Tabstrip from './../components/tabstrip';
import Tab from './../components/tabstrip/tab';
import Colors from './../template/Colors';
import Layout from './../template/layout';
import Switchable from './../components/Switchable';
import ThemePicker from './../template/themePicker';
import Icons from './../template/icons';
import "./../styles/demo.css";

import Buttons from './buttons';
import Typeface from './typeface';
import Landing from './nav';
import Scroll from '../components/scroll';
import SubNavigation from '../components/subnav';


const Template: React.FC = () => {
  return (
    <view data-scroll="" data-adaptive="" data-border="no" >




      <view data-vertical data-index="2">
        <Switchable
          data-switch-size="60"
          defaultExpanded={false}
          icon="invert_colors"
          data-type="overlap"
          data-length="60"

          data-timing="fancy"
          data-duration=".225"


          togglerProps={{
            "data-adaptive": "mobile",
            "data-order": "2",
            "data-justify": "center",
            // "data-background": "main",
            // "data-color": "white",
          }}
        >
          <view
            data-border=""
            data-background="main-background"
            data-length="60"
          >

<group data-width="auto" data-snap-button="15" data-height="fit" data-contain="">
      <Scroll vertical>
        
      <ThemePicker />
        </Scroll>
        </group>

          </view>
        </Switchable>

        <view>

          <group>
            <SubNavigation />
          </group>

          <Routes>
            <Route path="/" element={<Navigate replace to="Icons" />} />
            <Route path="Typeface" element={<Typeface />} />
            <Route path="Icons" element={<Icons />} />
            <Route path="Buttons" element={<Buttons />} />
            <Route path="Colors" element={<Colors />} />
            <Route path="Layout" element={<Layout />} />
            <Route path="Navigation" element={<Landing />} />
      </Routes>

          {/* <space data-height="10"></space>
          <Tabstrip
           separator={false}
          // classic={false}
          // invert={false}
          // modern={true}
        //  selectedIndex={3}
          >
          <Tab title="Typeface">
              <Typeface />
            </Tab>
            <Tab title="Icons">
              <Icons />
            </Tab>
            <Tab title="Button">
              <Buttons />
            </Tab>
            <Tab title="Color System" >
              <Colors />
            </Tab>
            <Tab title="Layout">
              <Layout />
            </Tab>
            <Tab title="Navigation">
              <Landing />
            </Tab>
          </Tabstrip> */}
        </view>

        
      </view>
    </view>
  );
}

export default Template;