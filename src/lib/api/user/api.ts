import api from "@/lib/configs/api";
import type { APIResponse } from "../base/dto";
import type { UserEntity } from "./entity";

export const registerUser = (
  displayName: string,
  email: string,
  password: string,
) =>
  api.post<APIResponse<UserEntity | null>>("/users/register", {
    json: {
      displayName,
      email,
      password,
    },
  });

export const loginUser = (email: string, password: string) =>
  api.post<APIResponse<{ token: string }>>("/users/login", {
    json: {
      email,
      password,
    },
  }).json();

export const getMyInfo = () => api.get<APIResponse<UserEntity>>("/users/me").json();

