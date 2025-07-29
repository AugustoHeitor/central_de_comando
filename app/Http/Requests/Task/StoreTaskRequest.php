<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:to_do,in_progress,done',
            'priority' => 'required|in:low,medium,urgent',
            'category_id' => 'required',
            'deadline' => 'required|date',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'O campo título é obrigatório.',
            'title.string' => 'O campo título deve ser uma string.',
            'title.max' => 'O título deve ter no máximo 255 caracteres.',

            'description.string' => 'O campo descrição deve ser uma string.',

            'status.required' => 'O campo status é obrigatório.',
            'status.in' => 'O campo status deve ser: to_do, in_progress ou done.',

            'priority.required' => 'O campo prioridade é obrigatório.',
            'priority.in' => 'O campo prioridade deve ser: low, medium ou urgent.',

            'category_id.required' => 'O campo categoria é obrigatório.',
            'deadline.required' => 'O campo prazo (deadline) é obrigatório.',
            'deadline.date' => 'O campo prazo deve ser uma data válida.',
    
        ];
    }
}