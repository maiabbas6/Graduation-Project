<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicalPlan extends Model
{
    protected $fillable = [
        'employee_id',
        'medical_record_id',
        'title',
        'description'
    ];

    public function employee(){
        return $this->belongsTo(Employee::class);
    }

    public function medicalRecord(){
        return $this->belongsTo(MedicalRecord::class);
    }
}
