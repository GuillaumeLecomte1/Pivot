<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

final class CartController extends Controller
{
    public function index(): Response
    {
        $cart = $this->getCurrentCart();

        return Inertia::render('Cart/Index', [
            'cart' => $cart ? [
                'id' => $cart->id,
                'items' => $cart->items->map(fn ($item) => [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'product_name' => $item->product_name,
                    'product_description' => $item->product_description,
                    'product_price' => $item->product_price,
                    'product_image' => $item->product_image,
                    'ressourcerie_name' => $item->ressourcerie_name,
                    'ressourcerie_location' => $item->ressourcerie_location,
                    'quantity' => $item->quantity,
                    'total_price' => $item->total_price,
                    'formatted_price' => $item->formatted_price,
                    'formatted_total' => $item->formatted_total,
                ]),
                'total_amount' => $cart->total_amount,
                'total_items' => $cart->total_items,
                'formatted_total' => number_format((float) $cart->total_amount, 2).' €',
            ] : null,
        ]);
    }

    public function add(Request $request): RedirectResponse
    {
        $request->validate([
            'product_id' => 'required|integer',
            'product_data' => 'required|array',
            'quantity' => 'integer|min:1|max:10',
        ]);

        $cart = $this->getOrCreateCart();
        $quantity = $request->integer('quantity', 1);

        $cart->addItem($request->input('product_data'), $quantity);

        return redirect()->back()->with('success', 'Produit ajouté au panier !');
    }

    public function update(Request $request, int $itemId): RedirectResponse
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:10',
        ]);

        $cart = $this->getCurrentCart();

        if (! $cart) {
            return redirect()->back()->with('error', 'Panier introuvable.');
        }

        $item = $cart->items()->findOrFail($itemId);
        $quantity = $request->integer('quantity');

        $cart->updateItemQuantity($item->product_id, $quantity);

        return redirect()->back()->with('success', 'Quantité mise à jour !');
    }

    public function remove(int $itemId): RedirectResponse
    {
        $cart = $this->getCurrentCart();

        if (! $cart) {
            return redirect()->back()->with('error', 'Panier introuvable.');
        }

        $item = $cart->items()->findOrFail($itemId);
        $cart->removeItem($item->product_id);

        return redirect()->back()->with('success', 'Produit retiré du panier !');
    }

    public function clear(): RedirectResponse
    {
        $cart = $this->getCurrentCart();

        if ($cart) {
            $cart->clear();
        }

        return redirect()->back()->with('success', 'Panier vidé !');
    }

    private function getCurrentCart(): ?Cart
    {
        if (Auth::check()) {
            return Cart::where('user_id', Auth::id())
                ->with('items')
                ->first();
        }

        $sessionId = session()->getId();

        return Cart::where('session_id', $sessionId)
            ->with('items')
            ->first();
    }

    private function getOrCreateCart(): Cart
    {
        $cart = $this->getCurrentCart();

        if ($cart) {
            return $cart;
        }

        return Cart::create([
            'user_id' => Auth::id(),
            'session_id' => Auth::guest() ? session()->getId() : null,
            'expires_at' => Auth::guest() ? now()->addDays(7) : null,
        ]);
    }
}
