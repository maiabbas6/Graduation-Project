<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomServiceUserResource extends JsonResource
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
            'status' => $this->status,
            'room_service' => RoomServiceResource::make($this->whenLoaded('roomService')),
            'room' => $this->whenLoaded('room'),
            'user' => $this->whenLoaded('user'),
            'employee' => $this->whenLoaded('employee'),
        ];
    }
}
