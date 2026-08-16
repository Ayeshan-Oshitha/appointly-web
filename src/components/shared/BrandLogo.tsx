import { cn } from "@/lib/utils";
import { Car } from "lucide-react";

interface BrandLogoProps {
  size?: "sm" | "md";
  /** "onBrand" inverts the colours for use on the primary-filled panel. */
  variant?: "default" | "onBrand";
  className?: string;
}

const BrandLogo = ({
  size = "md",
  variant = "default",
  className,
}: BrandLogoProps) => (
  <span className={cn("inline-flex items-center gap-2.5", className)}>
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center justify-center rounded-xl",
        size === "sm" ? "size-8" : "size-10",
        variant === "onBrand"
          ? "bg-brand-panel-foreground/15 text-brand-panel-foreground ring-1 ring-brand-panel-foreground/25"
          : "bg-primary text-primary-foreground"
      )}
    >
      <Car className={size === "sm" ? "size-4" : "size-5"} />
    </span>
    <span
      className={cn(
        "font-semibold tracking-tight",
        size === "sm" ? "text-base" : "text-lg",
        variant === "onBrand"
          ? "text-brand-panel-foreground"
          : "text-foreground"
      )}
    >
      MotorHub
    </span>
  </span>
);

export default BrandLogo;
