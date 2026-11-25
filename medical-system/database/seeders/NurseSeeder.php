<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Section;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class NurseSeeder extends Seeder
{
    private array $names = [
        ['Rami', 'Sleiman'], ['Diana', 'Naoum'], ['Majd', 'Azar'], ['Lana', 'Haddad'],
        ['Georges', 'Sabbagh'], ['Mira', 'Khoury'], ['Nabil', 'Awad'], ['Salma', 'Zaytoun'],
    ];

    private int $phoneCounter = 700001;

    public function run(): void
    {
        $sections = Section::all();

        foreach ($this->names as $index => [$firstName, $lastName]) {
            $user = User::create([
                'phone' => '0955'.str_pad((string) $this->phoneCounter++, 6, '0', STR_PAD_LEFT),
                'first_name' => $firstName,
                'last_name' => $lastName,
                'birth' => fake()->dateTimeBetween('-45 years', '-24 years')->format('Y-m-d'),
                'gender' => rand(0, 1) ? 'male' : 'female',
                'password' => Hash::make('12345678'),
                'address' => 'Damascus',
            ]);
            $user->assignRole('nurse');

            Employee::create([
                'user_id' => $user->id,
                'section_id' => $sections[$index % $sections->count()]->id,
                'specialization' => 'Nursing',
                'license_no' => 'SYR-RN-'.str_pad((string) ($index + 1), 3, '0', STR_PAD_LEFT),
                'hour_rate' => 25.00,
                'qualifications' => 'Registered Nurse - Nursing School Diploma',
            ]);
        }
    }
}
