<?php

namespace App\Traits;

use App\Models\Attatchment;

trait HasAttatchment
{
    public function attatchments(){
        return $this->morphMany(Attatchment::class,'parent');
    }
}
