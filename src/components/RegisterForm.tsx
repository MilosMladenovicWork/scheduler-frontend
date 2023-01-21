import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import PasswordTextField from "./PasswordTextField";

export default function RegisterForm() {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                onChange={onChange}
                value={value}
                label="Username"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                onChange={onChange}
                value={value}
                label="Email"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PasswordTextField
                fullWidth
                onChange={onChange}
                value={value}
                label="Password"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
