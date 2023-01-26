import { api } from "@/api/api";
import { Response } from "@/types/response.type";
import { useQuery } from "react-query";
import { useAuthQuery } from "./get-auth.query";
import { AuthQueryData } from "./login.mutation";

export enum FriendRequestStatusEnum {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export type FriendRequestsResponse = {
  id: string;
  status: FriendRequestStatusEnum;
  senderId: string;
  receiverId: string;
}[];

export const useFriendRequestsQuery = () => {
  const { data } = useAuthQuery();

  return useQuery(
    "friend-requests",
    async () =>
      (
        await api.get<Response<FriendRequestsResponse>>(
          "/friend-requests?take=100&skip=0",
          {
            headers: { Authorization: `Bearer ${data?.token}` },
          }
        )
      ).data.data,
    { refetchInterval: 10 * 1000 }
  );
};
