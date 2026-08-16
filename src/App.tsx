import BrandLogo from "@/components/shared/BrandLogo";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useAuth";
import { PATHS } from "@/routes/paths";
import { useCurrentUser } from "@/store/auth.store";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function getInitials(firstName?: string, lastName?: string) {
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.trim();
  return initials.toUpperCase() || "?";
}

function App() {
  const user = useCurrentUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(PATHS.login, { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <BrandLogo size="sm" />

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user && (
              <div className="group relative">
                <span
                  aria-hidden
                  className="inline-flex size-9 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground"
                >
                  {getInitials(user.firstName, user.lastName)}
                </span>

                {/* The name is hover-only visually, so keep it available to
                    screen readers rather than relying on the tooltip. */}
                <span className="sr-only">
                  {user.firstName} {user.lastName}
                </span>

                <span
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-full z-10 mt-2 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-md ring-1 ring-border transition-opacity group-hover:opacity-100"
                >
                  {user.firstName} {user.lastName}
                </span>
              </div>
            )}

            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut aria-hidden className="size-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Welcome to MotorHub{user ? `, ${user.firstName}` : ""}
        </h1>
        <p className="mt-3 max-w-md text-base text-muted-foreground">
          Your account is ready. Vehicle and service tools will appear here.
        </p>
      </main>
    </div>
  );
}

export default App;
