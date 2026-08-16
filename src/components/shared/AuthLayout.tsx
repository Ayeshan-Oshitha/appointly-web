import BrandLogo from "@/components/shared/BrandLogo";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";
import { CalendarCheck, ShieldCheck, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  title: string;
  description: string;
  /** Prompt shown before the footer link, e.g. "Don't have an account? " */
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
  /** "wide" gives longer forms room for side-by-side fields. */
  width?: "default" | "wide";
  children: React.ReactNode;
}

const highlights = [
  { icon: CalendarCheck, text: "Book workshop appointments in minutes" },
  { icon: Wrench, text: "Track every service in one place" },
  { icon: ShieldCheck, text: "Trusted garages, verified technicians" },
];

const AuthLayout = ({
  title,
  description,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  width = "default",
  children,
}: AuthLayoutProps) => (
  <div className="grid min-h-screen lg:grid-cols-2">
    {/* Decorative brand panel: its copy is marketing, not information the
        form needs, so it is hidden from assistive tech. */}
    <aside
      aria-hidden
      className="relative hidden flex-col justify-between overflow-hidden bg-brand-panel p-12 text-brand-panel-foreground lg:flex"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgb(255 255 255 / 0.18), transparent 45%), radial-gradient(circle at 85% 80%, rgb(255 255 255 / 0.12), transparent 50%)",
        }}
      />

      <div className="relative">
        <BrandLogo variant="onBrand" />
      </div>

      <div className="relative max-w-md">
        <h2 className="text-4xl font-semibold leading-tight tracking-tight">
          Your vehicle, serviced on schedule.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-brand-panel-foreground/75">
          Manage bookings, service history, and garage visits from a single
          dashboard.
        </p>

        <ul className="mt-10 space-y-4">
          {highlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-panel-foreground/15 ring-1 ring-brand-panel-foreground/20">
                <Icon className="size-4" />
              </span>
              <span className="text-sm text-brand-panel-foreground/90">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative text-sm text-brand-panel-foreground/60">
        © {new Date().getFullYear()} MotorHub
      </p>
    </aside>

    <main className="relative flex items-center justify-center px-6 py-12">
      <ThemeToggle className="absolute right-6 top-6" />

      <div className={cn("w-full", width === "wide" ? "max-w-md" : "max-w-sm")}>
        <BrandLogo size="sm" className="mb-10 lg:hidden" />

        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </header>

        {children}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {footerText}
          <Link
            to={footerLinkTo}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {footerLinkLabel}
          </Link>
        </p>
      </div>
    </main>
  </div>
);

export default AuthLayout;
