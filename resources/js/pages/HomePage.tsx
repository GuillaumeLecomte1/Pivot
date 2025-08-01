﻿import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/components/AppLayout';
import { MinimalCard, MinimalCardDescription, MinimalCardImage, MinimalCardTitle } from '@/components/ui/minimal-card';

export default function HomePage() {
    const LogoItem = () => (
        <div className="p-3 sm:h-16 sm:p-4">
            <img
                src="/images/logoPivot.png"
                alt="Logo Pivot"
                className="h-6 w-auto sm:h-8"
                onError={(e) => {
                    console.error('Erreur de chargement du logo');
                    const imgElement = e.currentTarget;
                    imgElement.style.display = 'none';
                    const textFallback = document.createElement('span');
                    textFallback.className = 'text-gray-300 font-bold text-sm sm:text-base';
                    textFallback.textContent = 'LOGO';
                    if (imgElement.parentElement) {
                        imgElement.parentElement.appendChild(textFallback);
                    }
                }}
            />
        </div>
    );

    return (
        <AppLayout>
            <Head title="Pivot - La marketplace des ressourceries françaises">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-white dark:bg-gray-900">
                {/* Hero section */}
                <section className="py-8 md:py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                        <div className="rounded-3xl bg-[#E7E7E7] p-6 md:p-12 dark:bg-[#2E2640]">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                                <div className="space-y-6">
                                    <h1 className="font-bold text-4xl leading-tight md:text-5xl">
                                        La marketplace
                                        <br />
                                        <span className="text-[#FF7961] dark:text-[#FF7961]">des ressourceries</span>
                                        <br />
                                        françaises
                                    </h1>
                                    <p className="text-base md:text-lg">
                                        Donner une seconde vie aux produits dénichés, ça vaut le coût ! Pivot, est la première plateforme de{' '}
                                        <span className="font-medium text-[#6ED47C] dark:text-[#6ED47C]">click-and-collect</span> dédiée aux
                                        ressourceries en France !
                                    </p>

                                    <div className="flex flex-col space-y-4 border-gray-300 border-t border-b py-5 sm:flex-row sm:space-y-0 dark:border-gray-700">
                                        <div className="border-gray-300 sm:border-r sm:pr-12 dark:border-gray-700">
                                            <div className="font-bold text-2xl text-[#6ED47C] md:text-3xl dark:text-[#6ED47C]">1050+</div>
                                            <div className="text-sm">Produits dénichés</div>
                                        </div>
                                        <div className="sm:pl-12">
                                            <div className="font-bold text-2xl text-[#6ED47C] md:text-3xl dark:text-[#6ED47C]">100+</div>
                                            <div className="text-sm">Ressourceries</div>
                                        </div>
                                    </div>

                                    {/* Search box */}
                                    <div className="flex w-full max-w-md overflow-hidden rounded-lg border border-gray-300 bg-white dark:border-gray-700 dark:bg-[#1C1929]">
                                        <input
                                            type="text"
                                            placeholder="Que recherchez-vous ?"
                                            className="flex-1 bg-white px-4 py-3 focus:outline-none dark:bg-[#1C1929] dark:text-white"
                                        />
                                        <div className="hidden items-center border-gray-300 border-l px-3 py-3 sm:flex dark:border-gray-700">
                                            <span className="dark:text-white">Angers</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="ml-1 h-5 w-5 dark:text-white"
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
                                        </div>
                                        <button type="button" className="border-gray-300 border-l px-4 dark:border-gray-700 dark:text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-label="Rechercher"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Hero image */}
                                <div className="mt-6 h-[400px] overflow-hidden rounded-lg border-4 border-[#6ED47C] lg:mt-0 lg:h-[500px] dark:border-[#6ED47C]">
                                    <div className="h-full w-full bg-yellow-100 dark:bg-[#1C1929]">
                                        <img
                                            src="/images/heroes/HeroAccueilImage.png"
                                            alt="Objets vintage de seconde main"
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                console.error("Erreur de chargement de l'image héro");
                                                const imgElement = e.currentTarget;
                                                imgElement.style.display = 'none';
                                                const parentElement = imgElement.parentElement;
                                                if (parentElement && parentElement instanceof HTMLElement) {
                                                    parentElement.style.background =
                                                        'linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))';
                                                    parentElement.style.setProperty('--tw-gradient-from', '#fef9c3');
                                                    parentElement.style.setProperty('--tw-gradient-to', '#dcfce7');
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ressourceries section */}
                <section className="py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="font-bold text-2xl">Les ressourceries digitalisées</h2>
                                <p className="mt-2 text-[#6ED47C] dark:text-[#6ED47C]">
                                    Retrouvez toutes les annonces des ressourceries près de chez vous !
                                </p>
                            </div>
                            <button
                                type="button"
                                className="mt-4 flex items-center self-start rounded border border-black bg-black px-4 py-2 text-white md:mt-0 md:self-auto dark:bg-white dark:text-black"
                            >
                                afficher la carte
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-2 h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-label="Afficher carte"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Logo line */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between">
                                <div className="hidden lg:block">
                                    <LogoItem />
                                </div>
                                <div className="hidden md:block">
                                    <LogoItem />
                                </div>
                                <div className="hidden sm:block">
                                    <LogoItem />
                                </div>
                                <LogoItem />
                                <LogoItem />
                                <LogoItem />
                            </div>
                        </div>
                    </div>
                </section>
                {/* Nos coups de coeur section */}
                <section className="py-8 md:py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                            {/* Left side - Text content */}
                            <div className="w-full lg:w-1/4">
                                <h2 className="font-bold text-3xl dark:text-white">
                                    Nos coups
                                    <br />
                                    de coeur
                                </h2>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">
                                    Allongez la durée de vie des objets tout en faisant croître de nouvelles interactions !
                                </p>

                                <Link
                                    href="/catalogue"
                                    className="mt-4 inline-flex items-center rounded bg-black px-5 py-2 text-white dark:bg-white dark:text-black"
                                >
                                    voir le catalogue
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-2 h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-label="Voir plus"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Link>
                            </div>

                            {/* Right side - Product grid */}
                            <div className="w-full lg:w-3/4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
                                    {/* Produit 1 */}
                                    <Link href="/produits/1" className="group">
                                        <MinimalCard className="relative transition-transform group-hover:scale-[1.02]">
                                            <MinimalCardImage src="/images/products/ChaiseVintage.png" alt="Chaise vintage" />
                                            <button
                                                type="button"
                                                className="absolute top-5 right-5 rounded-full bg-white p-1 shadow-sm dark:bg-gray-800"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-600 dark:text-gray-300"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-label="Favoris"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                    />
                                                </svg>
                                            </button>
                                            <div className="px-4 pb-4">
                                                <MinimalCardDescription className="px-0 pb-1 text-gray-500 text-xs dark:text-gray-400">
                                                    Ressourcerie des biscottes (49)
                                                </MinimalCardDescription>
                                                <div className="mb-1 font-semibold text-[#6ED47C] text-xs uppercase dark:text-[#6ED47C]">
                                                    MOBILIER
                                                </div>
                                                <MinimalCardTitle className="mt-0 px-0">Chaise</MinimalCardTitle>
                                                <div className="mt-2 font-bold text-lg dark:text-white">15 €</div>
                                            </div>
                                        </MinimalCard>
                                    </Link>

                                    {/* Produit 2 */}
                                    <Link href="/produits/2" className="group">
                                        <MinimalCard className="relative transition-transform group-hover:scale-[1.02]">
                                            <MinimalCardImage src="/images/products/Pichet.png" alt="Pichet à lait" />
                                            <button
                                                type="button"
                                                className="absolute top-5 right-5 rounded-full bg-white p-1 shadow-sm dark:bg-gray-800"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-600 dark:text-gray-300"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-label="Favoris"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                    />
                                                </svg>
                                            </button>
                                            <div className="px-4 pb-4">
                                                <MinimalCardDescription className="px-0 pb-1 text-gray-500 text-xs dark:text-gray-400">
                                                    La pagaille (49)
                                                </MinimalCardDescription>
                                                <div className="mb-1 font-semibold text-[#6ED47C] text-xs uppercase dark:text-[#6ED47C]">
                                                    ART DE LA TABLE
                                                </div>
                                                <MinimalCardTitle className="mt-0 px-0">Pichet à lait</MinimalCardTitle>
                                                <div className="mt-2 font-bold text-lg dark:text-white">19 €</div>
                                            </div>
                                        </MinimalCard>
                                    </Link>

                                    {/* Produit 3 */}
                                    <Link href="/produits/3" className="group">
                                        <MinimalCard className="relative transition-transform group-hover:scale-[1.02]">
                                            <MinimalCardImage src="/images/products/Couvert.png" alt="Ensemble de couverts" />
                                            <button
                                                type="button"
                                                className="absolute top-5 right-5 rounded-full bg-white p-1 shadow-sm dark:bg-gray-800"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-600 dark:text-gray-300"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-label="Favoris"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                    />
                                                </svg>
                                            </button>
                                            <div className="px-4 pb-4">
                                                <MinimalCardDescription className="px-0 pb-1 text-gray-500 text-xs dark:text-gray-400">
                                                    Ressourcerie des biscottes (49)
                                                </MinimalCardDescription>
                                                <div className="mb-1 font-semibold text-[#6ED47C] text-xs uppercase dark:text-[#6ED47C]">
                                                    ART DE LA TABLE
                                                </div>
                                                <MinimalCardTitle className="mt-0 px-0 text-base leading-tight">
                                                    Ensemble de couverts
                                                </MinimalCardTitle>
                                                <div className="mt-2 font-bold text-lg dark:text-white">8 €</div>
                                            </div>
                                        </MinimalCard>
                                    </Link>

                                    {/* Produit 4 */}
                                    <Link href="/produits/4" className="group">
                                        <MinimalCard className="relative transition-transform group-hover:scale-[1.02]">
                                            <MinimalCardImage src="/images/products/Armoire.png" alt="Armoire" />
                                            <button
                                                type="button"
                                                className="absolute top-5 right-5 rounded-full bg-white p-1 shadow-sm dark:bg-gray-800"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-600 dark:text-gray-300"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-label="Favoris"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                    />
                                                </svg>
                                            </button>
                                            <div className="px-4 pb-4">
                                                <MinimalCardDescription className="px-0 pb-1 text-gray-500 text-xs dark:text-gray-400">
                                                    Ressourcerie des biscottes (49)
                                                </MinimalCardDescription>
                                                <div className="mb-1 font-semibold text-[#6ED47C] text-xs uppercase dark:text-[#6ED47C]">
                                                    MOBILIER
                                                </div>
                                                <MinimalCardTitle className="mt-0 px-0 text-base leading-tight">Armoire</MinimalCardTitle>
                                                <div className="mt-2 font-bold text-lg dark:text-white">20 €</div>
                                            </div>
                                        </MinimalCard>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Catégories section */}
                <section className="py-12">
                    <div className="container mx-auto px-12">
                        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
                            <Link href="/categories/art-de-la-table" className="flex items-center justify-center rounded-lg bg-pink-200 p-8">
                                <div className="text-center">
                                    <span className="text-xl">🍽️</span>
                                    <h3 className="mt-2 font-medium">Art de la table</h3>
                                </div>
                            </Link>
                            <Link href="/categories/mobilier" className="flex items-center justify-center rounded-lg bg-green-100 p-8">
                                <div className="text-center">
                                    <span className="text-xl">🪑</span>
                                    <h3 className="mt-2 font-medium">Mobilier</h3>
                                </div>
                            </Link>
                            <Link href="/categories/librairie" className="flex items-center justify-center rounded-lg bg-yellow-100 p-8">
                                <div className="text-center">
                                    <span className="text-xl">📚</span>
                                    <h3 className="mt-2 font-medium">Librairie</h3>
                                </div>
                            </Link>
                            <Link href="/categories/vetements" className="flex items-center justify-center rounded-lg bg-orange-200 p-8">
                                <div className="text-center">
                                    <span className="text-xl">👕</span>
                                    <h3 className="mt-2 font-medium">Vêtements</h3>
                                </div>
                            </Link>
                            <Link href="/categories/technologie" className="flex items-center justify-center rounded-lg bg-gray-200 p-8">
                                <div className="text-center">
                                    <span className="text-xl">🎧</span>
                                    <h3 className="mt-2 font-medium">Technologie</h3>
                                </div>
                            </Link>
                            <Link href="/categories/loisirs" className="flex items-center justify-center rounded-lg bg-teal-100 p-8">
                                <div className="text-center">
                                    <span className="text-xl">⚽</span>
                                    <h3 className="mt-2 font-medium">Loisirs</h3>
                                </div>
                            </Link>
                            <Link href="/categories/exterieurs" className="flex items-center justify-center rounded-lg bg-purple-100 p-8">
                                <div className="text-center">
                                    <span className="text-xl">🌿</span>
                                    <h3 className="mt-2 font-medium">Extérieurs</h3>
                                </div>
                            </Link>
                            <Link href="/categories" className="flex items-center justify-center rounded-lg bg-blue-100 p-8">
                                <div className="text-center">
                                    <span className="text-xl">🔍</span>
                                    <h3 className="mt-2 font-medium">Toutes les catégories</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Les derniers arrivages section */}
                <section className="py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                        <div className="mb-12 flex items-center justify-between">
                            <div>
                                <h2 className="font-bold text-3xl">Les derniers arrivages</h2>
                                <p className="mt-1 text-[#6ED47C] dark:text-[#6ED47C]">Premier arrivé, premier servi !</p>
                            </div>
                            <Link
                                href="/dénicher"
                                className="flex items-center rounded bg-[#13111A] px-4 py-2 text-white dark:bg-white dark:text-[#13111A]"
                            >
                                dénicher
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-2 h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-label="Voir plus"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
                            {/* Pluie de couleurs card - order-first sur mobile, order-last sur desktop */}
                            <div className="relative order-first h-[400px] overflow-hidden rounded-lg lg:order-last lg:h-full">
                                <img
                                    src="/images/heroes/plusDeCouleur.png"
                                    alt="Formes géométriques colorées en 3D"
                                    className="absolute inset-0 h-full w-full object-cover"
                                    onError={(e) => {
                                        console.error("Erreur de chargement de l'image de fond");
                                        const imgElement = e.currentTarget;
                                        imgElement.style.display = 'none';
                                        const parentElement = imgElement.parentElement;
                                        if (parentElement && parentElement instanceof HTMLElement) {
                                            parentElement.style.background =
                                                'linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))';
                                            parentElement.style.setProperty('--tw-gradient-from', '#fef9c3');
                                            parentElement.style.setProperty('--tw-gradient-to', '#dcfce7');
                                        }
                                    }}
                                />

                                {/* Contenu centré avec fond blanc */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="mx-4 w-full max-w-[280px] rounded-lg bg-white p-6 dark:bg-[#1C1929]">
                                        <h3 className="mb-2 font-bold text-2xl dark:text-white">Pluie de couleurs</h3>
                                        <p className="mb-6 text-[#6ED47C] text-sm dark:text-[#6ED47C]">Découvrez nos produits colorés déstockés</p>
                                        <Link
                                            href="/selection"
                                            className="inline-flex items-center rounded-md bg-[#13111A] px-4 py-2 text-sm text-white dark:bg-white dark:text-[#13111A]"
                                        >
                                            voir la sélection
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="ml-2 h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-label="Voir plus"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Produits en grille 2x2 - order-last sur mobile, order-first sur desktop */}
                            <div className="order-last grid grid-cols-1 gap-6 sm:grid-cols-2 lg:order-first lg:gap-8">
                                {/* Produit 1 */}
                                <Link href="/produits/5" className="group">
                                    <MinimalCard className="relative transition-transform group-hover:scale-[1.02]">
                                        <MinimalCardImage src="/images/products/Enfilade.png" alt="Enfilade vintage en bois" className="h-[140px]" />
                                        <button
                                            type="button"
                                            className="absolute top-5 right-5 rounded-full bg-white p-1 shadow-sm dark:bg-gray-800"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-600 dark:text-gray-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-label="Favoris"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        </button>
                                        <div className="px-4 pb-4">
                                            <MinimalCardDescription className="px-0 pb-1 text-gray-500 text-xs dark:text-gray-400">
                                                Ressourcerie des biscottes (49)
                                            </MinimalCardDescription>
                                            <div className="mb-1 font-semibold text-[#6ED47C] text-xs uppercase dark:text-[#6ED47C]">MOBILIER</div>
                                            <MinimalCardTitle className="mt-0 px-0 text-base">Enfilade vintage en bois</MinimalCardTitle>
                                            <div className="mt-2 font-bold text-lg dark:text-white">33 €</div>
                                        </div>
                                    </MinimalCard>
                                </Link>

                                {/* Produit 2 */}
                                <Link href="/produits/6" className="group">
                                    <MinimalCard className="relative transition-transform group-hover:scale-[1.02]">
                                        <MinimalCardImage src="/images/products/Semainier.png" alt="Semainier en bois" className="h-[140px]" />
                                        <button
                                            type="button"
                                            className="absolute top-5 right-5 rounded-full bg-white p-1 shadow-sm dark:bg-gray-800"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-600 dark:text-gray-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-label="Favoris"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        </button>
                                        <div className="px-4 pb-4">
                                            <MinimalCardDescription className="px-0 pb-1 text-gray-500 text-xs dark:text-gray-400">
                                                La pagaille (49)
                                            </MinimalCardDescription>
                                            <div className="mb-1 font-semibold text-[#6ED47C] text-xs uppercase dark:text-[#6ED47C]">MOBILIER</div>
                                            <MinimalCardTitle className="mt-0 px-0 text-base">Semainier en bois</MinimalCardTitle>
                                            <div className="mt-2 font-bold text-lg dark:text-white">24 €</div>
                                        </div>
                                    </MinimalCard>
                                </Link>

                                {/* Produit 3 */}
                                <Link href="/produits/7" className="group">
                                    <MinimalCard className="relative transition-transform group-hover:scale-[1.02]">
                                        <MinimalCardImage src="/images/products/LotAssiette.png" alt="Lot d'assiettes" className="h-[140px]" />
                                        <button
                                            type="button"
                                            className="absolute top-5 right-5 rounded-full bg-white p-1 shadow-sm dark:bg-gray-800"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-600 dark:text-gray-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-label="Favoris"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        </button>
                                        <div className="px-4 pb-4">
                                            <MinimalCardDescription className="px-0 pb-1 text-gray-500 text-xs dark:text-gray-400">
                                                Ressourcerie des biscottes (49)
                                            </MinimalCardDescription>
                                            <div className="mb-1 font-semibold text-[#6ED47C] text-xs uppercase dark:text-[#6ED47C]">
                                                ART DE LA TABLE
                                            </div>
                                            <MinimalCardTitle className="mt-0 px-0 text-base">Lot d'assiettes</MinimalCardTitle>
                                            <div className="mt-2 font-bold text-lg dark:text-white">25 €</div>
                                        </div>
                                    </MinimalCard>
                                </Link>

                                {/* Produit 4 */}
                                <Link href="/produits/8" className="group">
                                    <MinimalCard className="relative transition-transform group-hover:scale-[1.02]">
                                        <MinimalCardImage src="/images/products/Vase.png" alt="Vase décoratif" className="h-[140px]" />
                                        <button
                                            type="button"
                                            className="absolute top-5 right-5 rounded-full bg-white p-1 shadow-sm dark:bg-gray-800"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-600 dark:text-gray-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-label="Favoris"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        </button>
                                        <div className="px-4 pb-4">
                                            <MinimalCardDescription className="px-0 pb-1 text-gray-500 text-xs dark:text-gray-400">
                                                La pagaille (49)
                                            </MinimalCardDescription>
                                            <div className="mb-1 font-semibold text-[#6ED47C] text-xs uppercase dark:text-[#6ED47C]">DÉCORATION</div>
                                            <MinimalCardTitle className="mt-0 px-0 text-base">Vase décoratif</MinimalCardTitle>
                                            <div className="mt-2 font-bold text-lg dark:text-white">16 €</div>
                                        </div>
                                    </MinimalCard>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Qui sommes-nous section */}
                <section className="py-16">
                    <div className="container mx-auto px-12">
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                            {/* Left side with image and statistics */}
                            <div className="relative">
                                <img
                                    src="/images/heroes/AvantBlog.png"
                                    alt="Femme souriante dans un environnement lumineux avec des plantes"
                                    className="h-[600px] w-full rotate-360 scale-x-[-1] rounded-lg object-cover"
                                    onError={(e) => {
                                        console.error("Erreur de chargement de l'image");
                                        const imgElement = e.currentTarget;
                                        imgElement.style.display = 'none';
                                        const parentElement = imgElement.parentElement;
                                        if (parentElement && parentElement instanceof HTMLElement) {
                                            parentElement.style.background = '#E7E7E7';
                                            parentElement.style.borderRadius = '0.5rem';
                                        }
                                    }}
                                />

                                {/* 269 ressourceries box */}
                                <div className="absolute top-10 right-10 rounded-lg bg-[#E0E1FF] p-6 text-center dark:bg-[#2E2640]">
                                    <div className="font-bold text-[4rem] leading-none dark:text-white">269</div>
                                    <div className="mt-1 text-base dark:text-white">ressourceries</div>
                                </div>

                                {/* 28 lorem box */}
                                <div className="absolute right-10 bottom-10 rounded-lg bg-[#FF9980] p-6 text-center dark:bg-[#FF7961]">
                                    <div className="font-bold text-[4rem] leading-none dark:text-white">28</div>
                                    <div className="mt-1 text-base dark:text-white">lorem</div>
                                </div>
                            </div>

                            {/* Right side with text content */}
                            <div className="space-y-6">
                                <h2 className="font-bold text-4xl dark:text-white">Qui sommes-nous ?</h2>
                                <p className="text-[#6ED47C] dark:text-[#6ED47C]">
                                    Notre but est de remettre sur le devant de la scène les produits cachés dans les ressourceries près de chez vous.
                                </p>
                                <div className="space-y-4 text-gray-900 dark:text-gray-300">
                                    <p>
                                        Pivot a été créé en 2024 pour permettre à chacun d'acheter les plus belles pièces uniques de seconde main.
                                        Chaque jour, marchands professionnels proposent sur Pivot leurs meubles vintage, livres, vêtements, tout
                                        articles... Les prix affichés sont fixés par ces vendeurs et Pivot opère en tant qu'intermédiaire et tiers de
                                        confiance auprès d'eux et des acheteurs. Ces derniers peuvent ainsi dénicher parmi les références de Pivot la
                                        perle rare sans bouger de leur canapé. Les pièces proposées à la vente sont quant à elles quotidiennement
                                        sélectionnées à la main par nos équipes.
                                    </p>
                                </div>

                                <Link
                                    href="/a-propos"
                                    className="inline-flex items-center rounded bg-[#13111A] px-6 py-3 text-white hover:bg-[#13111A]/90 dark:bg-white dark:text-black"
                                >
                                    en savoir plus
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-2 h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-label="Voir plus"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* L'actu' ressourcé section */}
                <section className="py-12">
                    <div className="container mx-auto px-12">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h2 className="font-bold text-3xl dark:text-white">L'actu' ressourcé</h2>
                                <p className="mt-1 text-[#6ED47C] dark:text-[#6ED47C]">
                                    insertion professionnelles, idées déco, témoignages, arrivages, Pivot aide les ressourceries à communiquer.
                                </p>
                            </div>
                            <Link
                                href="/actualites"
                                className="flex items-center rounded bg-[#13111A] px-4 py-2 text-white dark:bg-white dark:text-[#13111A]"
                            >
                                toutes les actualités
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-2 h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-label="Voir plus"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {/* Article 1 - Principal */}
                            <div className="col-span-1 overflow-hidden rounded-lg bg-white md:col-span-2 lg:col-span-1 dark:bg-[#1C1929]">
                                <div className="h-[250px] w-full">
                                    <img src="/images/Article1.png" alt="Objets vintage de cuisine" className="h-full w-full object-cover" />
                                </div>
                                <div className="p-6">
                                    <div className="text-gray-500 text-sm dark:text-gray-400">24/09/2024</div>
                                    <h3 className="mt-2 font-semibold text-gray-900 text-lg dark:text-white">
                                        Comment meubler son intérieur avec du seconde main ?
                                    </h3>
                                    <Link
                                        href="/articles/meubler-seconde-main"
                                        className="mt-4 flex items-center font-medium text-[#6ED47C] text-sm dark:text-[#6ED47C]"
                                    >
                                        LIRE L'ARTICLE
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-1 h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-label="Voir plus"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Article 2 - Principal */}
                            <div className="col-span-1 overflow-hidden rounded-lg bg-white md:col-span-2 lg:col-span-1 dark:bg-[#1C1929]">
                                <div className="h-[250px] w-full">
                                    <img src="/images/Article2.png" alt="Personne dans une ressourcerie" className="h-full w-full object-cover" />
                                </div>
                                <div className="p-6">
                                    <div className="text-gray-500 text-sm dark:text-gray-400">24/09/2024</div>
                                    <h3 className="mt-2 font-semibold text-gray-900 text-lg dark:text-white">
                                        Focus ressourcerie : Rencontre avec des passionnés du réemploi
                                    </h3>
                                    <Link
                                        href="/articles/focus-ressourcerie"
                                        className="mt-4 flex items-center font-medium text-[#6ED47C] text-sm dark:text-[#6ED47C]"
                                    >
                                        LIRE L'ARTICLE
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-1 h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-label="Voir plus"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Liste des articles secondaires */}
                            <div className="col-span-1 space-y-4 md:col-span-2 lg:col-span-1">
                                {/* Article secondaire 1 */}
                                <div className="rounded-lg bg-white p-4 dark:bg-[#1C1929]">
                                    <div className="text-gray-500 text-xs dark:text-gray-400">24/09/2024</div>
                                    <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">
                                        Consommer responsable : Pourquoi acheter d'occasion ?
                                    </h3>
                                    <Link
                                        href="/articles/consommer-responsable"
                                        className="mt-2 flex items-center font-medium text-[#6ED47C] text-sm dark:text-[#6ED47C]"
                                    >
                                        LIRE L'ARTICLE →
                                    </Link>
                                </div>

                                {/* Article secondaire 2 */}
                                <div className="rounded-lg bg-white p-4 dark:bg-[#1C1929]">
                                    <div className="text-gray-500 text-xs dark:text-gray-400">24/09/2024</div>
                                    <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">Des meubles vintage et du déco seconde main</h3>
                                    <Link
                                        href="/articles/selection-mois"
                                        className="mt-2 flex items-center font-medium text-[#6ED47C] text-sm dark:text-[#6ED47C]"
                                    >
                                        LIRE L'ARTICLE →
                                    </Link>
                                </div>

                                {/* Article secondaire 3 */}
                                <div className="rounded-lg bg-white p-4 dark:bg-[#1C1929]">
                                    <div className="text-gray-500 text-xs dark:text-gray-400">24/09/2024</div>
                                    <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">
                                        Soutenir l'économie locale en achetant d'occasion
                                    </h3>
                                    <Link
                                        href="/articles/economie-locale"
                                        className="mt-2 flex items-center font-medium text-[#6ED47C] text-sm dark:text-[#6ED47C]"
                                    >
                                        LIRE L'ARTICLE →
                                    </Link>
                                </div>

                                {/* Article secondaire 4 */}
                                <div className="rounded-lg bg-white p-4 dark:bg-[#1C1929]">
                                    <div className="text-gray-500 text-xs dark:text-gray-400">24/09/2024</div>
                                    <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">
                                        Ressourceries et recycleries : Des tremplins vers l'emploi
                                    </h3>
                                    <Link
                                        href="/articles/tremplins-emploi"
                                        className="mt-2 flex items-center font-medium text-[#6ED47C] text-sm dark:text-[#6ED47C]"
                                    >
                                        LIRE L'ARTICLE →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* La sélection du mois section */}
                <section className="py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                        <div className="rounded-3xl bg-[#E0E1FF] p-4 sm:p-8 lg:p-12 dark:bg-[#1C1929]">
                            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
                                <div className="text-7xl text-white sm:text-8xl">⟳</div>
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="font-bold text-2xl text-gray-900 sm:text-3xl dark:text-gray-100">La sélection du mois</h2>
                                    <p className="mt-4 max-w-2xl text-gray-700 text-sm sm:text-base dark:text-gray-300">
                                        Pivot rassemble l'ensemble de l'actualité de chaque ressourceries.
                                        <br className="hidden sm:block" />
                                        Inscrivez-vous à notre newsletter pour découvrir les pépites de nos boutiques.
                                    </p>
                                </div>
                                <div className="w-full md:w-auto md:min-w-[320px]">
                                    <div className="flex">
                                        <input
                                            type="email"
                                            placeholder="Votre adresse mail"
                                            className="flex-1 rounded-l-lg border-0 bg-white px-4 py-3 text-sm focus:outline-none sm:px-6 sm:text-base dark:bg-[#1C1929]"
                                        />
                                        <button
                                            type="button"
                                            className="whitespace-nowrap rounded-r-lg bg-gray-100 px-4 py-3 font-medium text-sm sm:px-6 sm:text-base dark:bg-[#1C1929]"
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
