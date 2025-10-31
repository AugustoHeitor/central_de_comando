<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class IndexTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'status'         => 'nullable|in:to_do,in_progress,done',
            'priority'       => 'nullable|in:low,medium,urgent',
            'category'       => 'nullable|string',
            'start_deadline' => 'nullable|date',
            'end_deadline'   => 'nullable|date',
        ];
    }

    public function messages()
    {
        return [
            'status.in' => 'O status informado é inválido. Os valores permitidos são: to_do, in_progress ou done.',
            'priority.in' => 'A prioridade informada é inválida. Use: low, medium ou urgent.',
            'category.string' => 'A categoria deve ser um texto válido.',
            'start_deadline.date' => 'A data inicial deve estar em um formato de data válido (ex: YYYY-MM-DD).',
            'end_deadline.date' => 'A data final deve estar em um formato de data válido (ex: YYYY-MM-DD).'
        ];
    }
}
