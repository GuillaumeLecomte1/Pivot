<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Cart extends Model
{
    protected $fillable = [
        'user_id',
        'session_id',
        'total_amount',
        'total_items',
        'expires_at',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'expires_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function addItem(array $productData, int $quantity = 1): CartItem
    {
        $existingItem = $this->items()
            ->where('product_id', $productData['id'])
            ->first();

        if ($existingItem) {
            $existingItem->increment('quantity', $quantity);
            $existingItem->update([
                'total_price' => $existingItem->product_price * $existingItem->quantity,
            ]);
            $this->updateTotals();

            /** @var CartItem $item */
            $item = $existingItem->fresh();

            return $item;
        }

        $item = $this->items()->create([
            'product_id' => $productData['id'],
            'product_name' => $productData['name'],
            'product_description' => substr($productData['description'] ?? '', 0, 255),
            'product_price' => $productData['price'],
            'product_image' => $productData['images'][0] ?? null,
            'ressourcerie_name' => $productData['ressourcerie']['name'],
            'ressourcerie_location' => $productData['ressourcerie']['location'],
            'quantity' => $quantity,
            'total_price' => $productData['price'] * $quantity,
        ]);

        $this->updateTotals();

        /** @var CartItem $cartItem */
        $cartItem = $item;

        return $cartItem;
    }

    public function removeItem(int $productId): bool
    {
        $item = $this->items()->where('product_id', $productId)->first();

        if (! $item) {
            return false;
        }

        $item->delete();
        $this->updateTotals();

        return true;
    }

    public function updateItemQuantity(int $productId, int $quantity): bool
    {
        if ($quantity <= 0) {
            return $this->removeItem($productId);
        }

        $item = $this->items()->where('product_id', $productId)->first();

        if (! $item) {
            return false;
        }

        $item->update([
            'quantity' => $quantity,
            'total_price' => $item->product_price * $quantity,
        ]);

        $this->updateTotals();

        return true;
    }

    public function clear(): void
    {
        $this->items()->delete();
        $this->update([
            'total_amount' => 0,
            'total_items' => 0,
        ]);
    }

    public function isEmpty(): bool
    {
        return $this->total_items === 0;
    }

    private function updateTotals(): void
    {
        $this->refresh();
        $items = $this->items;

        $this->update([
            'total_amount' => $items->sum('total_price'),
            'total_items' => $items->sum('quantity'),
        ]);
    }
}
