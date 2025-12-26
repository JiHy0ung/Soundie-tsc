import axios from "axios";
import { clientId, clientSecret } from "../configs/authConfig";
import type { ClientCredentialTokenResponse } from "../models/auth";

const encodedBase64 = (data: string): string => {
  // return Buffer.from(data).toString("base64");
  return btoa(data);
};

export const getClientCredentialToken =
  async (): Promise<ClientCredentialTokenResponse> => {
    try {
      const body = new URLSearchParams({
        grant_type: "client_credentials",
      });
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        body,
        {
          headers: {
            Authorization: `Basic ${encodedBase64(
              clientId + ":" + clientSecret
            )}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Fetch Client Credential Token Error:", error);
      throw new Error("Fail to fetch Client Credential Token");
    }
  };
