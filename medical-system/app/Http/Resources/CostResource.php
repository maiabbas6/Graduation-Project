<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'appointment_id' => $this->appointment_id,
            'room_service_user_id' => $this->room_service_user_id,
            'description' => $this->description,
            'amount' => (float) $this->amount,
            'status' => $this->status,
            'paid_at' => $this->paid_at,
            'user' => UserResource::make($this->whenLoaded('user')),
            'appointment' => AppointmentResource::make($this->whenLoaded('appointment')),
            'room_service_user' => $this->whenLoaded('room_service_user'),
        ];
    }
}
