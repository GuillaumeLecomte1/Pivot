import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import type { BreadcrumbItem } from '@/types';
import type { BreadcrumbItem } from '@/types';

interface Props {
    partnerName: string;
    partnerRole: string;
    partnerAvatar: string;
    ressourcerie: {
        name: string;
        address: string;
        city: string;
        postalCode: string;
        phone: string;
        email: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/demo/ressourcerie/dashboard',
    },
    {
        title: 'Settings',
        href: '/demo/ressourcerie/settings',
    },
];

const navItems = [
    { icon: 'dashboard', label: 'Overview', active: false, href: '/demo/ressourcerie/dashboard' },
    { icon: 'inventory_2', label: 'Inventory', active: false, href: '/demo/ressourcerie/inventory' },
    { icon: 'group', label: 'Team', active: false, href: '/demo/ressourcerie/team' },
    { icon: 'analytics', label: 'Analytics', active: false, href: '/demo/ressourcerie/analytics' },
    { icon: 'settings', label: 'Settings', active: true, href: '/demo/ressourcerie/settings' },
];

export default function DemoSettingsPage({ partnerName, partnerRole, partnerAvatar, ressourcerie }: Props) {
    const [activeTab, setActiveTab] = useState('profile');

    const handleLogout = () => {
        router.visit('/demo/login');
    };

    const tabs = [
        { key: 'profile', label: 'Profile', icon: 'person' },
        { key: 'notifications', label: 'Notifications', icon: 'notifications' },
        { key: 'security', label: 'Security', icon: 'lock' },
        { key: 'billing', label: 'Billing', icon: 'credit_card' },
    ];

    return (
        <div className="min-h-screen">
            <Head title="Settings - Partner Hub" />

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
                                <span className="material-symbols-outlined text-xl">{item.icon}</span>
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
                            <h1 className="font-bold font-headline text-[#006e2a] text-xl tracking-tight">Settings</h1>
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
                    <div className="flex gap-8 p-8">
                        {/* Settings Navigation */}
                        <div className="w-64 shrink-0">
                            <nav className="space-y-1 rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 font-headline font-medium text-sm transition-all ${
                                            activeTab === tab.key ? 'bg-[#006e2a]/10 text-[#006e2a]' : 'text-[#3f4a3e] hover:bg-[#f0edec]'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Settings Content */}
                        <div className="flex-1 space-y-8">
                            {activeTab === 'profile' && (
                                <>
                                    {/* Ressourcerie Info */}
                                    <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                        <h3 className="mb-6 font-bold font-headline text-[#1c1b1b] text-lg">Ressourcerie Information</h3>
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="font-semibold text-[#3f4a3e] text-xs uppercase tracking-wider">Name</label>
                                                <input
                                                    className="w-full rounded-xl border border-[#becaba]/20 bg-[#f6f3f2] px-4 py-3 text-sm focus:border-[#006e2a] focus:ring-2 focus:ring-[#006e2a]/20"
                                                    defaultValue={ressourcerie.name}
                                                    type="text"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="font-semibold text-[#3f4a3e] text-xs uppercase tracking-wider">Email</label>
                                                <input
                                                    className="w-full rounded-xl border border-[#becaba]/20 bg-[#f6f3f2] px-4 py-3 text-sm focus:border-[#006e2a] focus:ring-2 focus:ring-[#006e2a]/20"
                                                    defaultValue={ressourcerie.email}
                                                    type="email"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="font-semibold text-[#3f4a3e] text-xs uppercase tracking-wider">Phone</label>
                                                <input
                                                    className="w-full rounded-xl border border-[#becaba]/20 bg-[#f6f3f2] px-4 py-3 text-sm focus:border-[#006e2a] focus:ring-2 focus:ring-[#006e2a]/20"
                                                    defaultValue={ressourcerie.phone}
                                                    type="tel"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="font-semibold text-[#3f4a3e] text-xs uppercase tracking-wider">Postal Code</label>
                                                <input
                                                    className="w-full rounded-xl border border-[#becaba]/20 bg-[#f6f3f2] px-4 py-3 text-sm focus:border-[#006e2a] focus:ring-2 focus:ring-[#006e2a]/20"
                                                    defaultValue={ressourcerie.postalCode}
                                                    type="text"
                                                />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="font-semibold text-[#3f4a3e] text-xs uppercase tracking-wider">Address</label>
                                                <input
                                                    className="w-full rounded-xl border border-[#becaba]/20 bg-[#f6f3f2] px-4 py-3 text-sm focus:border-[#006e2a] focus:ring-2 focus:ring-[#006e2a]/20"
                                                    defaultValue={ressourcerie.address}
                                                    type="text"
                                                />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="font-semibold text-[#3f4a3e] text-xs uppercase tracking-wider">City</label>
                                                <input
                                                    className="w-full rounded-xl border border-[#becaba]/20 bg-[#f6f3f2] px-4 py-3 text-sm focus:border-[#006e2a] focus:ring-2 focus:ring-[#006e2a]/20"
                                                    defaultValue={ressourcerie.city}
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <button
                                                type="button"
                                                className="rounded-full bg-gradient-to-r from-[#006e2a] to-[#6ed47c] px-6 py-3 font-semibold text-sm text-white shadow-md transition-all hover:shadow-lg"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>

                                    {/* Partner Profile */}
                                    <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                        <h3 className="mb-6 font-bold font-headline text-[#1c1b1b] text-lg">Partner Profile</h3>
                                        <div className="flex items-center gap-6">
                                            <img
                                                alt={partnerName}
                                                className="h-20 w-20 rounded-full border-4 border-[#6ed47c] object-cover"
                                                src={partnerAvatar}
                                            />
                                            <div className="flex-1 space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="font-semibold text-[#3f4a3e] text-xs uppercase tracking-wider">Name</label>
                                                        <input
                                                            className="w-full rounded-xl border border-[#becaba]/20 bg-[#f6f3f2] px-4 py-3 text-sm focus:border-[#006e2a] focus:ring-2 focus:ring-[#006e2a]/20"
                                                            defaultValue={partnerName}
                                                            type="text"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="font-semibold text-[#3f4a3e] text-xs uppercase tracking-wider">Role</label>
                                                        <input
                                                            className="w-full rounded-xl border border-[#becaba]/20 bg-[#f6f3f2] px-4 py-3 text-sm focus:border-[#006e2a] focus:ring-2 focus:ring-[#006e2a]/20"
                                                            defaultValue={partnerRole}
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                    <h3 className="mb-6 font-bold font-headline text-[#1c1b1b] text-lg">Notification Preferences</h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'New orders', desc: 'Get notified when a new order is placed', enabled: true },
                                            { label: 'Low stock alerts', desc: 'Alert when inventory drops below threshold', enabled: true },
                                            { label: 'Weekly reports', desc: 'Receive weekly sales summary', enabled: false },
                                            { label: 'Team activity', desc: 'Notifications for team member actions', enabled: true },
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center justify-between rounded-lg border border-[#becaba]/10 p-4">
                                                <div>
                                                    <p className="font-headline font-semibold text-[#1c1b1b]">{item.label}</p>
                                                    <p className="text-[#3f4a3e] text-xs">{item.desc}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    className={`relative h-6 w-12 rounded-full transition-colors ${
                                                        item.enabled ? 'bg-[#006e2a]' : 'bg-[#becaba]'
                                                    }`}
                                                >
                                                    <span
                                                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                                                            item.enabled ? 'left-7' : 'left-1'
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                        <h3 className="mb-6 font-bold font-headline text-[#1c1b1b] text-lg">Change Password</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="font-semibold text-[#3f4a3e] text-xs uppercase tracking-wider">
                                                    Current Password
                                                </label>
                                                <input
                                                    className="w-full rounded-xl border border-[#becaba]/20 bg-[#f6f3f2] px-4 py-3 text-sm focus:border-[#006e2a] focus:ring-2 focus:ring-[#006e2a]/20"
                                                    placeholder="Enter current password"
                                                    type="password"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="font-semibold text-[#3f4a3e] text-xs uppercase tracking-wider">New Password</label>
                                                <input
                                                    className="w-full rounded-xl border border-[#becaba]/20 bg-[#f6f3f2] px-4 py-3 text-sm focus:border-[#006e2a] focus:ring-2 focus:ring-[#006e2a]/20"
                                                    placeholder="Enter new password"
                                                    type="password"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="font-semibold text-[#3f4a3e] text-xs uppercase tracking-wider">
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    className="w-full rounded-xl border border-[#becaba]/20 bg-[#f6f3f2] px-4 py-3 text-sm focus:border-[#006e2a] focus:ring-2 focus:ring-[#006e2a]/20"
                                                    placeholder="Confirm new password"
                                                    type="password"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="rounded-full bg-gradient-to-r from-[#006e2a] to-[#6ed47c] px-6 py-3 font-semibold text-sm text-white shadow-md transition-all hover:shadow-lg"
                                            >
                                                Update Password
                                            </button>
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-[#fe7860]/20 bg-[#fe7860]/5 p-6">
                                        <div className="flex items-start gap-4">
                                            <span
                                                className="material-symbols-outlined text-2xl text-[#a73926]"
                                                style={{ fontVariationSettings: "'FILL' 1" }}
                                            >
                                                gpp_maybe
                                            </span>
                                            <div>
                                                <p className="font-bold font-headline text-[#701004]">Two-Factor Authentication</p>
                                                <p className="mt-1 text-[#701004]/80 text-sm">
                                                    Add an extra layer of security to your account by enabling 2FA.
                                                </p>
                                                <button
                                                    type="button"
                                                    className="mt-4 rounded-full border-2 border-[#a73926] px-4 py-2 font-semibold text-[#a73926] text-sm transition-all hover:bg-[#a73926] hover:text-white"
                                                >
                                                    Enable 2FA
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'billing' && (
                                <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                    <h3 className="mb-6 font-bold font-headline text-[#1c1b1b] text-lg">Billing & Subscription</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between rounded-lg border border-[#006e2a]/20 bg-[#006e2a]/5 p-4">
                                            <div>
                                                <p className="font-bold font-headline text-[#006e2a]">Current Plan: Professional</p>
                                                <p className="text-[#3f4a3e] text-xs">Your next billing date is May 15, 2026</p>
                                            </div>
                                            <span className="rounded-full bg-[#006e2a] px-3 py-1 font-bold text-white text-xs">Active</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="rounded-lg border border-[#becaba]/10 p-4 text-center">
                                                <p className="font-bold font-headline text-2xl text-[#1c1b1b]">250</p>
                                                <p className="text-[#3f4a3e] text-xs">Products Included</p>
                                            </div>
                                            <div className="rounded-lg border border-[#becaba]/10 p-4 text-center">
                                                <p className="font-bold font-headline text-2xl text-[#1c1b1b]">5</p>
                                                <p className="text-[#3f4a3e] text-xs">Team Members</p>
                                            </div>
                                            <div className="rounded-lg border border-[#becaba]/10 p-4 text-center">
                                                <p className="font-bold font-headline text-2xl text-[#1c1b1b]">€29</p>
                                                <p className="text-[#3f4a3e] text-xs">Monthly Fee</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="rounded-full border-2 border-[#006e2a] px-6 py-3 font-semibold text-[#006e2a] text-sm transition-all hover:bg-[#006e2a] hover:text-white"
                                        >
                                            Upgrade Plan
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
        </div>
    );
}
