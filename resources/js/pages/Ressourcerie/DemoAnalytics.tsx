import { useState } from 'react';
import { Head } from '@inertiajs/react';
import DemoLayout from '@/layouts/demo-layout';

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

export default function DemoAnalyticsPage({
    stats,
    salesByMonth,
    salesByCategory,
    topProducts,
    salesByDay,
}: Props) {
    const [selectedPeriod, setSelectedPeriod] = useState('30d');

    const maxSalesByMonth = Math.max(...salesByMonth.map((d) => d.sales));

    return (
        <DemoLayout title="Analytics">
            <Head title="Analytics - Partner Hub" />

            {/* Period Selector */}
            <div className="mb-8 flex gap-2 rounded-full bg-[#f0edec] p-1 w-fit">
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

            {/* KPI Cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
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
        </DemoLayout>
    );
}
