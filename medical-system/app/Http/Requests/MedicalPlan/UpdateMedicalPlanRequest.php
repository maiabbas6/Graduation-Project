<?php

namespace App\Http\Requests\MedicalPlan;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateMedicalPlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('medical_plan.update');
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
            'medical_record_id' => 'sometimes|int|exists:medical_records,id',
            'title' => 'sometimes|string|min:2|max:255',
            'description' => 'sometimes|string',
        ];
    }
}