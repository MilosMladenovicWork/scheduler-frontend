import { api } from "@/api/api";
import { LoginResponseData } from "@/types/login-response-data.type";
import { Response } from "@/types/response.type";
import { useMutation, useQueryClient } from "react-query";
import { useAuthQuery } from "./get-auth.query";
import { FriendRequestStatusEnum } from "./get-friend-requests.query";

export type UpdateFriendRequestData = {
  status: FriendRequestStatusEnum.REJECTED;
};

export type UpdateFriendRequestResponse = {
  id: string;
  status: FriendRequestStatusEnum;
  senderId: string;
  receiverId: string;
};

export const useUpdateFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  const { data } = useAuthQuery();

  return useMutation(
    ({
      friendRequestId,
      updateFriendRequestData,
    }: {
      friendRequestId: string;
      updateFriendRequestData: UpdateFriendRequestData;
    }) => {
      return api.patch<Response<LoginResponseData>>(
        `friend-requests/${friendRequestId}`,
        updateFriendRequestData,
        {
          headers: { Authorization: `Bearer ${data?.token}` },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("friends");
      },
    }
  );
};
