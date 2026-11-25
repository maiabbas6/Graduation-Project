<?php

namespace App\Http\Pipelines\Appointment\Filters;

use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class NonAdminAppointmentFilter{
    /**
     * @param Builder<Model> $builder
     * @param Closure(): void $next
     */
    public function handle(Builder $builder, Closure $next): Builder
    {
        $user = Auth::user();

        if (! $user->hasRole('admin')) {
            if ($user->employee != null) {
                $builder->where("employee_id", $user->employee->id);
            } else {
                $builder->where("user_id", $user->id);
            }
        }

        return $next($builder);
    }
}
