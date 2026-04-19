import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import DemoLayout from '@/layouts/demo-layout';
import type { QuickStats, ActivityItem } from '@/types';

interface Props {
    ressourcerieName: string;
    partnerName: string;
    partnerRole: string;
    partnerAvatar: string;
    stats: QuickStats;
    activities: ActivityItem[];
}

export default function DemoRessourcerieDashboard({ ressourcerieName, stats, activities }: Props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        router.visit('/demo/login');
    };

    return (
        <DemoLayout title={ressourcerieName}>
            <Head title={`${ressourcerieName} - Partner Hub`} />

            <div className="space-y-8">
                {/* Search Bar */}
                <div className="group relative max-w-md">
                    <span className="-translate-y-1/2 material-symbols-outlined absolute top-1/2 left-3 text-[#6f7a6d] text-sm">
                        search
                    </span>
                    <input
                        className="w-full rounded-full border-none bg-[#f0edec] px-4 py-3 pl-10 text-sm outline-none transition-all focus:ring-2 focus:ring-[#76dc83]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search inventory..."
                        type="text"
                        value={searchQuery}
                    />
                </div>

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
                                                {activity.action} - {activity.time}
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
        </DemoLayout>
    );
}
