<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        if (!$request->expectsJson()) {
            return match ($request->segment(1)) {
                'admin' => route('admin.login'),
                'hall-owner' => route('hall_owner.auth.login.view'),
            };
        }
    }
}
