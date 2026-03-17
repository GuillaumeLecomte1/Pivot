/**
 * Option type utilities - A sum type for representing optional values (Some/None)
 *
 * This provides a thin wrapper around Effect's Option type
 */

import type { Option } from 'effect/Option';
import { flatMap, getOrElse, isNone, isSome, map, none, some } from 'effect/Option';

export type { Option };

// Re-export core functions from Effect
export { some, none, isNone, isSome, getOrElse, flatMap, map };

/**
 * Creates a Some (value) Option
 */
export const present = some;

/**
 * Creates a None (null/undefined) Option
 */
export const absent = none;

/**
 * Type guard to check if the Option is a Some (has a value)
 */
export const isPresent = isSome;

/**
 * Type guard to check if the Option is a None
 */
export const isAbsent = isNone;

/**
 * Pattern match on Option - executes the appropriate callback based on the variant
 */
export function match<A, B>(option: Option<A>, onSome: (value: A) => B, onNone: () => B): B {
    return isNone(option) ? onNone() : onSome(option.value);
}

/**
 * Convert a nullable value to an Option
 */
export function fromNullable<A>(value: A | null | undefined): Option<A> {
    return value === null || value === undefined ? none() : some(value);
}

/**
 * Convert an Option to a nullable value
 */
export function toNullable<A>(option: Option<A>): A | null {
    return isNone(option) ? null : option.value;
}

/**
 * Convert an Option to an array (empty if None, single element if Some)
 */
export function toArray<A>(option: Option<A>): A[] {
    return isNone(option) ? [] : [option.value];
}

/**
 * Flatten a nested Option
 */
export function flatten<A>(option: Option<Option<A>>): Option<A> {
    return flatMap(option, (inner) => inner);
}

/**
 * Chain Option operations - alias for flatMap
 */
export const chain = flatMap;

/**
 * Filter an Option based on a predicate
 */
export function refine<A>(option: Option<A>, predicate: (value: A) => boolean): Option<A> {
    if (isNone(option)) return option;
    return predicate(option.value) ? option : none();
}

/**
 * Get the value or a default if None
 */
export function getOrElseValue<A>(option: Option<A>, defaultValue: A): A {
    return isNone(option) ? defaultValue : option.value;
}

/**
 * Tap the Option - execute a side effect without changing the value
 */
export function tap<A>(option: Option<A>, fn: (value: A) => void): Option<A> {
    if (isSome(option)) {
        fn(option.value);
    }
    return option;
}

/**
 * Convert from a boolean condition
 */
export function fromBoolean<A>(condition: boolean, value: A): Option<A> {
    return condition ? some(value) : none();
}
