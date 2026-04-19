import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import type { BreadcrumbItem } from '@/types';
import type { BreadcrumbItem } from '@/types';

interface SalesData {
    month: string;
    sales: number;
}

interface CategoryData {
    category: string;
    sales: number;
    percentage: number;
}

interface TopProduct {
    id: number;
    name: string;
    sales: number;
    revenue: string;
}

interface Props {
    partnerName: string;
    partnerRole: string;
    partnerAvatar: string;
    stats: {
        totalRevenue: string;
        totalSales: number;
        averageBasket: string;
        conversionRate: string;
    };
    salesByMonth: SalesData[];
    salesByCategory: CategoryData[];
    topProducts: TopProduct[];
    salesByDay: { day: string; sales: number }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/demo/ressourcerie/dashboard',
    },
    {
        title: 'Analytics',
        href: '/demo/ressourcerie/analytics',
    },
];

const navItems = [
    { icon: 'dashboard', label: 'Overview', active: false, href: '/demo/ressourcerie/dashboard' },
    { icon: 'inventory_2', label: 'Inventory', active: false, href: '/demo/ressourcerie/inventory' },
    { icon: 'group', label: 'Team', active: false, href: '/demo/ressourcerie/team' },
    { icon: 'analytics', label: 'Analytics', active: true, href: '/demo/ressourcerie/analytics' },
    { icon: 'settings', label: 'Settings', active: false, href: '/demo/ressourcerie/settings' },
];

