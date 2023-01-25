import Head from "next/head";
import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";
import LoginModal from "@/components/LoginModal";
import { useState } from "react";
import RegisterModal from "@/components/RegisterModal";
import Button from "@/components/Button";
import runningPersonSvg from "../../public/running_person.svg";
import Image from "next/image";

export default function Home() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);

  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const handleOpenRegisterModal = () => setOpenRegisterModal(true);
  const handleCloseRegisterModal = () => setOpenRegisterModal(false);

  return (
    <>
      <Head>
        <title>Scheduled | Home</title>
        <meta
          name="description"
          content="Welcome to your own schedule managment app."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={handleOpenLoginModal}
                >
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={handleOpenRegisterModal}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl">
        <main>
          <Grid
            container
            alignItems="center"
            sx={{ flexDirection: { xs: "row", sm: "row-reverse" } }}
          >
            <Grid
              item
              xs={12}
              sm={7}
              sx={{
                position: "relative",
                height: { xs: "40vh", sm: "70vh" },
              }}
            >
              <Image src={runningPersonSvg} alt="" fill />
            </Grid>
            <Grid item xs={12} sm={5} container>
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  sx={{ fontSize: { xs: 56, md: 72, lg: 96 } }}
                >
                  Schedule
                </Typography>
                <Typography variant="body1">
                  Organize your schedule with your friends
                </Typography>
                <Grid
                  container
                  xs={12}
                  md={6}
                  direction="column"
                  rowSpacing={1}
                  sx={{ mt: 1 }}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleOpenRegisterModal}
                    >
                      Sign up
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleOpenLoginModal}
                    >
                      Log in
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </Container>
      <LoginModal open={openLoginModal} onClose={handleCloseLoginModal} />
      <RegisterModal
        open={openRegisterModal}
        onClose={handleCloseRegisterModal}
      />
    </>
  );
}
