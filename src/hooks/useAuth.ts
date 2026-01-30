import type { LoginRequestDto, RegisterRequestDto } from "@/models/auth.model";
import { authService } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginRequestDto) => authService.login(payload),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterRequestDto) => authService.register(payload),
  });
}
