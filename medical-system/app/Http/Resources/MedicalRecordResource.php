<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicalRecordResource extends JsonResource
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
            'employee_id' => $this->employee_id,
            'date' => $this->date,
            'description' => $this->description,
            'type' => $this->type,
            'user' => UserResource::make($this->whenLoaded('user')),
            'employee' => EmployeeResource::make($this->whenLoaded('employee')),
            'attatchments' => AttatchmentResource::collection($this->whenLoaded('attatchments')),
            'medical_plans' => MedicalPlanResource::collection($this->whenLoaded('medicalPlans'))
        ];
    }
}
