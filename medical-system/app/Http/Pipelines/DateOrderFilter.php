<?php

namespace App\Http\Pipelines;

use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class DateOrderFilter{
    /**
     * @param Builder<Model> $builder
     * @param Closure(): void $next
     * @return void
     */
    public function handle(Builder $builder, Closure $next)
    {
        $builder->orderBy("created_at","desc");
        return $next($builder);
    }
}
