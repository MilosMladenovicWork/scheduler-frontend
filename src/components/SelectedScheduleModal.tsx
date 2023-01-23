import { ScheduleResponseItem } from "@/queries/get-schedules.query";
import { Grid, Typography } from "@mui/material";
import Modal from "./Modal";

export default function SelectedScheduleModal({
  open,
  onClose,
  schedule,
}: {
  open: boolean;
  onClose: () => void;
  schedule?: ScheduleResponseItem;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Grid container direction="column" rowSpacing={4}>
        <Grid item>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {schedule?.title}
          </Typography>
        </Grid>
        <Grid item container>
          {JSON.stringify(schedule)}
        </Grid>
      </Grid>
    </Modal>
  );
}
