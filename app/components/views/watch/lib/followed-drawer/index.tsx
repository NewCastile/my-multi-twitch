"use client";

import { CloseIcon } from "@/app/components/icons/close-icon";
import { FollowedDrawerProvider } from "@/app/context/drawers";
import useDrawer from "@/app/hooks/use-drawer";
import { useDrawerRenderConditions } from "@/app/hooks/use-drawer-render-conditions";

import FollowedDrawerContent from "./followed-drawer-content";

const FollowedDrawer = () => {
  const drawerId = "followed-drawer";
  const { drawer, drawerRef, isHidden } = useDrawer({ drawerId });
  const { disabled } = useDrawerRenderConditions();

  return (
    <FollowedDrawerProvider {...{ drawer, drawerId, drawerRef, isHidden }}>
      <button
        aria-label={"open"}
        className={
          disabled
            ? "btn-md cursor-not-allowed font-bold uppercase text-monokai-bg-contrast"
            : "btn-md font-bold uppercase"
        }
        disabled={disabled}
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
        {!isHidden && <FollowedDrawerContent />}
      </div>
    </FollowedDrawerProvider>
  );
};

export default FollowedDrawer;
