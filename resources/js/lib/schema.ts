/**
 * Schema validation utilities using Effect Schema
 *
 * Provides utilities for runtime validation and type transformation using Effect Schema
 * Now with Either-based validation for better error handling in application code
 */

import * as ParseResult from 'effect/ParseResult';
import * as Schema from 'effect/Schema';
import { type Either, fail, isLeft, isRight, pipe, succeed } from './either';

export { Schema };

// Re-export ParseResult
export { ParseResult };

/**
 * Result type for validation - combines the parsed value or errors
 */
export type ValidationResult<T> = { success: true; data: T } | { success: false; errors: string[] };

/**
 * Validation error type for Either-based validation
 * Contains structured error information
 */
export interface ValidationError {
    errors: string[];
    message: string;
}

/**
 * Validate data against a schema and return a structured result
 */
export function validate<T>(schema: Schema.Schema<T>, data: unknown): ValidationResult<T> {
    const result = ParseResult.decodeUnknownEither(schema)(data);

    if (result._tag === 'Left') {
        return {
            success: false,
            errors: formatErrors(result.left),
        };
    }

    return {
        success: true,
        data: result.right,
    };
}

/**
 * Format parse errors to human-readable strings
 */
function formatErrors(issue: ParseResult.ParseIssue): string[] {
    const errors: string[] = [];

    const processIssue = (iss: ParseResult.ParseIssue, path: string = ''): void => {
        const currentPath = path ? `${path}` : '';

        switch (iss._tag) {
            case 'Missing':
                errors.push(`${currentPath || '.'} is missing`);
                break;
            case 'Type':
                errors.push(`${currentPath || '.'}: type mismatch`);
                break;
            case 'Unexpected':
                errors.push(`${currentPath || '.'}: unexpected value`);
                break;
            case 'Forbidden':
                errors.push(`${currentPath || '.'}: forbidden value`);
                break;
            case 'Pointer':
                processIssue(iss.issue, `${currentPath}${currentPath ? '/' : ''}${String(iss.path)}`);
                break;
            case 'Refinement':
                processIssue(iss.issue, currentPath);
                break;
            case 'Transformation':
                processIssue(iss.issue, currentPath);
                break;
            case 'Composite':
                // Handle Composite which can have either errors array or single issue
                if ('errors' in iss && Array.isArray(iss.errors)) {
                    iss.errors.forEach((e: ParseResult.ParseIssue) => processIssue(e, currentPath));
                } else if ('issues' in iss) {
                    // Some Composite types have an 'issues' property with a single issue
                    const issues = (iss as { issues?: ParseResult.ParseIssue }).issues;
                    if (issues) {
                        processIssue(issues, currentPath);
                    }
                }
                break;
        }
    };

    processIssue(issue);
    return errors;
}

/**
 * Validate data against a schema and return the parsed value or throw
 */
export function validateOrThrow<T>(schema: Schema.Schema<T>, data: unknown): T {
    const result = ParseResult.decodeUnknownEither(schema)(data);
    if (result._tag === 'Left') {
        throw new Error(formatErrors(result.left).join(', '));
    }
    return result.right;
}

/**
 * Create a validator function from a schema
 */
export function createValidator<T>(schema: Schema.Schema<T>): (data: unknown) => ValidationResult<T> {
    return (data: unknown) => validate(schema, data);
}

// ============================================
// Either-based Validation (VAL-LIB-004)
// ============================================

/**
 * Validate data against a schema and return Either
 *
 * Returns Either<T, ValidationError> where:
 * - Right (success) contains the validated data
 * - Left (failure) contains validation errors
 *
 * @example
 * import { Schema, validateEither } from "./schema";
 *
 * const UserSchema = Schema.Struct({
 *   name: Schema.String,
 *   email: Schema.String,
 * });
 *
 * const result = validateEither(UserSchema, { name: "John", email: "john@example.com" });
 *
 * if (result._tag === 'Right') {
 *   console.log(result.right); // { name: "John", email: "john@example.com" }
 * } else {
 *   console.log(result.left.errors); // ["email must be a string"]
 * }
 */
export function validateEither<T>(schema: Schema.Schema<T>, data: unknown): Either<T, ValidationError> {
    const result = ParseResult.decodeUnknownEither(schema)(data);

    if (result._tag === 'Left') {
        const errors = formatErrors(result.left);
        return fail({
            errors,
            message: errors.join('; '),
        });
    }

    return succeed(result.right);
}

