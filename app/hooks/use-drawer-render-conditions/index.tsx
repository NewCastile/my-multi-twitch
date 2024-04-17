import { useEffect, useState } from "react";

import { useFetchAccessToken } from "../use-fetch-access-token";

export const useDrawerRenderConditions = () => {
  const { userAccessToken, appAccessTokenData, appAccessTokenIsError, appAccessTokenIsLoading } =
    useFetchAccessToken();

  const [disabled, setDisabled] = useState<boolean>(
    () => appAccessTokenIsLoading || appAccessTokenIsError || !appAccessTokenData,
  );

  const [accessTokenAvailable, setAccessTokenAvailable] = useState<boolean>(() => {
    if (appAccessTokenData && "message" in appAccessTokenData) return false;
    if (!userAccessToken) return false;

    return true;
  });

  useEffect(() => {
    if (userAccessToken || (appAccessTokenData && "access_token" in appAccessTokenData)) {
      setDisabled(false);
    }

    setAccessTokenAvailable(() => {
      if (appAccessTokenData && "message" in appAccessTokenData) return false;
      if (!userAccessToken) return false;

      return true;
    });
  }, [userAccessToken, appAccessTokenData]);

  return { accessTokenAvailable, disabled };
};
