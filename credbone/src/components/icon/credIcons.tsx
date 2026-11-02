import React from "react";

interface IconProps {
  size?: number;
  fill?: boolean;
  stroke?: number;
}

const Icon: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 24,
  fill = false,
  children,
}) => {
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

export const IconSearch: React.FC<IconProps> = ({
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon {...restProps}>
      <circle
        cx="11.5"
        cy="11.5"
        r="6.5"
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <line
        x1="16.1"
        y1="16.1"
        x2="20"
        y2="20"
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
    </Icon>
  );
};

export const IconHome: React.FC<IconProps> = ({
  fill = false,
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <path
        d="m18.25,17.89c0,1.12-.9,2.02-2,2.02h-8c-1.1,0-2-.91-2-2.02,0,0,0-4.17,0-7.64l6-5.33,6,5.33c0,3.43,0,7.55,0,7.64Z"
        fill={fill ? "currentColor" : "none"}
      />
      <path
        d="m18,10.33v7.67c0,1.1-.9,2-2,2h-8c-1.1,0-2-.9-2-2v-7.67"
        fill="none"
        stroke="currentcolor"
        strokeMiterlimit="10"
        strokeWidth={stroke}
      />
      <g
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth={stroke}
      >
        <line x1="12" y1="5" x2="20" y2="12" />
        <line x1="4" y1="12" x2="12" y2="5" />
      </g>
    </Icon>
  );
};

export const IconShare: React.FC<IconProps> = ({
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon {...restProps}>
      <g
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth={stroke}
      >
        <circle cx="7" cy="12" r="3" />
        <circle cx="17" cy="18" r="3" />
        <line x1="9.57" y1="13.54" x2="14.43" y2="16.46" />
        <circle cx="17" cy="6" r="3" />
        <line x1="9.57" y1="10.46" x2="14.43" y2="7.54" />
      </g>
    </Icon>
  );
};

export const IconMore: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <g fill="currentcolor">
        <circle cx="18" cy="12" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="6" cy="12" r="1.5" />
      </g>
    </Icon>
  );
};

export const IconMoreHoriz: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <g fill="currentcolor">
        <circle cx="12" cy="6" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="12" cy="18" r="1.5" />
      </g>
    </Icon>
  );
};

export const IconHeart: React.FC<IconProps> = ({
  fill = false,
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth={stroke}
        fill={fill ? "currentColor" : "none"}
      >
        <path d="m5.37,12.3l6.73,6.67,6.73-6.67c1.69-1.68,1.69-4.39,0-6.07-1.69-1.68-4.43-1.68-6.12,0l-.61.61-.61-.61c-1.69-1.68-4.43-1.68-6.12,0s-1.69,4.39,0,6.07Z" />
      </g>
    </Icon>
  );
};

export const IconStar: React.FC<IconProps> = ({
  fill = false,
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth={stroke}
        fill={fill ? "currentColor" : "none"}
      >
        <path d="M11.6,5.6c0.4-0.8,1.4-0.8,1.8,0l1.7,3.5l3.9,0.5c0.8,0.1,1.2,1.1,0.6,1.7L16.6,14l0.7,3.8c0.2,0.8-0.7,1.5-1.5,1.1L12.5,17l-3.4,1.9c-0.7,0.4-1.6-0.2-1.5-1.1L8.3,14l-2.8-2.7C4.9,10.7,5.2,9.7,6,9.6l3.9-0.5L11.6,5.6z" />
      </g>
    </Icon>
  );
};

export const IconSettings: React.FC<IconProps> = ({
  fill = false,
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <path
        fill={fill ? "currentColor" : "none"}
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth={stroke}
        xmlns="http://www.w3.org/2000/svg"
        d="m18.66,6.5l-5.33-3.14c-.82-.48-1.83-.48-2.65,0l-5.33,3.14c-.83.49-1.34,1.4-1.34,2.38v6.23c0,.98.51,1.89,1.34,2.38l5.33,3.14c.82.48,1.83.48,2.65,0l5.33-3.14c.83-.49,1.34-1.4,1.34-2.38v-6.23c0-.98-.51-1.89-1.34-2.38Zm-6.66,8.5c-1.66,0-3-1.34-3-3s1.34-3,3-3,3,1.34,3,3-1.34,3-3,3Z"
      />
    </Icon>
  );
};

