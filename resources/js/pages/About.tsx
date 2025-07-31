import { Head } from '@inertiajs/react';
import AppLayout from '@/components/AppLayout';

export default function About() {
    return (
        <AppLayout>
            <Head title="Notre histoire" />

            <div className="container mx-auto px-4 py-12">
                <h1 className="mb-8 font-bold text-4xl">Notre histoire</h1>

                <div className="prose max-w-none">
                    <p className="mb-6 text-lg">
                        Pivot est né d'une vision simple : rendre la consommation plus responsable en facilitant l'accès aux ressources de seconde
                        main.
                    </p>

                    <p className="mb-6 text-lg">
                        Notre plateforme met en relation les ressourceries françaises avec les particuliers et les professionnels, permettant ainsi de
                        donner une seconde vie aux objets et de réduire notre impact environnemental.
                    </p>

                    <h2 className="mt-8 mb-4 font-semibold text-2xl">Notre mission</h2>
                    <p className="mb-6 text-lg">
                        Nous nous engageons à promouvoir l'économie circulaire en facilitant l'accès aux ressources de seconde main et en soutenant le
                        développement des ressourceries sur tout le territoire français.
                    </p>

                    <h2 className="mt-8 mb-4 font-semibold text-2xl">Nos valeurs</h2>
                    <ul className="mb-6 list-disc pl-6">
                        <li className="mb-2 text-lg">Écologie et développement durable</li>
                        <li className="mb-2 text-lg">Économie circulaire</li>
                        <li className="mb-2 text-lg">Solidarité et inclusion</li>
                        <li className="mb-2 text-lg">Innovation et technologie</li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
