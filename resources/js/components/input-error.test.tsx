import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import InputError from '@/components/input-error';

describe('InputError', () => {
    it('renders the error message when provided', () => {
        render(<InputError message="This field is required" />);
        expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders in a paragraph element', () => {
        render(<InputError message="Error message" />);
        expect(screen.getByText('Error message').tagName).toBe('P');
    });

    it('does not render when message is undefined', () => {
        const { container } = render(<InputError message={undefined} />);
        expect(container.firstChild).toBeNull();
    });

    it('does not render when message is not provided', () => {
        const { container } = render(<InputError />);
        expect(container.firstChild).toBeNull();
    });

    it('does not render when message is empty string', () => {
        const { container } = render(<InputError message="" />);
        expect(container.firstChild).toBeNull();
    });

    it('renders with default error color classes', () => {
        render(<InputError message="Error message" />);
        const errorElement = screen.getByText('Error message');
        expect(errorElement).toHaveClass('text-red-600', 'text-sm');
    });

    it('renders with dark mode error color class', () => {
        render(<InputError message="Error message" />);
        const errorElement = screen.getByText('Error message');
        expect(errorElement).toHaveClass('dark:text-red-400');
    });

    it('applies custom className when provided', () => {
        render(<InputError message="Error message" className="mt-2" />);
        const errorElement = screen.getByText('Error message');
        expect(errorElement).toHaveClass('mt-2');
    });

    it('preserves default classes when custom className is provided', () => {
        render(<InputError message="Error message" className="custom-class" />);
        const errorElement = screen.getByText('Error message');
        expect(errorElement).toHaveClass('text-red-600', 'text-sm', 'dark:text-red-400', 'custom-class');
    });

    it('passes through additional HTML attributes', () => {
        render(<InputError message="Error message" id="error-1" data-testid="error-test" />);
        const errorElement = screen.getByText('Error message');
        expect(errorElement).toHaveAttribute('id', 'error-1');
        expect(errorElement).toHaveAttribute('data-testid', 'error-test');
    });

    it('handles long error messages correctly', () => {
        const longMessage = 'This is a very long error message that might wrap to multiple lines when displayed in the form validation feedback area';
        render(<InputError message={longMessage} />);
        expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('handles special characters in error message', () => {
        render(<InputError message={'Error with <special> & "characters"'} />);
        expect(screen.getByText('Error with <special> & "characters"')).toBeInTheDocument();
    });

    it('renders multiple InputError components on the same page', () => {
        render(
            <>
                <InputError message="First error" />
                <InputError message="Second error" />
            </>,
        );
        expect(screen.getByText('First error')).toBeInTheDocument();
        expect(screen.getByText('Second error')).toBeInTheDocument();
    });
});
