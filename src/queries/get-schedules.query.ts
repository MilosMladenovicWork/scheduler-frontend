import { api } from "@/api/api";
import { Response } from "@/types/response.type";
import { useQuery } from "react-query";
import { useAuthQuery } from "./get-auth.query";

export type GetUserData = { from?: Date; to?: Date; userIds: string[] };

export type SchedulesResponse = {
  id: string;
  startDate: Date;
  endDate: Date;
  title?: string;
  description?: string;
}[];

export const useSchedulesQuery = (
  { from, to, userIds }: GetUserData,
  options?: { enabled?: boolean; keepPreviousData?: boolean }
) => {
  const { data: authData } = useAuthQuery();

  return useQuery(
    ["schedules", { from, to, userIds }],
    async () =>
      (
        await api.get<Response<SchedulesResponse>>(`/schedules`, {
          params: { from, to, userIds },
          headers: { Authorization: `Bearer ${authData?.token}` },
        })
      ).data.data,
    { staleTime: 10 * 1000, ...options }
  );
};
