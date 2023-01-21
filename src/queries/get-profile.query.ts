import { api } from "@/api/api";
import { Response } from "@/types/response.type";
import { useQuery } from "react-query";
import { AuthQueryData } from "./login.mutation";

export type GetProfile = { email: string; password: string };

export type GetProfileResponse = {
  id: string;
  email: string;
  username: string;
};

export const useGetProfileQuery = () => {
  const { data } = useQuery<AuthQueryData>({
    queryKey: ["auth"],
  });

  return useQuery("loggedInUserProfile", () =>
    api.get<Response<GetProfileResponse>>("/auth/login", {
      headers: { Authorization: `Bearer ${data?.token}` },
    })
  );
};
