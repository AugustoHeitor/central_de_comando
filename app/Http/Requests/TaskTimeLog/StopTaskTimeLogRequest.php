<?php

namespace App\Http\Requests\TaskTimeLog;

use Illuminate\Foundation\Http\FormRequest;

class StopTaskTimeLogRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'stopped_at' => 'required|date_format:Y-m-d\TH:i:s',
        ];
    }

    public function messages()
    {
        return [
            'stopped_at.required' => 'O campo de fim é obrigatório.',
            'stopped_at.date_format' => 'O campo de fim deve estar no formato correto (YYYY-MM-DDTHH:MM:SS).',
        ];
    }
}
