import { DEFAULT_ICON_SIZE } from "@/constants";
import { IconProps } from "@/types";

const LogoutIcon = ({ size = DEFAULT_ICON_SIZE }: IconProps) => {
  return (
    <svg
      fill={"none"}
      height={size}
      stroke={"currentColor"}
      viewBox={"0 0 24 24"}
      width={size}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <path d={"M0 0h24v24H0z"} fill={"none"} stroke={"none"} />
      <path d={"M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"} />
      <path d={"M9 12h12l-3 -3"} />
      <path d={"M18 15l3 -3"} />
    </svg>
  );
};

export default LogoutIcon;
