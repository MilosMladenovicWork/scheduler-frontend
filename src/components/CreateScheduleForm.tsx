import { Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { isNil } from "lodash";
import Button from "./Button";
import { usernameValidationRules } from "@/utils/username-validation-rules";
import {
  CreateScheduleData,
  useCreateScheduleMutation,
} from "@/queries/create-schedule.mutation";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/queries/login.mutation";
import { FormError } from "./FormError";

export default function CreateScheduleForm({
  startDate,
  endDate,
  onSuccess,
  userIds,
}: {
  startDate?: Date;
  endDate?: Date;
  onSuccess?: () => void;
  userIds: string[];
}) {
  const [formError, setFormError] = useState<string>();

  const { handleSubmit, control } = useForm<CreateScheduleData>();
  const onSubmit = (data: CreateScheduleData) => {
    if (!isNil(startDate) && !isNil(endDate)) {
      return mutation.mutate(
        {
          title: data.title,
          userIds,
          scheduleStartDate: startDate,
          scheduleEndDate: endDate,
          description: data.description,
        },
        {
          onSuccess,
          onError: (e) => {
            setFormError(
              (e as AxiosError<ErrorResponse>).response?.data.message
            );
          },
        }
      );
    }
  };

  const mutation = useCreateScheduleMutation();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Controller
            name="title"
            control={control}
            rules={usernameValidationRules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                onChange={onChange}
                value={value}
                label="Title"
                error={!isNil(error)}
                helperText={!isNil(error) ? error?.message : null}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                multiline
                rows={3}
                onChange={onChange}
                value={value}
                label="Description"
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
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
