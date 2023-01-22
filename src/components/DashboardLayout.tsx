import Head from "next/head";
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useGetProfileQuery } from "@/queries/get-profile.query";
import DashboardDrawer from "./DashboardDrawer";
import { ReactNode, useState } from "react";
import { Menu } from "@mui/icons-material";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data } = useGetProfileQuery();

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setDrawerOpen(true);

  return (
    <>
      <Head>
        <title>Scheduled | Dasboard</title>
        <meta
          name="description"
          content="Welcome to your own schedule managment app."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ minHeight: "100%" }}>
          <Toolbar disableGutters>
            <Grid container>
              <Grid
                container
                item
                alignItems="center"
                columnSpacing={2}
                xs="auto"
              >
                <Grid item>
                  <IconButton onClick={handleOpenDrawer}>
                    <Menu style={{ color: "#fff" }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    SCHEDULED
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item
                justifyContent="flex-end"
                alignItems="center"
                xs
              >
                <Grid item>{data?.username}</Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <DashboardDrawer isOpen={isDrawerOpen} setOpen={setDrawerOpen} />
      <Container maxWidth="xl" sx={{ pt: 2 }}>
        {children}
      </Container>
    </>
  );
}
