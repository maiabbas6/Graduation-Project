<?php

namespace App\Http\Requests\Schedule;

use App\Models\Schedule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateScheduleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('schedule.store');
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if (Auth::user()->employee !== null) {
            $this->merge([
                'employee_id' => Auth::user()->employee->id,
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => 'required|integer|exists:employees,id',
            'day' => 'required|integer|min:0|max:6',
            'start_at' => [
                'required',
                'date_format:H:i',
            ],
            'end_at' => [
                'required',
                'date_format:H:i',
            ],
        ];
    }

    /**
     * Block schedule replication for the same employee/day.
     */
    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $data = $this->validated();

            if (isset($data['start_at'], $data['end_at']) && $data['end_at'] <= $data['start_at']) {
                $validator->errors()->add('end_at', 'The end time must be after the start time.');

                return;
            }

            $overlap = Schedule::where('employee_id', $data['employee_id'])
                ->where('day', $data['day'])
                ->where(function ($query) use ($data) {
                    $query->where('start_at', '<', $data['end_at'])
                        ->where('end_at', '>', $data['start_at']);
                })
                ->exists();

            if ($overlap) {
                $validator->errors()->add('start_at', 'The schedule overlaps with an existing schedule.');
            }
        });
    }
}
