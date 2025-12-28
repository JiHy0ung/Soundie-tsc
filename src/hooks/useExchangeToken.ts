import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import type { ExchangeTokenResponse } from "../models/auth";
import api from "../utils/api";

const useExchangeToken = () => {
  const queryClient = useQueryClient();
  // 응답값, 에러값, 매개변수
  return useMutation<
    ExchangeTokenResponse,
    Error,
    { code: string; codeVerifier: string }
  >({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      queryClient.invalidateQueries({
        queryKey: ["current-user-profile"],
      });
    },
  });
};

api.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
  return request;
});

export default useExchangeToken;
