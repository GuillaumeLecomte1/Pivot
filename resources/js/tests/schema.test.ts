/**
 * Tests for Either-based validation functions and API response parsing in schema.ts
 *
 * Tests cover:
 * - validateEither: Validates data and returns Either<T, ValidationError>
 * - validateEitherDetailed: Returns Either with detailed ParseResult errors
 * - createEitherValidator: Creates a validator function from a schema
 * - validateAndTransform: Validates and transforms data
 * - validateAsync: Async validation
 * - parseApiResponse: Parses API response
 * - parsePaginatedResponse: Parses paginated response
 * - parseApiError: Parses API error
 * - safeParse: Safe parsing returning Either
 * - validateRequired: Validates required fields
 * - validateOptional: Validates optional fields
 */

import * as Schema from 'effect/Schema';
import { describe, expect, it } from 'vitest';
import { isLeft, isRight } from '../lib/either';
import {
    ApiErrorSchema,
    ApiResponseSchema,
    createEitherValidator,
    parseApiError,
    parseApiResponse,
    parsePaginatedResponse,
    safeParse,
    UserSchema,
    validateAndTransform,
    validateAsync,
    validateEither,
    validateEitherDetailed,
    validateOptional,
    validateRequired,
} from '../lib/schema';

describe('Either-based Validation', () => {
    describe('validateEither', () => {
        it('should return Right with validated data for valid input', () => {
            const schema = Schema.Struct({
                name: Schema.String,
                email: Schema.String,
            });

            const result = validateEither(schema, { name: 'John', email: 'john@example.com' });

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right).toEqual({ name: 'John', email: 'john@example.com' });
            }
        });

        it('should return Left with ValidationError for invalid input', () => {
            const schema = Schema.Struct({
                name: Schema.String,
                email: Schema.String,
            });

            const result = validateEither(schema, { name: 'John', email: 123 });

            expect(isLeft(result)).toBe(true);
            if (isLeft(result)) {
                expect(result.left.errors).toBeDefined();
                expect(result.left.errors.length).toBeGreaterThan(0);
                expect(result.left.message).toBeDefined();
            }
        });

        it('should return Left for missing required fields', () => {
            const schema = Schema.Struct({
                name: Schema.String,
                age: Schema.Number,
            });

            const result = validateEither(schema, { name: 'John' });

            expect(isLeft(result)).toBe(true);
            if (isLeft(result)) {
                expect(result.left.errors.some((e) => e.includes('missing'))).toBe(true);
            }
        });

        it('should return Left for wrong type', () => {
            const schema = Schema.Struct({
                name: Schema.String,
            });

            const result = validateEither(schema, { name: 123 });

            expect(isLeft(result)).toBe(true);
            if (isLeft(result)) {
                expect(result.left.errors.some((e) => e.includes('type mismatch'))).toBe(true);
            }
        });

        it('should validate nested structures correctly', () => {
            const schema = Schema.Struct({
                user: Schema.Struct({
                    name: Schema.String,
                    email: Schema.String,
                }),
            });

            const validResult = validateEither(schema, { user: { name: 'John', email: 'john@example.com' } });
            expect(isRight(validResult)).toBe(true);

            const invalidResult = validateEither(schema, { user: { name: 'John', email: 123 } });
            expect(isLeft(invalidResult)).toBe(true);
        });

        it('should validate arrays correctly', () => {
            const schema = Schema.Struct({
                tags: Schema.Array(Schema.String),
            });

            const validResult = validateEither(schema, { tags: ['a', 'b', 'c'] });
            expect(isRight(validResult)).toBe(true);

            const invalidResult = validateEither(schema, { tags: ['a', 123, 'c'] });
            expect(isLeft(invalidResult)).toBe(true);
        });
    });

    describe('validateEitherDetailed', () => {
        it('should return Right with validated data for valid input', () => {
            const schema = Schema.Struct({
                name: Schema.String,
            });

            const result = validateEitherDetailed(schema, { name: 'John' });

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right).toEqual({ name: 'John' });
            }
        });

        it('should return Left with detailed error information', () => {
            const schema = Schema.Struct({
                name: Schema.String,
                age: Schema.Number,
            });

            const result = validateEitherDetailed(schema, { name: 'John', age: 'not a number' });

            expect(isLeft(result)).toBe(true);
            if (isLeft(result)) {
                expect(result.left.errors).toBeDefined();
                expect(result.left.issues).toBeDefined();
                expect(Array.isArray(result.left.issues)).toBe(true);
            }
        });

        it('should include ParseIssue in issues array', () => {
            const schema = Schema.Struct({
                count: Schema.Number,
            });

            const result = validateEitherDetailed(schema, { count: 'abc' });

            expect(isLeft(result)).toBe(true);
            if (isLeft(result)) {
                expect(result.left.issues.length).toBeGreaterThan(0);
            }
        });
    });

    describe('createEitherValidator', () => {
        it('should create a validator function', () => {
            const schema = Schema.Struct({
                email: Schema.String,
            });
            const validator = createEitherValidator(schema);

            const result = validator({ email: 'test@example.com' });
            expect(isRight(result)).toBe(true);
        });

        it('should return Left for invalid data', () => {
            const schema = Schema.Struct({
                email: Schema.String,
            });
            const validator = createEitherValidator(schema);

            const result = validator({ email: 123 });
            expect(isLeft(result)).toBe(true);
        });

        it('should be reusable with multiple calls', () => {
            const schema = Schema.Struct({
                name: Schema.String,
            });
            const validator = createEitherValidator(schema);

            const result1 = validator({ name: 'Alice' });
            const result2 = validator({ name: 'Bob' });

            expect(isRight(result1)).toBe(true);
            expect(isRight(result2)).toBe(true);

            const result3 = validator({ name: 123 });
            expect(isLeft(result3)).toBe(true);
        });
    });

    describe('validateAndTransform', () => {
        it('should validate and transform valid data', () => {
            const schema = Schema.Struct({
                name: Schema.String,
            });

            const result = validateAndTransform(schema, { name: 'john' }, (validated) => validated.name.toUpperCase());

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right).toBe('JOHN');
            }
        });

        it('should return Left for invalid data without calling transform', () => {
            const schema = Schema.Struct({
                name: Schema.String,
            });

            let transformCalled = false;
            const result = validateAndTransform(schema, { name: 123 }, () => {
                transformCalled = true;
                return 'should not happen';
            });

            expect(isLeft(result)).toBe(true);
            expect(transformCalled).toBe(false);
        });

        it('should allow complex transformations', () => {
            const schema = Schema.Struct({
                firstName: Schema.String,
                lastName: Schema.String,
            });

            const result = validateAndTransform(schema, { firstName: 'John', lastName: 'Doe' }, (validated) => ({
                fullName: `${validated.firstName} ${validated.lastName}`,
                initials: `${validated.firstName[0]}${validated.lastName[0]}`,
            }));

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right.fullName).toBe('John Doe');
                expect(result.right.initials).toBe('JD');
            }
        });

        it('should transform to different type', () => {
            const schema = Schema.Struct({
                value: Schema.Number,
            });

            const result = validateAndTransform(schema, { value: 42 }, (v) => `Value is ${v.value}`);

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(typeof result.right).toBe('string');
                expect(result.right).toBe('Value is 42');
            }
        });
    });

    describe('validateAsync', () => {
        it('should return Promise of Either for valid data', async () => {
            const schema = Schema.Struct({
                name: Schema.String,
            });

            const result = await validateAsync(schema, { name: 'John' });

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right).toEqual({ name: 'John' });
            }
        });

        it('should return Promise of Left for invalid data', async () => {
            const schema = Schema.Struct({
                name: Schema.String,
            });

            const result = await validateAsync(schema, { name: 123 });

            expect(isLeft(result)).toBe(true);
        });

        it('should work with async/await', async () => {
            const schema = Schema.Struct({
                email: Schema.String,
            });

            const result = await validateAsync(schema, { email: 'test@example.com' });

            expect(isRight(result)).toBe(true);
        });

        it('should maintain validation errors in async context', async () => {
            const schema = Schema.Struct({
                age: Schema.Number,
            });

            const result = await validateAsync(schema, { age: 'not a number' });

            expect(isLeft(result)).toBe(true);
            if (isLeft(result)) {
                expect(result.left.errors.length).toBeGreaterThan(0);
            }
        });
    });
});

