import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from "@mui/material";

export default function Button({
  children,
  disabled,
  isLoading,
  ...props
}: MuiButtonProps & { isLoading?: boolean }) {
  return (
    <MuiButton disabled={disabled || isLoading} {...props}>
      {isLoading && (
        <CircularProgress
          size={30}
          color="secondary"
          style={{ position: "absolute" }}
        />
      )}{" "}
      {children}
    </MuiButton>
  );
}
