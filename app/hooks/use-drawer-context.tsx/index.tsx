import { useContext } from "react";

import { FollowedDrawerContext, SearchDrawerContext } from "@/app/context/drawers";

const useDrawerContext = () => {
  const followedDrawerContext = useContext(FollowedDrawerContext);
  const searchDrawerContext = useContext(SearchDrawerContext);

  if (followedDrawerContext !== undefined) {
    return followedDrawerContext;
  }

  if (searchDrawerContext !== undefined) {
    return searchDrawerContext;
  }
};

export default useDrawerContext;