export default function DemoAnalyticsPage({
    partnerName,
    partnerRole,
    partnerAvatar,
    stats,
    salesByMonth,
    salesByCategory,
    topProducts,
    salesByDay,
}: Props) {
    const [selectedPeriod, setSelectedPeriod] = useState('30d');

    const handleLogout = () => {
        router.visit('/demo/login');
    };

    const maxSalesByMonth = Math.max(...salesByMonth.map((d) => d.sales));
    const _maxSalesByCategory = Math.max(...salesByCategory.map((d) => d.sales));

    return (
        <div className="min-h-screen">
            <Head title="Analytics - Partner Hub" />

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
                                <span
                                    className="material-symbols-outlined text-xl"
                                    style={item.active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                                >
                                    {item.icon}
                                </span>
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
                        <div className="flex items-center gap-4">
                            <h1 className="font-bold font-headline text-[#006e2a] text-xl tracking-tight">Analytics</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2 rounded-full bg-[#f0edec] p-1">
                                {['7d', '30d', '90d', '1y'].map((period) => (
                                    <button
                                        key={period}
                                        type="button"
                                        onClick={() => setSelectedPeriod(period)}
                                        className={`rounded-full px-4 py-1.5 font-semibold text-xs transition-all ${
                                            selectedPeriod === period
                                                ? 'bg-gradient-to-r from-[#006e2a] to-[#6ed47c] text-white'
                                                : 'text-[#3f4a3e] hover:bg-[#e5e2e1]'
                                        }`}
                                    >
                                        {period}
                                    </button>
                                ))}
                            </div>
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
                    <div className="space-y-8 p-8">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#006e2a]/10">
                                    <span className="material-symbols-outlined text-2xl text-[#006e2a]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        payments
                                    </span>
                                </div>
                                <p className="mb-1 font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Total Revenue</p>
                                <h3 className="font-extrabold font-headline text-3xl text-[#1c1b1b]">{stats.totalRevenue}</h3>
                                <p className="mt-2 flex items-center gap-1 font-medium text-[#006e2a] text-xs">
                                    <span className="material-symbols-outlined text-xs">trending_up</span>
                                    +12.5% vs last period
                                </p>
                            </div>
                            <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#6ed47c]/10">
                                    <span className="material-symbols-outlined text-2xl text-[#006e2a]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        shopping_bag
                                    </span>
                                </div>
                                <p className="mb-1 font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Total Sales</p>
                                <h3 className="font-extrabold font-headline text-3xl text-[#1c1b1b]">{stats.totalSales}</h3>
                                <p className="mt-2 flex items-center gap-1 font-medium text-[#006e2a] text-xs">
                                    <span className="material-symbols-outlined text-xs">trending_up</span>
                                    +8.2% vs last period
                                </p>
                            </div>
                            <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#fe7860]/10">
                                    <span className="material-symbols-outlined text-2xl text-[#a73926]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        shopping_cart
                                    </span>
                                </div>
                                <p className="mb-1 font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Avg. Basket</p>
                                <h3 className="font-extrabold font-headline text-3xl text-[#1c1b1b]">{stats.averageBasket}</h3>
                                <p className="mt-2 flex items-center gap-1 font-medium text-[#a73926] text-xs">
                                    <span className="material-symbols-outlined text-xs">trending_down</span>
                                    -2.1% vs last period
                                </p>
                            </div>
                            <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#bebfbf]/20">
                                    <span className="material-symbols-outlined text-2xl text-[#5d5f5f]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        conversion_path
                                    </span>
                                </div>
                                <p className="mb-1 font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Conversion Rate</p>
                                <h3 className="font-extrabold font-headline text-3xl text-[#1c1b1b]">{stats.conversionRate}</h3>
                                <p className="mt-2 flex items-center gap-1 font-medium text-[#006e2a] text-xs">
                                    <span className="material-symbols-outlined text-xs">trending_up</span>
                                    +0.5% vs last period
                                </p>
                            </div>
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {/* Sales by Month Chart */}
                            <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                <h3 className="mb-6 font-bold font-headline text-[#1c1b1b] text-lg">Sales by Month</h3>
                                <div className="flex items-end justify-between gap-4">
                                    {salesByMonth.map((data) => (
                                        <div key={data.month} className="flex flex-1 flex-col items-center gap-2">
                                            <div
                                                className="w-full rounded-t-sm bg-gradient-to-t from-[#006e2a] to-[#6ed47c]"
                                                style={{ height: `${(data.sales / maxSalesByMonth) * 150}px` }}
                                            ></div>
                                            <span className="font-medium text-[#3f4a3e] text-[10px]">{data.month}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sales by Day Chart */}
                            <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                <h3 className="mb-6 font-bold font-headline text-[#1c1b1b] text-lg">Sales by Day of Week</h3>
                                <div className="flex items-end justify-between gap-2">
                                    {salesByDay.map((data) => (
                                        <div key={data.day} className="flex flex-1 flex-col items-center gap-2">
                                            <div
                                                className="w-full rounded-t-sm bg-[#fe7860]/60"
                                                style={{ height: `${(data.sales / 100) * 120}px` }}
                                            ></div>
                                            <span className="font-medium text-[#3f4a3e] text-[10px]">{data.day}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Sales by Category */}
                            <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                <h3 className="mb-6 font-bold font-headline text-[#1c1b1b] text-lg">Sales by Category</h3>
                                <div className="space-y-4">
                                    {salesByCategory.map((data) => (
                                        <div key={data.category} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-[#1c1b1b] text-sm">{data.category}</span>
                                                <span className="font-bold text-[#3f4a3e] text-sm">{data.sales} units</span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-[#f0edec]">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-[#006e2a] to-[#6ed47c]"
                                                    style={{ width: `${data.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Top Products */}
                            <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6 lg:col-span-2">
                                <h3 className="mb-6 font-bold font-headline text-[#1c1b1b] text-lg">Top Selling Products</h3>
                                <div className="space-y-4">
                                    {topProducts.map((product, index) => (
                                        <div key={product.id} className="flex items-center justify-between rounded-lg border border-[#becaba]/10 p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#006e2a]/10 font-bold font-headline text-[#006e2a] text-sm">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-headline font-semibold text-[#1c1b1b]">{product.name}</p>
                                                    <p className="text-[#3f4a3e] text-xs">{product.sales} sales</p>
                                                </div>
                                            </div>
                                            <span className="font-bold font-headline text-[#006e2a] text-lg">{product.revenue}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
        </div>
    );
}
