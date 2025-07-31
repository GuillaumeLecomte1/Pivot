import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

const categories = [
    {
        id: 1,
        name: 'Art de la table',
        icon: '🍽️',
        color: 'bg-red-100',
        href: '/categories',
    },
    {
        id: 2,
        name: 'Mobilier',
        icon: '🪑',
        color: 'bg-blue-100',
        href: '/categories',
    },
    {
        id: 3,
        name: 'Librairie',
        icon: '📚',
        color: 'bg-green-100',
        href: '/categories',
    },
    {
        id: 4,
        name: 'Vêtements',
        icon: '👕',
        color: 'bg-yellow-100',
        href: '/categories',
    },
    {
        id: 5,
        name: 'Technologie',
        icon: '💻',
        color: 'bg-purple-100',
        href: '/categories',
    },
    {
        id: 6,
        name: 'Extérieurs',
        icon: '🌳',
        color: 'bg-indigo-100',
        href: '/categories',
    },
    {
        id: 7,
        name: 'Loisirs',
        icon: '🎮',
        color: 'bg-pink-100',
        href: '/categories',
    },
];

export default function CategoriesIndex() {
    return (
        <AuthenticatedLayout>
            <Head title="Catégories" />

            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">Catégories</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <a
                            key={category.id}
                            href={category.href}
                            className={`${category.color} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
                        >
                            <div className="flex items-center space-x-4">
                                <span className="text-4xl">{category.icon}</span>
                                <h2 className="text-xl font-semibold">{category.name}</h2>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
