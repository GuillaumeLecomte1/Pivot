import { Link } from '@inertiajs/react';
import { LayoutDashboard, Package, Users, BarChart3, Settings } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from '@/components/ui/sidebar';

const navItems = [
    { title: 'Overview', href: '/demo/ressourcerie/dashboard', icon: LayoutDashboard },
    { title: 'Inventory', href: '/demo/ressourcerie/inventory', icon: Package },
    { title: 'Team', href: '/demo/ressourcerie/team', icon: Users },
    { title: 'Analytics', href: '/demo/ressourcerie/analytics', icon: BarChart3 },
    { title: 'Settings', href: '/demo/ressourcerie/settings', icon: Settings },
];

export function DemoSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b py-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#006e2a] to-[#6ed47c] text-white">
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            recycling
                        </span>
                    </div>
                    <div className="group-data-[collapsible=icon]:hidden">
                        <h2 className="font-extrabold font-headline text-[#006e2a] text-lg leading-tight">Partner Hub</h2>
                        <p className="font-medium text-[#3f4a3e] text-xs tracking-wide opacity-70">Circular Economy</p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title} isActive={false}>
                                <Link href={item.href}>
                                    <item.icon className="size-5" />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}

export { SidebarTrigger };
