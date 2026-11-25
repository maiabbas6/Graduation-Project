<?php

namespace App\Http\Requests\Cost;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreCostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::user()->can('cost.store');
    }

    public function rules(): array
    {
        return [
            'user_id' => 'required|integer|exists:users,id',
            'appointment_id' => 'nullable|integer|exists:appointments,id',
            'room_service_user_id' => 'nullable|integer|exists:room_service_users,id',
            'description' => 'required|string|max:512',
            'amount' => 'required|numeric|min:0',
        ];
    }
}
