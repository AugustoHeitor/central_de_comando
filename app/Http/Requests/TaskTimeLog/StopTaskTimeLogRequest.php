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
            'stopped_at' => [
                'required',
                'regex:/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2})?$/'
            ],
        ];
    }

    public function messages()
    {
        return [
            'stopped_at.required' => 'O campo de fim é obrigatório.',
            'stopped_at.regex' => 'A data de fim deve estar no formato correto (YYYY-MM-DD HH:MM[:SS] ou YYYY-MM-DDTHH:MM[:SS]).',
        ];
    }
}
