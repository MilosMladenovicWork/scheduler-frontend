import { Grid, Typography } from "@mui/material";
import CreateScheduleForm from "./CreateScheduleForm";
import Modal from "./Modal";

export default function CreateScheduleModal({
  open,
  onClose,
  startDate,
  endDate,
  userIds,
}: {
  open: boolean;
  onClose: () => void;
  startDate?: Date;
  endDate?: Date;
  userIds: string[];
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Grid container direction="column" rowSpacing={4}>
        <Grid item>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Create schedule
          </Typography>
        </Grid>
        <Grid item>
          <CreateScheduleForm
            onSuccess={onClose}
            startDate={startDate}
            endDate={endDate}
            userIds={userIds}
          />
        </Grid>
      </Grid>
    </Modal>
  );
}
