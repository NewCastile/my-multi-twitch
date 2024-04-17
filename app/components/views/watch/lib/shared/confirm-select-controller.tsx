import { useRouter } from "next/navigation";

import { AddIcon } from "@/app/components/icons/add-icon";
import { DeleteIcon } from "@/app/components/icons/delete-icon";
import useDrawerContext from "@/app/hooks/use-drawer-context";
import { DEFAULT_ICON_SIZE } from "@/constants";
import { IconProps, SelectAction } from "@/types";

const ConfirmSelectController = ({
  route,
  children,
}: {
  route: string;
  children?: React.ReactNode;
}) => {
  const context = useDrawerContext();
  const router = useRouter();

  return (
    <span
      className={`rounded-full border-2 border-monokai-bg-contrast bg-monokai-red-primary p-2`}
      role={"link"}
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        if (context) {
          const { drawer } = context;

          if (drawer) {
            drawer.hide();
          }
        }
        router.push(route);
      }}
    >
      {children}
    </span>
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
