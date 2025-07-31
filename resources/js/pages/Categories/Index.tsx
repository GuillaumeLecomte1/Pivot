import { Head } from '@inertiajs/react';
import AppLayout from '@/components/AppLayout';

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
        <AppLayout>
            <Head title="Catégories" />

            <div className="container mx-auto px-4 py-12">
                <h1 className="mb-8 font-bold text-4xl">Catégories</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <a
                            key={category.id}
                            href={category.href}
                            className={`${category.color} rounded-lg p-6 shadow-sm transition-shadow hover:shadow-md`}
                        >
                            <div className="flex items-center space-x-4">
                                <span className="text-4xl">{category.icon}</span>
                                <h2 className="font-semibold text-xl">{category.name}</h2>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
