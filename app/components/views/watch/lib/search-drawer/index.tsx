"use server";

import { fetchAppAccessToken } from "@/app/fetchers";
import { createClient } from "@/utils/supabase/server";

import AppPreloader from "../app-preloader";

import SearchDrawerClientComponent from "./search-drawer-cc";

const SearchDrawer = async () => {
  const supabase = createClient();

  const userData = supabase.auth.getUser().then((res) => res.data.user);
  const userAccessTokenData = supabase.auth
    .getSession()
    .then((res) => res.data.session?.access_token);

  const [user, userAccessToken] = await Promise.all([userData, userAccessTokenData]);

  if (!user || !userAccessToken) {
    const fetchAppAccessTokenResponse = await fetchAppAccessToken();

    if ("message" in fetchAppAccessTokenResponse) {
      return <SearchDrawerClientComponent />;
    }

    const { access_token: appAccessToken } = fetchAppAccessTokenResponse;

    return (
      <>
        <AppPreloader {...{ accessToken: appAccessToken }} />
        <SearchDrawerClientComponent />
      </>
    );
  }

  return (
    <>
      <AppPreloader {...{ accessToken: userAccessToken }} />
      <SearchDrawerClientComponent />
    </>
  );
};

export default SearchDrawer;
