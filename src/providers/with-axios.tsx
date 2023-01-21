import { api } from "@/api/api";
import { AuthQueryData, useLoginMutation } from "@/queries/login.mutation";
import { isNil } from "lodash";
import { ReactNode, useEffect } from "react";
import { useQuery } from "react-query";

export const WithAxios = ({ children }: { children: ReactNode }) => {
  const mutation = useLoginMutation();

  const { data: authData } = useQuery<AuthQueryData>({
    queryKey: ["auth"],
  });

  useEffect(() => {
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const errStatusCode = error.response.data.statusCode as number;
        if (errStatusCode === 401 && !isNil(authData)) {
          await mutation.mutateAsync({
            email: authData.email,
            password: authData.password,
          });
        }
        return Promise.reject(error);
      }
    );
  }, [authData, mutation]);

  return <>{children}</>;
};
