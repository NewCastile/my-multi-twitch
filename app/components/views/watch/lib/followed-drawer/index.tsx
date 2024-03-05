"use client";

import { CloseIcon } from "@/app/components/icons/close-icon";
import { FollowedDrawerProvider } from "@/app/context/drawers";
import useDrawer from "@/app/hooks/use-drawer";

import FollowedDrawerContent from "./followed-drawer-content";

const FollowedDrawer = () => {
  const drawerId = "followed-drawer";
  const { drawer, drawerRef } = useDrawer({ drawerId });

  return (
    <FollowedDrawerProvider {...{ drawer, drawerId, drawerRef }}>
      <button
        className={"btn-md uppercase"}
        type={"button"}
        onClick={(e) => {
          e.preventDefault();
          if (drawer) {
            drawer.show();
          }
        }}
      >
        following
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
        <FollowedDrawerContent />
      </div>
    </FollowedDrawerProvider>
  );
};

export default FollowedDrawer;
