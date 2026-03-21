import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

interface AuthState {
  accessToken: string | null;
  user: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  } | null;
  login: (accessToken: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem("accessToken"),
  user: JSON.parse(localStorage.getItem("user") || "null"),

  login: (accessToken) => {
    const decoded = jwtDecode<DecodedToken>(accessToken);

    const user = {
      userId: decoded.sub,
      email: decoded.email,
      firstName: decoded.given_name,
      lastName: decoded.family_name,
      role: decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
    };

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    set({ accessToken: accessToken, user: user });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    set({ accessToken: null, user: null });
  },

  isAuthenticated: () => {
    const token = get().accessToken;
    if (!token) return false;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },
}));
