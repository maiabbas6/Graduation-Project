<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = [
            ['name' => 'Consultation Room 101'],
            ['name' => 'Consultation Room 102'],
            ['name' => 'Consultation Room 103'],
            ['name' => 'Treatment Room A'],
            ['name' => 'Treatment Room B'],
            ['name' => 'Minor Surgery Room'],
            ['name' => 'Operating Theatre 1'],
            ['name' => 'Operating Theatre 2'],
            ['name' => 'Recovery Room'],
            ['name' => 'Observation Room'],
            ['name' => 'ECG Room'],
            ['name' => 'Ultrasound Room'],
            ['name' => 'X-Ray Room'],
            ['name' => 'Ward Room 201'],
            ['name' => 'Ward Room 202'],
            ['name' => 'Ward Room 203'],
            ['name' => 'Isolation Room'],
        ];
        foreach($rooms as $room){
            $room['created_at'] = now()->format('yyyy-dd');
            $room['updated_at'] = now();
        }

        Room::insert($rooms);
    }
}
