import { AuthenticatorContext } from "@/contexts/Authenticator";
import { useContext } from "react";

const LogoutButton = () => {
  const { logout } = useContext(AuthenticatorContext);

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
