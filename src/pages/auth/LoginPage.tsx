import AuthLayout from "@/components/shared/AuthLayout";
import FormErrorAlert from "@/components/shared/FormErrorAlert";
import InputField from "@/components/shared/InputField";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/apiError";
import { loginSchema, type LoginRequestDto } from "@/models/auth.schema";
import { PATHS } from "@/routes/paths";
import { useAuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate: login, isPending } = useLogin();
  const authLogin = useAuthStore((s) => s.login);

  const [submitError, setSubmitError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: LoginRequestDto) => {
    setSubmitError(undefined);

    login(values, {
      onSuccess: (data) => {
        try {
          authLogin(data.token);
        } catch (error) {
          setSubmitError(getApiErrorMessage(error, "Failed to log in."));
          return;
        }

        toast.success("Logged in successfully!");

        // Return the user to the page that bounced them here, if any.
        const from = (location.state as { from?: string } | null)?.from;
        navigate(from ?? PATHS.home, { replace: true });
      },
      onError: (error) => {
        setSubmitError(
          getApiErrorMessage(error, "Failed to log in. Please try again.")
        );
      },
    });
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your account to continue"
      footerText="Don't have an account? "
      footerLinkLabel="Sign up"
      footerLinkTo={PATHS.register}
    >
      <FormErrorAlert message={submitError} />

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email here"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password here"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button
          type="submit"
          size="lg"
          className="mt-2 w-full"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Spinner className="mr-2" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
