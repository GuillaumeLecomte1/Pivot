import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { ProductForm } from '@/components/ProductForm';
import { ProductList, type ProductListItem } from '@/components/ProductList';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { ProductInput } from '@/lib/schemas/ProductSchema';
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
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Convert Product[] to ProductListItem[] for ProductList
    const productListItems: ProductListItem[] = products.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        image_url: p.image_url,
        category: p.category,
        condition: p.condition,
        is_available: p.is_available,
        created_at: p.created_at,
    }));

    const handleAddProduct = async (data: ProductInput) => {
        setIsLoading(true);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de la création du produit');
            }

            // Close the form on success
            setIsAddFormOpen(false);

            // Reload the page to get the updated products list
            window.location.reload();
        } catch (error) {
            console.error('Error adding product:', error);
            alert(error instanceof Error ? error.message : 'Erreur lors de la création du produit');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditProduct = async (product: ProductListItem, data: ProductInput) => {
        setIsLoading(true);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(`/api/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de la modification du produit');
            }

            // Reload the page to get the updated products list
            window.location.reload();
        } catch (error) {
            console.error('Error editing product:', error);
            alert(error instanceof Error ? error.message : 'Erreur lors de la modification du produit');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        setIsLoading(true);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de la suppression du produit');
            }

            // Reload the page to get the updated products list
            window.location.reload();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert(error instanceof Error ? error.message : 'Erreur lors de la suppression du produit');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${ressourcerie.name} - Tableau de bord`} />

            <div className="container mx-auto px-4 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="mb-2 font-bold text-4xl">Tableau de bord</h1>
                        <p className="text-lg text-muted-foreground">Bienvenue, {ressourcerie.name}</p>
                    </div>
                    <Button onClick={() => setIsAddFormOpen(true)} className="bg-green-600 hover:bg-green-700">
                        Ajouter un produit
                    </Button>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-neutral-800">
                        <p className="mb-1 text-muted-foreground text-sm">Mes produits</p>
                        <p className="font-bold text-3xl">{products.length}</p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-neutral-800">
                        <p className="mb-1 text-muted-foreground text-sm">Département</p>
                        <p className="font-bold text-3xl">{ressourcerie.department}</p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-neutral-800">
                        <p className="mb-1 text-muted-foreground text-sm">Ville</p>
                        <p className="font-bold text-xl">{ressourcerie.city}</p>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow dark:bg-neutral-800">
                    <h2 className="mb-4 font-semibold text-xl">Mes produits</h2>
                    <ProductList products={productListItems} onEdit={handleEditProduct} onDelete={handleDeleteProduct} isLoading={isLoading} />
                </div>

                {/* Add Product Dialog */}
                {isAddFormOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="font-semibold text-xl">Ajouter un produit</h2>
                                <button onClick={() => setIsAddFormOpen(false)} className="text-muted-foreground hover:text-foreground" type="button">
                                    ✕
                                </button>
                            </div>
                            <ProductForm
                                onSubmit={handleAddProduct}
                                onCancel={() => setIsAddFormOpen(false)}
                                submitLabel="Ajouter le produit"
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
