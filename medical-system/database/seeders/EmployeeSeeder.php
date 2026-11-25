<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Section;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class EmployeeSeeder extends Seeder
{
    private array $firstNames = [
        'Ahmad', 'Sara', 'Layla', 'Omar', 'Nour', 'Huda', 'Youssef', 'Rania',
        'Khaled', 'Maya', 'Tarek', 'Dalia', 'Sami', 'Rim', 'Fadi', 'Lina',
        'Bassam', 'Nada', 'Walid', 'Hala',
    ];

    private array $lastNames = [
        'Khalil', 'Hassan', 'Youssef', 'Zaydan', 'Saleh', 'Mahmoud', 'Ahmad', 'Ali',
        'Ibrahim', 'Omar', 'Nasser', 'Khatib', 'Suleiman', 'Nakhle', 'Barakat', 'Shamout',
        'Hamwi', 'Ghanem', 'Tabbara', 'Qasem',
    ];

    private array $areas = [
        'Al-Mazzah, Damascus', 'Al-Malki, Damascus', 'Al-Midan, Damascus', 'Baramkeh, Damascus',
        'Kafr Sousa, Damascus', 'Al-Rabwah, Damascus', 'Qaboun, Damascus', 'Bab Sharqi, Damascus',
        'Dummar, Damascus', 'Harasta, Damascus',
    ];

    private array $qualifications = [
        'MD, PhD - Damascus University, Board Certified',
        'MD - Board Certified, Fellowship-trained specialist',
        'MD, MRCP/MRCS - Royal College, Specialty Trained',
        'MD - American Board Certified, Fellowship Completed',
    ];

    private int $licenseCounter = 1;

    private int $phoneCounter = 100001;

    public function run(): void
    {
        $sections = Section::all();

        foreach ($sections as $section) {
            for ($i = 0; $i < 2; $i++) {
                $this->createDoctor($section);
            }
        }
    }

    private function createDoctor(Section $section): void
    {
        $gender = fake()->randomElement(['male', 'female']);
        $firstName = fake()->randomElement($this->firstNames);
        $lastName = fake()->randomElement($this->lastNames);
        $licenseNo = 'SYR-MD-'.str_pad((string) $this->licenseCounter++, 3, '0', STR_PAD_LEFT);

        $user = User::create([
            'phone' => '0981'.str_pad((string) $this->phoneCounter++, 6, '0', STR_PAD_LEFT),
            'first_name' => $firstName,
            'last_name' => $lastName,
            'birth' => fake()->dateTimeBetween('-45 years', '-27 years')->format('Y-m-d'),
            'gender' => $gender,
            'password' => Hash::make('12345678'),
            'address' => fake()->randomElement($this->areas),
        ]);
        $user->assignRole('doctor');

        $employee = Employee::create([
            'user_id' => $user->id,
            'section_id' => $section->id,
            'specialization' => $section->name,
            'license_no' => $licenseNo,
            'hour_rate' => fake()->randomElement([60, 75, 85, 95, 110, 120, 135, 150]),
            'qualifications' => fake()->randomElement($this->qualifications).' in '.$section->name,
            'contract_end_date' => now()->addYears(rand(2, 4))->format('Y-m-d'),
        ]);

        $this->createSchedules($employee);
        $this->createAttendances($employee);

        $employee->attatchments()->create([
            'path' => 'uploads/doctors/license_'.$licenseNo.'.pdf',
        ]);
    }

    /**
     * Build 4-5 weekly working schedules via the employee relation.
     */
    private function createSchedules(Employee $employee): void
    {
        $days = fake()->randomElements([0, 1, 2, 3, 4, 5], rand(4, 5));
        sort($days);

        foreach ($days as $day) {
            $startHour = random_int(8, 10);
            $endHour = $startHour + random_int(5, 7);

            $employee->schedules()->create([
                'day' => $day,
                'start_at' => sprintf('%02d:%02d:00', $startHour, random_int(0, 29)),
                'end_at' => sprintf('%02d:%02d:00', min($endHour, 19), random_int(0, 29)),
            ]);
        }
    }

    /**
     * Generate in/out attendance records for working days over the past ~45 days.
     */
    private function createAttendances(Employee $employee): void
    {
        $workingDays = $employee->schedules->pluck('day')->all();

        foreach (range(1, 45) as $daysAgo) {
            $date = now()->subDays($daysAgo);

            if (! in_array($date->dayOfWeek, $workingDays)) {
                continue;
            }

            $schedule = $employee->schedules->firstWhere('day', $date->dayOfWeek);

            if (! $schedule) {
                continue;
            }

            $start = Carbon::parse($schedule->start_at);
            $end = Carbon::parse($schedule->end_at);

            $in = $date->copy()->setTimeFrom($start)->addMinutes(rand(-5, 15));
            $out = $date->copy()->setTimeFrom($end)->addMinutes(rand(-15, 20));

            $employee->attendances()->create([
                'date_time' => $in->format('Y-m-d H:i:s'),
                'type' => 'in',
            ]);

            $employee->attendances()->create([
                'date_time' => $out->format('Y-m-d H:i:s'),
                'type' => 'out',
            ]);
        }
    }
}
