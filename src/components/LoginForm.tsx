import { Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import PasswordTextField from "./PasswordTextField";
import { isNil } from "lodash";
import { emailValidationRules } from "@/utils/email-validation-rules";
import { passwordValidationRules } from "@/utils/password-validation-rules";
import Button from "./Button";
import { LoginUserData, useLoginMutation } from "@/queries/login.mutation";
import { useRouter } from "next/navigation";

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const { handleSubmit, control } = useForm<LoginUserData>();
  const onSubmit = (data: LoginUserData) =>
    mutation.mutate(data, {
      onSuccess: () => {
        if (!isNil(onSuccess)) {
          onSuccess();
        }
        router.push("/calendar");
      },
    });

  const mutation = useLoginMutation();

  const router = useRouter();

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
