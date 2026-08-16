import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useAuth";
import { PATHS } from "@/routes/paths";
import { useCurrentUser } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

function App() {
  const user = useCurrentUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(PATHS.login, { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      <h1 className="mt-20 text-2xl text-center text-foreground">
        Welcome to Appointly{user ? `, ${user.firstName}` : ""}
      </h1>

      <div className="mt-6">
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default App;
