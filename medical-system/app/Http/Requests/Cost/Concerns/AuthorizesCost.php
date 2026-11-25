<?php

namespace App\Http\Requests\Cost\Concerns;

use App\Models\Cost;
use App\Models\User;

trait AuthorizesCost
{
    protected function canManageCost(Cost $cost, string $permission, ?User $user = null): bool
    {
        $user ??= auth()->user();

        if (! $user->can($permission)) {
            return false;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        return $cost->user_id === $user->id;
    }
}
