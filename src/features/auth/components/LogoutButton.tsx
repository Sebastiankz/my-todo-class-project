import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { trackAuth } from "@/lib/analytics";

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    trackAuth('logout');
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 hover:text-violet-600 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-violet-300"
    >
      <LogOut size={18} />
      <span className="font-medium">Logout</span>
    </button>
  );
}
