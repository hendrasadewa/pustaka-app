import { useContext } from "react";
import { AuthContext } from "@/components/AuthContext";

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}