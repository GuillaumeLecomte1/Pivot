import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Footer from '@/components/Footer';

// Mock Inertia Link
vi.mock('@inertiajs/react', () => ({
    Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
        <a href={href} {...props}>
            {children}
        </a>
    ),
}));

describe('Footer', () => {
    it('renders the footer component', () => {
        const { container } = render(<Footer />);
        expect(container.querySelector('footer')).toBeInTheDocument();
    });

    it('renders the logo image', () => {
        render(<Footer />);
        const logo = screen.getByAltText('Logo Pivot');
        expect(logo).toBeInTheDocument();
    });

    it('renders the tagline text', () => {
        render(<Footer />);
        expect(screen.getByText(/La marketplace/)).toBeInTheDocument();
        expect(screen.getByText(/des ressourceries françaises/)).toBeInTheDocument();
    });

    it('renders Twitter social link', () => {
        render(<Footer />);
        const twitterLink = screen.getByRole('link', { name: /twitter/i });
        expect(twitterLink).toBeInTheDocument();
        expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/pivot');
    });

    it('renders Instagram social link', () => {
        render(<Footer />);
        const instagramLink = screen.getByRole('link', { name: /instagram/i });
        expect(instagramLink).toBeInTheDocument();
        expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/pivot');
    });

    it('renders Categories section title', () => {
        render(<Footer />);
        expect(screen.getByText('Catégories')).toBeInTheDocument();
    });

    it('renders all category links', () => {
        render(<Footer />);
        expect(screen.getByRole('link', { name: /art de la table/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /mobilier/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /librairie/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /vêtements/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /technologie/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /extérieurs/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /loisirs/i })).toBeInTheDocument();
    });

    it('renders correct hrefs for category links', () => {
        render(<Footer />);
        expect(screen.getByRole('link', { name: /art de la table/i })).toHaveAttribute('href', '/categories/art-de-la-table');
        expect(screen.getByRole('link', { name: /mobilier/i })).toHaveAttribute('href', '/categories/mobilier');
        expect(screen.getByRole('link', { name: /librairie/i })).toHaveAttribute('href', '/categories/librairie');
    });

    it('renders À propos section title', () => {
        render(<Footer />);
        expect(screen.getByText('À propos')).toBeInTheDocument();
    });

    it('renders About section links', () => {
        render(<Footer />);
        expect(screen.getByRole('link', { name: /qui sommes nous/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /les ressourceries/i })).toBeInTheDocument();
    });

    it('renders correct hrefs for About links', () => {
        render(<Footer />);
        expect(screen.getByRole('link', { name: /qui sommes nous/i })).toHaveAttribute('href', '/notre-histoire');
        expect(screen.getByRole('link', { name: /les ressourceries/i })).toHaveAttribute('href', '/les-ressourceries');
    });

    it("renders Besoin d'aide section title", () => {
        render(<Footer />);
        expect(screen.getByText("Besoin d'aide ?")).toBeInTheDocument();
    });

    it('renders Help section links', () => {
        render(<Footer />);
        expect(screen.getByRole('link', { name: /faq/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /nous contacter/i })).toBeInTheDocument();
    });

    it('renders correct hrefs for Help links', () => {
        render(<Footer />);
        expect(screen.getByRole('link', { name: /faq/i })).toHaveAttribute('href', '/faq');
        expect(screen.getByRole('link', { name: /nous contacter/i })).toHaveAttribute('href', '/contact');
    });

    it('renders copyright text', () => {
        render(<Footer />);
        expect(screen.getByText(/© 2023, l'agence Pivot/)).toBeInTheDocument();
    });

    it('renders legal links', () => {
        render(<Footer />);
        expect(screen.getByRole('link', { name: /mentions légales/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /conditions générales d'utilisations/i })).toBeInTheDocument();
    });

    it('renders correct hrefs for legal links', () => {
        render(<Footer />);
        expect(screen.getByRole('link', { name: /mentions légales/i })).toHaveAttribute('href', '/mentions-legales');
        expect(screen.getByRole('link', { name: /conditions générales d'utilisations/i })).toHaveAttribute('href', '/conditions');
    });

    it('renders with correct footer classes', () => {
        const { container } = render(<Footer />);
        const footer = container.querySelector('footer');
        expect(footer).toHaveClass('bg-[#0A1A1B]', 'py-12', 'text-white');
    });

    it('renders four column grid layout', () => {
        const { container } = render(<Footer />);
        const grid = container.querySelector('.grid-cols-1');
        expect(grid).toBeInTheDocument();
    });
});
