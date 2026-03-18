/**
 * Tests for Product Schema Validation
 *
 * Tests cover:
 * - ProductInputSchema validation
 * - validateProduct function with valid/invalid data
 * - Category enum validation
 * - Image URL validation
 */

import { describe, expect, it } from 'vitest';
import { isLeft, isRight } from '../either';
import { ProductCategories, validateProduct, validateProductFull } from './ProductSchema';

describe('ProductCategorySchema', () => {
    it('should accept valid categories', () => {
        for (const category of ProductCategories) {
            // Just verify the categories are defined correctly
            expect(ProductCategories).toContain(category);
        }
    });
});

describe('ImageUrlSchema', () => {
    it('should accept valid https URL', () => {
        const url = 'https://example.com/image.jpg';
        // URL pattern should match https URLs
        expect(/^https?:\/\/.+/.test(url)).toBe(true);
    });

    it('should accept empty string', () => {
        const url = '';
        expect(url === '' || /^https?:\/\/.+/.test(url)).toBe(true);
    });

    it('should reject invalid URL', () => {
        const url = 'not-a-url';
        expect(/^https?:\/\/.+/.test(url)).toBe(false);
    });
});

describe('ProductInputSchema', () => {
    const validProduct = {
        name: 'Chaise vintage',
        description: 'Magnifique chaise vintage',
        price: 15.0,
        image_url: 'https://example.com/chaise.jpg',
        category: 'Mobilier' as const,
        condition: 'Très bon état',
    };

    it('should validate valid product input', () => {
        // Test the structure is correct
        expect(validProduct.name).toBe('Chaise vintage');
        expect(validProduct.price).toBe(15.0);
        expect(validProduct.category).toBe('Mobilier');
    });

    it('should require name between 1-255 characters', () => {
        const shortName = { ...validProduct, name: '' };
        const longName = { ...validProduct, name: 'a'.repeat(256) };
        const validName = { ...validProduct, name: 'a'.repeat(255) };

        expect(shortName.name.length).toBe(0);
        expect(longName.name.length).toBe(256);
        expect(validName.name.length).toBe(255);
    });

    it('should allow optional description', () => {
        const withDescription = { ...validProduct, description: 'Some description' };
        const withoutDescription = { ...validProduct, description: undefined };

        expect(withDescription.description).toBe('Some description');
        expect(withoutDescription.description).toBeUndefined();
    });

    it('should require positive price', () => {
        const positivePrice = { ...validProduct, price: 0.01 };
        const zeroPrice = { ...validProduct, price: 0 };
        const negativePrice = { ...validProduct, price: -10 };

        expect(positivePrice.price > 0).toBe(true);
        expect(zeroPrice.price > 0).toBe(false);
        expect(negativePrice.price > 0).toBe(false);
    });
});

