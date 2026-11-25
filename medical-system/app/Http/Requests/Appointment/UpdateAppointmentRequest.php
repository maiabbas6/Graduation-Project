<?php

namespace App\Http\Requests\Appointment;

use App\Http\Requests\Appointment\Concerns\AuthorizesAppointment;
use App\Models\Appointment;
use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateAppointmentRequest extends FormRequest
{
    use AuthorizesAppointment;

    public function authorize(): bool
    {
        return $this->canManageAppointment($this->route('appointment'), 'appointment.update');
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => 'sometimes|exists:employees,id',
            'appointment_date_time' => ['sometimes', 'date', function ($key, $value, $fail) {
                $this->checkSchedule($key, $value, $fail);
            }],
            'description' => 'sometimes|string',
            'appointment_closed_at' => 'sometimes|nullable|date',
            'status' => 'sometimes|in:waiting,canceled,suspended,closed',
            'room_id' => 'sometimes|integer|exists:rooms,id',
            'type' => 'sometimes|in:consultation,follow-up,routine-check,urgent,surgery',
        ];
    }

    private function checkSchedule($key, $value, $fail)
    {
        $employeeId = $this->employee_id ?? $this->route('appointment')->employee_id;
        $employee = Employee::find($employeeId);
        $value = Carbon::parse($value);

        if ($employee) {
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
            // Exclude current appointment being updated
            $currentAppointmentId = $this->route('appointment')->id;

            $conflictingAppointment = Appointment::where('employee_id', $employeeId)
                ->where('status', 'waiting')
                ->where('id', '!=', $currentAppointmentId)
                ->whereRaw('ABS(TIMESTAMPDIFF(MINUTE, appointment_date_time, ?)) < 20', [$value])
                ->first();

            if ($conflictingAppointment) {
                $fail('The selected appointment time is too close to an existing waiting appointment. Please allow at least 20 minutes gap.');
            }
        }
    }
}
