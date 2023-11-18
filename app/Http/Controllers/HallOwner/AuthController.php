<?php

namespace App\Http\Controllers\HallOwner;

use App\Http\Controllers\Controller;
use App\Http\Requests\HallOwner\Auth\loginRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function loginView()
    {
        return view('hall_owner.auth.login');
    }

    public function login(loginRequest $request)
    {
        $credentials = $request->only('email', 'password', 'remember');

        if (auth('hall-owner')->attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ], $credentials['remember'])) {
            $request->session()->regenerate();
            return redirect()->intended(route('hall_owner.dashboard'));
        }

        return back()->withDanger(['email' => 'The provided credentials do not match our records.'])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        auth('hall-owner')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('hall_owner.auth.login.view');
    }
}
