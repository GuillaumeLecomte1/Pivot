import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function MainNavbar() {
    const [_isMenuOpen, _setIsMenuOpen] = useState(false);

    return (
        <header className="container mx-auto px-4 py-6 sm:px-6 lg:px-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
                {/* Logo */}
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/images/logoPivot.png"
                            alt="Logo Pivot"
                            className="h-8 dark:invert"
                            onError={(e) => {
                                console.error('Erreur de chargement du logo');
                                const imgElement = e.currentTarget;
                                imgElement.style.display = 'none';
                                const textFallback = document.createElement('span');
                                textFallback.className = 'text-secondary-foreground dark:text-secondary font-bold text-3xl';
                                textFallback.textContent = 'pivot';
                                if (imgElement.parentElement) {
                                    imgElement.parentElement.appendChild(textFallback);
                                }
                            }}
                        />
                    </Link>
                    {/* Mobile menu button */}
                    <button type="button" className="p-2 md:hidden dark:text-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-label="Menu"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="hidden items-center space-x-8 md:flex">
                    <Link href="/" className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400">
                        Accueil
                    </Link>
                    <Link href="/categories" className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400">
                        Catégorie
                    </Link>
                    <Link href="/ressourceries" className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400">
                        Ressourcerie
                    </Link>
                    <Link href="/notre-histoire" className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400">
                        Notre histoire
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-6">
                    <Link href="/pivot-pro" className="rounded bg-black px-4 py-2 text-sm text-white md:text-base dark:bg-white dark:text-black">
                        Pivot Pro
                    </Link>

                    {/* User actions */}
                    <div className="flex items-center space-x-4">
                        <Link href="/angers" className="hidden items-center text-gray-700 md:flex dark:text-gray-300">
                            <span>Angers</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="ml-1 h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-label="Sélectionner ville"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>

                        {/* Icons container */}
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <Link href="/favoris" className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-700 dark:text-gray-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-label="Favoris"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </Link>
                            <Link href="/panier" className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-700 dark:text-gray-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-label="Panier"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </Link>
                        </div>

                        {/* Login button */}
                        <Link
                            href="/login"
                            className="rounded bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-opacity-90 md:text-base dark:bg-white dark:text-black"
                        >
                            Se connecter
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
