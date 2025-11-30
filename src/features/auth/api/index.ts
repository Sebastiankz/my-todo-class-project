import { api } from "@/lib/api-client";
import config from "@/config";
import type { RegisterCredentials } from "@/types/auth";

export const registerUser = async (credentials: RegisterCredentials) => {
  return api.post(
    `${config.API_AUTHENTICATION_URL}/signup-direct`,
    credentials
  );
};
