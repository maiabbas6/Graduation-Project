<?php

namespace App\Services;

use App\Models\Attendances;
use App\Models\Employee;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EmployeeService
{
    static public function getAllEmployees(): Collection
    {
        return Employee::with(['user', 'section'])->get();
    }

    static public function getEmployee(Employee $employee): Employee
    {
        return $employee->load([
            'user.roles',
            'attatchments',
            'schedules',
            'section',
            'attendances' => fn ($q) => $q->latest('date_time')->limit(10),
        ]);
    }

    static public function getEmployeeAttendances(Employee $employee, int $perPage = 10)
    {
        return $employee->attendances()->latest('date_time')->paginate($perPage);
    }

    static public function createEmployee(array $data): Employee
    {
        return DB::transaction(function () use ($data) {
            $userData = $data;
            $userData['password'] = Hash::make($data['password']);

            $user = User::create($userData);
            $user->assignRole($data['role']);

            $employeeData = $data;
            $employeeData['user_id'] = $user->id;

            return Employee::create($employeeData)->load(['user', 'section']);
        });
    }

    static public function updateEmployee(Employee $employee, array $data): Employee
    {
        return DB::transaction(function () use ($employee, $data) {
            $user = $employee->user;

            if (isset($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            }
            $user->update($data);

            if (isset($data['role'])) {
                $user->syncRoles([$data['role']]);
            }

            $employee->update($data);

            return $employee->fresh()->load(['user', 'section']);
        });
    }

    static public function deleteEmployee(Employee $employee): void
    {
        DB::transaction(function () use ($employee) {
            $user = $employee->user;
            $employee->delete();
            $user->delete();
        });
    }

    static public function getEmployeeClients(Employee $employee)
    {
        // Todo Optimize
        return User::whereIn(
                'id',
                $employee->appointments()->pluck('user_id')
        )->get();
    }

    static public function getAttendanceScheduleDiff(Employee $employee): array
    {
        $schedules = $employee->schedules->keyBy('day');

        return $employee->attendances
            ->sortBy('date_time')
            ->groupBy(fn (Attendances $a) => Carbon::parse($a->date_time)->toDateString())
            ->map(function ($dayAttendances, $date) use ($schedules) {
                $day = Carbon::parse($date)->dayOfWeek;
                $schedule = $schedules->get($day);

                if (!$schedule) {
                    return null;
                }

                $startAt = substr((string) $schedule->start_at, 0, 5);
                $endAt = substr((string) $schedule->end_at, 0, 5);

                $rows = $dayAttendances->map(function (Attendances $att) use ($schedule, $startAt, $endAt) {
                    $actual = Carbon::parse($att->date_time);
                    $scheduledTime = $att->type === 'in' ? $startAt : $endAt;

                    return [
                        'id' => $att->id,
                        'type' => $att->type,
                        'time' => $actual->format('H:i'),
                        'diff_minutes' => (int) Carbon::parse($scheduledTime)->diffInMinutes($actual, false),
                    ];
                })->values();

                $hasOut = $dayAttendances->contains(fn (Attendances $att) => $att->type === 'out');

                if (!$hasOut) {
                    $rows[] = [
                        'id' => null,
                        'type' => 'out',
                        'time' => $endAt,
                        'diff_minutes' => 0,
                    ];
                }

                return [
                    'date' => $date,
                    'day' => $day,
                    'schedule' => [
                        'start_at' => $startAt,
                        'end_at' => $endAt,
                    ],
                    'attendances' => $rows,
                ];
            })
            ->filter()
            ->values()
            ->toArray();
    }
}
