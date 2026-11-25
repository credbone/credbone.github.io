import React, { useId } from "react";
import { SmilePlus } from "lucide-react";
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
import { IconArrow, IconColor, IconDonut, IconDots, IconPattern, IconSpline } from "../../components/icon/credIcons";

export const avatarIcon = <SmilePlus strokeWidth={1.5} />;
export const colorMixerIcon = <IconColor  stroke={1.5} />;
export const iconCreatorIcon = <IconArrow  stroke={1.5} />;
export const blobIcon = <IconDots  stroke={1.5}/>;
export const patternIcon = <IconPattern stroke={1.5}  />;
export const colorConverterIcon = <IconDonut  stroke={1.5}  />;
export const pathIcon = <IconSpline stroke={1.5}/>;

export const iconcontent = <DotDisplay size={"fit"} activeIndexes={icon} />;
export const blobcontent =  <DotDisplay size={"fit"} activeIndexes={blob} />;
export const patternmaker = ( <DotDisplay size={"fit"} activeIndexes={patterns} /> );
export const ColorMixer = <DotDisplay size={"fit"} activeIndexes={color} />;
export const ColorSpace = ( <DotDisplay size={"fit"} activeIndexes={colorspace} /> );
export const PathBuilder = <DotDisplay size={"fit"} activeIndexes={Path} />;

// The thumb renders in several places at once (tools rail, navigation popover), so each
// copy needs its own clipPath id: a shared id resolves to the first copy in the page, and
// the clip is dropped when that copy is display:none (the desktop rail on mobile).
const AvatarThumb: React.FC = () => {
  const clipId = "avatar-thumb-" + useId().replace(/:/g, "");

  return (
    <svg
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
      <circle cx="310" cy="310" r="256" fill="#FAC377" />
      <image
        x="0"
        y="-54"
        width="620"
        height="620"
        clipPath={`url(#${clipId})`}
        href={res_1_2x}
      />
    </svg>
  );
};

export const AvatarMaker = <AvatarThumb />;
