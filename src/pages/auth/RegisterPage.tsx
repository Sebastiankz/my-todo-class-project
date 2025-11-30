import { Link } from "react-router-dom";
import RegisterForm from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div>
      <h1>Create Account</h1>
      <RegisterForm />
    </div>
  );
}
