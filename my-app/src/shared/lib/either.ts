export type ErrorType<E> = {
  type: 'error';
  error: E;
};

export type SuccessType<V> = {
  type: 'success';
  value: V;
};

export type Either<E, V> = SuccessType<V> | ErrorType<E>;

export const errorType = <const E>(error: E): ErrorType<E> => ({
  error,
  type: 'error',
});
export const successType = <const V>(value: V): SuccessType<V> => ({
  type: 'success',
  value: value,
});

export const mapSuccessType = <V, V2, E>(either: Either<E, V>, fn: (value: V) => V2): Either<E, V2> => {
  if (either.type === 'success') {
    return { type: 'success', value: fn(either.value) };
  }

  return either;
};

export const mapErrorType = <V, E, E2>(either: Either<E, V>, fn: (value: E) => E2): Either<E2, V> => {
  if (either.type === 'error') {
    return { type: 'error', error: fn(either.error) };
  }

  return either;
};

export const matchEither = <E, V, V2>(
  either: Either<E, V>,
  mathers: {
    errorType: (error: NoInfer<E>) => V2;
    successType: (value: NoInfer<V>) => V2;
  }
): V2 => {
  if (either.type === 'error') {
    return mathers.errorType(either.error);
  }
  return mathers.successType(either.value);
};
