import { api } from "@/api/api";
import { Response } from "@/types/response.type";
import { useMutation, useQueryClient } from "react-query";
import { useAuthQuery } from "./get-auth.query";
import { FriendRequestStatusEnum } from "./get-friend-requests.query";

export type AddFriendData = {
  username: string;
};

export type AddFriendResponse = {
  id: string;
  status: FriendRequestStatusEnum;
  senderId: string;
  receiverId: string;
};

export const useAddFriendMutation = () => {
  const queryClient = useQueryClient();

  const { data: authData } = useAuthQuery();

  return useMutation(
    (data: AddFriendData) => {
      return api.post<Response<AddFriendResponse>>("/friend-requests", data, {
        headers: { Authorization: `Bearer ${authData?.token}` },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("friend-requests");
      },
    }
  );
};
