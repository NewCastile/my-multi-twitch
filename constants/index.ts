import { DrawerOptions } from "flowbite";

export const MAX_BROADCASTS_NUMBER = 9;
export const FOLLOWED_ITEMS_PER_PAGE = 7;
export const SEARCH_ITEMS_PER_PAGE = 20;
export const DEFAULT_ICON_SIZE = "1rem";

export const INITIAL_PAGE_ROUTE = "/watch/knekro/alimentacionchino/jujalag/zackrawrr/werlyb";

export const ERRORS_STATUSES = [
  {
    status: 401,
    statusText: "Unauthorized",
  },
  {
    status: 400,
    statusText: "Bad Request",
  },
];

export const DEFAULT_DRAWER_OPTIONS: DrawerOptions = {
  placement: "right",
  backdrop: true,
  bodyScrolling: true,
  edge: false,
  edgeOffset: "",
  backdropClasses: "bg-stone-900/80 fixed inset-0 z-30",
};
