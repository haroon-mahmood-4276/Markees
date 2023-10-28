<?php

namespace App\Providers;

use App\Services\Admin\Roles\{RoleInterface, RoleService};
use App\Services\Admin\Subscriptions\{SubscriptionInterface, SubscriptionService};
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
