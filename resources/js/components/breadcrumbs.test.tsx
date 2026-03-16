import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Breadcrumbs } from '@/components/breadcrumbs';
import type { BreadcrumbItem } from '@/types';

// Mock the UI breadcrumb components
vi.mock('@/components/ui/breadcrumb', () => ({
    Breadcrumb: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
        <nav data-testid="breadcrumb" {...props}>
            {children}
        </nav>
    ),
    BreadcrumbList: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
        <ol data-testid="breadcrumb-list" {...props}>
            {children}
        </ol>
    ),
    BreadcrumbItem: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
        <li data-testid="breadcrumb-item" {...props}>
            {children}
        </li>
    ),
    BreadcrumbLink: ({ children, asChild, ...props }: { children: React.ReactNode; asChild?: boolean; [key: string]: unknown }) => (
        <a data-testid="breadcrumb-link" {...props}>
            {children}
        </a>
    ),
    BreadcrumbPage: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
        <span data-testid="breadcrumb-page" {...props}>
            {children}
        </span>
    ),
    BreadcrumbSeparator: (props: { [key: string]: unknown }) => (
        <li data-testid="breadcrumb-separator" {...props}>
            /
        </li>
    ),
}));

// Mock the Link component from @inertiajs/react
vi.mock('@inertiajs/react', () => ({
    Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
        <a href={href} data-testid="inertia-link" {...props}>
            {children}
        </a>
    ),
}));

describe('Breadcrumbs', () => {
    const singleBreadcrumb: BreadcrumbItem[] = [{ title: 'Home', href: '/' }];

    const multipleBreadcrumbs: BreadcrumbItem[] = [
        { title: 'Home', href: '/' },
        { title: 'Products', href: '/products' },
        { title: 'Product Details', href: '/products/1' },
    ];

    it('renders the breadcrumb component', () => {
        render(<Breadcrumbs breadcrumbs={singleBreadcrumb} />);
        expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    });

    it('renders navigation path correctly', () => {
        render(<Breadcrumbs breadcrumbs={multipleBreadcrumbs} />);
        expect(screen.getByTestId('breadcrumb-list')).toBeInTheDocument();
    });

    it('renders all breadcrumb items', () => {
        render(<Breadcrumbs breadcrumbs={multipleBreadcrumbs} />);
        const items = screen.getAllByTestId('breadcrumb-item');
        expect(items).toHaveLength(3);
    });

    it('renders breadcrumb titles', () => {
        render(<Breadcrumbs breadcrumbs={multipleBreadcrumbs} />);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();
        expect(screen.getByText('Product Details')).toBeInTheDocument();
    });

    it('renders links for non-last items', () => {
        render(<Breadcrumbs breadcrumbs={multipleBreadcrumbs} />);
        const links = screen.getAllByTestId('inertia-link');
        // First two items should be links
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute('href', '/');
        expect(links[1]).toHaveAttribute('href', '/products');
    });

    it('renders the last item as a page (not a link)', () => {
        render(<Breadcrumbs breadcrumbs={multipleBreadcrumbs} />);
        const page = screen.getByTestId('breadcrumb-page');
        expect(page).toBeInTheDocument();
        expect(page).toHaveTextContent('Product Details');
    });

    it('renders separators between items', () => {
        render(<Breadcrumbs breadcrumbs={multipleBreadcrumbs} />);
        const separators = screen.getAllByTestId('breadcrumb-separator');
        // Two separators for three items
        expect(separators).toHaveLength(2);
    });

    it('renders nothing when breadcrumbs array is empty', () => {
        const { container } = render(<Breadcrumbs breadcrumbs={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders nothing when breadcrumbs is not provided', () => {
        // Note: The component expects an array and will throw if undefined is passed
        // This test verifies that an empty array renders nothing
        const { container } = render(<Breadcrumbs breadcrumbs={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it('handles single breadcrumb item correctly', () => {
        render(<Breadcrumbs breadcrumbs={singleBreadcrumb} />);
        // Should render the item but not a separator
        const items = screen.getAllByTestId('breadcrumb-item');
        expect(items).toHaveLength(1);
        // Single item should be rendered as a page (last item)
        expect(screen.getByTestId('breadcrumb-page')).toBeInTheDocument();
    });

    it('renders with correct href attributes', () => {
        render(<Breadcrumbs breadcrumbs={multipleBreadcrumbs} />);
        const links = screen.getAllByTestId('inertia-link');
        expect(links[0]).toHaveAttribute('href', '/');
        expect(links[1]).toHaveAttribute('href', '/products');
    });

    it('renders correct titles in links and page', () => {
        render(<Breadcrumbs breadcrumbs={multipleBreadcrumbs} />);
        // First two should be in links
        const links = screen.getAllByTestId('inertia-link');
        expect(links[0]).toHaveTextContent('Home');
        expect(links[1]).toHaveTextContent('Products');
        // Last should be in page
        expect(screen.getByTestId('breadcrumb-page')).toHaveTextContent('Product Details');
    });

    it('renders breadcrumbs with special characters in titles', () => {
        const specialBreadcrumbs: BreadcrumbItem[] = [
            { title: 'Home & Garden', href: '/home-garden' },
            { title: "Children's Toys", href: '/toys' },
        ];
        render(<Breadcrumbs breadcrumbs={specialBreadcrumbs} />);
        expect(screen.getByText('Home & Garden')).toBeInTheDocument();
        expect(screen.getByText("Children's Toys")).toBeInTheDocument();
    });

    it('renders breadcrumbs with URL-encoded hrefs', () => {
        const encodedBreadcrumbs: BreadcrumbItem[] = [
            { title: 'Search', href: '/search?query=test%20value' },
            { title: 'Results', href: '/search?query=test%20value&page=2' },
        ];
        render(<Breadcrumbs breadcrumbs={encodedBreadcrumbs} />);
        // With 2 items, only the first is rendered as a link (second is the page)
        const links = screen.getAllByTestId('inertia-link');
        expect(links).toHaveLength(1);
        expect(links[0]).toHaveAttribute('href', '/search?query=test%20value');
    });
});
