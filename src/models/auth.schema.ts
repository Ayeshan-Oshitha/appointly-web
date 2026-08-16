import z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").pipe(z.email("Invalid email")),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Minimum 6 characters"),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").pipe(z.email("Invalid email")),
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

/** Request payloads are derived from the schemas so the two cannot drift. */
export type LoginRequestDto = z.infer<typeof loginSchema>;
export type RegisterRequestDto = z.infer<typeof registerSchema>;
