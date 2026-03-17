/**
 * Tests for Effect-based utilities
 *
 * Tests cover:
 * - Schema validation (schema.ts)
 * - Either utilities (either.ts)
 * - Option utilities (option.ts)
 */

import type { Either } from 'effect/Either';
import type { Option } from 'effect/Option';
import * as Schema from 'effect/Schema';
import { describe, expect, it } from 'vitest';
import {
    chain,
    fail,
    flatMap,
    flatten,
    getOrElse,
    getOrElseValue,
    isFailure,
    isLeft,
    isRight,
    isSuccess,
    // Either utilities
    left,
    map,
    mapLeft,
    match,
    recover,
    right,
    succeed,
    tap,
    tapLeft,
} from '../lib/either';
import {
    absent,
    chain as chainOption,
    flatMap as flatMapOption,
    flatten as flattenOption,
    fromBoolean,
    fromNullable,
    getOrElse as getOrElseOption,
    getOrElseValue as getOrElseValueOption,
    isAbsent,
    isNone,
    isPresent,
    isSome,
    map as mapOption,
    match as matchOption,
    none,
    present,
    refine,
    // Option utilities
    some,
    tap as tapOption,
    toArray,
    toNullable,
} from '../lib/option';
import {
    AppearanceSchema,
    createValidator,
    dateString,
    enumSchema,
    NavItemSchema,
    NumberValidators,
    ProductSchema,
    StringValidators,
    UserSchema,
    uuid,
    // Schema utilities
    validate,
    validateOrThrow,
} from '../lib/schema';

