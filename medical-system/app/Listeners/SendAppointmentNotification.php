<?php

namespace App\Listeners;

use App\Events\AppointmentUpdateEvent;
use App\Services\NotificationService;

class SendAppointmentNotification
{
    public function handle(AppointmentUpdateEvent $event): void
    {
        $appointment = $event->appointment;

        NotificationService::send(
            $appointment->user,
            'Appointment Updated',
            'Your appointment #'.$appointment->id.' has been updated. Status: '.$appointment->status.'.',
            'appointment',
            $appointment
        );
    }
}
