import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { router } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-[#F7F7F7] text-gray-900">
                {/* Header/Navigation */}
                <header className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
                        {/* Logo */}
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center">
                                <img 
                                    src="/images/logoPivot.png" 
                                    alt="Logo Pivot" 
                                    className="h-8"
                                    onError={(e) => {
                                        console.error("Erreur de chargement du logo");
                                        const imgElement = e.currentTarget;
                                        imgElement.style.display = 'none';
                                        const textFallback = document.createElement('span');
                                        textFallback.className = 'text-[#6ED47C] font-bold text-3xl';
                                        textFallback.textContent = 'pivot';
                                        if (imgElement.parentElement) {
                                            imgElement.parentElement.appendChild(textFallback);
                                        }
                                    }}
                                />
                            </Link>
                            {/* Mobile menu button */}
                            <button className="md:hidden p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="text-gray-800 hover:text-gray-600">Accueil</Link>
                            <Link href="/categories" className="text-gray-800 hover:text-gray-600">Catégorie</Link>
                            <Link href="/ressourceries" className="text-gray-800 hover:text-gray-600">Ressourcerie</Link>
                            <Link href="/notre-histoire" className="text-gray-800 hover:text-gray-600">Notre histoire</Link>
                        </nav>
                        
                        {/* Action buttons */}
                        <div className="flex items-center justify-between md:justify-end space-x-6">
                            <Link href="/pivot-pro" className="px-4 py-2 bg-black text-white rounded text-sm md:text-base">
                                Pivot Pro
                            </Link>
                            
                            {/* User nav icons */}
                            <div className="flex items-center space-x-4">
                                <Link href="/angers" className="hidden md:flex items-center text-gray-700">
                                    <span>Angers</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                                <div className="flex space-x-4">
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
                                    {auth.user ? (
                                        <Link href="/profile">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </Link>
                                    ) : (
                                        <Link 
                                            href="/login" 
                                            className="px-4 py-2 bg-[#6ED47C] text-white rounded hover:bg-[#5CBD6A] transition-colors text-sm md:text-base"
                                        >
                                            Se connecter
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main>{children}</main>

                {/* Footer */}
                <footer className="bg-[#0A1A1B] text-white py-12">
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
                                            console.error("Erreur de chargement du logo");
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
                                    La marketplace<br />
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
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="font-semibold mb-4">Catégories</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li><Link href="/categories/art-de-la-table" className="hover:text-white">Art de la table</Link></li>
                                    <li><Link href="/categories/mobilier" className="hover:text-white">Mobilier</Link></li>
                                    <li><Link href="/categories/librairie" className="hover:text-white">Librairie</Link></li>
                                    <li><Link href="/categories/vetements" className="hover:text-white">Vêtements</Link></li>
                                    <li><Link href="/categories/technologie" className="hover:text-white">Technologie</Link></li>
                                    <li><Link href="/categories/exterieurs" className="hover:text-white">Extérieurs</Link></li>
                                    <li><Link href="/categories/loisirs" className="hover:text-white">Loisirs</Link></li>
                                </ul>
                            </div>

                            {/* À propos */}
                            <div>
                                <h3 className="font-semibold mb-4">À propos</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li><Link href="/qui-sommes-nous" className="hover:text-white">Qui sommes nous ?</Link></li>
                                    <li><Link href="/les-ressourceries" className="hover:text-white">Les ressourceries</Link></li>
                                </ul>
                            </div>

                            {/* Besoin d'aide ? */}
                            <div>
                                <h3 className="font-semibold mb-4">Besoin d'aide ?</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                                    <li><Link href="/contact" className="hover:text-white">Nous contacter</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Legal links */}
                        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
                            <div>© 2023, l'agence Pivot.</div>
                            <div className="mt-4 md:mt-0 space-x-4">
                                <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
                                <Link href="/conditions" className="hover:text-white">Conditions générales d'utilisations</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
} 