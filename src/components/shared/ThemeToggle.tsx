import type { Theme } from "@/context/theme-context";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";

const options: { value: Theme; label: string; icon: LucideIcon }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

interface ThemeToggleProps {
  className?: string;
}

/**
 * Three-way control rather than a light/dark switch, so "system" stays
 * reachable — a two-state toggle strands the user once they click it.
 */
const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-card p-0.5",
        className
      )}
    >
      {options.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-pressed={isActive}
            title={`${label} theme`}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-full transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              isActive
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon aria-hidden className="size-3.5" />
            <span className="sr-only">{label} theme</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
