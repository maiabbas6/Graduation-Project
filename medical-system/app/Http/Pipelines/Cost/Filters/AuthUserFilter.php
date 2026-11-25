<?php

namespace App\Http\Pipelines\Cost\Filters;

use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class AuthUserFilter
{
    public function handle(Builder $builder, Closure $next)
    {
        $builder->where('user_id', Auth::id());

        return $next($builder);
    }
}
