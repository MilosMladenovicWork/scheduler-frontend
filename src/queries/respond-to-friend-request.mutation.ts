import { api } from "@/api/api";
import { LoginResponseData } from "@/types/login-response-data.type";
import { Response } from "@/types/response.type";
import { useMutation, useQueryClient } from "react-query";
import { useAuthQuery } from "./get-auth.query";
import { FriendRequestStatusEnum } from "./get-friend-requests.query";

export type RespondToFriendRequestData = {
  status: FriendRequestStatusEnum.APPROVED | FriendRequestStatusEnum.REJECTED;
};

export type RespondToFriendRequestResponse = { token: string };

export const useRespondToFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  const { data } = useAuthQuery();

  return useMutation(
    ({
      friendRequestId,
      respondToFriendRequestData,
    }: {
      friendRequestId: string;
      respondToFriendRequestData: RespondToFriendRequestData;
    }) => {
      return api.patch<Response<LoginResponseData>>(
        `friend-requests/${friendRequestId}/response`,
        respondToFriendRequestData,
        {
          headers: { Authorization: `Bearer ${data?.token}` },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("friend-requests");
        queryClient.invalidateQueries("friends");
      },
    }
  );
};
