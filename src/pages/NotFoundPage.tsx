import { Button } from "@/components/ui/button";
import { PATHS } from "@/routes/paths";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
    <h1 className="text-3xl font-semibold text-foreground">Page not found</h1>
    <p className="text-muted-foreground">
      The page you are looking for does not exist.
    </p>
    <Button asChild>
      <Link to={PATHS.home}>Go home</Link>
    </Button>
  </div>
);

export default NotFoundPage;
