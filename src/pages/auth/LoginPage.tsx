import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
            <form className="space-y-4">
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email here"
                value={email}
                onChange={setEmail}
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password here"
                value={password}
                onChange={setPassword}
              />

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
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