export const IconFold: React.FC<IconProps> = ({
  fill = false,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <path
        fill="currentColor"
        d="M20.47,7.37s0,0,0-.08l-.06-.15a.71.71,0,0,0-.07-.09.94.94,0,0,0-.09-.12l-.09-.07L20,6.78l-7.5-4.63a1,1,0,0,0-1.06,0L4,6.78l-.09.08-.09.07a.94.94,0,0,0-.09.12.71.71,0,0,0-.07.09l-.06.15s0,0,0,.08a1.15,1.15,0,0,0,0,.26v8.74a1,1,0,0,0,.47.85l7.5,4.63h0a.47.47,0,0,0,.15.06s.05,0,.08,0a.86.86,0,0,0,.52,0s.05,0,.08,0a.47.47,0,0,0,.15-.06h0L20,17.22a1,1,0,0,0,.47-.85V7.63A1.15,1.15,0,0,0,20.47,7.37ZM11,19.21l-5.5-3.4V9.43L11,12.82Zm1-8.12L6.4,7.63,12,4.18l5.6,3.45Zm6.5,4.72L13,19.21V12.82l5.5-3.39Z"
      />

      {/* <path fill="currentColor" d="m6,17.59l6,2.4V6.39l-6-2.4v13.6Zm-.75,1.85c-.38-.15-.69-.39-.91-.73s-.34-.71-.34-1.13V3.99c0-.55.2-1.02.59-1.41s.86-.59,1.41-.59l6.7,2.53c.38.15.7.4.94.74s.36.72.36,1.14v13.6c0,.72-.29,1.27-.88,1.66-.58.39-1.21.45-1.88.19l-6-2.4Zm6.75-.45v-2h6V3.99H6V1.99h12c.55,0,1.02.2,1.41.59s.59.86.59,1.41v13c0,.55-.2,1.02-.59,1.41s-.86.59-1.41.59h-6Zm-6-1.4V3.99v13.6Z" /> */}
    </Icon>
  );
};

export const IconBook: React.FC<IconProps> = ({
  fill = false,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <path
        d="m18,2H8c-2.21,0-4,1.79-4,4v12c0,2.21,1.79,4,4,4h10c1.1,0,2-.9,2-2V4c0-1.1-.9-2-2-2ZM6,6c0-1.1.9-2,2-2h10v10H8c-.7,0-1.4.2-2,.56V6Zm2,14c-1.1,0-2-.9-2-2s.9-2,2-2h10v4H8Z"
        fill="currentColor"
      />
    </Icon>
  );
};

export const IconInfo: React.FC<IconProps> = ({
  fill = false,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        fill={fill ? "currentColor" : "none"}
      >
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <circle cx="12" cy="12" r="9" />
        <line x1="12" x2="12.01" y1="8" y2="8" />
        <polyline points="11 12 12 12 12 16 13 16" />
      </g>
    </Icon>
  );
};

export const IconBulb: React.FC<IconProps> = ({
  fill = false,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        fill={fill ? "currentColor" : "none"}
      >
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
        <line x1="9.7" x2="14.3" y1="17" y2="17" />
      </g>
    </Icon>
  );
};

export const IconThumbUp: React.FC<IconProps> = ({
  fill = false,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <path
        fill="currentColor"
        d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"
      />
    </Icon>
  );
};

export const IconPicker: React.FC<IconProps> = ({
  fill = false,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        fill={fill ? "currentColor" : "none"}
      >
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M11 7l6 6" />
        <path d="M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z" />
      </g>
    </Icon>
  );
};

export const IconViewStream: React.FC<IconProps> = ({
  fill = false,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <path
        fill="currentColor"
        d="m19,17v-4H5v4h14Zm0-6v-4H5v4h14Zm-14,8c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41V7c0-.55.2-1.02.59-1.41.39-.39.86-.59,1.41-.59h14c.55,0,1.02.2,1.41.59s.59.86.59,1.41v10c0,.55-.2,1.02-.59,1.41s-.86.59-1.41.59H5Z"
      />
    </Icon>
  );
};

