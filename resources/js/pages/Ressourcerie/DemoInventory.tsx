import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import type { BreadcrumbItem } from '@/types';
import type { BreadcrumbItem } from '@/types';

interface InventoryItem {
    id: number;
    name: string;
    category: string;
    condition: string;
    price: string;
    imageUrl: string;
    status: 'in_stock' | 'sold' | 'needs_repair';
}

interface Props {
    partnerName: string;
    partnerRole: string;
    partnerAvatar: string;
    items: InventoryItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/demo/ressourcerie/dashboard',
    },
    {
        title: 'Inventory',
        href: '/demo/ressourcerie/inventory',
    },
];

type FilterType = 'all' | 'in_stock' | 'sold' | 'needs_repair';

const navItems = [
    { label: 'Overview', active: false, href: '/demo/ressourcerie/dashboard' },
    { label: 'Inventory', active: true, href: '/demo/ressourcerie/inventory' },
    { label: 'Team', active: false, href: '/demo/ressourcerie/team' },
    { label: 'Analytics', active: false, href: '/demo/ressourcerie/analytics' },
    { label: 'Settings', active: false, href: '/demo/ressourcerie/settings' },
];

export default function DemoInventoryPage({ partnerName, partnerRole, partnerAvatar, items }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');

    const handleLogout = () => {
        router.visit('/demo/login');
    };

    const getStatusBadge = (status: InventoryItem['status']) => {
        switch (status) {
            case 'in_stock':
                return { label: 'In Stock', bgClass: 'bg-[#006e2a]/90', textClass: 'text-white' };
            case 'sold':
                return { label: 'Sold', bgClass: 'bg-[#3f4a3e]/80', textClass: 'text-white' };
            case 'needs_repair':
                return { label: 'Needs Repair', bgClass: 'bg-[#a73926]', textClass: 'text-white' };
        }
    };

    const filteredItems = activeFilter === 'all' ? items : items.filter((item) => item.status === activeFilter);

    const filters: { key: FilterType; label: string }[] = [
        { key: 'all', label: 'All Items' },
        { key: 'in_stock', label: 'In Stock' },
        { key: 'sold', label: 'Sold' },
        { key: 'needs_repair', label: 'Needs Repair' },
    ];

    return (
        <div className="min-h-screen">
            <Head title="Inventory Management - Partner Hub" />

            {/* Sidebar Navigation */}
            <aside className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col gap-2 bg-[#f6f3f2] p-4">
                    <div className="mb-6 flex items-center gap-3 px-2 py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#006e2a] to-[#6ed47c] text-white">
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                recycling
                            </span>
                        </div>
                        <div>
                            <h2 className="font-extrabold font-headline text-[#006e2a] text-lg leading-tight">Partner Hub</h2>
                            <p className="font-medium text-[#3f4a3e] text-xs tracking-wide opacity-70">Circular Economy</p>
                        </div>
                    </div>

                    <nav className="flex flex-1 flex-col gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                className={`flex items-center gap-3 px-4 py-3 font-headline font-medium text-sm tracking-wide transition-transform duration-200 ${
                                    item.active
                                        ? 'rounded-lg bg-gradient-to-br from-[#006e2a] to-[#6ed47c] text-white shadow-sm'
                                        : 'rounded-lg text-[#1c1b1b] hover:translate-x-1 hover:bg-[#f0edec]'
                                }`}
                                href={item.href}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="mt-auto flex flex-col gap-1 border-[#becaba]/10 border-t pt-6">
                        <button
                            type="button"
                            className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#006e2a] to-[#6ed47c] px-4 py-3 font-semibold text-sm text-white shadow-md transition-all hover:opacity-90"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                            List New Item
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 font-headline font-medium text-[#1c1b1b] text-sm transition-transform duration-200 hover:translate-x-1 hover:bg-[#f0edec]"
                        >
                            <span className="material-symbols-outlined text-xl">contact_support</span>
                            Support
                        </button>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 font-headline font-medium text-[#ba1a1a] text-sm transition-transform duration-200 hover:translate-x-1 hover:bg-[#f0edec]"
                        >
                            <span className="material-symbols-outlined text-xl">logout</span>
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="ml-64 min-h-screen">
                    {/* Top Navigation Bar */}
                    <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-[#fcf9f8]/80 px-8 py-4 backdrop-blur-xl">
                        <div className="flex items-center gap-8">
                            <h1 className="font-bold font-headline text-[#006e2a] text-xl tracking-tight">Inventory Management</h1>
                            <div className="group relative hidden md:block">
                                <span className="-translate-y-1/2 material-symbols-outlined absolute top-1/2 left-3 text-[#6f7a6d] text-sm">
                                    search
                                </span>
                                <input
                                    className="w-64 rounded-full border-none bg-[#f0edec] px-4 py-2 pl-10 text-sm outline-none transition-all focus:ring-2 focus:ring-[#76dc83]"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search inventory..."
                                    type="text"
                                    value={searchQuery}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button type="button" className="rounded-full p-2 text-[#3f4a3e] transition-colors hover:bg-[#f0edec]">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button type="button" className="rounded-full p-2 text-[#3f4a3e] transition-colors hover:bg-[#f0edec]">
                                <span className="material-symbols-outlined">help</span>
                            </button>
                            <div className="mx-2 h-8 w-px bg-[#becaba]/20"></div>
                            <div className="flex items-center gap-3 pl-2">
                                <div className="hidden text-right sm:block">
                                    <p className="font-bold font-headline text-[#1c1b1b] text-sm leading-tight">{partnerName}</p>
                                    <p className="text-[#3f4a3e] text-xs opacity-70">{partnerRole}</p>
                                </div>
                                <img
                                    alt={`${partnerName} profile`}
                                    className="h-10 w-10 rounded-full border-2 border-[#6ed47c] object-cover"
                                    src={partnerAvatar}
                                />
                            </div>
                        </div>
                    </header>

                    {/* Page Canvas */}
                    <div className="mx-auto max-w-[1400px] space-y-8 p-8">
                        {/* Header Actions */}
                        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-[#3f4a3e] text-sm">Manage and curate your circular marketplace listings.</p>
                            </div>
                            <button
                                type="button"
                                className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#006e2a] to-[#6ed47c] px-8 font-bold text-sm text-white shadow-md transition-all hover:shadow-lg active:scale-95"
                            >
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                <span>Add New Item</span>
                            </button>
                        </div>

                        {/* Functional Filters */}
                        <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {filters.map((filter) => (
                                <button
                                    key={filter.key}
                                    type="button"
                                    onClick={() => setActiveFilter(filter.key)}
                                    className={`flex h-10 shrink-0 items-center justify-center rounded-full px-6 font-headline font-semibold text-sm transition-all ${
                                        activeFilter === filter.key
                                            ? 'bg-gradient-to-br from-[#006e2a] to-[#6ed47c] text-white shadow-sm hover:opacity-90'
                                            : 'border border-[#becaba]/10 bg-[#f0edec] text-[#3f4a3e] hover:bg-[#e5e2e1] hover:text-[#1c1b1b]'
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        {/* Inventory Grid */}
                        <div className="grid @4xl:grid-cols-3 @6xl:grid-cols-4 @xl:grid-cols-2 grid-cols-1 gap-8">
                            {filteredItems.map((item) => {
                                const statusBadge = getStatusBadge(item.status);
                                return (
                                    <div
                                        key={item.id}
                                        className={`group hover:-translate-y-1 flex flex-col overflow-hidden rounded-xl border border-[#becaba]/10 bg-[#ffffff] transition-all hover:shadow-[#006e2a]/5 hover:shadow-xl ${
                                            item.status === 'sold' ? 'opacity-80 hover:opacity-100' : ''
                                        }`}
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            {item.imageUrl ? (
                                                <img
                                                    alt={item.name}
                                                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                                                        item.status === 'sold' ? 'grayscale' : ''
                                                    }`}
                                                    src={item.imageUrl}
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-[#f0edec]">
                                                    <span className="material-symbols-outlined text-5xl text-[#6f7a6d] opacity-30">image</span>
                                                </div>
                                            )}
                                            <div className="absolute top-4 right-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-widest backdrop-blur-md ${statusBadge.bgClass} ${statusBadge.textClass}`}
                                                >
                                                    {statusBadge.label}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col gap-4 p-6">
                                            <div>
                                                <h3 className="mb-1 font-bold font-headline text-[#1c1b1b] text-lg leading-tight transition-colors group-hover:text-[#006e2a]">
                                                    {item.name}
                                                </h3>
                                                <p className="font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">
                                                    {item.category} • {item.condition}
                                                </p>
                                            </div>
                                            <div className="mt-auto flex items-center justify-between border-[#becaba]/5 border-t pt-4">
                                                <span className="font-extrabold font-headline text-[#1c1b1b] text-xl">{item.price}</span>
                                                <button
                                                    type="button"
                                                    className={`rounded-lg px-4 py-2 font-bold text-xs transition-all ${
                                                        item.status === 'sold'
                                                            ? 'bg-[#f0edec] text-[#3f4a3e] hover:bg-[#006e2a] hover:text-white'
                                                            : 'bg-[#006e2a]/5 text-[#006e2a] hover:bg-[#006e2a] hover:text-white'
                                                    }`}
                                                >
                                                    {item.status === 'sold' ? 'View Details' : 'Manage'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
        </div>
    );
}
