import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import type { BreadcrumbItem } from '@/types';
import type { BreadcrumbItem } from '@/types';

interface TeamMember {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: 'admin' | 'editor' | 'staff' | 'away';
}

interface Props {
    currentUser: {
        name: string;
        role: string;
        avatar: string;
    };
    stats: {
        totalStaff: number;
        pendingInvites: number;
        lastActivity: string;
    };
    members: TeamMember[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/demo/ressourcerie/dashboard',
    },
    {
        title: 'Team',
        href: '/demo/ressourcerie/team',
    },
];

const navItems = [
    { icon: 'dashboard', label: 'Overview', active: false, href: '/demo/ressourcerie/dashboard' },
    { icon: 'inventory_2', label: 'Inventory', active: false, href: '#' },
    { icon: 'group', label: 'Team', active: true, href: '/demo/ressourcerie/team' },
    { icon: 'analytics', label: 'Analytics', active: false, href: '#' },
    { icon: 'settings', label: 'Settings', active: false, href: '#' },
];

export default function DemoTeamPage({ currentUser, stats, members }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('Staff');

    const handleLogout = () => {
        router.visit('/demo/login');
    };

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Invitation sent to ${inviteEmail} as ${inviteRole}`);
        setInviteEmail('');
        setInviteRole('Staff');
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-[#006e2a]/10 text-[#006e2a]';
            case 'editor':
                return 'bg-[#5d5f5f]/10 text-[#5d5f5f]';
            case 'staff':
                return 'bg-[#e5e2e1] text-[#3f4a3e]';
            case 'away':
                return 'bg-[#e5e2e1] text-[#becaba]';
            default:
                return 'bg-[#e5e2e1] text-[#3f4a3e]';
        }
    };

    return (
        <div>
            <Head title="Team Management - Partner Hub" />

            <div className="flex min-h-screen">
                {/* Sidebar Navigation */}
                <aside className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col gap-2 bg-[#f6f3f2] p-4">
                    {/* Logo & Branding */}
                    <div className="mb-8 flex items-center gap-3 px-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#006e2a] to-[#6ed47c] text-white">
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                recycling
                            </span>
                        </div>
                        <div>
                            <h2 className="font-extrabold font-headline text-[#006e2a] text-lg leading-tight">Partner Hub</h2>
                            <p className="font-medium text-[#3f4a3e] text-[10px] uppercase tracking-widest">Circular Economy</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-1 flex-col gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                className={`flex items-center gap-3 px-4 py-3 font-headline font-medium text-sm tracking-wide transition-transform duration-200 ${
                                    item.active
                                        ? 'scale-95 rounded-lg bg-gradient-to-br from-[#006e2a] to-[#6ed47c] text-white shadow-sm'
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
                    <div className="mt-auto flex flex-col gap-1 border-[#becaba]/10 border-t pt-4">
                        <button
                            type="button"
                            className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#006e2a] to-[#6ed47c] px-4 py-3 font-semibold text-sm text-white shadow-md transition-all hover:opacity-90"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                            List New Item
                        </button>
                        <a
                            className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-[#1c1b1b] text-sm hover:bg-[#f0edec]"
                            href="/demo/ressourcerie/dashboard"
                        >
                            <span className="material-symbols-outlined text-xl">contact_support</span>
                            Support
                        </a>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-[#ba1a1a] text-sm hover:bg-[#f0edec]"
                        >
                            <span className="material-symbols-outlined text-xl">logout</span>
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="ml-64 min-h-screen">
                    {/* Top App Bar */}
                    <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-[#fcf9f8]/80 px-8 py-4 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <h1 className="font-bold font-headline text-2xl text-[#006e2a] tracking-tight">Team Management</h1>
                        </div>
                        <div className="flex items-center gap-6">
                            <button type="button" className="relative rounded-full p-2 text-[#3f4a3e] transition-colors hover:bg-[#f0edec]">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-[#fcf9f8] bg-[#a73926]"></span>
                            </button>
                            <button type="button" className="rounded-full p-2 text-[#3f4a3e] transition-colors hover:bg-[#f0edec]">
                                <span className="material-symbols-outlined">help</span>
                            </button>
                            <div className="flex items-center gap-3 border-[#becaba]/20 border-l pl-4">
                                <div className="hidden text-right sm:block">
                                    <p className="font-bold font-headline text-xs">{currentUser.name}</p>
                                    <p className="text-[#3f4a3e] text-[10px]">{currentUser.role}</p>
                                </div>
                                <img
                                    alt={`${currentUser.name} profile`}
                                    className="h-10 w-10 rounded-full border-2 border-[#006e2a]/20 object-cover"
                                    src={currentUser.avatar}
                                />
                            </div>
                        </div>
                    </header>

                    {/* Page Canvas */}
                    <div className="mx-auto max-w-7xl p-8">
                        {/* Bento Stats Grid */}
                        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4">
                            <div className="group flex items-center justify-between rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6 transition-all hover:bg-[#fcf9f8] md:col-span-2">
                                <div>
                                    <p className="mb-1 font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Total Active Staff</p>
                                    <h3 className="font-extrabold font-headline text-4xl text-[#006e2a]">{stats.totalStaff}</h3>
                                    <p className="mt-2 flex items-center gap-1 font-medium text-[#006e2a] text-xs">
                                        <span className="material-symbols-outlined text-xs">trending_up</span>
                                        +3 since last month
                                    </p>
                                </div>
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#006e2a]/5 text-[#006e2a] transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        badge
                                    </span>
                                </div>
                            </div>
                            <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                <p className="mb-1 font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Pending Invites</p>
                                <h3 className="font-extrabold font-headline text-4xl text-[#1c1b1b]">{stats.pendingInvites}</h3>
                                <div className="-space-x-2 mt-3 flex">
                                    <div className="h-6 w-6 rounded-full border-2 border-[#ffffff] bg-[#bebfbf]"></div>
                                    <div className="h-6 w-6 rounded-full border-2 border-[#ffffff] bg-[#6ed47c]"></div>
                                    <div className="h-6 w-6 rounded-full border-2 border-[#ffffff] bg-[#fe7860]"></div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-[#becaba]/10 bg-[#ffffff] p-6">
                                <p className="mb-1 font-medium text-[#3f4a3e] text-xs uppercase tracking-wider">Last Activity</p>
                                <h3 className="mt-2 font-bold font-headline text-lg">{stats.lastActivity}</h3>
                                <p className="mt-1 text-[#3f4a3e] text-xs">Inventory Update</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                            {/* Team List Section */}
                            <div className="space-y-8 lg:col-span-8">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="flex items-center gap-2 font-bold font-headline text-xl">
                                        Active Members
                                        <span className="rounded-full bg-[#006e2a]/10 px-2 py-0.5 font-bold text-[#006e2a] text-[10px]">LIVE</span>
                                    </h2>
                                    <div className="flex items-center gap-2 rounded-full border border-[#becaba]/5 bg-[#f0edec] px-4 py-2">
                                        <span className="material-symbols-outlined text-[#3f4a3e] text-sm">search</span>
                                        <input
                                            className="w-32 border-none bg-transparent text-xs focus:ring-0"
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search members..."
                                            type="text"
                                            value={searchQuery}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {members.map((member) => (
                                        <div
                                            key={member.id}
                                            className="group flex items-center gap-4 rounded-xl border border-[#becaba]/10 bg-[#f6f3f2] p-5 transition-all hover:bg-white hover:shadow-[#006e2a]/5 hover:shadow-xl"
                                        >
                                            <img
                                                alt={`${member.name} avatar`}
                                                className={`h-12 w-12 rounded-full object-cover ${member.role === 'away' ? 'opacity-60 grayscale' : ''}`}
                                                src={member.avatar}
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-bold font-headline text-[#1c1b1b]">{member.name}</h4>
                                                <p className="text-[#3f4a3e] text-xs">{member.email}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {member.role === 'away' ? (
                                                    <span
                                                        className={`rounded px-2 py-1 font-bold text-[10px] uppercase ${getRoleBadgeColor(member.role)}`}
                                                    >
                                                        Away
                                                    </span>
                                                ) : (
                                                    <>
                                                        {member.role === 'admin' ? (
                                                            <span
                                                                className={`rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-wider ${getRoleBadgeColor(member.role)}`}
                                                            >
                                                                Admin
                                                            </span>
                                                        ) : (
                                                            <div className="hidden flex-col items-end md:flex">
                                                                <span className="font-bold text-[#3f4a3e] text-[10px] uppercase tracking-tighter">
                                                                    Current Role
                                                                </span>
                                                                <p className="font-medium text-xs capitalize">{member.role}</p>
                                                            </div>
                                                        )}
                                                        <button
                                                            type="button"
                                                            className="rounded-lg p-2 text-[#3f4a3e] transition-colors hover:bg-[#ebe7e7]"
                                                        >
                                                            <span className="material-symbols-outlined text-xl">more_vert</span>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Admin Actions & Invite Sidebar */}
                            <div className="space-y-8 lg:col-span-4">
                                {/* Invite Panel */}
                                <section className="relative overflow-hidden rounded-3xl bg-[#f0edec] p-8">
                                    <div className="-right-10 -top-10 absolute h-32 w-32 rounded-full bg-[#006e2a]/10 blur-3xl"></div>
                                    <div className="-bottom-10 -left-10 absolute h-24 w-24 rounded-full bg-[#fe7860]/10 blur-2xl"></div>
                                    <div className="relative z-10">
                                        <h3 className="mb-2 font-bold font-headline text-[#1c1b1b] text-xl">Invite New Member</h3>
                                        <p className="mb-6 text-[#3f4a3e] text-sm leading-relaxed">
                                            Expand your circular economy impact by adding more experts to your hub.
                                        </p>
                                        <form className="space-y-4" onSubmit={handleInvite}>
                                            <div>
                                                <label
                                                    htmlFor="invite-email"
                                                    className="mb-1 ml-1 block font-bold text-[#3f4a3e] text-[10px] uppercase tracking-widest"
                                                >
                                                    Email Address
                                                </label>
                                                <input
                                                    id="invite-email"
                                                    className="w-full rounded-xl border-none bg-[#ffffff] px-4 py-3 text-sm placeholder-[#6f7a6d] focus:ring-2 focus:ring-[#006e2a]/20"
                                                    onChange={(e) => setInviteEmail(e.target.value)}
                                                    placeholder="colleague@example.com"
                                                    type="email"
                                                    value={inviteEmail}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="invite-role"
                                                    className="mb-1 ml-1 block font-bold text-[#3f4a3e] text-[10px] uppercase tracking-widest"
                                                >
                                                    Select Role
                                                </label>
                                                <select
                                                    id="invite-role"
                                                    className="w-full rounded-xl border-none bg-[#ffffff] px-4 py-3 text-sm focus:ring-2 focus:ring-[#006e2a]/20"
                                                    onChange={(e) => setInviteRole(e.target.value)}
                                                    value={inviteRole}
                                                >
                                                    <option>Staff</option>
                                                    <option>Editor</option>
                                                    <option>Admin</option>
                                                </select>
                                            </div>
                                            <button
                                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#006e2a] py-4 font-bold text-sm text-white shadow-lg transition-all hover:shadow-[#006e2a]/20 hover:shadow-xl"
                                                type="submit"
                                            >
                                                <span className="material-symbols-outlined text-lg">send</span>
                                                Send Invitation
                                            </button>
                                        </form>
                                    </div>
                                </section>

                                {/* Quick Permissions Reference */}
                                <div className="rounded-2xl border border-[#becaba]/10 bg-[#fcf9f8] p-6">
                                    <h4 className="mb-4 font-extrabold text-[#3f4a3e] text-xs uppercase tracking-widest">Role Reference</h4>
                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#006e2a]"></div>
                                            <div>
                                                <p className="font-bold text-xs">Admin</p>
                                                <p className="text-[#3f4a3e] text-[10px]">Full access to billing, settings, and staff management.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#6ed47c]"></div>
                                            <div>
                                                <p className="font-bold text-xs">Editor</p>
                                                <p className="text-[#3f4a3e] text-[10px]">Can manage inventory, listings and view analytics.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#becaba]"></div>
                                            <div>
                                                <p className="font-bold text-xs">Staff</p>
                                                <p className="text-[#3f4a3e] text-[10px]">
                                                    Read-only access to hub metrics and listing draft creation.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Banner */}
                                <div className="flex items-start gap-3 rounded-xl bg-[#fe7860]/10 p-5">
                                    <span className="material-symbols-outlined text-[#a73926]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        gpp_maybe
                                    </span>
                                    <div>
                                        <p className="font-bold text-[#701004] text-xs">Security Audit Due</p>
                                        <p className="mt-1 text-[#701004]/80 text-[10px]">
                                            Review your admin list every 90 days to maintain high security standards.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
