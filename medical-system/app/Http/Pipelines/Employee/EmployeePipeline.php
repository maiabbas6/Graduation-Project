<?php

namespace App\Http\Pipelines\Employee;

use App\Http\Pipelines\DateOrderFilter;
use App\Http\Pipelines\Employee\Filters\UserNameFilter;
use App\Http\Pipelines\EqualFilter;
use App\Http\Pipelines\LikeFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Routing\Pipeline;

class EmployeePipeline extends Pipeline {

    protected function pipes(): array
    {
        return [
            new EqualFilter('section_id'),
            new EqualFilter('is_active'),
            new LikeFilter('specialization'),
            new UserNameFilter(),
            new DateOrderFilter(),
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
