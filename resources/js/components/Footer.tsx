import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-[#0A1A1B] py-12 text-white dark:bg-[#1C1929]">
            <div className="container mx-auto px-12">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
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
                        <div className="mb-4 text-gray-400 text-sm">
                            La marketplace
                            <br />
                            des ressourceries françaises
                        </div>
                        <div className="flex space-x-4">
                            <Link href="https://twitter.com/pivot" className="rounded-full bg-white bg-opacity-10 p-2">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-label="Twitter">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </Link>
                            <Link href="https://instagram.com/pivot" className="rounded-full bg-white bg-opacity-10 p-2">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-label="Instagram">
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
                        <h3 className="mb-4 font-semibold">Catégories</h3>
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
                        <h3 className="mb-4 font-semibold">À propos</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="/notre-histoire" className="hover:text-white">
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
                        <h3 className="mb-4 font-semibold">Besoin d'aide ?</h3>
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
                <div className="mt-10 flex flex-col justify-between border-gray-800 border-t pt-6 text-gray-500 text-sm md:flex-row">
                    <div>© 2023, l'agence Pivot.</div>
                    <div className="mt-4 space-x-4 md:mt-0">
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
    );
}
