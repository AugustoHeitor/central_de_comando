<?php

namespace App\Http\Requests\FinancialTransaction;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFinancialTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:200',
            'type' => 'sometimes|required|in:income,expense',
            'category_id' => 'sometimes|required',
            'amount' => 'sometimes|required|integer|min:1',
            'transaction_date' => 'sometimes|required|date',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'O título é obrigatório.',
            'type.in' => 'O tipo deve ser "income" ou "expense".',
            'category_id.required' => 'O campo categoria é obrigatório.',
            'amount.min' => 'O valor deve ser no mínimo 1.',
            'transaction_date.date' => 'A data deve ser uma data válida.',
        ];
    }
}