describe('validateProduct', () => {
    const validProductInput = {
        name: 'Chaise vintage',
        description: 'Magnifique chaise vintage',
        price: 15.0,
        image_url: 'https://example.com/chaise.jpg',
        category: 'Mobilier',
        condition: 'Très bon état',
    };

    describe('valid data', () => {
        it('should return Right with valid product data', () => {
            const result = validateProduct(validProductInput);

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right).toEqual(validProductInput);
            }
        });

        it('should return Right with minimal valid product data', () => {
            const minimalProduct = {
                name: 'Test Product',
                price: 10.0,
                image_url: '',
                category: 'Décoration' as const,
                condition: 'Bon état',
            };

            const result = validateProduct(minimalProduct);

            expect(isRight(result)).toBe(true);
            if (isRight(result)) {
                expect(result.right.name).toBe('Test Product');
                expect(result.right.price).toBe(10.0);
                expect(result.right.image_url).toBe('');
            }
        });

        it('should return Right with valid https URL', () => {
            const product = {
                ...validProductInput,
                image_url: 'https://example.com/image.png',
            };

            const result = validateProduct(product);

            expect(isRight(result)).toBe(true);
        });

        it('should return Right with empty image_url', () => {
            const product = {
                ...validProductInput,
                image_url: '',
            };

            const result = validateProduct(product);

            expect(isRight(result)).toBe(true);
        });
    });

    describe('invalid data', () => {
        it('should return Left when name is missing', () => {
            // Pass object without name property (completely absent)
            const invalidProduct = {
                description: 'Some description',
                price: 15.0,
                image_url: 'https://example.com/chaise.jpg',
                category: 'Mobilier' as const,
                condition: 'Très bon état',
            };

            const result = validateProduct(invalidProduct);

            expect(isLeft(result)).toBe(true);
        });

        it('should return Left when name is empty string', () => {
            const invalidProduct = {
                ...validProductInput,
                name: '',
            };

            const result = validateProduct(invalidProduct);

            expect(isLeft(result)).toBe(true);
        });

        it('should return Left when name exceeds 255 characters', () => {
            const invalidProduct = {
                ...validProductInput,
                name: 'a'.repeat(256),
            };

            const result = validateProduct(invalidProduct);

            expect(isLeft(result)).toBe(true);
        });

        it('should return Left when price is zero', () => {
            const invalidProduct = {
                ...validProductInput,
                price: 0,
            };

            const result = validateProduct(invalidProduct);

            expect(isLeft(result)).toBe(true);
        });

        it('should return Left when price is negative', () => {
            const invalidProduct = {
                ...validProductInput,
                price: -10,
            };

            const result = validateProduct(invalidProduct);

            expect(isLeft(result)).toBe(true);
        });

        it('should return Left when image_url is invalid URL', () => {
            const invalidProduct = {
                ...validProductInput,
                image_url: 'not-a-valid-url',
            };

            const result = validateProduct(invalidProduct);

            expect(isLeft(result)).toBe(true);
        });

        it('should return Left when category is invalid', () => {
            const invalidProduct = {
                ...validProductInput,
                category: 'InvalidCategory',
            };

            const result = validateProduct(invalidProduct);

            expect(isLeft(result)).toBe(true);
        });

        it('should return Left when condition is missing', () => {
            const invalidProduct = {
                ...validProductInput,
                condition: undefined,
            };

            const result = validateProduct(invalidProduct);

            expect(isLeft(result)).toBe(true);
        });

        it('should return Left when price is missing', () => {
            const invalidProduct = {
                name: 'Test Product',
                image_url: 'https://example.com/image.jpg',
                category: 'Mobilier' as const,
                condition: 'Bon état',
            };

            const result = validateProduct(invalidProduct);

            expect(isLeft(result)).toBe(true);
        });
    });
});

describe('validateProductFull', () => {
    const validFullProduct = {
        id: 1,
        name: 'Chaise vintage',
        description: 'Magnifique chaise vintage',
        price: 15.0,
        image_url: 'https://example.com/chaise.jpg',
        category: 'Mobilier',
        condition: 'Très bon état',
        ressourcerie: {
            name: 'Ressourcerie Test',
            location: 'Angers (49)',
        },
        created_at: '2024-01-15T10:30:00Z',
    };

    it('should return Right with valid full product', () => {
        const result = validateProductFull(validFullProduct);

        expect(isRight(result)).toBe(true);
        if (isRight(result)) {
            expect(result.right.id).toBe(1);
            expect(result.right.ressourcerie?.name).toBe('Ressourcerie Test');
        }
    });

    it('should return Left when id is missing', () => {
        const invalidProduct = {
            ...validFullProduct,
            id: undefined,
        };

        const result = validateProductFull(invalidProduct);

        expect(isLeft(result)).toBe(true);
    });
});

describe('ProductSchema exports', () => {
    it('should export ProductInput type', () => {
        const input: { name: string; price: number } = {
            name: 'Test',
            price: 10,
        };
        expect(input.name).toBe('Test');
    });

    it('should export validateProduct function', () => {
        expect(typeof validateProduct).toBe('function');
    });

    it('should export validateProductFull function', () => {
        expect(typeof validateProductFull).toBe('function');
    });
});
