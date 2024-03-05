"use client";

import { Drawer, DrawerOptions, InstanceOptions } from "flowbite";
import { useCallback, useState } from "react";

import { defaultDrawerOptions } from "@/constants";

const useDrawer = ({
  drawerId,
  override = true,
  options = defaultDrawerOptions,
}: {
  drawerId: InstanceOptions["id"];
  override?: InstanceOptions["override"];
  options?: DrawerOptions;
}) => {
  const [drawer, setDrawer] = useState<Drawer | null | undefined>(null);
  const drawerRef = useCallback((node: HTMLDivElement | null | undefined) => {
    // instance options object
    const instanceOptions: InstanceOptions = {
      id: drawerId,
      override,
    };

    if (node !== null) {
      setDrawer(() => new Drawer(node, options, instanceOptions));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { drawerRef, drawer } as const;
};

export default useDrawer;
