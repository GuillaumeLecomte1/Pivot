import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Home() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Pivot - La marketplace des ressourceries françaises">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-white text-gray-900">
                {/* Header/Navigation */}
                <header className="container mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="text-[#6ED47C] font-bold text-3xl">
                            pivot
                        </Link>
                    </div>
                    
                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-800 hover:text-gray-600">
                            Accueil
                        </Link>
                        <Link href="/categorie" className="text-gray-800 hover:text-gray-600">
                            Catégorie
                        </Link>
                        <Link href="/ressourcerie" className="text-gray-800 hover:text-gray-600">
                            Ressourcerie
                        </Link>
                        <Link href="/notre-histoire" className="text-gray-800 hover:text-gray-600">
                            Notre histoire
                        </Link>
                    </nav>
                    
                    {/* Action buttons */}
                    <div className="flex items-center space-x-6">
                        <Link href="/pivot-pro" className="px-4 py-2 bg-black text-white rounded">
                            Pivot Pro
                        </Link>
                        
                        {/* User nav icons */}
                        <div className="flex items-center space-x-4">
                            <Link href="/angers" className="flex items-center text-gray-700">
                                <span>Angers</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <Link href="/favoris">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </Link>
                            <Link href="/panier">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </Link>
                            <Link href={auth.user ? '/dashboard' : '/login'}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Hero section - gray background */}
                <section className="bg-gray-100 py-12 pb-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div className="space-y-6">
                                <h1 className="text-5xl font-bold leading-tight">
                                    La marketplace<br />
                                    <span className="text-[#FF7961]">des ressourceries</span><br />
                                    françaises
                                </h1>
                                <p className="text-lg">
                                    Donner une seconde vie aux produits dénichés, ça vaut le coût ! Pivot, est 
                                    la première plateforme de <span className="text-[#6ED47C] font-medium">click-and-collect</span> dédiée aux ressourceries en 
                                    France !
                                </p>
                                
                                <div className="flex border-t border-b border-gray-300 py-5">
                                    <div className="pr-12 border-r border-gray-300">
                                        <div className="text-3xl font-bold text-[#6ED47C]">1050+</div>
                                        <div className="text-sm">Produits dénichés</div>
                                    </div>
                                    <div className="pl-12">
                                        <div className="text-3xl font-bold text-[#6ED47C]">100+</div>
                                        <div className="text-sm">Ressourceries</div>
                                    </div>
                                </div>
                                
                                {/* Search box */}
                                <div className="flex w-full max-w-md border rounded-md overflow-hidden bg-white shadow-sm">
                                    <input 
                                        type="text" 
                                        placeholder="Que recherchez-vous ?" 
                                        className="flex-1 px-4 py-3 focus:outline-none"
                                    />
                                    <div className="px-3 py-3 border-l flex items-center bg-white">
                                        <span>Angers</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <button className="bg-white px-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Hero image */}
                            <div className="border-4 border-[#6ED47C] rounded-lg overflow-hidden">
                                <div className="bg-yellow-100 h-[400px] flex items-center justify-center">
                                    {/* Placeholder for the product image from screenshot */}
                                    <div className="flex flex-col items-center justify-center p-8">
                                        <div className="bg-yellow-400 w-20 h-24 rounded-t-lg mb-4"></div>
                                        <div className="bg-blue-500 w-32 h-32 mb-2"></div>
                                        <div className="bg-orange-500 w-12 h-12 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ressourceries section */}
                <section className="py-10 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold">Les ressourceries digitalisées</h2>
                                <p className="text-[#6ED47C] mt-2">Retrouvez toutes les annonces des ressourceries près de chez vous !</p>
                            </div>
                            <button className="mt-4 md:mt-0 px-4 py-2 border border-black bg-black text-white rounded flex items-center self-start md:self-auto">
                                afficher la carte
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Logo grid */}
                        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 mt-8">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="bg-white p-4 rounded-md flex items-center justify-center h-16 shadow-sm">
                                    <span className="text-gray-300 font-bold">LOGO</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
} 