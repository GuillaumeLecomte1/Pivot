<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

final class DemoUsersSeeder extends Seeder
{
    public function run(): void
    {
        // Client user
        User::create([
            'name' => 'Demo Client',
            'email' => 'client@demo.pivot',
            'password' => bcrypt('demo123'),
        ]);

        // Ressourcier user
        User::create([
            'name' => 'Demo Ressourcier',
            'email' => 'ressourcier@demo.pivot',
            'password' => bcrypt('demo123'),
        ]);
    }
}
