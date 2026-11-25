<?php

namespace App\Http\Pipelines\Cost\Filters;

use Closure;
use Illuminate\Database\Eloquent\Builder;

class CostTypeFilter
{
    public function handle(Builder $builder, Closure $next)
    {
        $type = request()->get('type');

        if ($type === 'appointment') {
            $builder->whereNotNull('appointment_id');
        } elseif ($type === 'room_service') {
            $builder->whereNotNull('room_service_user_id');
        }

        return $next($builder);
    }
}
