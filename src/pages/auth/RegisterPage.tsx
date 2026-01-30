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
import { useRegister } from "@/hooks/useAuth";
import type { RegisterRequestDto } from "@/models/auth.model";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Minimum 6 characters")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9]\d{1,14}$/, "Invalid phone number"),
});

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterRequestDto>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const { mutateAsync: register, isPending, isError, error } = useRegister();

  const [formError, setFormError] = useState<{
    firstName?: string;
    lastName?: string;
    email?: "";
    password?: "";
    phoneNumber?: "";
  }>({});

  const validate = () => {
    const result = registerSchema.safeParse(formData);

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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
    });
    setFormError({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    await register(formData, {
      onSuccess: () => {
        toast.success("User registered successfully!");
        navigate("/auth/login");
      },
    });

    resetForm();
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <Card className="w-full max-w-lg border-border bg-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-card-foreground">
              Create an account
            </CardTitle>
            <CardDescription>Enter your details to get started</CardDescription>
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
              <div className="flex flex-row gap-x-4 w-full ">
                <div className="flex-1">
                  <InputField
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={formError.firstName}
                  />
                </div>

                <div className="flex-1">
                  <InputField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={formError.lastName}
                  />
                </div>
              </div>

              <InputField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                placeholder="Enter your phone number here"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                error={formError.phoneNumber}
              />

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
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {"Already have an account? "}
              <Link
                to="/auth/login"
                className="font-medium text-gray-900 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RegisterPage;
