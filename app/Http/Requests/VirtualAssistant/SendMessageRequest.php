<?php

namespace App\Http\Requests\VirtualAssistant;

use Illuminate\Foundation\Http\FormRequest;

class SendMessageRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'message' => [
                'required',
                'string',
                'max:5000',
            ],
        ];
    }

    public function messages()
    {
        return [
            'message.required' => 'A mensagem é obrigatória.',
            'message.string' => 'A mensagem deve ser um texto válido.',
            'message.max' => 'A mensagem não pode ter mais que 5000 caracteres.',
        ];
    }
}
