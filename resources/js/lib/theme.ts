/**
 * Theme preference service with Effect-based error handling
 *
 * Provides theme preference management with:
 * - Persistence to localStorage and cookies
 * - System theme detection
 * - Either for error handling
 */

import type { Either } from 'effect/Either';
import { left, right } from 'effect/Either';
import { getCookie, setCookie } from './cookies';
import { getItem, setItem } from './storage';

/**
 * Theme appearance types
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Theme service error types
 */
export type ThemeError =
    | { type: 'StorageError'; message: string }
    | { type: 'CookieError'; message: string }
    | { type: 'InvalidTheme'; message: string };

/**
 * Cookie key for theme preference
 */
const THEME_COOKIE_KEY = 'theme';

/**
 * LocalStorage key for theme preference
 */
const THEME_STORAGE_KEY = 'theme';

/**
 * Check if current environment prefers dark mode (system theme)
 * Returns false in SSR environment
 */
export function getSystemTheme(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Check if media query API is available (for SSR safety)
 */
export function isMediaQueryAvailable(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia !== undefined;
}

/**
 * Get media query for system theme detection
 */
export function getMediaQuery(): MediaQueryList | null {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
}

/**
 * Apply theme to the document
 * @param theme - The theme to apply
 */
export function applyTheme(theme: Theme): void {
    const isDark = theme === 'dark' || (theme === 'system' && getSystemTheme());

    if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', isDark);
    }
}

/**
 * Get the stored theme from localStorage and cookies
 * Returns Either with the theme or error
 */
export function getStoredTheme(): Either<Theme, ThemeError> {
    // Try localStorage first
    const storageResult = getItem(THEME_STORAGE_KEY);

    if (storageResult._tag === 'Right') {
        const stored = storageResult.right;
        if (stored !== null && isValidTheme(stored)) {
            return right(stored);
        }
    }

    // Fall back to cookie
    const cookieResult = getCookie(THEME_COOKIE_KEY);

    if (cookieResult._tag === 'Left') {
        // Both storage and cookie failed, return default 'system'
        return right('system');
    }

    const cookieValue = cookieResult.right;
    if (cookieValue !== null && isValidTheme(cookieValue)) {
        return right(cookieValue);
    }

    // Default to system theme
    return right('system');
}

/**
 * Set the theme in localStorage and cookies
 * Returns Either with void on success or error
 */
export function setStoredTheme(theme: Theme): Either<void, ThemeError> {
    if (!isValidTheme(theme)) {
        return left({
            type: 'InvalidTheme',
            message: `Invalid theme value: ${theme}. Must be 'light', 'dark', or 'system'`,
        });
    }

    // Save to localStorage
    const storageResult = setItem(THEME_STORAGE_KEY, theme);

    if (storageResult._tag === 'Left') {
        return left({
            type: 'StorageError',
            message: storageResult.left.message,
        });
    }

    // Save to cookie
    const cookieResult = setCookie(THEME_COOKIE_KEY, theme, {
        days: 365,
        path: '/',
        sameSite: 'Lax',
    });

    if (cookieResult._tag === 'Left') {
        return left({
            type: 'CookieError',
            message: cookieResult.left.message,
        });
    }

    // Apply theme to document
    applyTheme(theme);

    return right(undefined);
}

/**
 * Validate if a string is a valid theme
 */
function isValidTheme(value: string): value is Theme {
    return value === 'light' || value === 'dark' || value === 'system';
}

/**
 * Get the resolved theme (converts 'system' to actual theme)
 * @param theme - The theme preference ('light', 'dark', or 'system')
 * @returns The resolved theme ('light' or 'dark')
 */
export function resolveTheme(theme: Theme): 'light' | 'dark' {
    if (theme === 'system') {
        return getSystemTheme() ? 'dark' : 'light';
    }
    return theme;
}

/**
 * Toggle between light and dark themes
 * Returns Either with the new theme or error
 */
export function toggleTheme(): Either<Theme, ThemeError> {
    const currentResult = getStoredTheme();

    if (currentResult._tag === 'Left') {
        return left(currentResult.left);
    }

    const currentTheme = currentResult.right;
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';

    const setResult = setStoredTheme(newTheme);

    if (setResult._tag === 'Left') {
        return left(setResult.left);
    }

    return right(newTheme);
}

/**
 * Initialize theme from storage on app load
 * Returns Either with the theme or error
 */
export function initializeTheme(): Either<Theme, ThemeError> {
    const storedResult = getStoredTheme();

    if (storedResult._tag === 'Left') {
        // Default to system if we can't read storage
        applyTheme('system');
        return right('system');
    }

    const theme = storedResult.right;
    applyTheme(theme);
    return right(theme);
}

/**
 * Subscribe to system theme changes
 * Returns unsubscribe function
 */
export function subscribeToSystemTheme(callback: (isDark: boolean) => void): () => void {
    const mediaQuery = getMediaQuery();

    if (!mediaQuery) {
        return () => {};
    }

    const handler = (e: MediaQueryListEvent) => {
        callback(e.matches);
    };

    mediaQuery.addEventListener('change', handler);

    return () => {
        mediaQuery.removeEventListener('change', handler);
    };
}
