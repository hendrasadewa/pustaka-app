import { UserIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useAuthContext } from "@/hooks/use-auth-context";

export function UserMenu() {
  const { user } = useAuthContext();
  
  const initial = user?.displayName.at(0) ?? "U";

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarFallback><UserIcon /></AvatarFallback>
      </Avatar>
    </div>
  );
}
