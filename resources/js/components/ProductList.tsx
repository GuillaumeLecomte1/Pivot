import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { ProductForm } from '@/components/ProductForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { ProductInput } from '@/lib/schemas/ProductSchema';

/**
 * Product data structure for display in ProductList
 */
export interface ProductListItem {
    id: number;
    name: string;
    description?: string | null;
    price: number | string;
    image_url?: string | null;
    category: string;
    condition: string;
    is_available?: boolean;
    created_at?: string;
}

interface ProductListProps {
    products: ProductListItem[];
    onEdit?: (product: ProductListItem, data: ProductInput) => void;
    onDelete?: (productId: number) => void;
    isLoading?: boolean;
}

interface DeleteConfirmationProps {
    productName: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

function DeleteConfirmation({ productName, onConfirm, onCancel, isLoading = false }: DeleteConfirmationProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <p className="text-center font-medium text-lg">Supprimer le produit</p>
                <p className="text-center text-muted-foreground">
                    Êtes-vous sûr de vouloir supprimer <span className="font-semibold">"{productName}"</span> ? Cette action est irréversible.
                </p>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                    Annuler
                </Button>
                <Button type="button" variant="destructive" onClick={onConfirm} disabled={isLoading}>
                    {isLoading ? 'Suppression...' : 'Supprimer'}
                </Button>
            </DialogFooter>
        </div>
    );
}

interface ProductCardProps {
    product: ProductListItem;
    onEdit: (product: ProductListItem, data: ProductInput) => void;
    onDelete: (productId: number) => void;
    isLoading?: boolean;
}

function ProductCard({ product, onEdit, onDelete, isLoading = false }: ProductCardProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleEditSubmit = (data: ProductInput) => {
        onEdit(product, data);
        setIsEditOpen(false);
    };

    const handleDeleteConfirm = () => {
        onDelete(product.id);
        setIsDeleteOpen(false);
    };

    return (
        <>
            <Card className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative h-48 bg-gray-100">
                    {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">Pas d'image</div>
                    )}
                </div>
                <CardHeader className="p-4">
                    <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
                    <CardDescription className="flex items-center justify-between">
                        <span className="font-semibold text-green-600">{Number(product.price).toFixed(2)} €</span>
                        {product.is_available === false && <span className="rounded bg-red-100 px-2 py-0.5 text-red-600 text-xs">Indisponible</span>}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="mb-4 flex flex-wrap gap-2">
                        <span className="rounded bg-gray-100 px-2 py-1 text-xs">{product.category}</span>
                        <span className="rounded bg-gray-100 px-2 py-1 text-xs">{product.condition}</span>
                    </div>
                    {product.description && <p className="mb-4 line-clamp-2 text-muted-foreground text-sm">{product.description}</p>}
                    <div className="flex gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => setIsEditOpen(true)} disabled={isLoading} className="flex-1">
                            <PencilIcon className="size-4" />
                            Modifier
                        </Button>
                        <Button type="button" variant="destructive" size="sm" onClick={() => setIsDeleteOpen(true)} disabled={isLoading}>
                            <Trash2Icon className="size-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Modifier le produit</DialogTitle>
                        <DialogDescription>Modifiez les informations du produit "{product.name}"</DialogDescription>
                    </DialogHeader>
                    <ProductForm
                        initialData={{
                            name: product.name,
                            description: product.description ?? undefined,
                            price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
                            category: product.category as 'Mobilier' | 'Art de la table' | 'Décoration',
                            condition: product.condition,
                            image_url: product.image_url ?? '',
                        }}
                        onSubmit={handleEditSubmit}
                        onCancel={() => setIsEditOpen(false)}
                        submitLabel="Enregistrer"
                        isLoading={isLoading}
                    />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent>
                    <DeleteConfirmation
                        productName={product.name}
                        onConfirm={handleDeleteConfirm}
                        onCancel={() => setIsDeleteOpen(false)}
                        isLoading={isLoading}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

export function ProductList({ products, onEdit, onDelete, isLoading = false }: ProductListProps) {
    const handleEdit = (product: ProductListItem, data: ProductInput) => {
        if (onEdit) {
            onEdit(product, data);
        }
    };

    const handleDelete = (productId: number) => {
        if (onDelete) {
            onDelete(productId);
        }
    };

    if (products.length === 0) {
        return (
            <div className="rounded-lg bg-gray-50 py-12 text-center">
                <p className="text-muted-foreground">Aucun produit pour le moment.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDelete} isLoading={isLoading} />
            ))}
        </div>
    );
}
