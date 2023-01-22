import { useFriendsQuery } from "@/queries/get-friends.query";
import {
  Autocomplete,
  Avatar,
  AvatarGroup,
  Grid,
  TextField,
} from "@mui/material";
import { isEmpty, isNil } from "lodash";
import { useEffect, useState } from "react";

export default function CalendarFriendsSelect({
  onChange,
}: {
  onChange: (listOfFriends: { label: string; id: string }[]) => void;
}) {
  const [selectedFriends, setSelectedFriends] = useState<
    { label: string; id: string }[]
  >([]);

  const { data: friendsData } = useFriendsQuery();

  const handleSelectFriendChange = (
    _event: unknown,
    newInputValue: { label: string; id: string } | null
  ) => {
    if (!isNil(newInputValue)) {
      setSelectedFriends((prevValue) => {
        const sameFriend = prevValue.find(({ id }) => id === newInputValue.id);

        if (isNil(sameFriend)) {
          return [...prevValue, newInputValue];
        }

        return prevValue;
      });
    }
  };

  const handleAvatarClick = (id: string) => {
    setSelectedFriends((prevValues) => {
      return prevValues.filter((prevValue) => prevValue.id !== id);
    });
  };

  useEffect(() => {
    onChange(selectedFriends);
  }, [onChange, selectedFriends]);

  return !isNil(friendsData) && !isEmpty(friendsData) ? (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <AvatarGroup>
          {selectedFriends.map(({ id, label }) => (
            <FriendAvatar
              key={id}
              id={id}
              label={label}
              onClick={handleAvatarClick}
            />
          ))}
        </AvatarGroup>
      </Grid>
      <Grid item>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={friendsData.map(({ username, id }) => ({
            label: username,
            id,
          }))}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Add friend" />}
          onChange={handleSelectFriendChange}
        />
      </Grid>
    </Grid>
  ) : null;
}

const FriendAvatar = ({
  id,
  label,
  onClick,
}: {
  id: string;
  label: string;
  onClick: (id: string) => void;
}) => {
  return (
    <Avatar key={id} onClick={() => onClick(id)} sx={{ cursor: "pointer" }}>
      {label.slice(0, 2).toUpperCase()}
    </Avatar>
  );
};
