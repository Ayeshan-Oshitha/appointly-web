import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";

interface DecodedToken {
  exp: number;
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
  // Absent for users without any role assigned.
  [ROLE_CLAIM]?: string;
}

export interface AuthUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string | null;
}

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  login: (accessToken: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

/** True when the token can be decoded and has not expired. */
export function isTokenValid(token: string | null): token is string {
  if (!token) return false;

  try {
    const { exp } = jwtDecode<DecodedToken>(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function toUser(decoded: DecodedToken): AuthUser {
  return {
    userId: decoded.sub,
    email: decoded.email,
    firstName: decoded.given_name,
    lastName: decoded.family_name,
    role: decoded[ROLE_CLAIM] ?? null,
  };
}

/** localStorage can throw (private mode, quota) — never let it break module init. */
function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function clearStorage() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    // ignore
  }
}

/**
 * Hydrates the session from localStorage. A corrupt or expired entry is
 * discarded rather than thrown, so a bad value cannot white-screen the app
 * before React mounts.
 */
function hydrate(): { accessToken: string | null; user: AuthUser | null } {
  const token = readStorage(ACCESS_TOKEN_KEY);

  if (!isTokenValid(token)) {
    if (token) clearStorage();
    return { accessToken: null, user: null };
  }

  try {
    const raw = readStorage(USER_KEY);
    const user = raw ? (JSON.parse(raw) as AuthUser) : null;

    // Derive from the token when the stored user is missing or unusable.
    return { accessToken: token, user: user ?? toUser(jwtDecode(token)) };
  } catch {
    clearStorage();
    return { accessToken: null, user: null };
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  ...hydrate(),

  login: (accessToken) => {
    let user: AuthUser;

    try {
      user = toUser(jwtDecode<DecodedToken>(accessToken));
    } catch {
      clearStorage();
      set({ accessToken: null, user: null });
      throw new Error("Received an invalid authentication token.");
    }

    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {
      // Session still works for this tab even if it cannot be persisted.
    }

    set({ accessToken, user });
  },

  logout: () => {
    clearStorage();
    set({ accessToken: null, user: null });
  },

  isAuthenticated: () => isTokenValid(get().accessToken),
}));

/**
 * Reactive counterpart to `isAuthenticated()`. Subscribes to `accessToken`, so
 * components re-render when the session changes — selecting the store method
 * itself would return a stable reference and never trigger an update.
 */
export const useIsAuthenticated = () =>
  useAuthStore((s) => isTokenValid(s.accessToken));

export const useCurrentUser = () => useAuthStore((s) => s.user);
