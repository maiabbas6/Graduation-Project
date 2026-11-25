<?php

namespace App\Http\Requests\Appointment;

use App\Models\Appointment;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CloseAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Auth::user();

        if (! $user->can('appointment.update')) {

            return false;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        $appointment = Appointment::find($this->appointment_id);

        if(!$appointment){
            return true;
        }

        return $appointment->employee?->user_id === $user->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'appointment_id' => 'required|int|exists:appointments,id',
            'medical_record' => 'required|array',
            'medical_record.type'=> 'required|in:lab,radiology,treatment',
            'medical_record.description'=> 'required|string|max:1024',
            'attatchments' => 'sometimes|array',
            'attatchments.*' => 'required_with:attatchments|file|max:10240',
        ];
    }
}
