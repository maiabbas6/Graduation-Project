<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoomServiceUser extends Model
{
    protected $fillable = [
        'room_service_id',
        'room_id',
        'user_id',
        'employee_id',
        'status'
    ];

    public function roomService(): BelongsTo
    {
        return $this->belongsTo(RoomService::class, 'room_service_id');
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class, 'room_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
