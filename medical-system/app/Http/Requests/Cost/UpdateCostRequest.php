<?php

namespace App\Http\Requests\Cost;

use App\Http\Requests\Cost\Concerns\AuthorizesCost;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCostRequest extends FormRequest
{
    use AuthorizesCost;

    public function authorize(): bool
    {
        return $this->canManageCost($this->route('cost'), 'cost.update');
    }

    public function rules(): array
    {
        return [
            'description' => 'sometimes|string|max:512',
            'amount' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:unpaid,paid',
        ];
    }
}
