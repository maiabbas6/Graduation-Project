<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Section extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'icon',
    ];

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class, 'section_id');
    }
}