export const IconTableRows: React.FC<IconProps> = ({
  fill = false,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <path
        fill="currentColor"
        d="m19,19v-3H5v3h14Zm0-5v-4H5v4h14Zm0-6v-3H5v3h14Zm-14,13c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41V5c0-.55.2-1.02.59-1.41.39-.39.86-.59,1.41-.59h14c.55,0,1.02.2,1.41.59s.59.86.59,1.41v14c0,.55-.2,1.02-.59,1.41-.39.39-.86.59-1.41.59H5Z"
      />{" "}
    </Icon>
  );
};

export const IconViewWindow: React.FC<IconProps> = ({
  fill = false,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <path
        fill="currentColor"
        d="m5,21c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41V5c0-.55.2-1.02.59-1.41.39-.39.86-.59,1.41-.59h14c.55,0,1.02.2,1.41.59s.59.86.59,1.41v14c0,.55-.2,1.02-.59,1.41-.39.39-.86.59-1.41.59H5Zm8-8v6h6v-6h-6Zm0-2h6v-6h-6v6Zm-2,0v-6h-6v6h6Zm0,2h-6v6h6v-6Z"
      />
    </Icon>
  );
};

export const IconViewColumn: React.FC<IconProps> = ({
  fill = false,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <path
        fill="currentColor"
        d="m3.03,17V7c0-.55.2-1.02.59-1.41s.86-.59,1.41-.59h13.98c.55,0,1.02.2,1.41.59s.59.86.59,1.41v10c0,.55-.2,1.02-.59,1.41s-.86.59-1.41.59H5.03c-.55,0-1.02-.2-1.41-.59s-.59-.86-.59-1.41Zm1.98,0h3.33V7h-3.33v10Zm5.33,0h3.33V7h-3.33v10Zm5.33,0h3.33V7h-3.33v10Z"
      />
    </Icon>
  );
};

export const IconPlane: React.FC<IconProps> = ({
  fill = false,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        fill={fill ? "currentColor" : "none"}
        d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"
      />
    </Icon>
  );
};

export const IconClick: React.FC<IconProps> = ({
  fill = false,
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth={stroke}
      >
        <path d="M3 12l3 0" />
        <path d="M12 3l0 3" />
        <path d="M7.8 7.8l-2.2 -2.2" />
        <path d="M16.2 7.8l2.2 -2.2" />
        <path d="M7.8 16.2l-2.2 2.2" />
        <path
          fill={fill ? "currentColor" : "none"}
          d="M12 12l9 3l-4 2l-2 4l-3 -9"
        />
      </g>
    </Icon>
  );
};

export const IconCarousel: React.FC<IconProps> = ({
  fill = false,
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth={stroke}
      >
        {/* <path stroke="none" d="M0 0h24v24H0z" fill="none" /> */}
        <path d="M7 6a1 1 0 0 1 1 -1h8a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1l0 -12" />
        <path d="M22 17h-1a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h1" />
        <path d="M2 17h1a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-1" />
      </g>
    </Icon>
  );
};

export const IconHomeAlternate: React.FC<IconProps> = ({
  fill = false,
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth={stroke}
      >
        <path d="M3 11.992V14.502C3 17.802 3 19.452 4.025 20.477C5.05 21.502 6.7 21.502 10 21.502H14C17.3 21.502 18.95 21.502 19.975 20.477C21 19.452 21 17.802 21 14.502V11.992C21 10.31 21 9.46995 20.644 8.74195C20.288 8.01395 19.624 7.49795 18.298 6.46595L16.298 4.91095C14.233 3.30495 13.2 2.50195 12 2.50195C10.8 2.50195 9.767 3.30495 7.702 4.91095L5.702 6.46595C4.375 7.49795 3.712 8.01395 3.356 8.74195C3 9.46995 3 10.31 3 11.992Z" />
        <path d="M15 21.501V16.501V16.501C15 15.087 15 14.38 14.56 13.941C14.121 13.501 13.414 13.501 12 13.501C10.586 13.501 9.879 13.501 9.44 13.941C9 14.379 9 15.086 9 16.501V21.501" />

        {/* <path xmlns="http://www.w3.org/2000/svg" d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"/> */}
      </g>
    </Icon>
  );
};

