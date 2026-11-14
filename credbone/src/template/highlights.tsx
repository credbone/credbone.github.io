import { SvgQR } from "../components/icon/svgRes";
import { avatars } from "../pages/tools/avatars/avatars";
import sampleImage_3 from "../styles/images/samples/res_3.webp";
import sampleImage_2 from "../styles/images/samples/wide_res_75.webp";
import { Link } from "react-router-dom";
import Glass from "../components/Glass";
import { ArrowRight } from "lucide-react";

type AvatarItem = (typeof avatars)[number];

// One avatar tile. `avatarIndex` is the avatar's position in `avatars` (used by the
// AvatarMaker link); `uid` is unique per tile so repeated avatars don't share a clipPath id or key.
const renderAvatar = (avatar: AvatarItem, avatarIndex: number, uid: string) => {
  const clipId = `highlight-avatar-${uid}`;
  return (
    <Link
      data-type="group"
      data-drag="none"
      to={`/Tools/AvatarMaker?avatar=${avatarIndex}`}
      aria-label={avatar.name}
      key={uid}
    >
      <group
        data-interactive="avatar"
        data-over-color="none"
        data-ink-color="neutral"
        data-gap="10"
      >
        <group data-interact="">
          <svg
            data-pointer-event="none"
            data-name="avatar"
            data-contain="visible"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 620 620"
            fill="none"
          >
            <defs>
              <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                <rect x="0" y="-54" width="620" height="310" />
                <circle cx="310" cy="310" r="256" />
              </clipPath>
            </defs>
            <circle cx="310" cy="310" r="256" fill={avatar.color} />
            <image
              x="0"
              y="-54"
              width="620"
              height="620"
              clipPath={`url(#${clipId})`}
              href={avatar.image_2x}
            />
          </svg>
        </group>
      </group>
    </Link>
  );
};

// Avatars shown in each column, by index in `avatars`, in display order.
// Pick exactly the ones you want; leave an index out to exclude it. Repeats are fine.
// Excluded: 0 Sound Buddy, 6 Cozy Beat, 15 Urban Pulse, 17 Warm Hug.
const COLUMN_A = [9, 1, 2, 3, 4, 5, 7, 8, 9];
const COLUMN_B = [19, 10, 11, 12, 13, 8, 7, 11, 19];

const renderColumn = (indices: number[], column: string) =>
  indices
    .map((i, position) => ({ i, position }))
    .filter(({ i }) => avatars[i]) // skip indices that don't exist
    .map(({ i, position }) =>
      renderAvatar(avatars[i], i, `${column}-${position}`),
    );

