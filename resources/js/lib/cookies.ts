/**
 * Cookie service with Effect-based error handling
 *
 * Provides type-safe cookie operations returning Either for error handling.
 * Handles SSR environments gracefully (returns Left for server-side calls).
 */

import type { Either } from 'effect/Either';
import { left, right } from 'effect/Either';

/**
 * Cookie options for setting cookies
 */
export interface CookieOptions {
    /** Cookie expiration in days (default: 365) */
    days?: number;
    /** Cookie path (default: '/') */
    path?: string;
    /** Cookie domain (default: current domain) */
    domain?: string;
    /** SameSite policy (default: 'Lax') */
    sameSite?: 'Strict' | 'Lax' | 'None';
    /** Secure flag (default: true for HTTPS) */
    secure?: boolean;
}

/**
 * Error types for cookie operations
 */
export type CookieError =
    | { type: 'NotAvailable'; message: string }
    | { type: 'ParseError'; message: string }
    | { type: 'InvalidOptions'; message: string };

/**
 * Default cookie options
 */
const defaultOptions: CookieOptions = {
    days: 365,
    path: '/',
    sameSite: 'Lax',
    secure: typeof window !== 'undefined' ? window.location.protocol === 'https:' : true,
};

/**
 * Get a cookie value by name
 * Returns Either - Right with the value on success, Left with error on failure
 */
export function getCookie(name: string): Either<string | null, CookieError> {
    if (typeof document === 'undefined') {
        return left({
            type: 'NotAvailable',
            message: 'document.cookie is not available in SSR environment',
        });
    }

    try {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, ...valueParts] = cookie.trim().split('=');
            if (cookieName === name) {
                return right(valueParts.join('='));
            }
        }
        return right(null);
    } catch (error) {
        return left({
            type: 'ParseError',
            message: `Failed to parse cookies: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
}

/**
 * Set a cookie with the given name and value
 * Returns Either - Right with undefined on success, Left with error on failure
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): Either<void, CookieError> {
    if (typeof document === 'undefined') {
        return left({
            type: 'NotAvailable',
            message: 'document.cookie is not available in SSR environment',
        });
    }

    const mergedOptions = { ...defaultOptions, ...options };

    // Validate SameSite and secure combination
    if (mergedOptions.sameSite === 'None' && !mergedOptions.secure) {
        return left({
            type: 'InvalidOptions',
            message: 'SameSite=None requires Secure flag to be true',
        });
    }

    try {
        const maxAge = mergedOptions.days! * 24 * 60 * 60;
        const cookieParts = [`${name}=${value}`, `path=${mergedOptions.path}`, `max-age=${maxAge}`, `SameSite=${mergedOptions.sameSite}`];

        if (mergedOptions.domain) {
            cookieParts.push(`domain=${mergedOptions.domain}`);
        }

        if (mergedOptions.secure) {
            cookieParts.push('Secure');
        }

        document.cookie = cookieParts.join('; ');
        return right(undefined);
    } catch (error) {
        return left({
            type: 'NotAvailable',
            message: `Failed to set cookie: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
}

/**
 * Remove a cookie by name
 * Returns Either - Right with undefined on success, Left with error on failure
 */
export function removeCookie(name: string, options: Omit<CookieOptions, 'days'> = {}): Either<void, CookieError> {
    if (typeof document === 'undefined') {
        return left({
            type: 'NotAvailable',
            message: 'document.cookie is not available in SSR environment',
        });
    }

    // Set cookie with max-age=0 to delete it
    return setCookie(name, '', { ...options, days: 0 });
}

/**
 * Check if a cookie exists
 */
export function hasCookie(name: string): boolean {
    if (typeof document === 'undefined') {
        return false;
    }

    const result = getCookie(name);
    return result._tag === 'Right' && result.right !== null;
}

/**
 * Get all cookies as an object
 * Returns Either - Right with cookies object on success, Left with error on failure
 */
export function getAllCookies(): Either<Record<string, string>, CookieError> {
    if (typeof document === 'undefined') {
        return left({
            type: 'NotAvailable',
            message: 'document.cookie is not available in SSR environment',
        });
    }

    try {
        const cookies: Record<string, string> = {};
        const cookieList = document.cookie.split(';');

        for (const cookie of cookieList) {
            const trimmed = cookie.trim();
            if (!trimmed) continue;

            const equalIndex = trimmed.indexOf('=');
            if (equalIndex === -1) {
                cookies[trimmed] = '';
            } else {
                const cookieName = trimmed.substring(0, equalIndex);
                const cookieValue = trimmed.substring(equalIndex + 1);
                cookies[cookieName] = cookieValue;
            }
        }

        return right(cookies);
    } catch (error) {
        return left({
            type: 'ParseError',
            message: `Failed to parse cookies: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
}

/**
 * Get a parsed JSON cookie value
 * Returns Either - Right with parsed value on success, Left with error on failure
 */
export function getJsonCookie<T>(name: string): Either<T | null, CookieError> {
    const result = getCookie(name);

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
            message: `Failed to parse JSON cookie: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
}

/**
 * Set a JSON value as a cookie
 * Returns Either - Right with undefined on success, Left with error on failure
 */
export function setJsonCookie<T>(name: string, value: T, options?: CookieOptions): Either<void, CookieError> {
    try {
        const jsonString = JSON.stringify(value);
        return setCookie(name, jsonString, options);
    } catch (error) {
        return left({
            type: 'ParseError',
            message: `Failed to stringify JSON for cookie: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
}
