import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import type {
  GetSeveralBrowseCategoriesRequest,
  GetSeveralBrowseCategoriesResponse,
} from "../models/search";
import { getSeveralBrowseCategories } from "../apis/searchApi";

const useGetSeveralBrowseCategories = (
  params?: GetSeveralBrowseCategoriesRequest
) => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery<GetSeveralBrowseCategoriesResponse>({
    queryKey: ["browse-categories", params],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error("No token available");
      }
      return getSeveralBrowseCategories(clientCredentialToken);
    },
    enabled: !!clientCredentialToken,
  });
};

export default useGetSeveralBrowseCategories;
