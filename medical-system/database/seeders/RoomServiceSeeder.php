<?php

namespace Database\Seeders;

use App\Models\RoomService;
use Illuminate\Database\Seeder;

class RoomServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['name' => 'General Consultation', 'price' => 50.00],
            ['name' => 'Specialist Consultation', 'price' => 100.00],
            ['name' => 'ECG (Electrocardiogram)', 'price' => 75.00],
            ['name' => 'Chest X-Ray', 'price' => 60.00],
            ['name' => 'Abdominal Ultrasound', 'price' => 120.00],
            ['name' => 'Complete Blood Count (CBC)', 'price' => 25.00],
            ['name' => 'Comprehensive Metabolic Panel', 'price' => 45.00],
            ['name' => 'Lipid Panel', 'price' => 35.00],
            ['name' => 'HbA1c Test', 'price' => 40.00],
            ['name' => 'Urinalysis', 'price' => 20.00],
            ['name' => 'COVID-19 PCR Test', 'price' => 55.00],
            ['name' => 'Influenza Vaccine', 'price' => 30.00],
            ['name' => 'Physical Therapy Session', 'price' => 80.00],
            ['name' => 'Minor Surgical Procedure', 'price' => 250.00],
            ['name' => 'Wound Dressing', 'price' => 35.00],
            ['name' => 'IV Fluids Administration', 'price' => 65.00],
            ['name' => 'Nebulizer Treatment', 'price' => 40.00],
            ['name' => 'Cast Application', 'price' => 120.00],
            ['name' => 'Suture Removal', 'price' => 25.00],
            ['name' => 'Allergy Testing (Skin Prick)', 'price' => 150.00],
            ['name' => 'Stress Test (Treadmill)', 'price' => 350.00],
            ['name' => 'Holter Monitor (24h)', 'price' => 200.00],
            ['name' => 'Pulmonary Function Test', 'price' => 180.00],
            ['name' => 'Mammogram Screening', 'price' => 150.00],
            ['name' => 'Bone Density Scan (DEXA)', 'price' => 200.00],
            ['name' => 'MRI Brain (without contrast)', 'price' => 800.00],
            ['name' => 'CT Scan Chest (with contrast)', 'price' => 600.00],
            ['name' => 'Hospital Room (Private, per day)', 'price' => 350.00],
            ['name' => 'Hospital Room (Semi-Private, per day)', 'price' => 200.00],
            ['name' => 'ICU Bed (per day)', 'price' => 1200.00],
        ];

        RoomService::insert($services);
    }
}