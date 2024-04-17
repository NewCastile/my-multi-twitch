"use client";

import { useEffect, useMemo, useState } from "react";

import { FOLLOWED_ITEMS_PER_PAGE } from "@/constants";
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

  const [shownFolloweds, setShownFolloweds] = useState(() =>
    liveOnly ? shownFollowedStreams : shownFollowedChannels,
  );

  const [filteredFolloweds, setFilteredFolloweds] = useState<Array<FollowedEntity>>(shownFolloweds);

  const allFollowedsShown = useMemo(() => {
    if (!followedChannels.length) return false;

    return pageToken > FOLLOWED_ITEMS_PER_PAGE;
  }, [pageToken, followedChannels]);

  const hasNoFollowedChannels = useMemo(() => {
    return filteredFolloweds.length === 0;
  }, [filteredFolloweds]);

  const hasNextPage = useMemo(() => {
    if (!followedChannels.length) return false;

    return shownFolloweds.length < followeds.length;
  }, [followeds, followedChannels, shownFolloweds]);

  useEffect(() => {
    setPageToken(() => (liveOnly ? streamsPageToken : channelsPageToken));
    setFolloweds(() => (liveOnly ? followedStreams : followedChannels));
    setShownFolloweds(() => (liveOnly ? shownFollowedStreams : shownFollowedChannels));
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

  useEffect(() => {
    setFilteredFolloweds(() => {
      return followeds.slice(0, pageToken);
    });
  }, [followeds, pageToken]);

  useEffect(() => {
    setFilteredFolloweds(() =>
      !query
        ? shownFolloweds
        : followeds.filter((followed) => {
            if (isFollowedChannel(followed)) {
              return followed.broadcaster_login.includes(query.toLowerCase());
            } else {
              return followed.user_login.includes(query.toLowerCase());
            }
          }),
    );
  }, [query, shownFolloweds, followeds]);

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

  const paginationState = {
    allFollowedsShown,
    hasNextPage,
    hasNoFollowedChannels,
  };

  const paginationHandlers = {
    nextPageButtonOnClickHandler,
    prevPageButtonOnClickHandler,
  };

  const reset = () => {
    dispatch(resetFollowed());
  };

  return {
    paginationState,
    paginationHandlers,
    filteredFolloweds,
    followeds,
    shownFolloweds,
    reset,
  };
};

export default useSearchFollowed;
