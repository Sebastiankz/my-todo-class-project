import { Link } from "react-router-dom";
import { LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md">
          <LoginForm />
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary-700 font-semibold"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-pink-400 p-12">
        <div className="max-w-lg text-center">
          <img
            src="https://img.freepik.com/free-vector/checklist-concept-illustration_114360-479.jpg"
            alt="Welcome illustration"
            className="w-full h-auto mb-8 drop-shadow-2xl rounded-2xl"
          />
          <h2 className="text-4xl font-bold text-white mb-4">
            Organize Your Life
          </h2>
          <p className="text-purple-100 text-lg">
            Keep track of your tasks and boost your productivity with our
            beautiful to-do list app.
          </p>
        </div>
      </div>
    </div>
  );
}
