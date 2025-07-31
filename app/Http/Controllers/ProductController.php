<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProductController extends Controller
{
    public function show($id)
    {
        // Données de test pour les produits
        $products = [
            1 => [
                'id' => 1,
                'name' => 'Chaise vintage en bois',
                'description' => 'Magnifique chaise vintage en bois massif, restaurée avec soin. Cette pièce unique apportera du caractère à votre intérieur tout en respectant l\'environnement grâce au réemploi.',
                'price' => 15.00,
                'images' => [
                    '/images/products/ChaiseVintage.png',
                    '/images/products/ChaiseVintage.png',
                    '/images/products/ChaiseVintage.png',
                ],
                'ressourcerie' => [
                    'name' => 'Ressourcerie des biscottes',
                    'location' => 'Angers (49)',
                    'phone' => '02 41 23 45 67',
                ],
                'category' => 'Mobilier',
                'condition' => 'Très bon état',
                'dimensions' => '45cm x 40cm x 85cm',
                'material' => 'Bois massif',
                'created_at' => '2024-01-15T10:30:00Z',
            ],
            2 => [
                'id' => 2,
                'name' => 'Pichet à lait vintage',
                'description' => 'Authentique pichet à lait en céramique blanche, parfait pour décorer votre cuisine ou comme vase. Pièce de caractère issue du patrimoine français.',
                'price' => 8.50,
                'images' => [
                    '/images/products/Pichet.png',
                    '/images/products/Pichet.png',
                    '/images/products/Pichet.png',
                ],
                'ressourcerie' => [
                    'name' => 'Ressourcerie des biscottes',
                    'location' => 'Angers (49)',
                    'phone' => '02 41 23 45 67',
                ],
                'category' => 'Art de la table',
                'condition' => 'Bon état',
                'dimensions' => '12cm x 15cm x 20cm',
                'material' => 'Céramique',
                'created_at' => '2024-01-10T14:20:00Z',
            ],
            3 => [
                'id' => 3,
                'name' => 'Ensemble de couverts vintage',
                'description' => 'Set complet de couverts en métal argenté, parfait pour les grandes occasions ou un usage quotidien élégant. Ensemble de 24 pièces.',
                'price' => 8.00,
                'images' => [
                    '/images/products/Couvert.png',
                    '/images/products/Couvert.png',
                    '/images/products/Couvert.png',
                ],
                'ressourcerie' => [
                    'name' => 'Ressourcerie des biscottes',
                    'location' => 'Angers (49)',
                    'phone' => '02 41 23 45 67',
                ],
                'category' => 'Art de la table',
                'condition' => 'Excellent état',
                'dimensions' => 'Service pour 6 personnes',
                'material' => 'Métal argenté',
                'created_at' => '2024-01-08T09:15:00Z',
            ],
            4 => [
                'id' => 4,
                'name' => 'Armoire ancienne',
                'description' => 'Armoire en bois massif du début du XXe siècle. Spacieuse et fonctionnelle, elle offre un grand volume de rangement tout en étant une pièce décorative remarquable.',
                'price' => 120.00,
                'images' => [
                    '/images/products/Armoire.png',
                    '/images/products/Armoire.png',
                    '/images/products/Armoire.png',
                ],
                'ressourcerie' => [
                    'name' => 'Ressourcerie des biscottes',
                    'location' => 'Angers (49)',
                    'phone' => '02 41 23 45 67',
                ],
                'category' => 'Mobilier',
                'condition' => 'Bon état',
                'dimensions' => '180cm x 60cm x 220cm',
                'material' => 'Bois massif',
                'created_at' => '2024-01-05T16:45:00Z',
            ],
            5 => [
                'id' => 5,
                'name' => 'Enfilade vintage en bois',
                'description' => 'Superbe enfilade des années 60 en parfait état. Idéale pour le salon ou la salle à manger, elle combine style rétro et fonctionnalité moderne.',
                'price' => 85.00,
                'images' => [
                    '/images/products/Enfilade.png',
                    '/images/products/Enfilade.png',
                    '/images/products/Enfilade.png',
                ],
                'ressourcerie' => [
                    'name' => 'Ressourcerie du Maine',
                    'location' => 'Le Mans (72)',
                    'phone' => '02 43 12 34 56',
                ],
                'category' => 'Mobilier',
                'condition' => 'Excellent état',
                'dimensions' => '160cm x 45cm x 80cm',
                'material' => 'Bois teck',
                'created_at' => '2024-01-20T11:30:00Z',
            ],
            6 => [
                'id' => 6,
                'name' => 'Semainier en bois',
                'description' => 'Charmant semainier à 7 tiroirs, parfait pour organiser vos affaires avec style. Meuble de caractère qui s\'intègrera parfaitement dans une chambre ou un bureau.',
                'price' => 45.00,
                'images' => [
                    '/images/products/Semainier.png',
                    '/images/products/Semainier.png',
                    '/images/products/Semainier.png',
                ],
                'ressourcerie' => [
                    'name' => 'Ressourcerie du Maine',
                    'location' => 'Le Mans (72)',
                    'phone' => '02 43 12 34 56',
                ],
                'category' => 'Mobilier',
                'condition' => 'Très bon état',
                'dimensions' => '35cm x 30cm x 90cm',
                'material' => 'Bois peint',
                'created_at' => '2024-01-18T13:20:00Z',
            ],
            7 => [
                'id' => 7,
                'name' => 'Lot d\'assiettes vintage',
                'description' => 'Collection de 8 assiettes dépareillées aux motifs floraux délicats. Parfaites pour créer une table bohème et authentique pleine de charme.',
                'price' => 25.00,
                'images' => [
                    '/images/products/LotAssiette.png',
                    '/images/products/LotAssiette.png',
                    '/images/products/LotAssiette.png',
                ],
                'ressourcerie' => [
                    'name' => 'Ressourcerie du Maine',
                    'location' => 'Le Mans (72)',
                    'phone' => '02 43 12 34 56',
                ],
                'category' => 'Art de la table',
                'condition' => 'Bon état',
                'dimensions' => 'Diamètre 24cm',
                'material' => 'Porcelaine',
                'created_at' => '2024-01-12T15:10:00Z',
            ],
            8 => [
                'id' => 8,
                'name' => 'Vase décoratif en céramique',
                'description' => 'Élégant vase en céramique aux lignes épurées. Sa couleur neutre et sa forme harmonieuse en font un objet déco intemporel qui s\'adapte à tous les intérieurs.',
                'price' => 12.00,
                'images' => [
                    '/images/products/Vase.png',
                    '/images/products/Vase.png',
                    '/images/products/Vase.png',
                ],
                'ressourcerie' => [
                    'name' => 'Ressourcerie du Maine',
                    'location' => 'Le Mans (72)',
                    'phone' => '02 43 12 34 56',
                ],
                'category' => 'Décoration',
                'condition' => 'Excellent état',
                'dimensions' => '15cm x 15cm x 25cm',
                'material' => 'Céramique',
                'created_at' => '2024-01-22T09:45:00Z',
            ],
        ];

        // Vérifier si le produit existe
        if (! isset($products[$id])) {
            abort(404, 'Produit non trouvé');
        }

        $product = $products[$id];

        // Produits similaires (même catégorie, sauf le produit actuel)
        $relatedProducts = array_filter($products, function ($p) use ($product) {
            return $p['category'] === $product['category'] && $p['id'] !== $product['id'];
        });

        // Limiter à 4 produits similaires
        $relatedProducts = array_slice($relatedProducts, 0, 4);

        return Inertia::render('Product/Show', [
            'product' => $product,
            'relatedProducts' => array_values($relatedProducts),
        ]);
    }
}
