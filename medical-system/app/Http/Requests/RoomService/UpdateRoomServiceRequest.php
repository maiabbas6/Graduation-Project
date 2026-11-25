<?php

namespace App\Http\Requests\RoomService;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateRoomServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('room_service.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $roomService = $this->route('roomService');

        return [
            'name' => 'sometimes|string|max:255|unique:room_services,name,' . $roomService->id,
            'price' => 'sometimes|numeric|min:0',
        ];
    }
}
