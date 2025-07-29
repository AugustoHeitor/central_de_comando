<?php

namespace App\Http\Requests\FinancialTransaction;

use Illuminate\Foundation\Http\FormRequest;

class IndexFinancialTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'type'         => 'nullable|in:income,expense',
            'category'       => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date'   => 'nullable|date',
        ];
    }
}