<?php

namespace App\Http\Requests\Cost;

use App\Http\Requests\Cost\Concerns\AuthorizesCost;
use Illuminate\Foundation\Http\FormRequest;

class ShowCostRequest extends FormRequest
{
    use AuthorizesCost;

    public function authorize(): bool
    {
        return $this->canManageCost($this->route('cost'), 'cost.show');
    }

    public function rules(): array
    {
        return [];
    }
}
