import axios from "axios";
import type { Artist } from "../models/artist";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

export const getSeveralArtists = async (
  clientCredentialToken: string,
  artistsIds: string
): Promise<{ artists: Artist[] }> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/artists`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
      params: {
        ids: artistsIds,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Fetch Several Artists Error:", error);
    throw new Error("Failed to fetch Several Artists.");
  }
};
