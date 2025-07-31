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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="max-w-xl">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Informations du profil</h2>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Mettez à jour les informations de votre compte.</p>

                            <form onSubmit={submitProfile} className="mt-6 space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nom
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />
                                    {profileErrors.name && <p className="mt-2 text-sm text-red-600">{profileErrors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData('email', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />
                                    {profileErrors.email && <p className="mt-2 text-sm text-red-600">{profileErrors.email}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={profileProcessing}
                                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Enregistrer
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="max-w-xl">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Préférences de thème</h2>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Personnalisez l'apparence de votre interface.</p>

                            <div className="mt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Thème actuel</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {theme === 'light' ? 'Thème clair' : theme === 'dark' ? 'Thème sombre' : 'Thème système'}
                                        </p>
                                    </div>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="max-w-xl">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Modifier le mot de passe</h2>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Assurez-vous d'utiliser un mot de passe long et sécurisé.</p>

                            <form onSubmit={submitPassword} className="mt-6 space-y-6">
                                <div>
                                    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Mot de passe actuel
                                    </label>
                                    <input
                                        id="current_password"
                                        type="password"
                                        value={passwordData.current_password}
                                        onChange={(e) => setPasswordData('current_password', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />
                                    {passwordErrors.current_password && (
                                        <p className="mt-2 text-sm text-red-600">{passwordErrors.current_password}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nouveau mot de passe
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={passwordData.password}
                                        onChange={(e) => setPasswordData('password', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />
                                    {passwordErrors.password && <p className="mt-2 text-sm text-red-600">{passwordErrors.password}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Confirmer le mot de passe
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        value={passwordData.password_confirmation}
                                        onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={passwordProcessing}
                                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
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
