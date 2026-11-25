<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            ['name' => 'General Surgery', 'icon' => 'svg/surgery.svg'],
            ['name' => 'Internal Medicine', 'icon' => 'svg/internal-medicine.svg'],
            ['name' => 'Pediatrics', 'icon' => 'svg/pediatrics.svg'],
            ['name' => 'Obstetrics and Gynecology', 'icon' => 'svg/obstetrics.svg'],
            ['name' => 'Cardiology', 'icon' => 'svg/cardiology.svg'],
            ['name' => 'Orthopedic Surgery', 'icon' => 'svg/orthopedics.svg'],
            ['name' => 'Ophthalmology', 'icon' => 'svg/ophthalmology.svg'],
            ['name' => 'Otolaryngology (ENT)', 'icon' => 'svg/ear-nose-and-throat.svg'],
            ['name' => 'Dermatology', 'icon' => 'svg/dermatology.svg'],
            ['name' => 'Neurology', 'icon' => 'svg/neurology.svg'],
            ['name' => 'Psychiatry', 'icon' => 'svg/psychology.svg'],
            ['name' => 'Emergency Medicine', 'icon' => 'svg/emergency-care.svg'],
            ['name' => 'Urology', 'icon' => 'svg/urology.svg'],
            ['name' => 'Gastroenterology', 'icon' => 'svg/gastroenterology.svg'],
            ['name' => 'Pulmonology', 'icon' => 'svg/lung.svg'],
            ['name' => 'Endocrinology', 'icon' => 'svg/glasses.svg'],
            ['name' => 'Rheumatology', 'icon' => 'svg/rheumatology.svg'],
            ['name' => 'Nephrology', 'icon' => 'svg/nephrology.svg'],
        ];

        Section::insert($sections);
    }
}
