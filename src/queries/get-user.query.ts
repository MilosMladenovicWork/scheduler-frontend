import { api } from "@/api/api";
import { Response } from "@/types/response.type";
import { useQuery } from "react-query";
import { useAuthQuery } from "./get-auth.query";

export type GetUserData = { userId: string };

export type GetUserResponse = {
  id: string;
  username: string;
};

export const useGetUserQuery = (data: GetUserData) => {
  const { data: authData } = useAuthQuery();

  return useQuery(
    ["users", data.userId],
    async () =>
      (
        await api.get<Response<GetUserResponse>>(`/users/${data.userId}`, {
          headers: { Authorization: `Bearer ${authData?.token}` },
        })
      ).data.data,
    { staleTime: 5 * 60 * 1000 }
  );
};
