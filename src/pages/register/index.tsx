import { RegisterForm } from "@/components/RegisterForm";
import { useAuthContext } from "@/hooks/use-auth-context";
import { registerUser } from "@/lib/api/user/api";
import type { RegisterPayload } from "@/lib/api/user/dto";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function RegisterPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["user", "register"],
    mutationFn: (payload: RegisterPayload) =>
      registerUser(payload.displayName, payload.email, payload.password),
  });

  const handleSubmit = (values: RegisterPayload) =>
    mutation.mutate(values, {
      onSuccess() {
        toast.success("Registration success", {
          description: "Redirecting you to the login screen",
        });
        navigate("/login", { replace: true });
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
          <p className="text-center">Join as a Pustaka Member</p>
        </header>
        <RegisterForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}
