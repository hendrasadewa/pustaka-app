import { UserIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from "./ui/avatar";

export function UserMenu() {

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarFallback><UserIcon /></AvatarFallback>
      </Avatar>
    </div>
  );
}
