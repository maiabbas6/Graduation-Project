<?php

namespace App\Http\Pipelines\Appointment\Filters;

use Closure;
use Illuminate\Database\Eloquent\Builder;

class AppointmentDateFilter{


    public function handle(Builder $builder, Closure $next)
    {
        $before = request()->get("before");
        $after = request()->get("after");

         $builder
            ->when($after, function (Builder $query) use ($after) {
                $query->whereDate('appointment_date_time', '>=', $after);
            })
            ->when($before, function (Builder $query) use ($before) {
                $query->whereDate('appointment_date_time', '<=', $before);
            });
        return $next($builder);
    }
}
