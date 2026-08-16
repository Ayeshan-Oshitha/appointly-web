import { PATHS } from "@/routes/paths";
import { useIsAuthenticated } from "@/store/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/** Gates routes that require a valid session. */
const ProtectedRoute = () => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={PATHS.login}
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
