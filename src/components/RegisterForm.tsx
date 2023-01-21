import { Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import PasswordTextField from "./PasswordTextField";
import { isNil } from "lodash";
import { emailValidationRules } from "@/utils/email-validation-rules";
import { passwordValidationRules } from "@/utils/password-validation-rules";
import { usernameValidationRules } from "@/utils/username-validation-rules";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Button from "./Button";

type RegisterUserData = { username: string; email: string; password: string };

export default function RegisterForm() {
  const { handleSubmit, control } = useForm<RegisterUserData>();
  const onSubmit = (data: RegisterUserData) => mutation.mutate(data);

  const mutation = useMutation((newUser: RegisterUserData) => {
    return axios.post("http://localhost:3000/register", newUser);
  });

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Controller
            name="username"
            control={control}
            rules={usernameValidationRules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                onChange={onChange}
                value={value}
                label="Username"
                error={!isNil(error)}
                helperText={!isNil(error) ? error?.message : null}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="email"
            control={control}
            rules={emailValidationRules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                onChange={onChange}
                value={value}
                label="Email"
                error={!isNil(error)}
                helperText={!isNil(error) ? error?.message : null}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="password"
            control={control}
            rules={passwordValidationRules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <PasswordTextField
                fullWidth
                onChange={onChange}
                value={value}
                label="Password"
                error={!isNil(error)}
                helperText={!isNil(error) ? error.message : null}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            isLoading={mutation.isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
