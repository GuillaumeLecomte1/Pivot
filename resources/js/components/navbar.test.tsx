import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MainNavbar from '@/components/MainNavbar';
import { Navbar } from '@/components/navbar';

// Mock Inertia Link and usePage
vi.mock('@inertiajs/react', () => ({
    Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
        <a href={href} {...props}>
            {children}
        </a>
    ),
    usePage: vi.fn(() => ({
        props: {
            auth: {
                user: {
                    name: 'Test User',
                    avatar: null,
                },
            },
        },
        url: '/dashboard',
    })),
}));

// Mock ThemeToggle component
vi.mock('@/components/ThemeToggle', () => ({
    ThemeToggle: () => (
        <button type="button" data-testid="theme-toggle">
            Theme
        </button>
    ),
}));

// Mock UI components used by Navbar
vi.mock('@/components/ui/avatar', () => ({
    Avatar: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div className={className} data-testid="avatar">
            {children}
        </div>
    ),
    AvatarImage: ({ src, alt }: { src?: string; alt?: string }) => <img src={src} alt={alt} data-testid="avatar-image" />,
    AvatarFallback: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div className={className} data-testid="avatar-fallback">
            {children}
        </div>
    ),
}));

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
    DropdownMenuItem: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div className={className} data-testid="dropdown-item">
            {children}
        </div>
    ),
}));

vi.mock('@/components/ui/navigation-menu', () => ({
    NavigationMenu: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <nav className={className} data-testid="navigation-menu">
            {children}
        </nav>
    ),
    NavigationMenuItem: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div className={className} data-testid="navigation-menu-item">
            {children}
        </div>
    ),
    NavigationMenuList: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <ul className={className} data-testid="navigation-menu-list">
            {children}
        </ul>
    ),
    navigationMenuTriggerStyle: () => 'navigation-menu-trigger',
}));

vi.mock('@/components/ui/sheet', () => ({
    Sheet: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet">{children}</div>,
    SheetTrigger: ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => {
        if (asChild && typeof children === 'object' && children !== null) {
            return <>{children}</>;
        }
        return (
            <button type="button" data-testid="sheet-trigger">
                {children}
            </button>
        );
    },
    SheetContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div className={className} data-testid="sheet-content">
            {children}
        </div>
    ),
    SheetHeader: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div className={className} data-testid="sheet-header">
            {children}
        </div>
    ),
}));

vi.mock('@/components/icon', () => ({
    Icon: ({ iconNode: IconComponent, className }: { iconNode: React.ComponentType<{ className?: string }>; className?: string }) => (
        <IconComponent className={className} data-testid="icon" />
    ),
}));

vi.mock('@/components/user-menu-content', () => ({
    UserMenuContent: ({ user }: { user: { name: string } }) => <div data-testid="user-menu-content">{user.name}</div>,
}));

vi.mock('@/components/app-logo', () => ({
    default: () => <div data-testid="app-logo">App Logo</div>,
}));

vi.mock('@/components/app-logo-icon', () => ({
    default: ({ className }: { className?: string }) => (
        <div className={className} data-testid="app-logo-icon">
            App Logo Icon
        </div>
    ),
}));

vi.mock('@/lib/utils', () => ({
    cn: (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' '),
}));

