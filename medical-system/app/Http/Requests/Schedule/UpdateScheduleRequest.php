<?php

namespace App\Http\Requests\Schedule;

use App\Models\Schedule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class UpdateScheduleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('schedule.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'day' => 'sometimes|integer|min:0|max:6',
            'start_at' => [
                'sometimes',
                'date_format:H:i',
            ],
            'end_at' => [
                'sometimes',
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

            $scheduel = Route::current()->parameter('schedule');

            $overlap = Schedule::where('employee_id', $scheduel->employee_id)
                ->where('day', $data['day'])
                ->where('id', '!=', $scheduel->id)
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
