import Head from "next/head";
import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";
import LoginModal from "@/components/LoginModal";
import { useState } from "react";
import RegisterModal from "@/components/RegisterModal";
import Button from "@/components/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
        <main></main>
      </Container>
      <LoginModal open={openLoginModal} onClose={handleCloseLoginModal} />
      <RegisterModal
        open={openRegisterModal}
        onClose={handleCloseRegisterModal}
      />
    </>
  );
}
