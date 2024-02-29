import { CloseIcon } from "@/app/components/icons/close-icon";
import useDrawer from "@/app/hooks/use-drawer";

import FollowedDrawerContent from "./followed-drawer-content";

const FollowedDrawer = () => {
  const drawerId = "followed-drawer";
  const { drawerRef, drawer } = useDrawer({ drawerId });

  return (
    <>
      <button
        aria-controls={drawerId}
        className={"btn-md uppercase"}
        data-drawer-placement={"right"}
        data-drawer-show={drawerId}
        data-drawer-target={drawerId}
        type={"button"}
        onClick={(e) => {
          e.preventDefault();
          drawer.show();
        }}
      >
        following
      </button>
      <div
        ref={drawerRef}
        className={
          "fixed right-0 top-0 z-40 h-screen w-[25vw] translate-x-full overflow-y-auto bg-monokai-bg p-4 pb-5 pt-20 text-monokai-white transition-transform"
        }
        id={drawerId}
      >
        <button
          aria-controls={drawerId}
          className={
            "absolute end-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-monokai-bg-contrast"
          }
          data-drawer-hide={drawerId}
          type={"button"}
          onClick={() => {
            drawer.hide();
          }}
        >
          <CloseIcon />
          <span className={"sr-only"}>Close menu</span>
        </button>
        <FollowedDrawerContent />
      </div>
    </>
  );
};

export default FollowedDrawer;
