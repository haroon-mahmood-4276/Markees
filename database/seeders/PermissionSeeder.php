<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{Role, Permission};
use Illuminate\Support\Facades\Artisan;

class PermissionSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run()
    {
        $data = [

            // Roles Routes
            [
                'name' => 'admin.roles.index',
                'guard_name' => 'admin',
                'show_name' => 'Roles - Can View',
            ],
            [
                'name' => 'admin.roles.create',
                'guard_name' => 'admin',
                'show_name' => 'Roles - Can Create',
            ],
            [
                'name' => 'admin.roles.edit',
                'guard_name' => 'admin',
                'show_name' => 'Roles - Can Edit',
            ],
            [
                'name' => 'admin.roles.destroy',
                'guard_name' => 'admin',
                'show_name' => 'Roles - Can Delete',
            ],
            [
                'name' => 'admin.roles.export',
                'guard_name' => 'admin',
                'show_name' => 'Roles - Can Export',
            ],

            // Permissions Routes
            [
                'name' => 'admin.permissions.index',
                'guard_name' => 'admin',
                'show_name' => 'Permissions - Can View',
            ],
            [
                'name' => 'admin.permissions.assign-permission',
                'guard_name' => 'admin',
                'show_name' => 'Permissions - Can Assign',
            ],
            [
                'name' => 'admin.permissions.revoke-permission',
                'guard_name' => 'admin',
                'show_name' => 'Permissions - Can Revoke',
            ],

            // Sites Routes
            [
                'name' => 'admin.site-cache.flush',
                'guard_name' => 'admin',
                'show_name' => 'Site Cache - Can Refresh',
            ],

            // Subscriptions Routes
            [
                'name' => 'admin.subscriptions.index',
                'guard_name' => 'admin',
                'show_name' => 'Subscriptions - Can View',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'admin.subscriptions.create',
                'guard_name' => 'admin',
                'show_name' => 'Subscriptions - Can Create',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'admin.subscriptions.edit',
                'guard_name' => 'admin',
                'show_name' => 'Subscriptions - Can Edit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'admin.subscriptions.destroy',
                'guard_name' => 'admin',
                'show_name' => 'Subscriptions - Can Delete Selected',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'admin.subscriptions.export',
                'guard_name' => 'admin',
                'show_name' => 'Subscriptions - Can Export',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // // Hall Owner Routes
            // [
            //     'name' => 'admin.hall-owners.index',
            //     'guard_name' => 'admin',
            //     'show_name' => 'Can View Subscriptions',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'name' => 'admin.hall-owners.create',
            //     'guard_name' => 'admin',
            //     'show_name' => 'Can Create Subscriptions',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'name' => 'admin.hall-owners.store',
            //     'guard_name' => 'admin',
            //     'show_name' => 'Can Store Subscriptions',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'name' => 'admin.hall-owners.edit',
            //     'guard_name' => 'admin',
            //     'show_name' => 'Can Edit Subscriptions',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'name' => 'admin.hall-owners.update',
            //     'guard_name' => 'admin',
            //     'show_name' => 'Can Update Subscriptions',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'name' => 'admin.hall-owners.destroy',
            //     'guard_name' => 'admin',
            //     'show_name' => 'Can Delete Selected Subscriptions',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            // [
            //     'name' => 'admin.hall-owners.export',
            //     'guard_name' => 'admin',
            //     'show_name' => 'Can Export Subscriptions',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
        ];
        Artisan::call('cache:clear');
        Permission::truncate();

        $role = (new Role())->first();

        foreach ($data as $key => $value) {
            $permission = (new Permission())->create($value)->assignRole($role);
        }

        // (new Role())->first()->givePermissionTo((new Permission())->pluck('id'));
    }
}
