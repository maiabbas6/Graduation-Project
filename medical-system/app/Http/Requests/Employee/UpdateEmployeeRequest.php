<?php

namespace App\Http\Requests\Employee;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('employee.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Get the employee being updated to ignore its unique fields if they aren't changing
        $employee = $this->route('employee');
        $userId = $employee->user_id;

        return [
            // User fields
            'first_name' => 'sometimes|string|min:2|max:255',
            'last_name' => 'sometimes|string|min:2|max:255',
            'phone' => 'sometimes|string|min:10|max:20|unique:users,phone,' . $userId,
            'password' => 'sometimes|string|min:6|max:255',
            'birth' => 'sometimes|date',
            'gender' => 'sometimes|string|in:male,female',
            'address' => 'sometimes|string|min:2|max:255',
            'role' => 'sometimes|string|exists:roles,name',

            // Employee fields
            'section_id' => 'sometimes|exists:sections,id',
            'specialization' => 'sometimes|string|max:255',
            'license_no' => 'sometimes|string|max:100|unique:employees,license_no,' . $employee->id,
            'hour_rate' => 'sometimes|numeric|min:0',
            'qualifications' => 'sometimes|string',
            'contract_end_date' => 'sometimes|date',
            'is_active' => 'sometimes|boolean',
        ];
    }
}
