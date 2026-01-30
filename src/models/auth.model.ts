export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}