describe('Either', () => {
    describe('Constructors', () => {
        it('should create a Right (success) value with right()', () => {
            const result = right(42);
            expect(isRight(result)).toBe(true);
            expect(isLeft(result)).toBe(false);
        });

        it('should create a Left (failure) value with left()', () => {
            const result = left('error');
            expect(isLeft(result)).toBe(true);
            expect(isRight(result)).toBe(false);
        });

        it('should create a Right with succeed() alias', () => {
            const result = succeed(42);
            expect(isRight(result)).toBe(true);
        });

        it('should create a Left with fail() alias', () => {
            const result = fail('error');
            expect(isLeft(result)).toBe(true);
        });
    });

    describe('Type guards', () => {
        it('should correctly identify Right with isRight()', () => {
            const success = right('value');
            const failure = left('error');

            expect(isRight(success)).toBe(true);
            expect(isRight(failure)).toBe(false);
        });

        it('should correctly identify Left with isLeft()', () => {
            const success = right('value');
            const failure = left('error');

            expect(isLeft(success)).toBe(false);
            expect(isLeft(failure)).toBe(true);
        });

        it('should correctly identify success with isSuccess()', () => {
            const success = right('value');
            const failure = left('error');

            expect(isSuccess(success)).toBe(true);
            expect(isSuccess(failure)).toBe(false);
        });

        it('should correctly identify failure with isFailure()', () => {
            const success = right('value');
            const failure = left('error');

            expect(isFailure(success)).toBe(false);
            expect(isFailure(failure)).toBe(true);
        });
    });

    describe('map', () => {
        it('should transform the Right value with map()', () => {
            const result = map(right(5), (n) => n * 2);
            expect(result).toEqual(right(10));
        });

        it('should not transform Left value with map()', () => {
            const result = map(left('error') as Either<number, string>, (n) => n * 2);
            expect(result).toEqual(left('error'));
        });
    });

    describe('mapLeft', () => {
        it('should transform the Left value with mapLeft()', () => {
            const result = mapLeft(left('error'), (e) => e.toUpperCase());
            expect(result).toEqual(left('ERROR'));
        });

        it('should not transform Right value with mapLeft()', () => {
            const result = mapLeft(right(5), (e: string) => e.toUpperCase());
            expect(result).toEqual(right(5));
        });
    });

    describe('flatMap', () => {
        it('should chain Either operations with flatMap()', () => {
            const result = flatMap(right(5), (n) => right(n * 2));
            expect(result).toEqual(right(10));
        });

        it('should short-circuit on Left with flatMap()', () => {
            const result = flatMap(left('error') as Either<number, string>, (n) => right(n * 2));
            expect(result).toEqual(left('error'));
        });

        it('should return Left when flatMap returns Left', () => {
            const result = flatMap(right(5), () => left('failed'));
            expect(result).toEqual(left('failed'));
        });
    });

    describe('chain', () => {
        it('should be an alias for flatMap', () => {
            const result = chain(right(5), (n) => right(n * 2));
            expect(result).toEqual(right(10));
        });
    });

    describe('flatten', () => {
        it('should flatten nested Either with flatten()', () => {
            const nested = right(right(42));
            const result = flatten(nested);
            expect(result).toEqual(right(42));
        });

        it('should flatten nested Either with Left outer', () => {
            const nested = left('outer error') as Either<Either<number, string>, string>;
            const result = flatten(nested);
            expect(result).toEqual(left('outer error'));
        });

        it('should flatten nested Either with Left inner', () => {
            const nested = right(left('inner error') as Either<number, string>);
            const result = flatten(nested);
            expect(result).toEqual(left('inner error'));
        });
    });

    describe('match', () => {
        it('should execute onRight callback for Right with match()', () => {
            const result = match(
                right(5),
                (e) => `Error: ${e}`,
                (v) => `Value: ${v}`,
            );
            expect(result).toBe('Value: 5');
        });

        it('should execute onLeft callback for Left with match()', () => {
            const result = match(
                left('error'),
                (e) => `Error: ${e}`,
                (v) => `Value: ${v}`,
            );
            expect(result).toBe('Error: error');
        });
    });

    describe('getOrElseValue', () => {
        it('should return the Right value with getOrElseValue()', () => {
            const result = getOrElseValue(right(42), 0);
            expect(result).toBe(42);
        });

        it('should return default for Left with getOrElseValue()', () => {
            const result = getOrElseValue(left('error'), 0);
            expect(result).toBe(0);
        });
    });

    describe('getOrElse', () => {
        it('should return the Right value with getOrElse()', () => {
            const result = getOrElse(right(42), () => 0);
            expect(result).toBe(42);
        });

        it('should return computed default for Left with getOrElse()', () => {
            const result = getOrElse(left('error'), () => 0);
            expect(result).toBe(0);
        });
    });

    describe('recover', () => {
        it('should transform Left error with recover()', () => {
            const result = recover(left('error'), (e) => right(`recovered from ${e}`));
            expect(result).toEqual(right('recovered from error'));
        });

        it('should return Right unchanged with recover()', () => {
            const result = recover(right(42), () => right(0));
            expect(result).toEqual(right(42));
        });
    });

    describe('tap', () => {
        it('should execute side effect on Right with tap()', () => {
            let sideEffect = false;
            const result = tap(right(42), () => {
                sideEffect = true;
            });
            expect(sideEffect).toBe(true);
            expect(result).toEqual(right(42));
        });

        it('should not execute side effect on Left with tap()', () => {
            let sideEffect = false;
            const result = tap(left('error') as Either<number, string>, () => {
                sideEffect = true;
            });
            expect(sideEffect).toBe(false);
            expect(result).toEqual(left('error'));
        });
    });

    describe('tapLeft', () => {
        it('should execute side effect on Left with tapLeft()', () => {
            let sideEffect = false;
            const result = tapLeft(left('error'), () => {
                sideEffect = true;
            });
            expect(sideEffect).toBe(true);
            expect(result).toEqual(left('error'));
        });

        it('should not execute side effect on Right with tapLeft()', () => {
            let sideEffect = false;
            const result = tapLeft(right(42), () => {
                sideEffect = true;
            });
            expect(sideEffect).toBe(false);
            expect(result).toEqual(right(42));
        });
    });
});

