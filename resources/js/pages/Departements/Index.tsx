import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FranceMap } from '@/components/FranceMap';

export default function DepartementsIndex() {
    const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>();

    const handleSelectDepartment = (deptCode: string) => {
        setSelectedDepartment(deptCode);
        // Redirect to the ressourceries page for this department
        window.location.href = `/departements/${deptCode}/ressourceries`;
    };

    return (
        <>
            <Head title="Choisissez votre département - Pivot" />

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 font-bold text-4xl">Choisissez votre département</h1>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Découvrez les ressourceries partenaires près de chez vous. Sélectionnez un département pour voir les produits disponibles.
                    </p>
                </div>

                <FranceMap onSelectDepartment={handleSelectDepartment} selectedDepartment={selectedDepartment} />

                <div className="mt-16 text-center">
                    <p className="text-muted-foreground text-sm">Pour cette démo, seul le département 49 (Maine-et-Loire) est disponible.</p>
                </div>
            </div>
        </>
    );
}
