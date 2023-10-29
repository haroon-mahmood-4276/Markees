<?php

namespace Database\Seeders\Tenants;

use App\Models\{Role, Tenant};
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run()
    {
        Tenant::all()->runForEach(function () {
            $data = [
                [
                    'name' => 'Admin',
                    'guard_name' => 'tenant',
                    'parent_id' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ];

            foreach ($data as $key => $value) {
                (new Role())->create($value);
            }
        });
    }
}
