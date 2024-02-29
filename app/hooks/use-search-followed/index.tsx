"use client";

import { useEffect, useState } from "react";

import {
  goToChannelsNextPage,
  goToChannelsPrevPage,
  goToStreamsNextPage,
  goToStreamsPrevPage,
  resetFollowed,
} from "@/lib/features/followed/followed-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { FollowedEntity } from "@/types";
import { isFollowedChannel } from "@/utils/type-guards";

const useSearchFollowed = ({ query, liveOnly }: { query: string; liveOnly: boolean }) => {
  const dispatch = useAppDispatch();

  const {
    followedChannels,
    shownFollowedChannels,
    channelsPageToken,
    followedStreams,
    shownFollowedStreams,
    streamsPageToken,
  } = useAppSelector((state) => state.followed);

  const [pageToken, setPageToken] = useState(() =>
    liveOnly ? streamsPageToken : channelsPageToken,
  );

  const [followeds, setFolloweds] = useState<Array<FollowedEntity>>(() =>
    liveOnly ? followedStreams : followedChannels,
  );

  const [shownFollowed, setShownFollowed] = useState(() =>
    liveOnly ? shownFollowedStreams : shownFollowedChannels,
  );

  useEffect(() => {
    setPageToken(() => (liveOnly ? streamsPageToken : channelsPageToken));
    setFolloweds(() => (liveOnly ? followedStreams : followedChannels));
    setShownFollowed(() => (liveOnly ? shownFollowedStreams : shownFollowedChannels));
  }, [
    channelsPageToken,
    followedChannels,
    followedStreams,
    liveOnly,
    pageToken,
    shownFollowedChannels,
    shownFollowedStreams,
    streamsPageToken,
  ]);

  const [filteredFolloweds, setFilteredFolloweds] = useState<Array<FollowedEntity>>(shownFollowed);

  useEffect(() => {
    setFilteredFolloweds(() => {
      return followeds.slice(0, pageToken);
    });
  }, [followeds, pageToken]);

  useEffect(() => {
    setFilteredFolloweds(() =>
      !query
        ? shownFollowed
        : followeds.filter((followed) => {
            if (isFollowedChannel(followed)) {
              return followed.broadcaster_login.includes(query.toLowerCase());
            } else {
              return followed.user_login.includes(query.toLowerCase());
            }
          }),
    );
  }, [query, shownFollowed, followeds]);

  const nextPageButtonOnClickHandler = () => {
    if (liveOnly) {
      dispatch(goToStreamsNextPage());
    } else {
      dispatch(goToChannelsNextPage());
    }
  };

  const prevPageButtonOnClickHandler = () => {
    if (liveOnly) {
      dispatch(goToStreamsPrevPage());
    } else {
      dispatch(goToChannelsPrevPage());
    }
  };

  const controlButtonsHandler = {
    nextPageButtonOnClickHandler,
    prevPageButtonOnClickHandler,
  };

  const reset = () => {
    dispatch(resetFollowed());
  };

  return { filteredFolloweds, controlButtonsHandler, pageToken, followeds, shownFollowed, reset };
};

export default useSearchFollowed;
