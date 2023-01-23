import { Close } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Fade,
  Grid,
  IconButton,
  Modal as MuiModal,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

const style: SxProps<Theme> = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  pt: 2,
  height: { xs: "100vh", sm: "auto" },
  width: { xs: "100vw", sm: 600 },
};

export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <MuiModal
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
          <Grid container justifyContent="flex-end">
            <Grid item>
              <IconButton
                onClick={onClose}
                edge="end"
                sx={{ marginLeft: "auto" }}
              >
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          {children}
        </Box>
      </Fade>
    </MuiModal>
  );
}
