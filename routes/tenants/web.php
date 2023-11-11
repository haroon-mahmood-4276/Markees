<?php

use App\Http\Controllers\Tenants\{
    AuthController,
    CuisineController,
    DashboardController,
    DecorationController,
    HallController,
    HallSlotController,
    HallTypeController,
    MenuController,
    PackageController,
    RoleController,
    PermissionController
};

use App\Http\Controllers\Tenants\Users\{
    AjaxController,
    HomeController as UserHomeController,
    BookingController as UserBookingController,
};
use Stancl\Tenancy\Middleware\{InitializeTenancyByDomain, PreventAccessFromCentralDomains, ScopeSessions};
use Illuminate\Support\Facades\Route;

Route::middleware(['web', InitializeTenancyByDomain::class, PreventAccessFromCentralDomains::class, ScopeSessions::class])->group(function () {

    Route::group([
        // 'prefix' => LaravelLocalization::setLocale(),
        // 'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
    ], function () {
        Route::group(['as' => 'tenant.'], function () {

            Route::group(['as' => 'auth.', 'middleware' => ['guest:tenant']], function () {
                Route::get('login', [AuthController::class, 'loginView'])->name('login.view');
                Route::post('login', [AuthController::class, 'login'])->name('login.post');
            });

            Route::group(['middleware' => ['auth:tenant'],], function () {
                Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

                Route::get('cachew/flush', [DashboardController::class, 'cacheFlush'])->name('cache.flush');

                Route::get('logout', [AuthController::class, 'logout'])->name('logout');

                //Role Routes
                Route::controller(RoleController::class)->name('roles.')->prefix('roles')->group(function () {

                    Route::get('/', 'index')->middleware('permission:tenant.roles.index')->name('index');

                    Route::group(['middleware' => 'permission:tenant.roles.create'], function () {
                        Route::get('create', 'create')->name('create');
                        Route::post('store', 'store')->name('store');
                    });

                    Route::get('delete', 'destroy')->middleware('permission:tenant.roles.destroy')->name('destroy');

                    Route::group(['prefix' => '/{role}', 'middleware' => 'permission:tenant.roles.edit'], function () {
                        Route::get('edit', 'edit')->name('edit');
                        Route::put('update', 'update')->name('update');
                    });
                });

                //Permissions Routes
                Route::controller(PermissionController::class)->name('permissions.')->prefix('permissions')->group(function () {
                    Route::get('/', 'index')->middleware('permission:tenant.permissions.index')->name('index');

                    Route::post('assign-permission', 'assignPermissionToRole')->middleware('permission:tenant.permissions.assign-permission')->name('assign-permission');
                    Route::post('revoke-permission', 'revokePermissionToRole')->middleware('permission:tenant.permissions.assign-permission')->name('revoke-permission');
                });

                //HallTypes Routes
                Route::controller(HallTypeController::class)->name('hallTypes.')->prefix('hall-types')->group(function () {
                    Route::get('/', 'index')->middleware('permission:tenant.hallTypes.index')->name('index');

                    Route::group(['middleware' => 'permission:tenant.hallTypes.create'], function () {
                        Route::get('create', 'create')->name('create');
                        Route::post('store', 'store')->name('store');
                    });

                    Route::get('delete', 'destroy')->middleware('permission:tenant.hallTypes.destroy')->name('destroy');

                    Route::group(['prefix' => '/{hall_type}', 'middleware' => 'permission:tenant.hallTypes.edit'], function () {
                        Route::get('edit', 'edit')->name('edit');
                        Route::put('update', 'update')->name('update');
                    });
                });

                //Decorations Routes
                Route::controller(DecorationController::class)->name('decorations.')->prefix('decorations')->group(function () {
                    Route::get('/', 'index')->middleware('permission:tenant.decorations.index')->name('index');

                    Route::group(['middleware' => 'permission:tenant.decorations.create'], function () {
                        Route::get('create', 'create')->name('create');
                        Route::post('store', 'store')->name('store');
                    });

                    Route::get('delete', 'destroy')->middleware('permission:tenant.decorations.destroy')->name('destroy');

                    Route::group(['prefix' => '/{decoration}', 'middleware' => 'permission:tenant.decorations.edit'], function () {
                        Route::get('edit', 'edit')->name('edit');
                        Route::put('update', 'update')->name('update');
                    });
                });

                //Cuisines Routes
                Route::controller(CuisineController::class)->name('cuisines.')->prefix('cuisines')->group(function () {
                    Route::get('/', 'index')->middleware('permission:tenant.cuisines.index')->name('index');

                    Route::group(['middleware' => 'permission:tenant.cuisines.create'], function () {
                        Route::get('create', 'create')->name('create');
                        Route::post('store', 'store')->name('store');
                    });

                    Route::get('delete', 'destroy')->middleware('permission:tenant.cuisines.destroy')->name('destroy');

                    Route::group(['prefix' => '/{cuisine}', 'middleware' => 'permission:tenant.cuisines.edit'], function () {
                        Route::get('edit', 'edit')->name('edit');
                        Route::put('update', 'update')->name('update');
                    });
                });

                //Menus Routes
                Route::controller(MenuController::class)->name('menus.')->prefix('menus')->group(function () {
                    Route::get('/', 'index')->middleware('permission:tenant.menus.index')->name('index');

                    Route::group(['middleware' => 'permission:tenant.menus.create'], function () {
                        Route::get('create', 'create')->name('create');
                        Route::post('store', 'store')->name('store');
                    });

                    Route::get('delete', 'destroy')->middleware('permission:tenant.menus.destroy')->name('destroy');

                    Route::group(['prefix' => '/{menu}', 'middleware' => 'permission:tenant.menus.edit'], function () {
                        Route::get('edit', 'edit')->name('edit');
                        Route::put('update', 'update')->name('update');
                    });
                });

                //Halls Routes
                Route::controller(HallController::class)->name('halls.')->prefix('halls')->group(function () {
                    Route::get('/', 'index')->middleware('permission:tenant.halls.index')->name('index');

                    Route::group(['middleware' => 'permission:tenant.halls.create'], function () {
                        Route::get('create', 'create')->name('create');
                        Route::post('store', 'store')->name('store');
                    });

                    Route::get('delete', 'destroy')->middleware('permission:tenant.halls.destroy')->name('destroy');

                    Route::group(['prefix' => '/{hall}', 'middleware' => 'permission:tenant.halls.edit'], function () {
                        Route::get('edit', 'edit')->name('edit');
                        Route::put('update', 'update')->name('update');
                    });

                    // Hall Settings Routes
                    Route::group(['prefix' => '/{hall}/settings/'], function () {

                        //Hall Shift Routes
                        Route::controller(HallSlotController::class)->name('slots.')->prefix('slots')->group(function () {
                            Route::get('/', 'index')->middleware('permission:tenant.halls.slots.index')->name('index');

                            Route::group(['middleware' => 'permission:tenant.halls.slots.create'], function () {
                                Route::get('create', 'create')->name('create');
                                Route::post('store', 'store')->name('store');
                            });

                            Route::get('delete', 'destroy')->middleware('permission:tenant.halls.slots.destroy')->name('destroy');

                            Route::group(['prefix' => '/{slot}', 'middleware' => 'permission:tenant.halls.slots.edit'], function () {
                                Route::get('edit', 'edit')->name('edit');
                                Route::put('update', 'update')->name('update');
                            });
                        });
                    });
                });

                //Packages Routes
                Route::controller(PackageController::class)->name('packages.')->prefix('packages')->group(function () {
                    Route::get('/', 'index')->middleware('permission:tenant.packages.index')->name('index');

                    Route::group(['middleware' => 'permission:tenant.packages.create'], function () {
                        Route::get('create', 'create')->name('create');
                        Route::post('store', 'store')->name('store');
                    });

                    Route::get('delete', 'destroy')->middleware('permission:tenant.packages.destroy')->name('destroy');

                    Route::group(['prefix' => '/{package}', 'middleware' => 'permission:tenant.packages.edit'], function () {
                        Route::get('edit', 'edit')->name('edit');
                        Route::put('update', 'update')->name('update');
                    });
                });
            });
        });
    });

    Route::group(['as' => 'tenant.users.'], function () {

        Route::get('/', [UserHomeController::class, 'index'])->name('home');

        Route::group(['prefix' => 'bookings/{hall_id}', 'as' => 'bookings.'], function () {
            Route::get('/', [UserBookingController::class, 'index'])->name('index');

            Route::get('create', [UserBookingController::class, 'create'])->name('create');
            Route::post('store', [UserBookingController::class, 'store'])->name('store');

            Route::get('delete', [UserBookingController::class, 'destroy'])
                ->name('destroy');

            Route::group(['prefix' => '/{id}'], function () {
                Route::get('edit', [UserBookingController::class, 'edit'])->name('edit');
                Route::put('update', [UserBookingController::class, 'update'])->name('update');
            });
        });

        Route::group(['prefix' => 'ajax', 'as' => 'ajax.'], function () {
            Route::get('halls/{hall_id}/slots', [AjaxController::class, 'AjaxGetSlotByHallId'])->name('get-slots-by-hall-id');
        });
    });
});
