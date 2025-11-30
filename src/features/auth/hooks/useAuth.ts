import { useContext } from "react";
import { AuthenticatorContext } from "@/contexts/Authenticator";

export const useAuth = () => {
  const context = useContext(AuthenticatorContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthenticatorProvider");
  }

  return context;
};
