<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Room;
use App\Models\Schedule;
use App\Models\User;
use App\Support\MedicalData;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AppointmentSeeder extends Seeder
{
    private array $types = ['consultation', 'follow-up', 'routine-check', 'urgent'];

    public function run(): void
    {
        $doctors = Employee::whereHas('schedules')->with('schedules')->get();
        $clients = User::role('client')->with('medicalRecords')->get();
        $roomIds = Room::pluck('id')->all();

        foreach ($clients as $client) {
            $clientSectionDiseases = $this->sectionDiseasesForClient($client);

            foreach (range(1, rand(1, 3)) as $_) {
                $doctor = $doctors->isNotEmpty()
                    ? $doctors->random()
                    : null;

                $schedule = $doctor?->schedules->random();

                if (! $doctor || ! $schedule) {
                    continue;
                }

                $dateTime = $this->scheduledDateTime($schedule);
                $isClosed = random_int(0, 10) < 7;

                $client->appointments()->create([
                    'employee_id' => $doctor->id,
                    'room_id' => fake()->randomElement($roomIds),
                    'appointment_date_time' => $dateTime->format('Y-m-d H:i:s'),
                    'appointment_closed_at' => $isClosed
                        ? $dateTime->copy()->addMinutes(rand(20, 60))->format('Y-m-d H:i:s')
                        : null,
                    'type' => fake()->randomElement($this->types),
                    'status' => $isClosed ? 'closed' : fake()->randomElement(['waiting', 'pending']),
                    'description' => $this->descriptionFor($doctor, $clientSectionDiseases),
                ]);
            }
        }
    }

    /**
     * Pick the diseases available in the section(s) this client has records in.
     */
    private function sectionDiseasesForClient(User $client): array
    {
        $diseases = [];

        foreach ($client->medicalRecords as $record) {
            $section = $record->employee?->section;

            if (! $section) {
                continue;
            }

            $diseases = array_merge($diseases, MedicalData::diseasesFor($section->name));
        }

        return $diseases;
    }

    private function descriptionFor(Employee $doctor, array $diseases): string
    {
        $pool = $diseases !== []
            ? $diseases
            : MedicalData::diseasesFor($doctor->section->name);

        if ($pool === []) {
            return 'Medical consultation with '.($doctor->user?->first_name ?? 'the doctor').'.';
        }

        $disease = fake()->randomElement($pool);

        return 'Consultation regarding '.$disease['name'].'. '
            .($disease['templates'][0] ?? 'Assessment and management advice provided.');
    }

    private function scheduledDateTime(Schedule $schedule): Carbon
    {
        $date = now()->subDays(rand(1, 90));
        $offset = ($schedule->day - $date->dayOfWeek + 7) % 7;
        $date = $date->addDays($offset);

        $start = Carbon::parse($schedule->start_at);
        $end = Carbon::parse($schedule->end_at);
        $maxSeconds = max(0, $start->diffInSeconds($end));

        return $date->setTimeFrom($start->copy()->addSeconds(rand(0, $maxSeconds)));
    }
}
