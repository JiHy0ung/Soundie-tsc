import type {
  getCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
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
