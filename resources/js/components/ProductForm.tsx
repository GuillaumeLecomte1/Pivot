import type * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { isRight } from '@/lib/either';
import type { ProductCategory, ProductInput } from '@/lib/schemas/ProductSchema';
import { validateProduct } from '@/lib/schemas/ProductSchema';
import { cn } from '@/lib/utils';

interface ProductFormProps {
    initialData?: Partial<ProductInput>;
    onSubmit: (data: ProductInput) => void;
    onCancel?: () => void;
    submitLabel?: string;
    isLoading?: boolean;
}

interface FieldErrors {
    name?: string;
    description?: string;
    price?: string;
    category?: string;
    condition?: string;
    image_url?: string;
}

export function ProductForm({ initialData, onSubmit, onCancel, submitLabel = 'Ajouter le produit', isLoading = false }: ProductFormProps) {
    const [name, setName] = useState(initialData?.name ?? '');
    const [description, setDescription] = useState(initialData?.description ?? '');
    const [price, setPrice] = useState(initialData?.price?.toString() ?? '');
    const [category, setCategory] = useState<ProductCategory | ''>((initialData?.category as ProductCategory) ?? '');
    const [condition, setCondition] = useState(initialData?.condition ?? '');
    const [imageUrl, setImageUrl] = useState(initialData?.image_url ?? '');

    const [errors, setErrors] = useState<FieldErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (field: string, _value: unknown): string | undefined => {
        const formData = { name, description, price, category, condition, image_url: imageUrl };
        const result = validateProduct(formData);

        if (isRight(result)) {
            return undefined;
        }

        // Find errors for this specific field
        const fieldErrors = result.left.errors.filter((e) => e.toLowerCase().startsWith(field.toLowerCase()));
        if (fieldErrors.length > 0) {
            return fieldErrors[0];
        }

        return undefined;
    };

    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));

        const fieldValue = {
            name,
            description,
            price,
            category,
            condition,
            image_url: imageUrl,
        }[field];

        const error = validateField(field, fieldValue);
        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            name,
            description,
            price,
            category,
            condition,
            image_url: imageUrl,
        };

        const result = validateProduct(formData);

        if (isRight(result)) {
            setErrors({});
            onSubmit(result.right);
        } else {
            // Parse errors and set them per field
            const newErrors: FieldErrors = {};
            for (const error of result.left.errors) {
                const lowerError = error.toLowerCase();
                if (lowerError.includes('name')) {
                    newErrors.name = error;
                } else if (lowerError.includes('description')) {
                    newErrors.description = error;
                } else if (lowerError.includes('price')) {
                    newErrors.price = error;
                } else if (lowerError.includes('category')) {
                    newErrors.category = error;
                } else if (lowerError.includes('condition')) {
                    newErrors.condition = error;
                } else if (lowerError.includes('image_url')) {
                    newErrors.image_url = error;
                }
            }
            setErrors(newErrors);
            setTouched({
                name: true,
                description: true,
                price: true,
                category: true,
                condition: true,
                image_url: true,
            });
        }
    };

    const categories = ['Mobilier', 'Art de la table', 'Décoration'] as const;
    const conditions = ['Très bon état', 'Bon état', 'Excellent état'] as const;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
                <Label htmlFor="name">
                    Nom du produit <span className="text-destructive">*</span>
                </Label>
                <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="Ex: Table en chêne massif"
                    className={cn(touched.name && errors.name && 'border-destructive aria-invalid:bg-destructive/10')}
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {touched.name && errors.name && (
                    <p id="name-error" className="text-destructive text-sm">
                        {errors.name}
                    </p>
                )}
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => handleBlur('description')}
                    placeholder="Décrivez votre produit..."
                    rows={4}
                    className={cn(
                        'flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
                        touched.description && errors.description && 'border-destructive aria-invalid:bg-destructive/10',
                    )}
                    aria-invalid={touched.description && !!errors.description}
                    aria-describedby={errors.description ? 'description-error' : undefined}
                />
                {touched.description && errors.description && (
                    <p id="description-error" className="text-destructive text-sm">
                        {errors.description}
                    </p>
                )}
            </div>

            {/* Price */}
            <div className="space-y-2">
                <Label htmlFor="price">
                    Prix (€) <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                    <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        onBlur={() => handleBlur('price')}
                        placeholder="0.00"
                        className={cn('pl-8', touched.price && errors.price && 'border-destructive aria-invalid:bg-destructive/10')}
                        aria-invalid={touched.price && !!errors.price}
                        aria-describedby={errors.price ? 'price-error' : undefined}
                    />
                    <span className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 text-muted-foreground">€</span>
                </div>
                {touched.price && errors.price && (
                    <p id="price-error" className="text-destructive text-sm">
                        {errors.price}
                    </p>
                )}
            </div>

            {/* Category */}
            <div className="space-y-2">
                <Label htmlFor="category">
                    Catégorie <span className="text-destructive">*</span>
                </Label>
                <Select
                    value={category}
                    onValueChange={(value) => {
                        setCategory(value as ProductCategory);
                        setTouched((prev) => ({ ...prev, category: true }));
                        const error = validateField('category', value);
                        setErrors((prev) => ({ ...prev, category: error }));
                    }}
                    onOpenChange={() => {
                        if (!touched.category) {
                            setTouched((prev) => ({ ...prev, category: true }));
                        }
                    }}
                >
                    <SelectTrigger
                        id="category"
                        className={cn(touched.category && errors.category && 'border-destructive aria-invalid:bg-destructive/10')}
                        aria-invalid={touched.category && !!errors.category}
                        aria-describedby={errors.category ? 'category-error' : undefined}
                    >
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Catégories</SelectLabel>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {touched.category && errors.category && (
                    <p id="category-error" className="text-destructive text-sm">
                        {errors.category}
                    </p>
                )}
            </div>

            {/* Condition */}
            <div className="space-y-2">
                <Label htmlFor="condition">
                    État <span className="text-destructive">*</span>
                </Label>
                <Select
                    value={condition}
                    onValueChange={(value) => {
                        setCondition(value);
                        setTouched((prev) => ({ ...prev, condition: true }));
                        const error = validateField('condition', value);
                        setErrors((prev) => ({ ...prev, condition: error }));
                    }}
                    onOpenChange={() => {
                        if (!touched.condition) {
                            setTouched((prev) => ({ ...prev, condition: true }));
                        }
                    }}
                >
                    <SelectTrigger
                        id="condition"
                        className={cn(touched.condition && errors.condition && 'border-destructive aria-invalid:bg-destructive/10')}
                        aria-invalid={touched.condition && !!errors.condition}
                        aria-describedby={errors.condition ? 'condition-error' : undefined}
                    >
                        <SelectValue placeholder="Sélectionnez l'état du produit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>États</SelectLabel>
                            {conditions.map((cond) => (
                                <SelectItem key={cond} value={cond}>
                                    {cond}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {touched.condition && errors.condition && (
                    <p id="condition-error" className="text-destructive text-sm">
                        {errors.condition}
                    </p>
                )}
            </div>

            {/* Image URL */}
            <div className="space-y-2">
                <Label htmlFor="image_url">URL de l'image</Label>
                <Input
                    id="image_url"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onBlur={() => handleBlur('image_url')}
                    placeholder="https://example.com/image.jpg"
                    className={cn(touched.image_url && errors.image_url && 'border-destructive aria-invalid:bg-destructive/10')}
                    aria-invalid={touched.image_url && !!errors.image_url}
                    aria-describedby={errors.image_url ? 'image_url-error' : undefined}
                />
                {touched.image_url && errors.image_url && (
                    <p id="image_url-error" className="text-destructive text-sm">
                        {errors.image_url}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Enregistrement...' : submitLabel}
                </Button>
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Annuler
                    </Button>
                )}
            </div>
        </form>
    );
}
