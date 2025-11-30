import { Link } from "react-router-dom";
import RegisterForm from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md">
          <RegisterForm />
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary-700 font-semibold"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-pink-400 p-12">
        <div className="max-w-lg text-center">
          <img
            src="https://img.freepik.com/free-vector/multitasking-concept-illustration_114360-1286.jpg"
            alt="Register illustration"
            className="w-full h-auto mb-8 drop-shadow-2xl rounded-2xl"
          />
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Your Journey
          </h2>
          <p className="text-purple-100 text-lg">
            Join thousands of users who are already managing their tasks
            efficiently and achieving their goals.
          </p>
        </div>
      </div>
    </div>
  );
}
