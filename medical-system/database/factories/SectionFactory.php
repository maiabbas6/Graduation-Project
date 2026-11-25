<?php

namespace Database\Factories;

use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

class SectionFactory extends Factory
{
    protected $model = Section::class;

    private static array $departments = [
        'General Surgery', 'Internal Medicine', 'Pediatrics',
        'Obstetrics and Gynecology', 'Cardiology', 'Orthopedic Surgery',
        'Ophthalmology', 'Otolaryngology (ENT)', 'Dermatology',
        'Neurology', 'Psychiatry', 'Emergency Medicine',
        'Urology', 'Gastroenterology', 'Pulmonology',
        'Endocrinology', 'Rheumatology', 'Nephrology',
        'Hematology', 'Oncology', 'Infectious Disease',
        'Pain Management', 'Sports Medicine', 'Geriatrics',
    ];

    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(self::$departments),
            'icon' => 'svg/' . fake()->randomElement([
                'surgery.svg',
                'internal-medicine.svg',
                'pediatrics.svg',
                'obstetrics.svg',
                'cardiology.svg',
                'orthopedics.svg',
                'ophthalmology.svg',
                'ear-nose-and-throat.svg',
                'dermatology.svg',
                'neurology.svg',
                'psychology.svg',
                'emergency-care.svg',
                'urology.svg',
                'gastroenterology.svg',
                'lung.svg',
                'glasses.svg',
                'rheumatology.svg',
                'nephrology.svg',
            ]),
        ];
    }
}