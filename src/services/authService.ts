import { apiClient } from "@/api/apiClient";
import type { LoginResponseDto, RegisterResponseDto } from "@/models/auth.model";
import type {
  LoginRequestDto,
  RegisterRequestDto,
} from "@/models/auth.schema";

class AuthService {
  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await apiClient.post<LoginResponseDto>(
      "/auth/login",
      data
    );
    return response.data;
  }

  async register(data: RegisterRequestDto): Promise<RegisterResponseDto> {
    const response = await apiClient.post<RegisterResponseDto>(
      "/auth/register",
      data
    );
    return response.data;
  }
}

export const authService = new AuthService();
