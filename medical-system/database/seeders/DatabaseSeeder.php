<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $user = User::create([
            'first_name' => 'admin',
            'last_name' => 'admin',
            'birth' => '2000-01-01',
            'address' => 'address',
            'phone' => '0987654321',
            'password' => Hash::make('12345678'),
        ]);

        $this->call([
            RolesPermissionsSeeder::class,
            SectionSeeder::class,
            RoomSeeder::class,
            RoomServiceSeeder::class,
            EmployeeSeeder::class,
            NurseSeeder::class,
            ClientSeeder::class,
            AppointmentSeeder::class,
        ]);

        $user->assignRole('admin');
    }
}
