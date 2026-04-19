import type { PropsWithChildren } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem } from '@/types';

interface DemoPageLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function DemoPageLayout({ children, breadcrumbs = [] }: DemoPageLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </header>
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
