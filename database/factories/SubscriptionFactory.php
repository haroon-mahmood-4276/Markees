<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscription>
 */
class SubscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'no_of_days' => fake()->numberBetween(1, 31),
            'price' => fake()->randomFloat(2, 1, 999999),
            'no_of_halls' => fake()->numberBetween(1, 10),
            'active' => fake()->boolean(50),
        ];
    }
}
