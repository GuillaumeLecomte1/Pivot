import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/ressourcerie/dashboard',
    },
];

interface Product {
    id: number;
    name: string;
    description: string | null;
    price: string;
    image_url: string | null;
    category: string;
    condition: string;
    is_available: boolean;
    created_at: string;
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
}

interface Props {
    ressourcerie: Ressourcerie;
    products: Product[];
}

export default function RessourcerieDashboard({ ressourcerie, products }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${ressourcerie.name} - Tableau de bord`} />

            <div className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="mb-2 font-bold text-4xl">Tableau de bord</h1>
                    <p className="text-lg text-muted-foreground">Bienvenue, {ressourcerie.name}</p>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <p className="mb-1 text-muted-foreground text-sm">Mes produits</p>
                        <p className="font-bold text-3xl">{products.length}</p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <p className="mb-1 text-muted-foreground text-sm">Département</p>
                        <p className="font-bold text-3xl">{ressourcerie.department}</p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <p className="mb-1 text-muted-foreground text-sm">Ville</p>
                        <p className="font-bold text-xl">{ressourcerie.city}</p>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 font-semibold text-xl">Mes produits</h2>
                    {products.length === 0 ? (
                        <p className="text-muted-foreground">Aucun produit pour le moment.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <div key={product.id} className="rounded-lg border p-4">
                                    <div className="mb-2 h-32 bg-gray-100">
                                        {product.image_url ? (
                                            <img src={product.image_url} alt={product.name} className="h-full w-full rounded object-cover" />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-gray-400">Pas d'image</div>
                                        )}
                                    </div>
                                    <h3 className="mb-1 font-semibold">{product.name}</h3>
                                    <p className="mb-2 font-medium text-green-600">{product.price} €</p>
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        <span className="rounded bg-gray-100 px-2 py-1">{product.category}</span>
                                        <span className="rounded bg-gray-100 px-2 py-1">{product.condition}</span>
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
