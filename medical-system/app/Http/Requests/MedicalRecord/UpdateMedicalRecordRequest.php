<?php

namespace App\Http\Requests\MedicalRecord;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateMedicalRecordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('medical_record.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => 'sometimes|nullable|int|exists:employees,id',
            'date' => 'sometimes|date',
            'description' => 'sometimes|string|max:1024',
            'type' => 'sometimes|in:lab,radiology,treatment,consultation,diagnosis,follow-up,routine-check,urgent',
            'attatchments' => 'sometimes|array',
            'attatchments.*' => 'required_with:attatchments|file|max:10240',
        ];
    }
}