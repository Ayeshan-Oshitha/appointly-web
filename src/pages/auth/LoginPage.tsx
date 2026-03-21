import InputField from "@/components/shared/InputField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLogin } from "@/hooks/useAuth";
import type { LoginRequestDto, LoginResponseDto } from "@/models/auth.model";
import { useAuthStore } from "@/store/auth.store";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Minimum 6 characters"),
});

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginRequestDto>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { mutateAsync: login, isPending, isError, error } = useLogin();
  const authLogin = useAuthStore((s) => s.login);

  const [formError, setFormError] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;

        if (!newErrors[field]) {
          newErrors[field] = issue.message; // first error only
        }
      }
      setFormError(newErrors);
      return false;
    }
    setFormError({});
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    // Clear error message for the field being edited
    setFormError((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
    setFormError({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    await login(formData, {
      onSuccess: (data: LoginResponseDto) => {
        authLogin(data.token);
        toast.success("Logged in successfully!");
        navigate("/", { replace: true });
      },
    });

    resetForm();
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md border-border bg-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-card-foreground">
              Welcome back
            </CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isError && (
              <Alert
                variant="destructive"
                className="mb-6 border-red-600 bg-red-50"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {(error as any)?.response?.data?.error ||
                    error.message ||
                    "Failed to Login. Try Again"}
                </AlertDescription>
              </Alert>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email here"
                value={formData.email}
                onChange={handleInputChange}
                error={formError.email}
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password here"
                value={formData.password}
                onChange={handleInputChange}
                error={formError.password}
              />

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link
                to="/auth/register"
                className="font-medium text-gray-900 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
