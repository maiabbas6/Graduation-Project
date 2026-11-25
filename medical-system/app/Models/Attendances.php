<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendances extends Model
{
    protected $fillable = [
        'employee_id',
        'date_time',
        'type',
    ];

    public function employee():BelongsTo {
        return $this->belongsTo(Employee::class);
    }

}
