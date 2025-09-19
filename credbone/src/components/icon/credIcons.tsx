import React from 'react';

interface IconProps {
  size?: number;
  fill?: boolean;
  stroke?:number
}

const Icon: React.FC<IconProps & { children: React.ReactNode }> = ({ size = 24, fill = false, children }) => {
  return (
    <svg
      data-shrink="no"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill ? "currentColor" : "none"}
      viewBox="0 0 24 24"
      data-name="cred-icon"
    >
      {children}
    </svg>
  );
};

export const IconSearch: React.FC<IconProps> = ({stroke = 2,...restProps}) => {
  return (
    <Icon {...restProps}>
      <circle cx="11.5" cy="11.5" r="6.5" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}/>
      <line x1="16.1" y1="16.1" x2="20" y2="20" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}/>
    </Icon>
  );
};



export const IconHome: React.FC<IconProps> = ({ fill = false, stroke = 2, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>
      <path d="m18.25,17.89c0,1.12-.9,2.02-2,2.02h-8c-1.1,0-2-.91-2-2.02,0,0,0-4.17,0-7.64l6-5.33,6,5.33c0,3.43,0,7.55,0,7.64Z" fill={fill ? 'currentColor' : 'none'} />
      <path d="m18,10.33v7.67c0,1.1-.9,2-2,2h-8c-1.1,0-2-.9-2-2v-7.67" fill="none" stroke="currentcolor" strokeMiterlimit="10" strokeWidth={stroke}/>
      <g fill="none" stroke="currentcolor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth={stroke}>
      <line x1="12" y1="5" x2="20" y2="12" />
      <line x1="4" y1="12" x2="12" y2="5"/>
      </g>
      
    </Icon>
  );
};



export const IconShare: React.FC<IconProps> = ({stroke = 2,...restProps}) => {
  return (
    <Icon {...restProps}>
    <g fill="none" stroke="currentcolor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth={stroke}>
      <circle cx="7" cy="12" r="3" />
      <circle cx="17" cy="18" r="3" />
      <line x1="9.57" y1="13.54" x2="14.43" y2="16.46"/>
      <circle cx="17" cy="6" r="3"/>
      <line x1="9.57" y1="10.46" x2="14.43" y2="7.54"/>
    </g>
    </Icon>
  );
};


export const IconMore: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
    <g fill="currentcolor">
    <circle cx="18" cy="12" r="1.5"/>
      <circle cx="12" cy="12" r="1.5"/>
      <circle cx="6" cy="12" r="1.5"/>
    </g>
    </Icon>
  );
};


export const IconMoreHoriz: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
    <g fill="currentcolor">
    <circle cx="12" cy="6" r="1.5"/>
      <circle cx="12" cy="12" r="1.5"/>
      <circle cx="12" cy="18" r="1.5"/>
    </g>
    </Icon>
  );
};


export const IconHeart: React.FC<IconProps> = ({ fill = false, stroke = 2, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth={stroke} fill={fill ? 'currentColor' : 'none'}>
        <path d="m5.37,12.3l6.73,6.67,6.73-6.67c1.69-1.68,1.69-4.39,0-6.07-1.69-1.68-4.43-1.68-6.12,0l-.61.61-.61-.61c-1.69-1.68-4.43-1.68-6.12,0s-1.69,4.39,0,6.07Z"  />
      </g>
    </Icon>
  );
};

export const IconStar: React.FC<IconProps> = ({ fill = false, stroke = 2, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth={stroke} fill={fill ? 'currentColor' : 'none'}>
  <path 
  
  d="M11.6,5.6c0.4-0.8,1.4-0.8,1.8,0l1.7,3.5l3.9,0.5c0.8,0.1,1.2,1.1,0.6,1.7L16.6,14l0.7,3.8c0.2,0.8-0.7,1.5-1.5,1.1L12.5,17l-3.4,1.9c-0.7,0.4-1.6-0.2-1.5-1.1L8.3,14l-2.8-2.7C4.9,10.7,5.2,9.7,6,9.6l3.9-0.5L11.6,5.6z"
  
  />

  </g>
    </Icon>
  );
};


export const IconSettings: React.FC<IconProps> = ({ fill = false,stroke = 2, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>

<path fill={fill ? 'currentColor' : 'none'}  stroke="currentColor" strokeMiterlimit="10" strokeWidth={stroke} xmlns="http://www.w3.org/2000/svg" d="m18.66,6.5l-5.33-3.14c-.82-.48-1.83-.48-2.65,0l-5.33,3.14c-.83.49-1.34,1.4-1.34,2.38v6.23c0,.98.51,1.89,1.34,2.38l5.33,3.14c.82.48,1.83.48,2.65,0l5.33-3.14c.83-.49,1.34-1.4,1.34-2.38v-6.23c0-.98-.51-1.89-1.34-2.38Zm-6.66,8.5c-1.66,0-3-1.34-3-3s1.34-3,3-3,3,1.34,3,3-1.34,3-3,3Z" />
    </Icon>
  );
};


