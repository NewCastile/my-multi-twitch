"use client";

import { DEFAULT_ICON_SIZE } from "@/constants";
import { IconProps } from "@/types";

export const AddIcon = ({ size = DEFAULT_ICON_SIZE }: IconProps) => (
  <svg
    aria-hidden={"true"}
    fill={"none"}
    height={size}
    viewBox={"0 0 18 18"}
    width={size}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path d={"M9 1v16M1 9h16"} stroke={"currentColor"} strokeWidth={"2"} />
  </svg>
);
