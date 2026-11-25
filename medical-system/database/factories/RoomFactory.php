<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    protected $model = Room::class;

    private static array $roomNames = [];

    public function definition(): array
    {
        $types = ['Consultation Room', 'Examination Room', 'Treatment Room', 'Ward Room', 'Operating Theatre'];
        $type = fake()->randomElement($types);
        $number = fake()->numberBetween(101, 330);

        return [
            'name' => $type . ' ' . $number,
        ];
    }

    public function consultation(): static
    {
        return $this->state(fn () => [
            'name' => 'Consultation Room ' . fake()->unique()->numberBetween(101, 120),
        ]);
    }

    public function treatment(): static
    {
        return $this->state(fn () => [
            'name' => 'Treatment Room ' . fake()->randomElement(['A', 'B', 'C', 'D']),
        ]);
    }

    public function ward(): static
    {
        return $this->state(fn () => [
            'name' => 'Ward Room ' . fake()->unique()->numberBetween(201, 230),
        ]);
    }
}