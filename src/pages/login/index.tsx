import { LoginForm } from "@/components/LoginForm";
import { useAuthContext } from "@/hooks/use-auth-context";
import { loginUser } from "@/lib/api/user/api";
import type { LoginPayload } from "@/lib/api/user/dto";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function LoginPage() {
  const { user, loadSession } = useAuthContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["user"],
    mutationFn: (payload: LoginPayload) =>
      loginUser(payload.email, payload.password),
  });

  const handleSubmit = (values: LoginPayload) =>
    mutation.mutate(values, {
      async onSuccess(response) {
        const json = await response.json();
        loadSession(json.data.token);
        toast.success("Welcome back!");
        navigate("/", { replace: true });
      },
    });

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <div className="p-4 min-h-screen flex flex-col justify-center">
        <header className="py-4">
          <h1 className="font-heading font-bold text-2xl text-center">
            Pustaka
          </h1>
          <p className="text-center">Please login to continue</p>
        </header>
        <LoginForm onSubmit={handleSubmit}/>
      </div>
    </>
  );
}
