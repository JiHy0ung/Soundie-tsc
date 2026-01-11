import { useQuery } from "@tanstack/react-query";
import { ARTISTS_IDS } from "../configs/commonConfig";
import useClientCredentialToken from "./useClientCredentialToken";
import { getSeveralArtists } from "../apis/artistsApi";

const useGetSeveralArtists = () => {
  const clientCredentialToken = useClientCredentialToken();
  const artistsIds = ARTISTS_IDS.join(",");
  return useQuery({
    queryKey: ["top-artist", ARTISTS_IDS],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error("No token available");
      }
      return getSeveralArtists(clientCredentialToken, artistsIds);
    },
  });
};

export default useGetSeveralArtists;
