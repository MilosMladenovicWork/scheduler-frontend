import Calendar from "@/components/Calendar";
import CreateScheduleModal from "@/components/CreateScheduleModal";
import DashboardLayout from "@/components/DashboardLayout";
import { useGetProfileQuery } from "@/queries/get-profile.query";
import { useSchedulesQuery } from "@/queries/get-schedules.query";
import { isEmpty, isNil } from "lodash";
import moment from "moment";
import { useState } from "react";
import { CalendarProps } from "react-big-calendar";

export default function CalendarPage() {
  const [openCreateScheduleModal, setOpenCreateScheduleModal] = useState(false);
  const handleOpenCreateScheduleModal = () => setOpenCreateScheduleModal(true);
  const handleCloseCreateScheduleModal = () =>
    setOpenCreateScheduleModal(false);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const { data: profileData } = useGetProfileQuery();
  const userIds = !isNil(profileData) ? [profileData.userId] : [];
  const { data } = useSchedulesQuery(
    {
      from: new Date("2023-01-15"),
      to: new Date("2023-02-01"),
      userIds,
    },
    { enabled: !isEmpty(userIds) }
  );

  const events = data?.map(({ startDate, endDate, title }) => {
    return {
      start: moment(startDate).local().toDate(),
      end: moment(endDate).local().toDate(),
      title,
    };
  });

  const handleSelectSlot: CalendarProps["onSelectSlot"] = ({ start, end }) => {
    handleOpenCreateScheduleModal();
    setStartDate(moment(start).utc().toDate());
    setEndDate(moment(end).utc().toDate());
  };

  return (
    <DashboardLayout>
      <main>
        <Calendar events={events} onSelectSlot={handleSelectSlot} />
      </main>
      <CreateScheduleModal
        open={openCreateScheduleModal}
        onClose={handleCloseCreateScheduleModal}
        startDate={startDate}
        endDate={endDate}
      />
    </DashboardLayout>
  );
}
