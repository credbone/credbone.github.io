import React from 'react';

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


function Template() {
  return (
    <view data-scroll="" data-adaptive=""  >




      <view data-vertical data-index="2">
        <Switchable
          data-switch-size="60"
          defaultExpanded={false}
          icon="palette"
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
            <ThemePicker />
          </view>
        </Switchable>

        <view>
          <space data-height="10"></space>
          <Tabstrip>
          <Tab title="Typeface">
              <Typeface />
            </Tab>
            <Tab title="Icons">
              <Icons />
            </Tab>
            <Tab title="Button">
              <Buttons />
            </Tab>
            <Tab title="Color">
              <Colors />
            </Tab>
            <Tab title="Layout">
              <Layout />
            </Tab>
            <Tab title="Navigation">
              <Landing />
            </Tab>


          </Tabstrip>
        </view>
      </view>
    </view>
  );
}

export default Template;