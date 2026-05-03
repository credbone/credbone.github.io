import DotDisplay from "../../template/dotDisplay";
import {
  icon,
  blob,
  color,
  colorspace,
  patterns,
  Path,

} from "./dotIcon";


import res_1_2x from "../../styles/images/samples/avatar_res/2x/res_2.webp";

export const iconcontent = <DotDisplay size={"fit"} activeIndexes={icon} />;
export const blobcontent = <DotDisplay size={"fit"} activeIndexes={blob} />;
export const patternmaker = ( <DotDisplay size={"fit"} activeIndexes={patterns} /> );
export const ColorMixer = <DotDisplay size={"fit"} activeIndexes={color} />;
export const ColorSpace = ( <DotDisplay size={"fit"} activeIndexes={colorspace} /> );
export const PathBuilder = <DotDisplay size={"fit"} activeIndexes={Path} />;

export const AvatarMaker = (
  <>
    <svg
      data-contain="visible"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 620 620"
      fill="none"
    >
      <defs>
        <clipPath id="grid-a-thumb" clipPathUnits="userSpaceOnUse">
          <rect x="0" y="-54" width="620" height="310"></rect>
          <circle cx="310" cy="310" r="256"></circle>
        </clipPath>
      </defs>
      <circle cx="310" cy="310" r="256" fill="#FAC377"></circle>
      <image
        x="0"
        y="-54"
        width="620"
        height="620"
        clip-path="url(#grid-a-thumb)"
        href={res_1_2x}
      ></image>
    </svg>
  </>
);
