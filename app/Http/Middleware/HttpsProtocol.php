<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class HttpsProtocol
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the request is secure
        if (!$request->secure() && app()->environment() === 'production') {
            // If the request is not secure, redirect to the secure URL
            return redirect()->secure($request->getRequestUri());
        }

        // Set all generated URLs to use HTTPS
        if (app()->environment() === 'production' || env('FORCE_HTTPS') === 'true') {
            URL::forceScheme('https');
        }

        return $next($request);
    }
} 