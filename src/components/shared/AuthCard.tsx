import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface AuthCardProps {
  title: string;
  description: string;
  /** Prompt shown above the footer link, e.g. "Don't have an account? " */
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
  className?: string;
  children: React.ReactNode;
}

const AuthCard = ({
  title,
  description,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  className,
  children,
}: AuthCardProps) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
    <Card className={cn("w-full max-w-md border-border bg-card", className)}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-card-foreground">
          {/* CardTitle renders a div, so the heading landmark goes inside it. */}
          <h1>{title}</h1>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {footerText}
          <Link
            to={footerLinkTo}
            className="font-medium text-primary hover:underline"
          >
            {footerLinkLabel}
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AuthCard;
