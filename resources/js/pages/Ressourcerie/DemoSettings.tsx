import { useState } from 'react';
import { Head } from '@inertiajs/react';
import DemoLayout from '@/layouts/demo-layout';

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

export default function DemoSettingsPage({ partnerName, partnerRole, partnerAvatar, ressourcerie }: Props) {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { key: 'profile', label: 'Profile', icon: 'person' },
        { key: 'notifications', label: 'Notifications', icon: 'notifications' },
        { key: 'security', label: 'Security', icon: 'lock' },
        { key: 'billing', label: 'Billing', icon: 'credit_card' },
    ];

    return (
        <DemoLayout title="Settings">
            <Head title="Settings - Partner Hub" />

            {/* Tabs */}
            <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-sm transition-all ${
                            activeTab === tab.key
                                ? 'bg-[#006e2a] text-white'
                                : 'bg-[#f0edec] text-[#3f4a3e] hover:bg-[#e5e2e1]'
                        }`}
                    >
                        <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Profile Tab Content */}
            {activeTab === 'profile' && (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Partner Profile */}
                    <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                        <h3 className="mb-6 font-bold font-headline text-lg">Partner Profile</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <img
                                alt={`${partnerName} profile`}
                                className="h-20 w-20 rounded-full border-2 border-[#6ed47c] object-cover"
                                src={partnerAvatar}
                            />
                            <div>
                                <p className="font-bold font-headline text-xl">{partnerName}</p>
                                <p className="text-[#3f4a3e] text-sm">{partnerRole}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Full Name</label>
                                <input
                                    className="w-full rounded-lg border border-[#becaba]/20 bg-[#f0edec] px-4 py-2 text-sm"
                                    defaultValue={partnerName}
                                    type="text"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Email</label>
                                <input
                                    className="w-full rounded-lg border border-[#becaba]/20 bg-[#f0edec] px-4 py-2 text-sm"
                                    defaultValue="partner@example.com"
                                    type="email"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Ressourcerie Info */}
                    <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                        <h3 className="mb-6 font-bold font-headline text-lg">Ressourcerie Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Name</label>
                                <input
                                    className="w-full rounded-lg border border-[#becaba]/20 bg-[#f0edec] px-4 py-2 text-sm"
                                    defaultValue={ressourcerie.name}
                                    type="text"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Address</label>
                                <input
                                    className="w-full rounded-lg border border-[#becaba]/20 bg-[#f0edec] px-4 py-2 text-sm"
                                    defaultValue={ressourcerie.address}
                                    type="text"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">City</label>
                                    <input
                                        className="w-full rounded-lg border border-[#becaba]/20 bg-[#f0edec] px-4 py-2 text-sm"
                                        defaultValue={ressourcerie.city}
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Postal Code</label>
                                    <input
                                        className="w-full rounded-lg border border-[#becaba]/20 bg-[#f0edec] px-4 py-2 text-sm"
                                        defaultValue={ressourcerie.postalCode}
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Phone</label>
                                <input
                                    className="w-full rounded-lg border border-[#becaba]/20 bg-[#f0edec] px-4 py-2 text-sm"
                                    defaultValue={ressourcerie.phone}
                                    type="tel"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Notifications Tab Content */}
            {activeTab === 'notifications' && (
                <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                    <h3 className="mb-6 font-bold font-headline text-lg">Notification Preferences</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'New orders', desc: 'Get notified when you receive a new order' },
                            { label: 'Low stock alerts', desc: 'Get alerted when items are running low' },
                            { label: 'Weekly reports', desc: 'Receive weekly sales and analytics reports' },
                            { label: 'Marketing emails', desc: 'Receive updates about new features and tips' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-[#becaba]/10 pb-4 last:border-0">
                                <div>
                                    <p className="font-medium text-[#1c1b1b]">{item.label}</p>
                                    <p className="text-[#3f4a3e] text-xs">{item.desc}</p>
                                </div>
                                <button
                                    type="button"
                                    className={`relative h-6 w-11 rounded-full transition-colors ${
                                        i < 2 ? 'bg-[#006e2a]' : 'bg-[#becaba]'
                                    }`}
                                >
                                    <span
                                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                                            i < 2 ? 'left-6' : 'left-0.5'
                                        }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Security Tab Content */}
            {activeTab === 'security' && (
                <div className="space-y-6">
                    <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                        <h3 className="mb-6 font-bold font-headline text-lg">Change Password</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Current Password</label>
                                <input
                                    className="w-full rounded-lg border border-[#becaba]/20 bg-[#f0edec] px-4 py-2 text-sm"
                                    type="password"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">New Password</label>
                                <input
                                    className="w-full rounded-lg border border-[#becaba]/20 bg-[#f0edec] px-4 py-2 text-sm"
                                    type="password"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Confirm New Password</label>
                                <input
                                    className="w-full rounded-lg border border-[#becaba]/20 bg-[#f0edec] px-4 py-2 text-sm"
                                    type="password"
                                />
                            </div>
                            <button
                                type="button"
                                className="rounded-lg bg-[#006e2a] px-6 py-2 font-bold text-sm text-white hover:opacity-90"
                            >
                                Update Password
                            </button>
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#fe7860]/20 bg-[#fe7860]/5 p-6">
                        <div className="flex items-start gap-4">
                            <span className="material-symbols-outlined text-[#a73926]">warning</span>
                            <div>
                                <p className="font-bold text-[#701004]">Two-Factor Authentication</p>
                                <p className="mt-1 text-[#701004]/80 text-sm">
                                    Add an extra layer of security to your account by enabling two-factor authentication.
                                </p>
                                <button
                                    type="button"
                                    className="mt-4 rounded-lg border border-[#a73926] px-4 py-2 font-bold text-[#a73926] text-sm hover:bg-[#a73926]/10"
                                >
                                    Enable 2FA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Billing Tab Content */}
            {activeTab === 'billing' && (
                <div className="space-y-6">
                    <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                        <h3 className="mb-6 font-bold font-headline text-lg">Current Plan</h3>
                        <div className="flex items-center justify-between rounded-lg bg-[#006e2a]/10 p-4">
                            <div>
                                <p className="font-bold font-headline text-[#006e2a] text-lg">Professional</p>
                                <p className="text-[#3f4a3e] text-sm">Everything you need to grow</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold font-headline text-2xl text-[#1c1b1b]">€49</p>
                                <p className="text-[#3f4a3e] text-xs">per month</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                        <h3 className="mb-6 font-bold font-headline text-lg">Billing Information</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-[#becaba]/10 pb-4">
                                <span className="text-[#3f4a3e]">Subtotal</span>
                                <span className="font-bold">€49.00</span>
                            </div>
                            <div className="flex justify-between border-b border-[#becaba]/10 pb-4">
                                <span className="text-[#3f4a3e]">Tax (20%)</span>
                                <span className="font-bold">€9.80</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-bold">Total</span>
                                <span className="font-bold font-headline text-[#006e2a] text-xl">€58.80</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DemoLayout>
    );
}
