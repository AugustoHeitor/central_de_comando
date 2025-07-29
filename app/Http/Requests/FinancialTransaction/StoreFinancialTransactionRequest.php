<?php

namespace App\Http\Requests\FinancialTransaction;

use Illuminate\Foundation\Http\FormRequest;

class StoreFinancialTransactionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:200',
            'type' => 'required|in:income,expense',
            'category_id' => 'required',
            'amount' => 'required|integer|min:1',
            'transaction_date' => 'required|date',
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