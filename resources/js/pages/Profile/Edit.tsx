import type { PageProps as InertiaPageProps } from '@inertiajs/core';
import { useForm, usePage } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

interface User {
    name: string;
    email: string;
}

interface PageProps extends InertiaPageProps {
    auth: {
        user: User;
    };
}

export default function Edit() {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;
    const { theme } = useTheme();

    const {
        data: profileData,
        setData: setProfileData,
        patch: updateProfile,
        errors: profileErrors,
        processing: profileProcessing,
    } = useForm({
        name: user.name,
        email: user.email,
    });

    const {
        data: passwordData,
        setData: setPasswordData,
        put: updatePassword,
        errors: passwordErrors,
        processing: passwordProcessing,
        reset: resetPassword,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitProfile: FormEventHandler = (e) => {
        e.preventDefault();
        updateProfile(route('profile.update'));
    };

    const submitPassword: FormEventHandler = (e) => {
        e.preventDefault();
        updatePassword(route('profile.password'), {
            onSuccess: () => resetPassword(),
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="max-w-xl">
                            <h2 className="font-medium text-gray-900 text-lg dark:text-gray-100">Informations du profil</h2>

                            <p className="mt-1 text-gray-600 text-sm dark:text-gray-400">Mettez à jour les informations de votre compte.</p>

                            <form onSubmit={submitProfile} className="mt-6 space-y-6">
                                <div>
                                    <label htmlFor="name" className="block font-medium text-gray-700 text-sm dark:text-gray-300">
                                        Nom
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900"
                                    />
                                    {profileErrors.name && <p className="mt-2 text-red-600 text-sm">{profileErrors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block font-medium text-gray-700 text-sm dark:text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData('email', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900"
                                    />
                                    {profileErrors.email && <p className="mt-2 text-red-600 text-sm">{profileErrors.email}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={profileProcessing}
                                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 font-semibold text-white text-xs uppercase tracking-widest transition duration-150 ease-in-out hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:bg-green-900"
                                >
                                    Enregistrer
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="max-w-xl">
                            <h2 className="font-medium text-gray-900 text-lg dark:text-gray-100">Préférences de thème</h2>

                            <p className="mt-1 text-gray-600 text-sm dark:text-gray-400">Personnalisez l'apparence de votre interface.</p>

                            <div className="mt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900 text-sm dark:text-gray-100">Thème actuel</h3>
                                        <p className="text-gray-500 text-sm dark:text-gray-400">
                                            {theme === 'light' ? 'Thème clair' : theme === 'dark' ? 'Thème sombre' : 'Thème système'}
                                        </p>
                                    </div>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="max-w-xl">
                            <h2 className="font-medium text-gray-900 text-lg dark:text-gray-100">Modifier le mot de passe</h2>

                            <p className="mt-1 text-gray-600 text-sm dark:text-gray-400">Assurez-vous d'utiliser un mot de passe long et sécurisé.</p>

                            <form onSubmit={submitPassword} className="mt-6 space-y-6">
                                <div>
                                    <label htmlFor="current_password" className="block font-medium text-gray-700 text-sm dark:text-gray-300">
                                        Mot de passe actuel
                                    </label>
                                    <input
                                        id="current_password"
                                        type="password"
                                        value={passwordData.current_password}
                                        onChange={(e) => setPasswordData('current_password', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900"
                                    />
                                    {passwordErrors.current_password && (
                                        <p className="mt-2 text-red-600 text-sm">{passwordErrors.current_password}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block font-medium text-gray-700 text-sm dark:text-gray-300">
                                        Nouveau mot de passe
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={passwordData.password}
                                        onChange={(e) => setPasswordData('password', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900"
                                    />
                                    {passwordErrors.password && <p className="mt-2 text-red-600 text-sm">{passwordErrors.password}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password_confirmation" className="block font-medium text-gray-700 text-sm dark:text-gray-300">
                                        Confirmer le mot de passe
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        value={passwordData.password_confirmation}
                                        onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={passwordProcessing}
                                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 font-semibold text-white text-xs uppercase tracking-widest transition duration-150 ease-in-out hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:bg-green-900"
                                >
                                    Mettre à jour le mot de passe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
