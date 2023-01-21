import { ReactNode, useState } from "react";
import { AuthContext } from "./auth.context";

export type AuthenticatedUserData = {
  id: string;
  username: string;
  email: string;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  const [user, setUser] = useState<AuthenticatedUserData | null>(null);
  return (
    <AuthContext.Provider value={{ setToken, token, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
