import { Head, router } from '@inertiajs/react';
import { motion, type Variants } from 'framer-motion';
import { User, Store } from 'lucide-react';

import AppLayout from '@/components/AppLayout';

type DemoType = 'client' | 'ressourcier';

export default function DemoIndex() {
    const handleDemoSelect = (type: DemoType) => {
        // Navigate to login page with demo type indicator
        // The auto-fill animation will be handled by demo-auto-fill-animation feature
        router.visit('/login', {
            data: { demo: type },
            method: 'get',
        });
    };

    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut' as const,
            },
        },
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <AppLayout>
            <Head title="Démonstration - Pivot" />

            <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-12">
                <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full max-w-4xl text-center">
                    <motion.h1 variants={cardVariants} className="mb-4 font-bold text-4xl text-gray-900 md:text-5xl dark:text-white">
                        Choisissez votre démonstration
                    </motion.h1>
                    <motion.p variants={cardVariants} className="mb-12 text-gray-600 text-lg dark:text-gray-400">
                        Découvrez comment Pivot peut vous aider à trouver des produits d&apos;occasion de qualité
                    </motion.p>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Client Demo Card */}
                        <motion.div variants={cardVariants}>
                            <button
                                type="button"
                                onClick={() => handleDemoSelect('client')}
                                className="group hover:-translate-y-2 relative block w-full rounded-3xl bg-white p-8 text-left shadow-lg transition-all hover:shadow-xl dark:bg-neutral-800 dark:shadow-neutral-900/20"
                            >
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#6ED47C]/10 transition-colors group-hover:bg-[#6ED47C]/20">
                                    <User className="h-10 w-10 text-[#6ED47C]" />
                                </div>

                                <h2 className="mb-3 font-bold text-2xl text-gray-900 dark:text-white">Démonstration Client</h2>
                                <p className="mb-6 text-gray-600 dark:text-gray-400">
                                    Explorez le catalogue, découvrez les produits et trouvez la perle rare près de chez vous
                                </p>

                                <div className="flex items-center font-medium text-[#6ED47C]">
                                    <span>Commencer la démonstration</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>

                                {/* Decorative corner accent */}
                                <div className="-translate-y-8 absolute top-0 right-0 h-32 w-32 translate-x-8 rounded-full bg-[#6ED47C]/5 blur-3xl" />
                            </button>
                        </motion.div>

                        {/* Ressourcier Demo Card */}
                        <motion.div variants={cardVariants}>
                            <button
                                type="button"
                                onClick={() => handleDemoSelect('ressourcier')}
                                className="group hover:-translate-y-2 relative block w-full rounded-3xl bg-white p-8 text-left shadow-lg transition-all hover:shadow-xl dark:bg-neutral-800 dark:shadow-neutral-900/20"
                            >
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#6ED47C]/10 transition-colors group-hover:bg-[#6ED47C]/20">
                                    <Store className="h-10 w-10 text-[#6ED47C]" />
                                </div>

                                <h2 className="mb-3 font-bold text-2xl text-gray-900 dark:text-white">Démonstration Ressourcerie</h2>
                                <p className="mb-6 text-gray-600 dark:text-gray-400">
                                    Gérez votre espace, ajoutez des produits et suivez vos ventes en temps réel
                                </p>

                                <div className="flex items-center font-medium text-[#6ED47C]">
                                    <span>Commencer la démonstration</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>

                                {/* Decorative corner accent */}
                                <div className="-translate-y-8 absolute top-0 right-0 h-32 w-32 translate-x-8 rounded-full bg-[#6ED47C]/5 blur-3xl" />
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </AppLayout>
    );
}
