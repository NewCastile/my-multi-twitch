"use client";

import { CloseIcon } from "@/app/components/icons/close-icon";
import { SearchDrawerProvider } from "@/app/context/drawers";
import useDrawer from "@/app/hooks/use-drawer";

import SearchDrawerContent from "./search-drawer-content";

const SearchDrawerClientComponent = () => {
  const drawerId = "search-drawer";
  const { drawer, drawerRef } = useDrawer({ drawerId });

  return (
    <SearchDrawerProvider {...{ drawer, drawerId, drawerRef }}>
      <button
        aria-label={"open"}
        className={"btn-md font-bold uppercase"}
        type={"button"}
        onClick={(e) => {
          e.preventDefault();
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
          "fixed right-0 top-0 z-40 h-screen w-[25vw] translate-x-full overflow-y-auto bg-[#303025] p-4 pb-5 pt-20 text-monokai-white transition-transform"
        }
        tabIndex={-1}
      >
        <button
          className={
            "absolute end-2.5 top-2.5 inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-monokai-white"
          }
          tabIndex={-1}
          type={"button"}
          onClick={() => {
            if (drawer) {
              drawer.hide();
            }
          }}
        >
          <CloseIcon />
        </button>
        <SearchDrawerContent />
      </div>
    </SearchDrawerProvider>
  );
};

export default SearchDrawerClientComponent;
