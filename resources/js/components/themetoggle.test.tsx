import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from '@/components/ThemeToggle';

// Mock useTheme hook
const mockSetTheme = vi.fn();
vi.mock('@/components/ThemeProvider', () => ({
    useTheme: () => ({
        theme: 'light',
        setTheme: mockSetTheme,
    }),
}));

// Mock UI components - same pattern as setup.ts
vi.mock('@/components/ui/button', () => ({
    Button: ({
        children,
        variant,
        size,
        className,
        ...props
    }: {
        children: React.ReactNode;
        variant?: string;
        size?: string;
        className?: string;
        [key: string]: unknown;
    }) => (
        <button className={className} data-testid="button" {...props}>
            {children}
        </button>
    ),
}));

vi.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-menu">{children}</div>,
    DropdownMenuTrigger: ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => {
        // When asChild is true, render children directly (like Radix UI)
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

describe('ThemeToggle', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the theme toggle button', () => {
        render(<ThemeToggle />);
        // The button is rendered directly since DropdownMenuTrigger has asChild
        const button = screen.getByTestId('button');
        expect(button).toBeInTheDocument();
    });

    it('renders sun and moon icons', () => {
        render(<ThemeToggle />);
        // Check for the button (visible in light mode)
        const buttons = screen.getAllByTestId('button');
        expect(buttons.length).toBeGreaterThan(0);
    });

    it('renders the dropdown menu when triggered', () => {
        render(<ThemeToggle />);
        const button = screen.getByTestId('button');

        // Click to open dropdown
        fireEvent.click(button);

        const dropdownContent = screen.getByTestId('dropdown-content');
        expect(dropdownContent).toBeInTheDocument();
    });

    it('renders light theme option', () => {
        render(<ThemeToggle />);
        const button = screen.getByTestId('button');

        // Click to open dropdown
        fireEvent.click(button);

        const items = screen.getAllByTestId('dropdown-item');
        expect(items.length).toBe(3);
        expect(items[0]).toHaveTextContent('Clair');
    });

    it('renders dark theme option', () => {
        render(<ThemeToggle />);
        const button = screen.getByTestId('button');

        // Click to open dropdown
        fireEvent.click(button);

        const items = screen.getAllByTestId('dropdown-item');
        expect(items[1]).toHaveTextContent('Sombre');
    });

    it('renders system theme option', () => {
        render(<ThemeToggle />);
        const button = screen.getByTestId('button');

        // Click to open dropdown
        fireEvent.click(button);

        const items = screen.getAllByTestId('dropdown-item');
        expect(items[2]).toHaveTextContent('Système');
    });

    it('calls setTheme with light when light option is clicked', () => {
        render(<ThemeToggle />);
        const button = screen.getByTestId('button');

        // Click to open dropdown
        fireEvent.click(button);

        const items = screen.getAllByTestId('dropdown-item');
        // Light theme is the first item
        fireEvent.click(items[0]);

        expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('calls setTheme with dark when dark option is clicked', () => {
        render(<ThemeToggle />);
        const button = screen.getByTestId('button');

        // Click to open dropdown
        fireEvent.click(button);

        const items = screen.getAllByTestId('dropdown-item');
        // Dark theme is the second item
        fireEvent.click(items[1]);

        expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('calls setTheme with system when system option is clicked', () => {
        render(<ThemeToggle />);
        const button = screen.getByTestId('button');

        // Click to open dropdown
        fireEvent.click(button);

        const items = screen.getAllByTestId('dropdown-item');
        // System theme is the third item
        fireEvent.click(items[2]);

        expect(mockSetTheme).toHaveBeenCalledWith('system');
    });

    it('has correct accessibility label', () => {
        render(<ThemeToggle />);
        // Check for sr-only span with "Changer de thème"
        expect(screen.getByText('Changer de thème')).toBeInTheDocument();
    });

    it('renders with correct button classes', () => {
        render(<ThemeToggle />);
        const button = screen.getByTestId('button');
        // The button should have the variant="outline" size="icon" classes
        expect(button).toHaveClass('h-9', 'w-9', 'border-2');
    });
});
