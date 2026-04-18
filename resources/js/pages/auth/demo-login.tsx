import { Head, router, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { useAutoFill } from '@/hooks/useAutoFill';
import { cn } from '@/lib/utils';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface DemoCredentials {
    email: string;
    password: string;
}

interface LoginProps {
    canResetPassword: boolean;
}

export default function DemoLogin({ canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [demoType, setDemoType] = useState<'client' | 'ressourcier' | null>(null);
    const [demoAutoSubmit, setDemoAutoSubmit] = useState(false);
    const { isAnimating, cursorVisible, startAnimation } = useAutoFill();

    // Check for demo query parameter on mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const demoValue = urlParams.get('demo');
        if (demoValue === 'client' || demoValue === 'ressourcier') {
            setDemoType(demoValue);
        }
    }, []);

    // Fetch demo credentials and start animation when demoType is set
    useEffect(() => {
        if (!demoType || isAnimating || demoAutoSubmit) {
            return;
        }

        const fetchAndAnimate = async () => {
            try {
                const response = await fetch('/api/demo/credentials');
                if (!response.ok) {
                    throw new Error('Failed to fetch demo credentials');
                }
                const credentials: { client: DemoCredentials; ressourcier: DemoCredentials } = await response.json();
                const demoCreds = demoType === 'client' ? credentials.client : credentials.ressourcier;

                startAnimation({
                    email: demoCreds.email,
                    password: demoCreds.password,
                    onEmailChange: (value) => setData('email', value),
                    onPasswordChange: (value) => setData('password', value),
                    onComplete: () => {
                        setDemoAutoSubmit(true);
                    },
                });
            } catch (error) {
                console.error('Demo auto-fill error:', error);
            }
        };

        fetchAndAnimate();
    }, [demoType, isAnimating, demoAutoSubmit, setData, startAnimation]);

    // Auto-submit form after animation completes
    useEffect(() => {
        if (demoAutoSubmit && !isAnimating && data.email && data.password) {
            post(route('login'), {
                onSuccess: () => {
                    if (demoType === 'ressourcier') {
                        router.visit('/demo/ressourcerie/dashboard');
                    } else {
                        router.visit('/');
                    }
                },
                onFinish: () => {
                    reset('password');
                    setDemoAutoSubmit(false);
                },
            });
        }
    }, [demoAutoSubmit, isAnimating, data.email, data.password, post, reset, demoType]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Sign in - EcoPivot Partner Hub" />

            <div className="flex min-h-screen">
                {/* Image Section */}
                <section className="hidden items-center justify-center overflow-hidden bg-[#f6f3f2] p-12 lg:relative lg:flex lg:w-7/12">
                    <div className="relative h-full w-full overflow-hidden rounded-xl shadow-2xl">
                        <img
                            alt="Sustainable wood workshop"
                            className="absolute inset-0 h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJk5NimRQwVZ5lZWYAW6MN97-OdQd1CG5Eu-RofIO1DKHs2plhqYvKZfd9K1b8hEaCwjWVw287gZn862xbw9D-OYTukO6nNW-1KEjwAU0nTLR9z9UlqiIEIWVxhF53zsMLrDk-r2joL-a0IQxLd0DRFGgqRK0-az31KUIgiloO4tPJDzovp_DsFAQ8zCDU8-Zj40BVPkcCaMpi6jUmiB9ZOpM8jaVh9xHmfmU8Ta1QHWnSCstcROb4q2oUPKnZY6yBtFmaX-Gx0wTr"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#006e2a]/60 to-transparent opacity-40 mix-blend-multiply" />
                        <div className="absolute right-12 bottom-12 left-12 text-white">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
                                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    eco
                                </span>
                                <span className="font-medium text-xs uppercase tracking-widest">Partner Ecosystem</span>
                            </div>
                            <h1 className="mb-4 font-extrabold font-headline text-5xl leading-tight tracking-tighter">
                                Curating the future <br />
                                of circular commerce.
                            </h1>
                            <p className="max-w-md text-lg opacity-90">
                                Join the Ressourcerie network and transform surplus into sustainable growth.
                            </p>
                        </div>
                    </div>
                    <div className="-top-12 -right-12 absolute h-64 w-64 rounded-full bg-[#6ed47c]/20 blur-3xl lg:absolute" />
                    <div className="-bottom-12 -left-12 absolute h-96 w-96 rounded-full bg-[#fe7860]/10 blur-3xl lg:absolute" />
                </section>

                {/* Form Section */}
                <section className="flex w-full flex-col items-center justify-center bg-[#fcf9f8] px-6 md:px-16 lg:w-5/12 lg:px-24">
                    <div className="w-full max-w-md space-y-10">
                        <header className="flex flex-col items-center text-center lg:items-start lg:text-left">
                            <div className="mb-8 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#006e2a] to-[#6ed47c] text-white shadow-lg">
                                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        cycle
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold font-headline text-[#006e2a] text-xl tracking-tight">EcoPivot</span>
                                    <span className="text-[#6f7a6d] text-xs uppercase tracking-widest">Partner Hub</span>
                                </div>
                            </div>
                            <h2 className="mb-2 font-extrabold font-headline text-3xl text-[#1c1b1b] tracking-tight">Welcome Back</h2>
                            <p className="text-[#3f4a3e] opacity-70">Please enter your credentials to manage your inventory.</p>
                        </header>

                        <form className="space-y-6" onSubmit={submit}>
                            <div className="space-y-2">
                                <label className="px-1 font-semibold text-[#3f4a3e] text-sm tracking-wide" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="group relative">
                                    <input
                                        className={cn(
                                            'w-full rounded-xl border-0 bg-[#f0edec] px-4 py-4 text-[#1c1b1b] placeholder-[#becaba]/50 outline-none transition-all duration-200 focus:bg-[#e5e2e1] focus:ring-2 focus:ring-[#76dc83]',
                                            isAnimating && cursorVisible ? 'pr-12' : 'pr-4',
                                        )}
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="name@ressourcerie.com"
                                    />
                                    <div className="-translate-y-1/2 absolute top-1/2 right-4 opacity-0 transition-opacity group-focus-within:opacity-100">
                                        <span className="material-symbols-outlined text-[#006e2a] text-xl">alternate_email</span>
                                    </div>
                                    {isAnimating && cursorVisible && (
                                        <span
                                            className="-translate-y-1/2 absolute top-1/2 right-3 h-5 w-0.5 animate-blink bg-[#1c1b1b]"
                                            style={{ animation: 'blink 1s step-end infinite' }}
                                        />
                                    )}
                                </div>
                                {errors.email && <p className="px-1 text-[#ba1a1a] text-sm">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between px-1">
                                    <label className="font-semibold text-[#3f4a3e] text-sm tracking-wide" htmlFor="password">
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <a
                                            className="font-semibold text-[#006e2a] text-xs transition-colors hover:text-[#005a21]"
                                            href={route('password.request')}
                                        >
                                            Forgot password?
                                        </a>
                                    )}
                                </div>
                                <div className="group relative">
                                    <input
                                        className={cn(
                                            'w-full rounded-xl border-0 bg-[#f0edec] px-4 py-4 text-[#1c1b1b] placeholder-[#becaba]/50 outline-none transition-all duration-200 focus:bg-[#e5e2e1] focus:ring-2 focus:ring-[#76dc83]',
                                            isAnimating && cursorVisible ? 'pr-12' : 'pr-12',
                                        )}
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        className="-translate-y-1/2 absolute top-1/2 right-4 text-[#6f7a6d] transition-colors hover:text-[#1c1b1b]"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                    {isAnimating && cursorVisible && (
                                        <span
                                            className="-translate-y-1/2 absolute top-1/2 right-12 h-5 w-0.5 animate-blink bg-[#1c1b1b]"
                                            style={{ animation: 'blink 1s step-end infinite' }}
                                        />
                                    )}
                                </div>
                                {errors.password && <p className="px-1 text-[#ba1a1a] text-sm">{errors.password}</p>}
                            </div>

                            <div className="flex items-center gap-3 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-0 bg-[#f0edec] text-[#006e2a] transition-all focus:ring-[#006e2a] focus:ring-offset-0"
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <label className="cursor-pointer select-none text-[#3f4a3e] text-sm" htmlFor="remember">
                                    Keep me signed in for 30 days
                                </label>
                            </div>

                            <button
                                className="hover:-translate-y-0.5 flex w-full transform items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#006e2a] to-[#6ed47c] py-4 font-bold font-headline text-white shadow-[#006e2a]/20 shadow-lg transition-all duration-200 hover:shadow-[#006e2a]/30 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                type="submit"
                                disabled={processing}
                            >
                                <span>{processing ? 'Signing in...' : 'Sign in to Dashboard'}</span>
                                <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
                            </button>
                        </form>

                        <div className="border-[#becaba]/10 border-t pt-6">
                            <p className="text-center text-[#3f4a3e] text-sm">
                                Interested in becoming a partner?
                                <a className="ml-1 font-bold text-[#006e2a] decoration-2 underline-offset-4 hover:underline" href={route('register')}>
                                    Apply for access
                                </a>
                            </p>
                        </div>
                    </div>

                    <footer className="mt-20 flex gap-6 opacity-40">
                        <a className="text-[#3f4a3e] text-[10px] uppercase tracking-widest transition-opacity hover:opacity-100" href="/privacy">
                            Privacy
                        </a>
                        <a className="text-[#3f4a3e] text-[10px] uppercase tracking-widest transition-opacity hover:opacity-100" href="/terms">
                            Terms
                        </a>
                        <a className="text-[#3f4a3e] text-[10px] uppercase tracking-widest transition-opacity hover:opacity-100" href="/support">
                            Support
                        </a>
                    </footer>
                </section>
            </div>

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .animate-blink {
                    animation: blink 1s step-end infinite;
                }
            `}</style>
        </>
    );
}
