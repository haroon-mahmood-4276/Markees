<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run()
    {
        $roles = (new Role())->all();
        $admin = (new Admin())->create([
            'name' => 'Admin',
            'email' => 'admin@markees.com',
            'phone_no' => '0310-0177771',
            'email_verified_at' => now()->timestamp,
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $admin->assignRole($roles[0]);

        $admin = (new Admin())->create([
            'name' => 'Manager',
            'email' => 'manager@markees.com',
            'phone_no' => '0310-0177771',
            'email_verified_at' => now()->timestamp,
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $admin->assignRole($roles[1]);
    }
}
