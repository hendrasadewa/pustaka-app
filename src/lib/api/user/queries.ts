import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { useNavigate } from 'react-router';

import { AuthContext } from '@/components/AuthContext';
import { loginUser, registerUser } from "./api";
import { LoginSchema, RegisterSchema, type LoginPayload, type RegisterPayload } from "./dto";

export function useLogin() {
  const navigate = useNavigate();
  const { loadSession } = useContext(AuthContext);
  const form = useForm({
    resolver: zodResolver(LoginSchema)
  });

  const mutation = useMutation({
    mutationKey: ["user", "login"],
    mutationFn: (payload: LoginPayload) =>
      loginUser(payload.email, payload.password),
    onSuccess: async (response) => {
      const json = await response.json()
      loadSession(json.data.token);
      navigate("/admin/books");
    }
  });

  const onSubmit = form.handleSubmit(
    (data) => mutation.mutate(data),
  )

  return { onSubmit, isSubmitting: mutation.isPending, form };
}

export function useRegister() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(RegisterSchema)
  });

  const mutation = useMutation({
    mutationKey: ["user", "register"],
    mutationFn: (payload: RegisterPayload) =>
      registerUser(payload.displayName, payload.email, payload.password),
    onSuccess: () => {
      navigate("/login");
    }
  });

  const onSubmit = form.handleSubmit(
    (data) => mutation.mutate(data),
  );

  return { onSubmit, isSubmitting: mutation.isPending, form };
}
