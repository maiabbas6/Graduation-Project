<?php

namespace App\Models;

use App\Traits\HasAttatchment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasAttatchment;
    use HasFactory;

    protected $fillable = [
        'user_id',
        'section_id',
        'specialization',
        'license_no',
        'hour_rate',
        'qualifications',
        'contract_end_date',
        'is_active',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'hour_rate' => 'decimal:2',
            'is_active' => 'boolean',
            'contract_end_date' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class, 'employee_id',);
    }

    public function appointments() : HasMany {
        return $this->hasMany(Appointment::class);
    }

    public function attendances():HasMany{
        return $this->hasMany(Attendances::class);
    }

}

