<?php

namespace App\Http\Controllers\HallOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        return view('hall_owner.dashboard');
    }

    // public function cacheFlush(Request $request)
    // {
    //     cache()->flush();
    //     return redirect()->back()->withSuccess('Site cache refreshed.');
    // }
}
