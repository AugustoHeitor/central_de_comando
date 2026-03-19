<?php

namespace App\Http\Requests\Tag;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTagRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {

        $icons = config('tagIcons');

        return [
            'name' => 'sometimes|required|string|max:100',

            'color' => [
                'sometimes',
                'required',
                'regex:/^#([A-Fa-f0-9]{6})$/'
            ],

            'icon' => ['sometimes', 'required', 'string', Rule::in($icons)],

            'description' => 'sometimes|nullable|string|max:500',

            'is_active' => 'sometimes|required|boolean'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome da tag é obrigatório.',
            'name.string' => 'O nome da tag deve ser um texto.',
            'name.max' => 'O nome da tag deve ter no máximo 100 caracteres.',

            'color.required' => 'A cor da tag é obrigatória.',
            'color.regex' => 'A cor deve estar no formato hexadecimal (#FFFFFF).',

            'icon.required' => 'O ícone da tag é obrigatório.',
            'icon.string' => 'O ícone deve ser um texto.',
            'icon.in' => 'O ícone selecionado não é válido.',

            'description.string' => 'A descrição deve ser um texto.',
            'description.max' => 'A descrição deve ter no máximo 500 caracteres.',

            'is_active.required' => 'O campo ativo é obrigatório.',
            'is_active.boolean' => 'O campo ativo deve ser verdadeiro ou falso.'
        ];
    }
}