export const IconBookOpen: React.FC<IconProps> = ({
  fill = false,
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth={stroke}
      >
        <path d="M7.99805 4.98047H5.99805C4.11205 4.98047 3.17005 4.98047 2.58405 5.56647C1.99805 6.15247 1.99805 7.09547 1.99805 8.98147V15.8805C1.99805 17.3805 1.99805 18.1305 2.38005 18.6555C2.50352 18.8255 2.65303 18.975 2.82305 19.0985C3.34905 19.4805 4.09805 19.4805 5.59705 19.4805H8.94905C9.66789 19.4806 10.3645 19.7298 10.9204 20.1855C11.4762 20.6413 11.8571 21.2756 11.998 21.9805V6.98047L11.9914 6.97162C11.7028 6.58749 11.5568 6.39319 11.399 6.22647C10.7543 5.54687 9.8915 5.11511 8.96105 5.00647C8.73105 4.98047 8.48605 4.98047 7.99805 4.98047Z" />
        <path d="M11.998 6.97952V21.9795C12.1391 21.2745 12.52 20.6401 13.0761 20.1843C13.6322 19.7285 14.329 19.4794 15.048 19.4795H18.398C19.897 19.4795 20.646 19.4795 21.172 19.0975C21.3434 18.9735 21.4914 18.8258 21.616 18.6545C21.998 18.1285 21.998 17.3785 21.998 15.8785V7.47852C21.998 7.01352 21.998 6.78152 21.96 6.58852C21.8829 6.20036 21.6924 5.8438 21.4126 5.56397C21.1328 5.28414 20.7762 5.09362 20.388 5.01652C20.195 4.97852 19.963 4.97852 19.498 4.97852" />
        <path d="M11.9963 7.47948C11.9963 7.47948 11.7663 2.24248 16.0133 1.20648C16.8253 1.00848 17.2313 0.909484 17.6133 1.20948C17.9953 1.50948 17.9963 1.99948 17.9963 2.97948V13.4795C17.9963 14.3495 17.9963 14.7835 17.7833 15.0555C17.5693 15.3265 17.0503 15.4535 16.0133 15.7065C11.7663 16.7425 11.9963 21.9805 11.9963 21.9805" />
      </g>
    </Icon>
  );
};

export const IconGear: React.FC<IconProps> = ({
  fill = false,
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth={stroke}
      >
        <path d="M11.9984 8.39863C12.4712 8.39863 12.9393 8.49175 13.3761 8.67267C13.8129 8.85358 14.2097 9.11876 14.544 9.45305C14.8783 9.78734 15.1435 10.1842 15.3244 10.621C15.5053 11.0577 15.5984 11.5259 15.5984 11.9986C15.5984 12.4714 15.5053 12.9395 15.3244 13.3763C15.1435 13.8131 14.8783 14.2099 14.544 14.5442C14.2097 14.8785 13.8129 15.1437 13.3761 15.3246C12.9393 15.5055 12.4712 15.5986 11.9984 15.5986C11.0437 15.5986 10.128 15.2193 9.45285 14.5442C8.77772 13.8691 8.39844 12.9534 8.39844 11.9986C8.39844 11.0439 8.77772 10.1282 9.45285 9.45305C10.128 8.77792 11.0437 8.39863 11.9984 8.39863Z" />
        <path d="M2.47314 8.23182V15.7677C2.47314 16.8395 3.04494 17.8299 3.97314 18.3658L10.4994 22.1337C11.4276 22.6696 12.5712 22.6696 13.4994 22.1337L20.0257 18.3658C20.9539 17.8299 21.5257 16.8395 21.5257 15.7677V8.23182C21.5257 7.16002 20.9539 6.16964 20.0257 5.63374L13.4994 1.86579C12.5712 1.32989 11.4276 1.32989 10.4994 1.86579L3.97314 5.63374C3.04494 6.16964 2.47314 7.16002 2.47314 8.23182Z" />
      </g>
    </Icon>
  );
};

export const IconCube: React.FC<IconProps> = ({
  fill = false,
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth={stroke}
      >
        <path d="M2.64859 8.67866V15.3217C2.64859 16.6079 3.33474 17.7963 4.44859 18.4394L10.2017 21.761C11.3155 22.404 12.6878 22.404 13.8017 21.761L19.5547 18.4394C20.6686 17.7963 21.3547 16.6079 21.3547 15.3217V8.67866C21.3547 7.3925 20.6686 6.20404 19.5547 5.56096L13.8017 2.23943C12.6878 1.59635 11.3155 1.59635 10.2017 2.23943L4.44859 5.56096C3.33474 6.20404 2.64859 7.3925 2.64859 8.67866Z" />
        <path d="M3.2998 7L11.9998 12L20.6998 7" />
        <path d="M12 22V12" />
      </g>
    </Icon>
  );
};

