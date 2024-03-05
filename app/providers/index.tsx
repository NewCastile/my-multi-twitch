"use client";
import { useRef } from "react";
import { Provider as StoreProvider } from "react-redux";

import { AppStore, makeStore } from "@/lib/store";

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <StoreProvider store={storeRef.current}>{children}</StoreProvider>;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};
