import { Head } from '@inertiajs/react';
import { MapPin, Package } from 'lucide-react';
import AppLayout from '@/components/AppLayout';

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
    products_count: number;
}

interface Props {
    ressourceries: Ressourcerie[];
    department?: string;
}

export default function RessourceriesIndex({ ressourceries, department }: Props) {
    const departmentName = department === '49' ? 'Maine-et-Loire' : department;

    return (
        <AppLayout>
            <Head title={`Ressourceries - ${departmentName}`} />

            <div className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <a href="/departements" className="mb-2 inline-flex items-center gap-1 text-muted-foreground text-sm hover:text-foreground">
                        ← Choisir un autre département
                    </a>
                    <h1 className="mb-2 font-bold text-4xl">Ressourceries en {departmentName}</h1>
                    <p className="text-muted-foreground">
                        {ressourceries.length} ressourcerie{ressourceries.length !== 1 ? 's' : ''} disponible{ressourceries.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {ressourceries.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-muted-foreground">Aucune ressourcerie trouvée dans ce département.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {ressourceries.map((ressourcerie) => (
                            <a
                                key={ressourcerie.id}
                                href={`/ressourceries/${ressourcerie.id}`}
                                className="group hover:-translate-y-1 overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                            >
                                <div className="h-48 bg-gray-100">
                                    {ressourcerie.image_url ? (
                                        <img
                                            src={ressourcerie.image_url}
                                            alt={ressourcerie.name}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                            <MapPin className="h-12 w-12 text-gray-300" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h2 className="mb-2 font-semibold text-xl transition-colors group-hover:text-green-600">{ressourcerie.name}</h2>
                                    <div className="mb-3 flex items-start gap-2 text-muted-foreground">
                                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                        <span className="text-sm">
                                            {ressourcerie.address}, {ressourcerie.postal_code} {ressourcerie.city}
                                        </span>
                                    </div>
                                    {ressourcerie.description && (
                                        <p className="mb-3 line-clamp-2 text-muted-foreground text-sm">{ressourcerie.description}</p>
                                    )}
                                    <div className="flex items-center gap-1 font-medium text-green-600 text-sm">
                                        <Package className="h-4 w-4" />
                                        <span>
                                            {ressourcerie.products_count} produit{ressourcerie.products_count !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
