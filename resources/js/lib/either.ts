/**
 * Either type utilities - A sum type for representing success (Right) or failure (Left)
 *
 * In Effect, Either has type Either<A, E> where A is the success value and E is the error
 * This provides utility wrappers following the typical <E, A> convention
 */

import type { Either } from 'effect/Either';
import { flatMap, getOrElse, isLeft, isRight, left, map, mapLeft, right } from 'effect/Either';

export type { Either };

// Re-export core functions from Effect
export { left, right, isLeft, isRight, getOrElse, flatMap, map, mapLeft };

/**
 * Creates a Right (success) value
 */
export const succeed = right;

/**
 * Creates a Left (failure) value
 */
export const fail = left;

/**
 * Type guard to check if the value is a Left (failure)
 */
export const isFailure = isLeft;

/**
 * Type guard to check if the value is a Right (success)
 */
export const isSuccess = isRight;

/**
 * Pattern match on Either - executes the appropriate callback based on the variant
 * Note: Effect Either is Either<A, E> where A is the Right (success) value
 */
export function match<A, E, B>(either: Either<A, E>, onLeft: (error: E) => B, onRight: (value: A) => B): B {
    return isLeft(either) ? onLeft(either.left) : onRight(either.right);
}

/**
 * Flatten a nested Either - removes one level of nesting
 * Note: Effect Either is Either<A, E> where A is success, E is error
 */
export function flatten<A, E>(either: Either<Either<A, E>, E>): Either<A, E> {
    return flatMap(either, (inner) => inner);
}

/**
 * Chain Either operations - alias for flatMap
 */
export const chain = flatMap;

/**
 * Recover from a Left error with a new Either
 */
export function recover<A, E>(either: Either<A, E>, fn: (error: E) => Either<A, E>): Either<A, E> {
    if (isLeft(either)) return fn(either.left);
    return either;
}

/**
 * Get the value or a default if Left
 */
export function getOrElseValue<A, E>(either: Either<A, E>, defaultValue: A): A {
    return isLeft(either) ? defaultValue : either.right;
}

/**
 * Tap the Either - execute a side effect without changing the value
 */
export function tap<A, E>(either: Either<A, E>, fn: (value: A) => void): Either<A, E> {
    if (isRight(either)) {
        fn(either.right);
    }
    return either;
}

/**
 * Tap the Left - execute a side effect on failure without changing the value
 */
export function tapLeft<A, E>(either: Either<A, E>, fn: (error: E) => void): Either<A, E> {
    if (isLeft(either)) {
        fn(either.left);
    }
    return either;
}

/**
 * Pipe operator for Either - allows chaining transformations
 * This is a utility to transform Either values in a functional style
 *
 * @example
 * const result = pipe(
 *   validateEither(schema, data),
 *   either.map(transform),
 * );
 */
export function pipe<A, B, E>(either: Either<A, E>, fn: (a: A) => Either<B, E>): Either<B, E> {
    if (isRight(either)) {
        return fn(either.right);
    }
    // For Left case, we need to preserve the error type
    return either as unknown as Either<B, E>;
}
