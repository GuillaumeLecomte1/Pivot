import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Heading from '@/components/heading';

describe('Heading', () => {
    it('renders the title correctly', () => {
        render(<Heading title="Test Title" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders the title in an h2 element', () => {
        render(<Heading title="Test Title" />);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Test Title');
    });

    it('renders the description when provided', () => {
        render(<Heading title="Test Title" description="Test Description" />);
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders description in a paragraph element', () => {
        render(<Heading title="Test Title" description="Test Description" />);
        const description = screen.getByText('Test Description');
        expect(description.tagName).toBe('P');
    });

    it('does not render description when not provided', () => {
        render(<Heading title="Test Title" />);
        const descriptionElement = screen.queryByText(/Test Description/);
        expect(descriptionElement).not.toBeInTheDocument();
    });

    it('does not render description when undefined', () => {
        render(<Heading title="Test Title" description={undefined} />);
        const descriptionElement = screen.queryByRole('paragraph');
        expect(descriptionElement).not.toBeInTheDocument();
    });

    it('does not render description when empty string', () => {
        render(<Heading title="Test Title" description="" />);
        // Empty string should not render a description paragraph
        const paragraphs = screen.queryAllByRole('paragraph');
        expect(paragraphs).toHaveLength(0);
    });

    it('renders with correct CSS classes on heading', () => {
        render(<Heading title="Test Title" />);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveClass('font-semibold', 'text-xl', 'tracking-tight');
    });

    it('renders with correct CSS classes on container', () => {
        const { container } = render(<Heading title="Test Title" />);
        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass('mb-8', 'space-y-0.5');
    });

    it('renders description with muted foreground color class', () => {
        render(<Heading title="Test Title" description="Test Description" />);
        const description = screen.getByText('Test Description');
        expect(description).toHaveClass('text-muted-foreground', 'text-sm');
    });

    it('handles long title text correctly', () => {
        const longTitle = 'This is a very long title that might wrap to multiple lines when rendered in the UI';
        render(<Heading title={longTitle} />);
        expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('handles long description text correctly', () => {
        const longDescription =
            'This is a very long description that might wrap to multiple lines when rendered in the UI and should still be displayed correctly';
        render(<Heading title="Test Title" description={longDescription} />);
        expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it('renders correctly with both title and description', () => {
        render(<Heading title="Complete Heading" description="This is the description" />);
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Complete Heading');
        expect(screen.getByText('This is the description')).toBeInTheDocument();
    });
});
