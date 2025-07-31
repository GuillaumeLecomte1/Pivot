import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { ThemeProvider } from '@/components/ThemeProvider';
import { route } from '../../vendor/tightenco/ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
        setup: ({ App, props }) => (
            <ThemeProvider defaultTheme="system" storageKey="pivot-theme">
                <App {...props} />
            </ThemeProvider>
        ),
        render: ReactDOMServer.renderToString,
    }),
);

// @ts-expect-error
global.route = route;
