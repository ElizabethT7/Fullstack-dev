import { Either, matchEither } from "@/shared/lib/either";
import { Alert, AlertDescription } from "@/shared/ui/alert";

export function AuthErrorAlert({ error }: {
  error: Either<string, unknown>
}) {
  return matchEither(error, {
    errorType: (error) => (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    ),
    successType: () => null,
  });
}