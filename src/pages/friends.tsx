import DashboardLayout from "@/components/DashboardLayout";
import { FriendRequestStatusEnum } from "@/queries/get-friend-requests.query";
import { useFriendsQuery } from "@/queries/get-friends.query";
import { useUpdateFriendRequestMutation } from "@/queries/update-friends.mutation";
import { Remove } from "@mui/icons-material";
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import Image from "next/image";
import { useCallback } from "react";
import parkSvg from "../../public/park.svg";

export default function Friends() {
  const { data } = useFriendsQuery();

  return (
    <DashboardLayout>
      <Grid container rowSpacing={{ xs: 1, sm: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h2">Friends</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} sm={4}>
            {!isEmpty(data) ? (
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
                      receivedFriendRequests[0]?.id ||
                      sentFriendRequests[0]?.id;
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
            ) : (
              <Typography variant="body1">
                You have no friends connected with your account.
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs
            sx={{
              position: "relative",
              height: "70vh",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Image src={parkSvg} alt="" fill />
          </Grid>
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
