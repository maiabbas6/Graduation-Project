<?php

namespace App\Http\Requests\Cost;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteCostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::user()->can('cost.delete');
    }

    public function rules(): array
    {
        return [];
    }
}
