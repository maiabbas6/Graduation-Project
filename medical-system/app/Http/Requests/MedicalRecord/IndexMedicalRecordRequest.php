<?php

namespace App\Http\Requests\MedicalRecord;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class IndexMedicalRecordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('medical_record.index');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'sometimes|int|exists:users,id',
            'employee_id' => 'sometimes|int|exists:employees,id',
            'type' => 'sometimes|in:lab,radiology,treatment,consultation,diagnosis,follow-up,routine-check,urgent',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date',
            'per_page' => 'sometimes|int|min:1|max:100',
        ];
    }
}