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
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-gray-50 to-gray-100 p-6 transition-colors duration-300 md:p-10 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-sm">
                <div className="rounded-xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800/80">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Link
                                href={route('home')}
                                className="flex flex-col items-center gap-2 font-medium transition-transform duration-200 hover:scale-105"
                            >
                                <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 transition-colors duration-200 dark:bg-green-100">
                                    <AppLogoIcon className="size-8 fill-current text-blue-600 dark:text-green-600" />
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="font-semibold text-2xl text-gray-900 dark:text-white">{title}</h1>
                                <p className="text-center text-gray-600 text-sm dark:text-gray-300">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
