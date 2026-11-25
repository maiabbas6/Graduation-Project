<?php

namespace App\Http\Requests\MedicalPlan;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateMedicalPlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('medical_plan.store');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => 'sometimes|int|exists:employees,id',
            'medical_record_id' => 'required|int|exists:medical_records,id',
            'title' => 'required|string|min:2|max:255',
            'description' => 'required|string',
        ];
    }
}