import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import {
  CalendarMonth,
  Groups,
  Logout,
  PersonAddAlt1,
} from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";
import NextLink from "next/link";
import Link from "next/link";

export default function DashboardDrawer({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const handleCloseMenu = () => setOpen(false);

  const handleOpenMenu = () => setOpen(true);
  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={handleCloseMenu}
      onOpen={handleOpenMenu}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={handleCloseMenu}
        onKeyDown={handleCloseMenu}
      >
        <List>
          <Link href="/calendar">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{<CalendarMonth />}</ListItemIcon>
                <ListItemText primary="Calendar" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/friend-requests">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{<PersonAddAlt1 />}</ListItemIcon>
                <ListItemText primary="Friend requests" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/friends">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{<Groups />}</ListItemIcon>
                <ListItemText primary="Friends" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton href="/">
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </SwipeableDrawer>
  );
}
