<?php

namespace App\Http\Requests\Appointment;

use App\Models\Appointment;
use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('appointment.store');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => 'required|exists:employees,id',
            'appointment_date_time' => ['required','date',function($key,$value,$fail){
                $this->checkSchedule($key,$value,$fail);
            }],
            'description' => 'required|string',
            'type' => 'required|in:consultation,follow-up,routine-check,urgent',
            'attatchments' => 'sometimes|array',
            'attatchments.*'=> 'required_with:attatchments|file|max:1024',
        ];
    }


    private function checkSchedule($key,$value,$fail){
        $employee = Employee::find($this->employee_id);
        $value = Carbon::parse($value);
        if($employee){
             $day = strtolower($value->format('l')); // monday, tuesday, ...
             $time = $value->format('H:i:s'); // 12:26:00

             $schedule = $employee->schedules()
                ->where('day', $day)
                ->whereTime('start_at', '<=', $time)
                ->whereTime('end_at', '>=', $time)
                ->first();

                if (! $schedule) {
                    $fail('The selected appointment time is outside the employee schedule.');
                }

                // Check for waiting appointments gap
                $conflictingAppointment = Appointment::where('employee_id', $this->employee_id)
                    ->where('status', 'waiting')
                    ->whereRaw('ABS(TIMESTAMPDIFF(MINUTE, appointment_date_time, ?)) < 20', [$value])
                    ->first();

                if ($conflictingAppointment) {
                    $fail('The selected appointment time is too close to an existing waiting appointment. Please allow at least 20 minutes gap.');
                }
        }

    }
}
