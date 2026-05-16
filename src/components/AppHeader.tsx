import { useAuthContext } from "@/hooks/use-auth-context";
import { UserCircleIcon } from "lucide-react";

export function AppHeader() {
  const { user } = useAuthContext()
  console.log({ user })
  return (
    <header className="flex items-center justify-between p-4">
      <h1 className="font-heading text-2xl font-bold">Pustaka</h1>
      <div className="flex items-center gap-2">
        {user ? <a href={`/user/${user.email}`}>{user.displayName}</a> :<a href="/login">Login</a>}
        <UserCircleIcon />
      </div>
    </header>
  );
}
