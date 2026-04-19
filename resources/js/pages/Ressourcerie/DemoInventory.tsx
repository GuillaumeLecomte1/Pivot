import { useState } from 'react';
import { Head } from '@inertiajs/react';
import DemoLayout from '@/layouts/demo-layout';

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

type FilterType = 'all' | 'in_stock' | 'sold' | 'needs_repair';

export default function DemoInventoryPage({ items }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');

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
        <DemoLayout title="Inventory Management">
            <Head title="Inventory Management - Partner Hub" />

            {/* Header Actions */}
            <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
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
            <div className="mb-8 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                                        {item.category} - {item.condition}
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
        </DemoLayout>
    );
}
