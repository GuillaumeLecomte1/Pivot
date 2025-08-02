import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { MinimalCard } from '@/components/ui/minimal-card';

interface CartItem {
    id: number;
    product_id: number;
    product_name: string;
    product_description?: string;
    product_price: number;
    product_image?: string;
    ressourcerie_name: string;
    ressourcerie_location: string;
    quantity: number;
    total_price: number;
    formatted_price: string;
    formatted_total: string;
}

interface Cart {
    id: number;
    items: CartItem[];
    total_amount: number;
    total_items: number;
    formatted_total: string;
}

interface CartPageProps {
    cart?: Cart;
}

export default function CartIndex({ cart }: CartPageProps) {
    const [isLoading, setIsLoading] = useState(false);

    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity < 1 || quantity > 10) return;

        setIsLoading(true);
        router.put(
            `/panier/items/${itemId}`,
            { quantity },
            {
                onFinish: () => setIsLoading(false),
            },
        );
    };

    const removeItem = (itemId: number) => {
        setIsLoading(true);
        router.delete(`/panier/items/${itemId}`, {
            onFinish: () => setIsLoading(false),
        });
    };

    const clearCart = () => {
        if (!confirm('Êtes-vous sûr de vouloir vider votre panier ?')) return;

        setIsLoading(true);
        router.delete('/panier/vider', {
            onFinish: () => setIsLoading(false),
        });
    };

    if (!cart || cart.items.length === 0) {
        return (
            <AppLayout>
                <Head title="Mon Panier - Pivot" />

                <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-12">
                    <div className="text-center">
                        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m8.5-5v6a1 1 0 01-1 1H9a1 1 0 01-1-1v-6m8 0V9a1 1 0 00-1-1H9a1 1 0 00-1 1v4.01"
                                />
                            </svg>
                        </div>
                        <h1 className="mb-4 font-bold text-2xl text-gray-900 md:text-3xl dark:text-white">Votre panier est vide</h1>
                        <p className="mb-8 text-gray-600 dark:text-gray-400">
                            Découvrez nos produits uniques sélectionnés dans les ressourceries partenaires
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center rounded-xl bg-[#6ED47C] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#5bc26b] dark:text-black"
                        >
                            Découvrir nos produits
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </div>
                </main>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title={`Mon Panier (${cart.total_items}) - Pivot`} />

            <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-12">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="font-bold text-2xl text-gray-900 md:text-3xl dark:text-white">Mon Panier</h1>
                        <p className="mt-1 text-gray-600 text-sm dark:text-gray-400">
                            {cart.total_items} article{cart.total_items > 1 ? 's' : ''} dans votre panier
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={clearCart}
                        disabled={isLoading}
                        className="rounded-lg px-4 py-2 text-red-600 text-sm transition-colors hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                        Vider le panier
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Items list */}
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            {cart.items.map((item) => (
                                <MinimalCard key={item.id} className="p-6">
                                    <div className="flex gap-6">
                                        {/* Product image */}
                                        <div className="flex-shrink-0">
                                            <div className="h-24 w-24 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-700">
                                                <img
                                                    src={item.product_image || '/images/products/placeholder.png'}
                                                    alt={item.product_name}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = '/images/products/placeholder.png';
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Product info */}
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div>
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                                            <Link href={`/produits/${item.product_id}`} className="hover:text-[#6ED47C]">
                                                                {item.product_name}
                                                            </Link>
                                                        </h3>
                                                        <p className="mt-1 text-gray-600 text-sm dark:text-gray-400">
                                                            {item.ressourcerie_name} • {item.ressourcerie_location}
                                                        </p>
                                                        {item.product_description && (
                                                            <p className="mt-2 text-gray-700 text-sm leading-relaxed dark:text-gray-300">
                                                                {item.product_description.length > 100
                                                                    ? `${item.product_description.substring(0, 100)}...`
                                                                    : item.product_description}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        disabled={isLoading}
                                                        className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                                                        aria-label="Supprimer du panier"
                                                    >
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
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center justify-between">
                                                {/* Quantity controls */}
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-gray-600 text-sm dark:text-gray-400">Quantité :</span>
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={isLoading || item.quantity <= 1}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-neutral-800"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>

                                                        <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            disabled={isLoading || item.quantity >= 10}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-neutral-800"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <p className="font-bold text-[#6ED47C]">{item.formatted_total}</p>
                                                    {item.quantity > 1 && (
                                                        <p className="text-gray-500 text-sm dark:text-gray-400">{item.formatted_price} / unité</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </MinimalCard>
                            ))}
                        </div>
                    </div>

                    {/* Order summary */}
                    <div className="lg:sticky lg:top-8">
                        <MinimalCard className="p-6">
                            <h2 className="mb-4 font-semibold text-gray-900 text-lg dark:text-white">Résumé de la commande</h2>

                            <div className="space-y-3 border-gray-200 border-b pb-4 dark:border-gray-700">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Sous-total ({cart.total_items} article{cart.total_items > 1 ? 's' : ''})
                                    </span>
                                    <span className="font-medium text-gray-900 dark:text-white">{cart.formatted_total}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Livraison</span>
                                    <span className="font-medium text-[#6ED47C]">Click & Collect</span>
                                </div>
                            </div>

                            <div className="flex justify-between py-4 font-semibold text-lg">
                                <span className="text-gray-900 dark:text-white">Total</span>
                                <span className="text-[#6ED47C]">{cart.formatted_total}</span>
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="button"
                                    disabled={isLoading}
                                    className="w-full rounded-xl bg-[#6ED47C] py-4 font-semibold text-white transition-colors hover:bg-[#5bc26b] disabled:opacity-50 dark:text-black"
                                >
                                    Contacter les ressourceries
                                </button>

                                <Link
                                    href="/"
                                    className="block w-full rounded-xl border-2 border-gray-300 py-4 text-center font-semibold text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:border-gray-500 dark:hover:bg-neutral-800"
                                >
                                    Continuer mes achats
                                </Link>
                            </div>

                            <div className="mt-6 rounded-lg bg-[#6ED47C]/10 p-4">
                                <div className="flex items-start space-x-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mt-0.5 h-5 w-5 text-[#6ED47C]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <div>
                                        <p className="font-medium text-[#6ED47C] text-sm">Click & Collect</p>
                                        <p className="mt-1 text-gray-700 text-xs dark:text-gray-600">
                                            Récupérez vos achats directement dans les ressourceries partenaires
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </MinimalCard>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
