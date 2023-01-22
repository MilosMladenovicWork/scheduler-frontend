import { Grid, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
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
      <Grid container direction="column" rowSpacing={4}>
        <Grid item>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Log in with your account
          </Typography>
        </Grid>
        <Grid item>
          <LoginForm onSuccess={onClose} />
        </Grid>
      </Grid>
    </Modal>
  );
}