describe('Option', () => {
    describe('Constructors', () => {
        it('should create a Some with some()', () => {
            const result = some(42);
            expect(isSome(result)).toBe(true);
            expect(isNone(result)).toBe(false);
        });

        it('should create a None with none()', () => {
            const result = none();
            expect(isNone(result)).toBe(true);
            expect(isSome(result)).toBe(false);
        });

        it('should create a Some with present() alias', () => {
            const result = present(42);
            expect(isSome(result)).toBe(true);
        });

        it('should create a None with absent() alias', () => {
            const result = absent();
            expect(isNone(result)).toBe(true);
        });

        it('should create Some from fromBoolean with true', () => {
            const result = fromBoolean(true, 42);
            expect(isSome(result)).toBe(true);
        });

        it('should create None from fromBoolean with false', () => {
            const result = fromBoolean(false, 42);
            expect(isNone(result)).toBe(true);
        });
    });

    describe('Type guards', () => {
        it('should correctly identify Some with isSome()', () => {
            const someValue = some(42);
            const noneValue = none();

            expect(isSome(someValue)).toBe(true);
            expect(isSome(noneValue)).toBe(false);
        });

        it('should correctly identify None with isNone()', () => {
            const someValue = some(42);
            const noneValue = none();

            expect(isNone(someValue)).toBe(false);
            expect(isNone(noneValue)).toBe(true);
        });

        it('should correctly identify Some with isPresent()', () => {
            const someValue = some(42);
            expect(isPresent(someValue)).toBe(true);
        });

        it('should correctly identify None with isAbsent()', () => {
            const noneValue = none();
            expect(isAbsent(noneValue)).toBe(true);
        });
    });

    describe('fromNullable', () => {
        it('should return Some for non-null value with fromNullable()', () => {
            const result = fromNullable(42);
            expect(isSome(result)).toBe(true);
        });

        it('should return None for null with fromNullable()', () => {
            const result = fromNullable(null);
            expect(isNone(result)).toBe(true);
        });

        it('should return None for undefined with fromNullable()', () => {
            const result = fromNullable(undefined);
            expect(isNone(result)).toBe(true);
        });

        it('should return None for both null and undefined', () => {
            expect(isNone(fromNullable(null as unknown as number))).toBe(true);
            expect(isNone(fromNullable(undefined))).toBe(true);
        });
    });

    describe('toNullable', () => {
        it('should return value with toNullable() for Some', () => {
            const result = toNullable(some(42));
            expect(result).toBe(42);
        });

        it('should return null with toNullable() for None', () => {
            const result = toNullable(none());
            expect(result).toBe(null);
        });
    });

    describe('toArray', () => {
        it('should return array with value for Some with toArray()', () => {
            const result = toArray(some(42));
            expect(result).toEqual([42]);
        });

        it('should return empty array for None with toArray()', () => {
            const result = toArray(none());
            expect(result).toEqual([]);
        });
    });

    describe('map', () => {
        it('should transform Some value with mapOption()', () => {
            const result = mapOption(some(5), (n) => n * 2);
            expect(result).toEqual(some(10));
        });

        it('should not transform None with mapOption()', () => {
            const result = mapOption(none(), (n) => n * 2);
            expect(isNone(result)).toBe(true);
        });
    });

    describe('flatMap', () => {
        it('should chain Option operations with flatMapOption()', () => {
            const result = flatMapOption(some(5), (n) => some(n * 2));
            expect(result).toEqual(some(10));
        });

        it('should short-circuit on None with flatMapOption()', () => {
            const result = flatMapOption(none(), (n) => some(n * 2));
            expect(isNone(result)).toBe(true);
        });

        it('should return None when flatMapOption returns None', () => {
            const result = flatMapOption(some(5), () => none());
            expect(isNone(result)).toBe(true);
        });
    });

    describe('chain', () => {
        it('should be an alias for flatMapOption', () => {
            const result = chainOption(some(5), (n) => some(n * 2));
            expect(result).toEqual(some(10));
        });
    });

    describe('flatten', () => {
        it('should flatten nested Option with flattenOption()', () => {
            const nested = some(some(42));
            const result = flattenOption(nested);
            expect(result).toEqual(some(42));
        });

        it('should flatten nested Option with None outer', () => {
            const nested = none() as Option<Option<number>>;
            const result = flattenOption(nested);
            expect(isNone(result)).toBe(true);
        });

        it('should flatten nested Option with None inner', () => {
            const nested = some(none());
            const result = flattenOption(nested);
            expect(isNone(result)).toBe(true);
        });
    });

    describe('match', () => {
        it('should execute onSome callback for Some with matchOption()', () => {
            const result = matchOption(
                some(5),
                (v) => `Value: ${v}`,
                () => 'None',
            );
            expect(result).toBe('Value: 5');
        });

        it('should execute onNone callback for None with matchOption()', () => {
            const result = matchOption(
                none(),
                (v) => `Value: ${v}`,
                () => 'None',
            );
            expect(result).toBe('None');
        });
    });

    describe('getOrElseValue', () => {
        it('should return Some value with getOrElseValueOption()', () => {
            const result = getOrElseValueOption(some(42), 0);
            expect(result).toBe(42);
        });

        it('should return default for None with getOrElseValueOption()', () => {
            const result = getOrElseValueOption(none(), 0);
            expect(result).toBe(0);
        });
    });

    describe('getOrElse', () => {
        it('should return Some value with getOrElseOption()', () => {
            const result = getOrElseOption(some(42), () => 0);
            expect(result).toBe(42);
        });

        it('should return computed default for None with getOrElseOption()', () => {
            const result = getOrElseOption(none(), () => 0);
            expect(result).toBe(0);
        });
    });

    describe('refine', () => {
        it('should return Some when predicate passes with refine()', () => {
            const result = refine(some(5), (n) => n > 0);
            expect(result).toEqual(some(5));
        });

        it('should return None when predicate fails with refine()', () => {
            const result = refine(some(5), (n) => n > 10);
            expect(isNone(result)).toBe(true);
        });

        it('should return None for None with refine()', () => {
            const result = refine(none(), (n) => n > 0);
            expect(isNone(result)).toBe(true);
        });
    });

    describe('tap', () => {
        it('should execute side effect on Some with tapOption()', () => {
            let sideEffect = false;
            const result = tapOption(some(42), () => {
                sideEffect = true;
            });
            expect(sideEffect).toBe(true);
            expect(result).toEqual(some(42));
        });

        it('should not execute side effect on None with tapOption()', () => {
            let sideEffect = false;
            const result = tapOption(none(), () => {
                sideEffect = true;
            });
            expect(sideEffect).toBe(false);
            expect(isNone(result)).toBe(true);
        });
    });
});

