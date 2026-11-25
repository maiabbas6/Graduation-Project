<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'gender' => $this->gender,
            'phone' => $this->phone,
            'birth' => $this->birth,
            'address' => $this->address,
            'roles' => $this->when($this->relationLoaded('roles'), fn() => $this->roles->pluck('name')),
            'permissions' => $this->when($this->relationLoaded('roles'), fn() => $this->getAllPermissions()->pluck('name')),
            'employee' => EmployeeResource::make($this->whenLoaded('employee')),
            'medical_records' => MedicalRecordResource::collection($this->whenLoaded('medicalRecords')),
            'appointments' => AppointmentResource::collection($this->whenLoaded('appointments'))
        ];
    }
}

