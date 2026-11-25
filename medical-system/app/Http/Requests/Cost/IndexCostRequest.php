<?php

namespace App\Http\Requests\Cost;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class IndexCostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::user()->can('cost.index');
    }

    public function rules(): array
    {
        return [
            'user_id' => 'sometimes|integer|exists:users,id',
            'status' => 'sometimes|in:unpaid,paid',
            'type' => 'sometimes|in:appointment,room_service',
            'per_page' => 'sometimes|integer|min:1|max:100',
        ];
    }
}
