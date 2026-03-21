import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";

function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };

  return (
    <>
      <p className="text-2xl text-center mt-20">Welcome to Appointly</p>

      {/* Show when logged in */}
      {isAuthenticated() && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}

      {/* Show when not logged in */}
      {!isAuthenticated() && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/auth/login")}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/auth/register")}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Sign Up
          </button>
        </div>
      )}
    </>
  );
}

export default App;
