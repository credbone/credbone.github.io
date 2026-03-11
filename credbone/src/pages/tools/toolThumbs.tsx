import DotDisplay from "../../template/dotDisplay";
import { icon, blob, color, colorspace, patterns } from "./dotIcon";





export const iconcontent = <DotDisplay size={"fit"} activeIndexes={icon} />;
export const blobcontent = <DotDisplay size={"fit"} activeIndexes={blob} />;
export const patternmaker = <DotDisplay size={"fit"} activeIndexes={patterns} />;
export const ColorMixer = <DotDisplay size={"fit"} activeIndexes={color} />;
export const ColorSpace = <DotDisplay size={"fit"} activeIndexes={colorspace} />;