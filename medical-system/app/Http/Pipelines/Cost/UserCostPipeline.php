<?php

namespace App\Http\Pipelines\Cost;

use App\Http\Pipelines\Cost\Filters\AuthUserFilter;
use App\Http\Pipelines\Cost\Filters\CostTypeFilter;
use App\Http\Pipelines\DateOrderFilter;
use App\Http\Pipelines\EqualFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Routing\Pipeline;

class UserCostPipeline extends Pipeline
{
    protected function pipes(): array
    {
        return [
            new AuthUserFilter(),
            new EqualFilter('status'),
            new CostTypeFilter(),
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
