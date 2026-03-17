<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'image_url',
        'category',
        'condition',
        'is_available',
        'ressourcerie_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_available' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function ressourcerie(): BelongsTo
    {
        return $this->belongsTo(Ressourcerie::class);
    }
}
