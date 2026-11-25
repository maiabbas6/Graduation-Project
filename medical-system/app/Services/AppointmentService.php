<?php

namespace App\Services;

use App\Events\AppointmentUpdateEvent;
use App\Models\Appointment;
use App\Models\User;
use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Services\NotificationService;

class AppointmentService
{
    static public function createByUser($data,User $user){
        return DB::transaction(function () use ($data,$user) {
            $appointment = $user->appointments()->create($data);

            if (isset($data['attatchments'])) {
                AttatchmentService::store($appointment, $data['attatchments'], 'appointments');
            }

            NotificationService::send(
                $user,
                'Appointment Created',
                'Your appointment has been successfully created.',
                'appointment',
                $appointment
            );

            return $appointment;
        });
    }



    static public function update(Appointment $appointment, array $data): Appointment
    {
        $appointment->update($data);
        event(new AppointmentUpdateEvent($appointment));
        return $appointment->refresh();
    }

    static public function delete(Appointment $appointment): void
    {
        $appointment->delete();
    }

    static public function getAvailableSlots(Employee $employee, string $date)
    {
        $date = Carbon::parse($date);
        $day = $date->dayOfWeek;
        
        $schedule = $employee->schedules()->where('day', $day)->first();

        if (!$schedule) {
            return [];
        }

        $startAt = Carbon::parse($schedule->start_at);
        $endAt = Carbon::parse($schedule->end_at);

        // Define standard slot duration (e.g., 20 mins)
        $slotDuration = 20;
        $slots = [];

        for ($time = $startAt->copy(); $time->copy()->addMinutes($slotDuration)->lessThanOrEqualTo($endAt); $time->addMinutes($slotDuration)) {
            $slotStart = $time->copy();

            // Check for conflict
            $conflict = Appointment::where('employee_id', $employee->id)
                ->where('status', 'waiting')
                ->whereRaw('ABS(TIMESTAMPDIFF(MINUTE, appointment_date_time, ?)) < 20', [$slotStart])
                ->exists();

            if (!$conflict) {
                $slots[] = $slotStart->format('H:i');
            }
        }

        return $slots;
    }

    static public function getNextAppointment(User $user): ?Appointment
    {
        return Appointment::where('user_id', $user->id)
            ->where('appointment_date_time', '>', Carbon::now())
            ->whereIn('status', ['pending', 'waiting'])
            ->orderBy('appointment_date_time')
            ->with(['employee.user', 'room'])
            ->first();
    }
}
