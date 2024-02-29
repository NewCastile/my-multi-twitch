import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import WatchPageLayout from "../components/views/watch/layout";
import { fetchUserFollowedChannels, fetchUserFollowedStreams } from "../fetchers";

const ProtectedPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user || !session) {
    return redirect("/login");
  }

  const {
    user_metadata: { provider_id: providerAccountId, name },
  } = user;

  const { provider_token: accessToken } = session;

  if (!accessToken) {
    return redirect("/login");
  }

  const fetchFollowedChannelsResponse = await fetchUserFollowedChannels({
    providerAccountId,
    accessToken,
  });

  const fetchFollowedStreamsResponse = await fetchUserFollowedStreams({
    providerAccountId,
    accessToken,
  });

  return (
    <div className={"flex flex-col items-center flex-1 w-full gap-20"}>
      <div className={"w-full"}>
        <WatchPageLayout>
          <pre className={"w-full"}>
            {JSON.stringify(
              {
                name,
                providerAccountId,
                accessToken,
                fetchFollowedChannelsResponse,
                fetchFollowedStreamsResponse,
              },
              null,
              2,
            )}
          </pre>
        </WatchPageLayout>
      </div>
    </div>
  );
};

export default ProtectedPage;