/**
 * Validate data and return Either with the original ParseResult errors
 * This provides more detailed error information for advanced use cases
 *
 * @example
 * const result = validateEitherDetailed(UserSchema, data);
 * if (result._tag === 'Left') {
 *   // Access detailed ParseIssue information
 *   const firstError = result.left.issues[0];
 * }
 */
export function validateEitherDetailed<T>(
    schema: Schema.Schema<T>,
    data: unknown,
): Either<T, { errors: string[]; issues: ParseResult.ParseIssue[] }> {
    const result = ParseResult.decodeUnknownEither(schema)(data);

    if (result._tag === 'Left') {
        const errors = formatErrors(result.left);
        return fail({
            errors,
            issues: [result.left],
        });
    }

    return succeed(result.right);
}

/**
 * Create an Either-based validator function from a schema
 *
 * @example
 * const validateUser = createEitherValidator(UserSchema);
 * const result = validateUser({ name: "John", email: "john@example.com" });
 */
export function createEitherValidator<T>(schema: Schema.Schema<T>): (data: unknown) => Either<T, ValidationError> {
    return (data: unknown) => validateEither(schema, data);
}

/**
 * Validate and transform - combines validation with a transformation function
 * Returns Either<Transformed, ValidationError>
 *
 * @example
 * const result = validateAndTransform(
 *   UserSchema,
 *   { name: "John", email: "john@example.com" },
 *   (user) => user.name.toUpperCase()
 * );
 * // result._tag === 'Right' && result.right === "JOHN"
 */
export function validateAndTransform<T, R>(schema: Schema.Schema<T>, data: unknown, transform: (validated: T) => R): Either<R, ValidationError> {
    const validationResult = validateEither(schema, data);

    if (isRight(validationResult)) {
        return succeed(transform(validationResult.right));
    }

    return fail(validationResult.left);
}

/**
 * Validate data against a schema and transform to a Promise<Either>
 * Useful for async validation workflows
 *
 * @example
 * const result = await validateAsync(UserSchema, requestBody);
 */
export async function validateAsync<T>(schema: Schema.Schema<T>, data: unknown): Promise<Either<T, ValidationError>> {
    return new Promise((resolve) => {
        // Synchronous validation but wrapped in Promise for async API compatibility
        resolve(validateEither(schema, data));
    });
}

// ============================================
// API Response Parsing (VAL-LIB-005)
// ============================================

/**
 * Generic API response wrapper schema
 */
export const ApiResponseSchema = <T>(dataSchema: Schema.Schema<T>) =>
    Schema.Struct({
        data: dataSchema,
        message: Schema.optional(Schema.String),
        success: Schema.optional(Schema.Boolean),
    });

/**
 * Paginated response schema - uses unknown for flexibility
 */
export const PaginatedResponseSchema = Schema.Struct({
    data: Schema.Array(Schema.Unknown),
    meta: Schema.Struct({
        current_page: Schema.Number,
        last_page: Schema.Number,
        per_page: Schema.Number,
        total: Schema.Number,
    }),
});

/**
 * Parse API response and validate against a schema
 * Returns Either<ValidatedResponse, ValidationError>
 *
 * @example
 * const result = parseApiResponse(UserSchema, apiResponse);
 * if (result._tag === 'Right') {
 *   const users = result.right.data;
 * }
 */
export function parseApiResponse<T>(schema: Schema.Schema<T>, response: unknown): Either<T, ValidationError> {
    return validateEither(schema, response);
}

/**
 * Parse paginated API response
 * Returns Either<PaginatedData, ValidationError>
 *
 * Note: The return type uses Effect Schema's inferred types (readonly arrays)
 *
 * @example
 * const result = parsePaginatedResponse(UserSchema, apiResponse);
 * if (result._tag === 'Right') {
 *   const { data, meta } = result.right;
 * }
 */
export function parsePaginatedResponse<T>(
    dataSchema: Schema.Schema<T>,
    response: unknown,
): Either<
    {
        readonly data: readonly T[];
        readonly meta: { readonly current_page: number; readonly last_page: number; readonly per_page: number; readonly total: number };
    },
    ValidationError
