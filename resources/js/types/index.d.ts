/**
 * Type definitions for Pivot
 *
 * This file provides TypeScript types for the application.
 * For runtime validation, use the Effect schemas from @/lib/schema
 */

import type { Config } from 'ziggy-js';

// Import types from Effect schemas for consistency
// These are inferred from the schemas in @/lib/schema
import type { SchemaAppearance, SchemaAuth, SchemaNavItem, SchemaUser } from '@/lib/schema';

// Re-export types from Effect schemas
export type User = SchemaUser;
export type Auth = SchemaAuth;
export type NavItem = SchemaNavItem;
export type Appearance = SchemaAppearance;

// Breadcrumb type (following same pattern)
export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}
