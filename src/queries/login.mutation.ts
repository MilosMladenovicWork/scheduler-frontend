import { api } from "@/api/api";
import { LoginResponseData } from "@/types/login-response-data.type";
import { Response } from "@/types/response.type";
import { useMutation, useQueryClient } from "react-query";

export type LoginUserData = { email: string; password: string };

export type AuthQueryData = { token: string };

export type ErrorResponse = {
  statusCode: number;
  message?: string;
  error: string;
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (loginUserData: LoginUserData) => {
      return api.post<Response<LoginResponseData>>(
        "/auth/login",
        loginUserData
      );
    },
    {
      onSuccess: ({
        data: {
          data: { access_token },
        },
      }) => {
        queryClient.setQueryData<AuthQueryData>("auth", {
          token: access_token,
        });
      },
    }
  );
};
