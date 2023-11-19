<?php

namespace Database\Seeders\HallOwner;

use App\Models\TenantUser;
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
                'name' => 'hall_owner.roles.index',
                'guard_name' => 'hall-owner',
                'show_name' => 'Roles - Can View',
            ],
            [
                'name' => 'hall_owner.roles.create',
                'guard_name' => 'hall-owner',
                'show_name' => 'Roles - Can Create',
            ],
            [
                'name' => 'hall_owner.roles.edit',
                'guard_name' => 'hall-owner',
                'show_name' => 'Roles - Can Edit',
            ],
            [
                'name' => 'hall_owner.roles.destroy',
                'guard_name' => 'hall-owner',
                'show_name' => 'Roles - Can Delete',
            ],
            [
                'name' => 'hall_owner.roles.export',
                'guard_name' => 'hall-owner',
                'show_name' => 'Roles - Can Export',
            ],

            // Permissions Routes
            [
                'name' => 'hall_owner.permissions.index',
                'guard_name' => 'hall-owner',
                'show_name' => 'Permissions - Can View',
            ],
            [
                'name' => 'hall_owner.permissions.assign-permission',
                'show_name' => 'Permissions - Can Assign',
                'guard_name' => 'hall-owner',
            ],

            // HallType Routes
            [
                'name' => 'admin.hall-types.index',
                'guard_name' => 'hall-owner',
                'show_name' => 'Hall Types - Can View',
            ],
            [
                'name' => 'admin.hall-types.create',
                'guard_name' => 'hall-owner',
                'show_name' => 'Hall Types - Can Create',
            ],
            [
                'name' => 'admin.hall-types.edit',
                'guard_name' => 'hall-owner',
                'show_name' => 'Hall Types - Can Edit',
            ],
            [
                'name' => 'admin.hall-types.destroy',
                'guard_name' => 'hall-owner',
                'show_name' => 'Hall Types - Can Delete',
            ],
            [
                'name' => 'admin.hall-types.export',
                'guard_name' => 'hall-owner',
                'show_name' => 'Hall Types - Can Export',
            ],

            // Decorations Routes
            [
                'name' => 'hall_owner.decorations.index',
                'guard_name' => 'hall-owner',
                'show_name' => 'Decorations - Can View',
            ],
            [
                'name' => 'hall_owner.decorations.create',
                'guard_name' => 'hall-owner',
                'show_name' => 'Decorations - Can Create',
            ],
            [
                'name' => 'hall_owner.decorations.edit',
                'guard_name' => 'hall-owner',
                'show_name' => 'Decorations - Can Edit',
            ],
            [
                'name' => 'hall_owner.decorations.destroy',
                'guard_name' => 'hall-owner',
                'show_name' => 'Decorations - Can Delete',
            ],
            [
                'name' => 'hall_owner.decorations.export',
                'guard_name' => 'hall-owner',
                'show_name' => 'Decorations - Can Export',
            ],

            // Cuisines Routes
            [
                'name' => 'hall_owner.cuisines.index',
                'guard_name' => 'hall-owner',
                'show_name' => 'Cuisines - Can View',
            ],
            [
                'name' => 'hall_owner.cuisines.create',
                'guard_name' => 'hall-owner',
                'show_name' => 'Cuisines - Can Create',
            ],
            [
                'name' => 'hall_owner.cuisines.edit',
                'guard_name' => 'hall-owner',
                'show_name' => 'Cuisines - Can Edit',
            ],
            [
                'name' => 'hall_owner.cuisines.destroy',
                'guard_name' => 'hall-owner',
                'show_name' => 'Cuisines - Can Delete',
            ],
            [
                'name' => 'hall_owner.cuisines.export',
                'guard_name' => 'hall-owner',
                'show_name' => 'Cuisines - Can Export',
            ],

            // Menus Routes
            [
                'name' => 'hall_owner.menus.index',
                'guard_name' => 'hall-owner',
                'show_name' => 'Menus - Can View',
            ],
            [
                'name' => 'hall_owner.menus.create',
                'guard_name' => 'hall-owner',
                'show_name' => 'Menus - Can Create',
            ],
            [
                'name' => 'hall_owner.menus.edit',
                'guard_name' => 'hall-owner',
                'show_name' => 'Menus - Can Edit',
            ],
            [
                'name' => 'hall_owner.menus.destroy',
                'guard_name' => 'hall-owner',
                'show_name' => 'Menus - Can Deletes',
            ],
            [
                'name' => 'hall_owner.menus.export',
                'guard_name' => 'hall-owner',
                'show_name' => 'Menus - Can Export',
            ],

            // Packages Routes
            [
                'name' => 'hall_owner.packages.index',
                'guard_name' => 'hall-owner',
                'show_name' => 'Packages - Can View',
            ],
            [
                'name' => 'hall_owner.packages.create',
                'guard_name' => 'hall-owner',
                'show_name' => 'Packages - Can Create',
            ],
            [
                'name' => 'hall_owner.packages.edit',
                'guard_name' => 'hall-owner',
                'show_name' => 'Packages - Can Edit',
            ],
            [
                'name' => 'hall_owner.packages.destroy',
                'guard_name' => 'hall-owner',
                'show_name' => 'Packages - Can Delete',
            ],
            [
                'name' => 'hall_owner.packages.export',
                'guard_name' => 'hall-owner',
                'show_name' => 'Packages - Can Export',
            ],

            // Halls Routes
            [
                'name' => 'hall_owner.halls.index',
                'guard_name' => 'hall-owner',
                'show_name' => 'Halls - Can View',
            ],
            [
                'name' => 'hall_owner.halls.create',
                'guard_name' => 'hall-owner',
                'show_name' => 'Halls - Can Create',
            ],
            [
                'name' => 'hall_owner.halls.edit',
                'guard_name' => 'hall-owner',
                'show_name' => 'Halls - Can Edit',
            ],
            [
                'name' => 'hall_owner.halls.destroy',
                'guard_name' => 'hall-owner',
                'show_name' => 'Halls - Can Delete',
            ],
            [
                'name' => 'hall_owner.halls.export',
                'guard_name' => 'hall-owner',
                'show_name' => 'Halls - Can Export',
            ],

            // Hall Slots Routes
            [
                'name' => 'hall_owner.halls.slots.index',
                'guard_name' => 'hall-owner',
                'show_name' => 'Hall Slots - Can View',
            ],
            [
                'name' => 'hall_owner.halls.slots.create',
                'guard_name' => 'hall-owner',
                'show_name' => 'Hall Slots - Can Create',
            ],
            [
                'name' => 'hall_owner.halls.slots.edit',
                'guard_name' => 'hall-owner',
                'show_name' => 'Hall Slots - Can Edit',
            ],
            [
                'name' => 'hall_owner.halls.slots.destroy',
                'guard_name' => 'hall-owner',
                'show_name' => 'Hall Slots - Can Delete',
            ],
            [
                'name' => 'hall_owner.halls.slots.export',
                'guard_name' => 'hall-owner',
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
