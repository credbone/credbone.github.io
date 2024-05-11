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
        <rect x="3" y="4" width="14" height="2"></rect>
        <rect x="3" y="9" width="14" height="2"></rect>
        <rect x="3" y="14" width="14" height="2"></rect>
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
            <rect x="9" y="3" width="2" height="14" />
            <rect x="3" y="9" width="14" height="2" />
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
            <rect x="3" y="9" width="14" height="2" />
            <rect x="3" y="9" width="14" height="2" />
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
      height="20"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <g>
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          stroke-width="3"
          stroke-linecap="round"
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

export const SvgLoaderCircleSmall: React.FC = () => { 

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
          stroke-width="2"
          stroke-linecap="round"
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

export const SvgFrFlag: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <rect fill="#324095" x="6" y="8" width="6" height="14"></rect>
      <rect fill="#f4f4f4" x="12" y="8" width="6" height="14"></rect>
      <rect fill="#d81e34" x="18" y="8" width="6" height="14"></rect>
    </svg>
  );
};

export const SvgItFlag: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <rect fill="#009434" x="6" y="8" width="6" height="14"></rect>
      <rect fill="#f4f4f4" x="12" y="8" width="6" height="14"></rect>
      <rect fill="#d81e34" x="18" y="8" width="6" height="14"></rect>
    </svg>
  );
};

export const SvgDeFlag: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <rect fill="currentColor" x="6" y="8" width="18" height="5"></rect>
      <rect fill="#cd2626" x="6" y="13" width="18" height="5"></rect>
      <rect fill="#ffd700" x="6" y="18" width="18" height="5"></rect>
    </svg>
  );
};
export const SvgEsFlag: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <rect fill="#AA151B" x="6" y="8" width="18" height="5"></rect>
      <rect fill="#F1BF00" x="6" y="13" width="18" height="5"></rect>
      <rect fill="#AA151B" x="6" y="18" width="18" height="5"></rect>
    </svg>
  );
};

// export const Svg: React.FC = () => {
//   return (

//   );
// };
