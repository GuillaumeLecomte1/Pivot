import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import MainNavbar from '@/components/MainNavbar';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen">
            <MainNavbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
