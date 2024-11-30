import { Either, matchEither } from "@/shared/lib/either";
import { Alert, AlertDescription } from "@/shared/ui/alert";

export function AuthSuccessAlert({value}: {
  value: Either<string, null>;
}) {
  return matchEither(value, {
    errorType: () => null,
    successType: (value) => (
    <Alert>
      <AlertDescription>{value}</AlertDescription>
    </Alert>
  )
  });

}

//Successfully signed up!