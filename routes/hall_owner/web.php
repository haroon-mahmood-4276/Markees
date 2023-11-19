<?php

use App\Http\Controllers\HallOwner\{
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

use App\Http\Controllers\HallOwner\Users\{
    AjaxController,
    HomeController as UserHomeController,
    BookingController as UserBookingController,
};
use Illuminate\Support\Facades\Route;

Route::get('hall-owner', fn () => redirect()->route('hall_owner.auth.login.view'));

Route::group([
    // 'prefix' => LaravelLocalization::setLocale(),
    // 'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
], function () {
    Route::group(['as' => 'hall_owner.', 'prefix' => 'hall-owner'], function () {
        Route::group(['as' => 'auth.', 'middleware' => ['guest:hall-owner']], function () {
            Route::get('login', [AuthController::class, 'loginView'])->name('login.view');
            Route::post('login', [AuthController::class, 'login'])->name('login.post');
        });

        Route::group(['middleware' => ['auth:hall-owner'],], function () {
            Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

            Route::get('cachew/flush', [DashboardController::class, 'cacheFlush'])->name('cache.flush');

            Route::get('logout', [AuthController::class, 'logout'])->name('logout');

            // //Role Routes
            // Route::controller(RoleController::class)->name('roles.')->prefix('roles')->group(function () {

            //     Route::get('/', 'index')->middleware('permission:hall-owner.roles.index')->name('index');

            //     Route::group([], function () {
            //         Route::get('create', 'create')->name('create');
            //         Route::post('store', 'store')->name('store');
            //     });

            //     Route::get('delete', 'destroy')->middleware('permission:hall-owner.roles.destroy')->name('destroy');

            //     Route::group(['prefix' => '/{role}'], function () {
            //         Route::get('edit', 'edit')->name('edit');
            //         Route::put('update', 'update')->name('update');
            //     });
            // });

            // //Permissions Routes
            // Route::controller(PermissionController::class)->name('permissions.')->prefix('permissions')->group(function () {
            //     Route::get('/', 'index')->middleware('permission:hall-owner.permissions.index')->name('index');

            //     Route::post('assign-permission', 'assignPermissionToRole')->middleware('permission:hall-owner.permissions.assign-permission')->name('assign-permission');
            //     Route::post('revoke-permission', 'revokePermissionToRole')->middleware('permission:hall-owner.permissions.assign-permission')->name('revoke-permission');
            // });

            //Decorations Routes
            Route::controller(DecorationController::class)->name('decorations.')->prefix('decorations')->group(function () {
                Route::get('/', 'index')->name('index');

                Route::group([], function () {
                    Route::get('create', 'create')->name('create');
                    Route::post('store', 'store')->name('store');
                });

                Route::get('delete', 'destroy')->name('destroy');

                Route::group(['prefix' => '/{decoration}'], function () {
                    Route::get('edit', 'edit')->name('edit');
                    Route::put('update', 'update')->name('update');
                });
            });

            //Cuisines Routes
            Route::controller(CuisineController::class)->name('cuisines.')->prefix('cuisines')->group(function () {
                Route::get('/', 'index')->name('index');

                Route::group([], function () {
                    Route::get('create', 'create')->name('create');
                    Route::post('store', 'store')->name('store');
                });

                Route::get('delete', 'destroy')->name('destroy');

                Route::group(['prefix' => '/{cuisine}'], function () {
                    Route::get('edit', 'edit')->name('edit');
                    Route::put('update', 'update')->name('update');
                });
            });

            //Menus Routes
            Route::controller(MenuController::class)->name('menus.')->prefix('menus')->group(function () {
                Route::get('/', 'index')->name('index');

                Route::group([], function () {
                    Route::get('create', 'create')->name('create');
                    Route::post('store', 'store')->name('store');
                });

                Route::get('delete', 'destroy')->name('destroy');

                Route::group(['prefix' => '/{menu}'], function () {
                    Route::get('edit', 'edit')->name('edit');
                    Route::put('update', 'update')->name('update');
                });
            });

            //Halls Routes
            Route::controller(HallController::class)->name('halls.')->prefix('halls')->group(function () {
                Route::get('/', 'index')->name('index');

                Route::group([], function () {
                    Route::get('create', 'create')->name('create');
                    Route::post('store', 'store')->name('store');
                });

                Route::get('delete', 'destroy')->name('destroy');

                Route::group(['prefix' => '/{hall}'], function () {
                    Route::get('edit', 'edit')->name('edit');
                    Route::put('update', 'update')->name('update');
                });

                // Hall Settings Routes
                Route::group(['prefix' => '/{hall}/settings/'], function () {

                    //Hall Shift Routes
                    Route::controller(HallSlotController::class)->name('slots.')->prefix('slots')->group(function () {
                        Route::get('/', 'index')->name('index');

                        Route::group([], function () {
                            Route::get('create', 'create')->name('create');
                            Route::post('store', 'store')->name('store');
                        });

                        Route::get('delete', 'destroy')->name('destroy');

                        Route::group(['prefix' => '/{slot}'], function () {
                            Route::get('edit', 'edit')->name('edit');
                            Route::put('update', 'update')->name('update');
                        });
                    });
                });
            });

            //Packages Routes
            Route::controller(PackageController::class)->name('packages.')->prefix('packages')->group(function () {
                Route::get('/', 'index')->name('index');

                Route::group([], function () {
                    Route::get('create', 'create')->name('create');
                    Route::post('store', 'store')->name('store');
                });

                Route::get('delete', 'destroy')->name('destroy');

                Route::group(['prefix' => '/{package}'], function () {
                    Route::get('edit', 'edit')->name('edit');
                    Route::put('update', 'update')->name('update');
                });
            });
        });
    });
});

Route::group(['as' => 'hall-owner.users.'], function () {

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
