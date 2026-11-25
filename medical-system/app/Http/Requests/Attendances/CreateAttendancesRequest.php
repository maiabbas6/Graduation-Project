<?php

namespace App\Http\Requests\Attendances;

use App\Models\Employee;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateAttendancesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('attendances.store');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => 'required|int|exists:employees,id',
            'date_time'=> ['required','date',function($field,$value,$fali){
                $employee = Employee::find($this->employee_id);
                if(!$employee){
                    return;
                }
                $count = $employee->attendances()->whereDate('date_time','>', $value)->count();
                if($count > 0){
                    return $fali('unable to create attendances');
                }
            }],
            'type' => 'required|in:in,out'
        ];
    }
}
