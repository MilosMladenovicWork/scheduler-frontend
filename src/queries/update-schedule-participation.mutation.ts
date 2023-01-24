import { api } from "@/api/api";
import { LoginResponseData } from "@/types/login-response-data.type";
import { Response } from "@/types/response.type";
import { useMutation, useQueryClient } from "react-query";
import { useAuthQuery } from "./get-auth.query";
import { FriendRequestStatusEnum } from "./get-friend-requests.query";
import { ScheduleParticipantUserStatus } from "./get-schedules.query";

export type UpdateScheduleParticipationData = {
  status:
    | ScheduleParticipantUserStatus.ACCEPTED
    | ScheduleParticipantUserStatus.REJECTED;
};

export type UpdateScheduleParticipationResponse = {
  id: string;
  status: FriendRequestStatusEnum;
  senderId: string;
  receiverId: string;
};

export const useUpdateScheduleParticipationMutation = () => {
  const queryClient = useQueryClient();

  const { data } = useAuthQuery();

  return useMutation(
    ({
      scheduleId,
      updateScheduleParticipationData,
    }: {
      scheduleId: string;
      updateScheduleParticipationData: UpdateScheduleParticipationData;
    }) => {
      return api.patch<Response<LoginResponseData>>(
        `schedules/${scheduleId}/participation`,
        updateScheduleParticipationData,
        {
          headers: { Authorization: `Bearer ${data?.token}` },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("schedules");
      },
    }
  );
};
