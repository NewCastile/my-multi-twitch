import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import broadcastersReducer from "./features/broadcasts/broadcasts-slice";
import followedReducer from "./features/followed/followed-slice";
import { followedsApi } from "./features/followed/followeds-api-slice";
import { searchApi } from "./features/search/search-api-slice";
import searchChannelsReducer from "./features/search/search-channels-slice";
import accessTokenReducer from "./features/tokens/access-token-slice";
import { appAccessTokenApi } from "./features/tokens/app-access-token-api-slice";
import profileReducer from "./features/user/profile-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      broadcasts: broadcastersReducer,
      accessToken: accessTokenReducer,
      followed: followedReducer,
      searchChannels: searchChannelsReducer,
      profile: profileReducer,
      searchApi: searchApi.reducer,
      followedsApi: followedsApi.reducer,
      appAccessTokenApi: appAccessTokenApi.reducer,
    },
    middleware(getDefaultMiddleWare) {
      return getDefaultMiddleWare().concat(
        searchApi.middleware,
        followedsApi.middleware,
        appAccessTokenApi.middleware,
      );
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
