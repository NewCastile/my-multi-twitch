"use client";

import { Drawer, DrawerOptions, InstanceOptions } from "flowbite";
import { useCallback, useState } from "react";

const useDrawer = ({
  drawerId,
  override = true,
}: {
  drawerId: InstanceOptions["id"];
  override?: InstanceOptions["override"];
}) => {
  const [drawer, setDrawer] = useState<Drawer | null | undefined>(null);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const drawerRef = useCallback((node: HTMLDivElement | null | undefined) => {
    const options: DrawerOptions = {
      placement: "right",
      backdrop: true,
      bodyScrolling: true,
      edge: false,
      edgeOffset: "",
      backdropClasses: "bg-stone-900/80 fixed inset-0 z-30",
      onHide: (_drawer) => {
        setIsHidden(true);
      },
      onShow(_drawer) {
        setIsHidden(false);
      },
    };

    const instanceOptions: InstanceOptions = {
      id: drawerId,
      override,
    };

    if (node !== null) {
      setDrawer(() => new Drawer(node, options, instanceOptions));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { drawerRef, drawer, isHidden } as const;
};

export default useDrawer;
