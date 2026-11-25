<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\MedicalPlan;
use App\Models\Section;
use App\Models\User;
use App\Support\MedicalData;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ClientSeeder extends Seeder
{
    private array $firstNames = [
        'Omar', 'Fatima', 'Hassan', 'Aisha', 'Khalid', 'Noor', 'Mahmoud', 'Samira',
        'Youssef', 'Layal', 'Mohammed', 'Hind', 'Adel', 'Ruba', 'Samer', 'Iman',
        'Bilal', 'Dana', 'Ziad', 'Hana', 'Karim', 'Sana', 'Anas', 'Reem',
        'Wael', 'Lamis', 'Talal', 'Rasha', 'Ghassan', 'Manal', 'Firas', 'Shaza',
    ];

    private array $lastNames = [
        'Omar', 'Ali', 'Ibrahim', 'Mohammed', 'Ahmad', 'Hassan', 'Khalid', 'Nabil',
        'Khaled', 'Saleh', 'Nasser', 'Suleiman', 'Barakat', 'Hamwi', 'Ghanem', 'Tabbara',
        'Qasem', 'Shamout', 'Khatib', 'Nakhle', 'Haddad', 'Azmeh', 'Dabbous', 'Mourad',
    ];

    private array $areas = [
        'Damascus', 'Al-Mazzah, Damascus', 'Harasta, Damascus', 'Al-Midan, Damascus',
        'Qaboun, Damascus', 'Bab Sharqi, Damascus', 'Dummar, Damascus', 'Kafr Sousa, Damascus',
        'Al-Malki, Damascus', 'Al-Rabwah, Damascus',
    ];

    private int $phoneCounter = 500001;

    public function run(): void
    {
        $doctorsBySection = Employee::query()
            ->with('user')
            ->get()
            ->groupBy('section_id');

        foreach (range(1, 70) as $_) {
            $this->createClient($doctorsBySection);
        }
    }

    private function createClient($doctorsBySection): void
    {
        $section = MedicalData::weightedSection();

        $sectionModel = Section::where('name', $section['name'])->first();
        $doctors = $sectionModel ? ($doctorsBySection->get($sectionModel->id) ?? collect()) : collect();

        if ($sectionModel === null) {
            $doctors = collect();
        }

        $gender = fake()->randomElement(['male', 'female']);
        $isPediatrics = str_contains((string) $section['name'], 'Pediatrics');

        $user = User::create([
            'phone' => '0935'.str_pad((string) $this->phoneCounter++, 6, '0', STR_PAD_LEFT),
            'first_name' => fake()->randomElement($this->firstNames),
            'last_name' => fake()->randomElement($this->lastNames),
            'birth' => fake()->dateTimeBetween(
                $isPediatrics ? '-12 years' : '-65 years',
                $isPediatrics ? '-1 years' : '-18 years'
            )->format('Y-m-d'),
            'gender' => $gender,
            'password' => Hash::make('12345678'),
            'address' => fake()->randomElement($this->areas),
        ]);
        $user->assignRole('client');

        $diseases = $section['diseases'];
        $count = min(3, count($diseases));
        $picked = fake()->randomElements($diseases, rand(1, $count));

        $doctor = $doctors->isNotEmpty() ? $doctors->random() : null;

        foreach ($picked as $index => $disease) {
            $this->createDiseaseHistory($user, $disease, $index, $doctor);
        }
    }

    private function createDiseaseHistory(User $user, array $disease, int $index, ?Employee $doctor): void
    {
        $records = rand(1, 3);
        $progress = [
            'diagnosis',
            fake()->randomElement(['follow-up', 'lab', 'routine-check']),
            fake()->randomElement(['consultation', 'follow-up', 'routine-check']),
        ];

        $date = now()->subMonths(18)->addDays($index * 40);

        for ($i = 0; $i < $records; $i++) {
            $record = $user->medicalRecords()->create([
                'employee_id' => $doctor?->id,
                'date' => $date->addDays(rand(30, 90))->format('Y-m-d'),
                'description' => $this->descriptionFor($disease, $i),
                'type' => $progress[$i],
            ]);

            if ($progress[$i] === 'diagnosis' && $doctor) {
                MedicalPlan::create([
                    'employee_id' => $doctor->id,
                    'medical_record_id' => $record->id,
                    'title' => 'Management Plan - '.$disease['name'],
                    'description' => 'Therapeutic plan based on the diagnosis. Medications: '
                        .implode(', ', $disease['medications']).'. '
                        .'Maintain follow-up and adjust treatment according to response.',
                ]);
            }
        }
    }

    private function descriptionFor(array $disease, int $index): string
    {
        $template = $disease['templates'][$index % count($disease['templates'])]
            ?? $disease['templates'][0]
            ?? '';

        if ($index === 0) {
            return $template;
        }

        return fake()->randomElement([
            'Follow-up for '.$disease['name'].'. Patient reports improvement with current management.',
            'Routine check for '.$disease['name'].'. Continue current treatment and reassess next visit.',
            'Patient returns for review showing symptomatic improvement. Maintained on current regimen.',
            'Ongoing care for '.$disease['name'].'. Parameters stable; plan continuation of therapy.',
        ]).' Diagnosis: '.fake()->randomElement($disease['diagnoses']).'. Prescribed: '
            .fake()->randomElement($disease['medications']).'.';
    }
}
