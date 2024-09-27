import React, { useId } from "react";

interface GaugeProps {
  value: number;
  max: number;
  size: number;
}

const Gauge: React.FC<GaugeProps> = ({ value, max, size }) => {
  // const radius = size / 2 - 15;
  // const circumference = 2 * Math.PI * radius;
  // const offset = circumference - (value / max) * circumference;

  const maskid = useId();

  return (
    <svg
      width="100%"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      //transform="rotate(-225)"

      data-rotate="-225"
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




{/* <g
        data-opacity="10"
        fill="currentColor"

>

<path d="m18,60c0-.34.02-.67.03-1h-3c0,.33-.03.66-.03,1s.02.67.03,1h3c0-.33-.03-.66-.03-1Z"/>
    <path d="m16.28,70.68c.16.65.33,1.29.52,1.93l2.9-.78c-.19-.64-.36-1.28-.52-1.93l-2.9.78Z"/>
    <path d="m16.29,49.32l2.9.78c.16-.65.33-1.29.52-1.93l-2.9-.78c-.19.64-.36,1.28-.52,1.93Z"/>
    <path d="m20.53,81.63c.32.59.65,1.16,1,1.73l2.6-1.5c-.35-.57-.68-1.15-1-1.73l-2.6,1.5Z"/>
    <path d="m36.64,21.53l1.5,2.6c.57-.35,1.15-.68,1.73-1l-1.5-2.6c-.58.32-1.16.65-1.73,1Z"/>
    <path d="m47.39,16.8l.78,2.9c.64-.19,1.28-.36,1.93-.52l-.78-2.9c-.65.16-1.29.33-1.93.52Z"/>
    <path d="m20.53,38.37l2.6,1.5c.32-.59.65-1.16,1-1.73l-2.6-1.5c-.35.57-.68,1.15-1,1.73Z"/>
    <path d="m27.49,91.1c.46.48.93.95,1.41,1.41l2.13-2.12c-.48-.46-.95-.93-1.42-1.42l-2.12,2.12Z"/>
    <path d="m27.49,28.9l2.12,2.12c.46-.48.93-.95,1.42-1.42l-2.12-2.12c-.48.46-.95.93-1.41,1.41Z"/>
    <path d="m59,15.02v3c.33,0,.66-.03,1-.03s.67.02,1,.03v-3c-.33,0-.66-.02-1-.02s-.67.02-1,.02Z"/>
    <path d="m88.97,90.39l2.12,2.12c.48-.46.95-.93,1.41-1.41l-2.12-2.13c-.46.48-.93.95-1.41,1.41Z"/>
    <path d="m95.87,81.86l2.6,1.5c.35-.57.68-1.15,1-1.73l-2.6-1.5c-.32.59-.65,1.16-1,1.73Z"/>
    <path d="m100.3,71.83l2.9.78c.19-.64.36-1.28.52-1.93l-2.9-.78c-.16.65-.33,1.29-.52,1.93Z"/>
    <path d="m104.97,59h-3c0,.33.03.66.03,1s-.02.67-.03,1h3c0-.33.03-.67.03-1s-.02-.67-.03-1Z"/>
    <path d="m47.39,103.2c.64.19,1.28.36,1.93.52l.78-2.9c-.65-.16-1.29-.33-1.93-.52l-.78,2.9Z"/>
    <path d="m80.13,96.87l1.5,2.6c.58-.32,1.16-.65,1.73-1l-1.5-2.6c-.57.35-1.15.68-1.73,1Z"/>
    <path d="m36.64,98.47c.57.35,1.15.68,1.73,1l1.5-2.6c-.59-.32-1.16-.65-1.73-1l-1.5,2.6Z"/>
    <path d="m59,101.97v3c.33,0,.66.03,1,.03s.67-.02,1-.03v-3c-.33,0-.66.03-1,.03s-.67-.02-1-.03Z"/>
    <path d="m69.9,100.82l.78,2.9c.65-.16,1.29-.33,1.93-.52l-.78-2.9c-.64.19-1.28.36-1.93.52Z"/>
</g> */}
      
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


{/* <g>
        <use xlinkHref="#circlePath" fill="none"/>
        <text fill="#000"  data-opacity="10" >
            <textPath startOffset="120" xlinkHref="#circlePath">Memory Max 32BG</textPath>
        </text>
    </g> */}

      <g
mask={`url(#${maskid})`}
        x="0"
        width="120"
        height="120"
        y="0"
        fill="currentColor"
        data-transition-prop="transform"
        
        data-duration=".325"
        transform-origin="center"
        transform={"rotate(" + (value / max || 0) * 270 + ")"}
      >
        <path d="M57,57l39,2v2L57,63V57Z" />
        {/* <rect width="30" height="2" x="75" y="59"></rect> */}
      </g>

      <circle
        cx="50%"
        cy="50%"
        r="6"
        strokeWidth="4"
        fill="none"
        stroke="currentColor"
      ></circle>

      <circle
        cx="50%"
        cy="50%"
        r="55"
        stroke="currentcolor"
        strokeWidth="10"
        fill="none"
        data-opacity="10"
        //strokeDasharray={`${value} 10 30 133.333` }
        strokeDasharray={` ${(value / max) * 100 - 3.5} 7 ${Math.max(0, 100 - (value / max) * 100 - 3.5)} 133.333`}
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
        data-stroke="main"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        pathLength="133.333"
        strokeDasharray={`${(value / max) * 100 - 3.5} 133.333`}
        // strokeDashoffset={offset}
        // transform={`rotate(-90 ${size / 2} ${size / 2})`}
        data-duration=".725"
        data-transition-prop="stroke-dasharray"
      />
    </svg>
  );
};

export default Gauge;
