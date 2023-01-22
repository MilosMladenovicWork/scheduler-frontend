import AddFriendModal from "@/components/AddFriendModal";
import Button from "@/components/Button";
import DashboardLayout from "@/components/DashboardLayout";
import {
  FriendRequestStatusEnum,
  useFriendRequestsQuery,
} from "@/queries/get-friend-requests.query";
import { useGetProfileQuery } from "@/queries/get-profile.query";
import { useGetUserQuery } from "@/queries/get-user.query";
import { useRespondToFriendRequestMutation } from "@/queries/respond-to-friend-request.mutation";
import { useUpdateFriendRequestMutation } from "@/queries/update-friends.mutation";
import { Check, Close } from "@mui/icons-material";
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
import { useCallback, useMemo, useState } from "react";

export default function FriendRequests() {
  const [openAddFriendModal, setOpenAddFriendModal] = useState(false);
  const handleOpenAddFriendModal = () => setOpenAddFriendModal(true);
  const handleCloseAddFriendModal = () => setOpenAddFriendModal(false);

  const { data } = useFriendRequestsQuery();
  return (
    <DashboardLayout>
      <main>
        <Grid container>
          <Grid item container justifyContent="flex-end">
            <Grid item>
              <Button variant="contained" onClick={handleOpenAddFriendModal}>
                Add friend
              </Button>
            </Grid>
          </Grid>
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
      <AddFriendModal
        open={openAddFriendModal}
        onClose={handleCloseAddFriendModal}
      />
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

  const primaryText = data?.userId === senderId ? receiverId : senderId;

  const isCurrentUserSender = senderId === data?.userId;

  const { data: userData } = useGetUserQuery({
    userId: isCurrentUserSender ? receiverId : senderId,
  });

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
          <Avatar>{userData?.username.slice(0, 2).toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={userData?.username} />
        <IconButton onClick={handleReject}>
          <Close />
        </IconButton>
        {!isCurrentUserSender && (
          <IconButton onClick={handleAccept}>
            <Check />
          </IconButton>
        )}
      </ListItem>
    );
  }, [handleAccept, handleReject, id, isCurrentUserSender, userData?.username]);

  return isLoading ? <Skeleton>{listItem}</Skeleton> : listItem;
};
