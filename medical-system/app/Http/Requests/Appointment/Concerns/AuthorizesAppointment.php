<?php

namespace App\Http\Requests\Appointment\Concerns;

use App\Models\Appointment;
use App\Models\User;

trait AuthorizesAppointment
{
    protected function canManageAppointment(Appointment $appointment, string $permission, ?User $user = null): bool
    {
        $user ??= auth()->user();

        if (! $user->can($permission)) {
            return false;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        return $appointment->user_id === $user->id
            || $appointment->employee?->user_id === $user->id;
    }
}