import { Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { isNil } from "lodash";
import Button from "./Button";
import { usernameValidationRules } from "@/utils/username-validation-rules";
import {
  AddFriendData,
  useAddFriendMutation,
} from "@/queries/add-friend.mutation";
import { FormError } from "./FormError";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/queries/login.mutation";

export default function AddFriendForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [formError, setFormError] = useState<string>();

  const { handleSubmit, control } = useForm<AddFriendData>();
  const onSubmit = (data: AddFriendData) =>
    mutation.mutate(data, {
      onSuccess,
      onError: (e) => {
        setFormError((e as AxiosError<ErrorResponse>).response?.data.message);
      },
    });

  const mutation = useAddFriendMutation();

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
        <FormError error={formError} />
        <Grid item>
          <Button
            variant="contained"
            isLoading={mutation.isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
