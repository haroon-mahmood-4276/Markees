<?php

namespace App\Providers;

use App\Services\Admin\HallOwners\{HallOwnerInterface, HallOwnerService};
use App\Services\Admin\Permissions\{PermissionInterface, PermissionService};
use App\Services\Admin\Roles\{RoleInterface, RoleService};
use App\Services\Admin\Subscriptions\{SubscriptionInterface, SubscriptionService};

use App\Services\Tenants\Roles\{RoleInterface as TenantRoleInterface, RoleService as TenantRoleService};
use App\Services\Tenants\Permissions\{PermissionInterface as TenantPermissionInterface, PermissionService as TenantPermissionService};
use App\Services\Tenants\HallTypes\{HallTypeInterface as TenantHallTypeInterface, HallTypeService as TenantHallTypeService};
use App\Services\Tenants\Decorations\{DecorationInterface as TenantDecorationInterface, DecorationService as TenantDecorationService};
use App\Services\Tenants\Cuisines\{CuisineInterface as TenantCuisineInterface, CuisineService as TenantCuisineService};
use App\Services\Tenants\Menus\{MenuInterface as TenantMenuInterface, MenuService as TenantMenuService};
use App\Services\Tenants\Packages\{PackageInterface as TenantPackageInterface, PackageService as TenantPackageService};
use App\Services\Tenants\Halls\{HallInterface as TenantHallInterface, HallService as TenantHallService};
use App\Services\Tenants\HallSlots\{HallSlotInterface as TenantHallSlotInterface, HallSlotService as TenantHallSlotService};

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(RoleInterface::class, RoleService::class);
        $this->app->bind(PermissionInterface::class, PermissionService::class);
        $this->app->bind(SubscriptionInterface::class, SubscriptionService::class);
        $this->app->bind(HallOwnerInterface::class, HallOwnerService::class);

        // Tenant Services
        $this->app->bind(TenantRoleInterface::class, TenantRoleService::class);
        $this->app->bind(TenantPermissionInterface::class, TenantPermissionService::class);
        $this->app->bind(TenantHallTypeInterface::class, TenantHallTypeService::class);
        $this->app->bind(TenantDecorationInterface::class, TenantDecorationService::class);
        $this->app->bind(TenantCuisineInterface::class, TenantCuisineService::class);
        $this->app->bind(TenantMenuInterface::class, TenantMenuService::class);
        $this->app->bind(TenantPackageInterface::class, TenantPackageService::class);
        $this->app->bind(TenantHallInterface::class, TenantHallService::class);
        $this->app->bind(TenantHallSlotInterface::class, TenantHallSlotService::class);

        if ($this->app->environment('local')) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
