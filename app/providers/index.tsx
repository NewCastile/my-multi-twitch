"use client";
import { RefObject, useRef, useState } from "react";
import { Provider as StoreProvider } from "react-redux";

import { SoundContext } from "@/lib/context";
import { AppStore, makeStore } from "@/lib/store";

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <StoreProvider store={storeRef.current}>{children}</StoreProvider>;
};

export const SoundContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [references, setReferences] = useState<
    Array<{ ref: RefObject<HTMLDivElement>; isMuted: boolean }>
  >([]);

  return (
    <SoundContext.Provider value={{ references, setReferences }}>{children}</SoundContext.Provider>
  );
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <SoundContextProvider>{children}</SoundContextProvider>
    </ReduxProvider>
  );
};
