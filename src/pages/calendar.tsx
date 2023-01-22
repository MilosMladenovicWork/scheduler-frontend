import DashboardLayout from "@/components/DashboardLayout";
import { useGetProfileQuery } from "@/queries/get-profile.query";
import { useSchedulesQuery } from "@/queries/get-schedules.query";
import { isNil } from "lodash";

export default function Calendar() {
  const { data: profileData } = useGetProfileQuery();
  const userIds = !isNil(profileData) ? [profileData.userId] : [];
  const { data } = useSchedulesQuery({
    from: new Date("2023-01-15"),
    to: new Date("2023-01-25"),
    userIds,
  });

  console.log(data);

  return (
    <DashboardLayout>
      <main></main>
    </DashboardLayout>
  );
}
