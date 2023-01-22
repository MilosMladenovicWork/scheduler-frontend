import DashboardLayout from "@/components/DashboardLayout";
import {
  FriendRequestStatusEnum,
  useFriendRequestsQuery,
} from "@/queries/get-friend-requests.query";
import { useGetProfileQuery } from "@/queries/get-profile.query";
import { useRespondToFriendRequestMutation } from "@/queries/respond-to-friend-request.mutation";
import {
  Add,
  Check,
  CheckCircle,
  Close,
  HighlightOff,
  Remove,
} from "@mui/icons-material";
import {
  Avatar,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { isNil } from "lodash";
import { useCallback, useMemo } from "react";

export default function FriendRequests() {
  const { data } = useFriendRequestsQuery();
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <main>
          <Grid container>
            <Grid item xs={12} sm={6} lg={4}>
              <List>
                {data?.map(({ id, receiverId, senderId, status }) => {
                  return (
                    <FriendRequest
                      key={id}
                      id={id}
                      receiverId={receiverId}
                      senderId={senderId}
                    />
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </main>
      </Container>
    </DashboardLayout>
  );
}

const FriendRequest = ({
  id,
  receiverId,
  senderId,
}: {
  id: string;
  receiverId: string;
  senderId: string;
}) => {
  const { data, isLoading } = useGetProfileQuery();

  const mutation = useRespondToFriendRequestMutation();

  const primaryText = data?.id === senderId ? receiverId : senderId;

  const handleAccept = useCallback(() => {
    mutation.mutate({
      friendRequestId: id,
      respondToFriendRequestData: {
        status: FriendRequestStatusEnum.APPROVED,
      },
    });
  }, [id, mutation]);

  const handleReject = useCallback(() => {
    mutation.mutate({
      friendRequestId: id,
      respondToFriendRequestData: {
        status: FriendRequestStatusEnum.REJECTED,
      },
    });
  }, [id, mutation]);

  const listItem = useMemo(() => {
    return (
      <ListItem key={id} disablePadding sx={{ py: 1 }}>
        <ListItemAvatar>
          <Avatar>{primaryText.slice(0, 2).toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={primaryText} />
        <IconButton onClick={handleReject}>
          <Close />
        </IconButton>
        <IconButton onClick={handleAccept}>
          <Check />
        </IconButton>
      </ListItem>
    );
  }, [handleAccept, handleReject, id, primaryText]);

  return isLoading ? <Skeleton>{listItem}</Skeleton> : listItem;
};
