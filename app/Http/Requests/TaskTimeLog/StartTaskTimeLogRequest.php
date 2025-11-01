<?php

namespace App\Http\Requests\TaskTimeLog;

use Illuminate\Foundation\Http\FormRequest;

class StartTaskTimeLogRequest extends FormRequest
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
        ];
    }

    public function messages()
    {
        return [
            'started_at.required' => 'O campo de início é obrigatório.',
            'started_at.regex' => 'A data de início deve estar no formato correto (YYYY-MM-DD HH:MM[:SS] ou YYYY-MM-DDTHH:MM[:SS]).',
        ];
    }
}
