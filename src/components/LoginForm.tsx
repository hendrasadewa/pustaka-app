import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginSchema, type LoginPayload } from "@/lib/api/user/dto";

interface Props {
  onSubmit(values: LoginPayload): void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit = () => {}, isLoading }: Props) {
  const form = useForm({
    disabled: isLoading,
    resolver: zodResolver(LoginSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="me@example.com"
            required
            {...form.register("email")}
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="minimum 8 characters"
            required
            {...form.register("password")}
          />
          <FieldError />
        </Field>
        <Field>
          <Button type="submit">Login</Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <a href="/register">Register here</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