const Highlights: React.FC = () => {
  return (
    <group data-gap="10" data-type="grid" data-grid-template="200">
      <group
        data-react="scale"
        data-adaptive="desktop"
        data-space="30"
        data-radius="50"
        data-contain=""
        data-justify="center"
        data-directino="column"
      >
        <picture
          data-mask="bottom"
          data-brightness="adaptive"
          data-position="absolute"
          data-background="grey-light"
          data-top="0"
          data-left="0"
                    data-transition-prop="transform"
        >
          <img src={sampleImage_3} alt="" />
        </picture>

        <group data-contain="" data-radius="30">
          <SvgQR />
        </group>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="30"
          viewBox="0 0 36 30"
          fill="white"
          data-index="2"
        >
          <path d="M36 0C27.7157 0 21 6.71573 21 15C21 23.2843 27.7157 30 36 30H0C8.28427 30 15 23.2843 15 15C15 6.71573 8.28427 0 0 0H36Z" />
        </svg>

        <group
          data-space="30"
          data-position="bottom"
          //  data-backdrop="20-adaptive"

          data-background="white"
          data-color="black"
          data-width="auto"
          data-radius="30"
        >
          <group
            data-gap="15"
            data-contain=""
            data-justify="center"
            data-text-align="center"
          >
            <text
              data-wrap="wrap"
              data-font-type="hero"
              data-line="1"
              data-text-size="medium"
              data-max-length="800"
            >
              Browse on <br></br>Mobile
            </text>
            {/* <separator data-horizontal=""></separator> */}
            <group
              data-width="auto"
              data-direction="column"
              data-align="start"
              data-gap="20"
            >
              <text
                data-wrap="wrap"
                data-line="1.3"
                data-length="400"
                //data-text-size="medium-small"
              >
                Scan the QR code to browse the system from your mobile device.
              </text>
            </group>
          </group>
        </group>
      </group>

      <group
        // data-interactive=""
        data-over-color="neutral"
        data-background="context"
        data-elevation="2"
        data-space="30"
        data-radius="50"
        data-contain=""
        data-align="center"
        data-gap="30"
        data-direction="column"
      
      >
        <group
        data-left="0"
          data-top="0"
          data-position="absolute"
          data-height="fit"
          data-wrap="no"
          //  data-align="center"
          data-space="10"
        >
          <group
            data-direction="column"
            data-animation-name="scroll-down"
            data-animation-timeline="main-scroll"
            data-animation-timing="linear"
            data-fill-mode="both"
            data-wrap="no"
          >
            {renderColumn(COLUMN_A, "a")}
          </group>

          <group
            data-align="start"
            data-direction="column"
            data-animation-name="scroll-up"
            data-animation-timeline="main-scroll"
            data-animation-timing="linear"
            data-fill-mode="both"
            data-wrap="no"
          >
            <group data-ratio="2:1"></group>
            {renderColumn(COLUMN_B, "b")}
          </group>
        </group>
        <group data-height="110" data-pointer-event="none"></group>
        <Glass
         data-position="bottom"
          data-pointer-event="none"
          lightAngle={-40}
          lightIntensity={70}
          refraction={150}
          depth={40}
          dispersion={40}
          frost={15}
          radius={30}
          tintOpacity={35}
          saturation={120}
          tint="var(--background)"
          //  data-width="auto"
          data-gap="30"
        >
          <group
            data-space="30"
            data-position="center"
            //     data-backdrop="20-adaptive"
            data-width="auto"
            data-radius="30"
            // data-elevation="2"
          >
            <group
              data-gap="15"
              data-contain=""
              data-justify="center"
              data-text-align="center"
              data-direction="column"
            >
              <text
                data-wrap="wrap"
                data-font-type="hero"
                data-line="1"
                data-text-size="medium"
                data-max-length="800"
              >
                Meet the <br></br>Avatars
              </text>
              {/* <separator data-horizontal=""></separator> */}
              <group
                data-width="auto"
                data-direction="column"
                data-align="start"
                data-gap="20"
              >
                <text
                  data-wrap="wrap"
                  data-line="1.3"
                  // data-length="100"
                  //data-text-size="medium-small"
                >
                  Design and personalize avatars.
                </text>
              </group>
            </group>
          </group>
        </Glass>

        <Link
          //  data-pointer-event="none"
          data-ink-color="gray-shade-20"

          data-contain=""
          data-drag="none"
          data-type="group"
          data-interactive=""
          // data-width="auto"
          data-background="text"
          data-color="main-background"
          data-over-color="neutral"
          data-space="15"
          data-radius="30"
          data-align="center"
          data-wrap="no"
          data-space-horizontal="20" 
                  to="/Tools/AvatarMaker"
          >
          <text data-ellipsis="">Customize</text>
          <group
            data-position="right"
            data-interact=""
            data-opacity="40"
            data-width="auto"
          >
            <ArrowRight size={20} strokeWidth={1.5} />
          </group>
        </Link>
      </group>

      <Link
        data-interactive=""
        data-over-color="neutral"
        to="/Components/QuickDemos"
        data-type="group"
        data-drag="none"
        data-react="scale"
        data-space="30"
        data-radius="50"
        data-contain=""
        data-justify="center"
        data-gap="30"
      >
        <picture
          //   data-mask="top"
          data-brightness="adaptive"
          data-position="absolute"
          data-background="grey-light"
          data-top="0"
          data-left="0"
          data-object-position="right"
          data-transition-prop="transform"
        >
          <img src={sampleImage_2}  alt="" />
        </picture>

        <group data-height="90"></group>

        <group
          data-space="30"
          data-position="bottom"
          //  data-backdrop="20-adaptive"

          data-background="white"
          data-color="black"
          data-width="auto"
          data-radius="30"
        >
          <group
            data-gap="15"
            data-contain=""
            data-justify="center"
            data-text-align="center"
          >
            <text
              data-wrap="wrap"
              data-font-type="hero"
              data-line="1"
              data-text-size="medium"
              data-max-length="800"
            >
              Demos & <br></br>Samples
            </text>
            {/* <separator data-horizontal=""></separator> */}
            <group
              data-width="auto"
              data-direction="column"
              data-align="start"
              data-gap="20"
            >
              <text
                data-wrap="wrap"
                data-line="1.3"
                data-length="400"
                //data-text-size="medium-small"
              >
                Quick apps showcasing design patterns.
              </text>
            </group>
          </group>
        </group>

        <group
          data-pointer-event="none"
          data-ink-color="gray-shade-20"
          data-position="bottom"
          data-contain=""
          data-drag="none"
          data-type="group"
          data-interactive=""
          // data-width="auto"
          data-background="text"
          data-color="main-background"
          data-over-color="neutral"
          data-space="15"
          data-radius="30"
          data-align="center"
          data-wrap="no"
          data-space-horizontal="20"
        >
          <text data-ellipsis="">Explore</text>
          <group
            data-position="right"
            data-interact=""
            data-opacity="40"
            data-width="auto"
          >
            <ArrowRight size={20} strokeWidth={1.5} />
          </group>
        </group>
      </Link>

      <Link
        data-interactive=""
        data-over-color="none"
        to="/Tools/PatternMaker"
        data-type="group"
        data-drag="none"
        //     data-background="adaptive-gray"
        data-space="30"
        data-gap="30"
        data-radius="50"
        data-contain=""
       // data-align="center"
        data-direction="column"
        data-wrap="no"
       
      >
        <group
          data-position="absolute"
          data-height="fit"
          data-direction="column"
          data-top="0"
          data-left="0"
        >


          <svg width="100%" height="100%" data-position="absolute">
            <pattern
              id="combined-svg-38"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
            >
              <g opacity="0.035">
                
                <rect width="24" height="24" fill="currentColor"></rect>
                <rect
                  x="24"
                  y="24"
                  width="24"
                  height="24"
                  fill="currentColor"
                ></rect>
              </g>
              <g opacity="0.25">
                
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 19H23V23H19V24H23V28H24V24H28V23H24V19Z"
                  fill="currentColor"
                ></path>
              </g>
              <g opacity="0.1">
                
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M45 1H46V2L45 2V1ZM41 1H42V2L41 2V1ZM37 1H38V2H37L37 1ZM33 1H34V2H33V1ZM29 1H30V2H29V1ZM25 1H26V2L25 2L25 1ZM21 1H22V2H21V1ZM17 1H18V2L17 2L17 1ZM13 1H14V2H13V1ZM9 1H10V2L9 2V1ZM5 1H6V2H5V1ZM1 1H2L2 2L1 2V1ZM48 3H47V4H48V3ZM44 3H43V4H44V3ZM40 3H39V4L40 4V3ZM36 3H35L35 4H36V3ZM32 3H31V4H32V3ZM28 3H27V4H28V3ZM24 3L23 3L23 4L24 4V3ZM20 3H19V4H20V3ZM16 3H15L15 4H16V3ZM12 3H11V4H12V3ZM8 3H7V4H8V3ZM4 3H3V4H4V3ZM48 7H47V8H48V7ZM44 7H43V8H44V7ZM40 7H39V8H40V7ZM36 7H35L35 8H36V7ZM32 7H31V8H32V7ZM28 7H27V8H28V7ZM24 7H23L23 8H24V7ZM20 7H19V8H20V7ZM16 7H15L15 8L16 8V7ZM12 7H11V8H12V7ZM8 7H7V8L8 8V7ZM4 7H3V8H4V7ZM47 11H48V12H47V11ZM43 11H44V12H43V11ZM39 11H40V12H39V11ZM35 11H36V12H35L35 11ZM31 11H32V12H31V11ZM27 11H28V12H27V11ZM23 11H24V12H23L23 11ZM19 11H20V12H19V11ZM15 11H16V12H15L15 11ZM11 11H12V12H11V11ZM7 11H8V12H7V11ZM3 11H4V12H3V11ZM48 15H47V16H48V15ZM44 15H43V16H44V15ZM40 15H39V16H40V15ZM36 15H35L35 16H36V15ZM32 15H31V16H32V15ZM28 15H27V16H28V15ZM24 15H23L23 16H24V15ZM20 15H19V16H20V15ZM16 15H15L15 16H16V15ZM12 15H11V16H12V15ZM8 15H7V16H8V15ZM4 15H3V16H4V15ZM47 19H48V20H47V19ZM43 19H44V20H43V19ZM39 19H40V20H39V19ZM35 19H36V20H35L35 19ZM31 19H32V20H31V19ZM27 19H28V20H27V19ZM23 19H24V20H23L23 19ZM19 19H20V20H19V19ZM15 19H16V20H15L15 19ZM11 19H12V20H11V19ZM7 19H8V20H7V19ZM3 19H4V20H3V19ZM48 23H47V24H48V23ZM44 23H43V24H44V23ZM40 23H39V24H40V23ZM36 23H35L35 24H36V23ZM32 23H31V24H32V23ZM28 23H27V24H28V23ZM24 23H23L23 24H24V23ZM20 23H19V24H20V23ZM16 23H15L15 24H16V23ZM12 23H11V24H12V23ZM8 23H7V24H8V23ZM4 23H3V24H4V23ZM47 27H48V28H47V27ZM43 27H44V28H43V27ZM39 27H40V28H39V27ZM35 27H36V28H35L35 27ZM31 27H32V28H31V27ZM27 27H28V28H27V27ZM23 27H24V28H23L23 27ZM19 27H20V28H19V27ZM15 27H16V28H15L15 27ZM11 27H12V28H11V27ZM7 27H8V28H7V27ZM3 27H4V28H3V27ZM48 31H47V32H48V31ZM44 31H43V32H44V31ZM40 31H39V32H40V31ZM36 31H35L35 32H36V31ZM32 31H31V32H32V31ZM28 31H27V32H28V31ZM24 31H23L23 32H24V31ZM20 31H19V32H20V31ZM16 31H15L15 32H16V31ZM12 31H11V32H12V31ZM8 31H7V32H8V31ZM4 31H3V32H4V31ZM47 35H48V36H47V35ZM43 35H44V36H43V35ZM39 35H40V36H39V35ZM35 35H36V36H35L35 35ZM31 35H32V36H31V35ZM27 35H28V36H27V35ZM23 35H24V36H23L23 35ZM19 35H20V36H19V35ZM15 35H16V36H15L15 35ZM11 35H12V36H11V35ZM7 35H8V36H7V35ZM3 35H4V36H3V35ZM48 39H47V40H48V39ZM44 39H43V40H44V39ZM40 39H39V40H40V39ZM36 39H35L35 40H36V39ZM32 39H31V40H32V39ZM28 39H27V40H28V39ZM24 39H23L23 40H24V39ZM20 39H19V40H20V39ZM16 39H15L15 40H16V39ZM12 39H11V40H12V39ZM8 39H7V40H8V39ZM4 39H3V40H4V39ZM47 43H48V44H47V43ZM43 43H44V44H43V43ZM39 43H40V44H39V43ZM35 43H36V44H35L35 43ZM31 43H32V44H31V43ZM27 43H28V44H27V43ZM23 43H24V44H23L23 43ZM19 43H20V44H19V43ZM15 43H16V44H15L15 43ZM11 43H12V44H11V43ZM7 43H8V44H7V43ZM3 43H4V44H3V43ZM48 47H47V48H48V47ZM44 47H43V48H44V47ZM40 47H39V48H40V47ZM36 47H35L35 48H36V47ZM32 47H31V48H32V47ZM28 47H27V48H28V47ZM24 47H23L23 48H24V47ZM20 47H19V48H20V47ZM16 47H15L15 48H16V47ZM12 47H11V48H12V47ZM8 47H7V48H8V47ZM4 47H3V48H4V47ZM46 5H45V6H46V5ZM42 5H41V6H42V5ZM38 5H37L37 6H38V5ZM34 5H33V6H34V5ZM30 5H29V6H30V5ZM26 5H25L25 6H26V5ZM22 5L21 5V6H22V5ZM18 5H17L17 6H18V5ZM14 5H13V6H14V5ZM10 5H9V6H10V5ZM6 5H5V6L6 6V5ZM2 5H1V6H2L2 5ZM45 9H46V10H45V9ZM41 9H42V10H41V9ZM37 9H38V10H37L37 9ZM33 9H34V10H33V9ZM29 9H30V10H29V9ZM25 9H26V10H25L25 9ZM21 9H22V10H21V9ZM17 9H18V10H17L17 9ZM13 9H14V10H13V9ZM9 9H10V10H9V9ZM5 9H6V10H5V9ZM1 9H2L2 10H1V9ZM46 13H45V14H46V13ZM42 13H41V14H42V13ZM38 13H37L37 14H38V13ZM34 13H33V14H34V13ZM30 13H29V14H30V13ZM26 13H25L25 14H26V13ZM22 13H21V14H22V13ZM18 13H17L17 14H18V13ZM14 13H13V14H14V13ZM10 13H9V14H10V13ZM6 13H5V14H6V13ZM2 13H1V14H2L2 13ZM45 17H46V18H45V17ZM41 17H42V18H41V17ZM37 17H38V18H37L37 17ZM33 17H34V18H33V17ZM29 17H30V18H29V17ZM25 17H26V18H25L25 17ZM21 17H22V18H21V17ZM17 17H18V18H17L17 17ZM13 17H14V18H13V17ZM9 17H10V18H9V17ZM5 17H6V18H5V17ZM1 17H2L2 18H1V17ZM46 21H45V22H46V21ZM42 21H41V22H42V21ZM38 21H37L37 22H38V21ZM34 21H33V22H34V21ZM30 21H29V22H30V21ZM26 21H25L25 22H26V21ZM22 21H21V22H22V21ZM18 21H17L17 22H18V21ZM14 21H13V22H14V21ZM10 21H9V22H10V21ZM6 21H5V22H6V21ZM2 21H1V22H2L2 21ZM45 25H46V26H45V25ZM41 25H42V26H41V25ZM37 25H38V26H37L37 25ZM33 25H34V26H33V25ZM29 25H30V26H29V25ZM25 25H26V26H25L25 25ZM21 25H22V26H21V25ZM17 25H18V26H17L17 25ZM13 25H14V26H13V25ZM9 25H10V26H9V25ZM5 25H6V26H5V25ZM1 25H2L2 26H1V25ZM46 29H45V30H46V29ZM42 29H41V30H42V29ZM38 29H37L37 30H38V29ZM34 29H33V30H34V29ZM30 29H29V30H30V29ZM26 29H25L25 30H26V29ZM22 29H21V30H22V29ZM18 29H17L17 30H18V29ZM14 29H13V30H14V29ZM10 29H9V30H10V29ZM6 29H5V30H6V29ZM2 29H1V30H2L2 29ZM45 33H46V34H45V33ZM41 33H42V34H41V33ZM37 33H38V34H37L37 33ZM33 33H34V34H33V33ZM29 33H30V34H29V33ZM25 33H26V34H25L25 33ZM21 33H22V34H21V33ZM17 33H18V34H17L17 33ZM13 33H14V34H13V33ZM9 33H10V34H9V33ZM5 33H6V34H5V33ZM1 33H2L2 34H1V33ZM46 37H45V38H46V37ZM42 37H41V38H42V37ZM38 37H37L37 38H38V37ZM34 37H33V38H34V37ZM30 37H29V38H30V37ZM26 37H25L25 38H26V37ZM22 37H21V38H22V37ZM18 37H17L17 38H18V37ZM14 37H13V38H14V37ZM10 37H9V38H10V37ZM6 37H5V38H6V37ZM2 37H1V38H2L2 37ZM45 41H46V42H45V41ZM41 41H42V42H41V41ZM37 41H38V42H37L37 41ZM33 41H34V42H33V41ZM29 41H30V42H29V41ZM25 41H26V42H25L25 41ZM21 41H22V42H21V41ZM17 41H18V42H17L17 41ZM13 41H14V42H13V41ZM9 41H10V42H9V41ZM5 41H6V42H5V41ZM1 41H2L2 42H1V41ZM46 45H45V46H46V45ZM42 45H41V46H42V45ZM38 45H37L37 46H38V45ZM34 45H33V46H34V45ZM30 45H29V46H30V45ZM26 45H25L25 46H26V45ZM22 45H21V46H22V45ZM18 45H17L17 46H18V45ZM14 45H13V46H14V45ZM10 45H9V46H10V45ZM6 45H5V46H6V45ZM2 45H1V46H2L2 45Z"
                  fill="currentColor"
                ></path>
              </g>
            </pattern>
            <rect
              data-animation-name="pattern-move"
              data-animation-timing="linear"
              data-animation-duration="16"
              data-animation-play-state="running-hover"
              data-animation-interation="infinite"
              width="200%"
              height="200%"
              fill="url(#combined-svg-38)"
            ></rect>
          </svg>
        </group>

        <group
        
          data-interact=""
          data-position="center"
          data-width="auto"
          data-pointer-event="none"
           data-height="fit"
        >
          {/* <group data-background="red" data-space="3" data-position="absolute" data-width="auto" data-radius="5" data-right="25" data-top="25"></group> */}

          <group
          
            data-gap="30"
            //  data-contain=""
           // data-justify="center"
            data-text-align="center"
            data-wrap="no"
            data-direction="column"
          //  data-align="center"
          >
            <group
              data-background="white"
              data-color="black"
              data-space="15"
              data-radius="30"
              data-elevation="2"
            >
              <group
                data-background="red"
                data-space="3"
                data-position="absolute"
                data-width="auto"
                data-radius="5"
                data-right="20"
                data-top="20"
              ></group>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 160 160"
                fill="currentcolor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="35" cy="35" r="4" />
                <circle cx="45" cy="35" r="4" />
                <circle cx="125" cy="35" r="4" />
                <circle cx="125" cy="45" r="4" />
                <circle cx="115" cy="45" r="4" />
                <circle cx="115" cy="55" r="4" />
                <circle cx="105" cy="55" r="4" />
                <circle cx="105" cy="65" r="4" />
                <circle cx="95" cy="65" r="4" />
                <circle cx="95" cy="75" r="4" />
                <circle cx="85" cy="75" r="4" />
                <circle cx="85" cy="85" r="4" />
                <circle cx="75" cy="85" r="4" />
                <circle cx="75" cy="95" r="4" />
                <circle cx="65" cy="95" r="4" />
                <circle cx="65" cy="105" r="4" />
                <circle cx="55" cy="105" r="4" />
                <circle cx="55" cy="115" r="4" />
                <circle cx="45" cy="115" r="4" />
                <circle cx="45" cy="125" r="4" />
                <circle cx="35" cy="125" r="4" />
                <circle cx="65" cy="125" r="6" />
                <circle cx="75" cy="115" r="6" />
                <circle cx="85" cy="105" r="6" />
                <circle cx="95" cy="95" r="6" />
                <circle cx="105" cy="85" r="6" />
                <circle cx="115" cy="75" r="6" />
                <circle cx="125" cy="65" r="6" />
                <circle cx="125" cy="105" r="4" />
                <circle cx="115" cy="115" r="4" />
                <circle cx="105" cy="125" r="4" />
                <circle cx="125" cy="125" r="4" />
                <circle cx="35" cy="45" r="4" />
                <circle cx="55" cy="35" r="2" />
                <circle cx="45" cy="45" r="2" />
                <circle cx="35" cy="55" r="2" />
                <circle cx="35" cy="85" r="4" />
                <circle cx="45" cy="75" r="4" />
                <circle cx="55" cy="65" r="4" />
                <circle cx="65" cy="55" r="4" />
                <circle cx="75" cy="45" r="4" />
                <circle cx="85" cy="35" r="4" />
                <circle cx="55" cy="125" r="6" />
                <circle cx="65" cy="115" r="6" />
                <circle cx="75" cy="105" r="6" />
                <circle cx="85" cy="95" r="6" />
                <circle cx="95" cy="85" r="6" />
                <circle cx="105" cy="75" r="6" />
                <circle cx="115" cy="65" r="6" />
                <circle cx="125" cy="55" r="6" />
                <circle cx="115" cy="125" r="4" />
                <circle cx="85" cy="45" r="2" />
                <circle cx="95" cy="35" r="2" />
                <circle cx="75" cy="55" r="2" />
                <circle cx="65" cy="65" r="2" />
                <circle cx="55" cy="75" r="2" />
                <circle cx="45" cy="85" r="2" />
                <circle cx="35" cy="95" r="2" />
                <circle cx="105" cy="35" r="2" />
                <circle cx="95" cy="45" r="2" />
                <circle cx="85" cy="55" r="2" />
                <circle cx="75" cy="65" r="2" />
                <circle cx="65" cy="75" r="2" />
                <circle cx="55" cy="85" r="2" />
                <circle cx="45" cy="95" r="2" />
                <circle cx="35" cy="105" r="2" />
                <circle cx="35" cy="65" r="2" />
                <circle cx="45" cy="55" r="2" />
                <circle cx="55" cy="45" r="2" />
                <circle cx="65" cy="35" r="2" />
                <circle cx="95" cy="125" r="2" />
                <circle cx="105" cy="115" r="2" />
                <circle cx="125" cy="95" r="2" />
                <circle cx="115" cy="105" r="2" />
                <circle cx="125" cy="115" r="4" />
              </svg>
            </group>

            {/* <separator data-horizontal=""></separator> */}
            <group
            data-height="fit"
              data-width="auto"
              data-direction="column"
              data-align="center"
              data-gap="15"
              data-justify="center"
              
            >
              <text
                data-wrap="wrap"
                data-font-type="hero"
                data-line="1"
                data-text-size="medium"
                data-max-length="800"
              >
                Pattern
                <br /> Maker
              </text>

              <text
                data-wrap="wrap"
                data-line="1.3"
                data-length="400"
                //data-text-size="medium-small"
              >
                Create seamless <br /> patterns.
              </text>
            </group>
          </group>
        </group>

        <group
          data-pointer-event="none"
          data-ink-color="gray-shade-20"
          data-position="bottom"
          data-contain=""
          data-drag="none"
          data-type="group"
          data-interactive=""
          // data-width="auto"
          data-background="text"
          data-color="main-background"
          data-over-color="neutral"
          data-space="15"
          data-radius="30"
          data-align="center"
          data-wrap="no"
          data-space-horizontal="20"
        >
          <text data-ellipsis="">Create</text>
          <group
            data-position="right"
            data-interact=""
            data-opacity="40"
            data-width="auto"
          >
            <ArrowRight size={20} strokeWidth={1.5} />
          </group>
        </group>
      </Link>
    </group>
  );
};
export default Highlights;
