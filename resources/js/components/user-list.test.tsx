/**
 * Integration tests for UserList component with mocked HTTP client
 *
 * These tests demonstrate how components use the Effect-based HTTP client
 * and properly handle responses and error states.
 */

import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserList } from './user-list';

// Mock the HTTP client module
vi.mock('@/lib/http', () => ({
    HttpClient: {
        get: vi.fn(),
        post: vi.fn(),
    },
}));

import { HttpClient } from '@/lib/http';

describe('UserList Component Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Loading state', () => {
        it('displays loading state initially', async () => {
            // Setup mock to never resolve (simulating slow network)
            (HttpClient.get as ReturnType<typeof vi.fn>).mockImplementation(() => new Promise(() => {}));

            render(<UserList apiUrl="/api/users" />);

            expect(screen.getByTestId('user-list-loading')).toBeInTheDocument();
            expect(screen.getByTestId('user-list-loading')).toHaveTextContent('Loading...');
        });
    });

    describe('Success state', () => {
        it('displays users when HTTP request succeeds', async () => {
            const mockUsers = [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            ];

            (HttpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({
                _tag: 'Right',
                right: {
                    data: mockUsers,
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                },
            });

            render(<UserList apiUrl="/api/users" />);

            await waitFor(() => {
                expect(screen.getByTestId('user-list')).toBeInTheDocument();
            });

            expect(screen.getByTestId('user-list-items')).toBeInTheDocument();
            expect(screen.getByTestId('user-1')).toBeInTheDocument();
            expect(screen.getByTestId('user-2')).toBeInTheDocument();
            expect(screen.getByTestId('user-1-name')).toHaveTextContent('John Doe');
            expect(screen.getByTestId('user-1-email')).toHaveTextContent('john@example.com');
            expect(screen.getByTestId('user-2-name')).toHaveTextContent('Jane Smith');
            expect(screen.getByTestId('user-2-email')).toHaveTextContent('jane@example.com');
        });

        it('handles empty user list', async () => {
            (HttpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({
                _tag: 'Right',
                right: {
                    data: [],
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                },
            });

            render(<UserList apiUrl="/api/users" />);

            await waitFor(() => {
                expect(screen.getByTestId('user-list')).toBeInTheDocument();
            });

            expect(screen.getByTestId('user-list-items')).toBeInTheDocument();
            expect(screen.queryByTestId('user-1')).not.toBeInTheDocument();
        });

        it('fetches from custom API URL', async () => {
            const mockUsers = [{ id: 1, name: 'Test User', email: 'test@example.com' }];

            (HttpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({
                _tag: 'Right',
                right: {
                    data: mockUsers,
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                },
            });

            render(<UserList apiUrl="/api/custom-users" />);

            await waitFor(() => {
                expect(screen.getByTestId('user-list')).toBeInTheDocument();
            });

            expect(HttpClient.get).toHaveBeenCalledWith('/api/custom-users');
        });
    });

    describe('Error state', () => {
        it('displays error message on network error', async () => {
            (HttpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({
                _tag: 'Left',
                left: {
                    type: 'NETWORK_ERROR',
                    status: null,
                    message: 'Network connection failed',
                    url: '/api/users',
                    method: 'GET',
                },
            });

            render(<UserList apiUrl="/api/users" />);

            await waitFor(() => {
                expect(screen.getByTestId('user-list-error')).toBeInTheDocument();
            });

            expect(screen.getByTestId('error-message')).toHaveTextContent('Error: Network connection failed');
            expect(screen.queryByTestId('error-status')).not.toBeInTheDocument();
        });

        it('displays error message and status on 404 error', async () => {
            (HttpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({
                _tag: 'Left',
                left: {
                    type: 'CLIENT_ERROR',
                    status: 404,
                    message: 'Not Found',
                    data: { message: 'Users not found' },
                    url: '/api/users',
                    method: 'GET',
                },
            });

            render(<UserList apiUrl="/api/users" />);

            await waitFor(() => {
                expect(screen.getByTestId('user-list-error')).toBeInTheDocument();
            });

            expect(screen.getByTestId('error-message')).toHaveTextContent('Error: Not Found');
            expect(screen.getByTestId('error-status')).toHaveTextContent('Status: 404');
        });

        it('displays error message on 500 server error', async () => {
            (HttpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({
                _tag: 'Left',
                left: {
                    type: 'SERVER_ERROR',
                    status: 500,
                    message: 'Internal Server Error',
                    data: { error: 'Database connection failed' },
                    url: '/api/users',
                    method: 'GET',
                },
            });

            render(<UserList apiUrl="/api/users" />);

            await waitFor(() => {
                expect(screen.getByTestId('user-list-error')).toBeInTheDocument();
            });

            expect(screen.getByTestId('error-message')).toHaveTextContent('Error: Internal Server Error');
            expect(screen.getByTestId('error-status')).toHaveTextContent('Status: 500');
        });

        it('displays error message on timeout', async () => {
            (HttpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({
                _tag: 'Left',
                left: {
                    type: 'TIMEOUT',
                    status: null,
                    message: 'Request timed out',
                    url: '/api/users',
                    method: 'GET',
                },
            });

            render(<UserList apiUrl="/api/users" />);

            await waitFor(() => {
                expect(screen.getByTestId('user-list-error')).toBeInTheDocument();
            });

            expect(screen.getByTestId('error-message')).toHaveTextContent('Error: Request timed out');
        });

        it('displays error message on validation error', async () => {
            (HttpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({
                _tag: 'Left',
                left: {
                    type: 'VALIDATION_ERROR',
                    status: 422,
                    message: 'Validation failed',
                    data: { errors: { name: ['Name is required'] } },
                    url: '/api/users',
                    method: 'GET',
                },
            });

            render(<UserList apiUrl="/api/users" />);

            await waitFor(() => {
                expect(screen.getByTestId('user-list-error')).toBeInTheDocument();
            });

            expect(screen.getByTestId('error-message')).toHaveTextContent('Error: Validation failed');
        });
    });

    describe('HTTP client integration', () => {
        it('uses correct HTTP method (GET)', async () => {
            (HttpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({
                _tag: 'Right',
                right: {
                    data: [],
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                },
            });

            render(<UserList apiUrl="/api/users" />);

            await waitFor(() => {
                expect(screen.getByTestId('user-list')).toBeInTheDocument();
            });

            // Verify get was called (GET method)
            expect(HttpClient.get).toHaveBeenCalled();
        });

        it('processes HTTP response data correctly', async () => {
            const mockUsers = [
                { id: 1, name: 'Alice', email: 'alice@example.com' },
                { id: 2, name: 'Bob', email: 'bob@example.com' },
                { id: 3, name: 'Charlie', email: 'charlie@example.com' },
            ];

            (HttpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({
                _tag: 'Right',
                right: {
                    data: mockUsers,
                    status: 200,
                    statusText: 'OK',
                    headers: { 'content-type': 'application/json' },
                },
            });

            render(<UserList apiUrl="/api/users" />);

            await waitFor(() => {
                // There are 3 users, each with a li element and 2 span elements (name and email)
                // So we expect 3 li elements
                const items = screen.getAllByTestId(/^user-\d+$/);
                expect(items).toHaveLength(3);
            });
        });

        it('handles HTTP response with custom headers', async () => {
            const mockUsers = [{ id: 1, name: 'Test', email: 'test@example.com' }];

            (HttpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({
                _tag: 'Right',
                right: {
                    data: mockUsers,
                    status: 200,
                    statusText: 'OK',
                    headers: {
                        'x-total-count': '100',
                        'x-page': '1',
                    },
                },
            });

            render(<UserList apiUrl="/api/users?page=1" />);

            await waitFor(() => {
                expect(screen.getByTestId('user-list')).toBeInTheDocument();
            });
        });
    });
});
