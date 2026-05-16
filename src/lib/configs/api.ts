import { toast } from "sonner";
import ky, { isHTTPError, type BeforeErrorState } from "ky";

import { SessionKeys } from "@/lib/configs/session";
import type { APIResponse } from "../api/base/dto";
import { getToken } from "../utils";

export function createAPI() {
  const api = ky.create({
    baseUrl: import.meta.env.BASE_URL,
    hooks: {
      beforeRequest: [
        (req) => {
          const token = getToken();
          if (token) {
            req.request.headers.set(
              "Authorization",
              `${SessionKeys.TOKEN_TYPE} ${token}`,
            );
          }
        },
      ],

      beforeError: [
        async ({ error }: BeforeErrorState) => {
          const httpError = isHTTPError<APIResponse<null>>(error);
          if (!httpError) {
            toast.error(error.name, { description: error.message });
            console.error(error);
            return error;
          }
          if (
            typeof error.data === "object" &&
            error.data !== null &&
            "message" in error.data
          ) {
            toast.error("Request Failed", {
              description: error.data.message || error.message,
            });
          }

          if (error.response.status === 401) {
            globalThis.location.href = "/logout";
          }

          return error;
        },
      ],
    },
  });

  return api;
}

export default createAPI();
