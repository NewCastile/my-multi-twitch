import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/lib/store";

type ProfileState = RootState["profile"];
type AccesTokenState = RootState["accessToken"];

export const selectProfile = (state: RootState): ProfileState => state.profile;

export const selectAccessToken = (state: RootState): AccesTokenState => state.accessToken;

export const selectFollowedDrawersVars = createSelector(
  [selectProfile, selectAccessToken],
  (profile, accessToken) => {
    return { profile, accessToken };
  },
);
