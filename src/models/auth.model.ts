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

export interface RegisterRequestDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface RegisterResponseDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}
