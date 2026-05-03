import { useMemo, useState, type PropsWithChildren } from "react";
import { AuthContext, type AuthContextValues } from "./AuthContext";
import { LocalStorageKeys } from "@/lib/configs/session";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "@/lib/api/user/api";

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() =>
    window.localStorage.getItem(LocalStorageKeys.TOKEN),
  );

  const query = useQuery({
    queryKey: ["user", token],
    enabled: Boolean(token),
    queryFn: () => getMyInfo(),
    select: (response) => response.data ?? null,
  });

  const contextValues = useMemo<AuthContextValues>(
    () => ({
      token,
      user: query.data,
      loadSession: (value: string) => {
        if (!value) {
          console.error("failed to load session, token did not exists");
          return;
        }
        setToken(value);
        window.localStorage.setItem(LocalStorageKeys.TOKEN, value);
      },

      revokeSession: () => {
        setToken(null);
        window.localStorage.removeItem(LocalStorageKeys.TOKEN);
      },
    }),
    [query.data, token],
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
}
