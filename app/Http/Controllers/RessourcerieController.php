<?php

namespace App\Http\Controllers;

use App\Models\Ressourcerie;
use Inertia\Inertia;

final class RessourcerieController extends Controller
{
    public function index()
    {
        $departments = Ressourcerie::select('department')
            ->distinct()
            ->orderBy('department')
            ->pluck('department');

        return Inertia::render('Departements/Index', [
            'departments' => $departments,
        ]);
    }

    public function byDepartment(string $department)
    {
        $ressourceries = Ressourcerie::withCount('products')
            ->where('department', $department)
            ->orderBy('name')
            ->get();

        return Inertia::render('Ressourceries/Index', [
            'ressourceries' => $ressourceries,
            'department' => $department,
        ]);
    }

    public function show(int $id)
    {
        $ressourcerie = Ressourcerie::with(['products' => function ($query) {
            $query->where('is_available', true)->orderBy('created_at', 'desc');
        }])->findOrFail($id);

        return Inertia::render('Ressourceries/Show', [
            'ressourcerie' => $ressourcerie,
        ]);
    }
}