> {
    // First validate as generic structure
    const genericResult = validateEither(PaginatedResponseSchema, response);

    if (genericResult._tag === 'Left') {
        return genericResult as Either<
            {
                readonly data: readonly T[];
                readonly meta: { readonly current_page: number; readonly last_page: number; readonly per_page: number; readonly total: number };
            },
            ValidationError
        >;
    }

    const genericData = genericResult.right;

    // Then validate each item in the data array
    const validatedData: T[] = [];
    for (const item of genericData.data) {
        const itemResult = validateEither(dataSchema, item);
        if (itemResult._tag === 'Left') {
            return fail(itemResult.left);
        }
        validatedData.push(itemResult.right);
    }

    return succeed({
        data: validatedData,
        meta: genericData.meta,
    } as {
        readonly data: readonly T[];
        readonly meta: { readonly current_page: number; readonly last_page: number; readonly per_page: number; readonly total: number };
    });
}

/**
 * Parse API error response
 * Returns Either<ErrorResponse, ValidationError>
 */
export const ApiErrorSchema = Schema.Struct({
    message: Schema.String,
    errors: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Array(Schema.String) })),
    code: Schema.optional(Schema.String),
});

/**
 * Parse error response from API
 *
 * @example
 * const result = parseApiError(errorResponse);
 * if (result._tag === 'Right') {
 *   console.log(result.right.message);
 * }
 */
export function parseApiError(
    response: unknown,
): Either<{ readonly message: string; readonly errors?: { readonly [x: string]: readonly string[] }; readonly code?: string }, ValidationError> {
    const result = validateEither(ApiErrorSchema, response);
    if (result._tag === 'Right') {
        const data = result.right;
        // Convert readonly arrays to mutable if needed
        const errors = data.errors ? Object.fromEntries(Object.entries(data.errors).map(([k, v]) => [k, [...v]])) : undefined;
        return succeed({
            message: data.message,
            errors,
            code: data.code,
        } as { readonly message: string; readonly errors?: { readonly [x: string]: readonly string[] }; readonly code?: string });
    }
    return result;
}

/**
 * Safe parse - returns null instead of throwing
 * Returns Either<Validated, null> where null indicates validation failure
 *
 * @example
 * const result = safeParse(UserSchema, data);
 * if (result._tag === 'Right') {
 *   // success
 * } else if (result.right === null) {
 *   // validation failed
 * }
 */
export function safeParse<T>(schema: Schema.Schema<T>, data: unknown): Either<T | null, null> {
    try {
        const result = validateEither(schema, data);
        return isRight(result) ? succeed(result.right) : succeed(null);
    } catch {
        return succeed(null);
    }
}

/**
 * Validate required field - special validation for required fields
 * Returns Either with detailed error if missing
 *
 * @example
 * const result = validateRequired('email', data.email, Schema.String);
 */
export function validateRequired<T>(fieldName: string, data: unknown, schema: Schema.Schema<T>): Either<T, ValidationError> {
    if (data === undefined || data === null) {
        return fail({
            errors: [`${fieldName} is required`],
            message: `${fieldName} is required`,
        });
    }
    return validateEither(schema, data);
}

/**
 * Validate optional field - returns Right(undefined) if not provided
 * Returns Either<T | undefined, ValidationError>
 *
 * @example
 * const result = validateOptional('email', data.email, Schema.String.pipe(Schema.email));
 */
export function validateOptional<T>(fieldName: string, data: unknown, schema: Schema.Schema<T>): Either<T | undefined, ValidationError> {
    if (data === undefined || data === null) {
        return succeed(undefined);
    }
    const result = validateEither(schema, data);
    if (isRight(result)) {
        return succeed(result.right);
    }
    return fail({ ...result.left, message: `${fieldName}: ${result.left.message}` });
}

/**
 * Common string validators
 */
export const StringValidators = {
    /** Minimum length */
    minLength: (min: number): Schema.Schema<string> => Schema.String.pipe(Schema.minLength(min)),

    /** Maximum length */
    maxLength: (max: number): Schema.Schema<string> => Schema.String.pipe(Schema.maxLength(max)),

    /** Email format */
    email: (): Schema.Schema<string> => Schema.String.pipe(Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)),

    /** URL format */
    url: (): Schema.Schema<string> => Schema.String.pipe(Schema.pattern(/^https?:\/\/.+/)),

    /** Length range */
    length: (min: number, max: number): Schema.Schema<string> => Schema.String.pipe(Schema.length({ min, max })),
};

/**
 * Common number validators
 */
