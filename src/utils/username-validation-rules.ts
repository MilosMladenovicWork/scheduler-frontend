import { ControllerProps } from "react-hook-form";

export const usernameValidationRules: ControllerProps["rules"] = {
  minLength: {
    message: "Username must be at least 3 characters long",
    value: 3,
  },
};
