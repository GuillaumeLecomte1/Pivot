/**
 * HTTP Service using Effect.ts with Either for error handling
 *
 * This module provides a type-safe HTTP client that wraps axios with Effect functions.
 * All requests return Either<Success, HttpError> for proper error handling.
 *
 * @example
 * import { HttpClient } from "./http";
 *
 * // GET request
 * const result = await HttpClient.get("/api/users");
 *
 * // POST request
 * const result = await HttpClient.post("/api/users", { name: "John" });
 */

import axios, { type AxiosResponse } from 'axios';

import * as Schema from 'effect/Schema';
import { fail, succeed } from './either';

// Re-export axios instance for custom requests
export { axios as axiosInstance };

// ============================================
// Types
// ============================================

/**
 * HTTP methods supported by the client
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * HTTP error types
 */
export type HttpErrorType = 'NETWORK_ERROR' | 'TIMEOUT' | 'CLIENT_ERROR' | 'SERVER_ERROR' | 'VALIDATION_ERROR' | 'UNKNOWN';

/**
 * HTTP error with typed information
 */
export interface HttpError {
    type: HttpErrorType;
    status: number | null;
    message: string;
    data?: unknown;
    url?: string;
    method?: HttpMethod;
}

/**
 * HTTP request configuration
 */
export interface HttpRequestConfig {
    url: string;
    method: HttpMethod;
    params?: Record<string, unknown>;
    data?: unknown;
    headers?: Record<string, string>;
    timeout?: number;
}

/**
 * HTTP response wrapper
 */
export interface HttpResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
}

/**
 * Result of an HTTP request with optional validation
 */
export interface HttpResult<T> {
    response?: HttpResponse<T>;
    error?: HttpError;
}

// ============================================
// Error Factory
// ============================================

/**
 * Type for generic axios-like error object
 */
interface AxiosErrorLike {
    code?: string;
    message?: string;
    response?: {
        status: number;
        statusText: string;
        data: unknown;
    };
    config?: {
        url?: string;
    };
}

/**
 * Convert an AxiosError to a typed HttpError
 */
function mapAxiosError(error: AxiosErrorLike, method?: HttpMethod): HttpError {
    const url = error.config?.url;

    if (error.code === 'ECONNABORTED') {
        return {
            type: 'TIMEOUT',
            status: null,
            message: 'Request timed out',
            url,
            method,
        };
    }

    if (error.code === 'ERR_NETWORK' || !error.response) {
        return {
            type: 'NETWORK_ERROR',
            status: null,
            message: error.message || 'Network error',
            url,
            method,
        };
    }

    const status = error.response.status;

    if (status >= 400 && status < 500) {
        return {
            type: 'CLIENT_ERROR',
            status,
            message: error.response.statusText || 'Client error',
            data: error.response.data,
            url,
            method,
        };
    }

    if (status >= 500) {
        return {
            type: 'SERVER_ERROR',
            status,
            message: error.response.statusText || 'Server error',
            data: error.response.data,
            url,
            method,
        };
    }

    return {
        type: 'UNKNOWN',
        status,
        message: error.message || 'Unknown error',
        data: error.response.data,
        url,
        method,
    };
}

// ============================================
// HTTP Client
// ============================================

/**
 * Check if an error is an Axios-like error object
 */
function isAxiosError(
    error: unknown,
): error is { code?: string; message?: string; response?: { status: number; statusText: string; data: unknown } } {
    return error !== null && typeof error === 'object' && 'message' in error;
}

/**
 * HTTP Client using Effect.ts Either for error handling
 *
 * Wraps axios requests and returns Either<HttpResponse<T>, HttpError>
 * where HttpResponse<T> is success (Right) and HttpError is failure (Left)
 *
 * Note: In our Either implementation (matching Effect), Either<A, E> means:
 * - A (first param) = Right/success value
 * - E (second param) = Left/error value
 */
