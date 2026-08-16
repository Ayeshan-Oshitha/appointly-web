import { createContext } from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "motorhub-theme";

export interface ThemeContextValue {
  /** The user's preference, which may be "system". */
  theme: Theme;
  /** What is actually applied to the document right now. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

/**
 * Kept in its own module (separate from the provider component and the hook)
 * so every file exports a single kind of thing and Fast Refresh keeps working.
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null);
