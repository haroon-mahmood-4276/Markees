<?php

namespace Database\Seeders\Admin;

use App\Models\{HallOwner, Subscription};
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class HallOwnerSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run()
    {
        $data = [
            'subscription_id' => (new Subscription())->first()->id,
            'name' => 'Haroon Mahmood',
            'email' => 'haroon.mahmood.4276@gmail.com',
            'password' => Hash::make('IyeTech@2299'),
            'phone' => '+923034243233',
            'cnic' => '11111-1111111-1',
            'ntn' => '12345671',
            'active' => true,
        ];

        (new HallOwner())->create($data);
    }
}
