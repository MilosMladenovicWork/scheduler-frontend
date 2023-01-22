import { api } from "@/api/api";
import { AuthQueryData, useLoginMutation } from "@/queries/login.mutation";
import { ReactNode, useEffect } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";

export const WithAxios = ({ children }: { children: ReactNode }) => {
  const mutation = useLoginMutation();

  const router = useRouter();

  const { data: authData } = useQuery<AuthQueryData>({
    queryKey: ["auth"],
  });

  useEffect(() => {
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const errorStatusCode = error.response.data.statusCode as number;
        if (errorStatusCode === 401) {
          router.push("/");
        }
        return Promise.reject(error);
      }
    );
  }, [authData, mutation, router]);

  return <>{children}</>;
};
