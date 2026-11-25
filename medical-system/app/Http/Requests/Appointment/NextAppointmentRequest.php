<?php

namespace App\Http\Requests\Appointment;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class NextAppointmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::user()->can('appointment.index');
    }

    public function rules(): array
    {
        return [];
    }
}
