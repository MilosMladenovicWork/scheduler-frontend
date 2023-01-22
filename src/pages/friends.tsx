import DashboardLayout from "@/components/DashboardLayout";
import { useFriendsQuery } from "@/queries/get-friends.query";
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

export default function Friends() {
  const { data } = useFriendsQuery();

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} sm={6} lg={4}>
            <List>
              {data?.map(({ id, username, email }) => {
                return (
                  <Friend key={id} id={id} username={username} email={email} />
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}

const Friend = ({
  id,
  email,
  username,
}: {
  id: string;
  email: string;
  username: string;
}) => {
  return (
    <ListItem key={id} disablePadding sx={{ py: 1 }}>
      <ListItemAvatar>
        <Avatar>{username.slice(0, 2).toUpperCase()}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={username} secondary={email} />
      <IconButton>
        <Remove />
      </IconButton>
    </ListItem>
  );
};
