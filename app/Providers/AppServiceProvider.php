<?php

namespace App\Providers;

use App\Services\Admin\Roles\{RoleInterface, RoleService};
use App\Services\Admin\Subscriptions\{SubscriptionInterface, SubscriptionService};
use App\Services\Admin\HallOwners\{HallOwnerInterface, HallOwnerService};
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(RoleInterface::class, RoleService::class);
        $this->app->bind(SubscriptionInterface::class, SubscriptionService::class);
        $this->app->bind(HallOwnerInterface::class, HallOwnerService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