export const HttpClient = {
    /**
     * Make a request with the given configuration
     */
    async request<T>(config: HttpRequestConfig): Promise<{ _tag: 'Right'; right: HttpResponse<T> } | { _tag: 'Left'; left: HttpError }> {
        try {
            const response: AxiosResponse<T> = await axios({
                url: config.url,
                method: config.method,
                params: config.params,
                data: config.data,
                headers: config.headers,
                timeout: config.timeout ?? 30000,
            });
            return succeed(mapResponse(response));
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                return fail(mapAxiosError(error, config.method));
            }
            return fail({
                type: 'UNKNOWN',
                status: null,
                message: error instanceof Error ? error.message : 'Unknown error',
                url: config.url,
                method: config.method,
            });
        }
    },

    /**
     * Make a GET request
     */
    async get<T>(
        url: string,
        config?: Partial<HttpRequestConfig>,
    ): Promise<{ _tag: 'Right'; right: HttpResponse<T> } | { _tag: 'Left'; left: HttpError }> {
        return HttpClient.request<T>({
            url,
            method: 'GET',
            ...config,
        });
    },

    /**
     * Make a POST request
     */
    async post<T>(
        url: string,
        data?: unknown,
        config?: Partial<HttpRequestConfig>,
    ): Promise<{ _tag: 'Right'; right: HttpResponse<T> } | { _tag: 'Left'; left: HttpError }> {
        return HttpClient.request<T>({
            url,
            method: 'POST',
            data,
            ...config,
        });
    },

    /**
     * Make a PUT request
     */
    async put<T>(
        url: string,
        data?: unknown,
        config?: Partial<HttpRequestConfig>,
    ): Promise<{ _tag: 'Right'; right: HttpResponse<T> } | { _tag: 'Left'; left: HttpError }> {
        return HttpClient.request<T>({
            url,
            method: 'PUT',
            data,
            ...config,
        });
    },

    /**
     * Make a DELETE request
     */
    async delete<T>(
        url: string,
        config?: Partial<HttpRequestConfig>,
    ): Promise<{ _tag: 'Right'; right: HttpResponse<T> } | { _tag: 'Left'; left: HttpError }> {
        return HttpClient.request<T>({
            url,
            method: 'DELETE',
            ...config,
        });
    },

    /**
     * Make a PATCH request
     */
    async patch<T>(
        url: string,
        data?: unknown,
        config?: Partial<HttpRequestConfig>,
    ): Promise<{ _tag: 'Right'; right: HttpResponse<T> } | { _tag: 'Left'; left: HttpError }> {
        return HttpClient.request<T>({
            url,
            method: 'PATCH',
            data,
            ...config,
        });
    },
};

// ============================================
// Response Mapping
// ============================================

/**
 * Map axios response to our HttpResponse type
 */
function mapResponse<T>(response: AxiosResponse<T>): HttpResponse<T> {
    const headers: Record<string, string> = {};
    Object.entries(response.headers).forEach(([key, value]) => {
        headers[key] = Array.isArray(value) ? value.join(', ') : String(value ?? '');
    });

    return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers,
    };
}

// ============================================
// Validated HTTP Client
// ============================================

/**
 * Validated HTTP Client - validates response against a schema
 *
 * Returns Either<ValidatedData, HttpError | ValidationError>
 */
