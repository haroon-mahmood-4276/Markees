<?php

namespace App\Http\Controllers\Tenants;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tenants\Auth\loginRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function loginView()
    {
        return view('tenant.auth.login');
    }

    public function login(loginRequest $request)
    {
        $credentials = $request->only('email', 'password', 'remember');
        // dd($credentials);

        if (auth()->guard('tenant')->attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ], $credentials['remember'])) {
            $request->session()->regenerate();
            return redirect()->intended(route('tenant.dashboard'));
        }

        return back()->withDanger(['email' => 'The provided credentials do not match our records.'])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        auth()->guard()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('tenant.auth.login.view');
    }
}
