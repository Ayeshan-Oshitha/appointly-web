import type {
  LoginRequestDto,
  RegisterRequestDto,
} from "@/models/auth.schema";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

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

/** Clears the session and any cached user-scoped queries. */
export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const queryClient = useQueryClient();

  return useCallback(() => {
    logout();
    queryClient.clear();
  }, [logout, queryClient]);
}
