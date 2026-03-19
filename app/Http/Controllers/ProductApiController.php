<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

final class ProductApiController extends Controller
{
    /**
     * Store a newly created product in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user || ! $user->ressourcerie) {
            return response()->json([
                'message' => 'Vous devez être connecté en tant que ressourcier pour ajouter un produit.',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'min:1', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'gt:0'],
            'image_url' => ['nullable', 'string', 'max:255'],
            'category' => ['required', 'string', 'in:Mobilier,Art de la table,Décoration'],
            'condition' => ['required', 'string', 'in:Très bon état,Bon état,Excellent état'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        $product = new Product([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'image_url' => $validated['image_url'] ?? null,
            'category' => $validated['category'],
            'condition' => $validated['condition'],
            'is_available' => true,
        ]);

        $product->ressourcerie()->associate($user->ressourcerie);
        $product->save();

        return response()->json([
            'message' => 'Produit créé avec succès',
            'product' => $product,
        ], 201);
    }
}
