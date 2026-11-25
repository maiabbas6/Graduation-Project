<?php

namespace App\Listeners;

use App\Events\ScheduleUpdateEvent;
use App\Models\Employee;
use App\Services\NotificationService;

class SendScheduleNotification
{
    public function handle(ScheduleUpdateEvent $event): void
    {
        $employee = Employee::with('user')->find($event->employeeId);

        if (! $employee?->user) {
            return;
        }

        NotificationService::send(
            $employee->user,
            'Schedule Updated',
            'Your weekly schedule has been changed.',
            'schedule'
        );
    }
}
