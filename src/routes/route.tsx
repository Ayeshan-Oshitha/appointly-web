import App from "@/App";
import NotFoundPage from "@/pages/NotFoundPage";
import RouteErrorPage from "@/pages/RouteErrorPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicOnlyRoute from "@/routes/PublicOnlyRoute";
import { PATHS } from "@/routes/paths";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    errorElement: <RouteErrorPage />,
    children: [
      {
        element: <PublicOnlyRoute />,
        children: [
          { path: PATHS.login, element: <LoginPage /> },
          { path: PATHS.register, element: <RegisterPage /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [{ path: PATHS.home, element: <App /> }],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