describe('API Response Parsing', () => {
    describe('parseApiResponse', () => {
        it('should parse valid API response', () => {
            const UserResponseSchema = ApiResponseSchema(UserSchema);

            const response = {
                data: {
                    id: 1,
                    name: 'John',
                    email: 'john@example.com',
                    created_at: '2024-01-01',
                    updated_at: '2024-01-01',
                },
                message: 'Success',
                success: true,
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = parseApiResponse(UserResponseSchema as any, response);

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                expect((result.right as any).data).toBeDefined();
            }
        });

        it('should return error for invalid response structure', () => {
            const UserResponseSchema = ApiResponseSchema(UserSchema);

            const response = {
                data: {
                    id: 'not a number',
                    name: 'John',
                    email: 'john@example.com',
                    // missing required fields
                },
            };

            const result = parseApiResponse(UserResponseSchema as any, response);

            expect(isLeft(result)).toBe(true);
        });

        it('should handle missing optional fields', () => {
            const UserResponseSchema = ApiResponseSchema(UserSchema);

            const response = {
                data: {
                    id: 1,
                    name: 'John',
                    email: 'john@example.com',
                    created_at: '2024-01-01',
                    updated_at: '2024-01-01',
                },
            };

            const result = parseApiResponse(UserResponseSchema as any, response);

            expect(isRight(result)).toBe(true);
        });
    });

    describe('parsePaginatedResponse', () => {
        // Define schema locally to avoid type inference issues
        const TestUserSchema = Schema.Struct({
            id: Schema.Number,
            name: Schema.String,
            email: Schema.String,
            avatar: Schema.optional(Schema.String),
            email_verified_at: Schema.optional(Schema.String),
            created_at: Schema.String,
            updated_at: Schema.String,
        });

        it('should parse valid paginated response', () => {
            const response = {
                data: [
                    { id: 1, name: 'User 1', email: 'user1@example.com', created_at: '2024-01-01', updated_at: '2024-01-01' },
                    { id: 2, name: 'User 2', email: 'user2@example.com', created_at: '2024-01-01', updated_at: '2024-01-01' },
                ],
                meta: {
                    current_page: 1,
                    last_page: 5,
                    per_page: 10,
                    total: 50,
                },
            };

            const result = parsePaginatedResponse(TestUserSchema as any, response);

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right.data.length).toBe(2);
                expect(result.right.meta.current_page).toBe(1);
                expect(result.right.meta.last_page).toBe(5);
            }
        });

        it('should return error for invalid paginated structure', () => {
            const response = {
                data: 'not an array',
                meta: {
                    current_page: 1,
                    last_page: 5,
                },
            };

            const result = parsePaginatedResponse(TestUserSchema as any, response);

            expect(isLeft(result)).toBe(true);
        });

        it('should return error for missing meta fields', () => {
            const response = {
                data: [],
            };

            const result = parsePaginatedResponse(TestUserSchema as any, response);

            expect(isLeft(result)).toBe(true);
        });

        it('should validate each item in data array', () => {
            const response = {
                data: [
                    { id: 1, name: 'User 1', email: 'user1@example.com', created_at: '2024-01-01', updated_at: '2024-01-01' },
                    { id: 'invalid', name: 'User 2', email: 'user2@example.com', created_at: '2024-01-01', updated_at: '2024-01-01' },
                ],
                meta: {
                    current_page: 1,
                    last_page: 1,
                    per_page: 10,
                    total: 2,
                },
            };

            const result = parsePaginatedResponse(TestUserSchema as any, response);

            expect(isLeft(result)).toBe(true);
        });

        it('should handle empty data array', () => {
            const response = {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                    per_page: 10,
                    total: 0,
                },
            };

            const result = parsePaginatedResponse(TestUserSchema as any, response);

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right.data.length).toBe(0);
            }
        });
    });

    describe('parseApiError', () => {
        it('should parse valid error response', () => {
            const errorResponse = {
                message: 'Validation failed',
                errors: {
                    email: ['Email is required'],
                    name: ['Name is required'],
                },
                code: 'VALIDATION_ERROR',
            };

            const result = parseApiError(errorResponse);

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right.message).toBe('Validation failed');
                expect(result.right.errors).toBeDefined();
                expect(result.right.code).toBe('VALIDATION_ERROR');
            }
        });

        it('should parse error response without errors field', () => {
            const errorResponse = {
                message: 'Not found',
            };

            const result = parseApiError(errorResponse);

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right.message).toBe('Not found');
                expect(result.right.errors).toBeUndefined();
            }
        });

        it('should return Left for invalid error structure', () => {
            const errorResponse = {
                invalid: 'structure',
            };

            const result = parseApiError(errorResponse);

            expect(isLeft(result)).toBe(true);
        });

        it('should return Left for missing message', () => {
            const errorResponse = {
                errors: {
                    field: ['error'],
                },
            };

            const result = parseApiError(errorResponse);

            expect(isLeft(result)).toBe(true);
        });

        it('should handle optional code field', () => {
            const errorResponse = {
                message: 'Error without code',
            };

            const result = parseApiError(errorResponse);

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right.code).toBeUndefined();
            }
        });
    });
});

