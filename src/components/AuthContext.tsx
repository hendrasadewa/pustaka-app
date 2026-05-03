import type { UserEntity } from "@/lib/api/user/entity";
import { createContext } from "react";

export interface AuthContextValues {
  token: string | null;
  user?: UserEntity | null;
  loadSession(token: string): void;
  revokeSession(): void;
}

export const AuthContext = createContext<AuthContextValues>({
  token: null,
  user: null,
  loadSession() {},
  revokeSession() {},
});

