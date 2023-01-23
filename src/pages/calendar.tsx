import Calendar from "@/components/Calendar";
import CalendarFriendsSelect from "@/components/CalendarFriendsSelect";
import CreateScheduleModal from "@/components/CreateScheduleModal";
import DashboardLayout from "@/components/DashboardLayout";
import SelectedScheduleModal from "@/components/SelectedScheduleModal";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { useGetProfileQuery } from "@/queries/get-profile.query";
import { Grid } from "@mui/material";
import { isNil } from "lodash";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarProps, View } from "react-big-calendar";

export default function CalendarPage() {
  const [openCreateScheduleModal, setOpenCreateScheduleModal] = useState(false);
  const handleOpenCreateScheduleModal = () => setOpenCreateScheduleModal(true);
  const handleCloseCreateScheduleModal = () =>
    setOpenCreateScheduleModal(false);
  const [selectedSchedule, setSelectedSchedule] = useState();

  const [openSelectedScheduleModal, setOpenSelectedScheduleModal] =
    useState(false);
  const handleOpenSelectedScheduleModal = () =>
    setOpenSelectedScheduleModal(true);
  const handleCloseSelectedScheduleModal = () =>
    setOpenSelectedScheduleModal(false);

  const [selectedFriendsIds, setSelectedFriendsIds] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(moment().toDate());
  const [currentView, setCurrentView] = useState<View>("week");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const { data: profileData } = useGetProfileQuery();

  const currentUserAndFriendsUserIds = useMemo(() => {
    return !isNil(profileData)
      ? selectedFriendsIds.concat(profileData?.userId)
      : selectedFriendsIds;
  }, [profileData, selectedFriendsIds]);

  const events = useCalendarEvents({
    fromDate,
    toDate,
    userIds: currentUserAndFriendsUserIds,
  });

  const handleSelectSlot: CalendarProps["onSelectSlot"] = ({
    start,
    end,
    action,
  }) => {
    if (action === "select") {
      handleOpenCreateScheduleModal();
      setStartDate(moment(start).utc().toDate());
      setEndDate(moment(end).utc().toDate());
    }
  };

  const handleCalendarFriendsSelect = useCallback(
    (
      listOfFriends: {
        label: string;
        id: string;
      }[]
    ) => {
      setSelectedFriendsIds(listOfFriends.map(({ id }) => id));
    },
    []
  );

  const handleCalendarNavigate: CalendarProps["onNavigate"] = (date, view) => {
    setCurrentDate(date);
    setCurrentView(view);
  };

  const handleCalendarView: CalendarProps["onView"] = (view) => {
    setCurrentView(view);
  };

  useEffect(() => {
    if (currentView === "day") {
      setFromDate(moment(currentDate).startOf("day").toDate());
      setToDate(moment(currentDate).endOf("day").toDate());
    }
    if (currentView === "week") {
      setFromDate(moment(currentDate).startOf("isoWeek").toDate());
      setToDate(moment(currentDate).endOf("isoWeek").toDate());
    }
    if (currentView === "month") {
      setFromDate(
        moment(currentDate).startOf("month").subtract(7, "days").toDate()
      );
      setToDate(moment(currentDate).endOf("month").add(7, "days").toDate());
    }
  }, [currentDate, currentView]);

  const handleSelectEvent: CalendarProps["onSelectEvent"] = (event) => {
    if (!isNil(event?.resource.title)) {
      setSelectedSchedule(event?.resource);

      handleOpenSelectedScheduleModal();
    }
  };

  return (
    <DashboardLayout>
      <main>
        <Grid container columnSpacing={2} rowSpacing={3} sx={{ pb: 3 }}>
          <Grid item xs={12}>
            <CalendarFriendsSelect onChange={handleCalendarFriendsSelect} />
          </Grid>
          <Grid item xs={12}>
            <Calendar
              events={events}
              onSelectSlot={handleSelectSlot}
              onNavigate={handleCalendarNavigate}
              onView={handleCalendarView}
              defaultDate={moment().toDate()}
              onSelectEvent={handleSelectEvent}
            />
          </Grid>
        </Grid>
      </main>
      <CreateScheduleModal
        open={openCreateScheduleModal}
        onClose={handleCloseCreateScheduleModal}
        startDate={startDate}
        endDate={endDate}
        userIds={currentUserAndFriendsUserIds}
      />
      <SelectedScheduleModal
        open={openSelectedScheduleModal}
        onClose={handleCloseSelectedScheduleModal}
        schedule={selectedSchedule}
      />
    </DashboardLayout>
  );
}
