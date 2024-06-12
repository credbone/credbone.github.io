import React from "react";

import sampleImage from "../styles/images/samples/res_16.jpg";
import Input, { Password } from "../components/inputs/input";
import Button from "../components/button";

const InputsAndForms: React.FC = () => {
  return (
    <view
      data-vertical=""
      data-adaptive=""
      data-scroll=""
      data-gap="15"
      data-align="start"
      data-space="30"
    >
      <group>
        <group
          data-max-length="350"
          // data-border=""
          data-radius="15"
          data-contain=""
          data-background="context"
          data-shrink="no"
          data-elevation="1"
        >
          <group
            data-background="main"
            data-contain=""
            data-min-length="240"
            data-dark=""
          >
            {/* <picture data-position="absolute" data-name="color-demo">
            <img src={sampleImage} alt="" />
          </picture> */}
            <group
              //   data-radius="15"
              data-space="30"
              data-direction="column"
              data-align="start"
              data-gap="10"
              data-color="main-text"
            >
              <text data-weight="700" data-text-size="36" data-wrap="wrap">
                Password Change
              </text>
              <text data-wrap="wrap" data-line="1.5">
                Your password is Case Sensitive. It should contain a minimum of
                8 characters and at least one each of Uppercase, Lowercase, and
                Special characters
              </text>
            </group>
          </group>

          <group data-space="30">
            <group data-direction="column" data-gap="10">
              <Password
                size="large"
                icon="key"
                placeholder="Current Password"
                dataLength="autofit"
                name="password_1"
                //  autocomplete="current-password"
                autoComplete="off"
              />

              <separator data-horizontal="" data-interval='10'></separator>

              <Input
                type="password"
                size="large"
                // icon="key"
                placeholder="Create Password"
                dataLength="autofit"
                name="password_1"
                autoComplete="new-password"
              />
              <Input
                type="password"
                size="large"
                //    icon="key"
                placeholder="Repeat Password"
                dataLength="autofit"
                name="password_1"
                autoComplete="new-password"
              />
            </group>

            <space data-height="10"></space>
            <separator data-horizontal="" data-interval='10'></separator>
            <space data-height="10"></space>

            <group data-gap="10">
              <Button large highlight data-shrink="no">
                <text>Cancel</text>
              </Button>
              <Button large secondary fit>
                <text>Update Password</text>
              </Button>
            </group>
          </group>
        </group>

        <space data-height="90"></space>
      </group>
    </view>
  );
};
export default InputsAndForms;
