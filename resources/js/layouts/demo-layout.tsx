import type { ReactNode } from 'react';
import { DemoSidebar } from '@/components/demo-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

interface DemoLayoutProps {
    children: ReactNode;
    title?: string;
    user?: {
        name?: string;
        role?: string;
        avatar?: string;
    };
}

export default function DemoLayout({ children, title, user }: DemoLayoutProps) {
    return (
        <SidebarProvider defaultOpen={true}>
            <DemoSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-40 flex h-16 w-full items-center gap-4 border-b bg-[#fcf9f8]/80 px-6 backdrop-blur-xl">
                    <SidebarTrigger />
                    {title && <h1 className="font-bold font-headline text-[#006e2a] text-xl">{title}</h1>}
                    <div className="ml-auto flex items-center gap-4">
                        <button type="button" className="rounded-full p-2 text-[#3f4a3e] transition-colors hover:bg-[#f0edec]">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        {user?.name && (
                            <>
                                <div className="h-8 w-px bg-[#becaba]/20"></div>
                                <div className="flex items-center gap-3">
                                    <div className="hidden text-right sm:block">
                                        <p className="font-bold font-headline text-[#1c1b1b] text-sm">{user.name}</p>
                                        {user.role && <p className="text-[#3f4a3e] text-xs opacity-70">{user.role}</p>}
                                    </div>
                                    {user.avatar && (
                                        <img
                                            alt={`${user.name} profile`}
                                            className="h-10 w-10 rounded-full border-2 border-[#6ed47c] object-cover"
                                            src={user.avatar}
                                        />
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </header>
                <main className="flex-1 p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
