<?php

namespace App\Models;

use App\Traits\HasAttatchment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MedicalRecord extends Model
{
    use HasAttatchment;
    use HasFactory;

    protected $fillable = [
        'user_id',
        'employee_id',
        'date',
        'description',
        'type',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function medicalPlans(): HasMany
    {
        return $this->hasMany(MedicalPlan::class);
    }
}
