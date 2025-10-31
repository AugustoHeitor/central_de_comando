<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DashboardRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'start_date' => 'nullable|date',
            'end_date'   => 'nullable|date',
        ];
    }

    public function messages()
    {
        return [
            'start_date.date' => 'A data inicial deve estar em um formato de data válido (ex: YYYY-MM-DD).',
            'end_date.date'   => 'A data final deve estar em um formato de data válido (ex: YYYY-MM-DD).'
        ];
    }
}
