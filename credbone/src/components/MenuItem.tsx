import { ReactNode, HTMLAttributes } from "react";
import Ripple from "./Ripple";

interface MenuItemProps extends HTMLAttributes<HTMLElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
}

export default function MenuItem({
  icon,
  title,
  description,
  ...rest
}: MenuItemProps) {
  return (

<>

<Ripple>
        <group
        data-align="center"
        data-gap="15"
        data-interactive=""
        data-radius="15"
        data-cursor="pointer"
        data-wrap="no"
        data-contain=""
        data-over-color="neutral"
        {...rest}

        
        
      >
        <group data-length="20" data-opacity="30" data-interact="">
          {icon && <>{icon}</>}
        </group>

        <group data-direction="column" data-width="auto" data-contain="">
          <text data-weight="700" data-ellipsis="">{title}</text>
          {description && <text data-opacity="30" data-ellipsis="">{description}</text>}
        </group>
      </group>
</Ripple>

</>

  );
}
