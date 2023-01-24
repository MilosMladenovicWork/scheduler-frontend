import { useGetProfileQuery } from "@/queries/get-profile.query";
import {
  ScheduleParticipantUserStatus,
  ScheduleResponseItem,
} from "@/queries/get-schedules.query";
import { useGetUserQuery } from "@/queries/get-user.query";
import { useUpdateScheduleParticipationMutation } from "@/queries/update-schedule-participation.mutation";
import { Check, CheckCircle, Pending, RemoveCircle } from "@mui/icons-material";
import {
  Avatar,
  ButtonGroup,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { blue, green, orange, red } from "@mui/material/colors";
import { isNil } from "lodash";
import moment from "moment";
import Button from "./Button";
import Modal from "./Modal";

export default function SelectedScheduleModal({
  open,
  onClose,
  schedule,
}: {
  open: boolean;
  onClose: () => void;
  schedule?: ScheduleResponseItem;
}) {
  const { data: profileData } = useGetProfileQuery();

  const mutation = useUpdateScheduleParticipationMutation();

  const handleReject = () => {
    if (!isNil(schedule)) {
      mutation.mutate(
        {
          scheduleId: schedule?.id,
          updateScheduleParticipationData: {
            status: ScheduleParticipantUserStatus.REJECTED,
          },
        },
        { onSuccess: () => onClose() }
      );
    }
  };

  const handleAccept = () => {
    if (!isNil(schedule)) {
      mutation.mutate(
        {
          scheduleId: schedule?.id,
          updateScheduleParticipationData: {
            status: ScheduleParticipantUserStatus.ACCEPTED,
          },
        },
        { onSuccess: () => onClose() }
      );
    }
  };

  const currentUserParticipant = schedule?.scheduleParticipantUsers?.find(
    ({ userId }) => userId === profileData?.userId
  );

  const currentUserParticipantStatus = currentUserParticipant?.status;

  return (
    <Modal open={open} onClose={onClose}>
      <Grid container direction="column" rowSpacing={4}>
        <Grid item>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {schedule?.title}
          </Typography>
        </Grid>
        <Grid item container sx={{ width: "100%" }}>
          <Grid item xs>
            <Typography variant="body1">
              {moment(schedule?.startDate).format("DD/MM/YYYY HH:mm")} -{" "}
              {moment(schedule?.endDate).format("DD/MM/YYYY HH:mm")}
            </Typography>
            <Typography variant="body1">{schedule?.description}</Typography>
            <List>
              {schedule?.scheduleParticipantUsers?.map(({ userId, status }) => (
                <Participant key={userId} id={userId} status={status} />
              ))}
            </List>
          </Grid>
          <Grid item container>
            {currentUserParticipantStatus ===
              ScheduleParticipantUserStatus.PENDING && (
              <ButtonGroup fullWidth>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReject}
                  disabled={mutation?.isLoading}
                >
                  Reject
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAccept}
                  disabled={mutation?.isLoading}
                >
                  Accept
                </Button>
              </ButtonGroup>
            )}
            {currentUserParticipantStatus ===
              ScheduleParticipantUserStatus.ACCEPTED && (
              <ButtonGroup fullWidth>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReject}
                  disabled={mutation?.isLoading}
                >
                  Reject
                </Button>
              </ButtonGroup>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
}

const Participant = ({
  id,
  status,
}: {
  id: string;
  status: ScheduleParticipantUserStatus;
}) => {
  const { data: profileData } = useGetProfileQuery();

  const isCurrentUser = profileData?.userId === id;

  const { data: userData } = useGetUserQuery(
    {
      userId: id,
    },
    { enabled: !isNil(profileData) && !isCurrentUser }
  );

  const username = isCurrentUser ? profileData?.username : userData?.username;

  return (
    <ListItem disablePadding sx={{ py: 1, width: "100%" }}>
      <ListItemAvatar>
        <Avatar>{username?.slice(0, 2).toUpperCase()}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={username} />
      {status === ScheduleParticipantUserStatus.ACCEPTED && (
        <CheckCircle sx={{ color: green[300] }} />
      )}
      {status === ScheduleParticipantUserStatus.PENDING && (
        <Pending sx={{ color: orange[300] }} />
      )}
      {(status === ScheduleParticipantUserStatus.REJECTED ||
        status === ScheduleParticipantUserStatus.REJECTED_AUTOMATICALLY) && (
        <RemoveCircle sx={{ color: red[300] }} />
      )}
    </ListItem>
  );
};
