import Calendar from "@/components/Calendar";
import DashboardLayout from "@/components/DashboardLayout";
import { useGetProfileQuery } from "@/queries/get-profile.query";
import { useSchedulesQuery } from "@/queries/get-schedules.query";
import { isNil } from "lodash";
import moment from "moment";

export default function CalendarPage() {
  const { data: profileData } = useGetProfileQuery();
  const userIds = !isNil(profileData) ? [profileData.userId] : [];
  const { data } = useSchedulesQuery({
    from: new Date("2023-01-15"),
    to: new Date("2023-01-25"),
    userIds,
  });

  const events = data?.map(({ startDate, endDate, title }) => {
    return {
      start: moment(startDate).local().toDate(),
      end: moment(endDate).local().toDate(),
      title,
    };
  });

  return (
    <DashboardLayout>
      <main>
        <Calendar events={events} />
      </main>
    </DashboardLayout>
  );
}
