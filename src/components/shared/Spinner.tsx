import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  className?: string;
  /** Announced to screen readers; omit for purely decorative use. */
  label?: string;
}

const Spinner = ({ className, label }: SpinnerProps) => (
  <Loader2
    role={label ? "status" : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
    className={cn("h-4 w-4 animate-spin", className)}
  />
);

export default Spinner;
