import { createContext, Dispatch, SetStateAction } from "react";
import { AuthenticatedUserData } from "./auth.provider";

type AuthContextData = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  user: AuthenticatedUserData | null;
  setUser: Dispatch<SetStateAction<AuthenticatedUserData | null>>;
};

export const AuthContext = createContext<AuthContextData | null>(null);
