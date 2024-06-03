import React from 'react';

interface IconProps {
  size?: number;
}

const Icon: React.FC<IconProps & { children: React.ReactNode }> = ({ size = 24, children }) => {
  return (
    <svg
      data-shrink="no"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
};

export const IconSearch: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <circle cx="11.5" cy="11.5" r="6.5" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      <line x1="16.1" y1="16.1" x2="20" y2="20" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    </Icon>
  );
};

export const IconHome: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="m18,10.33v7.67c0,1.1-.9,2-2,2h-8c-1.1,0-2-.9-2-2v-7.67" fill="none" stroke="currentcolor" strokeMiterlimit="10" strokeWidth="2"/>
      <line x1="12" y1="5" x2="20" y2="12" fill="none" stroke="currentcolor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
      <line x1="4" y1="12" x2="12" y2="5" fill="none" stroke="currentcolor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
    </Icon>
  );
};








export const IconDemo: React.FC = () => {
  return (

<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 112 24" fill="currentcolor" >
    <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5,11.5A6.5,6.5 0,1,1 18,11.5A6.5,6.5 0,1,1 5,11.5" className="cred-icon-demo_0"></path>
    <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.1,16.1L20,20" className="cred-icon-demo_1"></path>
    <path d="m62,10.33v7.67c0,1.1-.9,2-2,2h-8c-1.1,0-2-.9-2-2v-7.67" fill="none" stroke="currentcolor" stroke-miterlimit="10" stroke-width="2" className="cred-icon-demo_4"></path>
    <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M56,5L64,12" className="cred-icon-demo_5"></path>
    <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M48,12L56,5" className="cred-icon-demo_6"></path>
    <path d="m99.09,5.56c.36-.77,1.45-.77,1.81,0l1.66,3.54,3.88.49c.84.11,1.18,1.14.56,1.72l-2.85,2.68.74,3.84c.16.83-.72,1.47-1.46,1.06l-3.43-1.89-3.43,1.89c-.74.41-1.62-.23-1.46-1.06l.73-3.84-2.85-2.68c-.62-.58-.28-1.62.56-1.72l3.88-.49,1.66-3.54Z" fill="none" stroke="currentcolor" stroke-miterlimit="10" stroke-width="2" className="cred-icon-demo_7"></path>
</svg>

  );
};






// export const Svg: React.FC = () => {
//   return (

//   );
// };
