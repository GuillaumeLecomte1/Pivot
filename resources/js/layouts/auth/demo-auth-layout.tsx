import type { PropsWithChildren } from 'react';

export default function DemoAuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#fcf9f8] p-6 md:p-10">
            <div className="w-full max-w-md">
                <div className="rounded-xl border border-[#e5e2e1]/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300">
                    <div className="flex flex-col gap-8">{children}</div>
                </div>
            </div>
        </div>
    );
}
