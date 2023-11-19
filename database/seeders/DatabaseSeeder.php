<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\Admin\{
    AdminSeeder,
    HallOwnerSeeder,
    HallTypeSeeder,
    PermissionSeeder,
    RoleSeeder,
    SubscriptionSeeder
};
use Illuminate\Database\Seeder;
use Database\Seeders\HallOwner\{
    HallSeeder as HallOwnerHallSeeder,
    RoleSeeder as HallOwnerRoleSeeder,
    PermissionSeeder as HallOwnerPermissionSeeder,
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
            HallTypeSeeder::class,

            HallOwnerCuisineSeeder::class,
            // UserSeeder::class,
            // ContinentSeeder::class,
            // CountrySeeder::class,
            // HallOwnerRoleSeeder::class,
            // HallOwnerPermissionSeeder::class,
            // HallOwnerDecorationSeeder::class,
            // HallOwnerMenuSeeder::class,
            // HallOwnerHallSeeder::class,
            // HallOwnerHallSlotSeeder::class,
        ]);
    }
}
