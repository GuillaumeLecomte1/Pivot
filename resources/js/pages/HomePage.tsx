import { Head, Link, usePage } from '@inertiajs/react';
import MainNavbar from '@/components/MainNavbar';
import { MinimalCard, MinimalCardDescription, MinimalCardImage, MinimalCardTitle } from '@/components/ui/minimal-card';
import type { SharedData } from '@/types';

export default function HomePage() {
    const { auth } = usePage<SharedData>().props;

    const LogoItem = () => (
        <div className="p-3 sm:p-4  sm:h-16">
            <img
                src="/images/logoPivot.png"
                alt="Logo Pivot"
                className="h-6 sm:h-8 w-auto"
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
        <>
            <Head title="Pivot - La marketplace des ressourceries françaises">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-white dark:bg-gray-900">
                {/* Header/Navigation */}
                <MainNavbar />

                {/* Hero section */}
                <section className="py-8 md:py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                        <div className="bg-[#E7E7E7] dark:bg-[#2E2640] rounded-3xl p-6 md:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                                <div className="space-y-6">
                                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                        La marketplace
                                        <br />
                                        <span className="text-[#FF7961] dark:text-[#FF7961]">des ressourceries</span>
                                        <br />
                                        françaises
                                    </h1>
                                    <p className="text-base md:text-lg">
                                        Donner une seconde vie aux produits dénichés, ça vaut le coût ! Pivot, est la première plateforme de{' '}
                                        <span className="text-[#6ED47C] dark:text-[#6ED47C] font-medium">click-and-collect</span> dédiée aux
                                        ressourceries en France !
                                    </p>

                                    <div className="flex flex-col sm:flex-row border-t border-b border-gray-300 dark:border-gray-700 py-5 space-y-4 sm:space-y-0">
                                        <div className="sm:pr-12 sm:border-r border-gray-300 dark:border-gray-700">
                                            <div className="text-2xl md:text-3xl font-bold text-[#6ED47C] dark:text-[#6ED47C]">1050+</div>
                                            <div className="text-sm">Produits dénichés</div>
                                        </div>
                                        <div className="sm:pl-12">
                                            <div className="text-2xl md:text-3xl font-bold text-[#6ED47C] dark:text-[#6ED47C]">100+</div>
                                            <div className="text-sm">Ressourceries</div>
                                        </div>
                                    </div>

                                    {/* Search box */}
                                    <div className="flex w-full max-w-md bg-white dark:bg-[#1C1929] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                                        <input
                                            type="text"
                                            placeholder="Que recherchez-vous ?"
                                            className="flex-1 px-4 py-3 focus:outline-none bg-white dark:bg-[#1C1929] dark:text-white"
                                        />
                                        <div className="px-3 py-3 border-l border-gray-300 dark:border-gray-700 hidden sm:flex items-center">
                                            <span className="dark:text-white">Angers</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 ml-1 dark:text-white"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <button className="px-4 border-l border-gray-300 dark:border-gray-700 dark:text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
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
                                <div className="border-4 border-[#6ED47C] dark:border-[#6ED47C] rounded-lg overflow-hidden mt-6 lg:mt-0 h-[400px] lg:h-[500px]">
                                    <div className="bg-yellow-100 dark:bg-[#1C1929] w-full h-full">
                                        <img
                                            src="/images/heroes/HeroAccueilImage.png"
                                            alt="Objets vintage de seconde main"
                                            className="w-full h-full object-cover"
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
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold">Les ressourceries digitalisées</h2>
                                <p className="text-[#6ED47C] dark:text-[#6ED47C] mt-2">
                                    Retrouvez toutes les annonces des ressourceries près de chez vous !
                                </p>
                            </div>
                            <button className="mt-4 md:mt-0 px-4 py-2 border border-black bg-black text-white dark:bg-white dark:text-black rounded flex items-center self-start md:self-auto">
                                afficher la carte
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
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
                            <div className="flex justify-between items-center">
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
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                            {/* Left side - Text content */}
                            <div className="w-full lg:w-1/4">
                                <h2 className="text-3xl font-bold dark:text-white">
                                    Nos coups
                                    <br />
                                    de coeur
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 mt-2">
                                    Allongez la durée de vie des objets tout en faisant croître de nouvelles interactions !
                                </p>

                                <Link
                                    href="/catalogue"
                                    className="inline-flex items-center mt-4 px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded"
                                >
                                    voir le catalogue
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                                    {/* Produit 1 */}
                                    <MinimalCard className="relative">
                                        <MinimalCardImage src="/images/products/ChaiseVintage.png" alt="Chaise vintage" />
                                        <button className="absolute top-5 right-5 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-600 dark:text-gray-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
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
                                            <MinimalCardDescription className="text-xs text-gray-500 dark:text-gray-400 px-0 pb-1">
                                                Ressourcerie des biscottes (49)
                                            </MinimalCardDescription>
                                            <div className="uppercase text-xs font-semibold text-[#6ED47C] dark:text-[#6ED47C] mb-1">MOBILIER</div>
                                            <MinimalCardTitle className="px-0 mt-0">Chaise</MinimalCardTitle>
                                            <div className="font-bold text-lg mt-2 dark:text-white">15 €</div>
                                        </div>
                                    </MinimalCard>

                                    {/* Produit 2 */}
                                    <MinimalCard className="relative">
                                        <MinimalCardImage src="/images/products/Pichet.png" alt="Pichet à lait" />
                                        <button className="absolute top-5 right-5 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-600 dark:text-gray-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
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
                                            <MinimalCardDescription className="text-xs text-gray-500 dark:text-gray-400 px-0 pb-1">
                                                La pagaille (49)
                                            </MinimalCardDescription>
                                            <div className="uppercase text-xs font-semibold text-[#6ED47C] dark:text-[#6ED47C] mb-1">
                                                ART DE LA TABLE
                                            </div>
                                            <MinimalCardTitle className="px-0 mt-0">Pichet à lait</MinimalCardTitle>
                                            <div className="font-bold text-lg mt-2 dark:text-white">19 €</div>
                                        </div>
                                    </MinimalCard>

                                    {/* Produit 3 */}
                                    <MinimalCard className="relative">
                                        <MinimalCardImage src="/images/products/Couvert.png" alt="Ensemble de couverts" />
                                        <button className="absolute top-5 right-5 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-600 dark:text-gray-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
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
                                            <MinimalCardDescription className="text-xs text-gray-500 dark:text-gray-400 px-0 pb-1">
                                                Ressourcerie des biscottes (49)
                                            </MinimalCardDescription>
                                            <div className="uppercase text-xs font-semibold text-[#6ED47C] dark:text-[#6ED47C] mb-1">
                                                ART DE LA TABLE
                                            </div>
                                            <MinimalCardTitle className="px-0 mt-0 text-base leading-tight">Ensemble de couverts</MinimalCardTitle>
                                            <div className="font-bold text-lg mt-2 dark:text-white">8 €</div>
                                        </div>
                                    </MinimalCard>

                                    {/* Produit 4 */}
                                    <MinimalCard className="relative">
                                        <MinimalCardImage src="/images/products/Armoire.png" alt="Armoire" />
                                        <button className="absolute top-5 right-5 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-600 dark:text-gray-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
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
                                            <MinimalCardDescription className="text-xs text-gray-500 dark:text-gray-400 px-0 pb-1">
                                                Ressourcerie des biscottes (49)
                                            </MinimalCardDescription>
                                            <div className="uppercase text-xs font-semibold text-[#6ED47C] dark:text-[#6ED47C] mb-1">MOBILIER</div>
                                            <MinimalCardTitle className="px-0 mt-0 text-base leading-tight">Armoire</MinimalCardTitle>
                                            <div className="font-bold text-lg mt-2 dark:text-white">20 €</div>
                                        </div>
                                    </MinimalCard>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Catégories section */}
                <section className="py-12">
                    <div className="container mx-auto px-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                            <Link href="/categories/art-de-la-table" className="p-8 bg-pink-200 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <span className="text-xl">🍽️</span>
                                    <h3 className="font-medium mt-2">Art de la table</h3>
                                </div>
                            </Link>
                            <Link href="/categories/mobilier" className="p-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <span className="text-xl">🪑</span>
                                    <h3 className="font-medium mt-2">Mobilier</h3>
                                </div>
                            </Link>
                            <Link href="/categories/librairie" className="p-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <span className="text-xl">📚</span>
                                    <h3 className="font-medium mt-2">Librairie</h3>
                                </div>
                            </Link>
                            <Link href="/categories/vetements" className="p-8 bg-orange-200 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <span className="text-xl">👕</span>
                                    <h3 className="font-medium mt-2">Vêtements</h3>
                                </div>
                            </Link>
                            <Link href="/categories/technologie" className="p-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <span className="text-xl">🎧</span>
                                    <h3 className="font-medium mt-2">Technologie</h3>
                                </div>
                            </Link>
                            <Link href="/categories/loisirs" className="p-8 bg-teal-100 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <span className="text-xl">⚽</span>
                                    <h3 className="font-medium mt-2">Loisirs</h3>
                                </div>
                            </Link>
                            <Link href="/categories/exterieurs" className="p-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <span className="text-xl">🌿</span>
                                    <h3 className="font-medium mt-2">Extérieurs</h3>
                                </div>
                            </Link>
                            <Link href="/categories" className="p-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <span className="text-xl">🔍</span>
                                    <h3 className="font-medium mt-2">Toutes les catégories</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Les derniers arrivages section */}
                <section className="py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-bold">Les derniers arrivages</h2>
                                <p className="text-[#6ED47C] dark:text-[#6ED47C] mt-1">Premier arrivé, premier servi !</p>
                            </div>
                            <Link
                                href="/dénicher"
                                className="px-4 py-2 bg-[#13111A] dark:bg-white text-white dark:text-[#13111A] rounded flex items-center"
                            >
                                dénicher
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                            {/* Pluie de couleurs card - order-first sur mobile, order-last sur desktop */}
                            <div className="rounded-lg overflow-hidden relative h-[400px] lg:h-full order-first lg:order-last">
                                <img
                                    src="/images/heroes/plusDeCouleur.png"
                                    alt="Formes géométriques colorées en 3D"
                                    className="absolute inset-0 w-full h-full object-cover"
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
                                    <div className="w-full max-w-[280px] bg-white dark:bg-[#1C1929] rounded-lg p-6 mx-4">
                                        <h3 className="text-2xl font-bold mb-2 dark:text-white">Pluie de couleurs</h3>
                                        <p className="text-[#6ED47C] dark:text-[#6ED47C] text-sm mb-6">Découvrez nos produits colorés déstockés</p>
                                        <Link
                                            href="/selection"
                                            className="inline-flex items-center px-4 py-2 bg-[#13111A] dark:bg-white text-white dark:text-[#13111A] rounded-md text-sm"
                                        >
                                            voir la sélection
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 order-last lg:order-first">
                                {/* Produit 1 */}
                                <MinimalCard className="relative">
                                    <MinimalCardImage src="/images/products/Enfilade.png" alt="Enfilade vintage en bois" className="h-[140px]" />
                                    <button className="absolute top-5 right-5 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-600 dark:text-gray-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
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
                                        <MinimalCardDescription className="text-xs text-gray-500 dark:text-gray-400 px-0 pb-1">
                                            Ressourcerie des biscottes (49)
                                        </MinimalCardDescription>
                                        <div className="uppercase text-xs font-semibold text-[#6ED47C] dark:text-[#6ED47C] mb-1">MOBILIER</div>
                                        <MinimalCardTitle className="px-0 mt-0 text-base">Enfilade vintage en bois</MinimalCardTitle>
                                        <div className="font-bold text-lg mt-2 dark:text-white">33 €</div>
                                    </div>
                                </MinimalCard>

                                {/* Produit 2 */}
                                <MinimalCard className="relative">
                                    <MinimalCardImage src="/images/products/Semainier.png" alt="Semainier en bois" className="h-[140px]" />
                                    <button className="absolute top-5 right-5 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-600 dark:text-gray-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
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
                                        <MinimalCardDescription className="text-xs text-gray-500 dark:text-gray-400 px-0 pb-1">
                                            La pagaille (49)
                                        </MinimalCardDescription>
                                        <div className="uppercase text-xs font-semibold text-[#6ED47C] dark:text-[#6ED47C] mb-1">MOBILIER</div>
                                        <MinimalCardTitle className="px-0 mt-0 text-base">Semainier en bois</MinimalCardTitle>
                                        <div className="font-bold text-lg mt-2 dark:text-white">24 €</div>
                                    </div>
                                </MinimalCard>

                                {/* Produit 3 */}
                                <MinimalCard className="relative">
                                    <MinimalCardImage src="/images/products/LotAssiette.png" alt="Lot d'assiettes" className="h-[140px]" />
                                    <button className="absolute top-5 right-5 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-600 dark:text-gray-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
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
                                        <MinimalCardDescription className="text-xs text-gray-500 dark:text-gray-400 px-0 pb-1">
                                            Ressourcerie des biscottes (49)
                                        </MinimalCardDescription>
                                        <div className="uppercase text-xs font-semibold text-[#6ED47C] dark:text-[#6ED47C] mb-1">ART DE LA TABLE</div>
                                        <MinimalCardTitle className="px-0 mt-0 text-base">Lot d'assiettes</MinimalCardTitle>
                                        <div className="font-bold text-lg mt-2 dark:text-white">25 €</div>
                                    </div>
                                </MinimalCard>

                                {/* Produit 4 */}
                                <MinimalCard className="relative">
                                    <MinimalCardImage src="/images/products/Vase.png" alt="Vase décoratif" className="h-[140px]" />
                                    <button className="absolute top-5 right-5 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-600 dark:text-gray-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
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
                                        <MinimalCardDescription className="text-xs text-gray-500 dark:text-gray-400 px-0 pb-1">
                                            La pagaille (49)
                                        </MinimalCardDescription>
                                        <div className="uppercase text-xs font-semibold text-[#6ED47C] dark:text-[#6ED47C] mb-1">DÉCORATION</div>
                                        <MinimalCardTitle className="px-0 mt-0 text-base">Vase décoratif</MinimalCardTitle>
                                        <div className="font-bold text-lg mt-2 dark:text-white">16 €</div>
                                    </div>
                                </MinimalCard>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Qui sommes-nous section */}
                <section className="py-16">
                    <div className="container mx-auto px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Left side with image and statistics */}
                            <div className="relative">
                                <img
                                    src="/images/heroes/AvantBlog.png"
                                    alt="Femme souriante dans un environnement lumineux avec des plantes"
                                    className="w-full h-[600px] object-cover rounded-lg rotate-360 scale-x-[-1]"
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
                                <div className="absolute top-10 right-10 bg-[#E0E1FF] dark:bg-[#2E2640] p-6 rounded-lg text-center">
                                    <div className="text-[4rem] font-bold leading-none dark:text-white">269</div>
                                    <div className="text-base mt-1 dark:text-white">ressourceries</div>
                                </div>

                                {/* 28 lorem box */}
                                <div className="absolute bottom-10 right-10 bg-[#FF9980] dark:bg-[#FF7961] p-6 rounded-lg text-center">
                                    <div className="text-[4rem] font-bold leading-none dark:text-white">28</div>
                                    <div className="text-base mt-1 dark:text-white">lorem</div>
                                </div>
                            </div>

                            {/* Right side with text content */}
                            <div className="space-y-6">
                                <h2 className="text-4xl font-bold dark:text-white">Qui sommes-nous ?</h2>
                                <p className="text-[#6ED47C] dark:text-[#6ED47C]">
                                    Notre but est de remettre sur le devant de la scène les produits cachés dans les ressourceries près de chez vous.
                                </p>
                                <div className="text-gray-900 dark:text-gray-300 space-y-4">
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
                                    className="inline-flex items-center px-6 py-3 bg-[#13111A] dark:bg-white text-white dark:text-black rounded hover:bg-[#13111A]/90"
                                >
                                    en savoir plus
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
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
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold dark:text-white">L'actu' ressourcé</h2>
                                <p className="text-[#6ED47C] dark:text-[#6ED47C] mt-1">
                                    insertion professionnelles, idées déco, témoignages, arrivages, Pivot aide les ressourceries à communiquer.
                                </p>
                            </div>
                            <Link
                                href="/actualites"
                                className="px-4 py-2 bg-[#13111A] dark:bg-white text-white dark:text-[#13111A] rounded flex items-center"
                            >
                                toutes les actualités
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Article 1 - Principal */}
                            <div className="bg-white dark:bg-[#1C1929] rounded-lg overflow-hidden col-span-1 md:col-span-2 lg:col-span-1">
                                <div className="h-[250px] w-full">
                                    <img src="/images/Article1.png" alt="Objets vintage de cuisine" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">24/09/2024</div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mt-2 text-lg">
                                        Comment meubler son intérieur avec du seconde main ?
                                    </h3>
                                    <Link
                                        href="/articles/meubler-seconde-main"
                                        className="text-[#6ED47C] dark:text-[#6ED47C] text-sm font-medium flex items-center mt-4"
                                    >
                                        LIRE L'ARTICLE
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
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
                            <div className="bg-white dark:bg-[#1C1929] rounded-lg overflow-hidden col-span-1 md:col-span-2 lg:col-span-1">
                                <div className="h-[250px] w-full">
                                    <img src="/images/Article2.png" alt="Personne dans une ressourcerie" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">24/09/2024</div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mt-2 text-lg">
                                        Focus ressourcerie : Rencontre avec des passionnés du réemploi
                                    </h3>
                                    <Link
                                        href="/articles/focus-ressourcerie"
                                        className="text-[#6ED47C] dark:text-[#6ED47C] text-sm font-medium flex items-center mt-4"
                                    >
                                        LIRE L'ARTICLE
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
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
                            <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-4">
                                {/* Article secondaire 1 */}
                                <div className="bg-white dark:bg-[#1C1929] rounded-lg p-4">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">24/09/2024</div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mt-1">
                                        Consommer responsable : Pourquoi acheter d'occasion ?
                                    </h3>
                                    <Link
                                        href="/articles/consommer-responsable"
                                        className="text-[#6ED47C] dark:text-[#6ED47C] text-sm font-medium flex items-center mt-2"
                                    >
                                        LIRE L'ARTICLE →
                                    </Link>
                                </div>

                                {/* Article secondaire 2 */}
                                <div className="bg-white dark:bg-[#1C1929] rounded-lg p-4">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">24/09/2024</div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mt-1">Des meubles vintage et du déco seconde main</h3>
                                    <Link
                                        href="/articles/selection-mois"
                                        className="text-[#6ED47C] dark:text-[#6ED47C] text-sm font-medium flex items-center mt-2"
                                    >
                                        LIRE L'ARTICLE →
                                    </Link>
                                </div>

                                {/* Article secondaire 3 */}
                                <div className="bg-white dark:bg-[#1C1929] rounded-lg p-4">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">24/09/2024</div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mt-1">
                                        Soutenir l'économie locale en achetant d'occasion
                                    </h3>
                                    <Link
                                        href="/articles/economie-locale"
                                        className="text-[#6ED47C] dark:text-[#6ED47C] text-sm font-medium flex items-center mt-2"
                                    >
                                        LIRE L'ARTICLE →
                                    </Link>
                                </div>

                                {/* Article secondaire 4 */}
                                <div className="bg-white dark:bg-[#1C1929] rounded-lg p-4">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">24/09/2024</div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mt-1">
                                        Ressourceries et recycleries : Des tremplins vers l'emploi
                                    </h3>
                                    <Link
                                        href="/articles/tremplins-emploi"
                                        className="text-[#6ED47C] dark:text-[#6ED47C] text-sm font-medium flex items-center mt-2"
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
                        <div className="bg-[#E0E1FF] dark:bg-[#1C1929] rounded-3xl p-4 sm:p-8 lg:p-12">
                            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                                <div className="text-white text-7xl sm:text-8xl">⟳</div>
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">La sélection du mois</h2>
                                    <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-2xl text-sm sm:text-base">
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
                                            className="flex-1 px-4 sm:px-6 py-3 bg-white dark:bg-[#1C1929] rounded-l-lg focus:outline-none border-0 text-sm sm:text-base"
                                        />
                                        <button className="bg-gray-100 dark:bg-[#1C1929] px-4 sm:px-6 py-3 rounded-r-lg font-medium text-sm sm:text-base whitespace-nowrap">
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#0A1A1B] dark:bg-[#1C1929] text-white py-12">
                    <div className="container mx-auto px-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                            {/* Logo and social links */}
                            <div>
                                <div className="mb-2">
                                    <img
                                        src="/images/logoPivot.png"
                                        alt="Logo Pivot"
                                        className="h-8 brightness-0 invert"
                                        onError={(e) => {
                                            console.error('Erreur de chargement du logo');
                                            const imgElement = e.currentTarget;
                                            imgElement.style.display = 'none';
                                            const textFallback = document.createElement('span');
                                            textFallback.className = 'text-white font-bold text-3xl';
                                            textFallback.textContent = 'pivot';
                                            if (imgElement.parentElement) {
                                                imgElement.parentElement.appendChild(textFallback);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="text-sm text-gray-400 mb-4">
                                    La marketplace
                                    <br />
                                    des ressourceries françaises
                                </div>
                                <div className="flex space-x-4">
                                    <Link href="https://twitter.com/pivot" className="bg-white bg-opacity-10 p-2 rounded-full">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </Link>
                                    <Link href="https://instagram.com/pivot" className="bg-white bg-opacity-10 p-2 rounded-full">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                fillRule="evenodd"
                                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.772-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="font-semibold mb-4">Catégories</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li>
                                        <Link href="/categories/art-de-la-table" className="hover:text-white">
                                            Art de la table
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/categories/mobilier" className="hover:text-white">
                                            Mobilier
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/categories/librairie" className="hover:text-white">
                                            Librairie
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/categories/vetements" className="hover:text-white">
                                            Vêtements
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/categories/technologie" className="hover:text-white">
                                            Technologie
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/categories/exterieurs" className="hover:text-white">
                                            Extérieurs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/categories/loisirs" className="hover:text-white">
                                            Loisirs
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* À propos */}
                            <div>
                                <h3 className="font-semibold mb-4">À propos</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li>
                                        <Link href="/qui-sommes-nous" className="hover:text-white">
                                            Qui sommes nous ?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/les-ressourceries" className="hover:text-white">
                                            Les ressourceries
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Besoin d'aide ? */}
                            <div>
                                <h3 className="font-semibold mb-4">Besoin d'aide ?</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li>
                                        <Link href="/faq" className="hover:text-white">
                                            FAQ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="hover:text-white">
                                            Nous contacter
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Legal links */}
                        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
                            <div>© 2023, l'agence Pivot.</div>
                            <div className="mt-4 md:mt-0 space-x-4">
                                <Link href="/mentions-legales" className="hover:text-white">
                                    Mentions légales
                                </Link>
                                <Link href="/conditions" className="hover:text-white">
                                    Conditions générales d'utilisations
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
