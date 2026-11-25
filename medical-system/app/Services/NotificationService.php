<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class NotificationService
{
    public static function send(User $user, string $title, ?string $body = null, ?string $type = null, ?Model $notable = null): Notification
    {
        return Notification::create([
            'user_id' => $user->id,
            'title' => $title,
            'body' => $body,
            'type' => $type,
            'notable_type' => $notable ? $notable->getMorphClass() : null,
            'notable_id' => $notable?->getKey(),
        ]);
    }
}
