/**
 * Product Schema Validation using Effect Schema
 *
 * Provides schemas for validating product data with the following fields:
 * - name: 1-255 characters (required)
 * - description: optional string
 * - price: positive decimal (required)
 * - image_url: valid URL or empty string (required)
 * - category: enum of predefined values (required)
 * - condition: required string
 */

import * as ParseResult from 'effect/ParseResult';
import * as Schema from 'effect/Schema';
import { type Either, fail, isRight, succeed } from '../either';

// ============================================
// Category Enum
// ============================================

/**
 * Predefined product categories
 */
export const ProductCategories = ['Mobilier', 'Art de la table', 'Décoration'] as const;

export type ProductCategory = (typeof ProductCategories)[number];

/**
 * Schema for validating product category
 */
export const ProductCategorySchema: Schema.Schema<ProductCategory> = Schema.Literal(
    ...(ProductCategories as unknown as [ProductCategory, ...ProductCategory[]]),
);

// ============================================
// Condition Enum
// ============================================

/**
 * Predefined product conditions
 */
export const ProductConditions = ['Très bon état', 'Bon état', 'Excellent état'] as const;

export type ProductCondition = (typeof ProductConditions)[number];

// Note: Condition is kept as a free-form string to allow flexibility
// in how ressourceries describe their products
export const ProductConditionSchema: Schema.Schema<string> = Schema.String;

// ============================================
// Image URL
// ============================================

/**
 * Schema for validating image_url - accepts either empty string or valid URL
 */
export const ImageUrlSchema: Schema.Schema<string> = Schema.String.pipe(
    Schema.filter((url) => url === '' || /^https?:\/\/.+/.test(url), {
        message: () => 'image_url must be a valid URL or empty string',
    }),
);

// ============================================
// Product Input Schema (for creation/update)
// ============================================

/**
 * Schema for validating product input data (creation/update)
 *
 * Validates:
 * - name: string, 1-255 characters (required)
 * - description: optional string
 * - price: positive decimal (required)
 * - image_url: valid URL or empty string (required)
 * - category: enum of predefined categories (required)
 * - condition: string (required)
 */
export const ProductInputSchema = Schema.Struct({
    name: Schema.String.pipe(Schema.length({ min: 1, max: 255 })),
    description: Schema.optional(Schema.String),
    price: Schema.Number.pipe(Schema.greaterThan(0)),
    image_url: ImageUrlSchema,
    category: ProductCategorySchema,
    condition: Schema.String,
});

/**
 * Type for product input data
 */
export interface ProductInput {
    name: string;
    description?: string;
    price: number;
    image_url: string;
    category: ProductCategory;
    condition: string;
}

// ============================================
// Product Schema (full product with id and timestamps)
// ============================================

/**
 * Schema for validating full product data (from API)
 *
 * Extends ProductInput with:
 * - id: number
 * - ressourcerie: optional nested object
 * - dimensions: optional string
 * - material: optional string
 * - created_at: optional string (ISO date)
 */
export const ProductSchema = Schema.Struct({
    ...ProductInputSchema.fields,
    id: Schema.Number,
    ressourcerie: Schema.optional(
        Schema.Struct({
            name: Schema.String,
            location: Schema.String,
            phone: Schema.optional(Schema.String),
        }),
    ),
    dimensions: Schema.optional(Schema.String),
    material: Schema.optional(Schema.String),
    created_at: Schema.optional(Schema.String),
});

/**
 * Type for full product data
 */
export interface Product extends ProductInput {
    id: number;
    ressourcerie?: {
        name: string;
        location: string;
        phone?: string;
    };
    dimensions?: string;
    material?: string;
    created_at?: string;
}

// ============================================
// Validation Functions
// ============================================

/**
 * Validation error type for product validation
 */
export interface ProductValidationError {
    errors: string[];
    message: string;
}

/**
 * Validate product input data and return Either
 *
 * Returns Either<ProductInput, ProductValidationError> where:
 * - Right (success) contains the validated product data
 * - Left (failure) contains validation errors
 *
 * @example
 * const result = validateProduct({ name: 'Test', price: 10.50 });
 * if (result._tag === 'Right') {
 *   console.log(result.right); // validated product data
 * } else {
 *   console.log(result.left.errors); // validation errors
 * }
 */
export function validateProduct(data: unknown): Either<ProductInput, ProductValidationError> {
    const result = ParseResult.decodeUnknownEither(ProductInputSchema)(data);

    if (isRight(result)) {
        return succeed(result.right as ProductInput);
    }

    const errors: string[] = [];
    const processIssue = (issue: ParseResult.ParseIssue, path: string = ''): void => {
        const currentPath = path ? `${path}` : '';
        switch (issue._tag) {
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
                processIssue(issue.issue, `${currentPath}${currentPath ? '/' : ''}${String(issue.path)}`);
                break;
            case 'Refinement':
                processIssue(issue.issue, currentPath);
                break;
            case 'Transformation':
                processIssue(issue.issue, currentPath);
                break;
            case 'Composite':
                if ('errors' in issue && Array.isArray(issue.errors)) {
                    issue.errors.forEach((e) => processIssue(e, currentPath));
                }
                break;
        }
    };
    processIssue(result.left);

    return fail({
        errors,
        message: errors.join('; '),
    });
}

/**
 * Validate full product data (with id) and return Either
 *
 * Returns Either<Product, ProductValidationError>
 */
export function validateProductFull(data: unknown): Either<Product, ProductValidationError> {
    const result = ParseResult.decodeUnknownEither(ProductSchema)(data);

    if (isRight(result)) {
        return succeed(result.right as Product);
    }

    const errors: string[] = [];
    const processIssue = (issue: ParseResult.ParseIssue, path: string = ''): void => {
        const currentPath = path ? `${path}` : '';
        switch (issue._tag) {
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
                processIssue(issue.issue, `${currentPath}${currentPath ? '/' : ''}${String(issue.path)}`);
                break;
            case 'Refinement':
                processIssue(issue.issue, currentPath);
                break;
            case 'Transformation':
                processIssue(issue.issue, currentPath);
                break;
            case 'Composite':
                if ('errors' in issue && Array.isArray(issue.errors)) {
                    issue.errors.forEach((e) => processIssue(e, currentPath));
                }
                break;
        }
    };
    processIssue(result.left);

    return fail({
        errors,
        message: errors.join('; '),
    });
}

// ============================================
// Re-exports for convenience
// ============================================

export { Schema };
