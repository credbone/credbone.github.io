import React from "react";

import Input, { Password } from "../components/inputs/input";
import Button from "../components/button";
import ImageColorPicker from "../components/ImageColorPicker";

const InputsAndForms: React.FC = () => {
  return (
    <group data-space="30" data-gap="30" data-align="start">
      <group data-direction="column" data-gap="10" data-align="start">
        <text
          data-weight="700"
          data-text-size="xxx-large"
          data-wrap="wrap"
          data-ellipsis=""
          data-color="main"

        >
          Input & Forms
        </text>
        <text data-wrap="wrap" data-length="500" data-line="1.5" data-light="">
          Explore input fields and form-related UI elements in this demo,
          featuring validation, error handling, and responsive design.
        </text>
      </group>

      <group data-column-gap="15" data-type="column" data-align="start">
        <group
          data-radius="20"
          data-contain=""
          data-background="context"
          data-shrink="no"
          data-elevation="2"
          data-index="2"
          data-space="30"
          data-gap="30"
        >
          <group
            //            data-background="main"
            data-contain=""
            data-min-length="240"
          // data-dark=""
          >

            <group
              //   data-radius="15"
             // data-space="30"
              data-direction="column"
              data-align="start"
              data-gap="10"
            //  data-color="main-text"
            >
              {/* <icon data-icon-size="x-large" data-icon-weight="700" data-cast-shadow="1">key</icon> */}
              <text
                data-weight="700"
                data-text-size="large"
                data-wrap="wrap"
              >
                Password<br />Change
              </text>
              <text data-wrap="wrap" data-line="1.5" data-opacity="40">
                Your password is Case Sensitive. It should contain a minimum of
                8 characters and at least one each of Uppercase, Lowercase, and
                Special characters
              </text>
            </group>
          </group>

          <form data-type="group" >
            <group data-hidden="">
              <Input
                type="text"
                size="large"
                // icon="key"
                placeholder="Usename"
                hidden={true}
                dataLength="autofit"
                name="username"
                autoComplete=""
              />
            </group>

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

              <separator data-horizontal="" data-interval="10"></separator>

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
            <separator data-horizontal="" data-interval="10"></separator>
            <space data-height="10"></space>

            <group data-gap="10" data-type="grid">
              <Button data-radius="5" large highlight data-shrink="no">
                <text>Cancel</text>
              </Button>
              <Button data-radius="5" large secondary fit>
                <text>Update Password</text>
              </Button>
            </group>
          </form>
        </group>

        <group
          data-radius="15"
          data-contain=""

          data-shrink="no"

        >
          <group data-space="30">
            <group data-direction="column" data-align="start" data-gap="10">
              <text data-weight="700" data-text-size="large" data-wrap="wrap">
                Customer Feedback
              </text>
              <text data-wrap="wrap" data-line="1.5" data-opacity="40">
                Share your thoughts to help us improve. Be as specific as possible to ensure we address your concerns effectively.
              </text>
            </group>
          </group>
          <group data-space-horizontal="30">
            <separator data-horizontal=""></separator>
          </group>
          <group data-space="30" data-gap="30" flex-direction="column">
            <Input
              size="large"
              type="text"
              label="Name"
              placeholder="Enter Your Full Name"
              dataLength="fit"
            ></Input>

            <Input
              size="large"
              type="text"
              label="E-Mail"
              dataLength="fit"
              placeholder="Enter Your Email Address"
            ></Input>

            <Input
              size="large"
              type="textarea"
              label="Message"
              dataLength="fit"
              placeholder="Write Your Message"
              data-height="100"
            ></Input>

            <group data-type="group">
              <Button data-radius="5" wide large primary text="Submit Feedback"></Button>
            </group>
          </group>
        </group>

        {/* <group    data-radius="15"
          data-contain=""
          data-background="context"
          data-shrink="no"
          data-elevation="1">
          <ImageColorPicker/>
        </group> */}

        {/* <group
          data-radius="15"
          data-contain=""
          data-background="context"
          data-shrink="no"
          data-elevation="1"
        >
          <group data-space="30">
            <group data-direction="column" data-align="start" data-gap="10">
              <text data-weight="700" data-text-size="large" data-wrap="wrap">
                Sample Form Layout
              </text>
            </group>
          </group>
          <group data-space-horizontal="30">
            <separator data-horizontal=""></separator>
          </group>
          <group data-space="30" data-gap="10" flex-direction="column">
            <Input
              icon="folder"
              labelPosition="left"
              size="large"
              type="text"
              placeholder="Upload"
              dataLength="fit"
              button={
                <>
                  <separator data-vertical="" data-height="input"></separator>
                  <Button large text="Browse"></Button>
                </>
              }
            />



            <Input
              icon="phone"
              labelPosition="left"
              size="large"
              type="text"
              placeholder="Phone"
              dataLength="fit"
              button={
                <>
                  <separator data-vertical="" data-height="input"></separator>
                  <Button large mini icon="dialpad"></Button>
                </>
              }
            />
          </group>
        </group> */}
      </group>
    </group>
  );
};
export default InputsAndForms;