export const IconSunAlternate: React.FC<IconProps> = ({
  fill = false,
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon fill={fill} {...restProps}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth={stroke}
      >
        <path d="M16.9985 12.001C16.9985 13.3271 16.4718 14.5988 15.5341 15.5365C14.5964 16.4742 13.3246 17.001 11.9985 17.001C10.6725 17.001 9.40068 16.4742 8.463 15.5365C7.52532 14.5988 6.99854 13.3271 6.99854 12.001C6.99854 10.6749 7.52532 9.40312 8.463 8.46544C9.40068 7.52776 10.6725 7.00098 11.9985 7.00098C13.3246 7.00098 14.5964 7.52776 15.5341 8.46544C16.4718 9.40312 16.9985 10.6749 16.9985 12.001Z" />
        <path d="M12 1V3.50015M12 20.5018V23.002M20.07 20.0727L18.01 18.0126M5.99 5.98939L3.928 3.93029M23 12.001H20.5M3.5 12.001H1M20.071 3.92929L18.011 5.98939M5.99 18.0126L3.93 20.0727" />
      </g>
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

export const IconSun: React.FC<IconProps> = ({
  fill = false,
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon {...restProps}>
      <g
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth={stroke}
      >
        <circle fill={fill ? "currentColor" : "none"} cx="12" cy="12" r="4" />
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

export const IconDelete: React.FC<IconProps> = ({
  fill = false,
  stroke = 2,
  ...restProps
}) => {
  return (
    <Icon {...restProps}>
      <path
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 9L11 15M11 9L17 15M2.72 12.96L7.04 18.72C7.392 19.1893 7.568 19.424 7.79105 19.5932C7.9886 19.7432 8.21232 19.855 8.45077 19.9231C8.72 20 9.01334 20 9.6 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H9.6C9.01334 4 8.72 4 8.45077 4.07689C8.21232 4.14499 7.9886 4.25685 7.79105 4.40675C7.568 4.576 7.392 4.81067 7.04 5.28L2.72 11.04C2.46181 11.3843 2.33271 11.5564 2.28294 11.7454C2.23902 11.9123 2.23902 12.0877 2.28294 12.2546C2.33271 12.4436 2.46181 12.6157 2.72 12.96Z"
      />
    </Icon>
  );
};

export const IconDemo: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="100%"
      width="100%"
      viewBox="0 0 112 24"
      fill="currentcolor"
    >
      <path
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5,11.5A6.5,6.5 0,1,1 18,11.5A6.5,6.5 0,1,1 5,11.5"
        className="cred-icon-demo_0"
      ></path>
      <path
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16.1,16.1L20,20"
        className="cred-icon-demo_1"
      ></path>
      <path
        d="m62,10.33v7.67c0,1.1-.9,2-2,2h-8c-1.1,0-2-.9-2-2v-7.67"
        fill="none"
        stroke="currentcolor"
        strokeMiterlimit="10"
        strokeWidth="2"
        className="cred-icon-demo_4"
      ></path>
      <path
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M56,5L64,12"
        className="cred-icon-demo_5"
      ></path>
      <path
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M48,12L56,5"
        className="cred-icon-demo_6"
      ></path>
      <path
        d="m99.09,5.56c.36-.77,1.45-.77,1.81,0l1.66,3.54,3.88.49c.84.11,1.18,1.14.56,1.72l-2.85,2.68.74,3.84c.16.83-.72,1.47-1.46,1.06l-3.43-1.89-3.43,1.89c-.74.41-1.62-.23-1.46-1.06l.73-3.84-2.85-2.68c-.62-.58-.28-1.62.56-1.72l3.88-.49,1.66-3.54Z"
        fill="none"
        stroke="currentcolor"
        strokeMiterlimit="10"
        strokeWidth="2"
        className="cred-icon-demo_7"
      ></path>
    </svg>
  );
};

// export const Svg: React.FC = () => {
//   return (

//   );
// };
