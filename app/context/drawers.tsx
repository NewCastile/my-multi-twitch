import { createContext } from "react";

import { DrawerContextProps } from "@/types";

export const SearchDrawerContext = createContext<DrawerContextProps | undefined>(undefined);
export const FollowedDrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const SearchDrawerProvider = ({
  children,
  drawer,
  drawerId,
  drawerRef,
}: { children: React.ReactNode } & DrawerContextProps) => {
  return (
    <SearchDrawerContext.Provider value={{ drawer, drawerId, drawerRef }}>
      {children}
    </SearchDrawerContext.Provider>
  );
};

export const FollowedDrawerProvider = ({
  children,
  drawer,
  drawerId,
  drawerRef,
}: { children: React.ReactNode } & DrawerContextProps) => {
  return (
    <FollowedDrawerContext.Provider value={{ drawer, drawerId, drawerRef }}>
      {children}
    </FollowedDrawerContext.Provider>
  );
};
