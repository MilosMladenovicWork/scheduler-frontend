import {
  Calendar as BigCalendar,
  CalendarProps,
  Event,
  EventProps,
  EventWrapperProps,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ComponentType, useMemo } from "react";
import {
  ScheduleParticipantUserStatus,
  ScheduleResponseItem,
} from "@/queries/get-schedules.query";
import { Box, Grid, Typography } from "@mui/material";
import { useGetProfileQuery } from "@/queries/get-profile.query";
import { blue, grey, orange } from "@mui/material/colors";
import { isNil } from "lodash";

moment.locale("sr", {
  week: {
    dow: 1,
    doy: 1,
  },
});

const localizer = momentLocalizer(moment);

export default function Calendar({
  events,
  onSelectSlot,
  onNavigate,
  defaultDate,
  onView,
  onSelectEvent,
}: Pick<
  CalendarProps,
  | "events"
  | "onSelectSlot"
  | "onNavigate"
  | "defaultDate"
  | "onView"
  | "onSelectEvent"
>) {
  return (
    <Box
      sx={{
        "& .rbc-toolbar": {
          flexDirection: { xs: "column", sm: "row" },
        },
      }}
    >
      <BigCalendar
        components={{
          eventWrapper: EventWrapper,
          event: CustomEvent,
          timeSlotWrapper: CustomTimeSlotWrapper,
        }}
        localizer={localizer}
        formats={{
          timeGutterFormat: "HH:mm",
        }}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh" }}
        views={["day", "week", "month"]}
        defaultView={"week"}
        onSelectSlot={onSelectSlot}
        selectable
        step={15}
        onNavigate={onNavigate}
        defaultDate={defaultDate}
        onView={onView}
        onSelectEvent={onSelectEvent}
      />
    </Box>
  );
}

export const EventWrapper: ComponentType<EventWrapperProps<Event>> = ({
  event,
  style,
  ...props
}) => {
  const { resource }: { resource?: ScheduleResponseItem } = event;
  const { data: profileData } = useGetProfileQuery();

  const currentUserId = profileData?.userId;

  const currentUserParticipant = resource?.scheduleParticipantUsers?.find(
    ({ userId }) => currentUserId === userId
  );

  const otherUserParticipants = resource?.scheduleParticipantUsers?.filter(
    ({ userId }) => currentUserParticipant?.userId !== userId
  );

  const backgroundColor = useMemo(() => {
    if (isNil(currentUserParticipant)) {
      return grey[500];
    } else {
      if (
        currentUserParticipant?.status ===
        ScheduleParticipantUserStatus.ACCEPTED
      ) {
        if (
          otherUserParticipants?.some(
            ({ status }) => status === ScheduleParticipantUserStatus.PENDING
          )
        ) {
          return blue[200];
        } else {
          return blue[500];
        }
      } else if (
        currentUserParticipant?.status === ScheduleParticipantUserStatus.PENDING
      ) {
        return orange[500];
      }
    }
  }, [currentUserParticipant, otherUserParticipants]);

  return (
    <Box
      {...props}
      style={{ ...style }}
      sx={{
        "& > .rbc-event": {
          backgroundColor,
          border: "1px solid white",
        },
      }}
    ></Box>
  );
};

export const CustomEvent: ComponentType<EventProps<Event>> = ({
  event,
  title,
}) => {
  const { resource }: { resource?: ScheduleResponseItem } = event;
  const { data: profileData } = useGetProfileQuery();

  const currentUserId = profileData?.userId;

  const currentUserParticipant = resource?.scheduleParticipantUsers?.find(
    ({ userId }) => currentUserId === userId
  );

  const otherUserParticipants = resource?.scheduleParticipantUsers?.filter(
    ({ userId }) => currentUserParticipant?.userId !== userId
  );

  const status = useMemo(() => {
    if (isNil(currentUserParticipant)) {
      return "Friends event";
    } else {
      if (
        currentUserParticipant.status === ScheduleParticipantUserStatus.PENDING
      ) {
        return "Waiting on you";
      }

      if (
        otherUserParticipants?.some(
          ({ status }) => status === ScheduleParticipantUserStatus.PENDING
        )
      ) {
        return "Waiting on participants";
      }
    }
  }, [currentUserParticipant, otherUserParticipants]);

  return (
    <Box sx={{ height: "100%" }}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Grid item>
          <Typography variant="body2">{title}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">{status}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export const CustomTimeSlotWrapper = ({ ...props }) => {
  return <Typography {...props} variant="body2"></Typography>;
};