export const ValidatedHttpClient = {
    /**
     * Make a validated GET request
     */
    async get<T>(
        url: string,
        schema: Schema.Schema<T>,
        config?: Partial<HttpRequestConfig>,
    ): Promise<{ _tag: 'Right'; right: T } | { _tag: 'Left'; left: string[] | HttpError }> {
        const result = await HttpClient.get<unknown>(url, config);

        if (result._tag === 'Left') {
            return fail(result.left);
        }

        const responseData = (result as { _tag: 'Right'; right: { data: unknown } }).right.data;
        const parseResult = Schema.decodeUnknownEither(schema)(responseData);

        if (parseResult._tag === 'Left') {
            return fail(['Response validation failed']);
        }

        return succeed(parseResult.right);
    },

    /**
     * Make a validated POST request
     */
    async post<T>(
        url: string,
        data: unknown,
        schema: Schema.Schema<T>,
        config?: Partial<HttpRequestConfig>,
    ): Promise<{ _tag: 'Right'; right: T } | { _tag: 'Left'; left: string[] | HttpError }> {
        const result = await HttpClient.post<unknown>(url, data, config);

        if (result._tag === 'Left') {
            return fail(result.left);
        }

        const responseData = (result as { _tag: 'Right'; right: { data: unknown } }).right.data;
        const parseResult = Schema.decodeUnknownEither(schema)(responseData);

        if (parseResult._tag === 'Left') {
            return fail(['Response validation failed']);
        }

        return succeed(parseResult.right);
    },

    /**
     * Make a validated PUT request
     */
    async put<T>(
        url: string,
        data: unknown,
        schema: Schema.Schema<T>,
        config?: Partial<HttpRequestConfig>,
    ): Promise<{ _tag: 'Right'; right: T } | { _tag: 'Left'; left: string[] | HttpError }> {
        const result = await HttpClient.put<unknown>(url, data, config);

        if (result._tag === 'Left') {
            return fail(result.left);
        }

        const responseData = (result as { _tag: 'Right'; right: { data: unknown } }).right.data;
        const parseResult = Schema.decodeUnknownEither(schema)(responseData);

        if (parseResult._tag === 'Left') {
            return fail(['Response validation failed']);
        }

        return succeed(parseResult.right);
    },

    /**
     * Make a validated DELETE request
     */
    async delete<T>(
        url: string,
        schema: Schema.Schema<T>,
        config?: Partial<HttpRequestConfig>,
    ): Promise<{ _tag: 'Right'; right: T } | { _tag: 'Left'; left: string[] | HttpError }> {
        const result = await HttpClient.delete<unknown>(url, config);

        if (result._tag === 'Left') {
            return fail(result.left);
        }

        const responseData = (result as { _tag: 'Right'; right: { data: unknown } }).right.data;
        const parseResult = Schema.decodeUnknownEither(schema)(responseData);

        if (parseResult._tag === 'Left') {
            return fail(['Response validation failed']);
        }

        return succeed(parseResult.right);
    },
};

// ============================================
// Type-safe API Client Factory
// ============================================

/**
 * Endpoint configuration for API client
 */
interface EndpointConfig {
    method: HttpMethod;
    path: string;
}

/**
 * Create a type-safe API client for specific endpoints
 *
 * @example
 * const api = createApiClient({
 *   baseURL: "/api",
 *   endpoints: {
 *     users: {
 *       list: { method: "GET", path: "/users" },
 *       get: { method: "GET", path: "/users/:id" },
 *       create: { method: "POST", path: "/users" },
 *     }
 *   }
 * });
 *
 * // Usage
 * const users = await api.users.list();
 * const user = await api.users.get({ id: 1 });
 */
export function createApiClient<TEndpoints extends Record<string, Record<string, EndpointConfig>>>(
    config: { baseURL: string; endpoints: TEndpoints },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
    const client: Record<
        string,
        Record<string, (...args: unknown[]) => Promise<{ _tag: 'Right'; right: HttpResponse<unknown> } | { _tag: 'Left'; left: HttpError }>>
    > = {};

    for (const [endpointName, endpointMethods] of Object.entries(config.endpoints)) {
        client[endpointName] = {};

        for (const [methodName, methodConfig] of Object.entries(endpointMethods)) {
            const fullPath = `${config.baseURL}${methodConfig.path}`;

            client[endpointName][methodName] = async (
                ...args: unknown[]
            ): Promise<{ _tag: 'Right'; right: HttpResponse<unknown> } | { _tag: 'Left'; left: HttpError }> => {
                let url = fullPath;
                let data: unknown;
                let params: Record<string, unknown> = {};

                // Handle path parameters
                if (args[0] && typeof args[0] === 'object') {
                    const pathParams = args[0] as Record<string, unknown>;
                    Object.entries(pathParams).forEach(([key, value]) => {
                        url = url.replace(`:${key}`, String(value));
                    });
                }

                // Handle data for POST/PUT
                if (methodConfig.method === 'POST' || methodConfig.method === 'PUT') {
                    data = args[0];
                }

                // Handle query params
                if (args[args.length - 1] && typeof args[args.length - 1] === 'object' && !Array.isArray(args[args.length - 1])) {
                    const lastArg = args[args.length - 1] as Record<string, unknown>;
                    if ('params' in lastArg) {
                        params = lastArg.params as Record<string, unknown>;
                    }
                }

                return HttpClient.request({
                    url,
                    method: methodConfig.method,
                    data,
                    params,
                });
            };
        }
    }

    return client;
}
