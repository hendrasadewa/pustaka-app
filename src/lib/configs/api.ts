import ky, { isHTTPError, type BeforeErrorState } from "ky";

import { LocalStorageKeys, SessionKeys } from "@/lib/configs/session";
import type { APIResponse } from "../api/base/dto";

export function createAPI() {
  const api = ky.create({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    hooks: {
      beforeRequest: [
        req => {
          const token = localStorage.getItem(LocalStorageKeys.TOKEN);
          if (!token) {
            return;
          }
          req.request.headers.set("Authorization", `${SessionKeys.TOKEN_TYPE} ${token}`)
        },
      ],
      beforeError: [
        async ({ error }: BeforeErrorState) => {
          if (isHTTPError(error)) {
            const body = await error.response.clone().json() as APIResponse<null>;
            error.message = body.message ?? error.message;
            return error;
          }
          return error;
        },
      ],
    }
  });

  return api;
}

export default createAPI();