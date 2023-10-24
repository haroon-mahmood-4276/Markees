<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\LogoutResponse;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        return view('admin.dashboard');
    }

    public function cacheFlush(Request $request)
    {
        cache()->flush();
        return redirect()->back()->withSuccess('Site cache refreshed.');
    }
}
