export type ErrorType<E> = {
  type: 'error',
  error: E
}

export type SuccessType<V> = {
  type: 'success',
  value: V
}

export type Either<V, E> = ErrorType<E> | SuccessType<V>

export const errorType = <E>(error: E): ErrorType<E> => ({
  error,
  type: 'error',

})
export const successType = <V>(value: V): SuccessType<V> => ({
  type: 'success',
  value: value,
})

export const mapEither = <V, V2, E>(either: Either<V, E>, fn: (value: V) => V2): Either<V2, E> => {
  if(either.type === 'success'){
    return {type: 'success', value: fn(either.value)}
  }

  return either;
}