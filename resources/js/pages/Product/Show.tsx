import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { MinimalCard } from '@/components/ui/minimal-card';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    ressourcerie: {
        name: string;
        location: string;
        phone?: string;
    };
    category: string;
    condition: string;
    dimensions?: string;
    material?: string;
    created_at: string;
}

interface ProductPageProps {
    product: Product;
    relatedProducts?: Product[];
}

export default function ProductShow({ product, relatedProducts = [] }: ProductPageProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const currentImage = product.images[selectedImageIndex] || '/images/products/placeholder.png';

    return (
        <AppLayout>
            <Head title={`${product.name} - Pivot`} />

            <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-12">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center space-x-2 text-gray-600 text-sm dark:text-gray-400">
                    <Link href="/" className="hover:text-[#6ED47C]">
                        Accueil
                    </Link>
                    <span>/</span>
                    <Link href="/catalogue" className="hover:text-[#6ED47C]">
                        Catalogue
                    </Link>
                    <span>/</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-16">
                    {/* Galerie d'images */}
                    <div className="space-y-4">
                        {/* Image principale */}
                        <div className="aspect-square overflow-hidden rounded-3xl bg-white shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)] dark:bg-neutral-800 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]">
                            <img
                                src={currentImage}
                                alt={product.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/images/products/placeholder.png';
                                }}
                            />
                        </div>

                        {/* Miniatures */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-3 gap-3">
                                {product.images.slice(0, 3).map((image, index) => (
                                    <button
                                        key={`image-${index}-${image}`}
                                        type="button"
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`aspect-square overflow-hidden rounded-2xl transition-all ${
                                            selectedImageIndex === index
                                                ? 'ring-2 ring-[#6ED47C] ring-offset-2 ring-offset-[#F7F7F7] dark:ring-offset-[#13111A]'
                                                : 'opacity-70 hover:opacity-100'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} - Vue ${index + 1}`}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/images/products/placeholder.png';
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Informations produit */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="rounded-full bg-[#6ED47C]/10 px-3 py-1 font-medium text-[#6ED47C] text-sm">{product.category}</span>
                                <button
                                    type="button"
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className="rounded-full bg-white p-2 shadow-sm transition-colors hover:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`}
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
                            </div>
                            <h1 className="font-bold text-3xl text-gray-900 md:text-4xl dark:text-white">{product.name}</h1>
                            <p className="mt-2 font-bold text-2xl text-[#6ED47C]">{product.price.toFixed(2)} €</p>
                        </div>

                        {/* Ressourcerie */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-800">
                            <h3 className="mb-2 font-semibold text-lg dark:text-white">Vendu par</h3>
                            <div className="flex items-center space-x-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6ED47C]/10">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-[#6ED47C]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{product.ressourcerie.name}</p>
                                    <p className="text-gray-600 text-sm dark:text-gray-400">{product.ressourcerie.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Caractéristiques */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-800">
                            <h3 className="mb-4 font-semibold text-lg dark:text-white">Caractéristiques</h3>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <span className="font-medium text-gray-900 text-sm dark:text-white">État :</span>
                                    <span className="ml-2 text-gray-600 text-sm dark:text-gray-400">{product.condition}</span>
                                </div>
                                {product.dimensions && (
                                    <div>
                                        <span className="font-medium text-gray-900 text-sm dark:text-white">Dimensions :</span>
                                        <span className="ml-2 text-gray-600 text-sm dark:text-gray-400">{product.dimensions}</span>
                                    </div>
                                )}
                                {product.material && (
                                    <div>
                                        <span className="font-medium text-gray-900 text-sm dark:text-white">Matériau :</span>
                                        <span className="ml-2 text-gray-600 text-sm dark:text-gray-400">{product.material}</span>
                                    </div>
                                )}
                                <div>
                                    <span className="font-medium text-gray-900 text-sm dark:text-white">Publié le :</span>
                                    <span className="ml-2 text-gray-600 text-sm dark:text-gray-400">
                                        {new Date(product.created_at).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-800">
                            <h3 className="mb-4 font-semibold text-lg dark:text-white">Description</h3>
                            <p className="text-gray-700 leading-relaxed dark:text-gray-300">{product.description}</p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                type="button"
                                className="w-full rounded-xl bg-[#6ED47C] py-4 font-semibold text-white transition-colors hover:bg-[#5bc26b] dark:text-black"
                            >
                                Contacter la ressourcerie
                            </button>
                            {product.ressourcerie.phone && (
                                <a
                                    href={`tel:${product.ressourcerie.phone}`}
                                    className="block w-full rounded-xl border-2 border-gray-300 py-4 text-center font-semibold text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:border-gray-500 dark:hover:bg-neutral-800"
                                >
                                    Appeler : {product.ressourcerie.phone}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Produits similaires */}
                {relatedProducts.length > 0 && (
                    <section className="mt-16">
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="font-bold text-2xl text-gray-900 md:text-3xl dark:text-white">Produits similaires</h2>
                            <Link href="/catalogue" className="flex items-center text-[#6ED47C] hover:underline">
                                Voir tout
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

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {relatedProducts.slice(0, 4).map((relatedProduct) => (
                                <Link key={relatedProduct.id} href={`/produits/${relatedProduct.id}`} className="group">
                                    <MinimalCard className="relative transition-transform group-hover:scale-[1.02]">
                                        <div className="aspect-square overflow-hidden rounded-[20px] bg-neutral-100 dark:bg-neutral-700">
                                            <img
                                                src={relatedProduct.images[0] || '/images/products/placeholder.png'}
                                                alt={relatedProduct.name}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/images/products/placeholder.png';
                                                }}
                                            />
                                        </div>
                                        <div className="p-4">
                                            <p className="mb-1 text-gray-500 text-xs dark:text-gray-400">{relatedProduct.ressourcerie.name}</p>
                                            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{relatedProduct.name}</h3>
                                            <p className="font-bold text-[#6ED47C]">{relatedProduct.price.toFixed(2)} €</p>
                                        </div>
                                    </MinimalCard>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </AppLayout>
    );
}
