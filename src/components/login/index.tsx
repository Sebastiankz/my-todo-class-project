import { useState, useContext } from "react";
import { AuthenticatorContext } from "@/contexts/Authenticator";

const Login = () => {
  const { login } = useContext(AuthenticatorContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setMessage("Email and password are required");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await login({ email, password });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <div>
          <input
            value={email}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </div>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default Login;
