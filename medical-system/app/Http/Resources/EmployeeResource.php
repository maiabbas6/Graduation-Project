<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
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
            'user_id' => $this->user_id,
            'section_id' => $this->section_id,
            'specialization' => $this->specialization,
            'license_no' => $this->license_no,
            'hour_rate' => (float) $this->hour_rate,
            'qualifications' => $this->qualifications,
            'contract_end_date' => $this->contract_end_date,
            'is_active' => $this->is_active,
            'user' => UserResource::make($this->whenLoaded('user')),
            'attatchments' => AttatchmentResource::collection($this->whenLoaded('attatchments')),
            'schedules' => $this->whenLoaded('schedules'),
            'section' => SectionResource::make($this->whenLoaded('section')),
            'attendances' => $this->whenLoaded('attendances'),
        ];
    }
}
