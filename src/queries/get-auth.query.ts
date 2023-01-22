import { useQuery } from "react-query";
import { AuthQueryData } from "./login.mutation";

export const useAuthQuery = () => {
  return useQuery<AuthQueryData>({
    queryKey: ["auth"],
    staleTime: Infinity,
  });
};
