<?php

namespace App\Http\Requests\Appointment;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class IndexAppointmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::user()->can('appointment.index');
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'sometimes|integer|exists:users,id',
            'employee_id' => 'sometimes|integer|exists:employees,id',
            'room_id' => 'sometimes|integer|exists:rooms,id',
            'before'=> 'date',
            'after' => 'date',
            'type' => 'sometimes',
            'status' => 'sometimes',
        ];
    }
}

