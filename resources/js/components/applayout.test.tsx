import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AppLayout from '@/components/AppLayout';

// Mock MainNavbar component
vi.mock('@/components/MainNavbar', () => ({
    default: () => <header data-testid="main-navbar">MainNavbar</header>,
}));

// Mock Footer component
vi.mock('@/components/Footer', () => ({
    default: () => <footer data-testid="footer">Footer</footer>,
}));

describe('AppLayout', () => {
    it('renders the AppLayout component', () => {
        const { container } = render(
            <AppLayout>
                <div>Test Content</div>
            </AppLayout>,
        );
        expect(container).toBeInTheDocument();
    });

    it('renders the MainNavbar component', () => {
        render(
            <AppLayout>
                <div>Test Content</div>
            </AppLayout>,
        );
        expect(screen.getByTestId('main-navbar')).toBeInTheDocument();
    });

    it('renders the Footer component', () => {
        render(
            <AppLayout>
                <div>Test Content</div>
            </AppLayout>,
        );
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        render(
            <AppLayout>
                <div data-testid="child-content">Test Child Content</div>
            </AppLayout>,
        );
        expect(screen.getByTestId('child-content')).toBeInTheDocument();
        expect(screen.getByText('Test Child Content')).toBeInTheDocument();
    });

    it('wraps children in main element', () => {
        const { container } = render(
            <AppLayout>
                <div>Test Content</div>
            </AppLayout>,
        );
        const mainElement = container.querySelector('main');
        expect(mainElement).toBeInTheDocument();
    });

    it('places children inside main element', () => {
        render(
            <AppLayout>
                <span data-testid="nested-child">Nested Content</span>
            </AppLayout>,
        );
        const mainElement = document.querySelector('main');
        expect(mainElement).toContainElement(screen.getByTestId('nested-child'));
    });

    it('wraps content in div with min-h-screen class', () => {
        const { container } = render(
            <AppLayout>
                <div>Test Content</div>
            </AppLayout>,
        );
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass('min-h-screen');
    });

    it('renders multiple children correctly', () => {
        render(
            <AppLayout>
                <div>First Child</div>
                <div>Second Child</div>
                <div>Third Child</div>
            </AppLayout>,
        );
        expect(screen.getByText('First Child')).toBeInTheDocument();
        expect(screen.getByText('Second Child')).toBeInTheDocument();
        expect(screen.getByText('Third Child')).toBeInTheDocument();
    });

    it('renders string children', () => {
        render(<AppLayout>Simple string content</AppLayout>);
        expect(screen.getByText('Simple string content')).toBeInTheDocument();
    });

    it('renders MainNavbar before main content', () => {
        const { container } = render(
            <AppLayout>
                <div>Content</div>
            </AppLayout>,
        );

        const navbar = screen.getByTestId('main-navbar');
        const main = container.querySelector('main');

        expect(navbar.compareDocumentPosition(main!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it('renders main content before Footer', () => {
        const { container } = render(
            <AppLayout>
                <div>Content</div>
            </AppLayout>,
        );

        const main = container.querySelector('main');
        const footer = screen.getByTestId('footer');

        expect(main!.compareDocumentPosition(footer)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
});
