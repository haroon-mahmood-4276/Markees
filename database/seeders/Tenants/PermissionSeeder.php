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
            ],
            [
                'name' => 'tenant.roles.create',
                'guard_name' => 'tenant',
                'show_name' => 'Roles - Can Create',
            ],
            [
                'name' => 'tenant.roles.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Roles - Can Edit',
            ],
            [
                'name' => 'tenant.roles.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Roles - Can Delete',
            ],
            [
                'name' => 'tenant.roles.export',
                'guard_name' => 'tenant',
                'show_name' => 'Roles - Can Export',
            ],

            // Permissions Routes
            [
                'name' => 'tenant.permissions.index',
                'guard_name' => 'tenant',
                'show_name' => 'Permissions - Can View',
            ],
            [
                'name' => 'tenant.permissions.assign-permission',
                'show_name' => 'Permissions - Can Assign',
                'guard_name' => 'tenant',
            ],
            [
                'name' => 'tenant.permissions.revoke-permission',
                'show_name' => 'Permissions - Can Revoke',
                'guard_name' => 'tenant',
            ],

            // HallType Routes
            [
                'name' => 'tenant.hallTypes.index',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Types - Can View',
            ],
            [
                'name' => 'tenant.hallTypes.create',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Types - Can Create',
            ],
            [
                'name' => 'tenant.hallTypes.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Types - Can Edit',
            ],
            [
                'name' => 'tenant.hallTypes.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Types - Can Delete',
            ],
            [
                'name' => 'tenant.hallTypes.export',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Types - Can Export',
            ],

            // Decorations Routes
            [
                'name' => 'tenant.decorations.index',
                'guard_name' => 'tenant',
                'show_name' => 'Decorations - Can View',
            ],
            [
                'name' => 'tenant.decorations.create',
                'guard_name' => 'tenant',
                'show_name' => 'Decorations - Can Create',
            ],
            [
                'name' => 'tenant.decorations.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Decorations - Can Edit',
            ],
            [
                'name' => 'tenant.decorations.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Decorations - Can Delete',
            ],
            [
                'name' => 'tenant.decorations.export',
                'guard_name' => 'tenant',
                'show_name' => 'Decorations - Can Export',
            ],

            // Cuisines Routes
            [
                'name' => 'tenant.cuisines.index',
                'guard_name' => 'tenant',
                'show_name' => 'Cuisines - Can View',
            ],
            [
                'name' => 'tenant.cuisines.create',
                'guard_name' => 'tenant',
                'show_name' => 'Cuisines - Can Create',
            ],
            [
                'name' => 'tenant.cuisines.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Cuisines - Can Edit',
            ],
            [
                'name' => 'tenant.cuisines.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Cuisines - Can Delete',
            ],
            [
                'name' => 'tenant.cuisines.export',
                'guard_name' => 'tenant',
                'show_name' => 'Cuisines - Can Export',
            ],

            // Menus Routes
            [
                'name' => 'tenant.menus.index',
                'guard_name' => 'tenant',
                'show_name' => 'Menus - Can View',
            ],
            [
                'name' => 'tenant.menus.create',
                'guard_name' => 'tenant',
                'show_name' => 'Menus - Can Create',
            ],
            [
                'name' => 'tenant.menus.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Menus - Can Edit',
            ],
            [
                'name' => 'tenant.menus.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Menus - Can Deletes',
            ],
            [
                'name' => 'tenant.menus.export',
                'guard_name' => 'tenant',
                'show_name' => 'Menus - Can Export',
            ],

            // Packages Routes
            [
                'name' => 'tenant.packages.index',
                'guard_name' => 'tenant',
                'show_name' => 'Packages - Can View',
            ],
            [
                'name' => 'tenant.packages.create',
                'guard_name' => 'tenant',
                'show_name' => 'Packages - Can Create',
            ],
            [
                'name' => 'tenant.packages.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Packages - Can Edit',
            ],
            [
                'name' => 'tenant.packages.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Packages - Can Delete',
            ],
            [
                'name' => 'tenant.packages.export',
                'guard_name' => 'tenant',
                'show_name' => 'Packages - Can Export',
            ],

            // Halls Routes
            [
                'name' => 'tenant.halls.index',
                'guard_name' => 'tenant',
                'show_name' => 'Halls - Can View',
            ],
            [
                'name' => 'tenant.halls.create',
                'guard_name' => 'tenant',
                'show_name' => 'Halls - Can Create',
            ],
            [
                'name' => 'tenant.halls.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Halls - Can Edit',
            ],
            [
                'name' => 'tenant.halls.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Halls - Can Delete',
            ],
            [
                'name' => 'tenant.halls.export',
                'guard_name' => 'tenant',
                'show_name' => 'Halls - Can Export',
            ],

            // Hall Slots Routes
            [
                'name' => 'tenant.halls.slots.index',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Slots - Can View',
            ],
            [
                'name' => 'tenant.halls.slots.create',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Slots - Can Create',
            ],
            [
                'name' => 'tenant.halls.slots.edit',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Slots - Can Edit',
            ],
            [
                'name' => 'tenant.halls.slots.destroy',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Slots - Can Delete',
            ],
            [
                'name' => 'tenant.halls.slots.export',
                'guard_name' => 'tenant',
                'show_name' => 'Hall Slots - Can Export',
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
