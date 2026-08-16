/**
 * Error body returned by the API's global exception handler.
 * Mirrors ErrorHandlingMiddleware in motorhub-api.
 */
export interface ApiErrorResponse {
  title: string;
  error: string;
  errorCode?: string;
}
