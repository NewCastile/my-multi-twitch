"use server";

import { getRefreshToken } from "@/app/fetchers";
import { createClient } from "@/utils/supabase/server";

export const RefreshAccessTokenButton = async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;
  const { provider_refresh_token: refreshToken } = session;

  if (!refreshToken) return null;

  const refreshAccessTokenHandler = async () => {
    const refreshTokenResponse = await getRefreshToken(refreshToken);

    if ("message" in refreshTokenResponse) {
      return null;
    }

    const { access_token: newAccessToken, refresh_token: newRefreshToken } = refreshTokenResponse;

    // eslint-disable-next-line no-console
    console.log({ newAccessToken, newRefreshToken });
  };

  return (
    <form>
      <button className={"btn-md btn-monokai-green"} formAction={refreshAccessTokenHandler} />
    </form>
  );
};
