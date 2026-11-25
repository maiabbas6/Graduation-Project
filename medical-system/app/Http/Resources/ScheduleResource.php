<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'day'=> $this->day,
            'start_at'=> substr((string) $this->start_at, 0, 5),
            'end_at'=> substr((string) $this->end_at, 0, 5),
        ];
    }
}
