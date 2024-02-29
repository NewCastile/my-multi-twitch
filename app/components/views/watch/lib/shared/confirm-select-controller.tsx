import Link from "next/link";

import { AddIcon } from "@/app/components/icons/add-icon";
import { DeleteIcon } from "@/app/components/icons/delete-icon";
import { DEFAULT_ICON_SIZE } from "@/constants";
import { IconProps, SelectAction } from "@/types";

const ConfirmSelectController = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <Link href={href}>
      <div
        className={`rounded-full border-2 border-monokai-bg-contrast bg-monokai-red-primary p-2`}
        onClick={onClick}
      >
        {children}
      </div>
    </Link>
  );
};

export const ConfirmSelectControllerIcon = ({
  selectAction,
  size = DEFAULT_ICON_SIZE,
}: { selectAction: SelectAction } & IconProps) => {
  const MatchingAction = SelectActionIcons.find((entrie) => entrie.action === selectAction);

  return MatchingAction ? <MatchingAction.icon size={size} /> : null;
};

const SelectActionIcons = [
  {
    action: "filter",
    icon: ({ size }: IconProps) => <DeleteIcon size={size} />,
  },
  {
    action: "add",
    icon: ({ size }: IconProps) => <AddIcon size={size} />,
  },
];

export default ConfirmSelectController;
