<?php

namespace App\Http\Controllers\Tenants;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        return view('tenant.app.dashboard');
    }

    // public function cacheFlush(Request $request)
    // {
    //     cache()->flush();
    //     return redirect()->back()->withSuccess('Site cache refreshed.');
    // }
}
