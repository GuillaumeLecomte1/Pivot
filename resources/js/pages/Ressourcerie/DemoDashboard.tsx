import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface ActivityItem {
    id: number;
    name: string;
    imageUrl: string;
    action: string;
    user: string;
    time: string;
    price: string;
    status: 'completed' | 'review' | 'pending';
}

interface QuickStats {
    totalSales: string;
    salesChange: string;
    co2Saved: string;
    activeListings: string;
    listingsToday: string;
}

interface Props {
    ressourcerieName: string;
    partnerName: string;
    partnerRole: string;
    partnerAvatar: string;
    stats: QuickStats;
    activities: ActivityItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/demo/ressourcerie/dashboard',
    },
];

export default function DemoRessourcerieDashboard({ ressourcerieName, partnerName, partnerRole, partnerAvatar, stats, activities }: Props) {
    const [searchQuery, setSearchQuery] = useState('');

    const navItems = [
        { icon: 'dashboard', label: 'Overview', active: true, href: '/demo/ressourcerie/dashboard' },
        { icon: 'inventory_2', label: 'Inventory', active: false, href: '#' },
        { icon: 'group', label: 'Team', active: false, href: '/demo/ressourcerie/team' },
        { icon: 'analytics', label: 'Analytics', active: false, href: '#' },
        { icon: 'settings', label: 'Settings', active: false, href: '#' },
    ];

    const handleLogout = () => {
        router.visit('/demo/login');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${ressourcerieName} - Partner Hub`} />

            <div className="flex min-h-screen">
                {/* Sidebar Navigation */}
                <aside className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col gap-2 bg-[#f6f3f2] p-4">
                    {/* Logo & Branding */}
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

                    {/* Navigation */}
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

                    {/* Bottom Actions */}
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
                            className="flex items-center gap-3 rounded-lg px-4 py-3 font-headline font-medium text-[#1c1b1b] text-sm tracking-wide transition-transform duration-200 hover:translate-x-1 hover:bg-[#f0edec]"
                        >
                            <span className="material-symbols-outlined text-xl">contact_support</span>
                            Support
                        </button>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 font-headline font-medium text-[#ba1a1a] text-sm tracking-wide transition-transform duration-200 hover:translate-x-1 hover:bg-[#f0edec]"
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
                            <h1 className="font-bold font-headline text-[#006e2a] text-xl tracking-tight">{ressourcerieName}</h1>
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

                    {/* Dashboard Canvas */}
                    <div className="space-y-8 p-8">
                        {/* Hero Section: Bento Style Stats */}
                        <section className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                            {/* Large Stats Card - Total Sales */}
                            <div className="relative col-span-2 flex flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#006e2a] to-[#6ed47c] p-8 text-white">
                                <div className="relative z-10">
                                    <p className="mb-1 font-headline font-medium text-sm opacity-80">Total Sales (Last 30 Days)</p>
                                    <h3 className="font-extrabold font-headline text-5xl tracking-tighter">{stats.totalSales}</h3>
                                    <div className="mt-4 flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 font-medium text-sm backdrop-blur-md">
                                        <span className="material-symbols-outlined text-sm">trending_up</span>
                                        {stats.salesChange}
                                    </div>
                                </div>
                                <div className="-bottom-8 -right-8 absolute opacity-10">
                                    <span className="font-headline text-[12rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        payments
                                    </span>
                                </div>
                            </div>

                            {/* CO2 Saved */}
                            <div className="flex flex-col justify-center rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fe7860]/10 text-[#a73926]">
                                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        eco
                                    </span>
                                </div>
                                <p className="mb-1 font-medium text-[#3f4a3e] text-sm">CO2 Saved</p>
                                <h3 className="font-bold font-headline text-3xl">{stats.co2Saved}</h3>
                                <p className="mt-2 text-[#3f4a3e] text-xs opacity-60">Equivalent to 15 trees planted</p>
                            </div>

                            {/* Active Listings */}
                            <div className="flex flex-col justify-center rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#006e2a]/10 text-[#006e2a]">
                                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        inventory_2
                                    </span>
                                </div>
                                <p className="mb-1 font-medium text-[#3f4a3e] text-sm">Active Listings</p>
                                <h3 className="font-bold font-headline text-3xl">{stats.activeListings}</h3>
                                <p className="mt-2 text-[#3f4a3e] text-xs opacity-60">{stats.listingsToday}</p>
                            </div>
                        </section>

                        {/* Main Content Grid */}
                        <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Recent Activity */}
                            <div className="space-y-6 lg:col-span-2">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-bold font-headline text-2xl text-[#1c1b1b]">Recent Activity</h2>
                                    <button type="button" className="font-semibold text-[#006e2a] text-sm hover:underline">
                                        View all
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {activities.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="group flex cursor-pointer items-center justify-between rounded-xl bg-[#f6f3f2] p-5 transition-colors hover:bg-[#ebe7e7]"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-14 w-14 overflow-hidden rounded-lg bg-[#e5e2e1]">
                                                    <img
                                                        alt={activity.name}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        src={activity.imageUrl}
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-headline font-semibold text-[#1c1b1b]">{activity.name}</h4>
                                                    <p className="text-[#3f4a3e] text-sm">
                                                        {activity.action} • {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold font-headline text-[#1c1b1b]">{activity.price}</p>
                                                <span
                                                    className={`rounded px-2 py-0.5 font-bold text-[10px] uppercase tracking-widest ${
                                                        activity.status === 'completed'
                                                            ? 'bg-[#6ed47c]/20 text-[#006e2a]'
                                                            : activity.status === 'review'
                                                              ? 'bg-[#bebfbf]/20 text-[#5d5f5f]'
                                                              : 'bg-[#ffdad4]/20 text-[#a73926]'
                                                    }`}
                                                >
                                                    {activity.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-8">
                                {/* Quick Actions */}
                                <div className="rounded-xl bg-[#ebe7e7] p-6">
                                    <h3 className="mb-6 font-bold font-headline text-lg">Quick Actions</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            className="flex flex-col items-center justify-center gap-3 rounded-xl bg-[#ffffff] p-4 transition-all hover:scale-[1.02] hover:bg-[#6ed47c]"
                                        >
                                            <span className="material-symbols-outlined text-3xl text-[#006e2a]">add_circle</span>
                                            <span className="font-bold font-headline text-[#1c1b1b] text-xs uppercase tracking-tighter">
                                                List New Item
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className="flex flex-col items-center justify-center gap-3 rounded-xl bg-[#ffffff] p-4 transition-all hover:scale-[1.02] hover:bg-[#6ed47c]"
                                        >
                                            <span className="material-symbols-outlined text-3xl text-[#006e2a]">map</span>
                                            <span className="font-bold font-headline text-[#1c1b1b] text-xs uppercase tracking-tighter">
                                                View Map
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Impact Chart */}
                                <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h3 className="font-bold font-headline text-lg">Impact Growth</h3>
                                        <span className="rounded bg-[#006e2a]/10 px-2 py-1 font-bold text-[#006e2a] text-xs">30 Days</span>
                                    </div>
                                    {/* Mini Bar Chart */}
                                    <div className="flex h-40 items-end justify-between gap-2 px-2">
                                        <div className="w-full rounded-t-sm bg-[#006e2a]/20" style={{ height: '30%' }}></div>
                                        <div className="w-full rounded-t-sm bg-[#006e2a]/20" style={{ height: '45%' }}></div>
                                        <div className="w-full rounded-t-sm bg-[#006e2a]/20" style={{ height: '35%' }}></div>
                                        <div className="w-full rounded-t-sm bg-[#006e2a]/40" style={{ height: '60%' }}></div>
                                        <div className="w-full rounded-t-sm bg-[#006e2a]/40" style={{ height: '55%' }}></div>
                                        <div className="w-full rounded-t-sm bg-[#006e2a]/60" style={{ height: '80%' }}></div>
                                        <div className="w-full rounded-t-sm bg-[#006e2a]" style={{ height: '100%' }}></div>
                                    </div>
                                    <div className="mt-6 border-[#becaba]/10 border-t pt-6">
                                        <div className="flex items-center justify-between font-medium text-[#3f4a3e] text-xs">
                                            <span>Week 1</span>
                                            <span>Week 2</span>
                                            <span>Week 3</span>
                                            <span>Week 4</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Store Location */}
                                <div className="group relative h-48 cursor-pointer overflow-hidden rounded-xl">
                                    <img
                                        alt="Map location"
                                        className="h-full w-full object-cover brightness-90 grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAke5AAMln3Sw0Q3i1ePLSLSRxUX42q8ry31HpbnkENqrHrI_wY572edfOBeiQkUSybJBiB4L_HVPIzLmpz-QnOV4XOBbJSzBmdSO7aaLqwYPlhyGyyIe91l1Ic0dPTxHfiH3CzPwYAicIa5TPcW0q09HsX_Ms7xCvbzKj0wjGchCfm7hdNo1O_OBBnXSUSLIBXoV1YTkMzy6KzDHbT__LIIinIhco-vP1cb7Zb_HBZubtgDCQRvHdD4BfdEtqWZ18gwMIpO6joWBS3"
                                    />
                                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#1c1b1b]/80 to-transparent p-4">
                                        <p className="font-bold font-headline text-sm text-white">Lyon Main Warehouse</p>
                                        <p className="text-white/70 text-xs">Rue de la République, 69002</p>
                                    </div>
                                    <div className="absolute top-4 right-4 rounded-full bg-[#006e2a] p-2 text-white shadow-lg">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
