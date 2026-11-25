<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicalPlanResource extends JsonResource
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
            'medical_record_id' => $this->medical_record_id,
            'title' => $this->title,
            'description' => $this->description,
            'employee' => EmployeeResource::make($this->whenLoaded('employee')),
            'medical_record' => MedicalRecordResource::make($this->whenLoaded('medicalRecord')),
            'created_at' => $this->created_at,
        ];
    }
}