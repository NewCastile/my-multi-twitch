import { useEffect, useRef } from "react";

import { loadFollowedChannels, loadFollowedStreams } from "@/lib/features/followed/followed-slice";
import {
  useLazyGetFollowedChannelsQuery,
  useLazyGetFollowedStreamsQuery,
} from "@/lib/features/followed/followeds-api-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { FollowedChannel, FollowedEntity, FollowedStream } from "@/types";

export const useFetchFolloweds = () => {
  const [{ providerAccountId }, { accessToken }] = useAppSelector((state) => [
    { ...state.profile },
    { ...state.accessToken },
  ]);

  const dispatch = useAppDispatch();

  const [
    dispatchFollowedChannelsQuery,
    {
      data: followedChannelsData,
      error: followedChannelsQueryError,
      isLoading: followedChannelsLoading,
    },
  ] = useLazyGetFollowedChannelsQuery();

  const [
    dispatchFollowedStreamsQuery,
    {
      data: followedStreamsData,
      isError: followedStreamsQueryError,
      isLoading: followedStreamsLoading,
    },
  ] = useLazyGetFollowedStreamsQuery();

  const followedsChannelsQueryRef = useRef(dispatchFollowedChannelsQuery);
  const followedsStreamsQueryRef = useRef(dispatchFollowedStreamsQuery);
  const dispatchRef = useRef(dispatch);

  useEffect(() => {
    const fetchFolloweds = async () => {
      const { data: followedChannelsData } = await followedsChannelsQueryRef.current({
        providerAccountId,
        accessToken,
      });

      const { data: followedStreamsData } = await followedsStreamsQueryRef.current({
        providerAccountId,
        accessToken,
      });

      if (!followedChannelsData || !followedStreamsData) {
        return;
      }

      const [{ data: followedChannels }, { data: followedStreams }] = [
        followedChannelsData,
        followedStreamsData,
      ];

      const liveSortedFolloweds = getLiveSortedFolloweds({ followedChannels, followedStreams });

      dispatchRef.current(loadFollowedChannels(liveSortedFolloweds));
      dispatchRef.current(loadFollowedStreams(followedStreams));
    };

    if (providerAccountId) fetchFolloweds();
  }, [accessToken, providerAccountId]);

  return {
    followedChannelsState: {
      followedChannelsData,
      followedChannelsQueryError,
      followedChannelsLoading,
    },
    followedStreamsState: {
      followedStreamsData,
      followedStreamsQueryError,
      followedStreamsLoading,
    },
  };
};

const getLiveSortedFolloweds = ({
  followedStreams,
  followedChannels,
}: {
  followedStreams: FollowedStream[];
  followedChannels: FollowedChannel[];
}) => {
  const emptyArray: Array<FollowedStream | FollowedChannel> = [];

  const loginMappedFollowedStreams = followedStreams.map((stream) => stream.user_login);

  const liveFilteredFollowedChannels = followedChannels.filter(
    (channel) => !loginMappedFollowedStreams.includes(channel.broadcaster_login),
  );

  const liveSortedFolloweds: Array<FollowedEntity> = emptyArray
    .concat(followedStreams)
    .concat(liveFilteredFollowedChannels);

  return liveSortedFolloweds;
};
