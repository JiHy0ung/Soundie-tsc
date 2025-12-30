import { useQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import type { getCurrentUserPlaylistRequest } from "../models/playlist";

const useGetCurrentUserPlaylists = ({
  limit,
  offset,
}: getCurrentUserPlaylistRequest) => {
  return useQuery({
    queryKey: ["current-user-playlists"],
    queryFn: () => {
      return getCurrentUserPlaylists({ limit, offset });
    },
  });
};

export default useGetCurrentUserPlaylists;
