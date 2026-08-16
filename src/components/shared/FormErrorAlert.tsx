import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FormErrorAlertProps {
  message?: string;
}

const FormErrorAlert = ({ message }: FormErrorAlertProps) => {
  if (!message) return null;

  return (
    <Alert variant="destructive" className="mb-6 border-destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default FormErrorAlert;
