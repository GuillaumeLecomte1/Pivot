<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Ressourcerie;
use App\Models\User;
use Illuminate\Database\Seeder;

final class DemoSeeder extends Seeder
{
    public function run(): void
    {
        // First, ensure demo users exist
        $this->call([
            DemoUsersSeeder::class,
        ]);

        // Get the ressourcier user
        $ressourcier = User::where('email', 'ressourcier@demo.pivot')->first();

        // Create Demo Ressourcerie in department 49 (Maine-et-Loire)
        $ressourcerie = Ressourcerie::create([
            'name' => 'Demo Ressourcerie',
            'description' => 'Une ressourcerie de démonstration pour tester la plateforme Pivot.',
            'address' => '42 Rue de la Demo',
            'city' => 'Angers',
            'department' => '49',
            'postal_code' => '49000',
            'phone' => '02 41 00 00 00',
            'email' => 'demo@demo.pivot',
            'image_url' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
            'user_id' => $ressourcier->id,
        ]);

        // Create 4+ sample products linked to demo ressourcerie
        $products = [
            [
                'name' => 'Chaise en bois vintage',
                'description' => 'Chaise en bois massif style vintage, parfaite pour la salle à manger.',
                'price' => 35.00,
                'category' => 'Mobilier',
                'condition' => 'Bon état',
                'image_url' => 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
            ],
            [
                'name' => 'Lustre suspendu métal',
                'description' => 'Lustre suspendu en métal noir, style industriel, 3 lumières.',
                'price' => 48.00,
                'category' => 'Décoration',
                'condition' => 'Très bon état',
                'image_url' => 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
            ],
            [
                'name' => 'Bibliothèque scandinave',
                'description' => 'Bibliothèque style scandinave en chêne clair, 4 étages.',
                'price' => 89.00,
                'category' => 'Mobilier',
                'condition' => 'Neuf',
                'image_url' => 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800',
            ],
            [
                'name' => 'Vélo hollandais',
                'description' => 'Vélo hollandais ville, cadre alu, panier avant, freins patins.',
                'price' => 145.00,
                'category' => 'Loisirs',
                'condition' => 'Bon état',
                'image_url' => 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800',
            ],
            [
                'name' => 'Ensemble table pliante',
                'description' => 'Ensemble table pliante + 4 chaises, idéal pour petits espaces.',
                'price' => 75.00,
                'category' => 'Mobilier',
                'condition' => 'Bon état',
                'image_url' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
            ],
        ];

        foreach ($products as $product) {
            Product::create(array_merge($product, [
                'ressourcerie_id' => $ressourcerie->id,
            ]));
        }
    }
}