describe('Schema Validation', () => {
    describe('validate', () => {
        it('should return success result for valid data', () => {
            const schema = Schema.Struct({
                name: Schema.String,
                age: Schema.Number,
            });
            const result = validate(schema, { name: 'John', age: 30 });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data).toEqual({ name: 'John', age: 30 });
            }
        });

        it('should return error result for invalid data', () => {
            const schema = Schema.Struct({
                name: Schema.String,
                age: Schema.Number,
            });
            const result = validate(schema, { name: 'John', age: 'not a number' });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.errors.length).toBeGreaterThan(0);
            }
        });

        it('should return error result for missing required field', () => {
            const schema = Schema.Struct({
                name: Schema.String,
                age: Schema.Number,
            });
            const result = validate(schema, { name: 'John' });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.errors.some((e) => e.includes('missing'))).toBe(true);
            }
        });

        it('should return error result for wrong type', () => {
            const schema = Schema.Struct({
                name: Schema.String,
            });
            const result = validate(schema, { name: 123 });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.errors.some((e) => e.includes('type mismatch'))).toBe(true);
            }
        });
    });

    describe('validateOrThrow', () => {
        it('should return parsed value for valid data', () => {
            const schema = Schema.Struct({
                name: Schema.String,
                age: Schema.Number,
            });
            const result = validateOrThrow(schema, { name: 'John', age: 30 });

            expect(result).toEqual({ name: 'John', age: 30 });
        });

        it('should throw error for invalid data', () => {
            const schema = Schema.Struct({
                name: Schema.String,
                age: Schema.Number,
            });

            expect(() => validateOrThrow(schema, { name: 'John', age: 'not a number' })).toThrow();
        });
    });

    describe('createValidator', () => {
        it('should create a validator function', () => {
            const schema = Schema.Struct({
                email: Schema.String,
            });
            const validator = createValidator(schema);

            const validResult = validator({ email: 'test@example.com' });
            expect(validResult.success).toBe(true);

            const invalidResult = validator({ email: 123 });
            expect(invalidResult.success).toBe(false);
        });
    });

    describe('StringValidators', () => {
        describe('minLength', () => {
            it('should validate minimum length', () => {
                const schema = StringValidators.minLength(3);
                const valid = validate(schema, 'abc');
                const invalid = validate(schema, 'ab');

                expect(valid.success).toBe(true);
                expect(invalid.success).toBe(false);
            });
        });

        describe('maxLength', () => {
            it('should validate maximum length', () => {
                const schema = StringValidators.maxLength(5);
                const valid = validate(schema, 'abcde');
                const invalid = validate(schema, 'abcdef');

                expect(valid.success).toBe(true);
                expect(invalid.success).toBe(false);
            });
        });

        describe('email', () => {
            it('should validate email format', () => {
                const schema = StringValidators.email();
                const valid = validate(schema, 'test@example.com');
                const invalid = validate(schema, 'invalid-email');

                expect(valid.success).toBe(true);
                expect(invalid.success).toBe(false);
            });
        });

        describe('url', () => {
            it('should validate URL format', () => {
                const schema = StringValidators.url();
                const valid = validate(schema, 'https://example.com');
                const invalid = validate(schema, 'not-a-url');

                expect(valid.success).toBe(true);
                expect(invalid.success).toBe(false);
            });
        });

        describe('length', () => {
            it('should validate length range', () => {
                const schema = StringValidators.length(3, 5);
                const valid = validate(schema, 'abcd');
                const invalidShort = validate(schema, 'ab');
                const invalidLong = validate(schema, 'abcdef');

                expect(valid.success).toBe(true);
                expect(invalidShort.success).toBe(false);
                expect(invalidLong.success).toBe(false);
            });
        });
    });

    describe('NumberValidators', () => {
        describe('min', () => {
            it('should validate minimum value', () => {
                const schema = NumberValidators.min(10);
                const valid = validate(schema, 10);
                const invalid = validate(schema, 5);

                expect(valid.success).toBe(true);
                expect(invalid.success).toBe(false);
            });
        });

        describe('max', () => {
            it('should validate maximum value', () => {
                const schema = NumberValidators.max(100);
                const valid = validate(schema, 100);
                const invalid = validate(schema, 101);

                expect(valid.success).toBe(true);
                expect(invalid.success).toBe(false);
            });
        });

        describe('integer', () => {
            it('should validate integer', () => {
                const schema = NumberValidators.integer();
                const valid = validate(schema, 42);
                const invalid = validate(schema, 3.14);

                expect(valid.success).toBe(true);
                expect(invalid.success).toBe(false);
            });
        });

        describe('positive', () => {
            it('should validate positive number', () => {
                const schema = NumberValidators.positive();
                const valid = validate(schema, 1);
                const invalid = validate(schema, -1);
                const invalidZero = validate(schema, 0);

                expect(valid.success).toBe(true);
                expect(invalid.success).toBe(false);
                expect(invalidZero.success).toBe(false);
            });
        });
    });

    describe('enumSchema', () => {
        it('should validate enum values', () => {
            const schema = enumSchema(['red', 'green', 'blue']);
            const valid = validate(schema, 'green');
            const invalid = validate(schema, 'yellow');

            expect(valid.success).toBe(true);
            expect(invalid.success).toBe(false);
        });
    });

    describe('dateString', () => {
        it('should validate date strings', () => {
            const valid = validate(dateString, new Date());
            const invalid = validate(dateString, 'not a date');

            expect(valid.success).toBe(true);
            expect(invalid.success).toBe(false);
        });
    });

    describe('uuid', () => {
        it('should validate UUID format', () => {
            const valid = validate(uuid, '550e8400-e29b-41d4-a716-446655440000');
            const invalid = validate(uuid, 'not-a-uuid');

            expect(valid.success).toBe(true);
            expect(invalid.success).toBe(false);
        });
    });

    describe('Domain schemas', () => {
        it('should validate UserSchema', () => {
            const validUser = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                created_at: '2024-01-01',
                updated_at: '2024-01-01',
            };
            const result = validate(UserSchema, validUser);
            expect(result.success).toBe(true);
        });

        it('should validate ProductSchema', () => {
            const validProduct = {
                id: 1,
                name: 'Test Product',
                description: 'A test product',
                price: 99.99,
                images: ['image1.jpg'],
                ressourcerie: {
                    name: 'Test Ressourcerie',
                    location: 'Test Location',
                },
                category: 'Electronics',
                condition: 'New',
                created_at: '2024-01-01',
            };
            const result = validate(ProductSchema, validProduct);
            expect(result.success).toBe(true);
        });

        it('should validate NavItemSchema', () => {
            const validNavItem = {
                title: 'Home',
                href: '/',
            };
            const result = validate(NavItemSchema, validNavItem);
            expect(result.success).toBe(true);
        });

        it('should validate AppearanceSchema', () => {
            const validLight = validate(AppearanceSchema, 'light');
            const validDark = validate(AppearanceSchema, 'dark');
            const validSystem = validate(AppearanceSchema, 'system');
            const invalid = validate(AppearanceSchema, 'invalid');

            expect(validLight.success).toBe(true);
            expect(validDark.success).toBe(true);
            expect(validSystem.success).toBe(true);
            expect(invalid.success).toBe(false);
        });
    });
});
