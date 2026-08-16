import BrandLogo from "@/components/shared/BrandLogo";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/routes/paths";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6 py-16">
    <ThemeToggle className="absolute right-6 top-6" />

    <BrandLogo size="sm" />

    <div className="flex flex-col items-center text-center">
      <p
        aria-hidden
        className="text-7xl font-semibold tracking-tight text-muted-foreground/25"
      >
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The page you are looking for does not exist or may have been moved.
      </p>

      <Button asChild className="mt-8">
        <Link to={PATHS.home}>Back to home</Link>
      </Button>
    </div>
  </div>
);

export default NotFoundPage;
