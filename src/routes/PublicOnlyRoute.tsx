import { PATHS } from "@/routes/paths";
import { useIsAuthenticated } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";

/** Keeps signed-in users away from the login/register pages. */
const PublicOnlyRoute = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to={PATHS.home} replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
