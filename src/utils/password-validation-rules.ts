import { ControllerProps } from "react-hook-form";

export const passwordValidationRules: ControllerProps["rules"] = {
  minLength: {
    message: "Password must be at least 8 characters long.",
    value: 8,
  },
};
