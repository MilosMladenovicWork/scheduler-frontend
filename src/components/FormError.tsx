import { Grid, Stack, Typography } from "@mui/material";
import { Dangerous } from "@mui/icons-material";

export const FormError = ({ error }: { error?: string }) => {
  return (
    <>
      {error && (
        <Grid item>
          <Stack direction="row" alignItems="center" gap={1}>
            <Dangerous color="error" />
            <Typography variant="caption" color="error" textAlign="center">
              {error}
            </Typography>
          </Stack>
        </Grid>
      )}
    </>
  );
};
