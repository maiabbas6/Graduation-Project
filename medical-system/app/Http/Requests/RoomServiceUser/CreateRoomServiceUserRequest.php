<?php

namespace App\Http\Requests\RoomServiceUser;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateRoomServiceUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('room_service_user.store');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'room_service_id' => 'required|exists:room_services,id',
            'room_id' => 'required|exists:rooms,id',
            'user_id' => 'sometimes|exists:users,id',
            'employee_id' => 'required|exists:employees,id',
            'status' => 'sometimes|in:waiting,done,canceled',
        ];
    }
}
