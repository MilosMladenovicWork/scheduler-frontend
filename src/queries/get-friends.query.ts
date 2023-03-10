import { api } from "@/api/api";
import { Response } from "@/types/response.type";
import { useQuery } from "react-query";
import { useAuthQuery } from "./get-auth.query";
import { AuthQueryData } from "./login.mutation";

export type FriendsResponse = {
  id: string;
  email: string;
  username: string;
  sentFriendRequests: { id: string }[];
  receivedFriendRequests: { id: string }[];
}[];

export const useFriendsQuery = () => {
  const { data } = useAuthQuery();

  return useQuery(
    "friends",
    async () =>
      (
        await api.get<Response<FriendsResponse>>("/friends?take=100&skip=0", {
          headers: { Authorization: `Bearer ${data?.token}` },
        })
      ).data.data,
    {
      refetchInterval: 10 * 1000,
    }
  );
};
