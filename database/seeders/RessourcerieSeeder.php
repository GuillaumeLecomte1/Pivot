<?php

namespace Database\Seeders;

use App\Models\Ressourcerie;
use Illuminate\Database\Seeder;

final class RessourcerieSeeder extends Seeder
{
    public function run(): void
    {
        $ressourceries = [
            [
                'name' => 'Ressourcerie du Layon',
                'description' => 'Une ressourcerie associative à Saumur spécialisée dans la collecte et la valorisation des objets usagers. Nous proposons une large gamme d\'articles ménagers, de mobilier et d\'équipements pour la maison.',
                'address' => '12 Rue de la Loire',
                'city' => 'Saumur',
                'department' => '49',
                'postal_code' => '49400',
                'phone' => '02 41 50 12 34',
                'email' => 'contact@ressourcerie-layon.fr',
                'image_url' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
            ],
            [
                'name' => 'La Clef des Champs',
                'description' => 'Association d\'insertion par l\'activité économique, nous collectons, incontournons et revendons des biens d\'occasion tout en accompagnant des personnes éloignées de l\'emploi.',
                'address' => '8 Boulevard Foch',
                'city' => 'Angers',
                'department' => '49',
                'postal_code' => '49100',
                'phone' => '02 41 87 65 43',
                'email' => 'info@clefdeschamps.fr',
                'image_url' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
            ],
            [
                'name' => 'Emmaüs Angers',
                'description' => 'Movement d\'insertion sociale, Emmaüs Angers collecte et revend des meubles, vêtements et objets divers au profit de l\'action sociale.',
                'address' => '25 Rue de la Baraudière',
                'city' => 'Angers',
                'department' => '49',
                'postal_code' => '49000',
                'phone' => '02 41 34 56 78',
                'email' => 'angers@emmaus-france.org',
                'image_url' => 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800',
            ],
            [
                'name' => 'La Recyclerie du Thouet',
                'description' => 'Site de récupération et de valorisation des déchets situé à Montreuil-Juigné. Nous proposons des objets de seconde main à petits prix.',
                'address' => 'Zone Industrielle du Thouet',
                'city' => 'Montreuil-Juigné',
                'department' => '49',
                'postal_code' => '49460',
                'phone' => '02 41 45 67 89',
                'email' => 'contact@recyclerie-thouet.fr',
                'image_url' => 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
            ],
        ];

        foreach ($ressourceries as $ressourcerie) {
            Ressourcerie::create($ressourcerie);
        }
    }
}
