<?php

namespace Database\Seeders\Admin;

use App\Models\Subscription;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        if (app()->environment() === 'local') {
            Subscription::truncate();
            // Subscription::factory()->count(99)->create();

            $data = [
                [
                    'name' => 'Standard Subscription',
                    'no_of_days' => 30,
                    'price' => 1500,
                    'no_of_halls' => 1,
                    'active' => true,
                ],
                [
                    'name' => 'Silver Subscription',
                    'no_of_days' => 30,
                    'price' => 2500,
                    'no_of_halls' => 3,
                    'active' => true,
                ],
                [
                    'name' => 'Golden Subscription',
                    'no_of_days' => 30,
                    'price' => 5000,
                    'no_of_halls' => 5,
                    'active' => true,
                ],
                [
                    'name' => 'Dimond Subscription',
                    'no_of_days' => 30,
                    'price' => 10000,
                    'no_of_halls' => 10,
                    'active' => true,
                ],
            ];

            foreach ($data as $key => $value) {
                (new Subscription())->create($value);
            }
        }
    }
}
