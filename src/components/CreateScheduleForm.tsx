import { Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { isNil } from "lodash";
import Button from "./Button";
import { usernameValidationRules } from "@/utils/username-validation-rules";
import {
  AddFriendData,
  useAddFriendMutation,
} from "@/queries/add-friend.mutation";
import {
  CreateScheduleData,
  useCreateScheduleMutation,
} from "@/queries/create-schedule.mutation";
import { useGetProfileQuery } from "@/queries/get-profile.query";

export default function CreateScheduleForm({
  startDate,
  endDate,
  onSuccess,
}: {
  startDate?: Date;
  endDate?: Date;
  onSuccess?: () => void;
}) {
  const { data: profileData } = useGetProfileQuery();
  const { handleSubmit, control } = useForm<CreateScheduleData>();
  const onSubmit = (data: CreateScheduleData) => {
    // TODO: handle all needed fields by react-hook-form, not only title
    if (!isNil(profileData) && !isNil(startDate) && !isNil(endDate)) {
      return mutation.mutate(
        {
          title: data.title,
          userIds: [profileData.userId],
          scheduleStartDate: startDate,
          scheduleEndDate: endDate,
        },
        {
          onSuccess,
        }
      );
    }
  };

  const mutation = useCreateScheduleMutation();

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Controller
            name="title"
            control={control}
            // TODO: change validation
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
