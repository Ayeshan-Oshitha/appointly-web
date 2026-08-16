import { Button } from "@/components/ui/button";
import { PATHS } from "@/routes/paths";
import { Link, useRouteError } from "react-router-dom";

const RouteErrorPage = () => {
  const error = useRouteError();

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <h1 className="text-3xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="max-w-md text-muted-foreground">{message}</p>
      <Button asChild>
        <Link to={PATHS.home}>Go home</Link>
      </Button>
    </div>
  );
};

export default RouteErrorPage;
