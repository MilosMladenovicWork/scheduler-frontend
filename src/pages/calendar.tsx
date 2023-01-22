import Calendar from "@/components/Calendar";
import CalendarFriendsSelect from "@/components/CalendarFriendsSelect";
import CreateScheduleModal from "@/components/CreateScheduleModal";
import DashboardLayout from "@/components/DashboardLayout";
import { useFriendsQuery } from "@/queries/get-friends.query";
import { useGetProfileQuery } from "@/queries/get-profile.query";
import { useSchedulesQuery } from "@/queries/get-schedules.query";
import {
  Autocomplete,
  AutocompleteProps,
  Avatar,
  AvatarGroup,
  Grid,
  TextField,
} from "@mui/material";
import { isEmpty, isNil } from "lodash";
import moment from "moment";
import { useCallback, useState } from "react";
import { CalendarProps } from "react-big-calendar";

export default function CalendarPage() {
  const [openCreateScheduleModal, setOpenCreateScheduleModal] = useState(false);
  const handleOpenCreateScheduleModal = () => setOpenCreateScheduleModal(true);
  const handleCloseCreateScheduleModal = () =>
    setOpenCreateScheduleModal(false);
  const [selectedFriendsIds, setSelectedFriendsIds] = useState<string[]>([]);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const { data: profileData } = useGetProfileQuery();
  const userIds = !isNil(profileData) ? [profileData.userId] : [];
  const { data } = useSchedulesQuery(
    {
      from: new Date("2023-01-15"),
      to: new Date("2023-02-01"),
      userIds: [...userIds, ...selectedFriendsIds],
    },
    { enabled: !isEmpty(userIds), keepPreviousData: true }
  );

  const events = data?.map(({ startDate, endDate, title }) => {
    return {
      start: moment(startDate).local().toDate(),
      end: moment(endDate).local().toDate(),
      title,
    };
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

  return (
    <DashboardLayout>
      <main>
        <Grid container columnSpacing={2} rowSpacing={3}>
          <Grid item xs={12}>
            <CalendarFriendsSelect onChange={handleCalendarFriendsSelect} />
          </Grid>
          <Grid item xs={12}>
            <Calendar events={events} onSelectSlot={handleSelectSlot} />
          </Grid>
        </Grid>
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
