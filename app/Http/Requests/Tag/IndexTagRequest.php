<?php

namespace App\Http\Requests\Tag;

use Illuminate\Foundation\Http\FormRequest;

class IndexTagRequest extends FormRequest
{
    protected array $casts = [
        'is_active' => 'boolean',
    ];
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'is_active' => 'nullable|boolean'
        ];
    }

    public function messages()
    {
        return [
            'is_active.boolean' => 'O campo ativo deve ser verdadeiro ou falso.'
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->has('is_active')) {
            $value = $this->input('is_active');

            if (is_string($value)) {
                $lower = strtolower($value);
                if ($lower === 'true') {
                    $value = true;
                } elseif ($lower === 'false') {
                    $value = false;
                }
            }

            $this->merge([
                'is_active' => filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE)
            ]);
        }
    }
}
