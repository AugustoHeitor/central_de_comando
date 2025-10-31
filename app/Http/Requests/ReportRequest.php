<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class ReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'start_deadline' => 'nullable|date',
            'end_deadline'   => 'nullable|date',
        ];
    }

    public function messages()
    {
        return [
            'start_deadline.date' => 'A data inicial deve estar em um formato de data válido (ex: YYYY-MM-DD).',
            'end_deadline.date'   => 'A data final deve estar em um formato de data válido (ex: YYYY-MM-DD).',
        ];
    }
}
