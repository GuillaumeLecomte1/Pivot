/**
 * Integration tests for ThemeService with ThemeToggle component
 *
 * These tests verify:
 * - ThemeToggle correctly calls the theme service (via ThemeProvider)
 * - Theme changes persist correctly
 * - Theme application to the DOM works as expected
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';

// Mock UI components
vi.mock('@/components/ui/button', () => ({
    Button: ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) => (
        <button className={className} data-testid="button" {...props}>
            {children}
        </button>
    ),
}));

vi.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-menu">{children}</div>,
    DropdownMenuTrigger: ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => {
        if (asChild && typeof children === 'object' && children !== null) {
            return <>{children}</>;
        }
        return (
            <button type="button" data-testid="dropdown-trigger">
                {children}
            </button>
        );
    },
    DropdownMenuContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div className={className} data-testid="dropdown-content">
            {children}
        </div>
    ),
    DropdownMenuItem: ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
        <button type="button" className={className} data-testid="dropdown-item" onClick={onClick}>
            {children}
        </button>
    ),
}));

vi.mock('lucide-react', () => ({
    Sun: () => <span data-testid="sun-icon">Sun</span>,
    Moon: () => <span data-testid="moon-icon">Moon</span>,
}));

// Mock localStorage
const createLocalStorageMock = () => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] ?? null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
        clear: vi.fn(() => {
            store = {};
        }),
        get length() {
            return Object.keys(store).length;
        },
        key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
    };
};

describe('ThemeToggle Integration with ThemeProvider', () => {
    let localStorageMock: ReturnType<typeof createLocalStorageMock>;

    beforeEach(() => {
        vi.clearAllMocks();
        localStorageMock = createLocalStorageMock();

        // Mock global localStorage
        vi.stubGlobal('localStorage', localStorageMock);

        // Mock matchMedia on window - need to preserve window object
        if (typeof window !== 'undefined') {
            window.matchMedia = vi.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            }));
        }
    });

    describe('Theme Toggle Interactions with Persistence', () => {
        it('should call setTheme with light when light option is clicked', async () => {
            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>,
            );

            // Open dropdown
            const button = screen.getByTestId('button');
            fireEvent.click(button);

            // Get all dropdown items
            const items = screen.getAllByTestId('dropdown-item');

            // Click light theme option
            fireEvent.click(items[0]);

            // Verify localStorage was called with correct theme
            await waitFor(() => {
                expect(localStorageMock.setItem).toHaveBeenCalledWith('vite-ui-theme', 'light');
            });
        });

        it('should call setTheme with dark when dark option is clicked', async () => {
            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>,
            );

            // Open dropdown
            const button = screen.getByTestId('button');
            fireEvent.click(button);

            // Get all dropdown items
            const items = screen.getAllByTestId('dropdown-item');

            // Click dark theme option
            fireEvent.click(items[1]);

            // Verify localStorage was called with correct theme
            await waitFor(() => {
                expect(localStorageMock.setItem).toHaveBeenCalledWith('vite-ui-theme', 'dark');
            });
        });

        it('should call setTheme with system when system option is clicked', async () => {
            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>,
            );

            // Open dropdown
            const button = screen.getByTestId('button');
            fireEvent.click(button);

            // Get all dropdown items
            const items = screen.getAllByTestId('dropdown-item');

            // Click system theme option
            fireEvent.click(items[2]);

            // Verify localStorage was called with correct theme
            await waitFor(() => {
                expect(localStorageMock.setItem).toHaveBeenCalledWith('vite-ui-theme', 'system');
            });
        });
    });

    describe('Theme Persistence', () => {
        it('should persist theme to localStorage when theme changes', async () => {
            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>,
            );

            // Open dropdown and select dark
            const button = screen.getByTestId('button');
            fireEvent.click(button);
            const items = screen.getAllByTestId('dropdown-item');
            fireEvent.click(items[1]);

            // Verify persistence
            await waitFor(() => {
                expect(localStorageMock.setItem).toHaveBeenCalled();
                expect(localStorageMock.setItem).toHaveBeenCalledWith('vite-ui-theme', 'dark');
            });
        });

        it('should read theme from localStorage on initial render', async () => {
            // Pre-set theme in localStorage
            localStorageMock.getItem.mockReturnValue('dark');

            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>,
            );

            // Verify localStorage was read
            await waitFor(() => {
                expect(localStorageMock.getItem).toHaveBeenCalledWith('vite-ui-theme');
            });
        });
    });

    describe('Theme Changes Persistence', () => {
        it('should persist theme changes across multiple toggles', async () => {
            render(
                <ThemeProvider defaultTheme="light">
                    <ThemeToggle />
                </ThemeProvider>,
            );

            const button = screen.getByTestId('button');

            // Toggle to dark
            fireEvent.click(button);
            let items = screen.getAllByTestId('dropdown-item');
            fireEvent.click(items[1]);

            await waitFor(() => {
                expect(localStorageMock.setItem).toHaveBeenCalledWith('vite-ui-theme', 'dark');
            });

            // Toggle to light
            fireEvent.click(button);
            items = screen.getAllByTestId('dropdown-item');
            fireEvent.click(items[0]);

            await waitFor(() => {
                expect(localStorageMock.setItem).toHaveBeenCalledWith('vite-ui-theme', 'light');
            });

            // Toggle to system
            fireEvent.click(button);
            items = screen.getAllByTestId('dropdown-item');
            fireEvent.click(items[2]);

            await waitFor(() => {
                expect(localStorageMock.setItem).toHaveBeenCalledWith('vite-ui-theme', 'system');
            });
        });
    });

    describe('Accessibility', () => {
        it('should render with accessible label', () => {
            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>,
            );

            expect(screen.getByText('Changer de thème')).toBeInTheDocument();
        });

        it('should render all theme options with correct labels', () => {
            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>,
            );

            const button = screen.getByTestId('button');
            fireEvent.click(button);

            const items = screen.getAllByTestId('dropdown-item');
            expect(items[0]).toHaveTextContent('Clair');
            expect(items[1]).toHaveTextContent('Sombre');
            expect(items[2]).toHaveTextContent('Système');
        });
    });
});
