<?php

use App\Http\Controllers\Admin\{
    AuthController,
    DashboardController,
    PermissionController,
    RoleController,
};
use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::group(['prefix' => LaravelLocalization::setLocale() . '/admin', 'as' => 'admin.', 'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']], function () {
Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::controller(AuthController::class)->middleware(['guest:admin'])->group(function () {
        Route::get('login', 'loginView')->name('login');
        Route::post('login', 'loginPost')->name('login');
    });

    Route::group(['middleware' => ['auth:admin']], function () {

        Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
        Route::get('logout', [AuthController::class, 'logout'])->name('logout');

        //Role Routes
        Route::controller(RoleController::class)->name('roles.')->prefix('roles')->group(function () {
            Route::get('/', 'index')->middleware('permission:admin.roles.index')->name('index');

            Route::group(['middleware' => 'permission:admin.roles.create'], function () {
                Route::get('create', 'create')->name('create');
                Route::post('store', 'store')->name('store');
            });

            Route::group(['prefix' => '/{role}', 'middleware' => 'permission:admin.roles.edit'], function () {
                Route::get('edit', 'edit')->whereUuid('id')->name('edit');
                Route::put('update', 'update')->whereUuid('id')->name('update');
            });

            Route::get('delete', 'destroy')->middleware('permission:admin.roles.destroy')->name('destroy');
        });

        //Permissions Routes
        Route::controller(PermissionController::class)->name('permissions.')->prefix('permissions')->group(function () {
            Route::get('/', 'index')->name('index');

            Route::post('assign-permission', 'assignPermissionToRole')->name('assign-permission');
            Route::post('revoke-permission', 'revokePermissionToRole')->name('revoke-permission');
        });
    });
});
