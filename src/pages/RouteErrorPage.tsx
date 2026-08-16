import BrandLogo from "@/components/shared/BrandLogo";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/routes/paths";
import { AlertTriangle } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";

const RouteErrorPage = () => {
  const error = useRouteError();

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6 py-16">
      <ThemeToggle className="absolute right-6 top-6" />

      <BrandLogo size="sm" />

      <div className="flex flex-col items-center text-center">
        <span
          aria-hidden
          className="inline-flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive"
        >
          <AlertTriangle className="size-6" />
        </span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{message}</p>

        <Button asChild className="mt-8">
          <Link to={PATHS.home}>Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default RouteErrorPage;
