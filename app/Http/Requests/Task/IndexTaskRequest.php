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
}