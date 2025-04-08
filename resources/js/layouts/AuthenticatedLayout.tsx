import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import MainNavbar from '@/components/MainNavbar';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-[#F7F7F7]">
            <Head title="Pivot" />
            
            <MainNavbar />

            <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-8">
                {children}
            </main>
            </div>
    );
} 