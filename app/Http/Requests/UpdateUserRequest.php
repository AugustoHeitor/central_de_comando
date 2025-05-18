<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        return true; 
    }

    public function rules()
    {
        return [
            'full_name' => 'nullable|string|max:255',
            'nickname' => 'nullable|string|max:100',
            'new_password' => 'nullable|string|min:6',
            'current_password' => 'required|string|min:6',
            'photo' => 'nullable|image|max:1024',
        ];
    }

    public function messages()
    {
        return [
            'full_name.string' => 'O nome completo deve ser uma string.',
            'full_name.max' => 'O nome completo não pode ter mais que 255 caracteres.',

            'nickname.string' => 'O apelido deve ser uma string.',
            'nickname.max' => 'O apelido não pode ter mais que 100 caracteres.',

            'new_password.string' => 'A nova senha deve ser uma string.',
            'new_password.min' => 'A nova senha deve ter pelo menos 6 caracteres.',

            'current_password.required' => 'A senha atual é obrigatória.',
            'current_password.string' => 'A senha atual deve ser uma string.',
            'current_password.min' => 'A senha atual deve ter pelo menos 6 caracteres.',

            'photo.image' => 'O arquivo enviado deve ser uma imagem.',
            'photo.max' => 'A imagem não pode ser maior que 1MB.',
            'photo.uploaded' => 'O envio da imagem falhou. Verifique se o arquivo tem menos de 1MB e tente novamente.',
        ];
    }
}

