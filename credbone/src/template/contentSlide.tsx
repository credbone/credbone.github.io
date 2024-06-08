import React from "react";
import Scroll from "../components/scroll";


import sampleImage9 from "../styles/images/samples/res_32.jpg";
import sampleImage14 from "../styles/images/samples/sample_14.mp4";


const ContentSlide: React.FC = () => {
  return (
    <>
      <group
        data-scroll-mask="false"
        //data-scroll-type="snap"
        data-scroll-padding="20"
      >
        <Scroll>
          <group data-space="20" data-gap="10" data-wrap="no">
            <group
              data-background="highlight"
              data-radius="15"
              data-space="30"
              data-min-length="240"
              data-length="240"
              data-height="300"
              data-contain=""
              data-direction="column"
              data-align="start"
              data-gap="20"
              data-dark=""
            >
              <text data-weight="700" data-text-size="x-large" data-wrap="wrap">
                Sample Content
              </text>
              <text data-wrap="wrap" data-line="1.5">
                Nam maximus ante eu arcu mollis rhoncus. Nulla volutpat
                fringilla ante. Mauris hendrerit tristique sagittis. Cras
                egestas dapibus risus non aliquet.
              </text>
            </group>

            <group
              data-height="300"
              data-contain=""
              data-background="highlight"
              data-radius="15"
              data-space="20"
              data-min-length="240"
              data-length="240"
              data-dark=""
            >
              <icon data-position="center" data-icon-size="large">
                explore
              </icon>
            </group>

            <group
              
              data-radius="15"
              data-height="300"
              data-contain=""
              data-length="410"
              data-min-length="240"
             
              data-color="main-text"
              data-background="main-dark"
              
            >
              <picture data-position="absolute" data-name="color-demo" >
                <img src={sampleImage9} alt="" />
              </picture>
              <group
                data-radius="15"
                data-space="30"
                data-direction="column"
                data-align="start"
                data-gap="20"
              >
                <text data-weight="700" data-text-size="72" data-wrap="wrap">
                  64
                </text>
                <text data-wrap="wrap" data-line="1.5">
                  Nam maximus ante eu arcu mollis rhoncus. Nulla volutpat
                  fringilla ante. Mauris hendrerit tristique sagittis. Cras
                  egestas dapibus risus non aliquet.
                </text>
              </group>
            </group>

            <group
              data-border=""
              data-radius="15"
              data-space="30"
              data-min-length="240"
              data-length="240"
              data-height="300"
              data-contain=""
              data-direction="column"
              data-align="start"
              data-gap="20"
            >
              <text data-weight="700" data-text-size="x-large" data-wrap="wrap">
                Sample Content
              </text>
              <text data-wrap="wrap" data-line="1.5">
                Nam maximus ante eu arcu mollis rhoncus. Nulla volutpat
                fringilla ante. Mauris hendrerit tristique sagittis. Cras
                egestas dapibus risus non aliquet.
              </text>
            </group>

            <group
              data-height="300"
              data-contain=""
              data-background="highlight"
              data-radius="15"
              data-min-length="240"
              data-length="240"
            >
              <video
              
                data-position="absolute"
                src={sampleImage14}
                autoPlay
                muted
                loop
                playsInline
                data-object-fit="cover"
                data-height="fit"
                data-max-length="fit"
              ></video>

              <group
                data-radius="15"
                data-space="30"
                data-min-length="240"
                data-length="240"
                data-height="300"
                data-contain=""
                data-direction="column"
                data-align="start"
                data-gap="20"
                data-dark=""
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

            {/* <group
              data-background="highlight"
              data-radius="15"
              data-contain=""
              data-min-length="240" data-length="240"
            >
              <picture data-position="absolute">
                <img src={sampleImage9} alt="" />
              </picture>

            </group> */}

            <group
              data-background="main"
              data-color="main-text"
              data-radius="15"
              data-space="30"
              data-min-length="240"
              data-length="240"
              data-height="300"
              data-contain=""
              data-direction="column"
              data-align="start"
              data-gap="20"
             // data-dark=""
            >
              <text data-weight="700" data-text-size="72" data-wrap="wrap">
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
              data-radius="15"
              data-space="30"
              data-min-length="240"
              data-length="240"
              data-height="300"
              data-contain=""
              data-direction="column"
              data-align="start"
              data-gap="20"
             // data-dark=""
            >
              <text data-weight="700" data-text-size="72" data-wrap="wrap">
                256
              </text>
              <text data-wrap="wrap" data-line="1.5">
                Nam maximus ante eu arcu mollis rhoncus. Nulla volutpat
                fringilla ante. Mauris hendrerit tristique sagittis. Cras
                egestas dapibus risus non aliquet.
              </text>
            </group>

          </group>
        </Scroll>
      </group>
    </>
  );
};
export default ContentSlide;
