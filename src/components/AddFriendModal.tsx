import { Grid, Typography } from "@mui/material";
import AddFriendForm from "./AddFriendForm";
import Modal from "./Modal";

export default function AddFriendModal({
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
            Add friend by their username
          </Typography>
        </Grid>
        <Grid item>
          <AddFriendForm onSuccess={onClose} />
        </Grid>
      </Grid>
    </Modal>
  );
}
