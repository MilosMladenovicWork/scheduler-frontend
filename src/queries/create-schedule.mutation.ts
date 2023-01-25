import { api } from "@/api/api";
import { Response } from "@/types/response.type";
import { useMutation, useQueryClient } from "react-query";
import { useAuthQuery } from "./get-auth.query";

export type CreateScheduleData = {
  title: string;
  scheduleStartDate: Date;
  scheduleEndDate: Date;
  userIds: string[];
  description?: string;
};

export type CreateScheduleResponseResponse = {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  description?: string;
};

export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();

  const { data } = useAuthQuery();

  return useMutation(
    (newSchedule: CreateScheduleData) => {
      return api.post<Response<CreateScheduleResponseResponse>>(
        "/schedules",
        newSchedule,
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
