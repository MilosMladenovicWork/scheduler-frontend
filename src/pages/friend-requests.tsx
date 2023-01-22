import DashboardLayout from "@/components/DashboardLayout";
import { useFriendRequestsQuery } from "@/queries/get-friend-requests.query";
import { useGetProfileQuery } from "@/queries/get-profile.query";
import { Add } from "@mui/icons-material";
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
import { useMemo } from "react";

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

  const primaryText = data?.id === senderId ? receiverId : senderId;

  const listItem = useMemo(() => {
    return (
      <ListItem key={id} disablePadding sx={{ py: 1 }}>
        <ListItemAvatar>
          <Avatar>{primaryText.slice(0, 2).toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={primaryText} />
        <IconButton>
          <Add />
        </IconButton>
      </ListItem>
    );
  }, [id, primaryText]);

  return isLoading ? <Skeleton>{listItem}</Skeleton> : listItem;
};
