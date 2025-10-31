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

    public function messages()
{
    return [
        'type.in' => 'O tipo informado é inválido. Os valores permitidos são: income ou expense.',
        'category.string' => 'A categoria deve ser um texto válido.',
        'start_date.date' => 'A data inicial deve estar em um formato de data válido (ex: YYYY-MM-DD).',
        'end_date.date' => 'A data final deve estar em um formato de data válido (ex: YYYY-MM-DD).'
    ];
}
}
