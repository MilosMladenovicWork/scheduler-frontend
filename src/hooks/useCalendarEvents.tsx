import { useSchedulesQuery } from "@/queries/get-schedules.query";
import { isDate, isEmpty } from "lodash";
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
      enabled: !isEmpty(userIds) && isDate(fromDate) && isDate(toDate),
      keepPreviousData: true,
    }
  );

  const events = data?.map((item): Event => {
    const { startDate, endDate, title } = item;
    return {
      start: moment(startDate).local().toDate(),
      end: moment(endDate).local().toDate(),
      title,
      resource: item,
    };
  });

  return events;
};
