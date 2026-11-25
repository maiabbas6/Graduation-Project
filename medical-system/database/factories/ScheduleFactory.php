<?php

namespace Database\Factories;

use App\Models\Schedule;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ScheduleFactory extends Factory
{
    protected $model = Schedule::class;

    private static array $dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    public function definition(): array
    {
        $startHour = fake()->numberBetween(8, 11);
        $endHour = $startHour + fake()->numberBetween(4, 9);

        return [
            'employee_id' => User::factory()->doctor(),
            'day' => fake()->numberBetween(0, 6),
            'start_at' => sprintf('%02d:00', $startHour),
            'end_at' => sprintf('%02d:00', $endHour),
        ];
    }

    public function weekday(): static
    {
        return $this->state(fn () => [
            'day' => fake()->numberBetween(0, 4),
        ]);
    }

    public function morning(): static
    {
        return $this->state(fn () => [
            'start_at' => sprintf('%02d:00', fake()->numberBetween(8, 9)),
            'end_at' => sprintf('%02d:00', fake()->numberBetween(13, 14)),
        ]);
    }

    public function afternoon(): static
    {
        return $this->state(fn () => [
            'start_at' => sprintf('%02d:00', fake()->numberBetween(14, 16)),
            'end_at' => sprintf('%02d:00', fake()->numberBetween(19, 21)),
        ]);
    }

    public function forEmployee(User $user): static
    {
        return $this->state(fn () => ['employee_id' => $user->id]);
    }
}