describe('Additional Validation Functions', () => {
    describe('safeParse', () => {
        it('should return Right with parsed value for valid data', () => {
            const schema = Schema.Struct({
                name: Schema.String,
            });

            const result = safeParse(schema, { name: 'John' });

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right).toEqual({ name: 'John' });
            }
        });

        it('should return Right with null for invalid data', () => {
            const schema = Schema.Struct({
                name: Schema.String,
            });

            const result = safeParse(schema, { name: 123 });

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right).toBeNull();
            }
        });

        it('should return Right with null for non-object input', () => {
            const schema = Schema.Struct({
                name: Schema.String,
            });

            const result = safeParse(schema, 'not an object');

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right).toBeNull();
            }
        });
    });

    describe('validateRequired', () => {
        it('should return Right for non-null defined value', () => {
            const schema = Schema.String;
            const result = validateRequired('name', 'John', schema);

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right).toBe('John');
            }
        });

        it('should return Left for null value', () => {
            const schema = Schema.String;
            const result = validateRequired('name', null, schema);

            expect(isLeft(result)).toBe(true);
            if (isLeft(result)) {
                expect(result.left.errors).toContain('name is required');
            }
        });

        it('should return Left for undefined value', () => {
            const schema = Schema.String;
            const result = validateRequired('name', undefined, schema);

            expect(isLeft(result)).toBe(true);
            if (isLeft(result)) {
                expect(result.left.errors).toContain('name is required');
            }
        });

        it('should validate the value against schema', () => {
            const schema = Schema.String;
            const result = validateRequired('name', 123, schema);

            expect(isLeft(result)).toBe(true);
        });
    });

    describe('validateOptional', () => {
        it('should return Right with undefined for null value', () => {
            const schema = Schema.String.pipe(Schema.minLength(3));
            const result = validateOptional('nickname', null, schema);

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right).toBeUndefined();
            }
        });

        it('should return Right with undefined for undefined value', () => {
            const schema = Schema.String;
            const result = validateOptional('nickname', undefined, schema);

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right).toBeUndefined();
            }
        });

        it('should return Right for valid optional value', () => {
            const schema = Schema.String.pipe(Schema.minLength(3));
            const result = validateOptional('nickname', 'John', schema);

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right).toBe('John');
            }
        });

        it('should return Left for invalid optional value', () => {
            const schema = Schema.String.pipe(Schema.minLength(3));
            const result = validateOptional('nickname', 'Jo', schema);

            expect(isLeft(result)).toBe(true);
            if (isLeft(result)) {
                expect(result.left.message).toContain('nickname');
            }
        });
    });
});

describe('Predefined Schemas', () => {
    describe('UserSchema', () => {
        it('should validate valid user data', () => {
            // Use undefined for optional fields, not null
            const user = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                created_at: '2024-01-01',
                updated_at: '2024-01-01',
            };

            const result = validateEither(UserSchema, user);
            expect(isRight(result)).toBe(true);
        });

        it('should reject invalid user data', () => {
            const user = {
                id: 'not a number',
                name: 'John Doe',
                email: 'john@example.com',
            };

            const result = validateEither(UserSchema, user);
            expect(isLeft(result)).toBe(true);
        });
    });

    describe('ApiErrorSchema', () => {
        it('should validate valid error schema', () => {
            const error = {
                message: 'Error occurred',
                code: 'ERROR_CODE',
            };

            const result = validateEither(ApiErrorSchema, error);
            expect(isRight(result)).toBe(true);
        });

        it('should reject missing message', () => {
            const error = {
                code: 'ERROR_CODE',
            };

            const result = validateEither(ApiErrorSchema, error);
            expect(isLeft(result)).toBe(true);
        });
    });
});
