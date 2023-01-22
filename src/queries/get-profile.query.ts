import { api } from "@/api/api";
import { Response } from "@/types/response.type";
import { useQuery } from "react-query";
import { useAuthQuery } from "./get-auth.query";

export type GetProfile = { email: string; password: string };

export type GetProfileResponse = {
  userId: string;
  username: string;
};

export const useGetProfileQuery = () => {
  const { data } = useAuthQuery();

  return useQuery(
    "loggedInUserProfile",
    async () =>
      (
        await api.get<Response<GetProfileResponse>>("/auth/login", {
          headers: { Authorization: `Bearer ${data?.token}` },
        })
      ).data.data,
    { staleTime: 5 * 60 * 1000 }
  );
};
