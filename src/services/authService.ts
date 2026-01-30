import { apiClient } from "@/api/apiClient";
import type { LoginRequestDto, LoginResponseDto } from "@/models/auth.model";

class AuthService {
  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await apiClient.post<LoginResponseDto>(
      "/auth/login",
      data
    );
    return response.data;
  }
}

export const authService = new AuthService();
