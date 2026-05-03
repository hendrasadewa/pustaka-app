type UserStatus = "active" | "inactive";

export interface UserEntity {
  displayName: string;
  email: string;
  status: UserStatus;
}
