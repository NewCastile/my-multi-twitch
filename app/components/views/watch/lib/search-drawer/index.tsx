"use client";

import { CloseIcon } from "@/app/components/icons/close-icon";
import { SearchDrawerProvider } from "@/app/context/drawers";
import useDrawer from "@/app/hooks/use-drawer";

import SearchDrawerContent from "./search-drawer-content";

const SearchDrawer = () => {
  const drawerId = "search-drawer";
  const { drawer, drawerRef } = useDrawer({ drawerId });

  return (
    <SearchDrawerProvider {...{ drawer, drawerId, drawerRef }}>
      <button
        className={"btn-md uppercase"}
        type={"button"}
        onClick={() => {
          if (drawer) {
            drawer.show();
          }
        }}
      >
        search
      </button>
      <div
        ref={drawerRef}
        className={
          "fixed right-0 top-0 z-40 h-screen w-[25vw] translate-x-full overflow-y-auto bg-monokai-bg p-4 pb-5 pt-20 text-monokai-white transition-transform"
        }
      >
        <button
          className={
            "absolute end-2.5 top-2.5 inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-monokai-bg-contrast"
          }
          type={"button"}
          onClick={() => {
            if (drawer) {
              drawer.hide();
            }
          }}
        >
          <CloseIcon />
          <span className={"sr-only"}>Close menu</span>
        </button>
        <SearchDrawerContent />
      </div>
    </SearchDrawerProvider>
  );
};

export default SearchDrawer;
