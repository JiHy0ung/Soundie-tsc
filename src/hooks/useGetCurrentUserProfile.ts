import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";
import type { User } from "../models/user";

const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
  const accessToken = localStorage.getItem("access_token");
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    enabled: !!accessToken, // accessToken 있을때만 실행 = 로그인 성공시에만 실행
  });
};

export default useGetCurrentUserProfile;
