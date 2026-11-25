<?php

namespace App\Http\Requests\Appointment;

use App\Http\Requests\Appointment\Concerns\AuthorizesAppointment;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ShowAppointmentRequest extends FormRequest
{
    use AuthorizesAppointment;

    public function authorize(): bool
    {
        $user = Auth::user();

        if (! $user->can('appointment.show')) {
            return false;
        }

        return $this->canManageAppointment($this->route('appointment'), 'appointment.show');
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

