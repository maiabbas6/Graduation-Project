<?php

namespace App\Http\Requests\Appointment;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class AppointmentStatisticsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => 'sometimes|in:waiting,canceled,suspended,clodes',
            'type' => 'sometimes|in:consultation,follow-up,routine-check,urgent,surgery',
            'user_id' => 'sometimes|integer|exists:users,id',
            'employee_id' => 'sometimes|integer|exists:employees,id',
            'room_id' => 'sometimes|integer|exists:rooms,id',
            'section_id' => 'sometimes|integer|exists:sections,id',
            'before' => 'sometimes|date',
            'after' => 'sometimes|date|before:before',
        ];
    }
}
