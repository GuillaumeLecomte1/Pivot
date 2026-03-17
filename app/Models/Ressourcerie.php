<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Ressourcerie extends Model
{
    protected $fillable = [
        'name',
        'description',
        'address',
        'city',
        'department',
        'postal_code',
        'image_url',
        'phone',
        'email',
        'user_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
