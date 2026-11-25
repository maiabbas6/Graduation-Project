<?php

namespace App\Http\Requests\Appointment;

use App\Http\Requests\Appointment\Concerns\AuthorizesAppointment;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class DeleteAppointmentRequest extends FormRequest
{
    use AuthorizesAppointment;

    public function authorize(): bool
    {
        return $this->canManageAppointment($this->route('appointment'), 'appointment.delete');
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}

