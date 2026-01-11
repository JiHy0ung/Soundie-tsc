import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import type { GetNewReleasesResponse, SimplifiedAlbum } from "../models/album";

export const getNewReleases = async (
  clientCredentialToken: string
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await axios.get(
      `${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`,
      {
        headers: {
          Authorization: `Bearer ${clientCredentialToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Fetch New Releases Error:", error);
    throw new Error("Fail to fetch New Releases");
  }
};

export const getSeveralAlbums = async (
  albumsIds: string,
  clientCredentialToken: string
): Promise<{ albums: SimplifiedAlbum[] }> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/albums`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
      params: { ids: albumsIds },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch Several Albums Error:", error);
    throw new Error("Failed to fetch Several Albums.");
  }
};
