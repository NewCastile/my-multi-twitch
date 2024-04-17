import { useEffect, useRef } from "react";

import { setAccessToken } from "@/lib/features/tokens/access-token-slice";
import { useLazyGetAppAccessTokenQuery } from "@/lib/features/tokens/app-access-token-api-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store";

export const useFetchAccessToken = () => {
  const { accessToken } = useAppSelector((state) => state.accessToken);

  const dispatch = useAppDispatch();

  const [
    dispatchAppAccesTokenQuery,
    {
      data: appAccessTokenData,
      isError: appAccessTokenIsError,
      isLoading: appAccessTokenIsLoading,
    },
  ] = useLazyGetAppAccessTokenQuery();

  const appAccessTokenQueryRef = useRef(dispatchAppAccesTokenQuery);
  const dispatchRef = useRef(dispatch);

  useEffect(() => {
    const fetchAppAccessToken = async () => {
      const { data } = await appAccessTokenQueryRef.current({ key: "" });

      if (!data || "message" in data) return;

      const { access_token: appAccessToken } = data;

      dispatchRef.current(setAccessToken({ accessToken: appAccessToken }));
    };

    if (!accessToken) {
      fetchAppAccessToken();
    }
  }, [accessToken]);

  if (appAccessTokenData && "access_token" in appAccessTokenData) {
    return {
      accessToken: appAccessTokenData.access_token,
      appAccessTokenIsError,
      appAccessTokenIsLoading,
    };
  }

  return {
    accessToken,
    appAccessTokenIsError,
    appAccessTokenIsLoading,
  };
};
