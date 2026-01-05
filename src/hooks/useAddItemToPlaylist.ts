import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddItemToPlaylistRequest } from "../models/playlist";
import { addItemToPlaylist } from "../apis/playlistApi";

const useItemToPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AddItemToPlaylistRequest) => {
      if (!params) {
        return Promise.reject(new Error("Playlist is not defined."));
      }
      return addItemToPlaylist(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
      queryClient.invalidateQueries({ queryKey: ["playlist-detail"] });
      queryClient.invalidateQueries({ queryKey: ["playlist-items"] });
    },
  });
};

export default useItemToPlaylist;
