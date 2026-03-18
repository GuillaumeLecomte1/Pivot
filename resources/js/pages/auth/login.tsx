import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import type { FormEventHandler } from 'react';
import { useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAutoFill } from '@/hooks/useAutoFill';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

interface DemoCredentials {
    email: string;
    password: string;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

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
                    // For demo ressourcier login, redirect to dashboard
                    if (demoType === 'ressourcier') {
                        router.visit('/ressourcerie/dashboard');
                    }
                    // For other logins (including client demo), let Inertia follow the server redirect (to /)
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
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex="0"
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className={isAnimating && cursorVisible ? 'pr-4' : ''}
                            />
                            {isAnimating && (
                                <span
                                    className="-translate-y-1/2 absolute top-1/2 right-3 h-5 w-0.5 animate-blink bg-gray-900 dark:bg-white"
                                    style={{ animation: 'blink 1s step-end infinite' }}
                                />
                            )}
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex="0">
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex="0"
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                                className={isAnimating && cursorVisible ? 'pr-4' : ''}
                            />
                            {isAnimating && (
                                <span
                                    className="-translate-y-1/2 absolute top-1/2 right-3 h-5 w-0.5 bg-gray-900 dark:bg-white"
                                    style={{ animation: 'blink 1s step-end infinite' }}
                                />
                            )}
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex="0"
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-opacity-90 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-black"
                        tabIndex="0"
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Log in
                    </button>
                </div>

                <div className="text-center text-muted-foreground text-sm">
                    Don't have an account?{' '}
                    <TextLink href={route('register')} tabIndex="0">
                        Sign up
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center font-medium text-green-600 text-sm">{status}</div>}

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </AuthLayout>
    );
}
