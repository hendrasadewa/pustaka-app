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
import { RegisterSchema, type RegisterPayload } from "@/lib/api/user/dto";

interface Props {
  isLoading?: boolean;
  onSubmit?(values: RegisterPayload): void;
}

export function RegisterForm({ isLoading = false, onSubmit = () => {} }: Props) {
  const form = useForm({
    disabled: isLoading,
    resolver: zodResolver(RegisterSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="displayName">Display Name</FieldLabel>
          <Input
            id="displayName"
            type="text"
            placeholder="John Doe"
            required
            {...form.register("displayName")}
          />
          <FieldError />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="me@example.com"
            required
            {...form.register("email")}
          />
          <FieldError />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
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
          <Button type="submit">
            Register
          </Button>
          <FieldDescription className="text-center">
            Already have an account? <a href="/login">Login</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
