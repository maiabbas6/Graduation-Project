<?php

namespace App\Http\Requests\Employee;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('employee.store');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // User fields
            'first_name' => 'required|string|min:2|max:255',
            'last_name' => 'required|string|min:2|max:255',
            'phone' => 'required|string|min:10|max:20|unique:users,phone',
            'password' => 'required|string|min:6|max:255',
            'birth' => 'required|date',
            'gender' => 'required|string|in:male,female',
            'address' => 'required|string|min:2|max:255',
            'role' => 'required|string|exists:roles,name',

            // Employee fields
            'section_id' => 'required|exists:sections,id',
            'specialization' => 'required|string|max:255',
            'license_no' => 'required|string|unique:employees,license_no|max:100',
            'hour_rate' => 'required|numeric|min:0',
            'qualifications' => 'required|string',
            'contract_end_date' => 'required|date',
            'is_active' => 'boolean',
            'attatchments' => 'sometimes|array',
            'attatchments.*'=> 'required_with:attatchments|file|max:1024',
        ];
    }
}
