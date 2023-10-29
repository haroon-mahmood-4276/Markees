<?php

namespace Database\Seeders\Tenants;

use App\Models\Tenant;
use App\Models\Tenants\Hall;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HallSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run()
    {
        $data = [
            [
                "name" => 'Markees Hall',
                "short_label" => 'markees',
                "min_capacity" => 100,
                "max_capacity" => 200,
                "price" => 15000,
                "description" => 'Markees Hall is a large hall with a capacity of 200 people.',
                "active" => true,
            ],
        ];

        Tenant::all()->runForEach(function () use ($data) {
            foreach ($data as $key => $value) {
                (new Hall())->create($value);
            }
        });
    }
}
