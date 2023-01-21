import { Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import PasswordTextField from "./PasswordTextField";
import { isNil } from "lodash";
import { emailValidationRules } from "@/utils/email-validation-rules";
import { passwordValidationRules } from "@/utils/password-validation-rules";
import Button from "./Button";
import axios from "axios";
import { useMutation } from "react-query";
import { useContext } from "react";
import { AuthContext } from "@/state/auth.context";
import { Response } from "@/types/response.type";
import { LoginResponseData } from "@/types/login-response-data.type";

type LoginUserData = { email: string; password: string };

export default function LoginForm() {
  const { handleSubmit, control } = useForm<LoginUserData>();
  const onSubmit = (data: LoginUserData) => mutation.mutate(data);

  const mutation = useMutation((loginUserData: LoginUserData) => {
    return axios.post<Response<LoginResponseData>>(
      "http://localhost:3000/auth/login",
      loginUserData
    );
  });

  const authContext = useContext(AuthContext);

  if (mutation.isSuccess) {
    authContext?.setToken(mutation.data.data.data.access_token);
  }

  return (
    <form>
      <Grid container direction="column" spacing={2}>
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
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
