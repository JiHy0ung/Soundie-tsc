import type {
  AddItemToPlaylistRequest,
  CreatePlaylistRequest,
  getCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  Playlist,
} from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: getCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get(`/me/playlists`, {
      params: { limit, offset },
    });

    return response.data;
  } catch (error) {
    console.log("Fetch Current User Playlists Error", error);
    throw new Error("Fail to fetch Current User Playlists.");
  }
};

export const getPlaylist = async (
  params: GetPlaylistRequest
): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.log("Fetch Playlists Error", error);
    throw new Error("Fail to fetch Playlists.");
  }
};

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest
): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.log("Fetch Playlists Items Error", error);
    throw new Error("Fail to fetch Playlists Items.");
  }
};

export const createPlaylist = async (
  user_id: string,
  params: CreatePlaylistRequest
): Promise<Playlist> => {
  try {
    const { name, playlistPublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });

    return response.data;
  } catch (error) {
    console.log("Fetch Create Playlist Error", error);
    throw new Error("Failed to create new playlist.");
  }
};

export const addItemToPlaylist = async (
  params: AddItemToPlaylistRequest
): Promise<{ snapshot_id: string }> => {
  try {
    const response = await api.post(
      `/playlists/${params.playlist_id}/tracks`,
      params
    );
    return response.data;
  } catch (error) {
    console.log("Fetch Add Item to Playlist Error", error);
    throw new Error("Failed to add items to playlist");
  }
};
