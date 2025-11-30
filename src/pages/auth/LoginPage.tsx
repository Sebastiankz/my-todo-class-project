import { Link } from "react-router-dom";
import { LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <div>
        <p>
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}
