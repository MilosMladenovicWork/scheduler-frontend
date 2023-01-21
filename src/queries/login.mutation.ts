import { AuthContext } from "@/state/auth.context";
import { LoginResponseData } from "@/types/login-response-data.type";
import { Response } from "@/types/response.type";
import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";

export type LoginUserData = { email: string; password: string };

export const useLoginMutation = () => {
  const authContext = useContext(AuthContext);

  return useMutation(
    (loginUserData: LoginUserData) => {
      return axios.post<Response<LoginResponseData>>(
        "http://localhost:3000/auth/login",
        loginUserData
      );
    },
    {
      onSuccess: ({
        data: {
          data: { access_token },
        },
      }) => {
        authContext?.setToken(access_token);
      },
    }
  );
};
