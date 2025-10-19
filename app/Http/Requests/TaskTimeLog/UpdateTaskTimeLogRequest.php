<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskTimeLogRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'started_at' => 'required|date_format:Y-m-d\TH:i',
            'stopped_at' => 'required|date_format:Y-m-d\TH:i',
        ];
    }

    public function messages()
    {
        return [
            'started_at.required' => 'O campo de início é obrigatório.',
            'started_at.date_format' => 'O campo de início deve estar no formato correto (YYYY-MM-DD HH:MM).',
            'stopped_at.required' => 'O campo de fim é obrigatório.',
            'stopped_at.date_format' => 'O campo de fim deve estar no formato correto (YYYY-MM-DD HH:MM).',
        ];
    }
}
