import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

const ressourceries = [
    {
        id: 1,
        name: "Ressourcerie d'Angers",
        address: '123 rue de la Ressourcerie, 49000 Angers',
        phone: '02 41 23 45 67',
        email: 'contact@ressourcerie-angers.fr',
        image: 'https://placehold.co/600x400?text=Ressourcerie+Angers',
    },
    {
        id: 2,
        name: 'Ressourcerie de Nantes',
        address: '456 avenue du Recyclage, 44000 Nantes',
        phone: '02 40 12 34 56',
        email: 'contact@ressourcerie-nantes.fr',
        image: 'https://placehold.co/600x400?text=Ressourcerie+Nantes',
    },
    {
        id: 3,
        name: 'Ressourcerie de Rennes',
        address: '789 boulevard de la Récupération, 35000 Rennes',
        phone: '02 99 12 34 56',
        email: 'contact@ressourcerie-rennes.fr',
        image: 'https://placehold.co/600x400?text=Ressourcerie+Rennes',
    },
];

export default function RessourceriesIndex() {
    return (
        <AuthenticatedLayout>
            <Head title="Ressourceries" />

            <div className="container mx-auto px-4 py-12">
                <h1 className="mb-8 font-bold text-4xl">Nos ressourceries</h1>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {ressourceries.map((ressourcerie) => (
                        <div key={ressourcerie.id} className="overflow-hidden rounded-lg bg-white shadow-md">
                            <div className="h-48 bg-gray-200">
                                <img
                                    src={ressourcerie.image}
                                    alt={ressourcerie.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        const imgElement = e.currentTarget;
                                        imgElement.style.display = 'none';
                                        const textFallback = document.createElement('div');
                                        textFallback.className = 'w-full h-full flex items-center justify-center bg-gray-100 text-gray-400';
                                        textFallback.textContent = ressourcerie.name;
                                        if (imgElement.parentElement) {
                                            imgElement.parentElement.appendChild(textFallback);
                                        }
                                    }}
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="mb-2 font-semibold text-xl">{ressourcerie.name}</h2>
                                <p className="mb-2 text-gray-600">{ressourcerie.address}</p>
                                <p className="mb-2 text-gray-600">{ressourcerie.phone}</p>
                                <a href={`mailto:${ressourcerie.email}`} className="text-[#6ED47C] hover:text-[#5CBD6A]">
                                    {ressourcerie.email}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
