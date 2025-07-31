import type { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';

interface NavbarLayoutProps {
    children: ReactNode;
}

export default function NavbarLayout({ children }: NavbarLayoutProps) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            <main className="flex-1 px-4 py-6 md:px-6">{children}</main>
        </div>
    );
}
