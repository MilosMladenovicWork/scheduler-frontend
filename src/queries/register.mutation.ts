import { api } from "@/api/api";
import { Response } from "@/types/response.type";
import { useMutation } from "react-query";
import { useLoginMutation } from "./login.mutation";

export type RegisterUserData = {
  username: string;
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  id: string;
  username: string;
  email: string;
};

export const useRegisterMutation = () => {
  const loginMutation = useLoginMutation();

  return useMutation(
    (newUser: RegisterUserData) => {
      return api.post<Response<RegisterUserResponse>>("/register", newUser);
    },
    {
      onSuccess: (_data, { email, password }) => {
        loginMutation.mutate({
          email,
          password,
        });
      },
    }
  );
};
