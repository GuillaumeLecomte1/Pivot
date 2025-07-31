import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

export default function About() {
    return (
        <AuthenticatedLayout>
            <Head title="Notre histoire" />

            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">Notre histoire</h1>

                <div className="prose max-w-none">
                    <p className="text-lg mb-6">
                        Pivot est né d'une vision simple : rendre la consommation plus responsable en facilitant l'accès aux ressources de seconde
                        main.
                    </p>

                    <p className="text-lg mb-6">
                        Notre plateforme met en relation les ressourceries françaises avec les particuliers et les professionnels, permettant ainsi de
                        donner une seconde vie aux objets et de réduire notre impact environnemental.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">Notre mission</h2>
                    <p className="text-lg mb-6">
                        Nous nous engageons à promouvoir l'économie circulaire en facilitant l'accès aux ressources de seconde main et en soutenant le
                        développement des ressourceries sur tout le territoire français.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">Nos valeurs</h2>
                    <ul className="list-disc pl-6 mb-6">
                        <li className="text-lg mb-2">Écologie et développement durable</li>
                        <li className="text-lg mb-2">Économie circulaire</li>
                        <li className="text-lg mb-2">Solidarité et inclusion</li>
                        <li className="text-lg mb-2">Innovation et technologie</li>
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
