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
import { Check, Close } from "@mui/icons-material";
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import callSvg from "../../public/call.svg";

export default function FriendRequests() {
  const [openAddFriendModal, setOpenAddFriendModal] = useState(false);
  const handleOpenAddFriendModal = () => setOpenAddFriendModal(true);
  const handleCloseAddFriendModal = () => setOpenAddFriendModal(false);

  const { data } = useFriendRequestsQuery();
  return (
    <DashboardLayout>
      <main>
        <Grid container rowSpacing={2}>
          <Grid item container justifyContent="flex-end">
            <Grid item>
              <Button variant="contained" onClick={handleOpenAddFriendModal}>
                Add friend
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">Requests</Typography>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} sm={4}>
              <List>
                {data?.map(({ id, receiverId, senderId }) => {
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
            <Grid
              item
              xs
              sx={{
                position: "relative",
                height: "70vh",
                display: { xs: "none", sm: "flex" },
              }}
            >
              <Image src={callSvg} alt="" fill />
            </Grid>
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
