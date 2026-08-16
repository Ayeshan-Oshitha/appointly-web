import type { ApiErrorResponse } from "@/models/api.model";
import { isAxiosError } from "axios";

/**
 * Pulls a user-facing message out of an unknown thrown value.
 * Prefers the API's `error` field, then the transport error, then a fallback.
 */
export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    const data = error.response?.data;

    if (data?.error) return data.error;
    if (data?.title) return data.title;
    if (error.code === "ECONNABORTED") return "The request timed out.";
    if (!error.response) return "Unable to reach the server.";

    return error.message || fallback;
  }

  if (error instanceof Error && error.message) return error.message;

  return fallback;
}
