import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 transition-colors duration-300">
            <div className="w-full max-w-sm">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg p-8 transition-all duration-300">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Link
                                href={route('home')}
                                className="flex flex-col items-center gap-2 font-medium hover:scale-105 transition-transform duration-200"
                            >
                                <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-green-100 transition-colors duration-200">
                                    <AppLogoIcon className="size-8 fill-current text-blue-600 dark:text-green-600" />
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h1>
                                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
