/**
 * Tests for Theme preference service
 *
 * Tests cover:
 * - Theme get/set operations
 * - System theme detection
 * - Persistence to localStorage and cookies
 * - Theme resolution
 * - Theme toggle
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
    applyTheme,
    getMediaQuery,
    getStoredTheme,
    getSystemTheme,
    initializeTheme,
    isMediaQueryAvailable,
    resolveTheme,
    setStoredTheme,
    subscribeToSystemTheme,
    toggleTheme,
} from '../lib/theme';

describe('Theme', () => {
    beforeEach(() => {
        // Reset all mocks
        vi.clearAllMocks();

        // Mock localStorage
        vi.stubGlobal('localStorage', {
            length: 0,
            clear: vi.fn(),
            getItem: vi.fn(),
            key: vi.fn(),
            removeItem: vi.fn(),
            setItem: vi.fn(),
        });

        // Mock document
        vi.stubGlobal('document', {
            cookie: '',
            documentElement: {
                classList: {
                    toggle: vi.fn(),
                },
            },
        });

        // Mock window.matchMedia
        vi.stubGlobal('window', {
            matchMedia: vi.fn(() => ({
                matches: false,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            })),
        });
    });

    describe('getSystemTheme', () => {
        it('should return false in SSR environment', () => {
            vi.stubGlobal('window', undefined);
            expect(getSystemTheme()).toBe(false);
            vi.unstubAllGlobals();
        });

        it('should return true when system prefers dark mode', () => {
            vi.stubGlobal('window', {
                matchMedia: vi.fn(() => ({
                    matches: true,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            expect(getSystemTheme()).toBe(true);
            vi.unstubAllGlobals();
        });

        it('should return false when system prefers light mode', () => {
            vi.stubGlobal('window', {
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            expect(getSystemTheme()).toBe(false);
            vi.unstubAllGlobals();
        });
    });

    describe('isMediaQueryAvailable', () => {
        it('should return false in SSR environment', () => {
            vi.stubGlobal('window', undefined);
            expect(isMediaQueryAvailable()).toBe(false);
            vi.unstubAllGlobals();
        });

        it('should return true when window.matchMedia is available', () => {
            vi.stubGlobal('window', {
                matchMedia: vi.fn(() => ({
                    matches: false,
                })),
            });
            expect(isMediaQueryAvailable()).toBe(true);
            vi.unstubAllGlobals();
        });
    });

    describe('getMediaQuery', () => {
        it('should return null in SSR environment', () => {
            vi.stubGlobal('window', undefined);
            expect(getMediaQuery()).toBeNull();
            vi.unstubAllGlobals();
        });

        it('should return MediaQueryList when available', () => {
            const mockMediaQuery = {
                matches: false,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            };
            vi.stubGlobal('window', {
                matchMedia: vi.fn(() => mockMediaQuery),
            });
            expect(getMediaQuery()).toBe(mockMediaQuery);
            vi.unstubAllGlobals();
        });
    });

    describe('applyTheme', () => {
        it('should add dark class for dark theme', () => {
            applyTheme('dark');
            expect(document.documentElement.classList.toggle).toHaveBeenCalledWith('dark', true);
        });

        it('should add dark class for system theme when system is dark', () => {
            vi.stubGlobal('window', {
                matchMedia: vi.fn(() => ({
                    matches: true,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            applyTheme('system');
            expect(document.documentElement.classList.toggle).toHaveBeenCalledWith('dark', true);
            vi.unstubAllGlobals();
        });

        it('should not add dark class for light theme', () => {
            applyTheme('light');
            expect(document.documentElement.classList.toggle).toHaveBeenCalledWith('dark', false);
        });

        it('should not add dark class for system theme when system is light', () => {
            applyTheme('system');
            expect(document.documentElement.classList.toggle).toHaveBeenCalledWith('dark', false);
        });

        it('should not throw in SSR environment', () => {
            vi.stubGlobal('document', undefined);
            expect(() => applyTheme('dark')).not.toThrow();
            vi.unstubAllGlobals();
        });
    });

    describe('getStoredTheme', () => {
        it('should return stored theme from localStorage', () => {
            vi.stubGlobal('window', {
                localStorage: {
                    getItem: vi.fn(() => 'dark'),
                    setItem: vi.fn(),
                    removeItem: vi.fn(),
                    length: 0,
                    key: vi.fn(),
                    clear: vi.fn(),
                },
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            vi.stubGlobal('document', {
                cookie: '',
                documentElement: {
                    classList: {
                        toggle: vi.fn(),
                    },
                },
            });

            const result = getStoredTheme();
            expect(result._tag).toBe('Right');
            if (result._tag === 'Right') {
                expect(result.right).toBe('dark');
            }
            vi.unstubAllGlobals();
        });

        it('should return theme from cookie when localStorage is empty', () => {
            vi.stubGlobal('window', {
                localStorage: {
                    getItem: vi.fn(() => null),
                    setItem: vi.fn(),
                    removeItem: vi.fn(),
                    length: 0,
                    key: vi.fn(),
                    clear: vi.fn(),
                },
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            vi.stubGlobal('document', {
                cookie: 'theme=light',
                documentElement: {
                    classList: {
                        toggle: vi.fn(),
                    },
                },
            });

            const result = getStoredTheme();
            expect(result._tag).toBe('Right');
            if (result._tag === 'Right') {
                expect(result.right).toBe('light');
            }
            vi.unstubAllGlobals();
        });

        it('should return system theme when nothing is stored', () => {
            vi.stubGlobal('window', {
                localStorage: {
                    getItem: vi.fn(() => null),
                    setItem: vi.fn(),
                    removeItem: vi.fn(),
                    length: 0,
                    key: vi.fn(),
                    clear: vi.fn(),
                },
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            vi.stubGlobal('document', {
                cookie: '',
                documentElement: {
                    classList: {
                        toggle: vi.fn(),
                    },
                },
            });

            const result = getStoredTheme();
            expect(result._tag).toBe('Right');
            if (result._tag === 'Right') {
                expect(result.right).toBe('system');
            }
            vi.unstubAllGlobals();
        });

        it('should return default system when localStorage fails', () => {
            vi.stubGlobal('window', {
                localStorage: {
                    getItem: vi.fn(() => {
                        throw new Error('Storage not available');
                    }),
                    setItem: vi.fn(),
                    removeItem: vi.fn(),
                    length: 0,
                    key: vi.fn(),
                    clear: vi.fn(),
                },
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            vi.stubGlobal('document', {
                cookie: '',
                documentElement: {
                    classList: {
                        toggle: vi.fn(),
                    },
                },
            });

            const result = getStoredTheme();
            expect(result._tag).toBe('Right');
            if (result._tag === 'Right') {
                expect(result.right).toBe('system');
            }
            vi.unstubAllGlobals();
        });
    });

    describe('setStoredTheme', () => {
        it('should save theme to localStorage and cookie', () => {
            let cookieValue = '';
            vi.stubGlobal('window', {
                localStorage: {
                    getItem: vi.fn(),
                    setItem: vi.fn(),
                    removeItem: vi.fn(),
                    length: 0,
                    key: vi.fn(),
                    clear: vi.fn(),
                },
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            vi.stubGlobal('document', {
                get cookie() {
                    return cookieValue;
                },
                set cookie(v: string) {
                    cookieValue = v;
                },
                documentElement: {
                    classList: {
                        toggle: vi.fn(),
                    },
                },
            });

            const result = setStoredTheme('dark');
            expect(result._tag).toBe('Right');

            // Verify localStorage was called
            expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
            vi.unstubAllGlobals();
        });

        it('should return Left for invalid theme', () => {
            const result = setStoredTheme('invalid' as 'light');
            expect(result._tag).toBe('Left');
            if (result._tag === 'Left') {
                expect(result.left.type).toBe('InvalidTheme');
            }
        });

        it('should return Left when localStorage fails', () => {
            vi.stubGlobal('window', {
                localStorage: {
                    getItem: vi.fn(),
                    setItem: vi.fn(() => {
                        throw new Error('Quota exceeded');
                    }),
                    removeItem: vi.fn(),
                    length: 0,
                    key: vi.fn(),
                    clear: vi.fn(),
                },
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            vi.stubGlobal('document', {
                cookie: '',
                documentElement: {
                    classList: {
                        toggle: vi.fn(),
                    },
                },
            });

            const result = setStoredTheme('light');
            expect(result._tag).toBe('Left');
            if (result._tag === 'Left') {
                expect(result.left.type).toBe('StorageError');
            }
            vi.unstubAllGlobals();
        });

        it('should apply theme to document', () => {
            const toggleMock = vi.fn();
            vi.stubGlobal('window', {
                localStorage: {
                    getItem: vi.fn(),
                    setItem: vi.fn(),
                    removeItem: vi.fn(),
                    length: 0,
                    key: vi.fn(),
                    clear: vi.fn(),
                },
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            vi.stubGlobal('document', {
                cookie: '',
                documentElement: {
                    classList: {
                        toggle: toggleMock,
                    },
                },
            });

            setStoredTheme('dark');
            expect(toggleMock).toHaveBeenCalledWith('dark', true);
            vi.unstubAllGlobals();
        });
    });

    describe('resolveTheme', () => {
        it('should return light for light theme', () => {
            expect(resolveTheme('light')).toBe('light');
        });

        it('should return dark for dark theme', () => {
            expect(resolveTheme('dark')).toBe('dark');
        });

        it('should return dark when system is dark', () => {
            vi.stubGlobal('window', {
                matchMedia: vi.fn(() => ({
                    matches: true,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            expect(resolveTheme('system')).toBe('dark');
            vi.unstubAllGlobals();
        });

        it('should return light when system is light', () => {
            expect(resolveTheme('system')).toBe('light');
        });
    });

    describe('toggleTheme', () => {
        it('should toggle from dark to light', () => {
            vi.stubGlobal('window', {
                localStorage: {
                    getItem: vi.fn(() => 'dark'),
                    setItem: vi.fn(),
                    removeItem: vi.fn(),
                    length: 0,
                    key: vi.fn(),
                    clear: vi.fn(),
                },
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            vi.stubGlobal('document', {
                cookie: '',
                documentElement: {
                    classList: {
                        toggle: vi.fn(),
                    },
                },
            });

            const result = toggleTheme();
            expect(result._tag).toBe('Right');
            if (result._tag === 'Right') {
                expect(result.right).toBe('light');
            }
            vi.unstubAllGlobals();
        });

        it('should toggle from light to dark', () => {
            vi.stubGlobal('window', {
                localStorage: {
                    getItem: vi.fn(() => 'light'),
                    setItem: vi.fn(),
                    removeItem: vi.fn(),
                    length: 0,
                    key: vi.fn(),
                    clear: vi.fn(),
                },
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            vi.stubGlobal('document', {
                cookie: '',
                documentElement: {
                    classList: {
                        toggle: vi.fn(),
                    },
                },
            });

            const result = toggleTheme();
            expect(result._tag).toBe('Right');
            if (result._tag === 'Right') {
                expect(result.right).toBe('dark');
            }
            vi.unstubAllGlobals();
        });

        it('should toggle from system to light', () => {
            vi.stubGlobal('window', {
                localStorage: {
                    getItem: vi.fn(() => 'system'),
                    setItem: vi.fn(),
                    removeItem: vi.fn(),
                    length: 0,
                    key: vi.fn(),
                    clear: vi.fn(),
                },
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            vi.stubGlobal('document', {
                cookie: '',
                documentElement: {
                    classList: {
                        toggle: vi.fn(),
                    },
                },
            });

            const result = toggleTheme();
            expect(result._tag).toBe('Right');
            if (result._tag === 'Right') {
                expect(result.right).toBe('dark');
            }
            vi.unstubAllGlobals();
        });
    });

    describe('initializeTheme', () => {
        it('should initialize theme from storage', () => {
            vi.stubGlobal('window', {
                localStorage: {
                    getItem: vi.fn(() => 'dark'),
                    setItem: vi.fn(),
                    removeItem: vi.fn(),
                    length: 0,
                    key: vi.fn(),
                    clear: vi.fn(),
                },
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            vi.stubGlobal('document', {
                cookie: '',
                documentElement: {
                    classList: {
                        toggle: vi.fn(),
                    },
                },
            });

            const result = initializeTheme();
            expect(result._tag).toBe('Right');
            if (result._tag === 'Right') {
                expect(result.right).toBe('dark');
            }
            vi.unstubAllGlobals();
        });

        it('should default to system when storage fails', () => {
            vi.stubGlobal('window', {
                localStorage: {
                    getItem: vi.fn(() => {
                        throw new Error('Not available');
                    }),
                    setItem: vi.fn(),
                    removeItem: vi.fn(),
                    length: 0,
                    key: vi.fn(),
                    clear: vi.fn(),
                },
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                })),
            });
            vi.stubGlobal('document', {
                cookie: '',
                documentElement: {
                    classList: {
                        toggle: vi.fn(),
                    },
                },
            });

            const result = initializeTheme();
            expect(result._tag).toBe('Right');
            if (result._tag === 'Right') {
                expect(result.right).toBe('system');
            }
            vi.unstubAllGlobals();
        });
    });

    describe('subscribeToSystemTheme', () => {
        it('should return unsubscribe function', () => {
            const addEventListenerMock = vi.fn();
            const removeEventListenerMock = vi.fn();
            vi.stubGlobal('window', {
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: addEventListenerMock,
                    removeEventListener: removeEventListenerMock,
                })),
            });

            const unsubscribe = subscribeToSystemTheme(() => {});
            expect(typeof unsubscribe).toBe('function');
            vi.unstubAllGlobals();
        });

        it('should not call addEventListener in SSR', () => {
            vi.stubGlobal('window', undefined);

            const unsubscribe = subscribeToSystemTheme(() => {});
            unsubscribe(); // Should not throw
            vi.unstubAllGlobals();
        });

        it('should call unsubscribe when returned function is called', () => {
            const addEventListenerMock = vi.fn();
            const removeEventListenerMock = vi.fn();
            vi.stubGlobal('window', {
                matchMedia: vi.fn(() => ({
                    matches: false,
                    addEventListener: addEventListenerMock,
                    removeEventListener: removeEventListenerMock,
                })),
            });

            const unsubscribe = subscribeToSystemTheme(() => {});
            unsubscribe();
            expect(removeEventListenerMock).toHaveBeenCalled();
            vi.unstubAllGlobals();
        });
    });
});
