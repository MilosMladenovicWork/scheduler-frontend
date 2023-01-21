import { Close } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Fade,
  Grid,
  IconButton,
  Modal,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";

const style: SxProps<Theme> = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  height: { xs: "100vh", sm: "auto" },
  width: { xs: "100vw", sm: 600 },
};

export default function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Grid container direction="column">
            <Grid item alignSelf="flex-end">
              <IconButton onClick={onClose} edge="end">
                <Close />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Log in with your account
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}
