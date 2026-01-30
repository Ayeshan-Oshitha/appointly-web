import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  error?: string;
  className?: string;
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type,
  error,
  className,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={name} className="text-card-foreground">
          {label}
        </Label>
        <div className="relative">
          <Input
            id={name}
            name={name}
            type={isPasswordType && showPassword ? "text" : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={cn(
              "bg-background text-foreground w-full",
              "focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-0",
              isPasswordType && "pr-10",
              className
            )}
          />

          {/* Add eye icon to PasswordField */}
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
          <p className="ml-2 mt-[-4px] text-sm font-medium text-red-500">
            {error}
          </p>
        )}
      </div>
    </>
  );
};

export default InputField;
