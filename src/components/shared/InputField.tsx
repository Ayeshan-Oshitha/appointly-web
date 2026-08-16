import { cn } from "@/lib/utils";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputFieldProps
  extends Omit<React.ComponentProps<"input">, "type" | "name"> {
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  error?: string;
}

const InputField = ({
  label,
  name,
  type,
  error,
  className,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";
  const errorId = `${name}-error`;

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-foreground">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={isPasswordType && showPassword ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-11 w-full bg-background text-foreground",
            "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-0",
            isPasswordType && "pr-11",
            className
          )}
          {...props}
        />

        {/* Add eye icon to PasswordField */}
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-sm font-medium text-destructive"
        >
          <AlertCircle aria-hidden className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