export const IconFold: React.FC<IconProps> = ({ fill = false, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>


<path  fill="currentColor" d="M20.47,7.37s0,0,0-.08l-.06-.15a.71.71,0,0,0-.07-.09.94.94,0,0,0-.09-.12l-.09-.07L20,6.78l-7.5-4.63a1,1,0,0,0-1.06,0L4,6.78l-.09.08-.09.07a.94.94,0,0,0-.09.12.71.71,0,0,0-.07.09l-.06.15s0,0,0,.08a1.15,1.15,0,0,0,0,.26v8.74a1,1,0,0,0,.47.85l7.5,4.63h0a.47.47,0,0,0,.15.06s.05,0,.08,0a.86.86,0,0,0,.52,0s.05,0,.08,0a.47.47,0,0,0,.15-.06h0L20,17.22a1,1,0,0,0,.47-.85V7.63A1.15,1.15,0,0,0,20.47,7.37ZM11,19.21l-5.5-3.4V9.43L11,12.82Zm1-8.12L6.4,7.63,12,4.18l5.6,3.45Zm6.5,4.72L13,19.21V12.82l5.5-3.39Z"/>


  {/* <path fill="currentColor" d="m6,17.59l6,2.4V6.39l-6-2.4v13.6Zm-.75,1.85c-.38-.15-.69-.39-.91-.73s-.34-.71-.34-1.13V3.99c0-.55.2-1.02.59-1.41s.86-.59,1.41-.59l6.7,2.53c.38.15.7.4.94.74s.36.72.36,1.14v13.6c0,.72-.29,1.27-.88,1.66-.58.39-1.21.45-1.88.19l-6-2.4Zm6.75-.45v-2h6V3.99H6V1.99h12c.55,0,1.02.2,1.41.59s.59.86.59,1.41v13c0,.55-.2,1.02-.59,1.41s-.86.59-1.41.59h-6Zm-6-1.4V3.99v13.6Z" /> */}
          </Icon>
  );
};


export const IconBook: React.FC<IconProps> = ({ fill = false, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>
 <path d="m18,2H8c-2.21,0-4,1.79-4,4v12c0,2.21,1.79,4,4,4h10c1.1,0,2-.9,2-2V4c0-1.1-.9-2-2-2ZM6,6c0-1.1.9-2,2-2h10v10H8c-.7,0-1.4.2-2,.56V6Zm2,14c-1.1,0-2-.9-2-2s.9-2,2-2h10v4H8Z" fill="currentColor"/>
    </Icon>
  );
};

export const IconInfo: React.FC<IconProps> = ({ fill = false, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>

<g stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" fill={fill ? 'currentColor' : 'none'}>
<path d="M0 0h24v24H0z" fill="none" stroke="none"/>
<circle cx="12" cy="12" r="9"/><line x1="12" x2="12.01" y1="8" y2="8"/>
<polyline points="11 12 12 12 12 16 13 16"/>
</g>
    </Icon>
  );
};


export const IconBulb: React.FC<IconProps> = ({ fill = false, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>

<g stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" fill={fill ? 'currentColor' : 'none'}>
<path d="M0 0h24v24H0z" fill="none" stroke="none"/>
<path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3"/>
<line x1="9.7" x2="14.3" y1="17" y2="17"/>
</g>

    </Icon>
  );
};


export const IconThumbUp: React.FC<IconProps> = ({ fill = false, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>

<path fill="currentColor"  d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"/>

    </Icon>
  );
};


export const IconPicker: React.FC<IconProps> = ({ fill = false, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" fill={fill ? 'currentColor' : 'none'}>
    <path d="M0 0h24v24H0z" fill="none" stroke="none"/>
      <path d="M11 7l6 6"/>
      <path d="M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z"/>
  </g>
    </Icon>
  );
};


export const IconViewStream: React.FC<IconProps> = ({ fill = false, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>
  <path fill="currentColor" d="m19,17v-4H5v4h14Zm0-6v-4H5v4h14Zm-14,8c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41V7c0-.55.2-1.02.59-1.41.39-.39.86-.59,1.41-.59h14c.55,0,1.02.2,1.41.59s.59.86.59,1.41v10c0,.55-.2,1.02-.59,1.41s-.86.59-1.41.59H5Z"/>
    </Icon>
  );
};

export const IconTableRows: React.FC<IconProps> = ({ fill = false, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>
   <path fill="currentColor" d="m19,19v-3H5v3h14Zm0-5v-4H5v4h14Zm0-6v-3H5v3h14Zm-14,13c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41V5c0-.55.2-1.02.59-1.41.39-.39.86-.59,1.41-.59h14c.55,0,1.02.2,1.41.59s.59.86.59,1.41v14c0,.55-.2,1.02-.59,1.41-.39.39-.86.59-1.41.59H5Z"/>   </Icon>
  );
};

