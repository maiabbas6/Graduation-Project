<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable , HasApiTokens , HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'password',
        'first_name',
        'last_name',
        'phone',
        'birth',
        'gender',
        'address',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'birth' => 'date',
        ];
    }

    public function employee(): HasOne
    {
        return $this->hasOne(Employee::class);
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class, 'user_id')->orderByDesc('appointment_date_time');
    }


    public function medicalRecords(): HasMany
    {
        return $this->hasMany(MedicalRecord::class, 'user_id')->orderByDesc('date');
    }

    public function medicalPlans(): HasManyThrough
    {
        return $this->hasManyThrough(MedicalPlan::class, MedicalRecord::class);
    }

    public function notifications(): HasMany{
        return $this->hasMany(Notification::class,'user_id')->orderByDesc('created_at');
    }

    public function chats(): HasMany{
        return $this->hasMany(AiChat::class)->orderByDesc('created_at');
    }

    public function costs(): HasMany
    {
        return $this->hasMany(Cost::class)->orderByDesc('created_at');
    }

    public function loadAllRelations(): static
    {
        return $this->load(['roles.permissions', 'employee']);
    }
}
