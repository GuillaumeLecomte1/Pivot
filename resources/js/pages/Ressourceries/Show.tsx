import { Head } from '@inertiajs/react';
import { ArrowLeft, Mail, MapPin, Package, Phone, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';

interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number;
    image_url: string | null;
    category: string | null;
    condition: string | null;
}

interface Ressourcerie {
    id: number;
    name: string;
    address: string;
    city: string;
    department: string;
    postal_code: string;
    description: string | null;
    image_url: string | null;
    phone: string | null;
    email: string | null;
    products: Product[];
}

interface Props {
    ressourcerie: Ressourcerie;
}

export default function RessourcerieShow({ ressourcerie }: Props) {
    const [cartNotification, setCartNotification] = useState<string | null>(null);

    const handleAddToCart = (productName: string) => {
        setCartNotification(`${productName} ajouté au panier !`);
        setTimeout(() => setCartNotification(null), 3000);
    };

    return (
        <AppLayout>
            <Head title={`${ressourcerie.name} - Pivot`} />

            {cartNotification && (
                <div className="fixed top-20 right-4 z-50 animate-fade-in rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg">
                    {cartNotification}
                </div>
            )}

            <div className="container mx-auto px-4 py-12">
                {/* Back link */}
                <a
                    href={`/departements/${ressourcerie.department}/ressourceries`}
                    className="mb-6 inline-flex items-center gap-1 text-muted-foreground text-sm hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Retour aux ressourceries
                </a>

                {/* Header */}
                <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <div className="overflow-hidden rounded-lg bg-gray-100">
                        {ressourcerie.image_url ? (
                            <img src={ressourcerie.image_url} alt={ressourcerie.name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-64 w-full items-center justify-center bg-gray-100">
                                <MapPin className="h-16 w-16 text-gray-300" />
                            </div>
                        )}
                    </div>

                    <div>
                        <h1 className="mb-4 font-bold text-4xl">{ressourcerie.name}</h1>

                        {ressourcerie.description && <p className="mb-6 text-muted-foreground">{ressourcerie.description}</p>}

                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 text-green-500" />
                                <span>
                                    {ressourcerie.address}, {ressourcerie.postal_code} {ressourcerie.city}
                                </span>
                            </div>

                            {ressourcerie.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-green-500" />
                                    <a href={`tel:${ressourcerie.phone}`} className="hover:text-green-600">
                                        {ressourcerie.phone}
                                    </a>
                                </div>
                            )}

                            {ressourcerie.email && (
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-green-500" />
                                    <a href={`mailto:${ressourcerie.email}`} className="hover:text-green-600">
                                        {ressourcerie.email}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div>
                    <div className="mb-8 flex items-center gap-2">
                        <Package className="h-6 w-6 text-green-500" />
                        <h2 className="font-bold text-2xl">Produits disponibles ({ressourcerie.products.length})</h2>
                    </div>

                    {ressourcerie.products.length === 0 ? (
                        <div className="rounded-lg bg-gray-50 py-12 text-center">
                            <p className="text-muted-foreground">Aucun produit disponible pour le moment.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {ressourcerie.products.map((product) => (
                                <div key={product.id} className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
                                    <div className="relative h-48 bg-gray-100">
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                                <Package className="h-12 w-12 text-gray-300" />
                                            </div>
                                        )}
                                        {product.category && (
                                            <span className="absolute top-2 left-2 rounded bg-white/90 px-2 py-1 font-medium text-xs">
                                                {product.category}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <h3 className="mb-1 line-clamp-1 font-semibold">{product.name}</h3>

                                        {product.condition && <p className="mb-2 text-muted-foreground text-xs">{product.condition}</p>}

                                        {product.description && (
                                            <p className="mb-3 line-clamp-2 text-muted-foreground text-sm">{product.description}</p>
                                        )}

                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="font-bold text-green-600 text-lg">{product.price.toFixed(2)} €</span>

                                            <button
                                                type="button"
                                                onClick={() => handleAddToCart(product.name)}
                                                className="inline-flex items-center gap-1 rounded bg-green-500 px-3 py-1.5 font-medium text-sm text-white transition-colors hover:bg-green-600"
                                            >
                                                <ShoppingCart className="h-4 w-4" />
                                                Ajouter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
