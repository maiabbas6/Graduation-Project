<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            'user_id' => $this->user_id,
            'employee_id'=> $this->employee_id,
            'room_id'=> $this->room_id,
            'appointment_date_time'=> $this->appointment_date_time,
            'type'=> $this->type,
            'description'=> $this->description,
            'appointment_closed_at'=> $this->appointment_closed_at,
            'status'=> $this->status,
            'user' => UserResource::make($this->whenLoaded('user')),
            'employee' => EmployeeResource::make($this->whenLoaded('employee')),
            'room' => RoomResource::make($this->whenLoaded('room')),
            'attatchments' => AttatchmentResource::collection($this->whenLoaded('attatchments')),
        ];
    }
}
