import React from "react";
import Scroll from "../components/scroll";

import sampleImage9 from "../styles/images/samples/res_42.jpg";


import { IconShare } from "../components/icon/credIcons";

const ContentSlide: React.FC = () => {
  return (
    <>
      <group
        data-scroll-mask="false"
        //data-scroll-type="snap"
        data-scroll-padding="20"
      >
        <Scroll>
          <group  data-wrap="no" data-max-length="auto">
            <group data-wrap="no"  data-space="15" data-gap="15" data-shrink="no" data-width="auto" data-max-length="auto">
              <group
                data-background="context"
                data-radius="10"
                data-space="30"
                data-min-length="240"
                data-length="240"
                data-min-height="240"
                data-contain=""
                data-direction="column"
                data-align="start"
                data-gap="20"
             //   data-theme="dark"
             data-border=""
              >
                <text
                  data-weight="800"
                  data-text-size="x-large"
                  data-wrap="wrap"
                >
                  Sample Content
                </text>
                <text data-wrap="wrap" data-line="1.5">
                  Nam maximus ante eu arcu mollis rhoncus. Nulla volutpat
                  fringilla ante. Mauris hendrerit tristique sagittis. Cras
                  egestas dapibus risus non aliquet.
                </text>
              </group>

              <group
                data-min-height="240"
                data-contain=""
                data-background="context"
                data-radius="10"
                data-space="20"
                data-min-length="240"
                data-length="240"
             //   data-theme="dark"
              data-border=""
              >
                <group data-position="center" data-width="auto">
                  <IconShare size={90} />
                </group>
              </group>

              <group
                data-radius="10"
                data-min-height="240"
                data-contain=""
                data-length="410"
                data-min-length="240"
 data-border=""
              >

                <group
                  data-radius="10"
                  data-space="30"
                  data-direction="column"
                  data-align="start"
                  data-gap="20"
                >
                  <text data-weight="700" data-text-size="display-md" data-wrap="wrap">
                   64
                  </text>
                  <text  data-weight="600" data-wrap="wrap" data-line="1.5">
                    Nam maximus ante eu arcu mollis rhoncus. Nulla volutpat
                    fringilla ante. Mauris hendrerit tristique sagittis. Cras
                    egestas dapibus risus non aliquet.
                  </text>
                </group>
              </group>

              <group
                data-border=""
                data-radius="10"
                data-space="30"
                data-min-length="240"
                data-length="240"
                data-min-height="240"
                data-contain=""
                data-direction="column"
                data-align="start"
                data-gap="20"
              >
                <text
                  data-weight="700"
                  data-text-size="x-large"
                  data-wrap="wrap"
                >
                  Sample Content
                </text>
                <text data-wrap="wrap" data-line="1.5">
                  Nam maximus ante eu arcu mollis rhoncus. Nulla volutpat
                  fringilla ante. Mauris hendrerit tristique sagittis. Cras
                  egestas dapibus risus non aliquet.
                </text>
              </group>

              <group
                data-min-height="240"
                data-contain=""
                data-background="main"
                data-color="main-text"
                data-radius="10"
                data-min-length="240"
                data-length="240"
              >
                {/* <video
              
                data-position="absolute"
                src={sampleImage14}
                autoPlay
                muted
                loop
                playsInline
                data-object-fit="cover"
                data-height="fit"
                data-max-length="fit"
              ></video> */}

                <group
                  data-radius="10"
                  data-space="30"
                  data-min-length="240"
                  data-length="240"
                  data-min-height="240"
                  data-contain=""
                  data-direction="column"
                  data-align="start"
                  data-gap="20"
                  
                >
                  <text
                    data-weight="700"
                    data-text-size="x-large"
                    data-wrap="wrap"
                  >
                    Mauris hendrerit tristique sagittis.
                  </text>
                </group>
              </group>


              <group
                data-background="main"
                data-color="main-text"
                data-radius="10"
                data-space="30"
                data-min-length="240"
                data-length="240"
                data-min-height="240"
                data-contain=""
                data-direction="column"
                data-align="start"
                data-gap="20"
                // data-theme="dark"
              >
                <text data-weight="700" data-text-size="display-md" data-wrap="wrap">
                  128
                </text>
                <text data-wrap="wrap" data-line="1.5">
                  Nam maximus ante eu arcu mollis rhoncus. Nulla volutpat
                  fringilla ante. Mauris hendrerit tristique sagittis. Cras
                  egestas dapibus risus non aliquet.
                </text>
              </group>

              <group
                data-background="secondary"
                data-color="secondary-text"
                data-radius="10"
                data-space="30"
                data-min-length="240"
                data-length="240"
                data-min-height="240"
                data-contain=""
                data-direction="column"
                data-align="start"
                data-gap="20"
                // data-theme="dark"
              >
                <text data-weight="700" data-text-size="display-md" data-wrap="wrap">
                  256
                </text>
                <text data-wrap="wrap" data-line="1.5">
                  Nam maximus ante eu arcu mollis rhoncus. Nulla volutpat
                  fringilla ante. Mauris hendrerit tristique sagittis. Cras
                  egestas dapibus risus non aliquet.
                </text>
              </group>
            </group>
          </group>
        </Scroll>
      </group>
    </>
  );
};
export default ContentSlide;
