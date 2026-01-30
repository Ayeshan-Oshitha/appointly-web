import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import App from "@/App";
import RegisterPage from "@/pages/auth/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

export default router;
