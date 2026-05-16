import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuthContext } from "@/hooks/use-auth-context";

export function LogoutPage() {
  const { revokeSession } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    revokeSession();

    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [revokeSession, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <h1 className="font-heading font-bold text-3xl">Pustaka</h1>
      <div className="flex items-center justify-center gap-2">
        <p className="animate-pulse">Safely logging you out...</p>
      </div>
    </div>
  );
}
