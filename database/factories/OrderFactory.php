<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Creates a new user if not provided
            'product' => $this->faker->randomElement(['Laptop', 'Mouse', 'Keyboard', 'Monitor']),
            'quantity' => $this->faker->numberBetween(1, 5),
            'total' => function (array $attributes) {
                $priceList = [
                    'Laptop' => 50000,
                    'Mouse' => 500,
                    'Keyboard' => 1500,
                    'Monitor' => 12000,
                ];
                return $priceList[$attributes['product']] * $attributes['quantity'];
            },
        ];
    }
}
