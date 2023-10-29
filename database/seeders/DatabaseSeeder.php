<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\Tenants\{
    RoleSeeder as TenantRoleSeeder,
    PermissionSeeder as TenantPermissionSeeder,
    HallTypeSeeder as TenantHallTypeSeeder,
    HallSeeder as TenantHallSeeder,
    DecorationSeeder as TenantDecorationSeeder,
    CuisineSeeder as TenantCuisineSeeder,
    MenuSeeder as TenantMenuSeeder,
    HallSlotSeeder as TenantHallSlotSeeder,
};

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            AdminSeeder::class,
            // UserSeeder::class,
            SubscriptionSeeder::class,
            // ContinentSeeder::class,
            // CountrySeeder::class,
            HallOwnerSeeder::class,
            TenantRoleSeeder::class,
            TenantPermissionSeeder::class,
            TenantHallTypeSeeder::class,
            TenantDecorationSeeder::class,
            TenantCuisineSeeder::class,
            TenantMenuSeeder::class,
            TenantHallSeeder::class,
            TenantHallSlotSeeder::class,
        ]);
    }
}
