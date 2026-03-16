/**
 * Effect-based utilities for functional programming
 *
 * This module provides:
 * - Either: Success/Failure pattern for error handling
 * - Option: Some/None pattern for optional values
 * - Schema: Runtime validation using Effect Schema
 * - Storage: localStorage operations with Either error handling
 * - Cookies: Cookie operations with Either error handling
 *
 * @example
 * import { right, left, isSuccess } from "./lib/either";
 * import { some, none, isPresent } from "./lib/option";
 * import { validate, StringValidators } from "./lib/schema";
 * import { getItem, setItem } from "./lib/storage";
 * import { getCookie, setCookie } from "./lib/cookies";
 */

export type { Either } from 'effect/Either';
export type { Option } from 'effect/Option';
// Re-export Cookie utilities
export type { CookieError, CookieOptions } from './cookies';
export {
    getAllCookies,
    getCookie,
    getJsonCookie,
    hasCookie,
    removeCookie,
    setCookie,
    setJsonCookie,
} from './cookies';
// Re-export Either utilities
export {
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
    left,
    map,
    mapLeft,
    match,
    recover,
    right,
    succeed,
    tap,
    tapLeft,
} from './either';
export type {
    HttpError,
    HttpMethod,
    HttpRequestConfig,
    HttpResponse,
    HttpResult,
} from './http';
// Re-export HTTP utilities
export {
    axiosInstance,
    createApiClient,
    HttpClient,
    ValidatedHttpClient,
} from './http';
// Re-export Option utilities
export {
    absent,
    chain as chainOption,
    flatMap as flatMapOption,
    flatten as flattenOption,
    fromBoolean,
    fromNullable,
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
    some,
    tap as tapOption,
    toArray,
    toNullable,
} from './option';
export type {
    ParseResult,
    SchemaAppearance,
    SchemaAuth,
    SchemaContext,
    SchemaEncoded,
    SchemaNavItem,
    SchemaProduct,
    SchemaType,
    SchemaUser,
    ValidationResult,
} from './schema';
// Re-export Schema utilities
export {
    AppearanceSchema,
    AuthSchema,
    BreadcrumbItemSchema,
    createValidator,
    dateString,
    enumSchema,
    NavGroupSchema,
    NavItemSchema,
    NumberValidators,
    ProductSchema,
    RessourcerieSchema,
    Schema,
    SharedDataSchema,
    StringValidators,
    UserSchema,
    UserWithExtrasSchema,
    uuid,
    validate,
    validateOrThrow,
} from './schema';
// Re-export Storage utilities
export type { StorageError } from './storage';
export {
    clear,
    getItem,
    getJsonItem,
    getKeys,
    hasKey,
    isStorageAvailable,
    removeItem,
    setItem,
    setJsonItem,
} from './storage';
// Re-export Theme utilities
export type { Theme, ThemeError } from './theme';
export {
    applyTheme,
    getMediaQuery,
    getStoredTheme,
    getSystemTheme,
    initializeTheme,
    isMediaQueryAvailable,
    resolveTheme,
    setStoredTheme,
    subscribeToSystemTheme,
    toggleTheme,
} from './theme';
