import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import broadcastersReducer from "./features/broadcasts/broadcasts-slice";
import followedReducer from "./features/followed/followed-slice";
import { searchApi } from "./features/search/search-api-slice";
import searchChannelsReducer from "./features/search/search-channels-slice";
import accessTokenReducer from "./features/tokens/access-token-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      broadcasts: broadcastersReducer,
      accessToken: accessTokenReducer,
      followed: followedReducer,
      searchApi: searchApi.reducer,
      searchChannels: searchChannelsReducer,
    },
    middleware(getDefaultMiddleWare) {
      return getDefaultMiddleWare().concat(searchApi.middleware);
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
