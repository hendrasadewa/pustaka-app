import { AuthContext } from "@/components/AuthContext";
import { useContext } from "react";

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}