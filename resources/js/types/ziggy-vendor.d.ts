/**
 * Type declarations for ziggy-js with path alias for vendor
 */

declare module '../../vendor/tightenco/ziggy' {
    export interface RouteParams {
        [key: string]: string | undefined;
    }

    export interface Route {
        uri: string;
        methods: string[];
        domain?: string;
        parameters?: string[];
        wheres?: Record<string, string>;
    }

    export interface Routes {
        [name: string]: Route;
    }

    export interface Ziggy {
        url: string;
        port: number | null;
        defaults: Record<string, string>;
        routes: Routes;
    }

    export interface Config {
        url: string;
        port: number | null;
        defaults: Record<string, string>;
        routes: Routes;
        location: string;
    }

    export default function route(name?: string, params?: RouteParams | string, absolute?: boolean, config?: Config): string;
    export { Config };
}