describe('MainNavbar', () => {
    it('renders the navbar component', () => {
        const { container } = render(<MainNavbar />);
        expect(container).toBeInTheDocument();
    });

    it('renders the logo link', () => {
        render(<MainNavbar />);
        const logoLink = screen.getByRole('link', { name: /logo pivot/i });
        expect(logoLink).toBeInTheDocument();
        expect(logoLink).toHaveAttribute('href', '/');
    });

    it('renders the main navigation links', () => {
        render(<MainNavbar />);

        // Check for Accueil link
        expect(screen.getByRole('link', { name: /accueil/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /accueil/i })).toHaveAttribute('href', '/');

        // Check for Catégorie link
        expect(screen.getByRole('link', { name: /catégorie/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /catégorie/i })).toHaveAttribute('href', '/categories');

        // Check for Ressourcerie link
        expect(screen.getByRole('link', { name: /ressourcerie/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /ressourcerie/i })).toHaveAttribute('href', '/ressourceries');

        // Check for Notre histoire link
        expect(screen.getByRole('link', { name: /notre histoire/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /notre histoire/i })).toHaveAttribute('href', '/notre-histoire');
    });

    it('renders the Pivot Pro link', () => {
        render(<MainNavbar />);
        const pivotProLink = screen.getByRole('link', { name: /pivot pro/i });
        expect(pivotProLink).toBeInTheDocument();
        expect(pivotProLink).toHaveAttribute('href', '/pivot-pro');
    });

    it('renders the login link', () => {
        render(<MainNavbar />);
        const loginLink = screen.getByRole('link', { name: /se connecter/i });
        expect(loginLink).toBeInTheDocument();
        expect(loginLink).toHaveAttribute('href', '/login');
    });

    it('renders the favorites link', () => {
        render(<MainNavbar />);
        const favorisLink = screen.getByRole('link', { name: /favoris/i });
        expect(favorisLink).toBeInTheDocument();
        expect(favorisLink).toHaveAttribute('href', '/favoris');
    });

    it('renders the cart link', () => {
        render(<MainNavbar />);
        const panierLink = screen.getByRole('link', { name: /panier/i });
        expect(panierLink).toBeInTheDocument();
        expect(panierLink).toHaveAttribute('href', '/panier');
    });

    it('renders the city selector link', () => {
        render(<MainNavbar />);
        const cityLink = screen.getByRole('link', { name: /sélectionner ville/i });
        expect(cityLink).toBeInTheDocument();
        expect(cityLink).toHaveAttribute('href', '/angers');
    });

    it('renders the theme toggle', () => {
        render(<MainNavbar />);
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });

    it('renders a header element', () => {
        render(<MainNavbar />);
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
    });

    it('renders mobile menu button', () => {
        render(<MainNavbar />);
        const menuButton = screen.getByRole('button', { name: /menu/i });
        expect(menuButton).toBeInTheDocument();
    });
});

describe('Navbar (authenticated)', () => {
    it('renders the authenticated navbar component', () => {
        const { container } = render(<Navbar />);
        expect(container).toBeInTheDocument();
    });

    it('renders a header element', () => {
        render(<Navbar />);
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<Navbar />);
        // Check that navigation links exist (dashboard, users, settings)
        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThan(0);

        // Verify specific hrefs exist
        const dashboardLinks = links.filter((link) => link.getAttribute('href') === '/dashboard');
        expect(dashboardLinks.length).toBeGreaterThan(0);

        const usersLinks = links.filter((link) => link.getAttribute('href') === '/users');
        expect(usersLinks.length).toBeGreaterThan(0);

        const settingsLinks = links.filter((link) => link.getAttribute('href') === '/settings');
        expect(settingsLinks.length).toBeGreaterThan(0);
    });

    it('renders the notification button', () => {
        render(<Navbar />);
        // There are multiple buttons, check that at least one exists
        const buttons = screen.getAllByTestId('button');
        expect(buttons.length).toBeGreaterThan(0);
    });

    it('renders the avatar component for user', () => {
        render(<Navbar />);
        const avatar = screen.getByTestId('avatar');
        expect(avatar).toBeInTheDocument();
    });

    it('renders with custom className', () => {
        const customClass = 'custom-navbar-class';
        const { container } = render(<Navbar className={customClass} />);
        const header = container.querySelector('header');
        expect(header).toHaveClass(customClass);
    });

    it('renders navigation menu on desktop', () => {
        render(<Navbar />);
        const navMenu = screen.getByTestId('navigation-menu');
        expect(navMenu).toBeInTheDocument();
    });

    it('renders user avatar fallback with initials', () => {
        render(<Navbar />);
        const avatarFallback = screen.getByTestId('avatar-fallback');
        expect(avatarFallback).toBeInTheDocument();
    });

    it('renders the sheet for mobile menu', () => {
        render(<Navbar />);
        const sheet = screen.getByTestId('sheet');
        expect(sheet).toBeInTheDocument();
    });

    it('renders app logo link', () => {
        render(<Navbar />);
        const dashboardLink = screen.getByRole('link', { name: /app logo/i });
        expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    });
});
