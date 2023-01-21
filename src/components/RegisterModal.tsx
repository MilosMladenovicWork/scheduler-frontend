import { Close } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import Modal from "./Modal";

export default function RegisterModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Grid container direction="column">
        <Grid item alignSelf="flex-end"></Grid>
        <Grid item>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Register with your email address
          </Typography>
        </Grid>
      </Grid>
    </Modal>
  );
}
