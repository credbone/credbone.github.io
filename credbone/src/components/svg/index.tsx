export const SvgHamburger: React.FC<{ toLeft?: boolean; toRight?: never; } | { toLeft?: never; toRight?: boolean; }> = ({ toLeft, toRight }) => {
    let dataIcon = 'hamburger';
    if (toLeft) {
        dataIcon = 'hamburgertoleft';
    }
    if (toRight) {
        dataIcon = 'hamburgertoright';
    }
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
        data-icon={dataIcon}
        fill="currentColor"
        >
        <rect rx="1" x="3" y="4" width="14" height="2"></rect>
        <rect rx="1" x="3" y="9" width="14" height="2"></rect>
        <rect rx="1" x="3" y="14" width="14" height="2"></rect>
        </svg>
    );
};

export const SvgHamburgerToRight: React.FC = () => {
    return <SvgHamburger toRight={true} />;
};

export const SvgHamburgerToLeft: React.FC = () => {
    return <SvgHamburger toLeft={true} />;
}

export const SvgPlus: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
        data-icon="plus"
        fill="currentColor"
        >
            <rect rx="1" x="9" y="3" width="2" height="14" />
            <rect rx="1" x="3" y="9" width="14" height="2" />
        </svg>
    );
};

export const SvgMinus: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
        data-icon="minus"
        fill="currentColor"
        >
            <rect rx="1" x="3" y="9" width="14" height="2" />
            <rect rx="1" x="3" y="9" width="14" height="2" />
        </svg>
    );
};


export const SvgLoader: React.FC = () => {
    return (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="16" height="16"><g><g transform="rotate(0 50 50)">
  <rect x="44" y="-0.5" rx="2.52" ry="2.52" width="12" height="21" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(30 50 50)">
  <rect x="44" y="-0.5" rx="2.52" ry="2.52" width="12" height="21" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(60 50 50)">
  <rect x="44" y="-0.5" rx="2.52" ry="2.52" width="12" height="21" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(90 50 50)">
  <rect x="44" y="-0.5" rx="2.52" ry="2.52" width="12" height="21" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(120 50 50)">
  <rect x="44" y="-0.5" rx="2.52" ry="2.52" width="12" height="21" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(150 50 50)">
  <rect x="44" y="-0.5" rx="2.52" ry="2.52" width="12" height="21" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(180 50 50)">
  <rect x="44" y="-0.5" rx="2.52" ry="2.52" width="12" height="21" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(210 50 50)">
  <rect x="44" y="-0.5" rx="2.52" ry="2.52" width="12" height="21" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(240 50 50)">
  <rect x="44" y="-0.5" rx="2.52" ry="2.52" width="12" height="21" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(270 50 50)">
  <rect x="44" y="-0.5" rx="2.52" ry="2.52" width="12" height="21" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(300 50 50)">
  <rect x="44" y="-0.5" rx="2.52" ry="2.52" width="12" height="21" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(330 50 50)">
  <rect x="44" y="-0.5" rx="2.52" ry="2.52" width="12" height="21" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
  </rect>
</g><g/></g></svg>
    );
};




export const SvgLoaderCircle: React.FC = () => { 

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="18"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <g>
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="1.5s"
            calcMode="spline"
            values="0 150;42 150;42 150;42 150"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="1.5s"
            calcMode="spline"
            values="0;-16;-59;-59"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
        </circle>
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="2s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );

};


export const SvgCheckbox: React.FC = () => {
  return (


    <svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 18 18" >
    
    <path fill="none" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M6,9.2l2.4,2.4L13,7" data-name="check-tick"></path>
    
    </svg>
    
  );
};



export const SvgResumeQR: React.FC = () => {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 100 100" fill="#191919">
 
      <path  d="M96,28H72.011V0H100V28H96Zm0-8V4H76.01V24H96V20ZM83.967,20h-4V8h12V20h-8ZM35.986,28h-4V24h4v4ZM71.971,48V44h8v4h4V40h12V32h4V64h-4v4h-4V60h4V52h-4V48h4V44h-4v4h-4V60h-12V56h-4V48Zm8,8h4V52h-4v4Zm-8,8h12v4h8v4h8V88h-4v4h4v8h-12V92h-4V88h8V84h4V80h-4V76h-4V72h-4V88h-4V84h-4v8h-4v4H55.978v4h-8V96h-4V92h-4v4h-4v4h-4V84h4v4h4V76h-4V72h-4V68h8v4h4V88h4v4h12V88h-4V80h-4v4h-4V76h4V68h8v4h-4v4h4V72h4V56h8v8Zm-8,16h-4v4h4V80Zm0,8v4h4V88h4V84h-4v4h-4Zm4-20V80h12V68h-12Zm8,8h-4V72h4v4ZM59.976,52h-8V48h8V40h4V56h-4V52Zm-12-20V24h4V36h-4V32Zm19.992,4V32h4v8h-8V36h4Zm-8-4h-4V16h-4V12h8V8h4v8h4V32h-8Zm4-8h-4v4h4V24Zm-12-16V4h4V0h12V4h-8V8h-8Zm-8,0v8h-8v4h-4V8h4V4h12V8h-4Zm8,8v4h-8V16h8Zm-8,12V44h8v4h-8v4h-12v8h-8v4h4v4h-8V60h-8V56h4V52h4v4h8V52h-4V48h8V44h4V40h4V20h4v8ZM23.99,44v4h-8v4H0V48h12V44h4V36h4v4h8V36h4v8h-8Zm27.989,8v8h-4V56h-4V52h8Zm0,12v4h-4v4h-4V64h-4V60h8v4h4Zm4-4v4h-4V60h4Zm4-4v4h-4V56h4Zm-8-12V40h4v4h-4Zm4-8h4v4h-4V36ZM87.965,80h4v4h-4V80Zm-12-40V36h4V32h12v4h-8v4h-8Zm4,56V92h4v4h-4Zm-35.986,4h-4V96h4v4Zm-8-44h4v4h-4V56ZM8,36H0V32H15.993v4H8ZM23.99,32h4v4h-4V32Zm12,0v4h-4V32h4Zm-4-32h4V4h-4V0ZM47.981,0h4V4h-4V0ZM20.032,28H0.039V0H28.029V28h-8Zm4-8V4H4.038V24H24.03V20ZM11.995,20H8V8h12V20h-8ZM8,56v4H4V56H8ZM4,64H0V60H4v4Zm4,0h4v4H8V64Zm0.04,8H28.029v28H0.039V72h8Zm-4,8V96H24.03V76H4.038v4Zm11.955,0h4V92H8V80h8Z" />

    </svg>

  );
};




// export const Svg: React.FC = () => {
//   return (

//   );
// };
