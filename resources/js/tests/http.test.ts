/**
 * Unit tests for HTTP Service using Effect.ts
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock axios - use a simpler approach
vi.mock('axios', () => ({
    default: vi.fn(),
}));

import axios from 'axios';

import { HttpClient } from '../lib/http';

describe('HttpClient', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('GET request', () => {
        it('should return Right with HttpResponse on successful GET request', async () => {
            const mockResponse = {
                data: { id: 1, name: 'Test' },
                status: 200,
                statusText: 'OK',
                headers: { 'content-type': 'application/json' },
            };

            (axios as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

            const result = await HttpClient.get('/api/users');

            expect(result._tag).toBe('Right');
            if (result._tag === 'Right') {
                expect(result.right.status).toBe(200);
                expect(result.right.data).toEqual({ id: 1, name: 'Test' });
            }
        });

        it('should return Left with HttpError on failed GET request', async () => {
            (axios as unknown as ReturnType<typeof vi.fn>).mockRejectedValue({
                code: 'ERR_NETWORK',
                message: 'Network Error',
                response: undefined,
            });

            const result = await HttpClient.get('/api/users');

            expect(result._tag).toBe('Left');
            if (result._tag === 'Left') {
                expect(result.left.type).toBe('NETWORK_ERROR');
                expect(result.left.message).toBe('Network Error');
            }
        });

        it('should return Left with CLIENT_ERROR on 404 response', async () => {
            (axios as unknown as ReturnType<typeof vi.fn>).mockRejectedValue({
                code: 'ERR_BAD_REQUEST',
                message: 'Not Found',
                response: {
                    status: 404,
                    statusText: 'Not Found',
                    data: { message: 'User not found' },
                },
            });

            const result = await HttpClient.get('/api/users/999');

            expect(result._tag).toBe('Left');
            if (result._tag === 'Left') {
                expect(result.left.type).toBe('CLIENT_ERROR');
                expect(result.left.status).toBe(404);
            }
        });

        it('should return Left with SERVER_ERROR on 500 response', async () => {
            (axios as unknown as ReturnType<typeof vi.fn>).mockRejectedValue({
                code: 'ERR_INTERNAL',
                message: 'Internal Server Error',
                response: {
                    status: 500,
                    statusText: 'Internal Server Error',
                    data: { error: 'Something went wrong' },
                },
            });

            const result = await HttpClient.get('/api/users');

            expect(result._tag).toBe('Left');
            if (result._tag === 'Left') {
                expect(result.left.type).toBe('SERVER_ERROR');
                expect(result.left.status).toBe(500);
            }
        });

        it('should return Left with TIMEOUT on timeout', async () => {
            (axios as unknown as ReturnType<typeof vi.fn>).mockRejectedValue({
                code: 'ECONNABORTED',
                message: 'timeout',
                config: { url: '/api/users' },
            });

            const result = await HttpClient.get('/api/users');

            expect(result._tag).toBe('Left');
            if (result._tag === 'Left') {
                expect(result.left.type).toBe('TIMEOUT');
            }
        });
    });

    describe('POST request', () => {
        it('should return Right with HttpResponse on successful POST request', async () => {
            const mockResponse = {
                data: { id: 1, name: 'Test', created: true },
                status: 201,
                statusText: 'Created',
                headers: { 'content-type': 'application/json' },
            };

            (axios as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

            const result = await HttpClient.post('/api/users', { name: 'Test' });

            expect(result._tag).toBe('Right');
            if (result._tag === 'Right') {
                expect(result.right.status).toBe(201);
                expect(result.right.data).toEqual({ id: 1, name: 'Test', created: true });
            }
        });
    });

    describe('PUT request', () => {
        it('should return Right with HttpResponse on successful PUT request', async () => {
            const mockResponse = {
                data: { id: 1, name: 'Updated' },
                status: 200,
                statusText: 'OK',
                headers: { 'content-type': 'application/json' },
            };

            (axios as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

            const result = await HttpClient.put('/api/users/1', { name: 'Updated' });

            expect(result._tag).toBe('Right');
            if (result._tag === 'Right') {
                expect(result.right.status).toBe(200);
            }
        });
    });

    describe('DELETE request', () => {
        it('should return Right with HttpResponse on successful DELETE request', async () => {
            const mockResponse = {
                data: { deleted: true },
                status: 200,
                statusText: 'OK',
                headers: {},
            };

            (axios as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

            const result = await HttpClient.delete('/api/users/1');

            expect(result._tag).toBe('Right');
            if (result._tag === 'Right') {
                expect(result.right.status).toBe(200);
            }
        });
    });
});

describe('HttpClient with config options', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should pass custom headers and timeout', async () => {
        const mockResponse = {
            data: { id: 1 },
            status: 200,
            statusText: 'OK',
            headers: {},
        };

        (axios as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

        await HttpClient.get('/api/users', {
            headers: { Authorization: 'Bearer token' },
            timeout: 5000,
        });

        // Check axios was called with the right config
        const axiosCall = (axios as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
        expect(axiosCall[0]).toMatchObject({
            headers: { Authorization: 'Bearer token' },
            timeout: 5000,
        });
    });

    it('should pass query params', async () => {
        const mockResponse = {
            data: [],
            status: 200,
            statusText: 'OK',
            headers: {},
        };

        (axios as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

        await HttpClient.get('/api/users', {
            params: { page: 1, limit: 10 },
        });

        const axiosCall = (axios as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
        expect(axiosCall[0]).toMatchObject({
            params: { page: 1, limit: 10 },
        });
    });
});

describe('HttpError types', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should create NETWORK_ERROR type', async () => {
        (axios as unknown as ReturnType<typeof vi.fn>).mockRejectedValue({
            code: 'ERR_NETWORK',
            message: 'Network error',
            response: undefined,
        });

        const result = await HttpClient.get('/api/test');

        expect(result._tag).toBe('Left');
        if (result._tag === 'Left') {
            expect(result.left.type).toBe('NETWORK_ERROR');
            expect(result.left.status).toBeNull();
        }
    });

    it('should create CLIENT_ERROR type with 400 status', async () => {
        (axios as unknown as ReturnType<typeof vi.fn>).mockRejectedValue({
            message: 'Bad Request',
            response: { status: 400, statusText: 'Bad Request', data: {} },
        });

        const result = await HttpClient.get('/api/test');

        expect(result._tag).toBe('Left');
        if (result._tag === 'Left') {
            expect(result.left.type).toBe('CLIENT_ERROR');
            expect(result.left.status).toBe(400);
        }
    });

    it('should create CLIENT_ERROR type with 422 status', async () => {
        (axios as unknown as ReturnType<typeof vi.fn>).mockRejectedValue({
            message: 'Validation Error',
            response: { status: 422, statusText: 'Unprocessable Entity', data: {} },
        });

        const result = await HttpClient.get('/api/test');

        expect(result._tag).toBe('Left');
        if (result._tag === 'Left') {
            expect(result.left.type).toBe('CLIENT_ERROR');
            expect(result.left.status).toBe(422);
        }
    });

    it('should create SERVER_ERROR type with 500 status', async () => {
        (axios as unknown as ReturnType<typeof vi.fn>).mockRejectedValue({
            message: 'Server Error',
            response: { status: 500, statusText: 'Internal Server Error', data: {} },
        });

        const result = await HttpClient.get('/api/test');

        expect(result._tag).toBe('Left');
        if (result._tag === 'Left') {
            expect(result.left.type).toBe('SERVER_ERROR');
            expect(result.left.status).toBe(500);
        }
    });
});
