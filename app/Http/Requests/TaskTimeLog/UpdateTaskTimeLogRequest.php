<?php

namespace App\Http\Requests\TaskTimeLog;

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
            'started_at' => [
                'required',
                'regex:/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2})?$/'
            ],
            'stopped_at' => [
                'required',
                'regex:/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2})?$/'
            ],
        ];
    }

    public function messages()
    {
        return [
            'started_at.required' => 'O campo de início é obrigatório.',
            'started_at.regex' => 'A data de início deve estar no formato correto (YYYY-MM-DD HH:MM[:SS] ou YYYY-MM-DDTHH:MM[:SS]).',

            'stopped_at.required' => 'O campo de fim é obrigatório.',
            'stopped_at.regex' => 'A data de fim deve estar no formato correto (YYYY-MM-DD HH:MM[:SS] ou YYYY-MM-DDTHH:MM[:SS]).',
        ];
    }
}
