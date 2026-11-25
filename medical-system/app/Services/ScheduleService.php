<?php

namespace App\Services;

use App\Events\ScheduleUpdateEvent;
use App\Models\Employee;
use App\Models\Schedule;

class ScheduleService
{
    static public function getEmployeeSchedule(Employee $employee){
        return $employee->schedules()
            ->orderBy('day')
            ->orderBy('start_at');
    }

    static public function addSchedule(array $scheduleData): Schedule
    {
        $schedule = Schedule::create($scheduleData);
        event(new ScheduleUpdateEvent($schedule->employee_id));
        return $schedule;
    }

    static public function updateSchedule(Schedule $schedule, array $scheduleData): Schedule
    {
        $schedule->update($scheduleData);
        event(new ScheduleUpdateEvent($schedule->employee_id));
        return $schedule->refresh();
    }

    static public function deleteSchedule(Schedule $schedule): void
    {
        event(new ScheduleUpdateEvent($schedule->employee_id));
        $schedule->delete();
    }
}
