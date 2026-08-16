import AuthCard from "@/components/shared/AuthCard";
import FormErrorAlert from "@/components/shared/FormErrorAlert";
import InputField from "@/components/shared/InputField";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/apiError";
import { registerSchema, type RegisterRequestDto } from "@/models/auth.schema";
import { PATHS } from "@/routes/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { mutate: registerUser, isPending } = useRegister();

  const [submitError, setSubmitError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequestDto>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (values: RegisterRequestDto) => {
    setSubmitError(undefined);

    registerUser(values, {
      onSuccess: () => {
        // The API issues no token on register, so send the user to sign in.
        toast.success("User registered successfully!");
        navigate(PATHS.login, { replace: true });
      },
      onError: (error) => {
        setSubmitError(
          getApiErrorMessage(error, "Failed to register. Please try again.")
        );
      },
    });
  };

  return (
    <AuthCard
      title="Create an account"
      description="Enter your details to get started"
      footerText="Already have an account? "
      footerLinkLabel="Sign in"
      footerLinkTo={PATHS.login}
      className="max-w-lg"
    >
      <FormErrorAlert message={submitError} />

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-row gap-x-4 w-full">
          <div className="flex-1">
            <InputField
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              autoComplete="given-name"
              error={errors.firstName?.message}
              {...register("firstName")}
            />
          </div>

          <div className="flex-1">
            <InputField
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              autoComplete="family-name"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </div>
        </div>

        <InputField
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number here"
          autoComplete="tel"
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />

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
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" className="w-full mt-6" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner className="mr-2" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </AuthCard>
  );
};

export default RegisterPage;
