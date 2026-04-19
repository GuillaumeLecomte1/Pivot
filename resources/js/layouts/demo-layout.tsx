import type { ReactNode } from 'react';
import { useState } from 'react';

interface DemoLayoutProps {
    children: ReactNode;
    title?: string;
}

const navItems = [
    { icon: 'dashboard', label: 'Overview', href: '/demo/ressourcerie/dashboard' },
    { icon: 'inventory_2', label: 'Inventory', href: '/demo/ressourcerie/inventory' },
    { icon: 'group', label: 'Team', href: '/demo/ressourcerie/team' },
    { icon: 'analytics', label: 'Analytics', href: '/demo/ressourcerie/analytics' },
    { icon: 'settings', label: 'Settings', href: '/demo/ressourcerie/settings' },
];

export default function DemoLayout({ children, title }: DemoLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 flex h-screen flex-col gap-2 bg-[#f6f3f2] p-4 transition-all duration-300 ${
                    collapsed ? 'w-20' : 'w-64'
                }`}
            >
                {/* Logo & Branding */}
                <div className="mb-6 flex items-center gap-3 px-2 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#006e2a] to-[#6ed47c] text-white">
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            recycling
                        </span>
                    </div>
                    {!collapsed && (
                        <div>
                            <h2 className="font-extrabold font-headline text-[#006e2a] text-lg leading-tight">Partner Hub</h2>
                            <p className="font-medium text-[#3f4a3e] text-xs tracking-wide opacity-70">Circular Economy</p>
                        </div>
                    )}
                </div>

                {/* Toggle Button */}
                <button
                    type="button"
                    onClick={() => setCollapsed(!collapsed)}
                    className="mb-4 flex items-center justify-center rounded-lg p-2 text-[#3f4a3e] transition-colors hover:bg-[#f0edec]"
                >
                    <span className={`material-symbols-outlined text-xl transition-transform ${collapsed ? 'rotate-180' : ''}`}>
                        chevron_left
                    </span>
                </button>

                {/* Navigation */}
                <nav className="flex flex-1 flex-col gap-1">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 font-headline font-medium text-sm text-[#1c1b1b] transition-colors hover:bg-[#f0edec]"
                            href={item.href}
                        >
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                {item.icon}
                            </span>
                            {!collapsed && item.label}
                        </a>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="mt-auto flex flex-col gap-1 border-t border-[#becaba]/10 pt-6">
                    <button
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#006e2a] to-[#6ed47c] px-4 py-3 font-semibold text-sm text-white shadow-md transition-all hover:opacity-90"
                    >
                        <span className="material-symbols-outlined text-sm">add</span>
                        {!collapsed && 'List New Item'}
                    </button>
                    {!collapsed && (
                        <button
                            type="button"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 font-headline font-medium text-[#1c1b1b] text-sm transition-colors hover:bg-[#f0edec]"
                        >
                            <span className="material-symbols-outlined text-xl">contact_support</span>
                            Support
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className={`min-h-screen transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
                {/* Header */}
                <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-[#fcf9f8]/80 px-8 py-4 backdrop-blur-xl">
                    <div className="flex items-center gap-8">
                        {title && (
                            <h1 className="font-bold font-headline text-[#006e2a] text-xl tracking-tight">{title}</h1>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <button type="button" className="rounded-full p-2 text-[#3f4a3e] transition-colors hover:bg-[#f0edec]">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button type="button" className="rounded-full p-2 text-[#3f4a3e] transition-colors hover:bg-[#f0edec]">
                            <span className="material-symbols-outlined">help</span>
                        </button>
                        <div className="mx-2 h-8 w-px bg-[#becaba]/20"></div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
