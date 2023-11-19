<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\Admin\{
    AdminSeeder,
    HallOwnerSeeder,
    PermissionSeeder,
    RoleSeeder,
    SubscriptionSeeder
};
use Illuminate\Database\Seeder;
use Database\Seeders\HallOwner\{
    HallSeeder as HallOwnerHallSeeder,
    RoleSeeder as HallOwnerRoleSeeder,
    PermissionSeeder as HallOwnerPermissionSeeder,
    HallTypeSeeder as HallOwnerHallTypeSeeder,
    DecorationSeeder as HallOwnerDecorationSeeder,
    CuisineSeeder as HallOwnerCuisineSeeder,
    MenuSeeder as HallOwnerMenuSeeder,
    HallSlotSeeder as HallOwnerHallSlotSeeder,
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
            SubscriptionSeeder::class,
            HallOwnerSeeder::class,
            HallOwnerHallTypeSeeder::class,
            // UserSeeder::class,
            // ContinentSeeder::class,
            // CountrySeeder::class,
            // HallOwnerRoleSeeder::class,
            // HallOwnerPermissionSeeder::class,
            // HallOwnerDecorationSeeder::class,
            // HallOwnerCuisineSeeder::class,
            // HallOwnerMenuSeeder::class,
            // HallOwnerHallSeeder::class,
            // HallOwnerHallSlotSeeder::class,
        ]);
    }
}
