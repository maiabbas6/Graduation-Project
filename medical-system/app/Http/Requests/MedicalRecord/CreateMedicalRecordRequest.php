<?php

namespace App\Http\Requests\MedicalRecord;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateMedicalRecordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('medical_record.store');
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
            'employee_id' => 'sometimes|nullable|int|exists:employees,id',
            'date' => 'required|date',
            'description' => 'required|string|max:1024',
            'type' => 'required|in:lab,radiology,treatment,consultation,diagnosis,follow-up,routine-check,urgent',
            'attatchments' => 'sometimes|array',
            'attatchments.*' => 'required_with:attatchments|file|max:10240',
        ];
    }
}