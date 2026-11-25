<?php

namespace App\Http\Pipelines\Employee\Filters;

use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class UserNameFilter
{
    /**
     * @param Builder<Model> $builder
     * @param Closure(): void $next
     */
    public function handle(Builder $builder, Closure $next)
    {
        $value = request()->get('name');

        $builder->when($value, function (Builder $query) use ($value) {
            $query->whereHas('user', function (Builder $user) use ($value) {
                $user->where('first_name', 'like', "%" . $value . "%")
                    ->orWhere('last_name', 'like', "%" . $value . "%");
            });
        });

        return $next($builder);
    }
}