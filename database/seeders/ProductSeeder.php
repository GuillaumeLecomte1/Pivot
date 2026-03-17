<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Ressourcerie;
use Illuminate\Database\Seeder;

final class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['Mobilier', 'Électroménager', 'Vêtements', 'Livres', 'Loisirs', 'Décoration'];
        $conditions = ['Neuf', 'Très bon état', 'Bon état', 'État correct'];

        $products = [
            // Ressourcerie du Layon (Saumur)
            [
                'name' => 'Fauteuil velours vert',
                'description' => 'Fauteuil confortable en velours vert sapin, idéal pour le salon.',
                'price' => 45.00,
                'category' => 'Mobilier',
                'condition' => 'Bon état',
                'ressourcerie_id' => 1,
                'image_url' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
            ],
            [
                'name' => 'Lampe de bureau LED',
                'description' => 'Lampe de bureau moderne à LED avec variateur d\'intensité.',
                'price' => 18.00,
                'category' => 'Électroménager',
                'condition' => 'Très bon état',
                'ressourcerie_id' => 1,
                'image_url' => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
            ],
            [
                'name' => 'Manteau laine femme',
                'description' => 'Manteau en laine mixte taille M, couleur marine.',
                'price' => 25.00,
                'category' => 'Vêtements',
                'condition' => 'Bon état',
                'ressourcerie_id' => 1,
                'image_url' => 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
            ],
            // La Clef des Champs (Angers)
            [
                'name' => 'Table basse scandinave',
                'description' => 'Table basse en chêne clair, style scandinave, 90x50cm.',
                'price' => 55.00,
                'category' => 'Mobilier',
                'condition' => 'Très bon état',
                'ressourcerie_id' => 2,
                'image_url' => 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800',
            ],
            [
                'name' => 'Machine à café Nespresso',
                'description' => 'Machine à café Nespresso Inissia, très bon état, warna noir.',
                'price' => 65.00,
                'category' => 'Électroménager',
                'condition' => 'Très bon état',
                'ressourcerie_id' => 2,
                'image_url' => 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
            ],
            [
                'name' => 'Collection romans policier',
                'description' => 'Lot de 5 romans policier divers auteurs, état correct.',
                'price' => 10.00,
                'category' => 'Livres',
                'condition' => 'Bon état',
                'ressourcerie_id' => 2,
                'image_url' => 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
            ],
            // Emmaüs Angers
            [
                'name' => 'Canapé 3 places gris',
                'description' => 'Canapé d\'angle convertible gris clair, tissu épais.',
                'price' => 120.00,
                'category' => 'Mobilier',
                'condition' => 'Bon état',
                'ressourcerie_id' => 3,
                'image_url' => 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800',
            ],
            [
                'name' => 'Vélotaf vintage',
                'description' => 'Vélotaf vintage des années 80, freins moyeux, éclairage intégré.',
                'price' => 85.00,
                'category' => 'Loisirs',
                'condition' => 'Bon état',
                'ressourcerie_id' => 3,
                'image_url' => 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800',
            ],
            [
                'name' => 'Tableau abstrait cadre',
                'description' => 'Tableau abstract couleurs vives, cadre bois blond, 60x40cm.',
                'price' => 35.00,
                'category' => 'Décoration',
                'condition' => 'Neuf',
                'ressourcerie_id' => 3,
                'image_url' => 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
            ],
            // La Recyclerie du Thouet
            [
                'name' => 'Étagère murale modulable',
                'description' => 'Système d\'étagères murales modulables, blanc, 120cm.',
                'price' => 30.00,
                'category' => 'Mobilier',
                'condition' => 'État correct',
                'ressourcerie_id' => 4,
                'image_url' => 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800',
            ],
            [
                'name' => 'Robot cuiseur Multicuiseur',
                'description' => 'Robot cuiseur多功能, 6L, nombreux accessoires.',
                'price' => 75.00,
                'category' => 'Électroménager',
                'condition' => 'Bon état',
                'ressourcerie_id' => 4,
                'image_url' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
            ],
            [
                'name' => 'Plaid polaire',
                'description' => 'Plaid polaire doux, 150x200cm, couleur grise.',
                'price' => 12.00,
                'category' => 'Décoration',
                'condition' => 'Neuf',
                'ressourcerie_id' => 4,
                'image_url' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
