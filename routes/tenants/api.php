<?php

use Illuminate\Http\Request;
use Stancl\Tenancy\Middleware\{InitializeTenancyByDomain, PreventAccessFromCentralDomains, ScopeSessions};
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', InitializeTenancyByDomain::class, PreventAccessFromCentralDomains::class, ScopeSessions::class])->group(function () {

    Route::group([
        'prefix' => LaravelLocalization::setLocale(),
        'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
    ], function () {
        Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
            return $request->user();
        });
    });
});
