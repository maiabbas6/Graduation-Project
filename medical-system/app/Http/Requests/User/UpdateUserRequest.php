<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('user.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user')->id;

        return [
            'first_name' => 'sometimes|string|min:2|max:255',
            'last_name' => 'sometimes|string|min:2|max:255',
            'phone' => 'sometimes|string|min:10|max:20|unique:users,phone,' . $userId,
            'password' => 'sometimes|string|min:6|max:255',
            'birth' => 'sometimes|date',
            'gender' => 'sometimes|string|in:male,female',
            'address' => 'sometimes|string|min:2|max:255',
            'overview' => 'sometimes|nullable|array',
        ];
    }
}