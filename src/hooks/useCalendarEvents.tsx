import { useSchedulesQuery } from "@/queries/get-schedules.query";
import { isEmpty } from "lodash";
import moment from "moment";
import { Event } from "react-big-calendar";

export const useCalendarEvents = ({
  fromDate,
  toDate,
  userIds,
}: {
  fromDate: Date | undefined;
  toDate: Date | undefined;
  userIds: string[];
}): Event[] | undefined => {
  const { data } = useSchedulesQuery(
    {
      from: fromDate,
      to: toDate,
      userIds,
    },
    {
      enabled: !isEmpty(userIds) && !isEmpty(fromDate) && !isEmpty(toDate),
      keepPreviousData: true,
    }
  );

  const events = data?.map(({ startDate, endDate, title }): Event => {
    return {
      start: moment(startDate).local().toDate(),
      end: moment(endDate).local().toDate(),
      title,
    };
  });

  return events;
};
