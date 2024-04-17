import { useEffect, useState } from "react";

import { useFetchAccessToken } from "../use-fetch-access-token";

export const useDrawerRenderConditions = () => {
  const { accessToken, appAccessTokenIsError, appAccessTokenIsLoading } = useFetchAccessToken();

  const [disabled, setDisabled] = useState<boolean>(() => {
    if (!accessToken) return true;
    if (appAccessTokenIsLoading) return true;
    if (appAccessTokenIsError) return true;

    return false;
  });

  useEffect(() => {
    setDisabled(() => {
      if (!accessToken) return true;
      if (appAccessTokenIsLoading) return true;
      if (appAccessTokenIsError) return true;

      return false;
    });
  }, [accessToken, appAccessTokenIsLoading, appAccessTokenIsError]);

  return { disabled };
};
