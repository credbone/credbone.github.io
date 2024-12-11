import React, { useId } from "react";

interface GaugeProps {
  value: number;
  max: number;
  size: number;
  unit?: string;
  shortname? :string
}

const GaugeSimple: React.FC<GaugeProps> = ({ value, max, size, unit, shortname }) => {
  // const radius = size / 2 - 15;
  // const circumference = 2 * Math.PI * radius;
  // const offset = circumference - (value / max) * circumference;

  const maskid = useId();

  return (
    <svg
      width="100%"
      preserveAspectRatio=""
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      //transform="rotate(-225)"
      // data-rotate="-225"
    >

<defs>
        <mask id={maskid}>
        <rect width="100%" height="100%" fill="white"></rect>
        <circle         cx="50%"
        cy="50%"
        r="6" fill="black"></circle>
      </mask>
{/* 
      <path id="circlePath" d="M20,60a40,40 0 1,0 80,0a40,40 0 1,0 -80,0"></path> */}

    </defs>

    <g>
  <text x="50%" y="115" fill="currentColor" data-fill="currentColor" data-weight="800" dominantBaseline="auto" textAnchor="middle"  fontSize={15}>
  {shortname && <tspan>{shortname}</tspan>}

          </text>

</g>
  
<text x="50%" y="50%" fill="currentColor" data-fill="main-text" data-weight="800" dominantBaseline="central" textAnchor="middle"  fontSize={40}>
{unit && <tspan opacity={0}>{unit}</tspan>}{value}{unit && <tspan>{unit}</tspan>}
          </text>
          {/* <text opacity=".3" x="50%" y="50%"  data-weight="700" dominantBaseline="hanging" textAnchor="middle" >Max {max}{unit}</text> */}



      
{/* <circle
        //      data-opacity="0"
        cx="50%"
        cy="50%"
        r="21"
        stroke="currentcolor"
        data-stroke="secondary"
        strokeWidth="30"
        fill="none"
        data-opacity="30"
        
        pathLength="133.333"
        strokeDasharray={`${value} 133.333`}
        // strokeDashoffset={offset}
        // transform={`rotate(-90 ${size / 2} ${size / 2})`}
        data-duration=".325"
        data-transition-prop="stroke-dasharray"
      /> */}











<g  x="0"
        width="120"
        height="120"
        y="0"
        data-rotate="-225"
        transform-origin="center center"
        >

<g

x="0"
width="120"
height="120"
y="0"

data-transition-prop="transform"


data-duration=".325"
transform-origin="center"
transform={"rotate(" + (value / max || 0) * 270 + ")"}
>
{/* <path d="M57,57l39,2v2L57,63V57Z" /> */}
<rect data-fill="main-text" x="110" y="55" width="10" height="10" rx="5" ry="5"/>
{/* <rect width="30" height="2" x="75" y="59"></rect> */}
</g>

<circle
        cx="50%"
        cy="50%"
        r="55"
        stroke="currentcolor"
        strokeWidth="10"
        fill="none"
        data-opacity="10"
        //strokeDasharray={`${value} 10 30 133.333` }
        strokeDasharray={` ${(value / max) * 100 - 7.5} 15 ${Math.max(0, 100 - (value / max) * 100 - 7.5)} 133.333`}
        pathLength="133.333"
        strokeLinecap="round"
        // strokeDashoffset="0"
        data-duration=".725"
        data-transition-prop="stroke-dasharray"
      />


      

      <circle
        //      data-opacity="0"
        cx="50%"
        cy="50%"
        r="55"

        stroke="currentcolor"
        data-stroke="main-text"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        pathLength="133.333"
        strokeDasharray={`${(value / max) * 100 - 7.5} 133.333`}
        // strokeDashoffset={offset}
        // transform={`rotate(-90 ${size / 2} ${size / 2})`}
        data-duration=".725"
        data-transition-prop="stroke-dasharray"
      />
</g>
    </svg>
  );
};

export default GaugeSimple;
