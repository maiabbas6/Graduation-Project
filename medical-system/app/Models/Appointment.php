<?php

namespace App\Models;

use App\Traits\HasAttatchment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Appointment extends Model
{
    use HasAttatchment;
    use HasFactory;
    protected $fillable = [
        'user_id',
        'employee_id',
        'room_id',
        'appointment_date_time',
        'type',
        'description',
        'appointment_closed_at',
        'status',
    ];

    protected $casts = [
        'appointment_date_time' => 'datetime',
        'appointment_closed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}
