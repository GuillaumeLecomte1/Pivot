import type { PropsWithChildren } from 'react';
import { SidebarInset } from '@/components/ui/sidebar';
import { DemoSidebar } from '@/components/demo-sidebar';
import type { BreadcrumbItem } from '@/types';

interface DemoPageLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function DemoPageLayout({ children, breadcrumbs = [] }: DemoPageLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col">
            <DemoSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
                    {/* Header content can be added here if needed */}
                </header>
                <main className="flex-1">
                    {children}
                </main>
            </SidebarInset>
        </div>
    );
}
