import React from "react";

import Input, { Password } from "../components/inputs/input";
import Button from "../components/button";
import {
  IconHome,
  IconMore,
  IconSearch,
} from "../components/icon/credIcons";
import Ripple from "../components/Ripple";
import Tooltip from "../components/tooltip";
import { Key } from "lucide-react";
import TemplatePageHeader from "./TemplatePageHeader";


const InputsAndForms: React.FC = () => {



  return (
    <group data-space="30" data-gap="30" data-align="start">




      <TemplatePageHeader
        title="Input & Forms"
        description="Explore input fields and form-related UI elements in this demo,
          featuring validation, error handling, and responsive design."
        version="1.8.0"
        type="Component"
        descriptionProps={{"data-length":"500"}}
      />



      <group data-gap="30">
        <group
          data-space="adaptive-30-50"
          data-background="adaptive-gray"
          data-radius="30"
          data-width="auto"
          data-fit="1"
          data-min-length="300"
          data-gap="30"
          data-wrap="no"
          data-direction="column"
        >
          <text
            data-wrap="wrap"
            data-max-length="300"
            data-weight="600"
            data-line="1.5"
          >
            The demo is configured to display a label with a prefix icon, a
            sample action, and supportive text.
          </text>

          <separator data-horizontal=""></separator>

          <group data-direction="column" data-gap="10">
            <Input
              icon={<IconSearch size={20} />}
              size="large"
              type="text"
              label="Field Label"
              placeholder="Placeholder"
              dataLength="fit"
              button={
                <>
                  <group
                    data-radius-bottom-right="input"
                    data-radius-top-right="input"
                    data-shrink="no"
                    data-contain=""
                    data-height="fit"
                    data-width="auto"
                  >
                    <separator data-vertical="" data-height="fit"></separator>
                    <Ripple>
                      <group
                        data-width="auto"
                        data-space="10"
                        data-align="center"
                        data-height="fit"
                        data-cursor="pointer"
                        data-interactive=""
                      >
                        <text data-weight="600" data-line="1">
                          Action
                        </text>
                      </group>
                    </Ripple>
                  </group>
                </>
              }
            ></Input>
            <text data-opacity="50">Optional assistive text</text>
          </group>
        </group>

        <group
          data-min-length="300"
          data-fit="1"
          data-space="adaptive-30-50"
          data-background="adaptive-gray"
          data-radius="30"
          data-gap="30"
          data-width="auto"
          data-align="end"
        >
          <group data-direction="column" data-gap="10">
            <Input
              icon={<IconHome size={20} />}
              size="large"
              type="text"
              label="Field Label"
              placeholder="Placeholder"
              dataLength="fit"
              button={
                <>
                  <group
                    data-radius-bottom-right="input"
                    data-radius-top-right="input"
                    data-shrink="no"
                    data-contain=""
                    data-height="fit"
                    data-width="auto"
                  >
                    <group
                      data-width="auto"
                      data-space="10"
                      data-align="center"
                    >
                      <text data-line="1" data-opacity="30" data-ellipsis="">
                        Suffix
                      </text>
                    </group>
                    <separator data-vertical="" data-height="fit"></separator>

                    <Tooltip content="Action">
                      <group data-width="auto" data-height="fit">
                        <Ripple>
                          <group
                            data-width="auto"
                            data-space="10"
                            data-align="center"
                            data-height="fit"
                            data-cursor="pointer"
                            data-interactive=""
                            //  data-ink-color="main-deep"
                            // data-background="main"
                            // data-color="main-text"
                          >
                            <group>
                              <IconMore size={20} />
                            </group>
                          </group>
                        </Ripple>
                      </group>
                    </Tooltip>
                  </group>
                </>
              }
            ></Input>
            <text data-opacity="50">Optional assistive text</text>
          </group>
        </group>
      </group>



      <group data-column-gap="15" data-type="column" data-align="start">
        <group>
          <group
            //            data-background="main"
            data-contain=""
            data-min-length="240"
            // data-theme="dark"
            data-space="30"
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
              <text           data-font-type="hero"

          data-text-size="large">
                Password
                <br />
                Change
              </text>
              <text data-wrap="wrap" data-line="1.5" data-opacity="60">
                Your password is Case Sensitive. It should contain a minimum of
                8 characters and at least one each of Uppercase, Lowercase, and
                Special characters
              </text>
            </group>
          </group>
          <group
            data-radius="30"
            data-contain=""
            data-background="context"
            data-shrink="no"
            data-border=""
            data-index="2"
            data-space="30"
            data-gap="30"
          >
            <form data-type="group" data-gap="30">
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

              <group data-direction="column" data-gap="30">
                <Password
                  size="large"
                  icon={<Key size={20} />}
                  placeholder="Current Password"
                  dataLength="autofit"
                  name="password_1"
                  //  autocomplete="current-password"
                  autoComplete="off"
                />

                <separator data-horizontal="" ></separator>

<group data-gap="10"  data-direction="column" >
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
              </group>

             
              <separator data-horizontal="" data-interval="10"></separator>
            

              <group data-gap="10"  data-direction="column" >
                                <Button data-radius="30" large primary fit>
                  <text>Update Password</text>
                </Button>
                <Button data-radius="30" large highlight  >
                  <text>Cancel</text>
                </Button>

              </group>
            </form>
          </group>
        </group>

        <group data-radius="15" data-contain="" data-shrink="no">
          <group data-space="30">
            <group data-direction="column" data-align="start" data-gap="10">
              <text           data-font-type="hero"
          //    data-color="main"
          data-text-size="large" data-wrap="wrap">
                Customer Feedback
              </text>
              <text data-wrap="wrap" data-line="1.5" data-opacity="60">
                Share your thoughts to help us improve. Be as specific as
                possible to ensure we address your concerns effectively.
              </text>
            </group>
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
              data-min-height="120"
            ></Input>

            <group data-type="group">
              <Button
                data-radius="30"
                wide
                large
                primary
                text="Submit Feedback"
              ></Button>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
export default InputsAndForms;
