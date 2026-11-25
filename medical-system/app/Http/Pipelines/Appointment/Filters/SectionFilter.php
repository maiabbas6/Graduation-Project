<?php

namespace App\Http\Pipelines\Appointment\Filters;

use Closure;
use Illuminate\Database\Eloquent\Builder;

class SectionFilter{

    public function handle(Builder $builder, Closure $next)
    {
        $value = request()->get('section_id');
        if(isset($value)) {
            $builder->whereHas('employee', function (Builder $query) use ($value) {
                $query->where('section_id', $value);
            });
        }
        return $next($builder);
    }
}
