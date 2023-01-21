import { Grid, Typography } from "@mui/material";
import Modal from "./Modal";

export default function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Grid container direction="column">
        <Grid item>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Log in with your account
          </Typography>
        </Grid>
      </Grid>
    </Modal>
  );
}