export const IconViewWindow: React.FC<IconProps> = ({ fill = false, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>
    <path fill="currentColor" d="m5,21c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41V5c0-.55.2-1.02.59-1.41.39-.39.86-.59,1.41-.59h14c.55,0,1.02.2,1.41.59s.59.86.59,1.41v14c0,.55-.2,1.02-.59,1.41-.39.39-.86.59-1.41.59H5Zm8-8v6h6v-6h-6Zm0-2h6v-6h-6v6Zm-2,0v-6h-6v6h6Zm0,2h-6v6h6v-6Z"/>
   </Icon>
  );
};

export const IconViewColumn: React.FC<IconProps> = ({ fill = false, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>
<path fill="currentColor" d="m3.03,17V7c0-.55.2-1.02.59-1.41s.86-.59,1.41-.59h13.98c.55,0,1.02.2,1.41.59s.59.86.59,1.41v10c0,.55-.2,1.02-.59,1.41s-.86.59-1.41.59H5.03c-.55,0-1.02-.2-1.41-.59s-.59-.86-.59-1.41Zm1.98,0h3.33V7h-3.33v10Zm5.33,0h3.33V7h-3.33v10Zm5.33,0h3.33V7h-3.33v10Z"/>
    </Icon>
  );
};


export const IconPlane: React.FC<IconProps> = ({ fill = false, ...restProps }) => {
  return (
    <Icon fill={fill} {...restProps}>
      
      <path  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" fill={fill ? 'currentColor' : 'none'} d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
      
          </Icon>
  );
};









// export const IconAdaptiveTheme: React.FC<IconProps> = (props) => {
//   const id = useId();
//   return (
//     <Icon {...props}>
//        <mask id={`mask-${id}`}>
//         <rect x="0" y="0" width="100%" height="100%" fill="white" /> 
//         <circle cx="12" cy="12" r="4" fill="black" data-name="moon" />    
//       </mask>
//       <circle data-name="sun" cx="12" cy="12" r="6" mask={`url(#mask-${id})`} />
//       <g
//         fill="none"
//         stroke="currentcolor"
//         strokeLinecap="round"
//         strokeMiterlimit="10"
//         strokeWidth="2"
//         data-name="rays"
//       >
//         <line x1="12" y1="1" x2="12" y2="3" />
//         <line x1="12" y1="21" x2="12" y2="23" />
//         <line x1="1" y1="12" x2="3" y2="12" />
//         <line x1="21" y1="12" x2="23" y2="12" />
//         <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
//         <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
//         <line x1="4.2" y1="19.8" x2="5.6" y2="18.4" />
//         <line x1="18.4" y1="5.6" x2="19.8" y2="4.2" />
//       </g>
//     </Icon>
//   );
// };

export const IconSun: React.FC<IconProps> = ({fill = false,stroke = 2,...restProps}) => {
  return (
    <Icon {...restProps}>
      <g fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth={stroke}>
      <circle fill={fill ? 'currentColor' : 'none'} cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="4"></line>
    <line x1="12" y1="20" x2="12" y2="22"></line>
    <line x1="2" y1="12" x2="4" y2="12"></line>
    <line x1="20" y1="12" x2="22" y2="12"></line>
    <line x1="5" y1="5" x2="6.5" y2="6.5"></line>
    <line x1="17.5" y1="17.5" x2="19" y2="19"></line>
    <line x1="5" y1="19" x2="6.5" y2="17.5"></line>
    <line x1="17.5" y1="6.5" x2="19" y2="5"></line>
</g>
    </Icon>
  );
};






export const IconDemo: React.FC = () => {
  return (

<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 112 24" fill="currentcolor" >
    <path fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5,11.5A6.5,6.5 0,1,1 18,11.5A6.5,6.5 0,1,1 5,11.5" className="cred-icon-demo_0"></path>
    <path fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.1,16.1L20,20" className="cred-icon-demo_1"></path>
    <path d="m62,10.33v7.67c0,1.1-.9,2-2,2h-8c-1.1,0-2-.9-2-2v-7.67" fill="none" stroke="currentcolor" strokeMiterlimit="10" strokeWidth="2" className="cred-icon-demo_4"></path>
    <path fill="none" stroke="currentcolor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M56,5L64,12" className="cred-icon-demo_5"></path>
    <path fill="none" stroke="currentcolor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M48,12L56,5" className="cred-icon-demo_6"></path>
    <path d="m99.09,5.56c.36-.77,1.45-.77,1.81,0l1.66,3.54,3.88.49c.84.11,1.18,1.14.56,1.72l-2.85,2.68.74,3.84c.16.83-.72,1.47-1.46,1.06l-3.43-1.89-3.43,1.89c-.74.41-1.62-.23-1.46-1.06l.73-3.84-2.85-2.68c-.62-.58-.28-1.62.56-1.72l3.88-.49,1.66-3.54Z" fill="none" stroke="currentcolor" strokeMiterlimit="10" strokeWidth="2" className="cred-icon-demo_7"></path>
</svg>

  );
};












// export const Svg: React.FC = () => {
//   return (

//   );
// };
