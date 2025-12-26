import axios from "axios";
import { spotifyBaseUrl } from "../configs/commonConfig";
import type { GetNewReleasesResponse } from "../models/album";

export const getNewReleases = async (
  clientCredentialToken: string
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await axios.get(
      `${spotifyBaseUrl}/browse/new-releases?limit=6`,
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
