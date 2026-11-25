<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attatchment extends Model
{
    protected $fillable = [
        'parent_type',
        'parent_id',
        'path'
    ];
}
