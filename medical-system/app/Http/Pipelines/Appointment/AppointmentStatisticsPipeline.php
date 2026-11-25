<?php

namespace App\Http\Pipelines\Appointment;

use App\Http\Pipelines\Appointment\Filters\AppointmentDateFilter;
use App\Http\Pipelines\Appointment\Filters\SectionFilter;
use App\Http\Pipelines\EqualFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Routing\Pipeline;

class AppointmentStatisticsPipeline extends Pipeline {

    protected function pipes():array
    {
        return [
            new EqualFilter('user_id'),
            new EqualFilter('employee_id'),
            new EqualFilter('room_id'),
            new EqualFilter('type'),
            new EqualFilter('status'),

            new SectionFilter(),
            new AppointmentDateFilter(),

        ];
    }
    /**
     * @param Builder<Model> $builder
     */
    public static function make(Builder $builder): Builder
    {
        return app(static::class)
            ->send($builder)
            ->thenReturn();
    }

}
