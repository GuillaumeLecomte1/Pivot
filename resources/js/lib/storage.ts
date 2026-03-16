/**
 * LocalStorage service with Effect-based error handling
 *
 * Provides type-safe localStorage operations returning Either for error handling.
 * Handles SSR environments gracefully (returns Left for server-side calls).
 */

import type { Either } from 'effect/Either';
import { left, right } from 'effect/Either';

/**
 * Error types for localStorage operations
 */
export type StorageError =
    | { type: 'NotAvailable'; message: string }
    | { type: 'ParseError'; message: string; originalError: unknown }
    | { type: 'QuotaExceeded'; message: string };

/**
 * Checks if localStorage is available in the current environment
 */
export function isStorageAvailable(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    try {
        const testKey = '__storage_test__';
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
}

/**
 * Get a value from localStorage
 * Returns Either - Right with the value on success, Left with error on failure
 */
export function getItem(key: string): Either<string | null, StorageError> {
    if (typeof window === 'undefined') {
        return left({
            type: 'NotAvailable',
            message: 'localStorage is not available in SSR environment',
        });
    }

    if (!isStorageAvailable()) {
        return left({
            type: 'NotAvailable',
            message: 'localStorage is not available',
        });
    }

    try {
        const value = window.localStorage.getItem(key);
        return right(value);
    } catch (error) {
        return left({
            type: 'NotAvailable',
            message: `Failed to get item from localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
}

/**
 * Set a value in localStorage
 * Returns Either - Right with undefined on success, Left with error on failure
 */
export function setItem(key: string, value: string): Either<void, StorageError> {
    if (typeof window === 'undefined') {
        return left({
            type: 'NotAvailable',
            message: 'localStorage is not available in SSR environment',
        });
    }

    if (!isStorageAvailable()) {
        return left({
            type: 'NotAvailable',
            message: 'localStorage is not available',
        });
    }

    try {
        window.localStorage.setItem(key, value);
        return right(undefined);
    } catch (error) {
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
            return left({
                type: 'QuotaExceeded',
                message: 'localStorage quota has been exceeded',
            });
        }
        return left({
            type: 'NotAvailable',
            message: `Failed to set item in localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
}

/**
 * Remove a value from localStorage
 * Returns Either - Right with undefined on success, Left with error on failure
 */
export function removeItem(key: string): Either<void, StorageError> {
    if (typeof window === 'undefined') {
        return left({
            type: 'NotAvailable',
            message: 'localStorage is not available in SSR environment',
        });
    }

    if (!isStorageAvailable()) {
        return left({
            type: 'NotAvailable',
            message: 'localStorage is not available',
        });
    }

    try {
        window.localStorage.removeItem(key);
        return right(undefined);
    } catch (error) {
        return left({
            type: 'NotAvailable',
            message: `Failed to remove item from localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
}

/**
 * Get a parsed JSON value from localStorage
 * Returns Either - Right with parsed value on success, Left with error on failure
 */
export function getJsonItem<T>(key: string): Either<T | null, StorageError> {
    const result = getItem(key);

    if (result._tag === 'Left') {
        return left(result.left);
    }

    const value = result.right;
    if (value === null) {
        return right(null);
    }

    try {
        const parsed = JSON.parse(value) as T;
        return right(parsed);
    } catch (error) {
        return left({
            type: 'ParseError',
            message: `Failed to parse JSON from localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`,
            originalError: error,
        });
    }
}

/**
 * Set a JSON value in localStorage
 * Returns Either - Right with undefined on success, Left with error on failure
 */
export function setJsonItem<T>(key: string, value: T): Either<void, StorageError> {
    try {
        const jsonString = JSON.stringify(value);
        return setItem(key, jsonString);
    } catch (error) {
        return left({
            type: 'ParseError',
            message: `Failed to stringify JSON for localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`,
            originalError: error,
        });
    }
}

/**
 * Clear all items from localStorage
 * Returns Either - Right with undefined on success, Left with error on failure
 */
export function clear(): Either<void, StorageError> {
    if (typeof window === 'undefined') {
        return left({
            type: 'NotAvailable',
            message: 'localStorage is not available in SSR environment',
        });
    }

    if (!isStorageAvailable()) {
        return left({
            type: 'NotAvailable',
            message: 'localStorage is not available',
        });
    }

    try {
        window.localStorage.clear();
        return right(undefined);
    } catch (error) {
        return left({
            type: 'NotAvailable',
            message: `Failed to clear localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
}

/**
 * Get all keys from localStorage
 * Returns Either - Right with array of keys on success, Left with error on failure
 */
export function getKeys(): Either<string[], StorageError> {
    if (typeof window === 'undefined') {
        return left({
            type: 'NotAvailable',
            message: 'localStorage is not available in SSR environment',
        });
    }

    if (!isStorageAvailable()) {
        return left({
            type: 'NotAvailable',
            message: 'localStorage is not available',
        });
    }

    try {
        const keys: string[] = [];
        for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if (key !== null) {
                keys.push(key);
            }
        }
        return right(keys);
    } catch (error) {
        return left({
            type: 'NotAvailable',
            message: `Failed to get keys from localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
}

/**
 * Check if a key exists in localStorage
 */
export function hasKey(key: string): boolean {
    if (typeof window === 'undefined' || !isStorageAvailable()) {
        return false;
    }

    return window.localStorage.getItem(key) !== null;
}