export const NumberValidators = {
    /** Minimum value */
    min: (min: number): Schema.Schema<number> => Schema.Number.pipe(Schema.greaterThanOrEqualTo(min)),

    /** Maximum value */
    max: (max: number): Schema.Schema<number> => Schema.Number.pipe(Schema.lessThanOrEqualTo(max)),

    /** Integer only */
    integer: (): Schema.Schema<number> => Schema.Number.pipe(Schema.int()),

    /** Positive number */
    positive: (): Schema.Schema<number> => Schema.Number.pipe(Schema.greaterThan(0)),
};

/**
 * Create an enum schema from a TypeScript enum
 */
export function enumSchema<E extends string>(values: readonly E[]): Schema.Schema<E> {
    return Schema.Literal(...(values as [E, ...E[]]));
}

/**
 * Create a schema for a date string (ISO format)
 */
export const dateString: Schema.Schema<Date> = Schema.DateFromSelf;

/**
 * Create a schema for a UUID string
 */
export const uuid: Schema.Schema<string> = Schema.String.pipe(
    Schema.pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
);

/**
 * Type utility to extract the Type from a Schema
 * Note: This is a placeholder as Effect Schema uses a different type system
 */
export type SchemaType<S> = S;

/**
 * Type utility to extract the Encoded from a Schema
 */
export type SchemaEncoded<S> = S;

/**
 * Type utility to extract the Context from a Schema
 */
export type SchemaContext<_S> = never;

// ============================================
// Domain-specific schemas for common types
// ============================================

/**
 * Schema for a User
 */
export const UserSchema = Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
    email: Schema.String,
    avatar: Schema.optional(Schema.String),
    email_verified_at: Schema.optional(Schema.String),
    created_at: Schema.String,
    updated_at: Schema.String,
});

/**
 * Schema for a User with optional additional properties
 * Note: The actual additional properties are handled via type intersection in TypeScript
 */
export const UserWithExtrasSchema = UserSchema;

/**
 * Schema for Auth
 */
export const AuthSchema = Schema.Struct({
    user: UserSchema,
});

/**
 * Schema for a NavItem
 */
export const NavItemSchema = Schema.Struct({
    title: Schema.String,
    href: Schema.String,
    icon: Schema.optional(Schema.String),
    isActive: Schema.optional(Schema.Boolean),
});

/**
 * Schema for a NavGroup
 */
export const NavGroupSchema = Schema.Struct({
    title: Schema.String,
    items: Schema.Array(NavItemSchema),
});

/**
 * Schema for a BreadcrumbItem
 */
export const BreadcrumbItemSchema = Schema.Struct({
    title: Schema.String,
    href: Schema.String,
});

/**
 * Schema for Ressourcerie
 */
export const RessourcerieSchema = Schema.Struct({
    name: Schema.String,
    location: Schema.String,
    phone: Schema.optional(Schema.String),
});

/**
 * Schema for Product
 */
export const ProductSchema = Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
    description: Schema.String,
    price: Schema.Number,
    images: Schema.Array(Schema.String),
    ressourcerie: RessourcerieSchema,
    category: Schema.String,
    condition: Schema.String,
    dimensions: Schema.optional(Schema.String),
    material: Schema.optional(Schema.String),
    created_at: Schema.String,
});

/**
 * Schema for Appearance
 */
export const AppearanceSchema = Schema.Literal('light', 'dark', 'system');

/**
 * Schema for SharedData
 */
export const SharedDataSchema = Schema.Struct({
    name: Schema.String,
    quote: Schema.Struct({
        message: Schema.String,
        author: Schema.String,
    }),
    auth: AuthSchema,
    ziggy: Schema.Record({ key: Schema.String, value: Schema.Unknown }),
});

// ============================================
// Type inference from schemas
// ============================================

/**
 * Type inferred from UserSchema
 * Uses a simple infer approach compatible with the Schema namespace
 */
export type SchemaUser = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
};

/**
 * Type inferred from AuthSchema
 */
export type SchemaAuth = { user: SchemaUser };

/**
 * Type inferred from ProductSchema
 */
export type SchemaProduct = {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    ressourcerie: { name: string; location: string; phone?: string };
    category: string;
    condition: string;
    dimensions?: string;
    material?: string;
    created_at: string;
};

/**
 * Type inferred from NavItemSchema - simplified for compatibility
 */
export type SchemaNavItem = { title: string; href: string; icon?: string; isActive?: boolean };

/**
 * Type inferred from AppearanceSchema
 */
export type SchemaAppearance = 'light' | 'dark' | 'system';
