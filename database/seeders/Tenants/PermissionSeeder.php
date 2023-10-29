<?php

namespace Database\Seeders\Tenants;

use App\Models\Tenants\TenantUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{Tenant, Role, Permission};

class PermissionSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run()
    {
        $data = [

            // Roles Routes
            [
                'name' => 'tenant.roles.index',
                'guard_name' => 'tenant',
                'show_name' => 'Roles - Can View',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.roles.create',
                'guard_name' => 'tenant',
                'show_name' => 'Roles - Can Create',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.roles.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Roles - Can Edit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.roles.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Roles - Can Delete',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.roles.export',
                'guard_name' => 'tenant',
                'show_name' => 'Roles - Can Export',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Permissions Routes
            [
                'name' => 'tenant.permissions.index',
                'guard_name' => 'tenant',
                'show_name' => 'Permissions - Can View',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.permissions.assign-permission',
                'show_name' => 'Permissions - Can Assign',
                'guard_name' => 'tenant',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.permissions.revoke-permission',
                'show_name' => 'Permissions - Can Revoke',
                'guard_name' => 'tenant',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // HallType Routes
            [
                'name' => 'tenant.hallTypes.index',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Types - Can View',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.hallTypes.create',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Types - Can Create',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.hallTypes.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Types - Can Edit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.hallTypes.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Types - Can Delete',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.hallTypes.export',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Types - Can Export',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Decorations Routes
            [
                'name' => 'tenant.decorations.index',
                'guard_name' => 'tenant',
                'show_name' => 'Decorations - Can View',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.decorations.create',
                'guard_name' => 'tenant',
                'show_name' => 'Decorations - Can Create',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.decorations.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Decorations - Can Edit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.decorations.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Decorations - Can Delete',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.decorations.export',
                'guard_name' => 'tenant',
                'show_name' => 'Decorations - Can Export',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Cuisines Routes
            [
                'name' => 'tenant.cuisines.index',
                'guard_name' => 'tenant',
                'show_name' => 'Cuisines - Can View',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.cuisines.create',
                'guard_name' => 'tenant',
                'show_name' => 'Cuisines - Can Create',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.cuisines.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Cuisines - Can Edit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.cuisines.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Cuisines - Can Delete',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.cuisines.export',
                'guard_name' => 'tenant',
                'show_name' => 'Cuisines - Can Export',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Menus Routes
            [
                'name' => 'tenant.menus.index',
                'guard_name' => 'tenant',
                'show_name' => 'Menus - Can View',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.menus.create',
                'guard_name' => 'tenant',
                'show_name' => 'Menus - Can Create',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.menus.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Menus - Can Edit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.menus.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Menus - Can Deletes',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.menus.export',
                'guard_name' => 'tenant',
                'show_name' => 'Menus - Can Export',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Packages Routes
            [
                'name' => 'tenant.packages.index',
                'guard_name' => 'tenant',
                'show_name' => 'Packages - Can View',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.packages.create',
                'guard_name' => 'tenant',
                'show_name' => 'Packages - Can Create',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.packages.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Packages - Can Edit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.packages.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Packages - Can Delete',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.packages.export',
                'guard_name' => 'tenant',
                'show_name' => 'Packages - Can Export',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Halls Routes
            [
                'name' => 'tenant.halls.index',
                'guard_name' => 'tenant',
                'show_name' => 'Halls - Can View',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.halls.create',
                'guard_name' => 'tenant',
                'show_name' => 'Halls - Can Create',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.halls.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Halls - Can Edit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.halls.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Halls - Can Delete',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.halls.export',
                'guard_name' => 'tenant',
                'show_name' => 'Halls - Can Export',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Hall Slots Routes
            [
                'name' => 'tenant.halls.slots.index',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Slots - Can View',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.halls.slots.create',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Slots - Can Create',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.halls.slots.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Slots - Can Edit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.halls.slots.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Slots - Can Delete',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tenant.halls.slots.export',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Slots - Can Export',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Tenant::all()->runForEach(function () use ($data) {

            $role = (new Role())->first();
            foreach ($data as $key => $value) {
                $permission = (new Permission())->create($value)->assignRole($role);
            }

            $user = (new TenantUser())->first();
            $user->assignRole($role);
        });
    }
}
