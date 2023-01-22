import DashboardLayout from "@/components/DashboardLayout";
import { FriendRequestStatusEnum } from "@/queries/get-friend-requests.query";
import { useFriendsQuery } from "@/queries/get-friends.query";
import { useUpdateFriendRequestMutation } from "@/queries/update-friends.mutation";
import { Remove } from "@mui/icons-material";
import {
  Avatar,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useCallback } from "react";

export default function Friends() {
  const { data } = useFriendsQuery();

  return (
    <DashboardLayout>
      <Grid container>
        <Grid item xs={12} sm={6} lg={4}>
          <List>
            {data?.map(
              ({
                id,
                username,
                email,
                receivedFriendRequests,
                sentFriendRequests,
              }) => {
                const friendRequestId =
                  receivedFriendRequests[0]?.id || sentFriendRequests[0]?.id;
                return (
                  <Friend
                    key={id}
                    id={id}
                    username={username}
                    email={email}
                    friendRequestId={friendRequestId}
                  />
                );
              }
            )}
          </List>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

const Friend = ({
  id,
  email,
  username,
  friendRequestId,
}: {
  id: string;
  email: string;
  username: string;
  friendRequestId: string;
}) => {
  const mutation = useUpdateFriendRequestMutation();

  const handleRemove = useCallback(() => {
    mutation.mutate({
      friendRequestId,
      updateFriendRequestData: {
        status: FriendRequestStatusEnum.REJECTED,
      },
    });
  }, [friendRequestId, mutation]);

  return (
    <ListItem key={id} disablePadding sx={{ py: 1 }}>
      <ListItemAvatar>
        <Avatar>{username.slice(0, 2).toUpperCase()}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={username} secondary={email} />
      <IconButton onClick={handleRemove}>
        <Remove />
      </IconButton>
    </ListItem>
  );
};
