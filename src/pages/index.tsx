import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";

export default function Home() {
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
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <main className={styles.main}></main>
    </>
  );
}
