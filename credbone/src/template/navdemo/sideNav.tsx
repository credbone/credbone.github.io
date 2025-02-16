
import Ripple from "../../components/Ripple";
import { SvgHamburgerToLeft } from "../../components/svg";
import { useRef, useState } from "react";


import sampleImage2 from "../../styles/images/samples/list_res/res_05.jpg";
import { BookOpen, Grip, ShoppingBag } from "lucide-react";

const SideNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (navRef.current && !navRef.current.contains(event.target as Node)) {
  //     setIsNavOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // const bottomRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <group data-align="start" data-gap="30" data-wrap="no" >
      <group
        ref={navRef}
        data-placement="right"
        //  data-float={isNavOpen ? "15" : "20"}
        data-radius="15"
        //   data-length={isNavOpen ? "500" : "80"}
        data-shrink="no"
        // data-name="side_nav"
        data-background="context"
        data-expanded={isNavOpen ? "open" : "close"}
        data-length={isNavOpen ? "240" : "90"}
        data-transition-prop="width"
        //  data-width="auto"
        // data-height="fit"
        // data-max-length="300"
        data-border=""
        data-index="999"
        data-align="start"
        data-wrap="no"
        data-direction="column"
        data-scrollbar="none"
        data-scroll=""
        data-duration=".225"

        //   data-position="absolute"
      >
        {/* <group
          // data-adaptive="open-state"
          data-background="main"
          data-color="white"
          data-ratio="1:1"
          data-align="end"
          data-contain=""
          data-shrink="no"
          data-cursor="pointer"
          data-interactive=""
          onClick={handleNavToggle}
       //   data-adaptive={isNavOpen ? "" : "600"}
        >



          <picture data-position="absolute" data-type="interact">
            <img src={sampleImage} alt="" />
          </picture>
          <group
            data-direction="column"
            data-gap="10"
            data-adaptive="open-state"
            data-max-length="300"
          >
            <Marquee auto={isNavOpen ? true : false}>
              <text
                data-weight="700"
                data-text-size="xxx-large"
                data-ellipsis=""
                data-space="30"
              >
                Jane Rosemary Smith
              </text>
            </Marquee>

          </group>
        </group> */}

        <group
          data-height="autofit"
          data-weight="600"
          data-space="20"
          data-direction="column"
        >

            <group
              // data-space="10"
              data-space-vertical={isNavOpen ? "30" : ""}
              data-gap="15"
          //    data-radius={isNavOpen ? "10" : "30"}
              data-align="center"

              data-wrap="no"
              data-contain=""
              data-direction="column"

            >
              <group
                        //   data-interactive=""
              data-cursor="pointer"
               
              //  data-width="auto"
                data-ratio="1:1"
                data-duration=".125"


                data-length={isNavOpen ? "120" : "50"}
                data-radius="full"
                data-contain=""
                onClick={() => {
                  handleNavToggle();
                  // setTimeout(() => {
                  //   //    console.log("Timeout reached, scrolling...");
                  //   if (bottomRef.current) {
                  //     bottomRef.current.scrollIntoView({
                  //       behavior: "smooth",
                  //     });
                  //   }
                  // }, 325);
                }}
              >
                <picture  data-type="interact" data-position="absolute" data-object-position="top">
                  <img src={sampleImage2} alt="" />
                </picture>
              </group>

              <group
                data-width="auto"
                data-direction="column"
                data-adaptive="open-state"
                data-contain=""data-align="center"
              >
                <text data-ellipsis="" data-text-size="large" data-weight="700">
                Charlote Thompson
                </text>

                <text data-ellipsis="" data-light="">
                  New York, USA
                </text>
              </group>
            </group>




          <separator data-horizontal="" data-interval="15"></separator>
          <Ripple>
            <group
              data-touch-action="manipulation"
              className={isNavOpen ? "open" : ""}
              data-name="side_nav_switch"
              onClick={handleNavToggle}
              data-contain=""
              data-cursor="pointer"
              data-interactive=""
              data-space="10"
              data-gap="10"
              data-radius="10"
              data-align="center"
              data-wrap="no"
            >
              <icon data-length="30">
                <SvgHamburgerToLeft />
              </icon>
              <text data-ellipsis="" data-adaptive="open-state">
                Close
              </text>
            </group>
          </Ripple>
          <group
            data-direction="column"
            data-align="start"
            data-fit="1"
            data-gap="5"
          >
            <separator data-horizontal="" data-interval="15"></separator>
            <Ripple>
              <group
                data-contain=""
                data-cursor="pointer"
                data-interactive=""
                data-space="10"
                data-gap="10"
                data-radius="10"
                data-align="center"
                data-wrap="no"
              >
                <icon data-length="30">
                  <BookOpen size={20} />
                </icon>
                <text data-ellipsis="" data-adaptive="open-state">
                  Home
                </text>
              </group>
            </Ripple>
            <Ripple>
              <group
                data-contain=""
                data-cursor="pointer"
                data-interactive=""
                data-space="10"
                data-gap="10"
                data-radius="10"
                data-align="center"
                data-wrap="no"
              >
                <icon data-length="30">
                  <Grip size={20} />
                </icon>
                <text data-ellipsis="" data-adaptive="open-state">
                  Collections
                </text>
              </group>
            </Ripple>
            <group data-height="100">

            </group>
            <separator data-horizontal="" data-interval="15"></separator>
            <group
              data-interactive=""
              data-space="10"
              data-gap="10"
              data-radius="10"
              data-align="center"
              data-wrap="no"
              data-cursor="pointer"
            >
              <icon data-adaptive="open-state" data-length="30">
                <ShoppingBag size={20} />
              </icon>
              <text data-light="" data-ellipsis="" data-adaptive="open-state">
                Cart
              </text>

              <group data-position="right" data-length="30" data-height="30" data-direction="column">
                <group
                  data-position="center"
                  data-length="25"
                  data-ratio="1:1"
                  data-radius="20"
                  data-color="white"
                  data-justify="center"
                  data-align="center"
                  data-background="red"
                >
                  <text data-weight="700">3</text>
                </group>
              </group>
            </group>
            {/* <group data-position="bottom" ref={bottomRef}>
              <group></group>


            </group> */}
          </group>
        </group>
      </group>


<group 
data-width="auto" 
 data-wrap="no" 
 data-contain="" 
 data-position="absolute-600"
// data-adaptive={isNavOpen ? "600" : ""}
  >
    <group data-length="120" data-adaptive="mobile-600"></group>
<separator data-vertical="" data-height=""></separator>
 <group data-contain="" data-direction="column" data-gap="10" data-space="30">
  <text data-text-size="large" data-weight="700">Sidebar</text>
  <text data-wrap="wrap" data-length="200" data-line="1.5" data-opacity="50">Example Sidebar Navigation, customizable to display advanced UI for specific requirements.</text>
  </group>
</group>

    </group>
  );
};

export default SideNav;
