<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class CartItem extends Model
{
    protected $fillable = [
        'cart_id',
        'product_id',
        'product_name',
        'product_description',
        'product_price',
        'product_image',
        'ressourcerie_name',
        'ressourcerie_location',
        'quantity',
        'total_price',
    ];

    protected $casts = [
        'product_price' => 'decimal:2',
        'total_price' => 'decimal:2',
    ];

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    public function getFormattedPriceAttribute(): string
    {
        return number_format((float) $this->product_price, 2).' €';
    }

    public function getFormattedTotalAttribute(): string
    {
        return number_format((float) $this->total_price, 2).' €';
    }
}
