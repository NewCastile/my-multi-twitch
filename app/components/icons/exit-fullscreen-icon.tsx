"use client";

import { DEFAULT_ICON_SIZE } from "@/constants";
import { IconProps } from "@/types";

const ExitFullScreenIcon = ({ size = DEFAULT_ICON_SIZE }: IconProps) => {
  return (
    <svg height={size} viewBox={"0 0 14 14"} width={size}>
      <path
        d={
          "M0,11 L3,11 L3,14 L5,14 L5,9 L0,9 L0,11 L0,11 Z M3,3 L0,3 L0,5 L5,5 L5,0 L3,0 L3,3 L3,3 Z M9,14 L11,14 L11,11 L14,11 L14,9 L9,9 L9,14 L9,14 Z M11,3 L11,0 L9,0 L9,5 L14,5 L14,3 L11,3 L11,3 Z"
        }
        fill={"currentColor"}
      />
    </svg>
  );
};

export default ExitFullScreenIcon;
