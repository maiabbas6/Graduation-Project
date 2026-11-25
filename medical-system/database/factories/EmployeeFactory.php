<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Section;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    protected $model = Employee::class;

    private static array $qualifications = [
        'MD - Board Certified',
        'MD, PhD - Damascus University',
        'MD, MRCP - Royal College of Physicians',
        'MD, FACS - American College of Surgeons',
        'MD, FACP - American College of Physicians',
        'MD - Aleppo University, Specialty Training',
        'MD, Fellowship in Subspecialty',
        'MD - European Board Certification',
    ];

    public function definition(): array
    {
        $section = Section::inRandomOrder('')->first() ?? Section::factory()->create();

        return [
            'user_id' => User::factory()->doctor(),
            'section_id' => $section->id,
            'specialization' => $section->name,
            'license_no' => 'SYR-MD-' . fake()->unique()->numerify('###'),
            'hour_rate' => fake()->randomFloat(2, 50, 150),
            'qualifications' => fake()->randomElement(self::$qualifications),
            'contract_end_date' => fake()->dateTimeBetween('+6 months', '+5 years')->format('Y-m-d'),
            'is_active' => fake()->boolean(90),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Employee $employee) {
            $days = fake()->randomElements([0, 1, 2, 3, 4, 5, 6], fake()->numberBetween(3, 5));
            foreach ($days as $day) {
                $startHour = fake()->numberBetween(8, 11);
                $endHour = $startHour + fake()->numberBetween(4, 8);
                $employee->schedules()->create([
                    'day' => $day,
                    'start_at' => sprintf('%02d:00', $startHour),
                    'end_at' => sprintf('%02d:00', $endHour),
                ]);
            }

            $employee->attatchments()->create([
                'path' => 'uploads/doctors/license_' . $employee->license_no . '.pdf',
            ]);

            if ($employee->user) {
                $employee->user->assignRole('doctor');
            }
        });
    }

    public function inSection(Section $section): static
    {
        return $this->state(fn () => [
            'section_id' => $section->id,
            'specialization' => $section->name,
        ]);
    }
}
